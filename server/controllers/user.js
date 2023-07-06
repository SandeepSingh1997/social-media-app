import User from "../models/User.js";

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      res.status(400).json({ msg: "user not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

export const getFriends = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      res.status(400).json({ msg: "user not found" });
    }
    const friends = await Promise.all(
      user.friends.map((friendId) => {
        return User.findById(friendId);
      })
    );

    res.status(200).json({ friends });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

export const addRemoveFriend = async (req, res) => {
  try {
    const { id, friendId } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(400).json({ msg: "user not found" });
    }
    if (user.friends.includes(friendId)) {
      user.friends = user.friends.filter((userId) => friendId !== userId);
    } else {
      user.friends.push(friendId);
    }

    await user.save();

    const friends = await Promise.all(
      user.friends.map((friendId) => {
        return User.findById(friendId);
      })
    );

    res.status(200).json({ friends });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};
