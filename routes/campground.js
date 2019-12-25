var express= require('express')
var router = express.Router()
var Campground = require('../models/campground.js')
var middlewareObj = require('../middleware')
router.get('/',(req,res)=>{
	Campground.find({},(err,allCamps)=>{
		if(err){
			console.log(err)
		}
		else{
			res.render("campgrounds/index",{campgrounds:allCamps})
		}
	})
	
})
router.post('/',middlewareObj.isLoggedIn,(req,res)=>{
	var name=req.body.name
	var image= req.body.image
	var price= req.body.price
	var desc= req.body.description
	var author = {username: req.user.username, id: req.user._id}
	var newCamp= {name:name,price:price,image:image,description:desc,author:author}
	Campground.create(newCamp,(err,camp)=>{
		if(err){
			console.log(err)
		}
		else{
			console.log("NEW CAMP ADDED")
		}
	})
	res.redirect('/campgrounds')
})
router.get('/new',middlewareObj.isLoggedIn,(req,res)=>{
	res.render('campgrounds/new')
})
router.get('/:id',(req,res)=>{
	Campground.findById(req.params.id).populate("comments").exec((err,foundCampground)=>{
		if(err){
			console.log(err)
		}
		else{
			res.render("campgrounds/show",{campground: foundCampground})
		}
	})
})
router.get('/:id/edit',middlewareObj.checkCampgroundOwnerShip, (req,res)=>{
	
		Campground.findById(req.params.id,(err,camp)=>{
			res.render('campgrounds/edit',{campground:camp})
				
			}
		)}
)
router.put('/:id/edit',middlewareObj.checkCampgroundOwnerShip,(req,res)=>{
	Campground.findByIdAndUpdate(req.params.id,req.body.campground,(err,camp)=>{
		if(err){
			console.log("Error: ",err)
			res.redirect('/campgrounds')
		}else{
			res.redirect('/campgrounds/'+req.params.id)
		}
	})
})
router.delete('/:id',middlewareObj.checkCampgroundOwnerShip,(req,res)=>{
	Campground.findByIdAndRemove(req.params.id,(err)=>{
		if(err){
			console.log("ERROR:", err);
		}else{
			res.redirect('/campgrounds')
		}
	})
});


module.exports = router