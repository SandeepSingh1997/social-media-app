import { useTheme } from "@emotion/react";
import { Box, Typography, useMediaQuery } from "@mui/material";
import Form from "./Form";

const LoginPage = () => {
  const theme = useTheme();
  const isNonMobileScreen = useMediaQuery("(min-width: 1000px");

  return (
    <Box backgroundColor={theme.palette.background.alt}>
      <Box width="100%" textAlign="center">
        <Typography fontSize="bold">Sociopedia</Typography>
      </Box>
      <Box
        width={isNonMobileScreen ? "50%" : "90%"}
        backgroundColor={theme.palette.background.alt}
      >
        <Typography>Welcome to Sociopedia</Typography>
        <Form />
      </Box>
    </Box>
  );
};

export default LoginPage;
