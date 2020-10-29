import React, {Component} from 'react';
import { Provider } from './context';
import Contacts from './component/Contact/Contacts';
import AddContact from './component/Contact/AddContact';
import EditContact from './component/Contact/EditContact';
import About from './component/pages/About';
import Page404 from './component/pages/Page404';
import Header from './component/layout/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import {HashRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css'; 

class App extends Component {
 render(){
  return (
    <Provider>
      <Router>
        <div className="App">
          <Header branding="Contact Manager"/>
        <div className="container">
        <Switch>
            <Route  exact path="/" component={Contacts} />
            <Route  exact path="/contact/add" component={AddContact}/>
            <Route  exact path="/contact/edit/:id" component={EditContact}/>
            <Route  exact path="/about" component={About} />
            <Route component={Page404} />
        </Switch>
        </div>
        </div>
      </ Router>
    </Provider>
  );
 }
}

export default App;
