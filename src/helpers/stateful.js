/*

Allows defining stateful components

TODO:

- Inject key into component element render

Requirements:

- Handle initial render
- Handle parent re-render
- Handle component re-render (setState called)

*/

export default (reduce, render)=>{
  let nodeName;

  function statefulRender(props, node){
    // Called by component to set the new state and
    // re-render the component without re-rendering
    // the whole document
    function setState(newState){
      const parentNode = node.parentNode;

      node.statefulState = newState;
      IncrementalDOM.patch(parentNode, ()=>{
        // Skip over all siblings before component's element
        let curNode = parentNode.firstChild;
        while(curNode !== node){
          IncrementalDOM.skipNextElement();
          curNode = curNode.nextSibling;
        }

        render(props, newState, setState);

        // Mark the last child as visited so IncrementalDOM
        // doesn't truncate all sibling elements after the
        // component's element
        IncrementalDOM.markVisited(parentNode.lastChild);
      });
    }

    const key = props && props.key;

    // Try to find component's element
    node = node || (nodeName && IncrementalDOM.getMatchingNode(nodeName, key));

    // Initial render
    if(!node){
      // TODO(pwong): Call with props and previous state
      const state = reduce();

      // Tell IncrementalDOM to track the root (first)
      // element rendered.  This will be considered the
      // component's element.
      IncrementalDOM.elementTrackRoot();
      render(props, state, setState);
      node = IncrementalDOM.elementGetRoot();
      // debugger;
      // nodeName = node.nodeName.toLowerCase();
      node.statefulState = state;
    }
    // Parent re-render
    else{
      render(props, node.statefulState, setState);
    }
  }

  return statefulRender;
};
