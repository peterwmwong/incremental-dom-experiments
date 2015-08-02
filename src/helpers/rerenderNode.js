import IncrementalDOM from "incremental-dom";
import {getWalker}    from "incremental-dom/src/walker.js";
import {getData}      from "incremental-dom/src/node_data.js";
import {nextSibling}  from "incremental-dom/src/traversal.js";

export default function(node, render){
  IncrementalDOM.patch(node.parentNode, function(){
    const parentNode = node.parentNode;
    const walker     = getWalker();

    // Skip over all siblings before component's element
    while(walker.currentNode !== node){
      nextSibling();
    }

    render();

    // Mark the last child as visited so IncrementalDOM
    // doesn't truncate all sibling elements after the
    // component's element
    getData(parentNode).lastVisitedChild = parentNode.lastChild;
  });
}
