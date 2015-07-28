import {alignWithDOM} from 'incremental-dom/src/alignment.js';
import {getWalker} from 'incremental-dom/src/walker.js';
import {nextSibling, markVisited} from 'incremental-dom/src/traversal.js';

/*

Allows defining stateful components

TODO:

- Inject key into component element render

Requirements:

- Handle initial render
- Handle parent re-render
- Handle component re-render (setState called)

*/

function Component(reduce, render, props){
  this.reduce   = reduce;
  this._render  = render;
  this.state    = reduce(props);
  this.props    = props;
  this.setState = this.setState.bind(this);
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
    let curNode = walker.currentNode;
    while(curNode !== this.node){
      nextSibling();
      curNode = walker.currentNode;
    }

    this.render();

    // Mark the last child as visited so IncrementalDOM
    // doesn't truncate all sibling elements after the
    // component's element
    markVisited(parentNode.lastChild);
  });
};

export default (reduce, render)=>{
  // When rendering a component, we need to determine whether it's one of the following cases:
  //   - Initial render
  //   - Re-render
  //
  // We can determine this by asking IncrementalDOM whether we're about to render to an existing
  // node (`IncrementalDOM.getMatchingNode(nodeName, key)`).
  // The node name isn't known at the time of component declaration, but can be determined on
  // the very first render.
  let rootNodeName;

  return props=>{
    let component;
    const key = props && props.key;

    // Asking IncrementalDOM whether we are going to be re-rendering an existing component
    // or rendering a new component.
    let node = rootNodeName && alignWithDOM(rootNodeName, key);

    // Render a new component
    if(!node){
      component = new Component(reduce, render, props);

      // To determine the component's root element, we ask IncrementalDOM to track the first
      // element rendered.
      node = component.render();

      // if(__DEV__){
      if(!node){
        console.log("Component render did not return a rendered node", component.render.toString());
      }
      // }

      rootNodeName = node.nodeName.toLowerCase();
      component.node = node;
      node.__component = component;
    }
    // Parent re-render
    else{
      component = node.__component;
      component.props = props;
      component.render();
    }
  };
};
