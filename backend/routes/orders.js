const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// Place order
router.post('/', async (req, res) => {
  try {
    const { userId, medicineId, quantity } = req.body;

    const order = new Order({
      userId,
      medicineId,
      quantity,
      createdAt: new Date()
    });

    await order.save();
    res.json({ 
      message: "Order placed successfully", 
      order,
      totalPrice: order.quantity * (order.medicinePrice || 0) // optional: calculate total price if you store price
    });
  } catch (err) {
    console.error("Order error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get orders by user
router.get('/:userId', async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId }).populate('medicineId');
    
    const formattedOrders = orders.map(o => ({
      _id: o._id,
      medicine: o.medicineId,
      quantity: o.quantity,
      totalPrice: (o.medicineId?.price || 0) * o.quantity,
      createdAt: o.createdAt
    }));

    res.json(formattedOrders);
  } catch (err) {
    console.error("Get orders error:", err);
    res.status(500).json({ message: "Server error" });
  }
});


module.exports = router;
