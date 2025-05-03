import mongoose from 'mongoose';

const variantSchema = new mongoose.Schema({
    size: { type: String },
    color: { type: String },
    price: { type: Number },
    stock: { type: Number }
});

const productSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    variants: [variantSchema],
    brand: { type: String },
    stock: { type: Number }
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);
export default Product;
