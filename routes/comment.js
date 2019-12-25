var express= require('express')
var router = express.Router({mergeParams : true})
var Campground = require('../models/campground.js')
var Comment = require('../models/comment.js')
var middlewareObj = require('../middleware')
// ====+====
// Comment Routes
router.get('/comments/new',middlewareObj.isLoggedIn,(req,res)=>{
	Campground.findById(req.params.id,(err,camp)=>{
		if(err){
			console.log("Error ",err)
		}
		else{
			res.render('comments/new',{campground: camp})
		}
	})
})
router.post('/comments',middlewareObj.isLoggedIn,(req,res)=>{
	Campground.findById(req.params.id,(err,camp)=>{
		if(err){
			console.log("Error:", err)
		}
		else{
			Comment.create(req.body.comment,(err,comment)=>{
				if(err){
					req.flash("error","something went wrong")
					console.log("Error: ",err)
				}
				else{
					comment.author.id = req.user._id
					comment.author.username= req.user.username
					comment.save()
					camp.comments.push(comment)
					camp.save()
					req.flash("success","Successfully added comment")
					res.redirect('/campgrounds/'+req.params.id)
				}
			})
		}
	})
})
router.get('/comments/:comment_id/edit',middlewareObj.checkCommentOwnerShip,(req,res)=>{
	Comment.findById(req.params.comment_id,(err,comment)=>{
		if(err){
			console.log("Error")
			res.redirect("back")
		}else{
			res.render("comments/edit",{campground_id:req.params.id,comment:comment})
		}
	})
})
router.put('/comments/:comment_id',middlewareObj.checkCommentOwnerShip,(req,res)=>{
	Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,(err,updatedcomment)=>{
		if(err){
			res.redirect("back")
		}else{
			res.redirect('/campgrounds/'+req.params.id)
		}
	})
})
// ====+====
router.delete('/comments/:comment_id',middlewareObj.checkCommentOwnerShip,(req,res)=>{
	// res.send("Delete comment route")
	Comment.findByIdAndRemove(req.params.comment_id,(err)=>{
		if(err){
			res.redirect("back")
		}else{
			req.flash("success","Comment deleted")
			res.redirect('/campgrounds/'+req.params.id)
		}
	})
})


module.exports = router