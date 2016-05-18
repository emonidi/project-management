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
      Promise.all([getRequirement(story_id), getUsers()])
        .then(function(data){
          res.view('tasks/add',{story:data[0],users:data[1]});
        },function(err){
          res.json(err);
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

function getUsers(){
  return new Promise(function(resolve, reject){
    User.find().exec(function(err,data){
      console.log(data)
      if(!err){
        resolve(data);
      }else{
        reject(err);
      }
    });
  })
}
function getRequirement(id){
  return new Promise(function(resolve, reject){
    Requirement.findOneById(id).exec(function(err,story){

      if(!err){
        resolve(story);
      }else{
        reject(err);
      }
    })
  })
}




