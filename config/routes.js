/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#!/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
  * etc. depending on your default view engine) your home page.              *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': {
    view: 'homepage'
  },
  'get /users':{
    controller:'UserController',
  },
  'get /projects/new':'ProjectsController.new',
  'get /users/new':'UserController.new',
  'get /users/:id':'UserController.view',
  'post /users':'UserController.add',
  'get /login':'LoginController',
  'post /login':'LoginController.login',
  'get /logout':'LoginController.logout',
  'get /projects':'ProjectsController.index',
  'get /projects/:id':'ProjectsController.view',
  'get /projects/:id/edit':'ProjectsController.edit_view',
  'post /projects/:id/edit':'ProjectsController.edit',
  'post /projects/new':'ProjectsController.create',
  'get /projects/:id/add_user':'ProjectsController.add_user',
  'post /projects/:id/add_user':'ProjectsController.create_project_user',
  'get /projects/:project_id/remove_user/:user_id':"ProjectsController.remove_user",
  'get /stories/add':'RequirementsController.add_view',
  'post /stories/add':'RequirementsController.add',
  'get /stories':'RequirementsController.index',
  'get /stories/:id':'RequirementsController.detail',
  'get /stories/:id/edit':'RequirementsController.edit_attribute',
  'get /stories/:id/edit_view':'RequirementsController.edit_view',
  'post /stories/:id/update':'RequirementsController.update',
  'get /tasks/add':'TasksController.add_view',
  'post /tasks/add':'TasksController.add'

  /***************************************************************************
  *                                                                          *
  * Custom routes here...                                                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the custom routes above, it   *
  * is matched against Sails route blueprints. See `config/blueprints.js`    *
  * for configuration options and examples.                                  *
  *                                                                          *
  ***************************************************************************/

};
