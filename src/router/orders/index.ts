import { Router } from "express";
import { createOrder, GetOrders, GetRetailerOrders } from "../../controllers/order/index";

const router = Router();

router.post("/", createOrder);
router.get("/", GetOrders);
router.get("/retailer-orders", GetRetailerOrders);

export default router;
