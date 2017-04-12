import React, { Component } from "react";
import App from "./App";
import { Provider } from "react-redux";
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from "redux";
import reducers from "./reducers/index";
import ReactGA from 'react-ga';

const store = createStore(
  reducers,
  applyMiddleware(thunk)
);

const examples = [
  {
    component: App,
    label: "App"
  }
];

export default class Main extends Component {

  state = {
    index: 0
  };

  indexToExample = index => examples[index].component;

  onClick(index) {
    if (this.state.index !== index) {
      this.setState({ index });
    }
  }

  render() {
    ReactGA.set({ page: window.location.pathname });
    ReactGA.pageview(window.location.pathname);
    return (
        <Provider store={store}>
          <App />
        </Provider>
    );
  }
}
