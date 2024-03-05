const mongoose = require("mongoose")
const expensetrackerschema = new mongoose.Schema({
    Amount :{
        type : Number
    },
    category : {
        type : String
    },
    Date :{
        type : String

    }
})
 
const expense = mongoose.model("expensedetails",expensetrackerschema)
module.exports = {expense}