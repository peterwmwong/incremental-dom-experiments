import 'todomvc-app-css/index.css';
import 'xvdom';
import App from './components/App.jsx';

const INIT_TODOS = [];
for(let j = 0; j < 5; j++){
  INIT_TODOS.push({id:`${j}`, title: `todo ${j}`});
}

const body = document.body = document.body || document.createElement('body');
body.appendChild(
  xvdom.renderInstance(<App initialTodos={INIT_TODOS}/>)
);
