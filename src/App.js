import React, { Component } from 'react';
import './App.css';
import { Route, BrowserRouter } from 'react-router-dom'
import Home from './Components/Home.js'
import Header from './Components/Header.js'
import ItemPage from './Components/ItemPage.js'
import UserPage from './Components/UserPage.js'
// import firebase from './fire.js'
// const database = firebase.database()


class App extends Component {
  constructor() {
    super();
    this.state = {}
  }

  render() {

    return (
      <BrowserRouter>
      <div className="App">
        <Header/>
        <Route path="/" exact={true} render={() => <Home/>} />
        <Route path="/items/:listingid" exact={true} render={(props) => <ItemPage listingID={props.location.pathname.slice(7)}/>} />
        <Route path="/users/:userid" exact={true} render={(props) => <UserPage userID={props.location.pathname.slice(7)}/>} />
      </div>
      </BrowserRouter>
    );
  }
}

export default App;
