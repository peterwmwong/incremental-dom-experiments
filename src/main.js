import "./main.css";
import IncrementalDOM from "incremental-dom";
import App            from "./components/App.jsx";

window.IncrementalDOM = IncrementalDOM;
IncrementalDOM.attributes.applyAttr = function(el, name, value){
  el[name] = value;
};
IncrementalDOM.patch(window.APP, App);
