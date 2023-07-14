import { Box, Divider, useMediaQuery } from "@mui/material";
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
      <Box
        width="100%"
        p="0px 10px"
        display={isNonMobileScreen ? "flex" : "block"}
        justifyContent="space-evenly"
      >
        <Box m="10px 0px" flexBasis={isNonMobileScreen ? "30%" : undefined}>
          <UserWidget userId={_id} picturePath={picturePath} />
        </Box>
        <Box m="10px 0px" flexBasis={isNonMobileScreen ? "40%" : undefined}>
          <MyPostWidget picturePath={picturePath} />
          <PostsWidget userId={_id} />
        </Box>
        <Box flexBasis={isNonMobileScreen ? "27%" : undefined} m="10px 0px">
          <AdvertWidget />
          <Box m="10px 0px"></Box>
          <FriendListWidget userId={_id} />
        </Box>
      </Box>
    </Box>
  );
};

export default HomePage;
