import { Request, Response } from "express";
import Order from "../../models/order.model";
import Cards from "../../models/card.model";
import sequelize from "../../database/db_connet";
import { Op } from "sequelize";
import Product from "../../models/product.model";
// import stripe from 'stripe'; // Import Stripe library

// const stripeClient = new stripe('sk_test_51OpSMvSHmlBGcw4S1RtcTrLYIqEZIew8bKAtG4bripUMXEwmoz9M2Xt15enzSH6brUjjD9dms9pixZEDHzYRkQkM00CRR092ay');

// const createOrder = async (req: Request, res: Response) => {
//     const { customer_id, mode_of_payment } = req.body;

//     // Fetch card data using customer_id
//     try {
//         const cards = await Cards.findAll({ where: { customer_id } });

//         // Calculate total amount from card data
//         let totalAmount = 0;
//         cards.forEach((card: any) => {
//             totalAmount += parseFloat(card.price); // Assuming price is a field in the card model
//         });

//         // Use Stripe for payment
//         // if (mode_of_payment === 'stripe') {
//         //     const stripeToken = req.body.stripeToken; // Assuming the token is sent from the client side

//         //     try {
//         //         // Charge the customer using Stripe
//         //         const paymentIntent = await stripeClient.paymentIntents.create({
//         //             amount: totalAmount * 100,
//         //             currency: 'inr',
//         //             payment_method: "pk_test_51OpSMvSHmlBGcw4SiFc4FSj7Rmz026XfQxtfuepZ80Gx3MuFWijwCq5zCmn8Bwk45GCNOIZLQqWoXjQyHyIRgMCn00LhhXL7Kk",
//         //             confirm: true,
//         //         });

//         //         // If payment is successful, place the order
//         //         if (paymentIntent.status === 'succeeded') {
//         //             // Create order
//         //             const order_data = {
//         //                 customer_id,
//         //                 invoice: req.body.invoice || "",
//         //                 status: "pending",
//         //                 payment_status: "completed",
//         //                 mode_of_payment,
//         //                 // Add other fields as needed
//         //             };

//         //             const order = await Order.create(order_data);
//         //             return res.status(201).json({ message: "Order placed successfully", order });
//         //         } else {
//         //             return res.status(400).json({ message: "Payment failed" });
//         //         }
//         //     } catch (error) {
//         //         console.error(error);
//         //         return res.status(500).json({ message: "ERR_STRIPE_PAYMENT_FAILED" });
//         //     }
//         // } else {
//         //     // Handle other payment methods
//         //     return res.status(400).json({ message: "Unsupported payment method" });
//         // }
//         // Create order
//         const order_data = {
//             customer_id,
//             invoice: req.body.invoice || "",
//             status: "pending",
//             payment_status: "completed",
//             mode_of_payment,
//             card_items: cards,
//         };

//         const order = await Order.create(order_data);
//         return res.status(201).json({ message: "Order placed successfully", order });
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ message: "ERR_INTERNAL_SERVER_ERROR" });
//     }
// };

const createOrder = async (req: Request, res: Response) => {
    const { customer_id, mode_of_payment } = req.body;

    try {
        const cards = await Cards.findAll({ where: { customer_id } });

        let totalAmount = 0;
        cards.forEach((card: any) => {
            totalAmount += parseFloat(card.price);
            card.status = "pending";
        });

        // Begin a transaction
        const transaction = await sequelize.transaction();

        try {
            // Create order
            const order_data = {
                customer_id,
                invoice: req.body.invoice || "",
                status: "pending",
                payment_status: "completed",
                mode_of_payment,
                assined_driver: 0,
                card_items: cards,
            };

            const order = await Order.create(order_data, { transaction });

            // Remove card data
            await Cards.destroy({ where: { customer_id }, transaction });

            // Commit the transaction
            await transaction.commit();

            return res.status(201).json({ message: "Order placed successfully", order });
        } catch (error) {
            // Rollback the transaction if there's an error
            await transaction.rollback();
            console.error(error);
            return res.status(500).json({ message: "ERR_TRANSACTION_FAILED" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "ERR_INTERNAL_SERVER_ERROR" });
    }
};


const GetOrders = async (req: Request, res: Response) => {
    try {
        const product = await Order.findAll({});
        return res.send({ res: "OK", data: product });

    } catch (error) {
        return res.send({ message: "ERR_INTERNAL_SERVER_ERROR" });
    }
}

const GetRetailerOrders = async (req: Request, res: Response) => {
    try {
        const { retailerId } = req.query;

        // Fetch products belonging to the specified retailer ID
        const products = await Product.findAll({
            where: {
                retailer_id: retailerId
            }
        });


        // Fetch orders that have card items containing any of the extracted product IDs
        const orders = await Order.findAll({});
        
        // Filter orders to include only those that have card items containing any of the extracted product IDs
        const filteredOrders = orders.filter((order:any) => {
            // Check if any of the card_items in the order match the product IDs
            return order.card_items.some((cardItem:any) => products.some((product:any) => product.id === cardItem.product_id));
        });
        return res.send({ res: "OK", data: filteredOrders });
    } catch (error) {
        return res.status(500).send({ message: "ERR_INTERNAL_SERVER_ERROR", error: error });
    }
};



export { createOrder, GetOrders, GetRetailerOrders };