const express = require("express")
const server = express()
const mongoose = require("mongoose")
server.use(express.static("public"))
server.use(express.urlencoded({extended:true}))

mongoose.connect("mongodb+srv://meawi:anjing123@cluster0.cos6p.mongodb.net/team?retryWrites=true&w=majority")

const team = mongoose.connection

team.on('open', (err)=>{
    if(err)console.log("\x1b[31m", err)

    console.log("\x1b[32m", "Connected to database");
    console.log("\x1b[37m", "");
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
            console.log("\x1b[31m", err);
        }
        console.log("\x1b[32m", "Saved to database");
        console.log("\x1b[37m", "");
    })
    res.redirect("/")
})

server.post("/login", (req, res)=>{
    const userName = req.body.name
    const userEmail = req.body.email
    const userPassword = req.body.password
    async function auth() {
        const match = await  Users.findOne({email:userEmail, password:userPassword})
        if(match){
            res.sendFile(__dirname + "/public/" + "homepage.html")
            console.log("\x1b[32m", "Login Successful")
            console.log("\x1b[37m", "");
        }else{
            res.send("Login Failed")
        }
    }
    auth()

})

server.listen(3469)