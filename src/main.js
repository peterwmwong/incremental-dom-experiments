import 'todomvc-app-css/index.css';
import 'xvdom';
import App from './components/App.jsx';

const body = document.body = document.body || document.createElement('body');
body.appendChild(
  xvdom.renderInstance(<div><App /></div>)
);
