import { Request, Response } from "express";
import { Op } from "sequelize";

import Role from "../../models/role.model";

const AddRoles = async (req: Request, res: Response) => {
    let result = await Role.findOne({ where: { name: { [Op.iLike]: req.body.name } } });

    if (result) {
        return res.status(400).json("Duplicate entry. Not allowed.");
    }

    try {
        const user = await Role.create({
            name: req.body.name,
        });
        return res.status(201).json({ message: "Role created successfully", user });
    } catch (error) {
        return res.status(500).json({ message: "ERR_AUTH_USERNAME_OR_EMAIL_ALREADY_EXIST" });
    }
}

const GetRoles = async (req: Request, res: Response) => {
    try {
        const users = await Role.findAll({});
        return res.send({ res: "OK", data: users });

    } catch (error) {
        return res.send({ message: "ERR_INTERNAL_SERVER_ERROR" });
    }
}

export { AddRoles, GetRoles };