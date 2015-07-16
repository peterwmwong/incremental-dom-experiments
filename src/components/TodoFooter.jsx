export default ({incompleteCount, onClearCompleted})=>
  <footer class="footer">
    <span class="todo-count">{incompleteCount} left</span>
    <ul class="filters">
      <li><a href="#/" class="selected">All</a></li>&nbsp;
      <li><a href="#/active" class="selected">Active</a></li>&nbsp;
      <li><a href="#/completed" class="selected">Completed</a></li>
    </ul>
		<button class="clear-completed" onclick={onClearCompleted}>
			Clear completed
		</button>
  </footer>;
