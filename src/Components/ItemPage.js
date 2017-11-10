import React, { Component } from 'react';
import firebase from '../fire.js'
import '../App.css';
import { Link } from 'react-router-dom';
const database = firebase.database()

class ItemPage extends Component {
    constructor() {
        super();
        this.state = {
            listingID: [],
            item: {
                imageURL: "",
                blurb: "",
                price: "",
                sellerID: "",
                listingID: "",
                rating: {},
            }
        }
    }

    componentDidMount() {
        this.getItemInfo()
    }

    getItemInfo = () => {
        database.ref(`/items/${this.props.listingID}`).once('value').then(data => this.setState({ item: data.val() }))
    }

    rating = () => {
        const totalStars = this.state.item.rating.totalStars 
        const timesRated = this.state.item.rating.timesRated
        const ratingConst = totalStars / timesRated
        return ratingConst
    }

    render() {
        
        return (
            <div>
                {this.state.item.imageURL ? 
                <ul className="itemPage">
                <div>
                    <li><img src={this.state.item.imageURL} alt={this.state.item.blurb} className="fullsizeImage" /></li>
                </div>
                <div className="itemInfo">
                    <li>{this.state.item.itemName}</li>
                    <li>Price: ${this.state.item.price}</li>
                    <li>Description: {this.state.item.blurb}</li>
                    <li>Rating: {this.rating()}</li>
                    <Link to={`/users/${this.state.item.sellerID}`}>
                    <li>Sold by: {this.state.item.sellerID} </li>
                    </Link>
                    <button onSubmit={""}>BUY</button>
                </div>
                </ul>
                : false }
            </div>

        )
    }
}

export default ItemPage;