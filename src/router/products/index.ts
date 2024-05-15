import { Router } from "express";
import { AddProducts, GetProducts } from "../../controllers/products/index";

const router = Router();

router.post("/", AddProducts);
router.get("/", GetProducts);

export default router;
