import { Box } from "@mui/material";

export default function UserImage({ image, size = "60px" }) {
  return (
    <Box width={size} height={size}>
      <img
        style={{ objectFit: "cover", borderRadius: "50%" }}
        alt="user-image"
        src={`http://localhost:3000/assets/${image}`}
      />
    </Box>
  );
}
