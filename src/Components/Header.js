import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';


class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false,
            username: '',
            searchTerm: "",
        };
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.props.username !== prevProps.props.username) this.setState({
            loggedIn: this.props.loggedIn,
            username: this.props.props.username,
            avatar: this.props.props.avatar,
            uid: this.props.props.uid,
        })

    }

    render() {

        return (
            <div>
                <div className="header">
                    <div className="icons hvr-grow">
                        {this.state.loggedIn ?
                            (<Link to={`/users/${this.state.uid}`}>
                                <img src={this.state.avatar} alt="Profile" className="avatar" />
                            </Link>)
                            :
                            (<img src="https://firebasestorage.googleapis.com/v0/b/alibay-1065c.appspot.com/o/userIcon.png?alt=media&token=4afb3f1a-e318-404b-beea-8513233872c1" alt="user" className="headerImage" onClick={this.props.handleLogin} />)
                        }
                    </div>
                    <div className="logoMain hvr-grow">
                        <Link to={"/"}>
                            <img src="https://firebasestorage.googleapis.com/v0/b/alibay-1065c.appspot.com/o/aliBayIcon.png?alt=media&token=853fcdbc-a43c-49ad-a22c-bae017a89d06" alt="logo" className="headerImage" />
                        </Link>
                    </div>
                    <div className="icons hvr-grow">
                        <Link to={"/"}>
                            <img src="https://firebasestorage.googleapis.com/v0/b/alibay-1065c.appspot.com/o/itemIcon.png?alt=media&token=f9937a5d-e153-49cf-b768-5610f53f7038" alt="items" className="headerImage" />
                        </Link>
                    </div>
                </div>
                <div className="searchBar">
                    <div className="icons hvr-grow">
                        {this.state.loggedIn ? `Welcome ${this.state.username}` : "Please login"}
                    </div>
                    <div className="logoMain">
                        <form onSubmit={this.props.handleSearch}>
                            <input type="text" ref={r => this.search = r}/>
                            <Link to={"/searchresults"}>
                                <button>Search</button>
                            </Link>
                        </form>
                        <div>
                            {this.state.loggedIn ?
                                (<Link to={"/createlisting"}>
                                    <button>Create Listing</button>
                                </Link>)
                                :
                                (<Link to={"/createlisting"}><button onClick={this.props.handleLogin}>Create Listing</button></Link>)
                            }
                        </div>
                    </div>
                    <div className="icons hvr-grow">
                        Browse items
                     </div>
                </div>
            </div>
        )
    }
}

export default Header;