import React, { Component } from 'react';
import firebase from '../fire.js'
import ItemThumbnail from './ItemThumbnail.js'
import '../App.css';

let database = firebase.database();

class ItemGrid extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.getItemInfo();
    }

    getItemInfo = () => {
        this.props.array.map(async (listingID) => {
            const itemInfo = (await database.ref(`/items/${listingID}`).once('value')).val()
            this.setState({ [listingID]: itemInfo });
        });
    }

    // getItemInfo = () => {
    //     let arrayOfPromises = []
    //     this.props.array.map( (listingID) => {
    //         let p = database.ref(`/items/${listingID}`).once('value');
    //         let pp = new Promise( (res, rej) => {
    //             p.then(data => res([data,listingID]));
    //         });
    //         arrayOfPromises.push(pp)
    //         // this.setState({ [listingID]: itemInfo });
    //     });
    //     Promise.all(arrayOfPromises)
    //         .then(lst => {
    //             let data = lst[0];
    //             let id = lst[1];
    //             data.forEach(item=>console.log("hi", item.val()))
    //             console.log(data, id)
    //         });
    // }

    render() {
        let thumbnails = []
        for (let itemID in this.state) {
            thumbnails.push(<ItemThumbnail itemID={itemID} key={itemID} itemObject={this.state[itemID]}/>)
        }
        
        return (
            <div className="itemGrid">
                {thumbnails}
            </div>
        );
    }
}

export default ItemGrid;