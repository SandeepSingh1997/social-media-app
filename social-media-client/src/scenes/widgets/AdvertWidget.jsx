import { useTheme } from "@emotion/react";
import WidgetWrapper from "../../components/WidgetWrapper";
import FlexBetween from "../../components/FlexBetween";
import { Typography } from "@mui/material";

export default function AdvertWidget() {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  const advertImagePath =
    "https://www.cosmeticsdesign-europe.com/var/wrbm_gb_food_pharma/storage/images/_aliases/wrbm_large/publications/cosmetics/cosmeticsdesign-europe.com/headlines/formulation-science/novel-herbs-in-natural-cosmetics-promising-across-hair-care-and-skin-care-finds-review/11694629-1-eng-GB/Novel-herbs-in-natural-cosmetics-promising-across-hair-care-and-skin-care-finds-review.jpg";

  return (
    <WidgetWrapper>
      <FlexBetween m="5px 0px">
        <Typography sx={{ fontWeight: "500" }}>Sponsored</Typography>
        <Typography sx={{ cursor: "pointer" }}>Create Ad</Typography>
      </FlexBetween>
      <img
        width="100%"
        height="auto"
        alt="advert"
        src={advertImagePath}
        style={{ borderRadius: "10px", margin: "5px 0px" }}
      />
      <FlexBetween m="5px 0px">
        <Typography>Herbal cosmetics</Typography>
        <Typography
          sx={{
            cursor: "pointer",
            "&:hover": { textDecoration: "underline" },
          }}
        >
          herbalcosmetics.com
        </Typography>
      </FlexBetween>
      <Typography>
        Lorem ipsum dolor sit amet consectetur, perferendis delectus sequi amet
        voluptate soluta! quos porro, quo quod cumque eveniet ipsum.
      </Typography>
    </WidgetWrapper>
  );
}
