import React, { Component } from 'react';
import ItemGrid from './ItemGrid.js'
import { allListings } from './functions.js'
// import firebase from './fire.js'
// const database = firebase.database()


class Home extends Component {
  constructor() {
    super();
    this.state = { allListings: [] }
  }

  componentDidMount () {
    allListings()
    .then(results => {
      this.setState({ allListings: results })
    })
  }

  render() {
    return (
      <div className="Home">
      <h2>All Listings</h2>
        {this.state.allListings.length ? <ItemGrid array={this.state.allListings}/> : false}
      </div>
    );
  }
}

export default Home;
