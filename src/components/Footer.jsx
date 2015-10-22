export default ({filter, incompleteCount, onClearCompleted, onChangeFilter})=>
  <footer className="footer">
    <span className="todo-count">{incompleteCount} left</span>
    <ul className="filters">
      <li><a href="#/" className={filter === 'all' && 'selected'} onclick={()=>onChangeFilter('all')}>All</a></li>&nbsp;
      <li><a href="#/active" className={filter === 'active' && 'selected'} onclick={()=>onChangeFilter('active')}>Active</a></li>&nbsp;
      <li><a href="#/completed" className={filter === 'completed' && 'selected'} onclick={()=>onChangeFilter('completed')}>Completed</a></li>
    </ul>
    <button className="clear-completed" onclick={onClearCompleted}>
      Clear completed
    </button>
  </footer>;
