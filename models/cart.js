import mongoose from 'mongoose';

const cartProductSchema = new mongoose.Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    variant: {
        variantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product.variant' },
        size: { type: String },
        color: { type: String },
        price: { type: Number },
        quantity: { type: Number }
    }
});

const cartSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    products: [cartProductSchema],
    totalAmount: { type: Number }
}, { timestamps: true });

const Cart = mongoose.model('Cart', cartSchema);
export default Cart;
