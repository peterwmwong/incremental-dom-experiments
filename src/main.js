import 'xvdom';
import {createStore} from 'redux';
import App from './components/App.jsx';

console.log(createStore);
document.body = xvdom.renderInstance(<App />);
