import {checked, value} from '../helpers/dom.js';
import StatefulComponent from '../helpers/StatefulComponent';

function handleBeginEditing(){
  this.setState({pendingTitle:this.props.todo.title, isEditing:true});
}

function handleEndEditing(){
  this.setState({isEditing:false});
}

function handleCommitEdit(){
  if(this.state.isEditing){
    this.props.todo.title = this.state.pendingTitle;
    handleEndEditing.call(this);
  }
}

function handlePendingEditKeydown(e){
  let handled = false;
  if(e.which === 13) {
    handleCommitEdit.call(this);
    handled = true;
  }
  else if(e.which === 27){
    handleEndEditing.call(this);
    handled = true;
  }

  if(handled){
    e.preventDefault();
    e.stopImmediatePropagation();
  }
}

function handlePendingEditInput({which, target}){
  this.setState({pendingTitle:target.value, isEditing:this.state.isEditing});
}

export default StatefulComponent({
  reduce:(props, state)=>({isEditing:false}),

  render({key, todo, onTitleChange, onToggle, onDestroy}, {pendingTitle, isEditing}){
    console.log('rendering', todo.title);
    let className = '';
    if(todo.completed) className += 'completed';
    if(isEditing) className += ' editing';

    return (
    	<li class={className} key={key}>
    		<div class="view">
    			<input
    				class="toggle"
    				type="checkbox"
    				checked={checked(todo.completed)}
    				onchange={onToggle} />
          <label ondblclick={handleBeginEditing.bind(this)}>{todo.title}</label>
    			<button class="destroy" onclick={onDestroy} />
    		</div>
    		<input
          type="text"
          class="edit"
          onblur={handleCommitEdit.bind(this)}
          onkeydown={handlePendingEditKeydown.bind(this)}
          oninput={handlePendingEditInput.bind(this)}
          value={value(pendingTitle)} />
    	</li>
    );
  },

  shouldUpdate:(props, prevProps)=>
    props.todo.title !== prevProps.todo.title ||
      props.todo.completed !== prevProps.todo.completed

});
