const todoClassName = (isEditing, todo)=>
    (isEditing      ? 'editing'    : '')
  + (todo.completed ? ' completed' : '');

const Todo = (props, state, {onInit, edit, input, keydown})=>
  <li key={props.todo.id} className={todoClassName(state.isEditing, props.todo)}>
    <div className="view">
      <input
        className='toggle'
        type='checkbox'
      />
      <label ondblclick={edit}>{props.todo.title}</label>
      <button className='destroy' />
    </div>
    <input
      type='text'
      className='edit'
      onblur={onInit}
      onkeydown={keydown}
      oninput={input}
      value={state.pendingTitle}
    />
  </li>;

Todo.state = {
  onInit: (props)=>({isEditing: false, pendingTitle: props.todo.title}),
  onProps:(props, state)=>({...state, pendingTitle: props.todo.title}),
  edit:   (props, state)=>({...state, isEditing: true }),
  input:  (props, state, event)=>({...state, pendingTitle: event.target.value}),
  keydown:(props, state, event)=>{
    if(event.which !== 13) return state;

    props.updateTodo(props.todo, {title: state.pendingTitle});
    return {...state, isEditing: false};
  }
};

export default Todo;
