import { Router } from "express";
import { AddRoles, GetRoles } from "../../controllers/role/index";

const router = Router();

router.post("/role", AddRoles);
router.get("/role", GetRoles);

export default router;
