import React, { Component } from 'react';
import ItemGrid from './ItemGrid.js'
// import firebase from './fire.js'
// const database = firebase.database()


class SearchResults extends Component {
  constructor(props) {
    super(props);
    this.state = { searchResults: this.props.searchResults }
  }

  render() {
      console.log("console in searchresults", this.state.searchResults)
    return (
      <div className="Home">
      <h2>Search Results... </h2>
        {this.state.searchResults.length > 0 ? <ItemGrid array={this.state.searchResults}/> : false}
      </div>
    );
  }
}

export default SearchResults;
