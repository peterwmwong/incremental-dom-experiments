import StatefulComponent from '../helpers/StatefulComponent';

export default StatefulComponent({
  render:({incompleteCount, onClearCompleted})=>
    <footer className="footer">
      <span className="todo-count">{incompleteCount} left</span>
      <ul className="filters">
        <li><a href="#/" className="selected">All</a></li>&nbsp;
        <li><a href="#/active" className="selected">Active</a></li>&nbsp;
        <li><a href="#/completed" className="selected">Completed</a></li>
      </ul>
  		<button className="clear-completed" onclick={onClearCompleted}>
  			Clear completed
  		</button>
    </footer>,

  shouldUpdate:(props, prevProps)=>props.incompleteCount !== prevProps.incompleteCount
});
