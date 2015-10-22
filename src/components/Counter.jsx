// Function w/state
const Counter = (props, {count}, {increment, decrement})=>
  <div>
    {count}
    <button onClick={increment}>+</button>
    <button onClick={decrement}>-</button>
  </div>;

Counter.state = {
  init:               (props)=>({count: 0}),
  increment: (props, {count})=>({count: count + 1}),
  decrement: (props, {count})=>({count: count - 1})
};

// Object
export default {
  state: {
    init:               (props)=>({count: 0}),
    increment: (props, {count})=>({count: count + 1}),
    decrement: (props, {count})=>({count: count - 1})
  },
  render: (props, {count}, {increment, decrement})=>
    <div>
      {count}
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
    </div>
};


// Function, external actions
const increment = (props, {count})=>({count: count + 1});
const decrement = (props, {count})=>({count: count - 1});

const Counter = (props, {count}, dispatch)=>
  <div>
    {count}
    <button onClick={()=>dispatch(increment)}>+</button>
    <button onClick={()=>dispatch(decrement)}>-</button>
  </div>;

Counter.getInitialState = props=>({count: 0});


// Module
export const reducers = {
  init:               (props)=>({count: 0}),
  increment: (props, {count})=>({count: count + 1}),
  decrement: (props, {count})=>({count: count - 1})
};

export const render = (props, {count}, {increment, decrement})=>
  <div>
    {count}
    <button onClick={increment}>+</button>
    <button onClick={decrement}>-</button>
  </div>;

// Stateful composition
const CounterStateful = {
  actions: {
    init:               (props)=>({count: 0}),
    increment: (props, {count})=>({count: count + 1}),
    decrement: (props, {count})=>({count: count - 1})
  },
  render: (props, state, actions)=> <Counter {...state} {...actions} />
};

// Stateful factory
const stateful = (Component, actions)=>({
  actions,
  render: (props, state, _actions)=> <Component {...state} {..._actions} />
});

const Counter = ({count, increment, decrement})=>
  <div>
    {count}
    <button onClick={increment}>+</button>
    <button onClick={decrement}>-</button>
  </div>;

const CounterStateful2 = stateful(Counter, {
  init:               (props)=>({count: 0}),
  increment: (props, {count})=>({count: count + 1}),
  decrement: (props, {count})=>({count: count - 1})
});

// React Example
React.createClass({
  getInitialState:props=>({count: 0}),
  render(){
    return (
      <div>
        {this.props.count}
        <button onClick={this.increment}>+</button>
        <button onClick={this.decrement}>-</button>
      </div>
    );
  },
  increment(){ this.setState({count: this.state.count + 1}); },
  decrement(){ this.setState({count: this.state.count - 1}); }
});
