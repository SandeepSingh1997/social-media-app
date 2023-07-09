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
  LocationOnOutlined,
  ManageAccountsOutlined,
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
    const data = await axios.get(`http://localhost:3000/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setUser(data);
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
          <Box>
            <Typography>
              {firstName} {lastName}
            </Typography>
            <Typography>{friends.length} friends</Typography>
          </Box>
        </FlexBetween>
        <ManageAccountsOutlined />
      </FlexBetween>

      <Divider />

      {/*Second row*/}
      <Box>
        <Box display="flex" alignItems="center">
          <LocationOnOutlined />
          <Typography>{location}</Typography>
        </Box>
        <Box display="flex" alignItems="center">
          <LocationOnOutlined />
          <Typography>{occupation}</Typography>
        </Box>
      </Box>

      <Divider />
      {/*Third row*/}
      <Box>
        <FlexBetween>
          <Typography>Who's viewed your profile</Typography>
          <Typography>{viewedProfile}</Typography>
        </FlexBetween>
        <FlexBetween>
          <Typography>Impressions of your post</Typography>
          <Typography>{impressions}</Typography>
        </FlexBetween>
        <FlexBetween>
          <Typography>Who's viewed your profile</Typography>
          <Typography>{viewedProfile}</Typography>
        </FlexBetween>
      </Box>

      <Divider />
      {/*Fourth row*/}
      <Box>
        <Typography>Social Profile</Typography>
        <FlexBetween>
          <Typography>Twitter</Typography>
        </FlexBetween>
      </Box>
    </WidgetWrapper>
  );
}
