import React, { Component } from 'react';
import { Form, FormGroup, Col, Button, FormControl, ControlLabel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';

/**
 * The form that handle the inputs of creating children.
 */
class ChildForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            number:this.props.number,
            numberError:'',
        }
         /**
         * bind functions.
         */
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

/**
 * Handle change in the input form.
 */
    handleChange = (event)=> {
        this.setState({[event.target.name]: event.target.value});
      }

/**
 * Handle submit action of the form.
 */
    handleSubmit = (event)=> {
        event.preventDefault();
        const isValid = this.validate();
        if(isValid){
            this.props.createChildSubmit(this.state.number);
            this.setState({numberError:''});
        }   
      }
/**
 * Set validation state of inputs.
 */
    validate = ()=>{
        if(this.state.number.length===0||isNaN(this.state.number)||this.state.number>15||this.state.number<0){
            this.setState({numberError:'Please input valid number (1-15)'});
            return false;
        }
        return true;
    }
    render(){
        return(
            <Form horizontal validated = "true">
                <FormGroup controlId = "formChildrenValue" validationState = {this.validation} >
                   <Col componentClass = { ControlLabel}> Number</Col>
                   <Col><FormControl type = "number" placeholder = "Please input the number of children (1-15)" name = "number" min = "1" max = "15" onChange = {this.handleChange}/></Col>
                   <div style={{ fontSize: 12, color: "red" }}>
                    {this.state.numberError}
                    </div>
                </FormGroup>
                <FormGroup>
                    <Button type = "submit" onClick = {this.handleSubmit}>Generate</Button>
                </FormGroup>
            </Form>    
        );
    }

}

export default ChildForm;