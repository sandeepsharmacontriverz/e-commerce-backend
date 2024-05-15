import { Router } from "express";
import { AddToCart, RemoveToCart, GetCardList } from "../../controllers/card/index";

const router = Router();

router.post("/addtocart", AddToCart);
router.delete("/removetocart", RemoveToCart);
router.get("/cartlist", GetCardList);

export default router;
