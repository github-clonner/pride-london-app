// @flow
import React, { Component } from "react";
import { YellowBox } from "react-native";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import SplashScreen from "react-native-splash-screen";
import { Client } from "bugsnag-react-native";
import reducers from "./reducers";
import { getEvents } from "./actions/events";
import { loadSavedEvents } from "./actions/saved-events";
import App from "./App";

const bugsnag = new Client();

// https://github.com/react-navigation/react-navigation/issues/3956#issuecomment-380648083
YellowBox.ignoreWarnings([
  "Warning: isMounted(...) is deprecated",
  "Module RCTImageLoader"
]);

const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunk))
);

class AppWrapper extends Component<{}> {
  componentDidMount() {
    SplashScreen.hide();
    bugsnag.notify(new Error("Test error"));
    store.dispatch(getEvents());
    store.dispatch(loadSavedEvents());
  }
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}

export default AppWrapper;
