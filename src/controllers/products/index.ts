import { Request, Response } from "express";
import { Op } from "sequelize";

import Product from "../../models/product.model";

const AddProducts = async (req: Request, res: Response) => {
    let result = await Product.findOne({ where: { product_name: { [Op.iLike]: req.body.product_name } } });

    if (result) {
        return res.status(400).json("Duplicate entry. Not allowed.");
    }

    const product_data = {
        cat_id: req.body.cat_id,
        retailer_id: req.body.retailer_id,
        product_name: req.body.product_name,
        product_desc: req.body.product_desc,
        images: req.body.images,
        brand: req.body.brand,
        color: req.body.color,
        price: req.body.price,
    }

    try {
        const product = await Product.create(product_data);
        return res.status(201).json({ message: "Product created successfully", product });
    } catch (error) {
        return res.status(500).json({ message: "ERR_INTERNAL_SERVER_ERROR" });
    }
}

const GetProducts = async (req: Request, res: Response) => {
    try {
        const product = await Product.findAll({});
        return res.send({ res: "OK", data: product });

    } catch (error) {
        return res.send({ message: "ERR_INTERNAL_SERVER_ERROR" });
    }
}

export { AddProducts, GetProducts };