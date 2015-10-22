import Footer from './Footer.jsx';
import Header from './Header.jsx';
import Todo   from './Todo.jsx';

const countIncompleted = todos=>
  todos.reduce((count, t)=>count + (t.completed ? 0 : 1), 0);

const INIT_TODOS = [];
for(let j = 0; j < 5; j++){
  INIT_TODOS.push({id:`${j}`, title: `todo ${j}`});
}

const App = (props, {todos, numIncompleted}, {addTodo, updateTodo})=>
  <div className='todoapp'>
    <Header onAddTodo={addTodo} />
    <section className='main'>
      <input
        className='toggle-all'
        type='checkbox'
        checked={!numIncompleted} />
      <ul className='todo-list'>
        {todos.map(todo=>
          <Todo key={todo.id} todo={todo} updateTodo={updateTodo} />
        )}
      </ul>
    </section>
    <Footer incompleteCount={numIncompleted} onClearCompleted={()=>{}}/>
  </div>;

App.state = {
  onInit: ()=>({todos: INIT_TODOS, numIncompleted: countIncompleted(INIT_TODOS)}),
  addTodo: (props, {todos}, newTodoTitle)=>{
    const newTodos = [
      {id: `${todos.length}`, title: newTodoTitle},
      ...todos
    ];
    return {
      todos: newTodos,
      numIncompleted: countIncompleted(newTodos)
    };
  },
  updateTodo: (props, state, todo, attrs)=>{
    const todos = state.todos;
    const index = todos.indexOf(todo);
    if(index === -1) return state;

    const newTodos = [
      ...todos.slice(0, index),
      {...todo, ...attrs},
      ...todos.slice(index + 1)
    ];
    return {todos: newTodos, numIncompleted: countIncompleted(todos)};
  }
};

export default App;
