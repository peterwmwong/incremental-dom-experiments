/*

Stateful components that can decide whether they need to be re-rendered to improve performance.
This is a function creates a function that can be called in a render (`IncrementalDOM.patch()`).

Example:

```
// Using Babel/JSX
const Greeter = StatefulComponent({
  render: props=>
    <span>Hello {props.name}!</span>,

  shouldUpdate: (props, prevProps)=>
    props.name !== prevProps.name,
});

Incremental.patch(rootNode, ()=>{
  <div>
    <Greeter name="Peter" />
  </div>
});


// ES5/IncrementalDOM (compiled from above)
var Greeter = StatefulComponent({
  render: function render(props) {
    return (
      IncrementalDOM.elementOpen("span"),
        IncrementalDOM.text("Hello "), IncrementalDOM.text(props.name),
      IncrementalDOM.elementClose("span")
    );
  },

  shouldUpdate: function(props, prevProps) {
    return props.name !== prevProps.name;
  }
});

Incremental.patch(rootNode, function () {
  IncrementalDOM.elementOpen("div"),
    Greeter({name: "Peter"}),
  IncrementalDOM.elementClose("div");
});
```

Requirements:

- Handle initial render
- Handle parent re-render
- Handle component re-render (setState called)

*/

import {alignWithDOM} from "incremental-dom/src/alignment.js";
import {getWalker}    from "incremental-dom/src/walker.js";
import {getData}      from "incremental-dom/src/node_data.js";
import {nextSibling}  from "incremental-dom/src/traversal.js";

export default function({getInitialState, render, shouldUpdate}){
  // When rendering a component, we need to determine whether it's one of the following cases:
  //   - Initial render
  //   - Re-render
  //
  // We can determine this by asking IncrementalDOM whether we're about to render to an existing
  // node (`alignWithDOM(nodeName, key)`).
  // The node name isn't known at the time of component declaration, but can be determined on
  // the very first render.
  let rootNodeName;

  return props=>{
    const key = props && props.key;

    // Asking IncrementalDOM whether we are going to be re-rendering an existing component
    // or rendering a new component.
    let node      = rootNodeName && alignWithDOM(rootNodeName, key);
    let component = node && node.__component;

    // Render a new component
    if(!component){
      component = new Component(getInitialState, render, props, shouldUpdate);

      // To determine the component's root element, we ask IncrementalDOM to track the first
      // element rendered.
      node = component.render();

      // if(__DEV__){
      if(!node){
        console.log("Component render did not return a rendered node", component.render.toString()); //eslint-disable-line
      }
      // }

      rootNodeName = node.nodeName.toLowerCase();
      component.node = node;
      node.__component = component;
    }
    // Parent re-render
    else{
      let prevProps = component.props;
      component.props = props;
      if(!component.shouldUpdate || component.shouldUpdate(props, prevProps)){
        component.render();
      }
      else{
        nextSibling();
      }
    }

    return component.node;
  };
}

function Component(getInitialState, render, props, shouldUpdate){
  this._render         = render;
  this.state           = getInitialState && getInitialState(props);
  this.props           = props;
  this.setState        = this.setState.bind(this);
  this.shouldUpdate    = shouldUpdate;
}

Component.prototype.render = function(){
  return this._render(this.props, this.state, this.setState);
};

// Called by the component to set the new state and re-render the component without re-rendering the
// whole document
Component.prototype.setState = function(newState){
  const parentNode = this.node.parentNode;
  this.state = newState;

  IncrementalDOM.patch(parentNode, ()=>{
    const walker = getWalker();
    // Skip over all siblings before component's element
    while(walker.currentNode !== this.node){
      nextSibling();
    }

    this.render();

    // Mark the last child as visited so IncrementalDOM
    // doesn't truncate all sibling elements after the
    // component's element
    getData(parentNode).lastVisitedChild = parentNode.lastChild;
  });
};
