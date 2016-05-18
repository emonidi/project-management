/**
 * Task.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    task:{
      type:'text',
      required:true
    },
    story:{
      type:'integer',
      model:'requirement'
    },
    estimated_duration:{
      type:'float'
    },
    actual_duration:{
      type:'float'
    },
    status:{
      type:'string'
    },
    project:{
      collection:'project',
      via:'tasks'
    },
    assigned_to:{
      model:'user'
    }
  }
};

