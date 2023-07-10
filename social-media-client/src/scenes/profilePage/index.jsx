import { Box, useMediaQuery } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import UserWidget from "../widgets/UserWidget";
import FriendListWidget from "../widgets/FriendListWidget";
import MyPostWidget from "../widgets/MyPostWidget";
import PostsWidget from "../widgets/PostsWidget";

const ProfilePage = ({ userId }) => {
  const [user, setUser] = useState(null);

  const { userid } = useParams();
  const token = useSelector((state) => state.token);
  const isNonMobileScreen = useMediaQuery("(min-width: 1000px)");

  const getUser = async () => {
    const res = await axios.get(`http://localhost:3000/user/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setUser(res.data);
  };

  useEffect(() => {
    getUser();
  }, []);
  if (!user) {
    return null;
  }

  return (
    <Box>
      <Navbar />
      <Box>
        <Box>
          <UserWidget userId={userId} picturePath={user.picturePath} />
          <Box>
            <FriendListWidget userId={userId} />
          </Box>
          <Box>
            <MyPostWidget picturePath={user.picturePath} />
            <PostsWidget userId={userId} isProfile />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ProfilePage;
