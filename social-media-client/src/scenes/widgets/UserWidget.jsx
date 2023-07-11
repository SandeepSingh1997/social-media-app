import { useTheme } from "@emotion/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import WidgetWrapper from "../../components/WidgetWrapper";
import FlexBetween from "../../components/FlexBetween";
import UserImage from "../../components/UserImage";
import { Box, Divider, Typography } from "@mui/material";
import {
  Instagram,
  LocationOnOutlined,
  ManageAccountsOutlined,
  Twitter,
} from "@mui/icons-material";

export default function UserWidget({ userId, picturePath }) {
  const [user, setUser] = useState(null);
  const { palette } = useTheme();
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;

  const getUser = async () => {
    const user = await axios.get(`http://localhost:3000/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setUser(user.data);
  };

  useEffect(() => {
    getUser();
  }, []);

  if (!user) {
    return <h1>Loading...</h1>;
  }

  const {
    firstName,
    lastName,
    location,
    occupation,
    viewedProfile,
    impressions,
    friends,
  } = user;

  return (
    <WidgetWrapper>
      {/*First row*/}
      <FlexBetween onClick={() => navigate(`/profile/${userId}`)}>
        <FlexBetween>
          <UserImage image={picturePath} />
          <Box m="10px 0px 10px 0px">
            <Typography sx={{ fontWeight: "500" }}>
              {firstName} {lastName}
            </Typography>
            <Typography>
              {friends.length} friend{friends.length > 1 ? "s" : null}
            </Typography>
          </Box>
        </FlexBetween>
        <ManageAccountsOutlined />
      </FlexBetween>

      <Divider />

      {/*Second row*/}
      <Box m="10px 0px 10px 0px">
        <Box display="flex" alignItems="center" m="5px">
          <LocationOnOutlined />
          <Typography>{location}</Typography>
        </Box>
        <Box display="flex" alignItems="center" m="5px">
          <LocationOnOutlined />
          <Typography>{occupation}</Typography>
        </Box>
      </Box>

      <Divider />
      {/*Third row*/}
      <Box m="10px 0px 10px 0px">
        <FlexBetween m="5px 0px">
          <Typography>Profile views</Typography>
          <Typography>{viewedProfile}</Typography>
        </FlexBetween>
        <FlexBetween m="5px 0px">
          <Typography>Post impressions</Typography>
          <Typography>{impressions}</Typography>
        </FlexBetween>
      </Box>

      <Divider />
      {/*Fourth row*/}
      <Box m="10px 0px 10px 0px">
        <Typography>Social Profile</Typography>
        <FlexBetween m="5px">
          <Twitter />
          <Typography>sandeep@twitter</Typography>
        </FlexBetween>
        <FlexBetween m="5px">
          <Instagram />
          <Typography>singh182</Typography>
        </FlexBetween>
      </Box>
    </WidgetWrapper>
  );
}
