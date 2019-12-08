import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createStore , compose , applyMiddleware , combineReducers} from 'redux'
import { Provider } from 'react-redux';
import app from './reducers/index';
import { graphqlUrl } from './config/urlConfig';
import {ApolloClient} from 'apollo-boost';
import { ApolloProvider} from 'react-apollo';

const client = new ApolloClient({
  uri: graphqlUrl
})

const initialState = { "isLoggedIn": false, "emailId": null, "firstName": null, restDetails: {}, app: {} };

const store = createStore(combineReducers({
  app: app,
  apollo: client.reducer(),
}), initialState,compose(applyMiddleware(client.middleware()), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));


ReactDOM.render(
  <ApolloProvider client={client} store = {store}>
    <App/>
  </ApolloProvider>
  , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
