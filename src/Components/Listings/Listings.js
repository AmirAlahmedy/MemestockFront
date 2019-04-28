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
        console.log(this.props.view);
        view = this.props.view;
        localStorage.setItem('view', this.props.view);
        return (

            <Router>
                <Aux>
                    <Switch>
                        <Route path="/Home/" exact render={
                            props => {
                                return <Threads view={this.props.view} />
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
        threads: []
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

        if (inProduction === true && /*ginprodReducer.globalInProduction*/ localStorage.getItem('inProduction')) {

            axios.post('/me/listing?type=new', this.startPosition, { headers: this.headers })
                .then(response => {
                    console.log(response);
                    this.reqThreads = response.data;
                    this.setState({ reqThreads: response.data });

                    let thrds = this.createThreads(response.data);
                    this.setState({ threads: thrds });
                })
                .catch(error => {

                })
        } else {

            this.setState({ reqThreads: data.threads });
            let thrds = this.createThreads(data.threads);
            this.setState({ threads: thrds });
        }
    }


    createSubHand = () => {
        console.log('create community');
        return (<Redirect to="/create-subreddit/" />);

    }

    /**
     * For generating threads from a mock service
     * @function createThread
     * @param {object} - object of the mocked thread ...Not working properly yet.
     */
    createThread = thread => <Thread
        // key={thread._id}
        // username={thread.creatorUsername}
        subreddit={thread.subredditName}
        title={thread.title}
        conten t={thread.body}
        view={this.props.view}
    />;
    // Ya Amiir....
    //Aywa 3ayyez eh?

    getThreads(view) {
        if (!this.state.reqThreads || !this.state.reqThreads.posts) return;
        console.log("threads", this.state.reqThreads)
        return this.state.reqThreads.posts.map(thr => <Thread
            id={thr._id}
            username={thr.creatorUsername}
            subreddit={thr.subredditName}
            title={thr.title}
            content={thr.body}
            view={view}
        />)
    }

    /**
     * For generating threads from a mock service
     * @function createThreads
     * @param {array} - array of the mocked threads ...Not working properly yet.
     */
    createThreads = Threads => Threads.map(this.createThread);
    goToCreatePost() {
        window.location.href = "/CreatePost/";
    }
    goToCreateSr(){
        window.location.href = "/create-subreddit/";
    }
    render() {
        console.log(this.props.token);

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
