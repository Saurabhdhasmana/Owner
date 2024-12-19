const Portmodel=require("../models/portfolio-models");

let portfolio=(req,res)=>{
	res.render("app3.ejs");
};

let portlogin=async (req, res) => {
	let { name, description } = req.body;
	let image = req.file.filename;
	let port = await Portmodel.create({
		name,
		description,
		image
	})
	res.redirect("/portfolio/portfolio1");
};

let portfind=async (req, res) => {
	let port = await Portmodel.find();
	console.log(port);
	res.render("portfolio1.ejs", { port });
};

let portedit=async (req, res) => {
	let user = await Portmodel.findOne({ _id: req.params.id });
	res.render("edit1.ejs", { user });
}

let portupdate=async (req, res) => {
	let { name, description } = req.body
	let user1 = await Portmodel.findOneAndUpdate({ _id: req.params.id }, { name, description }, { new: true });
	if (req.file) {
		user1.image = req.file.filename
		await user1.save();
	}
	res.redirect("/portfolio/portfolio1");
}

let portdelete=async(req,res)=>{
let delete1 = await Portmodel.findOneAndDelete({_id:req.params.id});
res.redirect("/portfolio/portfolio1");
};
module.exports={portfolio,portlogin,portfind,portedit,portupdate,portdelete};