const { json } = require("express");
const express = require("express")
const app = express()
const fs = require('fs')
var requests = require('requests');
const ejs = require('ejs')
const mongoose = require('mongoose')
require('./db/conn')
const Admin = require('./model/admin')
const session = require('express-session')

app.use(session({
    secret: 'news-session',
    resave: true,
    saveUninitialized: true
}))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.set("view engine", "ejs")
app.use(express.static('public'))

app.post('/save', (req, res) => {

    const use = new Admin()
    use.username = "admin",
        use.password = "admin"
    use.save((err, doc) => {
        if (!err) {
            res.redirect('/')
        }
    })

})

app.get('/singup', (req, res) => {
    res.render('login')
})

app.post('/singup', async (req, res) => {

    res.redirect('/')

    // console.log(Admin.findOne({username:"admin"}))

    // try {
    //     const adm = await Admin.findOne({ username: req.body.username })
    // if (Admin.password == req.body.password) {
    //     req.session.username = userlog.username

    //         res.redirect('/')
    //     } else {
    //         res.render('login', {
    //             error: "Wrong Username & Password"
    //         })
    //     }
    // } catch (error) {
    //     res.render('login', {
    //         error: "Wrong Username & Password"
    //     })
    // }
    // res.render('login')

})

app.get("/", (req, res) => {

    // if (!req.session.username) {

    requests('https://api.imgflip.com/get_memes')
        .on('data', (chunk) => {
            const objData = JSON.parse(chunk)
            const arrData = [objData]
            // console.log(arrData[0].data.memes.length)
            // console.log(arrData[0].data.memes[99])
            res.render('home', {
                memes_rec: arrData[0].data,
            })
        })
        .on('end', (err) => {
            if (err) return console.log('connection closed due to errors', err);
            console.log('end');
        });

    // } else {
    //     res.redirect('/admin/post')
    // }
})



app.listen(5000, () => { console.log("server start on port 5000") })