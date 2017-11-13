import React, { Component } from 'react';
import './App.css';
import { Route, BrowserRouter } from 'react-router-dom'
import Home from './Components/Home.js'
import Header from './Components/Header.js'
import ItemPage from './Components/ItemPage.js'
import UserPage from './Components/UserPage.js'
import CreateListing from './Components/CreateListing.js'
import SearchResults from './Components/SearchResults.js'
import { initializeUserIfNeeded, searchForListings } from './Components/functions.js'
// import firebase from './fire.js'
// const database = firebase.database()


class App extends Component {
  constructor() {
    super();
    this.state = {
      user: {
        uid: "",
      },
      loggedIn: false,
      searchResults: [],
    }
  }

  _handleLogin = (e) => {
    e.preventDefault();
    initializeUserIfNeeded().then((user) => {
      this.setState({ user: user, loggedIn: true });
    }
    )
  }

  _handleSearch = (e) => {
    e.preventDefault();

  searchForListings(this.search).then( result => {
      this.setState({searchResults: result}).then( result => console.log("result in app", result) );
    })
  }

  render() {

    return (
      <BrowserRouter>
        <div className="App">
          <Header handleLogin={this._handleLogin} props={this.state.user} loggedIn={this.state.loggedIn} handleSearch={this._handleSearch}/>
          <Route path="/" exact={true} render={() => <Home />} />
          <Route path="/searchresults" exact={true} render={() => <SearchResults searchResults={this.state.searchResults} />} />
          <Route path="/items/:listingid" exact={true} render={(props) => <ItemPage listingID={props.location.pathname.slice(7)} userID={this.state.user}/>} />
          <Route path="/users/:userid" exact={true} render={(props) => <UserPage userID={props.location.pathname.slice(7)}/>} />
          <Route path="/createlisting" exact={true} render={() => <CreateListing userID={this.state.user.uid}/>} loggedIn={this.state.loggedIn}/>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
