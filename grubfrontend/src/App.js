import React from 'react';
import './App.css';
import Main from './../src/components/Main';
import { createStore } from 'redux'
import { Provider } from 'react-redux';
import app from './reducers/index';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { graphqlUrl} from './config/urlConfig';

const client = new ApolloClient({
  uri: graphqlUrl
});

const initialState = { "isLoggedIn": false, "emailId": null, "firstName": null, restDetails: {}, app: {} };

const store = createStore(app, initialState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

function App() {

  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <Main />
      </Provider>
    </ApolloProvider>

  );
}

export default App;
