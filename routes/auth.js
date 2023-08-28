const express = require('express');
const router = express.Router();
var multer = require('multer');
var fs = require('fs');
var path = require('path');
var upload = multer({ storage: storage });
const postContent = require('../models/postdata')


router.get('/',async (req,res)=>{
    postContent.find()
        .then(function(queryResult){
            res.render('home', {
                newListItems : queryResult
            })
        })
})

router.get('/post',(req, res)=>{
    res.render('createpost')
})

router.get('/login',(req, res) => {
	res.render('login')
});

router.get('/signup',(req , res) => {
	res.render('signup')
})

var storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, '../uploads')
	},
	filename: (req, file, cb) => {
		cb(null, file.fieldname + '-' + Date.now())
	}
});

router.post('/post',upload.single('image'),async(req,res) =>{

    // var newPath = fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename))
    // console.log(newPath)
    const host = req.hostname;
	const newPath = req.protocol + "://" + host + '/' + req.file.filename;

	var obj = {
		postContent : req.body.createPost,
		img: {
			data: newPath,
			contentType: 'image/png'
		}
	}
	postContent.create(obj)
	.then ((err, item) => {
		if (err) {
			console.log(err);
		}
		else {
			item.save();
			res.redirect('/');
		}
	});



    // try {
    //     const userPost = await  postContent.create({
    //         postContent : req.body.createPost,
    //         img: {
    //             data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
    //             contentType: 'image/png'
    //         }
    //     });
    //     res.redirect('/')
    // } catch (error) {
    //     console.log(error)
    //     // return res.status(400).json({ error: "Some interenal error occured" })
    // }
});



module.exports = router;

