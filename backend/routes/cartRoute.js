import express from "express";
import { addToCart, removeFromCart, getCart } from "../controllers/cartController.js";
// Correct import for Linux
import authMiddleware from "../middleware/auth.js";


const cartRouter = express.Router();

cartRouter.post("/add",authMiddleware,addToCart);
cartRouter.post("/remove",authMiddleware,removeFromCart);
cartRouter.post("/get",authMiddleware,getCart);

export default cartRouter;