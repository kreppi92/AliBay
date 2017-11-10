import React, { Component } from 'react';
import '../App.css';
import { Link } from 'react-router-dom';


class ItemThumbnail extends Component {

    rating = () => {
        const totalStars = this.props.itemObject.rating.totalStars
        const timesRated = this.props.itemObject.rating.timesRated
        const ratingConst = totalStars / timesRated
        return ratingConst
    }

    render() {
        return (
            <Link to={`/items/${this.props.itemObject.listingID}`} >
                <div className="itemThumbnail hvr-border-fade">
                    <div className="thumbnailImage">
                        <img src={this.props.itemObject.imageURL} alt={this.props.itemObject.blurb} className="thumbnailImages" />
                    </div>
                    <div className="thumbnailInfo">
                        <div>{this.props.itemObject.itemName}</div>
                        <div>Price: ${this.props.itemObject.price}</div>
                        <div>Description: {this.props.itemObject.blurb}</div>
                        <div>Rating: {this.rating()}</div>
                    </div>
                </div>
            </Link>
        );
    }
}

export default ItemThumbnail;