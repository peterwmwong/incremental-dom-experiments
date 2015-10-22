Playing around with xvdom and JSX...

> npm install

> npm run server

`http://localhost:8080/`

### TODOS

- Component as a root
  const App = (state, {doit})=><div></div>
  App.state = {
    onInit: props=>({}),
    doit:   state=>state
  }

  ```
  xvdom.renderInstance(<App />)
  // Call doit
  ```
