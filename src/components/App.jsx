import {checked} from '../helpers/dom.js';
import stateful from '../helpers/stateful';
import TodoItem   from './TodoItem.jsx';
import TodoFooter from './TodoFooter.jsx';

let nextId = 0;
function Todo(title){
  this.id = ++nextId;
  this.title = title;
  this.completed = false;
}

const INITIAL_TODOS = [
  new Todo('one'),
  new Todo('two'),
  new Todo('three')
];

function handleNewTodoKeyDown({which, target}){
  if(which === 13){
    this.setState(this.state.concat([new Todo(target.value)]));
    target.value = '';
  }
}

function handleToggleAll(e){
  this.setState(this.state.map(todo=>((todo.completed = e.target.checked), todo)));
}

function handleToggle(todo){
  todo.completed = !todo.completed;
  this.setState(this.state);
}

function handleDestroy(removeTodo){
  this.setState(this.state.filter(todo=>todo !== removeTodo));
}

function handleClearCompleted(){
  this.setState(this.state.filter(todo=>!todo.completed));
}

export default stateful(
  (props, todos)=>todos || INITIAL_TODOS,
  function(props, todos){
    const incompleteCount = todos.filter(t=>!t.completed).length;

    <div class="todoapp">
      <header class="header">
        <h1>todos</h1>
        <input
          class="new-todo"
          placeholder="What needs to be done?"
          onkeydown={handleNewTodoKeyDown.bind(this)}
          autoFocus={true} />
      </header>
      <section class="main">
        <input
          class="toggle-all"
          type="checkbox"
          onchange={handleToggleAll.bind(this)}
          checked={checked(!incompleteCount)} />
        <ul class="todo-list">
          {todos.forEach(todo=>
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={handleToggle.bind(this, todo)}
              onDestroy={handleDestroy.bind(this, todo)} />
          )}
        </ul>
      </section>
      <TodoFooter
        incompleteCount={incompleteCount}
        onClearCompleted={handleClearCompleted.bind(this)} />
    </div>;
  }
);
