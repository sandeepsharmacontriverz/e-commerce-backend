import { Request, Response } from "express";
import Card from "../../models/card.model";

const AddToCart = async (req: Request, res: Response) => {
    const cardData = {
        order_id: req.body.order_id || 0,
        customer_id: req.body.customer_id,
        product_id: req.body.product_id,
        size: req.body.size,
        quantity: 1,
        status: "Cart",
    };

    try {
        let card = await Card.findOne({
            where: {
                customer_id: cardData.customer_id,
                product_id: cardData.product_id,
            }
        });

        if (card) {
            card.quantity += cardData.quantity;
            card.size += cardData.quantity * cardData.size
            await card.save();
        } else {
            cardData.size *= cardData.quantity;
            card = await Card.create(cardData);
        }

        return res.status(201).json({ message: "Added to cart successfully", card });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
};



const RemoveToCart = async (req: Request, res: Response) => {
    const cardId = req.body.id;

    try {
        const card = await Card.findByPk(cardId);

        if (!card) {
            return res.status(404).json({ message: "Card not found" });
        }

        const itemPrice = +card.size / card.quantity;

        if (card.quantity > 1) {
            card.quantity -= 1;
            card.size -= itemPrice;
            await card.save();
        } else {
            await card.destroy();
        }

        return res.status(200).json({ message: "Removed from cart successfully", card });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
};


const GetCardList = async (req: Request, res: Response) => {
    try {
        const card = await Card.findAll({ include: 'product' });
        return res.send({ res: "OK", data: card });

    } catch (error) {
        return res.send({ message: "ERR_INTERNAL_SERVER_ERROR" });
    }
}

export { AddToCart, RemoveToCart, GetCardList };