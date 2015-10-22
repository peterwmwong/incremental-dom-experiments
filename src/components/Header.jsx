const Header = (props, {value}, {input})=>
  <header className='header'>
    <h1>todos</h1>
    <input
      className='new-todo'
      placeholder='What needs to be done?'
      onkeyup={input}
      value={value}
      autofocus
    />
  </header>;

Header.state = {
  onInit: ()=>({value: ''}),
  input: (props, state, event)=>{
    let value = event.target.value;
    if(event.which === 13){
      props.onAddTodo(value);
      value = '';
    }
    return {value};
  }
};

export default Header;
