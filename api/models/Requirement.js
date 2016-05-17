/**
 * Requirement.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
  	name:{
  		type:'string',
  		required:true
  	},
  	description:{
  		type:'string',
  		required:true,
  	},
  	story_points:{
  		type:'integer',
      defaultsTo:0
  	},
    project:{
      type:'integer',
      required:true,
      model:'project'
    },
  	status:{
  		type:'string',
      defaultsTo:'not_started'
  	},
    priority:{
      type:'integer',
      defaultsTo:0
    },
    assigned_to:{
  	  model:'user'
  	},
    tasks:{
      collection:'task',
      via:'story'
    }
  }
};

