import { Router } from "express";
import { AddCategories, GetCategories } from "../../controllers/categories/index";

const router = Router();

router.post("/", AddCategories);
router.get("/", GetCategories);

export default router;
