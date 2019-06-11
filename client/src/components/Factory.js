import React,{Component} from 'react';
import socket from 'socket.io-client';
import AddFactoryModal from './AddFactoryModal';
import { Panel, Alert } from 'react-bootstrap/lib/';
import ControlledExpansionPanels from './ControlledExpansionPanels';
import 'bootstrap/dist/css/bootstrap.css';

class Factory extends Component{
    constructor(props){
        super(props);
        this.state = {
            factories:[],
            socket: socket("https://gentle-cove-90607.herokuapp.com/"),
            show:false
        }
        /**
         * create references of children of specific factory.
         */
        this.child = React.createRef();

        /**
         * bind functions.
         */
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }
    /**
     * Handle showing of error message.
     */
    handleShow = ()=>{
        this.setState({
            show:true
        });
    }
    /**
     * Handle closing of error message.
     */
    handleClose = ()=>{
        this.setState({
            show:false
        });
    }
    /**
     * Get data from server and render UI as well as Listning for broadcast for changing.
     */
    componentDidMount = ()=>{
        this.getData();

        this.state.socket.on('refresh',(msg)=>{
            if(msg==="removeChildren"){
                this.setState({
                    factories:[]
                });
                
            }
            this.getData();
        });
    }
    /**
     * Send refreshing message to certain socket.
     */
    sendRefresh = (msg) =>{
        this.state.socket.emit('refresh',msg);
    }

    /**
     * Get initial data from server.
     */
    getData = () =>{
        fetch("https://gentle-cove-90607.herokuapp.com/")
        .then(res=>{
            if(res.ok){
                res.json().then(data=>this.setState({factories:data}))
            }
        })
        .catch(err=>{
            this.handleShow();
        });
    }

    /**
     * Create a new Factory.
     */
    addFactory = (name,lower,upper)=> {
        lower = parseInt(lower);
        upper = parseInt(upper);
        let initHeaders = new Headers();
        let myData = {name:name,lower:lower,upper:upper};
        initHeaders.append('Accept', 'application/json, text/plain, */*')
        initHeaders.append('Cache-Control', 'no-cache')
        initHeaders.append('Content-Type', 'application/json')

        fetch("https://gentle-cove-90607.herokuapp.com/factories",{
            method:'POST',
            headers: initHeaders,
            mode:'cors',
            body:JSON.stringify(myData),
        })
            .then(res=>{
                if(res.ok){
                    res.json().then(data=>{
                        data.Children = [];
                        var newFactories = this.state.factories.slice();
                        newFactories.push(data);
                        this.setState({
                            factories:newFactories
                        });
                        this.sendRefresh();
                    })  
                }
            })
            .catch(err=>console.log(err));
      }
    
    /**
     * Delete a Factory.
     */
    removeFactory = (e) => {
        var facid = parseInt(e.target.id);
        let initHeaders = new Headers();
        initHeaders.append('Accept', 'application/json, text/plain, */*')
        initHeaders.append('Cache-Control', 'no-cache')
        initHeaders.append('Content-Type', 'application/json')

        fetch("https://gentle-cove-90607.herokuapp.com/factories/"+facid,{
            method:'DELETE',
            headers:initHeaders,
            mode:'cors',
        })
            .then(res=>{
                if(res.ok){
                    this.getData();
                    this.sendRefresh();
                }
            })
            .catch(err=>{
                this.handleShow();
            })
    }

    /**
     * Edit a Factory.
     */
    editFactory = (facid,name,lower,upper) => {
        facid = parseInt(facid);
        lower = parseInt(lower);
        upper = parseInt(upper);
        let initHeaders = new Headers();
        let myData = {name:name,lower:lower,upper:upper}
        initHeaders.append('Accept', 'application/json, text/plain, */*')
        initHeaders.append('Cache-Control', 'no-cache')
        initHeaders.append('Content-Type', 'application/json')

        fetch("https://gentle-cove-90607.herokuapp.com/factories/"+facid,{
            method:'PUT',
            headers:initHeaders,
            mode:'cors',
            body:JSON.stringify(myData)
        })
            .then(res=>{
                if(res.ok){
                    for(var i=0;i<this.state.factories.length;i++){
                        if(this.state.factories[i]["id"]===facid){
                            this.createChild(0,facid);
                        }
                    }                    
            }})
            .catch(err=>{
                this.handleShow();
            })
    }
    /**
     * Create new children set for factory.
     */
    createChild = (number,facid)=>{
        facid = parseInt(facid);
        var factory;
        for(let i=0;i<this.state.factories.length;i++){
            if(this.state.factories[i].id===facid){
                factory = this.state.factories[i];
            }
        }
        number = parseInt(number);
        var lower = parseInt(factory.lower);
        var upper = parseInt(factory.upper);
        this.child.current.removeChildren(facid,number,lower,upper,()=>{
            this.setState({
                factories:[]
            });
            this.getData();
            this.sendRefresh("removeChildren");   
        });

    }

    render(){
        let factoryList = this.state.factories.map(factory=>
            <Panel key = {factory.id}>
                <Panel.Heading>
                    <ControlledExpansionPanels factory = {factory} editFactory = {this.editFactory} createChild = {this.createChild} removeFactory = {this.removeFactory} child = {this.child}/>
                </Panel.Heading>
            </Panel>
            );
        if(this.state.show){
            return(
                <div>
                    <Alert onDismiss={this.handleClose}>
                        <p>Error!Please try again.</p>
                    </Alert>
                    <h1>ROOT</h1>       
                     <AddFactoryModal createFactory = {this.addFactory}  />
                    {factoryList}

                </div>
            )
        }
        const divstyle = {
            color :'blue',
            fontSize : 20
        }



        return(
            <div id = "factory">
                <h1>ROOT</h1><AddFactoryModal createFactory = {this.addFactory}  />
                <div style = {divstyle}>{factoryList}</div>

            </div>
        );
    }
}


export default Factory;