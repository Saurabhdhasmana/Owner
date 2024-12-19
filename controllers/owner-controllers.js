const express =require("express");
let router = express.Router();
const flash = require('connect-flash');
const session = require('express-session');
const jwt = require('jsonwebtoken');
const { OwnerModel, validateOwner } = require("../models/owner-models");
const bcrypt = require("bcryptjs");
const cookieParser = require('cookie-parser');

router.use(session({
	secret: 'your_secret_key',
	resave: false,
	saveUninitialized: true
}));
router.use(flash());
let app1= (req, res) => {
	let error = req.flash("error") || [];
	res.render("app.ejs", { error });
}
let login=(req, res) => {
	let error = req.flash("error") || [];
	res.render("app1.ejs", { error });
}

let ownerlogin = async(req, res) => {
	try {
		let find = await OwnerModel.find();
		let length = find.length;
		if (length > 0) {
			req.flash("error", "There can be only 1 Admin")
			return res.redirect("/owner");
		}
		console.log(find);
		console.log(req.body);
		let { name, email, password } = req.body;
		bcrypt.genSalt(10, (err, salt) => {
			bcrypt.hash(password, salt, async (err, hash) => {
				let owner = await OwnerModel.create({
					name,
					email,
					password: hash
				});
				console.log(owner);
			})
		})
		res.redirect("/owner/login")
	}
	catch (err) {
		res.send(err);
	}
}

 let postlogin = async(req, res) => {
	let { email, password } = req.body;
	let owner = await OwnerModel.findOne({ email });
	if (!owner) {
		req.flash("error", "Email or password is incorrect");
		return res.redirect("/owner/login");
	}
	let result = await bcrypt.compare(password, owner.password);
	if (!result) {
		req.flash("error", "Email or password is incorrect");
		return res.redirect("/owner/login");
	}
	let token = jwt.sign({ email: email, id: owner._id }, process.env.SECRET, { expiresIn: '1h' })
	console.log(token)
	res.cookie("token", token);
	res.redirect("/service");
};

let middleware=(req, res) => {
	console.log(req.user);
	res.render("app2.ejs");
};

 let logout=(req, res) => {
	res.cookie("token", "");
	res.redirect("/owner/login");
};

module.exports={app1,login,ownerlogin,postlogin,logout,middleware};