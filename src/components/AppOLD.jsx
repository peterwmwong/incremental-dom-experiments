import StatefulComponent from '../helpers/StatefulComponent';
import TodoItem          from './TodoItem.jsx';
import TodoFooter        from './TodoFooter.jsx';

let nextId = 0;
function Todo({id, title, completed}){
  this.id        = id || ++nextId;
  this.title     = title;
  this.completed = completed == null ? false : completed;
}

const INITIAL_TODOS = [];

(()=>{
  for(let i = 0; i < 10; ++i){
    INITIAL_TODOS.push(new Todo({title: `todo ${i}`}));
  }
})();

function handleNewTodoKeyDown({which, target}){
  if(which === 13){
    this.setState(this.state.concat([new Todo({title: target.value})]));
    target.value = '';
  }
}

function handleToggleAll({target}){
  const setCompleted = target.checked;
  this.setState(
    this.state.map(todo=>new Todo({...todo, completed: setCompleted}))
  );
}

function handleToggle(todo){
  this.setState(
    this.state.map(t=>
      t === todo ? new Todo({...t, completed: !t.completed}) : t
    )
  );
}

function handleDestroy(removeTodo){
  this.setState(this.state.filter(todo=>todo !== removeTodo));
}

function handleTitleChange(todo, newTitle){
  this.setState(
    this.state.map(t=>
      t === todo ? new Todo({...t, title: newTitle}) : t
    )
  );
}

function handleClearCompleted(){
  this.setState(this.state.filter(todo=>!todo.completed));
}

function getIncompleteCount(todos){
  let incompleteCount = 0;
  for(let i=0; i<todos.length; ++i){
    if(!todos[i].completed) ++incompleteCount;
  }
  return incompleteCount;
}

export default StatefulComponent({
  getInitialState:(props, todos)=>todos || INITIAL_TODOS,


  render(props, todos){
    let incompleteCount = getIncompleteCount(todos);
    return (
      <div className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            onkeydown={handleNewTodoKeyDown.bind(this)}
            autoFocus={true} />
        </header>
        <section className="main">
          <input
            className="toggle-all"
            type="checkbox"
            onchange={handleToggleAll.bind(this)}
            checked={!incompleteCount} />
          <ul className="todo-list">
            {todos.forEach(todo=>
              <TodoItem
                key={todo.id}
                todo={todo}
                onTitleChange={handleTitleChange.bind(this, todo)}
                onToggle={handleToggle.bind(this, todo)}
                onDestroy={handleDestroy.bind(this, todo)} />
            ),''}
          </ul>
        </section>
        <TodoFooter
          incompleteCount={incompleteCount}
          onClearCompleted={handleClearCompleted.bind(this)} />
      </div>
    );
  }
});
