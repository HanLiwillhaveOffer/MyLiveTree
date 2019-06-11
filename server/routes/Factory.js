var express = require('express');

module.exports = (app, db) => {
    /**
     * Get all the factories along with their Children.
     */
  app.get('/',(req,res)=>
      db.Factory.findAll({
          include:[{
              model:db.Child
          }]
      }).then(factories=>res.json(factories))
  );
    
    /**
     * Create new factory with name, lower and upper.
     */
  app.post("/factories", (req, res) => {
    var error = {
      type: 'error',
      reason: ''
  };
    if(typeof req.body.name==='undefined'|| typeof req.body.lower==='undefined'||typeof req.body.upper==='undefined'){
      error['reason'] = 'Missing Parameters';
      res.status(400).json(error);
    }
    else if(req.body.name.length===0||req.body.lower.length===0||req.body.upper.length===0){
      error['reason'] = 'Null Values';
      res.status(400).json(error);
    }
    else if(isNaN(req.body.lower)||isNaN(req.body.upper)){
      error['reason'] = 'Not a Number';
      res.status(400).json(error);
    }
    else if(req.body.lower>req.body.upper){
        error['reason'] = 'Lower must not be bigger than upper'
        res.status(400).json(error);
    }
    else{
      db.Factory.create({
          name:req.body.name,
          lower:req.body.lower,
          upper:req.body.upper
      }).then(result=>res.json(result));
    }
    }
);

    /**
     * Edit existing factory with name, lower and upper.
     */
    app.put("/factories/:facid", (req, res) => {
      var error = {
        type: 'error',
        reason: ''
    };
      if(typeof req.body.name==='undefined'|| typeof req.body.lower==='undefined'||typeof req.body.upper==='undefined'){
        error['reason'] = 'Missing Parameters';
        res.status(400).json(error);
      }
      else if(req.body.name.length===0||req.body.lower.length===0||req.body.upper.length===0||req.params.facid.length===0){
        error['reason'] = 'Null Values';
        res.status(400).json(error);
      }
      else if(isNaN(req.body.lower)||isNaN(req.body.upper)||isNaN(req.params.facid)){
        error['reason'] = 'Not a Number';
        res.status(400).json(error);
      }
      else if(req.body.lower>req.body.upper){
          error['reason'] = 'Lower must not be bigger than upper'
          res.status(400).json(error);
      }
      else{
        db.Factory.update({
            name:req.body.name,
            lower:req.body.lower,
            upper:req.body.upper
        },
        {
          where:{
            id:req.params.facid
          }
        }).then(result=>res.json(result));
      }
      }
  );
  
  /**
   * Delete speicific factory with facid.
   */
  app.delete( "/factories/:facid", (req, res) =>{
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
      db.Child.destroy(
        {where:{
          FactoryId:req.params.facid
        }}
      );
      db.Factory.destroy({
        where: {
          id: req.params.facid
        }
      }).then( (result) => res.json(result) )
    }
    })
;
}