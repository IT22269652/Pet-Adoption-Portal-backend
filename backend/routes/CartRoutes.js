import express from "express";
import { addToCart, getCartItems, removeFromCart } from "../controller/CartController.js";

const router = express.Router();

router.post("/cart", addToCart);
router.get("/cart", getCartItems);
router.delete("/cart/:id", removeFromCart);

export default router;