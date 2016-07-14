## API

### `<Provider refraction>`

`Provider` component makes refraction available in children `context`. This is useful if you want to use refraction inside components or use `connect`.

#### Props

* `refraction` (*Refraction*): Your refraction instance.
* `children` (*ReactElement*): Your entire application.

#### Example

```js
const refraction = new Refraction();

ReactDOM.render(
  <Provider refraction={refraction}>
    <App />
  </Provider>,
  document.getElementById('root')
);
```

Now, in `App`, you can use refraction in this way:

```js
class App extends React.Component {

  static contextTypes  = {
    refraction: React.PropTypes.object,
  }

  componentDidMount() {
    // Eg: publish an event
    this.context.refraction.applicationStart();
    // this.context.refraction.publish('applicationStart', {})
  }

  render() {
    return (
      <div>
        // ... your application
      </div>
    );
  }
}
```

### `connect({ actions, subscriptions })`

**In order to use this function, your application must be wrapped by Provider**

`connect` function allows you to connect refraction to your React components without subscribing, unsubscribing and publishing manually.

#### Arguments

`connect` accept a single object with these properties:

- `actions` (*Object*): map component properties to refraction publishers. Attributes name of `actions` identify component properties, attributes value identify refraction publishers. If a publisher with that name is unavailable, connect will create a new function that publish the value for you.
- `subscriptions` (*Object*): an object that consist in a series of function that return new properties. Attributes name of `subscriptions` identify channels to handle, attributes value identify a function that must return an object representing new component props. This function accept the value hold by the channel and the actual props of component. **New properties will be merged with the old. Returning an object that has no value for a certain prop means maintain the old one.**

#### Returns

(*React.Component*): Container component connected to refraction

#### Example

**N.B. Comments indicate the equivalent code without connect function**

```js
class Input extends React.Component {
  ...
}

const InputContainer = connect({
  actions: {
    // <Input onChange={refraction.onInputChange} />
    // or if unavailable
    // <Input onChange={refraction.publish.bind(null, 'onInputChange')} />
    // will publish an event on input change
    onChange: 'onInputChange',
  },
  subscriptions: {
    // <Input value={payload} />
    // handle the event and set props.value equals to payload
    // only if is valid, set old value instead (not overwriting it)
    onInputChange: (param, props) => {
      const newProps = {};
      if (param.payload) {
        newProps.value = param.payload;
      }
      return newProps;
    },
  },
})(Input);
```
