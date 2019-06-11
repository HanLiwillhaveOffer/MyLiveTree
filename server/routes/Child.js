var express = require('express');

module.exports = (app, db) => {
  /**
   * Create new Children with factory id and number.
   */
  app.post("/children", (req, res) => {
    var children = [];
    var error = {
      type: 'error',
      reason: ''
  };
    if(typeof req.body.facid==='undefined'|| typeof req.body.number==='undefined'){
      error['reason'] = 'Missing Parameters';
      res.status(400).json(error);
    }
    else if(req.body.facid.length===0||req.body.number.length===0){
      error['reason'] = 'Null Values';
      res.status(400).json(error);
    }
    else if(isNaN(req.body.facid)||isNaN(req.body.number)){
      error['reason'] = 'Not a Number';
      res.status(400).json(error);
    }
    else if(req.body.number<0||req.body.number>15){
      error['reason'] = 'Number must be between 1 to 15';
      res.status(400).json(error);
    }
    else{
      for(let i=0;i<req.body.number;i++){
        var value = (req.body.lower+Math.round((req.body.upper-req.body.lower)*Math.random()));
        var singlechild = {
          value:value,
          FactoryId:req.body.facid
        };
        
        children.push(singlechild);
      }
      db.Child.bulkCreate(children).then(result=>res.json(result));
    }
    }
);
  /**
   * Delete children set with certain factory id.
   */
  app.delete( "/children/:facid", (req, res) =>{
    var error = {
      type:'error',
      reason:''
    }
    if(typeof req.params.facid==='undefined'){
      error['reason'] = 'Missing Parameter';
      res.status(400).json(error);
    }
    else if(req.params.facid.length===0){
      error['reason'] = 'Null Value';
      res.status(400).json(error);
    }
    else if(isNaN(req.params.facid)){
      error['reason'] = 'Not a Number';
      res.status(400).json(error);
    }
    else{
      db.Child.destroy({
        where: {
          FactoryId: req.params.facid
        }
      }).then(result => res.json(result) )
    }
    })
;
}

