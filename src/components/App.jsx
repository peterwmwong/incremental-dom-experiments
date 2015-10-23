import combineState from '../helpers/combineState.js';
import Footer       from './Footer.jsx';
import Header       from './Header.jsx';
import Todo         from './Todo.jsx';

const countIncompleted = todos=>
  todos.reduce((count, t)=>count + (t.completed ? 0 : 1), 0);

const filterTodos = (todos, filter)=>
  todos.filter(t=>
        filter === 'all'
    || (filter === 'active'    && !t.completed)
    || (filter === 'completed' &&  t.completed)
  );

const App = (props, {todos, filter}, {addTodo, updateTodo, toggleAll, clearCompleted, changeFilter})=>
  <div className='todoapp'>
    <Header onAddTodo={addTodo} />
    <section className='main'>
      <input
        className='toggle-all'
        type='checkbox'
        onchange={toggleAll}
        checked={!countIncompleted(todos)} />
      <ul className='todo-list'>
        {filterTodos(todos, filter).map(todo=>
          <Todo key={todo.id} todo={todo} updateTodo={updateTodo} />
        )}
      </ul>
    </section>
    <Footer
      filter={filter}
      incompleteCount={countIncompleted(todos)}
      onClearCompleted={clearCompleted}
      onChangeFilter={changeFilter}
    />
  </div>;

App.state = combineState({
  todos: {
    onInit:  (props)=>props.initialTodos,
    addTodo: (props, todos, newTodoTitle)=>[
      {id: `${todos.length}`, title: newTodoTitle},
      ...todos
    ],
    updateTodo: (props, todos, todo, attrs)=>{
      const index = todos.indexOf(todo);
      if(index === -1) return todos;

      return [
        ...todos.slice(0, index),
        {...todo, ...attrs},
        ...todos.slice(index + 1)
      ];
    },
    clearCompleted: (props, todos)=>todos.filter(t=>!t.completed),
    toggleAll: (props, todos, event)=>
      todos.map(t=>({...t, completed: event.target.checked}))
  },
  filter: {
    onInit: ()=>'all',
    changeFilter: (props, filter, newFilter)=>newFilter
  }
});

export default App;
