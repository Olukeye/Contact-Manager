import React, { Component } from 'react'
import { Consumer } from '../../context'
// import {v4 as uuidv4 }  from 'uuid'; // this to be used for our custome backend
import TextInputGroup from '../layout/TextInputGroup'
import axios from 'axios';


 class EditContact extends Component {
     state = {
         name: '',
         email: '',
         phone: '',
         errors: {}
     };

     async componentDidMount() {
         const { id } = this.props.match.params;

         const res = await axios.get
         (`https://jsonplaceholder.typicode.com/users/${id}`);

         const contact = res.data;

         this.setState({
             name: contact.name,
             email: contact.email,
             phone: contact.phone
         })
     }
     
     onSubmit = async(dispatch, e) => {
         e.preventDefault();

         const { name, email, phone} = this.state;

        //  Error check !
        if(name === "") {
            this.setState({errors : {name: 'name is required'}});
            return;
        }

        if(email === "") {
            this.setState({errors : {email: 'email is required'}});
            return;
        }

        if(phone === "") {
            this.setState({errors : {phone: 'phone is required'}});
            return;
        }

        
        const updContact = {
            name,
            email,
            phone
        }

        const { id } = this.props.match.params;

        const res = await axios.put
        (`https://jsonplaceholder.typicode.com/users/${id}`,updContact);

        dispatch({type:'UPDATE_CONTACT', payload: res.data});


        // Clear state after submit
        this.setState({
            name: "",
            email: "",
            phone: "",
            errors: {}
        })

        this.props.history.push('/');
     }

    onChange = e => this.setState({[e.target.name] :
     e.target.value});
     
    render() {

        const { name, email, phone,  errors } = this.state;
        
        return(
            <Consumer>
                {value => {
                    const { dispatch } = value;
                    return (
                        <div className="card mb-2">
                        <div className="card header text-center">Edit Contact</div>
                        <div className="card-body">
                            <form onSubmit={this.onSubmit.bind(
                                this, dispatch
                            )}>
                                <TextInputGroup
                                    label="name"
                                    name="name"
                                    value={name}
                                    onChange={this.onChange}
                                    placeholder="Enter name"
                                    error={errors.name}
                                />
                                
                                <TextInputGroup
                                    label="email"
                                    name="email"
                                    type="email"
                                    value={email}
                                    onChange={this.onChange}
                                    placeholder="Enter email"
                                    error={errors.email}
                                />
                                 <TextInputGroup
                                    label="phone"
                                    name="phone"
                                    value={phone}
                                    onChange={this.onChange}
                                    placeholder="Enter Phone"
                                    error={errors.phone}
                                />
                                    <input type="submit" value="Edit Contact"
                                    className="btn btn-light btn-block" />
                            </form>
                        </div>
                    </div>
                    )
                }}
            </Consumer>
        )
    }
}


export default EditContact;
