import React, { Component } from 'react';
import { Form, FormGroup, Button, FormControl, ControlLabel,Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';


class AddFactoryForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            name:'',
            lower:0,
            upper:0,
            validationName:null,
            validationLower:null,
            validationUpper:null,
            validationLowerUpper:null
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
        this.setState({[event.target.name]:event.target.value});
        }

    /**
    * Handle submit action of the form.
    */
    handleSubmit = (event)=> {
        event.preventDefault();
        if(this.validate()){
            this.props.createFactorySubmit(this.state.name, this.state.lower, this.state.upper);
        }
    }

    /**
     * Set validation state for every inputs.
     */
    validate=()=>{
        var flag = true;
        if(this.state.name.length===0){
            this.setState({validationName:'Name should not be null.'});
            flag = false;
        }
        else{
            this.setState({validationName:null});
        }
        if(this.state.lower.length===0||isNaN(this.state.lower)||this.state.lower<1||this.state.lower>Number.MAX_VALUE){
            this.setState({validationLower:'Invalid Lower Bound.'});
            flag = false;
        }
        else{
            this.setState({validationLower:null});
        }
        if(this.state.upper.length===0||isNaN(this.state.upper)||this.state.upper<1||this.state.upper>Number.MAX_VALUE){
            this.setState({validationUpper:'Invalid Upper Bound.'});
            flag = false;
        }
        else{
            this.setState({validationUpper:null});
        }
            if(flag&&parseInt(this.state.lower)>parseInt(this.state.upper)){
                this.setState(
                    {
                        validationLowerUpper:'Upper bound should be bigger than lower bound.',
                    }
                );
                flag = false;
            }else{
                this.setState(
                    {
                        validationLowerUpper:null,
                    }
                );
            }
        
        return flag;
    }

    render(){
        return(
            <Form horizontal>
                <FormGroup controlId = "formFactoryName" >
                   <Col componentClass = { ControlLabel}> Factory Name</Col>
                   <Col><FormControl type = "text" name = "name" onChange = {this.handleChange}/></Col>
                   <div style={{ fontSize: 12, color: "red" }}>
                    {this.state.validationName}
                    </div>
                </FormGroup>
                <FormGroup controlId = "formFactoryLower" >
                   <Col componentClass = { ControlLabel}> Lower Bound</Col>
                   <Col><FormControl type = "number"  name = "lower" onChange = {this.handleChange}/></Col>
                   <div style={{ fontSize: 12, color: "red" }}>
                    {this.state.validationLower}
                    </div>
                </FormGroup>
                <FormGroup controlId = "formFactoryUpper" >
                   <Col componentClass = { ControlLabel}> Upper Bound</Col>
                   <Col><FormControl type = "number"  name = "upper" onChange = {this.handleChange}/></Col>
                   <div style={{ fontSize: 12, color: "red" }}>
                    {this.state.validationUpper}
                    </div>
                    <div style={{ fontSize: 12, color: "red" }}>
                    {this.state.validationLowerUpper}
                    </div>
                </FormGroup>
                <FormGroup>
                    <Button type = "submit"  onClick = {this.handleSubmit}>Generate</Button>
                </FormGroup>
            </Form>
        )
    }
}

export default AddFactoryForm;