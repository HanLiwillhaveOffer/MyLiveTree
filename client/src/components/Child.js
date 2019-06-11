import React,{Component} from 'react';
import { Panel, Alert } from 'react-bootstrap/lib/';
import 'bootstrap/dist/css/bootstrap.css';

class Child extends Component{
    constructor(props,context){
        super(props);
        this.state = {
            children:this.props.children,
            show:false
        }
        /**
         * bind functions.
         */
        this.handleClose = this.handleClose.bind(this);
        this.handleShow = this.handleShow.bind(this);
    }

    /**
    * Handle Showing of error message.
    */
    handleShow = ()=>{
        this.setState({
            show:true
        });
    }
    /**
    * Handle Closing of error message.
    */
    handleClose = ()=>{
        this.setState({
            show:false
        });
    }

    /**
     * Adding Children to a specific factory.
     * @param {Integer} facid: Factory ID.
     * @param {Integer} number: The number of Children of the factory.
     * @param {Integer} lower: Lower bound of factory.
     * @param {Integer} upper: Upper bound of factory.
     * @param {function} callback: Re-render UI after the function.
     */
    addChildren = (facid,number,lower,upper,callback)=> {
        facid = parseInt(facid);
        number = parseInt(number);
        lower = parseInt(lower);
        upper = parseInt(upper);
        let initHeaders = new Headers();
        let myData = {facid:facid,number:number,lower:lower,upper:upper};
        initHeaders.append('Accept', 'application/json, text/plain, */*')
        initHeaders.append('Cache-Control', 'no-cache')
        initHeaders.append('Content-Type', 'application/json')
        fetch("https://gentle-cove-90607.herokuapp.com/children",{
            method:'POST',
            headers: initHeaders,
            mode:'cors',
            body:JSON.stringify(myData),
        })
            .then(res=>{
                if(res.ok){
                    callback();
                }
            })
            .catch(err=>{
                console.log(err);
                this.handleShow();
            });
      }
    
    /**
     * Delete and then add children set from a specific factory.
     * @param {Integer} facid: Factory ID.
     * @param {Integer} number: The number of Children of the factory.
     * @param {Integer} lower: Lower bound of factory.
     * @param {Integer} upper: Upper bound of factory.
     * @param {function} callback: Re-render UI after the function.
     */

    removeChildren = (facid,number,lower,upper,callback) => {
        facid = parseInt(facid);
        number = parseInt(number);
        lower = parseInt(lower);
        upper = parseInt(upper);
        let initHeaders = new Headers();
        initHeaders.append('Accept', 'application/json, text/plain, */*')
        initHeaders.append('Cache-Control', 'no-cache')
        initHeaders.append('Content-Type', 'application/json')

        fetch("https://gentle-cove-90607.herokuapp.com/children/"+facid,{
            method:'DELETE',
            headers:initHeaders,
            mode:'cors',
        })
            .then(res=>{
                if(res.ok){
                    this.addChildren(facid,number,lower,upper,callback);
                }
            })
            .catch(err=>{
                this.handleShow();
            })
    }
    render(){
        let children = this.state.children.map(child=>
            <Panel.Body key = {child.id}>
            <p>----------------------------------</p>
                {child.value}</Panel.Body>
            );
        if(this.state.show){
            return(
                <div className = "text-center">
                    <Alert bsStyle="danger" onDismiss = {this.handleClose}>
                        <p>Error!Please try agian!</p>
                    </Alert>    
                    {children}
                </div>
            )
        }
        return(
            <div className = "text-center">
            {children}
            </div>
        );   
    }
}


export default Child;