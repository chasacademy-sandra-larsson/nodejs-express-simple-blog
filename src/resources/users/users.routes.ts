import express from "express";

import { auth }  from '../../middleware/auth';
import authRoutes from './auth.routes';

import {validateUser, validateQuery} from '../../middleware/validators';

// Import handlers  from users.controller.js
import {getUsers, getUser, createUser, updateUser, deleteUser} from "./users.controllers";

const router = express.Router();

// GET /users: Retrieve a list of users.
// POST /users: Create a new user.
// GET /users/{userId}: Retrieve a specific user by ID.
// PUT /users/{userId}: Update a specific user by ID.
// DELETE /users/{userId}: Delete a specific user by ID.


// Autentiserings- och användarhanteringsrutter
router.use(authRoutes);

// CRUD for users
router.get("/users", auth,  validateQuery, getUsers);
router.get("/users/:id", auth, getUser);
router.put("/users/:id", auth, validateUser, updateUser);
router.post("/users", auth, validateUser, createUser);
router.delete("/users/:id", auth, deleteUser);


export default router;