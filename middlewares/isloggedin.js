const jwt = require('jsonwebtoken');
let {OwnerModel} = require("../models/owner-models");
const cookieParser = require('cookie-parser');
let isloggedIn = async(req,res,next) => {
	if (!req.cookies.token) {
		req.flash("error", 'please you need to login first');
		return res.redirect("/owner/login");
	}
	else {
		try {
			let data = jwt.verify(req.cookies.token, "shhhhhhhhh");
			let user = await OwnerModel.findOne({ email: data.email });
			req.user = user;
			next();
		}
		catch (err) {
			req.flash("error", "Somthing went wrong check it");
			return res.redirect("/owner/login");
			console.log(err);
		}
	}
}
module.exports = isloggedIn;
