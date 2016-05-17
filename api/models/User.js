/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

     name: {
       type:'string',
       required:true
     },
     surname:{
       type:'string',
       required:true,
     },
     username:{
       type:'string',
       required:true,
     },
     email:{
       type:'string',
       required:true,
       unique:true
     },
     password:{
       type:'string',
       required:true
     },
     projects:{
       collection:'project',
       via:'collaborators'
     },
     ongoing_stories:{
        collection:'requirement',
        via:'assigned_to'
     }
  }
};

