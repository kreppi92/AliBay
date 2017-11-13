import React, { Component } from 'react';
import firebase from '../fire.js'
import '../App.css';
import { createListing } from './functions.js'
const database = firebase.database()
const storageRef = firebase.storage().ref(); //

class CreateListing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: this.props.loggedIn,
            imagePreview: "",
            newListingID: "",
            listingPosted: false
        }
    }

    _imageUpload = (e) => {
        const key = database.ref('/imagePreviewPlaceholder').push().key;
        storageRef
            .child(`${key}.jpg`)
            .put(e.target.files[0])
            .then((data) => {
                this.setState({ imagePreview: data.downloadURL })
            }
            )
    }

    _handleCreateListing = (e) => {
        e.preventDefault()
        console.log("price", this.price.value, "this blurb", this.blurb.value, "this.state.imagePreview", this.state.imagePreview)
        createListing(this.props.userID, this.price.value, this.blurb.value, this.state.imagePreview)
            .then(data => this.setState({ newListingID: data, listingPosted: true }))
    }

    // async function createListing(sellerID, price, blurb, imageURL) {
    render() {

        return (
            <div>
                <h2>Create Listing</h2>
                {this.state.listingPosted ?
                    (<div><h2>Congrats! {this.state.newListingID} has been created!</h2></div>)
                    :
                    (<form onSubmit={this._handleCreateListing}>
                        <div className="imageUploadDisplay">
                            <img src={this.state.imagePreview} alt="Please upload" className="imageDisplay"/>
                            <div>
                                <input type="file" id="input" onChange={this._imageUpload} />
                            </div>
                            <div>
                                <h3>Price</h3>
                                <input type="text" ref={r => this.price = r} />
                            </div>
                            <div>
                                <h3>blurb</h3>
                                <input type="text" ref={r => this.blurb = r} />
                            </div>
                            <button type="submit">Create Listing</button>
                        </div>
                    </form>
                    )
                }
            </div>

        )
    }
}

export default CreateListing;