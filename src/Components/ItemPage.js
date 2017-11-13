import React, { Component } from 'react';
import firebase from '../fire.js'
import '../App.css';
import { Link } from 'react-router-dom';
import { buy } from './functions.js'
const database = firebase.database()

class ItemPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: this.props.loggedIn,
            listingID: [],
            item: {
                imageURL: "",
                blurb: "",
                price: "",
                sellerID: "",
                listingID: "",
                rating: {},
                itemBought: false,
            },
        }
    }

    componentDidMount() {
        this.getItemInfo();
    }

    getItemInfo = () => {
        database.ref(`/items/${this.props.listingID}`).once('value').then(data => this.setState({ item: data.val() }))
    }

    rating = () => {
        const totalStars = this.state.item.rating.totalStars
        const timesRated = this.state.item.rating.timesRated
        const ratingConst = totalStars / timesRated
        let rating
        if (ratingConst>0) {rating = ratingConst} else {rating = 0}
        return rating
    }
    // buy(buyerID, sellerID, listingID)

    _handleBuy = (e) => {
        e.preventDefault();
        buy(this.props.userID.uid, this.state.item.sellerID, this.state.item.listingID);
        this.setState({ itemBought: true })
    }

    render() {
        return (
            <div>
                {this.state.item.imageURL ?
                    (<div>
                        {!this.state.itemBought ?
                            (<div className="itemPage">
                                <div>
                                    <img src={this.state.item.imageURL} alt={this.state.item.blurb} className="imageDisplay" />
                                </div>
                                <div className="itemInfo">
                                    <ul>
                                        <li>{this.state.item.itemName}</li>
                                        <li>Price: ${this.state.item.price}</li>
                                        <li>Description: {this.state.item.blurb}</li>
                                        <li>Rating: {this.rating()}</li>
                                        <Link to={`/users/${this.state.item.sellerID}`}>
                                            <li>Sold by: {this.state.item.sellerID} </li>
                                        </Link>
                                    </ul>
                                    {this.state.loggedIn ?
                                        (<button onClick={this._handleBuy}>BUY</button>)
                                        :
                                        (<p>Please login to buy</p>)}
                                </div>
                            </div>)
                            :
                            (<h2>Item successfully purchased!</h2>)
                        }

                    </div>)
                    : false}
            </div>

        )
    }
}


export default ItemPage;