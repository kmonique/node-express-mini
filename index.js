// implement your API here

//package requires
const express = require('express');

//file requires
	const db = require("./data/db");

	const server = express();
	const PORT = 4000;

//endpoints
	server.get("/api/users", (req, res) => {
		db.find()
			.then(users => {
				res.json(users);
			})
			.catch(err => {
				res
					.status(500)
					.json({message: "failed to get users"});
			});
	});

	server.get("/api/users/:id", (req, res) => {
		const {id} = req.params;
		db.findById()
			.then(users => {
				if(user){
					res.json(user);
				} else {
					res
						.status(404)
						.json({message: "user does not exist"})
				}
			})
			.catch(err => {
				res
					.status(500)
					.json({message: "failed to get user"});
			})
	});

//listening
	server.listen(PORT, () => {
		console.log(`server is up and running on ${PORT}`);
	});