import React, { Component } from 'react';
import { Route, NavLink, Switch, Redirect } from 'react-router-dom'

import './Blog.css';
import Posts from './Posts/Posts'
import asyncComponent from '../../hoc/asyncComponent'

const AsyncNewPost = asyncComponent(() => import('./NewPost/NewPost'))

class Blog extends Component {
    state = {
        auth: true
    }

    render () {
        return (
            <div className="Blog">
                <header className="Center">
                    <nav>
                        <ul>
                            <li><NavLink to="/posts">Home</NavLink></li>
                            <li><NavLink to="/new-post">New Post</NavLink></li>
                        </ul>
                    </nav>
                </header>
                <Switch>
                    {this.state.auth && <Route path="/posts" component={Posts} />}
                    <Route path="/new-post" component={AsyncNewPost} />
                    <Route render={() => <h1>Not found</h1>}/>
                    <Redirect from="/" to="/posts" />
                </Switch>
            </div>
        );
    }
}

export default Blog;
