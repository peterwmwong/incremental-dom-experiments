Playing around with incremental dom and JSX...

> npm install

> npm run server

`http://localhost:8080/`

# Lessons Learned

## Component

### BUG: Conditional Rendering can be confused

Without a key, `<Child1/>` will get re-rendered after clicking the
"Switch" button.

```js
const Child1 = component({
  render:()=><div>1</div>
});

const Child2 = component({
  render:()=><div>2</div>
});

const Parent = component({
  getInitialState:()=>"Child1",
  render(props, state){
    return (
      <div>
        <button onclick={::this.switchChild}>Switch</button>
        {state === "Child1" && <Child1 />}
        {state === "Child2" && <Child2 />}
      </div>
    )
  },

  switchChild(){
    this.setState(this.state === "Child1" ? "Child2" : "Child1");
  }
})
```
