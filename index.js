const mongoose = require("mongoose")
const express = require("express")
const {expense} = require('./schema.js')
const bodyParser = require("body-parser")
const cors = require("cors")
const app = express()
app.use(bodyParser.json())
app.use(cors())




 async function connectTodb(){
try{
   await mongoose.connect("mongodb+srv://Jega0018:Jega08m@cluster0.2afnqpo.mongodb.net/ExpenseTracker?retryWrites=true&w=majority&appName=Cluster0")
   console.log("DB connection established :)")
const port = process.env.port || 8500
app.listen(port,function(){
    console.log(`listening on port ${port}...`)
})
 }catch(error){
    console.log("error")
 }
 
}
connectTodb()

app.post('/add-expense',async function(request,response){
try{
   await expense.create({
        "Amount" : request.body.Amount,
        "category" : request.body.category,
        "Date" : request.body.Date
    })
    response.status(201).json({
        "status" : "success",
        "message" : "new entry created"
    })
}catch(error){
    response.status(500).json({
        "status" : "failure",
        "message" : "entry not created",
        "error" : error
    })
}
})

app.get('/get-expense', async function(request,response){
    try{
    const Expensedata = await expense.find()
    response.status(200).json(Expensedata)
    
  }catch(error){
    response.status(500).json({
      'status':'failure',
      "message":"entry not added"
    })
  }
  })
  app.delete('/delete-expense/:id',async function(request,response){
    try{
    const Expensedata = await expense.findById(request.params.id)
    if(Expensedata){
     await expense.findByIdAndDelete(request.params.id)
     response.status(200).json({
       'status':"entry has deleted successfully"
     })
    }else{
     response.status(404).json({
       'status': 'file could not found'
     })
    }
    }catch(error){
        response.status(500).json({
            'status': 'file could not found',
            "error":error
        })
    }
   })

   app.patch('/edit-expense',function(request,response){


   })

app.patch("/edit-expense/:id",async function(request,response){
  try{
const ExpenseEntry = await expense.findById(request.params.id)
if(ExpenseEntry){
  await ExpenseEntry.updateOne({
    "Amount":request.body.Amount,
    "category":request.body.category,
    "Date":request.body.Date
  })
  response.status(200).json({
    'status':"updated successfully"
  })
}else{
  response.status(404).json({
    'status': 'file could not found'
  })
}
  }catch(error){
    response.status(500).json({
      'status': 'file could not found',
      "error" : error})
  }
})







