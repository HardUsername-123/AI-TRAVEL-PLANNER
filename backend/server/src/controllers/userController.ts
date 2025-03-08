import { type Context } from "hono";
import jwt from "jsonwebtoken";
import User from "../models/users.js";

interface UserCredentials {
  username: string;
  email: string;
  password: string;
}

interface UserPayload {
  userId: string;
}

export const getUsers = async (c: Context) => {
  try {
    const users: UserCredentials[] = await User.find(
      {},
      { password: 0 }
    ).lean();
    return c.json({ users }, 200);
  } catch (error) {
    return c.json(
      { message: "Failed to fetch users", error: (error as Error).message },
      500
    );
  }
};

export const register = async (c: Context) => {
  const { username, email, password }: UserCredentials = await c.req.json();
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return c.json({ message: "User already exists" }, 400);
  }
  const user = new User({ username, email, password });
  await user.save();
  return c.json({ message: "User registered successfully" }, 201);
};

export const login = async (c: Context) => {
  const { email, password }: UserCredentials = await c.req.json();
  const user = await User.findOne({ email });
  if (!user || !(await user.comparePassword(password))) {
    return c.json({ message: "Invalid credentials" }, 401);
  }
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, {
    expiresIn: "1h",
  });
  return c.json({ message: "Login successful", token, user }, 200);
};

export const validateToken = async (c: Context) => {
  const authHeader = c.req.header("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return c.json({ valid: false }, 401);
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as UserPayload;
    return c.json({ valid: true, user: payload });
  } catch (error) {
    return c.json({ valid: false }, 401);
  }
};
