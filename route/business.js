import express from 'express';
import { createBusinessController, getAllBusinessController, getSingleBusinessController } from '../controller/businessController.js';

const createBusiness=express.Router()
createBusiness.post('/create-business',createBusinessController)

const getAllBusiness=express.Router()
getAllBusiness.get('/get-all-business',getAllBusinessController)

const getOneBusiness=express.Router()
getOneBusiness.get('/get-business/:id',getSingleBusinessController)

export {createBusiness,getAllBusiness,getOneBusiness}
