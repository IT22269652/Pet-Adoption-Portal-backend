import Cart from "../models/CartModel.js";

export const addToCart = async (req, res) => {
  try {
    const { postId } = req.body;
    const userId = "testUserId"; // Temporary hardcoded user ID as string
    console.log("Received addToCart request - postId:", postId, "userId:", userId);

    if (!postId) {
      console.error("Validation error: postId is required");
      return res.status(400).json({ message: "Post ID is required" });
    }

    const existingCartItem = await Cart.findOne({ postId, userId });
    if (existingCartItem) {
      console.log("Post already in cart:", postId);
      return res.status(400).json({ message: "Post already in cart" });
    }

    const cartItem = new Cart({ postId, userId });
    await cartItem.save();
    console.log("Cart item saved successfully:", cartItem._id);

    // Fetch the newly added item with populated post data
    const populatedItem = await Cart.findById(cartItem._id).populate("postId");
    res.status(201).json({ message: "Post added to cart", cartItem: populatedItem });
  } catch (error) {
    console.error("Error in addToCart:", error.message || error);
    res.status(500).json({ message: "Server error while adding to cart", error: error.message });
  }
};

export const getCartItems = async (req, res) => {
  try {
    const userId = "testUserId"; // Temporary hardcoded user ID as string
    console.log("Fetching cart items for userId:", userId);

    const cartItems = await Cart.find({ userId }).populate("postId");
    if (!cartItems.length) {
      console.log("No cart items found for userId:", userId);
    } else {
      console.log("Cart items fetched:", cartItems.map(item => item._id));
    }

    res.status(200).json(cartItems);
  } catch (error) {
    console.error("Error in getCartItems:", error.message || error);
    res.status(500).json({ message: "Server error while fetching cart items", error: error.message });
  }
};

export const removeFromCart = async (req, res) => {
  try {
    const userId = "testUserId"; // Temporary hardcoded user ID as string
    const cartId = req.params.id;
    console.log("Received removeFromCart request - cartId:", cartId, "userId:", userId);

    const cartItem = await Cart.findOne({ _id: cartId, userId });
    if (!cartItem) {
      console.log("Cart item not found or unauthorized:", cartId);
      return res.status(404).json({ message: "Cart item not found or unauthorized" });
    }

    await Cart.findByIdAndDelete(cartId);
    console.log("Cart item deleted successfully:", cartId);
    res.status(200).json({ message: "Post removed from cart" });
  } catch (error) {
    console.error("Error in removeFromCart:", error.message || error);
    res.status(500).json({ message: "Server error while removing from cart", error: error.message });
  }
};