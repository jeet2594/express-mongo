import mongoose from 'mongoose';
import { faker } from '@faker-js/faker';
import { Customer } from '../models/userModel.js';
import Category from '../models/category.js';
import Product from '../models/product.js';
import Order from '../models/order.js';
import Cart from '../models/cart.js';

const seedData = async () => {
    try {
        // Clear existing data
        await Customer.deleteMany();
        await Category.deleteMany();
        await Product.deleteMany();
        await Order.deleteMany();
        await Cart.deleteMany();

        console.log('Existing data cleared.');

        // Seed Categories
        const categories = [];
        for (let i = 0; i < 20; i++) {
            categories.push({
                name: faker.commerce.department(),
                description: faker.lorem.paragraph(),
            });
        }
        const categoryDocs = await Category.insertMany(categories);
        console.log('Categories seeded.');

        // Seed Products
        const products = [];
        for (let i = 0; i < 5000; i++) {
            const category = faker.helpers.arrayElement(categoryDocs);
            const variants = [];
            const variantCount = faker.number.int({ min: 1, max: 4 });
            for (let j = 0; j < variantCount; j++) {
                variants.push({
                    size: faker.helpers.arrayElement(['S', 'M', 'L', 'XL']),
                    color: faker.color.human(),
                    price: parseFloat(faker.commerce.price({ min: 10, max: 500 })),
                    stock: faker.number.int({ min: 10, max: 100 }),
                });
            }
            products.push({
                title: faker.commerce.productName(),
                description: faker.commerce.productDescription(),
                category: category._id,
                variants,
                brand: faker.company.name(),
                stock: faker.number.int({ min: 10, max: 100 }),
            });
        }
        const productDocs = await Product.insertMany(products);
        console.log('Products seeded.');

        // Seed Users
        const users = [];
        for (let i = 0; i < 2000; i++) {
            users.push({
                name: faker.person.fullName(),
                email: faker.internet.email(),
                password: faker.internet.password(), // Note: Should be hashed in production
            });
        }
        const userDocs = await Customer.insertMany(users);
        console.log('Users seeded.');

        // Seed Orders
        const orders = [];
        for (let i = 0; i < 2000; i++) {
            const user = faker.helpers.arrayElement(userDocs);

            // random no. of products in one order
            const productCount = faker.number.int({ min: 1, max: 3 });

            const orderProducts = [];
            let totalAmount = 0;

            for (let j = 0; j < productCount; j++) {
                const randomProduct = faker.helpers.arrayElement(productDocs);
                const randomVariant = faker.helpers.arrayElement(randomProduct.variants);
                const quantity = faker.number.int({ min: 1, max: 5 });

                orderProducts.push({
                    product: randomProduct._id,
                    variant: {
                        variantId: randomVariant._id, // Store variantId
                        size: randomVariant.size,
                        color: randomVariant.color,
                        price: randomVariant.price,
                        quantity: quantity,
                    }
                });

                totalAmount += randomVariant.price * quantity;
            }

            orders.push({
                user: user._id,
                products: orderProducts,
                totalAmount: parseFloat(totalAmount.toFixed(2)),
                paymentStatus: 'paid',
                deliveryStatus: 'shipped',
            });
        }
        await Order.insertMany(orders);
        console.log('Orders seeded.');

        // Seed Carts
        const carts = [];
        for (let i = 0; i < 2000; i++) {
            const user = faker.helpers.arrayElement(userDocs);
            const productCount = faker.number.int({ min: 1, max: 3 });

            const cartProducts = [];
            let totalAmount = 0;

            for (let j = 0; j < productCount; j++) {
                const randomProduct = faker.helpers.arrayElement(productDocs);
                const randomVariant = faker.helpers.arrayElement(randomProduct.variants);
                const quantity = faker.number.int({ min: 1, max: 5 });

                cartProducts.push({
                    product: randomProduct._id,
                    variant: {
                        variantId: randomVariant._id, // Store variantId
                        size: randomVariant.size,
                        color: randomVariant.color,
                        price: randomVariant.price,
                        quantity: quantity,
                    }
                });

                totalAmount += randomVariant.price * quantity;
            }

            carts.push({
                user: user._id,
                products: cartProducts,
                totalAmount: parseFloat(totalAmount.toFixed(2)),
            });
        }
        await Cart.insertMany(carts);
        console.log('Carts seeded.');

        console.log('✅ Seeding data complete!');
    } catch (error) {
        console.error('❌ Error seeding data:', error);
    } finally {
        mongoose.connection.close();
    }
};

mongoose
    .connect('mongodb://127.0.0.1:27017/express-mongo')
    .then(() => {
        console.log('Connected to MongoDB ✅');
        seedData();
    })
    .catch((error) => {
        console.error('MongoDB connection error:', error);
        mongoose.connection.close();
    });
