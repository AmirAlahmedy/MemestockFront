import React, { Component } from 'react';
import './Registration.css';
import Aux from '../../Components/HOC/Auxiliary';
import Input from '../../Components/UI/input/input';
import Button from '../../Components/UI/Button/Button';


class Registration extends Component {
    state = {
        registrationForm: {

            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email'
                },
                value: '',
                validation: {
                required: true,
                
            },
            valid: false,
            touched: false
        },
        userName: {
            elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your User Name'
                },
            value: '',
            validation: {
                required: true,
            },
            valid: false,
            touched: false
        },
        passWord: {
            elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
            value: '',
            validation: {
                required: true,
                minLength: 8
            },
            valid: false,
            touched: false
        }
    },

    loading: false
}

    formHandler =  event  => {
        event.preventDefault();
        this.setState( { loading: true } );
        const formData = {};
        for (let formElementIdentifier in this.state.registrationForm) {
            formData[formElementIdentifier] = this.state.registrationForm[formElementIdentifier].value;
        }
        // const order = {
        //     ingredients: this.props.ingredients,
        //     price: this.props.price,
        //     orderData: formData
        // }
        // axios.post( '/orders.json', order )
        //     .then( response => {
        //         this.setState( { loading: false } );
        //         this.props.history.push( '/' );
        //     } )
        //     .catch( error => {
        //         this.setState( { loading: false } );
        //     } );
    }

    checkValidity = (value, rules) => {
        let isValid = true;

        if(rules.required){
            isValid = value.trim() !== '' && isValid;
        }

        if(rules.minLength){
            isValid = value.length >= rules.minLength && isValid;
        }

        return isValid;
    }


    inputChangedHandler = (event, inputIdentifier) => {
        const updatedRegistrationForm = {
            ...this.state.registrationForm
        };
        const updatedFormElement = { 
            ...updatedRegistrationForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = true//this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedRegistrationForm[inputIdentifier] = updatedFormElement;
        console.log(updatedFormElement);
        this.setState({registrationForm: updatedRegistrationForm});
    }
    
    render(){

        const formElementsArray = [];
        for (let key in this.state.registrationForm) {
            formElementsArray.push({
                id: key,
                config: this.state.registrationForm[key]
            });
        }
        let form = (
            <form onSubmit={this.props.regHand /*this.formHandler*/}>
                {formElementsArray.map(formElement => (
                    <Input 
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        changed={ event => this.inputChangedHandler(event, formElement.id)} 
                        />
                ))}
                <Button btnType="Success">REGISTER</Button>
            </form>
        );
        // if ( this.state.loading ) {
        //     form = <Spinner />;
        // }
        return(

            
        <Aux>

            <form className='regForm' onSubmit={ this.props.regHand }>
                <h1 className='logo'>Memestock</h1>
                 <div className='inputs'>

                <input type='email' 
                placeholder='E-mail'/>

                <input type='text' 
                placeholder='User name'/>

                <input type="password" 
                placeholder="Password" 
                value={ this.props.password } 
                onChange={ this.props.svPswrd }/>

                </div> 
                
                <button type="submit" className='registerButton'> Register </button>
            </form>
            {/* <div className='regForm'>

            <h1 className='logo'>Memestock</h1>
            {form}   
            </div> */}
        </Aux>
               );
               
               
            }
               
        }
            
            export default Registration;