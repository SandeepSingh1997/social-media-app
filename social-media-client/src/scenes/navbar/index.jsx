import {
  FormControl,
  IconButton,
  InputBase,
  Box,
  MenuItem,
  Typography,
  Select,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FlexBetween from "../../components/FlexBetween";
import {
  Close,
  DarkMode,
  Help,
  LightMode,
  Menu,
  Message,
  Notifications,
  Search,
} from "@mui/icons-material";
import { setLogout, setMode } from "../../state";
import { useState } from "react";

export default function Navbar() {
  const [isMobileMenuToggledOn, setIsMobileMenuToggledOn] = useState(false);
  const mode = useSelector((state) => state.mode);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user);
  const isNonMobileScreen = useMediaQuery("(min-width:1000px)");

  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  const background = theme.palette.background.default;
  const primaryLight = theme.palette.primary.light;
  const alt = theme.palette.background.alt;

  const fullName = `${user.firstName} ${user.lastName}`;

  return (
    <FlexBetween backgroundColor={alt} height="60px" padding="5px">
      <FlexBetween>
        <Typography
          fontWeight="bold"
          fontSize="1.5rem"
          onClick={() => navigate("/home")}
          sx={{
            transition: "color 0.15s ",
            "&:hover": {
              color: neutralLight,
              cursor: "pointer",
            },
          }}
        >
          Sociopedia
        </Typography>

        {isNonMobileScreen && (
          <FlexBetween
            backgroundColor={neutralLight}
            margin="0px 10px 0px 20px"
          >
            <InputBase
              placeholder="Search..."
              sx={{
                borderRadius: "10px",
                padding: "0px 10px",
                width: "200px",
              }}
            />
            <IconButton>
              <Search />
            </IconButton>
          </FlexBetween>
        )}
      </FlexBetween>
      {/*Desktop nav*/}
      {isNonMobileScreen ? (
        <FlexBetween gap="30px">
          <IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode === "dark" ? <DarkMode /> : <LightMode />}
          </IconButton>
          <Message />
          <Notifications />
          <Help />
          <FormControl>
            <Select value={fullName} input={<InputBase />}>
              <MenuItem>{fullName}</MenuItem>
              <MenuItem onClick={() => dispatch(setLogout())}>Logout</MenuItem>
            </Select>
          </FormControl>
        </FlexBetween>
      ) : (
        <IconButton
          onClick={() => setIsMobileMenuToggledOn(!isMobileMenuToggledOn)}
        >
          <Menu />
        </IconButton>
      )}

      {/*Mobile nav*/}
      {!isNonMobileScreen && isMobileMenuToggledOn && (
        <Box backgroundColor={background} position="relative" top="100px">
          <Box display="flex">
            <IconButton
              onClick={() => setIsMobileMenuToggledOn(!isMobileMenuToggledOn)}
            >
              <Close />
            </IconButton>
          </Box>
          {/*Mobile menu items*/}
          <FlexBetween flexDirection="column" gap="10px">
            <IconButton onClick={() => dispatch(setMode())}>
              {theme.palette.mode === "dark" ? <DarkMode /> : <LightMode />}
            </IconButton>
            <Message />
            <Notifications />
            <Help />
            <FormControl>
              <Select value={fullName} input={<InputBase />}>
                <MenuItem>{fullName}</MenuItem>
                <MenuItem onClick={() => dispatch(setLogout())}>
                  Logout
                </MenuItem>
              </Select>
            </FormControl>
          </FlexBetween>
        </Box>
      )}
    </FlexBetween>
  );
}
