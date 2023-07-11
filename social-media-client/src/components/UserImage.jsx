import { Box } from "@mui/material";

export default function UserImage({ image, size = "60px" }) {
  return (
    <Box width={size} height={size}>
      <img
        width="50px"
        height="50px"
        style={{ objectFit: "cover", borderRadius: "50%" }}
        alt="user-image"
        src={`http://localhost:3000/assets/${image}`}
        crossOrigin="anonymous"
      />
    </Box>
  );
}
