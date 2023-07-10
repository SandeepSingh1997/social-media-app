import { useTheme } from "@emotion/react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "../../state";
import { useEffect } from "react";
import WidgetWrapper from "../../components/WidgetWrapper";
import { Typography } from "@mui/material";
import Friend from "../../components/Friend";

export default function FriendListWidget({ userId }) {
  const friends = useSelector((state) => state.user.friends);
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const token = useSelector((state) => state.token);

  const getFriends = async () => {
    const res = await axios.get(
      `http://localhost:3000/users/${userId}/friends`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    dispatch(setFriends({ friends: res.data }));
  };

  useEffect(() => {
    getFriends();
  }, []);

  return (
    <WidgetWrapper>
      <Typography>Friend List</Typography>
      <Box display="flex" flexDirection="column">
        {friends.map((friend) => (
          <Friend
            key={friend._id}
            friendId={friend._id}
            name={`${friend.firstName} ${friend.lastName}`}
            subtitle={friend.location}
            userPicturePath={friend.picturePath}
          />
        ))}
      </Box>
    </WidgetWrapper>
  );
}
