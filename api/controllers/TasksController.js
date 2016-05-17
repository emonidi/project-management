/**
 * TasksController
 *
 * @description :: Server-side logic for managing tasks
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var auth = require('../policies/sessionAuth');

module.exports = {
	add_view:function(req,res){
    auth(req,res,function(){
      var story_id = req.query.story_id;
      Requirement.findOneById(story_id).exec(function(err,story){
        if(!err){
          res.view('tasks/add',{story:story});
        }else{
          res.json(err);
        }
      })
    });
  },
  add:function(req,res){
    auth(req,res,function(){
       var params = req.params.all();
       params.story = req.query.story_id;
       Task.create(params).exec(function(err,task){
         if(!err){
           res.redirect('/stories/'+req.query.story_id);
         }else{
           res.json(err);
         }
       })
    });
  }
};




