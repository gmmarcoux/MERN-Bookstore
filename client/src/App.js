import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SearchBooks from './pages/SearchBooks';
import SavedBooks from './pages/SavedBooks';
import Navbar from './components/Navbar';

import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';

const client = new ApolloClient ({
  request: operation => {
    const token = localStorage.getItem('id_token');

    operation.setContext ({
      headers: {
        authorization: token ? 'Bearer ${token}' : "",
      },
    });
  },
  uri: '/graphql'
});

function App() {
  return (
    <Router>
      <>
        <Navbar />
        <Switch>
          <Route exact path='/' component={SearchBooks} />
          <Route exact path='/saved' component={SavedBooks} />
          <Route render={() => <h1 className='display-2'>Wrong page!</h1>} />
        </Switch>
      </>
    </Router>
  );
}

export default App;
