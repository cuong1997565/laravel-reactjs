import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import Add from './Add';
import Listing from './Listting';
import Edit from './Edit';
export default class Index extends Component {
    render() {
        return (
                <div>
                    <hr />
                    <Link to="/category" className="btn btn-primary">Listting</Link> &nbsp;
                    <Link to="/category/add" className="btn btn-primary">Add</Link> &nbsp;
                    <Route exact path="/category" component={Listing} />
                    <Route exact path="/category/add" component={Add} />
                    <Route exact path="/category/edit/:id" component={Edit} />

                </div>
        );
    }
}
