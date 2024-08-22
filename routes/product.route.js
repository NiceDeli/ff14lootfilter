import express from 'express';
import { Product } from '../models/product.model.js';
import { getProducts, getProduct, createProduct, updateProduct, deleteProduct } from '../controller/product.controller.js';

export const productRouter = express.Router(); 


//GET METHODS:
productRouter.get('/', getProducts);
productRouter.get("/:id", getProduct);

//POST METHODS:
productRouter.post("/", createProduct);

//PUT METHODS:
productRouter.put("/:id", updateProduct);

//Delete METHODS:
productRouter.delete("/:id", deleteProduct);
