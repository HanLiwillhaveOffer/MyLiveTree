import React, { Component } from 'react';
import { Modal,Button } from 'react-bootstrap';
import AddFactoryForm from './AddFactoryForm';
import 'bootstrap/dist/css/bootstrap.css';
import './Button.css';

class AddFactoryModal extends Component{
    constructor(props){
        super(props);
        this.state = {
            show:false
        }
        /**
         * bind functions.
         */
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    /**
    * Handle Appearance of the modal.
    */
    handleShow = ()=>{
        this.setState({show:true});
    }

    /**
    * Handle Closing of the modal.
    */
   handleClose = ()=>{
    this.setState({show:false});
}
    /**
    * Handle Submition of the form in the modal.
    * @param {string} name:Factory name.
    * @param {Integer}lower:lower bound of factory.
    * @param {Integer}upper:upper bound of factory.
    */
    handleSubmit = (name,lower,upper)=> {
        this.props.createFactory(name,lower,upper);
        this.handleClose();
       }
    
    render(){
        return(
            <div>
            <Button onClick = {this.handleShow}>
                Add Factory
            </Button>
            <Modal show = {this.state.show} onHide = {this.handleClose}>
                <Modal.Header>
                    <Modal.Title>Creating Factory</Modal.Title>
                </Modal.Header>
                <Modal.Body><AddFactoryForm createFactorySubmit={this.handleSubmit} /></Modal.Body>
                <Modal.Footer>
                    <Button className="btn-warning"  onClick={this.handleClose}>
                     Close
                    </Button>
                </Modal.Footer>
            </Modal>
            </div>
        );
    }
    }


export default AddFactoryModal;