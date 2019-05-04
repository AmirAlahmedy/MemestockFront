import React, { Component } from 'react';
import './Listings.css';
import Thread from '../../Routes/Thread/Thread';
import { BrowserRouter as Router, Switch, Route, withRouter, Redirect, NavLink } from 'react-router-dom'
import data from '../../Mocks/threads-data.json';
import axios from '../../axios-orders';
import '../../Sass/styles.scss';
import Subreddit from '../../Routes/Subreddit/Subreddit';
import Aux from '../HOC/Auxiliary';
import Button from '../UI/Button/Button';


let inProduction = true;
let view = null;
export default class Listings extends Component {



    render() {
        view = this.props.view;
        localStorage.setItem('view', this.props.view);
        return (

            <Router>
                <Aux>
                    <Switch>
                        <Route path="/Home/" exact render={
                            props => {
                                return <Threads listingUpdater={this.props.listingUpdater} view={this.props.view} sort={this.props.sort} />
                            }
                        } />
                        <Route path="/r" component={Subreddit} />
                    </Switch>

                </Aux>
            </Router>


        );

    }
    token = this.props.authToken;

}
const token = Listings.token;

class Threads extends Component {
    state = {
        threads: [],
        sort: 'new',
    }

    startPosition = { startPosition: 0 };
    headers = {
        'Content-Type': 'application/json',
        'auth': localStorage.getItem('token')
    }
    componentDidMount = () => {
        console.log(this.props.match);
        console.log(token);
        console.log(localStorage.getItem('token'));
        //  this.props.history.replace('/r/');
        this.getListing(this.props.sort);
        this.setState({
            sort: this.props.sort
        });
        this.props.listingUpdater(this.getListing.bind(this));
        window.addEventListener("scroll", () => {
            if (document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight) {

                axios.get(`/me/listing?type=${this.props.sort}&_id=${this.state.lastID}&votes=${this.state.lastVotes}&hotindex=${this.lastHotIndex}`, { headers: this.headers })
                    .then(response => {
                        console.log(response);
                        this.reqThreads = response.data;
                        this.setState({
                            reqThreads: response.data,

                        });

                    })
                    .catch(error => {

                    })

            }
        })


    }


    createSubHand = () => {
        console.log('create community');
        return (<Redirect to="/create-subreddit/" />);

    }

    /**
     * For generating threads from a mock service
     * @function createThread
     * @param {object} - object of the mocked thread.
     */
    createThread = thread => <Thread
        // key={thread._id}
        // username={thread.creatorUsername}
        subreddit={thread.subredditName}
        title={thread.title}
        conten t={thread.body}
        view={this.props.view}
        upvotes={thread.votes}
    />;
    // Ya Amiir....
    //Aywa 3ayyez eh?

    /**
     * For generating threads from a mock service
     * @function getThreads
     * @param {view} - the listings view, whether cards or calssic.
     */
    getThreads(view) {
        if (!this.state.reqThreads || !this.state.reqThreads.posts) return;
        let posts = inProduction ? this.state.reqThreads.posts : data.threads;
        return posts.map(thr => <Thread
            id={thr._id}
            username={thr.creatorUsername}
            subreddit={thr.subredditName}
            title={thr.title}
            content={thr.body}
            view={view}
            upvotes={thr.votes}
        />)
    }

    /**
     * For generating threads from a mock service
     * @function createThreads
     * @param {array} - array of the mocked threads
     */
    createThreads = Threads => Threads.map(this.createThread);
    goToCreatePost() {
        window.location.href = "/CreatePost/";
    }
    goToCreateSr() {
        window.location.href = "/create-subreddit/";
    }
    getListing(sort) {
        console.log("sort: ", sort);
        if (inProduction === true && localStorage.getItem('inProduction')) {
            //It's done ha, zbat l configuration bta3ha b2a
            axios.get(`/me/listing?type=${sort}&_id=0&votes=0&hotindex=0`, { headers: this.headers })
                .then(response => {
                    this.reqThreads = response.data;
                    this.setState({ reqThreads: response.data });
                })
                .catch(error => {

                })
        } else {

            this.setState({ reqThreads: data.threads });
            let thrds = this.createThreads(data.threads);
            this.setState({ threads: thrds });
        }
    }
    render() {

        return (
            <Aux>
                <div className='listingsContainer'>
                    {this.getThreads(this.props.view)}
                </div>
                <sidebar className='sidebar'>
                    <Button clicked={this.goToCreatePost}>Create Post</Button>
                    <Button clicked={this.goToCreateSr.bind(this)}> Create Community</Button>
                </sidebar>
            </Aux>

        )
    }
}