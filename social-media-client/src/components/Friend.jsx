import { useTheme } from "@emotion/react";
import FlexBetween from "./FlexBetween";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { setFriends } from "../state";
import UserImage from "./UserImage";
import { IconButton, Typography } from "@mui/material";
import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";

export default function Friend({ friendId, name, subtitle, userPicturePath }) {
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends);

  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.primary.main;
  const medium = palette.primary.medium;

  const isFriend = friends.find((friend) => friend._id === friendId);

  const patchFriend = async () => {
    const response = axios.patch(
      `http://localhost:3000/users/${_is}/${friendId}`,
      { headers: { Autherization: `Bearer ${token}` } }
    );
    dispatch(setFriends({ friends: response.data }));
  };

  return (
    <FlexBetween>
      <FlexBetween gap="1rem">
        <UserImage image={userPicturePath} />
        <Box
          onClick={() => {
            navigate(`/profile/${friendId}`);
            // navigate(0)
          }}
        >
          <Typography>{name}</Typography>
          <Typography>{subtitle}</Typography>
        </Box>
      </FlexBetween>
      <IconButton onClick={patchFriend}>
        {isFriend ? <PersonRemoveOutlined /> : <PersonAddOutlined />}
      </IconButton>
    </FlexBetween>
  );
}
