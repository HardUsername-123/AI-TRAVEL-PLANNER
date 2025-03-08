import { Hono } from "hono";
import {
  getUsers,
  login,
  register,
  validateToken,
} from "../controllers/userController.js";

const router = new Hono();

router.get("/users", getUsers);
router.post("/register", register);
router.post("/login", login);
router.get("/validate-token", validateToken);

export default router;
