import mongoose from 'mongoose';

const orderProductSchema = new mongoose.Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    variant: {
        variantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product.variant' },
        size: { type: String },
        color: { type: String },
        price: { type: Number },
        quantity: { type: Number }
    }
});

const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    products: [orderProductSchema],
    totalAmount: { type: Number },
    paymentStatus: { type: String, enum: ['pending', 'paid'], default: 'pending' },
    deliveryStatus: { type: String, enum: ['pending', 'shipped', 'delivered'], default: 'pending' },
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);
export default Order;
