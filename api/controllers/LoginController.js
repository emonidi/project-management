/**
 * LoginController
 *
 * @description :: Server-side logic for managing logins
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	index:function(req,res){
      res.view('login/login',{layout:'layout'})
  },
  login:function(req,res){
      User.findOneByEmail(req.body.email).exec(function(err, data){
        if(!err){
          if(data.password === req.body.password){
              req.session.user = data;
              res.redirect('users');
          }
        }
      });
  },
  logout:function(req,res){
     delete req.session.user;
     res.redirect('login');
  }
};

