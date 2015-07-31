/*

Stateful components that can decide whether they need to be re-rendered to improve performance.
This is a function creates a function that can be called in a render (`IncrementalDOM.patch()`).

Example:

```
// Using Babel/JSX
const Greeter = component({
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
var Greeter = component({
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

const setPrototypeOf = Object.setPrototypeOf || function(obj, proto){
  obj.__proto__ = proto; //eslint-disable-line
  return obj;
};

const componentPrototype = {
  constructor(){},
  shouldUpdate(){ return true; },
  render(){},

  setState(newState){
    this.state = newState;
    IncrementalDOM.patch(this.node.parentNode, this._rerender);
  },

  _rerender(){
    const parentNode = this.node.parentNode;
    const walker     = getWalker();

    // Skip over all siblings before component's element
    while(walker.currentNode !== this.node){
      nextSibling();
    }

    this._render();

    // Mark the last child as visited so IncrementalDOM
    // doesn't truncate all sibling elements after the
    // component's element
    getData(parentNode).lastVisitedChild = parentNode.lastChild;
  },

  _render(){
    this.node = this.render(this.props, this.state, this.setState);
    this.node.__component = this;
    return this.node;
  }
};

export default function(spec){
  function Component(props){
    this.node      = null;
    this.props     = props;
    this._rerender = this._rerender.bind(this);
    this.constructor(props);
  }

  Component.prototype = setPrototypeOf(spec, componentPrototype);

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
      component = new Component(props);
      rootNodeName = component._render().nodeName.toLowerCase();
    }
    // Parent re-render
    else{
      const prevProps = component.props;
      component.props = props;
      if(component.shouldUpdate(props, prevProps)){
        component._render();
      }
      else{
        nextSibling();
      }
    }

    return component.node;
  };
}
