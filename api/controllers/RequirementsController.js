/**
 * RequirementsController
 *
 * @description :: Server-side logic for managing Requirements
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var auth = require('../policies/sessionAuth');

module.exports = {
    index:function(req,res){
        auth(req,res,function(){
           Promise.all([getProjects(),getUsers(),getPriority(),getStatus()]).then(function(d){
             var filterVals = {
               projects:d[0],
               users:d[1],
               priority:d[2],
               status:d[3]
             }

             for(var i in req.query){
                if(req.query[i] === ''){
                  delete req.query[i]
                }
             }

             Requirement.find(req.params.all())
               .populate('project',{'select':['id','name']})
               .populate('assigned_to')
               .exec(function(err,data){
                 //res.json(data);return;
                 if(!err){
                   res.view('requirements/view',{requirements:data,filterVals:filterVals,filters:req.query});
                 }else{
                   res.json(err);
                 }
             });
           })

        })
    },
    add_view:function(req, res){
      auth(req, res, function(){
         var prios,status,users;
         Promise.all([getPriority(),getStatus(),getUsers()]).then(function(d){
            prios = d[0];
            status = d[1];
            users=d[2];
           Project.find({select:['id','name']}).populate('collaborators').exec(function(err, projects){
             res.view('requirements/add',
               {
                 projects:projects,
                 selects:req.params.all(),
                 priority:prios,
                 status:status,
                 users:users
               }
             );
           });
         })

      });
    },
    add:function(req, res){
      auth(req,res,function(){
         var body = req.params.all();
         Requirement.create(body).exec(function(err,data){
           if(!err){
             res.redirect('/stories');
           }else{
             res.json(err);
           }
         })
      })
    },
    edit_view:function(req,res){
      auth(req,res,function(){
         Promise.all([
           getProjects(),getUsers(),getPriority(),getStatus()
         ]).then(function(d){
           var data = {
             projects:d[0],
             users:d[1],
             priority:d[2],
             status:d[3]
           }

           Requirement.findOneById(req.params.id).exec(function(err,requirement){
             if(!err){
               data.selects = requirement
               //res.json(data.selects);return;
               res.view('requirements/add',data);
             }else{
               res.json(err);
             }
           });
         })
      })
    },
    detail:function(req,res){
      auth(req,res,function(){
        Promise.all([
          getStories(req.param('id')),
          getPriority(),
          getStatus(),
          getUsers()
        ]).then(function(d){
          var data = {
            story:d[0][0],
            priority:d[1],
            status:d[2],
            users: d[3]
          }

          res.view('requirements/detail',data);
        })
      })
    },
    edit_attribute:function(req,res){
      auth(req,res,function(){
         Requirement.update(req.params.id,req.query).exec(function(err,data){
           if(err){
             res.json(err);
           }else{
             res.redirect('/stories/'+req.params.id);
           }
         })
      });
    },
    update:function(req,res){
      auth(req,res,function(){
         Requirement.update(req.param('id'),req.params.all()).exec(function(err,data){
            if(!err){
              res.redirect('/stories/'+req.param('id'))
            }else{
              res.json(err);
            }
         });
      });
    }
};


function getProjects(filter){
   return new Promise(function(resolve, reject){
      Project.find().populate('collaborators').exec(function(err,res){
        if(err){
          reject(err)
        }else{
          resolve(res);
        }
      })
   });
}

function getUsers(){
  return new Promise(function(resolve,reject){
      User.find().exec(function(err,res){
        if(err){
          reject(err)
        }else{
          resolve(res);
        }
      })
  });
}

function getPriority(){
  return new Promise(function(resolve, reject){
      resolve(['Low', 'Normal', 'High', 'Top'])
  });
}

function getStatus(){
  return new Promise(function(resolve, reject){
    resolve(['Not Started', 'Ongoing', 'Completed']);
  });
}

function getStories(filter){
  return new Promise(function(resolve,reject){
     Requirement.find(filter)
       .populate('assigned_to')
       .populate('project')
       .populate('tasks')
       .exec(function(err,res){
        if(err){
          reject(err);
        }else{
          resolve(res);
        }
     });
  });
}

