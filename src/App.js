import React from 'react';
import './styles/App.css';
import Sidebar from './Sidebar';
import Chat from './Chat';
import Login from './Login';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { useStateValue } from './StateProvider';

function App() {
  const [{ user }, dispatch] = useStateValue();

  return (
    <div className="app">

      {
        !user ? (
          <Login />
        ) : (
          <div className="app__body">
            <BrowserRouter>
              <Switch>
                <Route path="/rooms/:roomId">
                <Sidebar />
                  <Chat />
                </Route>
                <Route path="/">
                <Sidebar />
                  <Chat />
                </Route>
              </Switch>
            </BrowserRouter>
          </div>
        )
      }
    </div>
  );
}

export default App;
