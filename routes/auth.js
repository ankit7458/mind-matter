const express = require('express');
const router = express.Router();
var multer = require('multer');
var fs = require('fs');
var path = require('path');
const { body, validationResult } = require('express-validator');
var upload = multer({ storage: storage });
const postContent = require('../models/postdata')
const User = require('../models/user');
const { error } = require('console');


router.get('/test', (req, res) => {
	res.render('test');
})

router.get('/', async (req, res) => {
	postContent.find()
		.then(function (queryResult) {
			res.render('home', {
				newListItems: queryResult
			})
		})
})

router.get('/post', (req, res) => {
	res.render('createpost')
})

router.get('/login', (req, res) => {
	res.render('login')
});


router.get('/signup', (req, res) => {
	res.render("signup")
})


var storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, '../uploads')
	},
	filename: (req, file, cb) => {
		cb(null, file.fieldname + '-' + Date.now())
	}
});

// -----------------creteing post here ---------------------------

router.post('/post', upload.single('image'), async (req, res) => {

	// var newPath = fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename))
	// console.log(newPath)
	const host = req.hostname;
	const newPath = req.protocol + "://" + host + '/' + req.file.filename;

	var obj = {
		postContent: req.body.createPost,
		img: {
			data: newPath,
			contentType: 'image/png'
		}
	}
	postContent.create(obj)
		.then((err, item) => {
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



// -------------------------------creting user -------------------


router.post('/signup', [
	body('name', 'Name should be empty').notEmpty(),
	body('email', 'Entere valid email').isEmail(),
	body('password', 'Password should not less than 5 characters').isLength({ min: 5 })
], async (req, res) => {
	try {
		let user = await User.findOne({ email: req.body.email });

		if (user) {
			return res.status(400).json({ error: "user with this email already exists!" })
		}

		user = await User.create({
			name: req.body.name,
			email: req.body.email,
			password: req.body.password
		})

		res.redirect('/')
	} catch (error) {
		console.error(error.message);
		res.status(500).json({ error: "Some internal error occured" })
	}
});

// ---------------------------creating user login ---------------------------------

// router.post('/login', async (req, res) => {

// 	// try {
// 		let userData = await User.findOne({ email: req.body.email });
// 		if (userData) {
// 			res.redirect('/')
// 		}else {
// 			console.log(error)
// 		}
// 	// } catch (error) {
// 	// 	console.log(error.message);
// 	// 	return res.status(500).json({error : "please eneter valid credential"});
// 	// }
// });



module.exports = router;

