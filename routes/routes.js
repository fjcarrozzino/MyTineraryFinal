const Router = require('express').Router();
const validator = require('../config/validator')
const passport = require('../config/passport')

const citiesControllers = require('../controllers/citiesControllers');
const {getCities, getOneCity, addCity, modifyCity, removeCity,addMultipleCity} = citiesControllers

const tineraryController = require('../controllers/tineraryControllers');
const {getTineraries, addTinerary, removeTinerary, getOneTinerary, modifyTinerary, findTinFromCity, likeDislike} = tineraryController

const usersControllers = require('../controllers/usersControllers');
const {signUpUsers, signInUser, signOutUser,verifyEmail, verificarToken}= usersControllers

const commentsControllers = require('../controllers/commentsControllers')
const {addComment, modifyComment, deleteComment} = commentsControllers


Router.route('/cities')
.get(getCities)
.post(addCity)

Router.route('/cities/:id') 
.delete(removeCity)
.put(modifyCity) 
.get(getOneCity)

Router.route("/addMultipleCity")
.post(addMultipleCity)
module.exports = Router

Router.route('/tineraries')
.get(getTineraries)
.post(addTinerary)

Router.route('/tineraries/:id')
.delete(removeTinerary)
.get(getOneTinerary)
.put(modifyTinerary)

Router.route('/tineraries/cities/:id')
.get(findTinFromCity)

Router.route('/tineraries/like/:id')
.put(passport.authenticate("jwt", {session:false}), likeDislike)

Router.route('/tineraries/comment')
.post(passport.authenticate('jwt', {session: false}),addComment)

Router.route('/tineraries/comment/:id')
.post(passport.authenticate('jwt', {session: false}), deleteComment)
.put(passport.authenticate('jwt', {session: false}), modifyComment)

Router.route('/auth/signUp')
.post(validator, signUpUsers)

Router.route('/auth/signIn')
.post(signInUser)

Router.route('/auth/signOut')
.post(signOutUser)

Router.route('/verify/:uniqueString') //RECIBE EL LINK DE USUARIO
.get(verifyEmail) //LLAMA A FUNCION DE VERIFICACIION

Router.route('/auth/signInToken')
.get(passport.authenticate('jwt',{ session: false }),verificarToken)

