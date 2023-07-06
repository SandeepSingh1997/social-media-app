import express from "express";

import { getUser, getFriends, addRemoveFriend } from "../controllers/user.js";

const router = express.Router();

router.get("/:id", getUser);
router.get("/:id/friends", getFriends);
router.post("/:id/friends/:friendId", addRemoveFriend);

export default router;
