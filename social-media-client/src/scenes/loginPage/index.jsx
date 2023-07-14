import { useTheme } from "@emotion/react";
import { Box, Typography, useMediaQuery } from "@mui/material";
import Form from "./Form";

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
      </Box>
    </Box>
  );
};

export default LoginPage;
