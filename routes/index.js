var express= require('express')
var router = express.Router()
var passport= require('passport')
var User= require('../models/user.js')
router.get('/',(req,res)=>{
	res.render("landing")
})

//AUTHENTICATION ROUTES

// 1) register 
router.get('/register',(req,res)=>{
	res.render('register')
})
router.post('/register',(req,res)=>{
	var newUser= new User({username: req.body.username})
	User.register(newUser,req.body.password,(err,user)=>{
		if(err){
			req.flash("error",err.message)
			res.redirect('/register')
		}
		else{
			passport.authenticate("local")(req,res,()=>{
				req.flash("success","Welcome to Yelpcamp, "+user.username)
				res.redirect('/campgrounds')
			})
		}
	})
})
// 2) Login
router.get('/login',(req,res)=>{
	res.render('login')
})
router.post('/login',passport.authenticate("local",{successRedirect: '/campgrounds', failureRedirect:'/login'}),(req,res)=>{
})
// 3) logout
router.get('/logout',(req,res)=>{
	req.logout();
	req.flash("success", "Logged you out :(")
	res.redirect('/campgrounds')
})

module.exports = router