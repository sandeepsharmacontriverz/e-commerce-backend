import { Request, Response } from "express";
import { Op } from "sequelize";

import Category from "../../models/category.model";

const AddCategories = async (req: Request, res: Response) => {
    let result = await Category.findOne({ where: { cat_name: { [Op.iLike]: req.body.cat_name } } });

    if (result) {
        return res.status(400).json("Duplicate entry. Not allowed.");
    }

    try {
        const category = await Category.create({
            cat_name: req.body.cat_name,
        });
        return res.status(201).json({ message: "Category created successfully", category });
    } catch (error) {
        return res.status(500).json({ message: "ERR_AUTH_USERNAME_OR_EMAIL_ALREADY_EXIST" });
    }
}

const GetCategories = async (req: Request, res: Response) => {
    try {
        const categories = await Category.findAll({});
        return res.send({ res: "OK", data: categories });

    } catch (error) {
        return res.send({ message: "ERR_INTERNAL_SERVER_ERROR" });
    }
}

export { AddCategories, GetCategories };