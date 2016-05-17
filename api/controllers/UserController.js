/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	  index:function(req, res){
      User.find().exec(function(err,data){
        if(!err){
          res.view('users/list.ejs',{layout:'layout',data:data});
        }
      });

    },
    add:function(req, res){
      var body = req.body;
      if(body.password === body.confirm_password){
        User.create(body).exec(function(err,data){
          if(!err){
            res.redirect('/users');
          }else{
            res.json(err);
          }
        });
      }
    },
    new:function(req,res){
      res.view('users/add');
    },

    view:function(req,res){
      User.findOneById(req.params.id).populate('ongoing_stories').exec(function(err,data){
        if(!err){
          res.view('users/detail',{layout:'layout', data:data});
        }
      });
    }
};

