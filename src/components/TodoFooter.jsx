function onClearCompleted(){ }

export default ()=>{
  let activeTodoWord = 0;
  let todoCount = 0;

  <footer class="footer">
    <span class="todo-count">
      <strong>{todoCount}</strong> {activeTodoWord} left
    </span>
    <ul class="filters">
      <li>
        <a href="#/" class="selected">All</a>
      </li>
      &nbsp;
      <li>
        <a href="#/active" class="selected">Active</a>
      </li>
      &nbsp;
      <li>
        <a href="#/completed" class="selected">Completed</a>
      </li>
    </ul>
		<button class="clear-completed" onclick={onClearCompleted}>
			Clear completed
		</button>
  </footer>;
};
