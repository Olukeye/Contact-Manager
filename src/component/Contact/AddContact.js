import React, { Component } from 'react'
import { Consumer } from '../../context'
import axios from 'axios';
// import {v4 as uuidv4 }  from 'uuid'; // this to be used for our custome backend
import TextInputGroup from '../layout/TextInputGroup'



 class AddContact extends Component {
     state = {
         name: '',
         email: '',
         phone: '',
         address: '',
         errors: {}
     };

     onSubmit = async(dispatch, e) => {
         e.preventDefault();

         const { name, email, phone, address} = this.state;

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

        if(address === "") {
            this.setState({errors : {address: 'address is required'}});
            return;
        }

         const newContact = { 
            //  id: uuidv4(),
             name,
             email,
             phone,
             address
         }

         const res = await axios.post
         (`https://jsonplaceholder.typicode.com/users`, newContact);

          dispatch({ type: 'ADD_CONTACT', payload: res.data})


        // Clear state after submit
        this.setState({
            name: "",
            email: "",
            phone: "",
            address: "",
            errors: {}
        })

        this.props.history.push('/');
     }

    onChange = e => this.setState({[e.target.name] :
     e.target.value});
     
    render() {

        const { name, email, phone, address, errors } = this.state;
        
        return(
            <Consumer>
                {value => {
                    const { dispatch } = value;
                    return (
                        <div className="card mb-2">
                        <div className="card header text-center">Add Contact</div>
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
                                 <TextInputGroup
                                    label="address"
                                    name="address"
                                    value={address}
                                    onChange={this.onChange}
                                    placeholder="Enter address"
                                    error={errors.address}
                                />
                                    <input type="submit" value="Add Contact"
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


export default AddContact;
