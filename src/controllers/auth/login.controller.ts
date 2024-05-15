import { Request, Response } from "express";

import User from "../../models/user.model";
import { generateTokens } from "../../util/auth";
import hash from "../../util/hash";
import Role from "../../models/role.model";

const login = async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });
    if (!user) {
      return res.send({ res: res, message: "ERR_AUTH_WRONG_USERNAME" });
    }
    if (user) {
      const role = await Role.findOne({ where: { id: user.dataValues.role } });
      let verifyPassword = await hash.compare(req.body.password, user.dataValues.password)
      if (!verifyPassword) { return res.send({ res: res, message: "ERR_AUTH_WRONG_PASSWORD" }); };

      var { accessToken } = await generateTokens(user.dataValues.id, user.dataValues.name, role);
      return res.status(201).json({ message: "User created successfully", accessToken, user, role });
    }
  } catch (error) {
    return res.status(500).json({ message: "ERR_AUTH_WRONG_USERNAME_OR_PASSWORD" });
  }
}

export default login;