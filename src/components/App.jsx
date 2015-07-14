import stateful from '../helpers/stateful';

// import TodoItem   from './TodoItem.jsx';
// import TodoFooter from './TodoFooter.jsx';
//
// function handleNewTodoKeyDown(){ }
// function handleToggleAll(){ }
// function handleToggle(){ }
// function handleDestroy(){ }
//
// export default ()=>{
//   let activeTodoCount = 0;
//   let shownTodos      = [{id:1, completed:false, title:'Hilaaarious'}];
//
//   <div>
// 		<header class="header">
// 			<h1>todos</h1>
// 			<input
// 				ref="newField"
// 				class="new-todo"
// 				placeholder="What needs to be done?"
// 				onKeyDown={handleNewTodoKeyDown}
// 				autoFocus={true} />
// 		</header>
// 		<section class="main">
// 			<input
// 				class="toggle-all"
// 				type="checkbox"
// 				onChange={handleToggleAll}
// 				checked={activeTodoCount === 0} />
// 			<ul class="todo-list">
//         {shownTodos.forEach(todo=>
//           <TodoItem todo={todo} onToggle={handleToggle} onDestroy={handleDestroy}/>
//         )}
// 			</ul>
// 		</section>
//     <TodoFooter />
//   </div>;
// };

const Counter = stateful(
  count=>count || 0,
  ({key, name}, count, setState)=>{
    <div key={key}>
      <span>{count} {name} &nbsp;&nbsp;&nbsp;</span>
      <button onclick={()=>setState(++count)}>Hello World</button>
    </div>;
  }
);


const Counter2 = ({key, name}, count, setState)=>{
  <div key={key}>
    <span>{count || 'hello'} {name} &nbsp;&nbsp;&nbsp;</span>
    <button onclick={()=>setState(++count)}>Hello World</button>
  </div>;
};

const list = Array.apply(null, {length: 100}).map(Number.call, Number);

export default ()=>{
  <div>
    {list.forEach(i=>{
      <Counter key={i} name={'C' + i} />;
    })}
  </div>;
};
