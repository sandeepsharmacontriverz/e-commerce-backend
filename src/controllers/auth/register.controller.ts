import { Request, Response } from "express";
import { Op } from "sequelize";

import User from "../../models/user.model";
import { generateTokens } from "../../util/auth";
import hash from "../../util/hash";

const register = async (req: Request, res: Response) => {
  let result = await User.findOne({
    where: {
      [Op.or]: [
        { email: { [Op.iLike]: req.body.email } },
        { number: req.body.mobile || null }
      ]
    }
  });

  if (result) {
    return res.status(400).json("Duplicate entry. Not allowed.");
  }

  const USER_MODEL = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
    password: await hash.generate(req.body.password),
    number: req.body.mobile || "",
  };

  try {
    const user = await User.create(USER_MODEL);
    var { accessToken } = await generateTokens(user.dataValues.id, user.dataValues.name, req.body.role);
    return res.status(201).json({ message: "User created successfully", accessToken, user });
  } catch (error) {
    return res.status(500).json({ error: error, message: "ERR_AUTH_USERNAME_OR_EMAIL_ALREADY_EXIST" });
  }
}

export default register;