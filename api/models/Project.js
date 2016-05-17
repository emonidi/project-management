/**
 * Project.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    name:{
      type:"string",
      required:true
    },
    description:{
      type:"text",
      required:true
    },
    collaborators:{
      collection:'user',
      via:'projects'
    },
    stories:{
      collection:'requirement',
      via:'project'
    },
    tasks:{
      model:'task'
    }

  }
};

