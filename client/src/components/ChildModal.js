import React, { Component } from 'react';
import { Modal,Button } from 'react-bootstrap';
import ChildForm from './ChildForm';
import 'bootstrap/dist/css/bootstrap.css';

class ChildModal extends Component{
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
    * @param {Integer} number: The number of children of factory.
    */
    handleSubmit = (number)=> {
        this.props.createChild(number,this.props.facid);
        this.handleClose();
       }
    
    render(){
        return(
            <div>
            <Button variant = "primary" onClick = {this.handleShow}>
                Add Children
            </Button>
            <Modal show = {this.state.show} onHide = {this.handleClose}>
                <Modal.Header>
                    <Modal.Title>Creating Children</Modal.Title>
                </Modal.Header>
                <Modal.Body><ChildForm createChildSubmit={this.handleSubmit} /></Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleClose}>
                     Close
                    </Button>
                </Modal.Footer>
            </Modal>
            </div>
        );
    }
    }


export default ChildModal;