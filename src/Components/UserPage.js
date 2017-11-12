import React, { Component } from 'react';
import firebase from '../fire.js'
import '../App.css';
// import { Link } from 'react-router-dom';
import { allItemsSold, allItemsBought, allItemsForSale } from './functions.js'
import ItemGrid from './ItemGrid.js'
const database = firebase.database()

class UserPage extends Component {
    constructor() {
        super();
        this.state = {
            userID: [],
            user: {
                avatar: "",
                email: "",
                username: ""
            },
            allItemsForSale: [],
            allItemsSold: [],
            allItemsBought: []
        }
    }

    componentDidMount() {
        this.getUserInfo()
        allItemsForSale(this.props.userID).then(data => this.setState({allItemsForSale: data}));
        allItemsSold(this.props.userID).then(data => this.setState({allItemsSold: data}));
        allItemsBought(this.props.userID).then(data => this.setState({allItemsBought: data}));
    }

    getUserInfo = () => {
        database.ref(`/users/${this.props.userID}`).once('value')
            .then(data => this.setState({ user: data.val() }))
    }

    render() {
       
        return (
            <div>
                {this.state.user.avatar ?
                    <div>
                    <div className="userPage">
                        <div>
                            <div><img src={this.state.user.avatar} alt={this.state.user.username} className="fullsizeImage" /></div>
                        </div>
                        <div className="userInfo">
                            <div>{this.state.user.username}</div>
                            <div>Email: {this.state.user.email}</div>
                        </div>
                    </div>
                    <div>
                        <h2>All Items For Sale</h2>
                        {this.state.allItemsForSale.length ? <ItemGrid array={this.state.allItemsForSale}/> : false}
                    </div>
                    <div>
                        <h2>All Items Sold</h2>
                        {this.state.allItemsSold.length ? <ItemGrid array={this.state.allItemsSold}/> : false}
                    </div>
                    <div>
                        <h2>All Items Bought</h2>
                        {this.state.allItemsBought.length ? <ItemGrid array={this.state.allItemsBought}/> : false}
                    </div>
                    </div>
                    : false}
            </div>

        )
    }
}

export default UserPage;