import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import  connectToDb  from './config/dbConfig.js'
import { createOwner, getAllOwner, getOneOwner } from './route/owner.js'
import { createBusiness, getAllBusiness, getOneBusiness } from './route/business.js'
import { sendotp } from './route/businessMail.js'

const app=express()
app.use(express.json())
app.use(cors())
await connectToDb();
dotenv.config();
app.use('/',sendotp)
app.use('/',createOwner)
app.use('/',getAllOwner)
app.use('/',getOneOwner)
app.use('/',createBusiness)
app.use('/',getAllBusiness)
app.use('/',getOneBusiness)
app.listen(process.env.PORT,()=>{
    console.log("start")
})