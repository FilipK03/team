const express = require("express")
const server = express()
const mongoose = require("mongoose")
server.use(express.static("public"))
server.use(express.urlencoded({extended:true}))

mongoose.connect("mongodb+srv://meawi:anjing123@cluster0.cos6p.mongodb.net/team?retryWrites=true&w=majority")

const team = mongoose.connection

team.on('open', (err)=>{
    if(err)throw err
    console.log('ansluten till databas');
})

const userSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String
})

const Users = mongoose.model('usersModel', userSchema, 'users')

server.post("/register", (req, res)=>{
    let name = req.body.name
    let email = req.body.email
    let password = req.body.password
    let data = new Users({
        name: name,
        password: password,
        email: email
    })
    data.save((err)=>{
        if(err){
            console.log(err);
        }
        console.log("sparade användare till databasen");
    })
    res.redirect("/")
})

server.listen(3469)