import express from 'express';
import { createOwnerController, getAllOwnerController, getSingleOwnerController } from '../controller/ownerController.js';

const createOwner=express.Router()
createOwner.post('/create-owner',createOwnerController)

const getAllOwner=express.Router()
getAllOwner.get('/get-all-owner',getAllOwnerController)

const getOneOwner=express.Router()
getOneOwner.get('/get-owner/:id',getSingleOwnerController)


export {createOwner,getAllOwner,getOneOwner}