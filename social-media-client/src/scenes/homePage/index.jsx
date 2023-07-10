import { Box, useMediaQuery } from "@mui/material";
import Navbar from "../navbar";
import { useSelector } from "react-redux";
import UserWidget from "../widgets/UserWidget";
import MyPostWidget from "../widgets/MyPostWidget";
import PostsWidget from "../widgets/PostsWidget";
import AdvertWidget from "../widgets/AdvertWidget";
import FriendListWidget from "../widgets/FriendListWidget";

const HomePage = () => {
  const isNonMobileScreen = useMediaQuery("(min-width: 1000px");
  const { _id, picturePath } = useSelector((state) => state.user);

  return (
    <Box>
      <Navbar />
      <Box width="100%" display={isNonMobileScreen ? "flex" : "block"}>
        <Box flexBasis={isNonMobileScreen ? "26%" : undefined}>
          <UserWidget userId={_id} picturePath={picturePath} />
        </Box>
        <Box>
          <MyPostWidget picturePath={picturePath} />
          <PostsWidget userId={_id} />
        </Box>
        <Box>
          <AdvertWidget />
          <FriendListWidget userId={user._id} />
        </Box>
      </Box>
    </Box>
  );
};

export default HomePage;
