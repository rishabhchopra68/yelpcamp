var express= require('express')
var app= express()
var bodyParser= require('body-parser')
var mongoose= require('mongoose')
var flash = require('connect-flash')
var passport= require('passport')
var LocalStrategy= require('passport-local')
var Campground= require('./models/campground.js')
var seedDB= require('./seeds')
var Comment= require('./models/comment.js')
var User = require('./models/user.js')
var campgroundRoutes= require('./routes/campground.js')
var commentRoutes= require('./routes/comment.js')
var indexRoutes= require('./routes/index.js')
var methodOverride = require('method-override')

app.use(bodyParser.urlencoded({extended:true}))
app.set("view engine","ejs")
app.use(express.static(__dirname+"/public"))		//dirname is just used in case our directory path to public changes i.e. for dynamic behaviour
app.use(methodOverride("_method"))
app.use(flash())
mongoose.connect('mongodb+srv://rishabh:rishabh@yelpcamp-ltoin.mongodb.net/test?retryWrites=true&w=majority')
// seedDB()

// PASSPORT CONFIGURATION
app.use(require('express-session')({
	secret: "Colt is a good teacher",
	resave: false,
	saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()))	// User.authenticate() comes with pass-loc-mongoose
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())
// PASSPORT CONFIGURED

app.use(function(req,res,next){
	res.locals.currentUser = req.user
	res.locals.error = req.flash("error")
	res.locals.success = req.flash("success")
	next()
})
app.use('/campgrounds',campgroundRoutes);
app.use('/campgrounds/:id',commentRoutes);
app.use('/',indexRoutes);
app.listen(3000,()=>{
	console.log("Yelpcamp server running at port 3000")
})