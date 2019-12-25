var mongoose= require('mongoose'),
	Campground= require('./models/campground'),
	Comment= require('./models/comment')

var data=[
	{
		name:"Kheerganga",
		image:"https://s3.ap-south-1.amazonaws.com/townscript-production/images/6a052005-4b2f-4737-8d20-1184dae258dc.jpg",
		description:"Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
	},
	{
		name:"Triund",
		image:"https://images.thrillophilia.com/image/upload/s--kupQb-PU-					-					/c_fill,f_auto,fl_strip_profile,h_600,q_auto,w_975/v1/images/photos/000/127/614/original/1524745600_Parvati_Valley_river_kasol.jpg.jpg?1524745598",
		description:"Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
	},
	{
		name:"Goofy hill",
		image:"https://storage.googleapis.com/ehimages/2018/12/6/img_f5ecb7f889d90b0a611d2ddd4ad3fa1f_1544080158113_processed_original.jpg",
		description:"Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
	},
]
var seedDB= ()=>{
	Campground.remove({},(err)=>{
		// if(err){
		// 	console.log(err)
		// }
		// else{
		// 	console.log("All campgrounds removed")	
		// 	data.forEach(seed=>{
		// 		Campground.create(seed,(err,camp)=>{
		// 			if(err){
		// 				console.log(err)
		// 			}
		// 			else{
		// 				console.log("camp created")
		// 				Comment.create({
		// 					comment:"Blah Blah Blah",
		// 					author:"Homie"
		// 				},(err,comment)=>{
		// 					if(err){
		// 						console.log(err)
		// 					}
		// 					else{
		// 						camp.comments.push(comment)
		// 						camp.save()
		// 						console.log("comment added")
		// 					}
		// 				})
		// 			}
		// 		})
		// 	})
		// }
	})
}
module.exports= seedDB