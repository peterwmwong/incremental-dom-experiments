import 'todomvc-app-css/index.css';

import IncrementalDOM from 'incremental-dom';
import App            from './components/App.jsx';

window.IncrementalDOM = IncrementalDOM;

// TODO(pwong): figure out a way to patch this in the babel-plugin-incremental-dom
const origText = IncrementalDOM.text;
IncrementalDOM.text = function(value){ if(value != null) origText(value); };

IncrementalDOM.patch(window.APP, App);
