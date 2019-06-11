import React, { Component } from 'react';
import { Modal,Button } from 'react-bootstrap';
import EditFactoryForm from './EditFactoryForm';
import 'bootstrap/dist/css/bootstrap.css';

class EditFactoryModal extends Component{
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
    */
    handleSubmit = (name,lower,upper)=> {
        this.props.editFactory(this.props.factory.id,name,lower,upper);
        this.handleClose();
       }
    
    render(){
        return(
            <div>
            <Button variant = "primary" onClick = {this.handleShow}>
                Update Factory
            </Button>

            <Modal show = {this.state.show} onHide = {this.handleClose}>
                <Modal.Header>
                    <Modal.Title>Updatinging Factory</Modal.Title>
                </Modal.Header>
                <Modal.Body><EditFactoryForm factory = {this.props.factory} editFactorySubmit={this.handleSubmit} /></Modal.Body>
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


export default EditFactoryModal;