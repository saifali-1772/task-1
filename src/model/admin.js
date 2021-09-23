const mongoose = require("mongoose")

const data = new mongoose.Schema({

    username:{
        type:String,
        unique:true
    },
    password:String,

})

const Admin = mongoose.model("Admin",data)

module.exports = Admin
