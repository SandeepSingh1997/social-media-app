import { useTheme } from "@emotion/react";
import { Box, Typography, useMediaQuery } from "@mui/material";
import Form from "./Form";
import CheersImage from "../../assets/cheers.svg";
import { Image } from "@mui/icons-material";

const LoginPage = () => {
  const theme = useTheme();
  return (
    <Box backgroundColor={theme.palette.background.alt}>
      <Box width="100%" textAlign="center">
        <Typography fontSize="x-large" fontWeight="bold" textAlign="center">
          Sociopedia
        </Typography>
      </Box>
      <Box
        width="100%"
        backgroundColor={theme.palette.background.alt}
        display="flex"
        flexDirection="column"
        justifyContent="center"
      >
        <Typography fontWeight="500" fontSize="medium" textAlign="center">
          Welcome to Sociopedia
        </Typography>
        <Form />
        <Box
          margin="5px"
          alignItems="center"
          display="flex"
          flexDirection="column"
        >
          <Typography fontSize="xx-large" fontWeight="bold" color="aqua">
            Make friends and have fun.
          </Typography>

          <Typography fontSize="medium">
            Chat and post your favorite content.
          </Typography>
          <Typography fontSize="medium" color="gray">
            Connect with family and friends.
          </Typography>

          <img src={CheersImage} width="200px" height="200px" />
        </Box>
      </Box>
    </Box>
  );
};

export default LoginPage;
