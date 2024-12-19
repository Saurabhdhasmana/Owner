const express=require("express");
const Servicemodel=require("../models/service-models");

let service=(req, res) => {
res.render("service.ejs");
};

let servicepost=async (req, res) => {

	let filename = req.files.image.map((file) => file.filename);
	let { name, description } = req.body;
	let service = await Servicemodel.create({
		name,
		images: filename,
		description
	});
	console.log(service);
	res.redirect("/service/servicepage");
};

let servicefind=async (req, res) => {
	let service = await Servicemodel.find();
	console.log("service", service);
	res.render("servicepage1", { service });
};

let servicefindone=async (req, res) => {
	let post = await Servicemodel.findOne({ _id: req.params.id });
	console.log("ola", post);
	res.render("edit.ejs", { post });
	//let owner = await OwnerModel.findOneAndUpdate({_id:req.params.id},{name,description,images},{new:true});
}

let serviceupdate=async (req, res) => {
	let { name, description } = req.body;
	console.log("req.files", req.files);
	let service = await Servicemodel.findOneAndUpdate({ _id: req.params.id }, { name, description }, { new: true });
	let map = req.files.image.map((value) => value.filename)
	service.images = map;
	await service.save();
	res.redirect("/service/servicepage");
};

let servicedelete=async (req, res) => {
	let deleteone = await Servicemodel.findOneAndDelete({ _id: req.params.id1 });
	res.redirect("/service/servicepage");
};
module.exports={service,servicepost,servicefind,servicefindone,serviceupdate,servicedelete};