import { useTheme } from "@emotion/react";
import WidgetWrapper from "../../components/WidgetWrapper";
import FlexBetween from "../../components/FlexBetween";
import { Typography } from "@mui/material";

export default function AdvertWidget() {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  return (
    <WidgetWrapper>
      <FlexBetween>
        <Typography>Sponsored</Typography>
        <Typography>Create Ad</Typography>
      </FlexBetween>
      <img width="100%" height="auto" alt="advert" src="" />
      <FlexBetween>
        <Typography>Cosmetics</Typography>
        <Typography>Cosmetics.com</Typography>
      </FlexBetween>
      <Typography>
        Lorem ipsum dolor sit amet consectetur, perferendis delectus sequi amet
        voluptate soluta! quos porro, quo quod cumque eveniet ipsum.
      </Typography>
    </WidgetWrapper>
  );
}
