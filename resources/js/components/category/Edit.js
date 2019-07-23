import React, { Component } from 'react';
import axios from 'axios';
import SuccessAlert from './SuccessAlert';
import ErrorAlert from './ErrorAlert';
export default class Edit extends Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            category_name: '',
            status: 1,
            alert_message: ''
        }
    }

    componentDidMount() {
        var id = this.props.match.params.id;
        axios.get('http://127.0.0.1:8000/api/categories/edit/' + id)
            .then(res => {
                this.setState({
                    category_name: res.data.name,
                    status: res.data.status
                })
            }).catch(error => {
                console.log(error);
            })
    }

    onChange(event) {
        var target = event.target;
        var name = target.name;
        var value = target.value;
        if (name === 'status') {
            value = target.value === '1' ? 1 : 2;
        }
        this.setState({
            [name]: value
        });
    }

    onSubmit(event) {
        event.preventDefault();
        var id = this.props.match.params.id;
        console.log(this.state);
        axios.patch('http://127.0.0.1:8000/api/categories/update/'+id, this.state)
        .then(res => {
             this.setState({
                alert_message: "success"
             });
        }).catch(error => {
             this.setState({
                 alert_message: "error"
             });
        })
    }


    render() {
        return (
            <div>
                <hr />
                {this.state.alert_message == "success" ? <SuccessAlert message={"Category updated successfully"} /> : null}
                {this.state.alert_message == "error" ? <ErrorAlert message={"Error occured while updating the category"} /> : null}
                <form onSubmit={this.onSubmit} >
                    <div className="form-group">
                        <label>Category Name</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Category Name"
                            name="category_name"
                            onChange={this.onChange}
                            value={this.state.category_name}
                        />
                    </div>
                    <label>Trạng Thái :</label>
                    <select
                        className="form-control"
                        name="status"
                        value={this.state.status}
                        onChange={this.onChange}
                    >
                        <option value={1}>Kích Hoạt</option>
                        <option value={2}>Ẩn</option>
                    </select><br />
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        );
    }
}
