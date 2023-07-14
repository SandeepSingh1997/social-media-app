import { Box, useMediaQuery } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import UserWidget from "../widgets/UserWidget";
import FriendListWidget from "../widgets/FriendListWidget";
import MyPostWidget from "../widgets/MyPostWidget";
import Navbar from "../navbar";
import PostsWidget from "../widgets/PostsWidget";
import FlexBetween from "../../components/FlexBetween";

const ProfilePage = () => {
  const [user, setUser] = useState(null);

  const { userId } = useParams();
  const token = useSelector((state) => state.token);
  const isNonMobileScreen = useMediaQuery("(min-width: 1000px)");

  const getUser = async () => {
    const res = await axios.get(`http://localhost:3000/users/${userId}`, {
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
      <Box
        width="100%"
        p="0px 10px"
        display={isNonMobileScreen ? "flex" : "block"}
        justifyContent="space-evenly"
      >
        <Box m="10px 0px" flexBasis={isNonMobileScreen ? "30%" : undefined}>
          <UserWidget userId={userId} picturePath={user.picturePath} />
        </Box>
        <Box m="10px 0px" flexBasis={isNonMobileScreen ? "40%" : undefined}>
          <MyPostWidget picturePath={user.picturePath} />
          <PostsWidget userId={userId} isProfile />
        </Box>
        <Box m="10px 0px" flexBasis={isNonMobileScreen ? "27%" : undefined}>
          <FriendListWidget userId={userId} />
        </Box>
      </Box>
    </Box>
  );
};

export default ProfilePage;
