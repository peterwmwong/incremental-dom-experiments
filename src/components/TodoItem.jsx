import {checked} from '../helpers/dom.js';

export default ({key, todo, onToggle, onDestroy})=>{
  let className = '';
  if(todo.completed) className += 'completed';
  if(todo.editing)   className += 'editing';

	<li class={className} key={key}>
		<div class="view">
			<input
				class="toggle"
				type="checkbox"
				checked={checked(todo.completed)}
				onchange={onToggle} />
			<label>{todo.title}</label>
			<button class="destroy" onclick={onDestroy} />
		</div>
		<input class="edit" />
	</li>;
};
