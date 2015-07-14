export default ({todo, onToggle, onDestroy})=>{
  let className = '';
  if(todo.completed) className += 'completed';
  if(todo.editing)   className += 'editing';

	<li class={className} key={todo.id}>
		<div class="view">
			<input
				class="toggle"
				type="checkbox"
				checked={todo.completed}
				onChange={onToggle} />
			<label>{todo.title}</label>
			<button class="destroy" onClick={onDestroy} />
		</div>
		<input class="edit" />
	</li>;
};
