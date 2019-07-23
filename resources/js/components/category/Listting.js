import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Pagination from 'react-js-pagination';
import SuccessAlert from './SuccessAlert';
import ErrorAlert from './ErrorAlert';
export default class Listting extends Component {
    constructor(props) {
        super(props);
        this.handlePageChange = this.handlePageChange.bind(this);
        this.state = {
            categories: [],
            alert_message: '',
            activePage: 1,
            itemsCountPerPage: 1,
            totalItemsCount: 1,
            pageRangeDisplayed: 5
        }
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/categories')
            .then(response => {
                this.setState({
                    categories: response.data.data,
                    itemsCountPerPage: response.data.per_page,
                    totalItemsCount: response.data.total,
                    activePage: response.data.current_page
                });
            }).catch(error => {
                console.log(error);
            })
    }

    handlePageChange(pageNumber) {
        // console.log(`active page is ${pageNumber}`);
        // this.setState({
        //     activePage: pageNumber
        // })
        axios.get('http://127.0.0.1:8000/api/categories?page='+pageNumber)
        .then(response => {
                this.setState({
                    categories: response.data.data,
                    itemsCountPerPage: response.data.per_page,
                    totalItemsCount: response.data.total,
                    activePage: response.data.current_page
                })
        })
    }

    onDelete(id){
        if(window.confirm("Ban co chac xoa khong ?")){
            axios.delete('http://127.0.0.1:8000/api/categories/'+id)
            .then(response => {
                var categories = this.state.categories;
                for(var i = 0; i< categories.length; i++) {
                    if(categories[i].id = id) {
                        categories.splice(i,1);
                        this.setState({
                        categories: categories,
                        alert_message: "success"
                    });
                    }
                }
            }).catch(error => {
                this.setState({
                    alert_message: "error"
                })
            });
        }
    }

    render() {
        return (
            <div>
                <hr />
                {this.state.alert_message == "success" ? <SuccessAlert message={"Category delete successfully"} /> : null}
                {this.state.alert_message == "error" ? <ErrorAlert message={"Error occured while delete the category"} /> : null}
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Category Name</th>
                            <th scope="col">Status</th>
                            <th scope="col">Created At</th>
                            <th scope="col">Updated At</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.categories.map((category, index) => {
                                return (
                                    <tr key={index}>
                                        <th scope="row"> {index +1 } </th>
                                        <td> { category.name } </td>
                                        <td> { category.status == 1 ? 'active' : 'in active' } </td>
                                        <td> { category.created_at } </td>
                                        <td>{ category.updated_at } </td>
                                        <th>
                                            <Link to={`/category/edit/${category.id}`}>Edit</Link>
                                            <a href="#" onClick={this.onDelete.bind(this,category.id)}>Delete</a>
                                        </th>

                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
                <div className="d-flex justify-content-center">
                <Pagination
                    activePage={ this.state.activePage }
                    itemsCountPerPage = {this.state.itemsCountPerPage}
                    totalItemsCount = {this.state.totalItemsCount}
                    pageRangeDisplayed={this.state.pageRangeDisplayed}
                    onChange={this.handlePageChange}
                    itemClass="page-item"
                    linkClass="page-link"
                />
                </div>
            </div>
        );
    }
}
