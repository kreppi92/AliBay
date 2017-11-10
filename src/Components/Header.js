import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';


class Header extends Component {
    constructor() {
        super();
        this.state = {};
    }

    render() {

        return (
            <div>
                <div className="header">
                    <div className="icons hvr-grow">
                        <Link to={"/login"}>
                            <img src="https://firebasestorage.googleapis.com/v0/b/alibay-1065c.appspot.com/o/userIcon.png?alt=media&token=4afb3f1a-e318-404b-beea-8513233872c1" alt="user" className="headerImage"/>
                        </Link>
                    </div>
                    <div className="logoMain hvr-grow">
                        <Link to={"/"}>
                            <img src="https://firebasestorage.googleapis.com/v0/b/alibay-1065c.appspot.com/o/aliBayIcon.png?alt=media&token=853fcdbc-a43c-49ad-a22c-bae017a89d06" alt="logo" className="headerImage"/>
                        </Link>
                    </div>
                    <div className="icons hvr-grow">
                        <Link to={"/"}>
                            <img src="https://firebasestorage.googleapis.com/v0/b/alibay-1065c.appspot.com/o/itemIcon.png?alt=media&token=f9937a5d-e153-49cf-b768-5610f53f7038" alt="items" className="headerImage"/>
                        </Link>
                    </div>
                </div>
                <div className="searchBar">
                    <input type="text" ref={r => this.search = r} />
                </div>
            </div>
        )
    }
}

export default Header;