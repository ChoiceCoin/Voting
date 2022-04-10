import React from 'react'
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';
import Result from './components/CreatePoll/CreatePoll';
import CreatePoll from './components/Result/Result';
import Docs from './components/Docs/Docs';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/result" component={CreatePoll} />
          <Route exact path="/createpoll" component={Result} />
          <Route exact path="/docs" component={Docs} />
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
