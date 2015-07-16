/*

Stateless components that can decide whether they need to be re-rendered to improve performance.

This is a function creates a function that can be called in a render (`IncrementalDOM.patch()`).

Example:

```
// Using Babel/JSX
const Greeter = Component({
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
var Greeter = Component({
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
- Handle re-render
  - Ask `componentSpec.shouldUpdate(props, previousProps)`

*/

export default (componentSpec)=>{
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
    let node = rootNodeName && IncrementalDOM.getMatchingNode(rootNodeName, key);

    // Render a new component
    if(!node){
      // To determine the component's root element, we ask IncrementalDOM to track the first
      // element rendered.
      node = componentSpec.render(props);

      // Store previous props
      node.__componentProps = props;

      // if(__DEV__){
      if(!node){
        console.log("Component render did not return a rendered node", component.render.toString());
      }
      // }

      rootNodeName = node.nodeName.toLowerCase();
    }
    // Parent re-render
    else{
      // Ask component whether we need re-render or not
      if(componentSpec.shouldUpdate(props, node.__componentProps)){
        componentSpec.render(props);
      }
      else {
        IncrementalDOM.skipNextElement();
      }
    }
  };
};
