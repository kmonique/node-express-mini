// implement your API here
//package requires
const express = require('express');

//file requires
const db = require("./data/db");

const server = express();
//middleware
server.use(express.json());
const PORT = 4000;

//endpoints for get request
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

//get user by id
server.get("/api/users/:id", (req, res) => {
	const {id} = req.params;
	db.findById(id)
		.then((user) => {
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

//post request
server.post("/api/users/", (req, res) => {
	const user = req.body;
	if(user.name && user.bio) {
		db.insert(user)
			.then(idInfo => {
				db.findById(idInfo.id)
					.then(user => {
						res.status(201).json(user);
					})
			})
			.catch(err => { 
				res.status(500).json({ error: "There was an error while saving the user to the database" })
			});
	} else {
		res.status(400).json({ errorMessage: "Please provide name and bio for the user." });
	}
});

//delete request
server.delete("/api/users/:id", (req, res) => {
	const {id} = req.params;
	db.remove(id)
		.then(idInfo => {
			if(idInfo) {
				res.json({message: `user ${idInfo} deleted!`})
			} else {
				res.staus(404).json({ message: "The user with the specified ID does not exist." })
			}
		})
		.catch(err => {
			res.status(500).json({ error: "The user could not be removed" })
		});
});

//put request
server.put("/api/users/:id", (req, res) => {
	const {id} = req.params;
	const user = req.body;

	if(user.name && user.bio) {
		db.update(id, user)
			.then(count => {
				if(count) {
					db.findById(user)
						.then(user => {
							res.json({message: "update successful"})
						})
				} else {
					res.status(404).json({ message: "The user with the specified ID does not exist." });
				}
			})
			.catch(err => {
				res.status(500).json({ error: "The user information could not be modified." });
			});
	} else {
		res.status(400).json({ errorMessage: "Please provide name and bio for the user." });
	}
});

//listening
server.listen(PORT, () => {
	console.log(`server is up and running on ${PORT}`);
});