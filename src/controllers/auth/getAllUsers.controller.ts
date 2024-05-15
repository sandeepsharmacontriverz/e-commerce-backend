import { Request, Response } from "express";
import User from "../../models/user.model";
import Role from "../../models/role.model";

const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.findAll();
        if (users.length === 0) {
            return res.status(404).send({ message: "Data not found" });
        }

        // Iterate over each user to fetch and attach role data
        const usersWithRole = await Promise.all(users.map(async (user: any) => {
            const role = await Role.findOne({ where: { id: user.role } });
            return { ...user.toJSON(), role };
        }));

        return res.status(200).json({ message: "OK", data: usersWithRole });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ message: "Something went wrong" });
    }
}

export default getAllUsers;
