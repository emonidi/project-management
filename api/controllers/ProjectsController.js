/**
 * ProjectsController
 *
 * @description :: Server-side logic for managing projects
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var auth = require('../policies/sessionAuth');

module.exports = {
	index:function(req,res){
		auth(req,res,function(){
			Project.find().exec(function(err,data){
				if(!err){
				 	res.view('projects/list',{data:data});
				}
			});
		});
	},
	new:function(req,res){
		auth(req,res,function(){
			res.view('projects/add');
		});
	},
	view:function(req,res){
		auth(req,res,function(){
			Project.findOneById(req.params.id).populate('collaborators').populate('stories').exec(function(err,data){
				if(!err){
					res.view('projects/view',{data:data});
				}
			});
		});
	},
	create:function(req,res){
		auth(req,res, function(){
			Project.create(req.body).exec(function(err,data){
				if(!err){
					res.redirect('/projects')
				}
			});
		});
	},
	add_user:function(req,res){
		auth(req, res, function(){
			User.find().exec(function(err,users){
				Project.findOne(req.params.id).exec(function(err,project){
					if(!err){
						res.view('projects/add_user',{users:users,project:project});
					}else{
						res.json(err);
					}
				});
			});
		})
	},

	edit_view:function(req,res){
		auth(req, res, function(){
		   Project.findOneById(req.params.id).exec((err,project)=>{
		   	  if(!err){
		   	  	res.view('projects/edit',{data:project})
		   	  }else{
		   	  	res.json(err);
		   	  }
		   });
		});
	},

	edit:function(req,res){
		auth(req,res, ()=>{
			Project.update({id:req.params.id},req.body).exec((err,project)=>{
				if(!err){
					res.redirect('/projects/'+req.params.id);
				}else{
					res.json(err);
				}
			});
		})
	},

	create_project_user:function(req,res){
		auth(req,res,function(){
			var body = req.body;
			var project_id = req.params.id;
			Project.findOneById(project_id).exec(function(err,project){
			//	res.json(project);return;
				if(!err){
					project.collaborators.add([body.user_id])
					project.save(function(err,data){
						if(!err){
							res.redirect('/projects/'+project_id)
						}else{
							res.json(err);
						}
					})
				}
			})
		});
	},

	remove_user:function(req,res){
		auth(req,res,function(){

			var project_id = req.params.project_id,
				user_id = req.params.user_id;
			Project.findOneById(project_id).exec(function(err,project){
				if(!err){
					project.collaborators.remove([user_id])
					project.save(function(err,data){
						if(!err){
							res.redirect('/projects/'+project_id);
						}
					})
				}
			})

		});
	}
};

