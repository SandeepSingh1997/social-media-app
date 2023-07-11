import { useTheme } from "@emotion/react";
import {
  Box,
  Button,
  Divider,
  InputBase,
  Typography,
  useMediaQuery,
} from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../../state";
import WidgetWrapper from "../../components/WidgetWrapper";
import FlexBetween from "../../components/FlexBetween";
import UserImage from "../../components/UserImage";
import Dropzone from "react-dropzone";
import {
  AttachFileOutlined,
  GifBoxOutlined,
  ImageOutlined,
  MicOutlined,
  MoreHorizOutlined,
} from "@mui/icons-material";

export default function MyPostWidget({ picturePath }) {
  const dispatch = useDispatch();
  const [isImage, setIsImage] = useState(false);
  const [image, setImage] = useState(null);
  const [post, setPost] = useState("");
  const { palette } = useTheme();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const isNonMobileScreen = useMediaQuery("(min-width: 1000px)");
  const mediumMain = palette.neutral.mediumMain;
  const medium = palette.neutral.medium;
  const dark = palette.background.default;

  const handlePost = async () => {
    const formData = new FormData();
    formData.append("userId", _id);
    formData.append("description", post);
    if (image) {
      formData.append("picture", image);
      formData.append("picturePath", image.name);
    }

    const response = await axios.post("http://localhost:3000/posts", formData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const posts = response.data;
    dispatch(setPosts({ posts }));
    setImage(null);
    setPost("");
  };

  return (
    <WidgetWrapper>
      <Box>
        <FlexBetween gap="1rem" m="5px 0px">
          <UserImage image={picturePath} />
          <InputBase
            placeholder="What's on your mind..."
            onChange={(e) => setPost(e.target.value)}
            value={post}
            sx={{
              width: "100%",
              height: "3rem",
              p: "5px 20px",
              borderRadius: "2rem",
              backgroundColor: medium,
              color: dark,
            }}
          />
        </FlexBetween>
        {isImage && (
          <Dropzone onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}>
            {({ getRootProps, getInputProps }) => (
              <Box
                {...getRootProps()}
                width="100%"
                height="50px"
                sx={{ border: "1px dashed aqua", borderRadius: "5px" }}
              >
                <input {...getInputProps()} />
              </Box>
            )}
          </Dropzone>
        )}
      </Box>
      <Divider />
      <FlexBetween m="5px 0px">
        <FlexBetween
          onClick={() => setIsImage(!isImage)}
          sx={{ cursor: "pointer" }}
        >
          <ImageOutlined />
          <Typography>Image</Typography>
        </FlexBetween>
        {isNonMobileScreen ? (
          <>
            <FlexBetween>
              <GifBoxOutlined />
              <Typography>Clip</Typography>
            </FlexBetween>
            <FlexBetween>
              <AttachFileOutlined />
              <Typography>Attachment</Typography>
            </FlexBetween>
            <FlexBetween>
              <MicOutlined />
              <Typography>Audio</Typography>
            </FlexBetween>
          </>
        ) : (
          <FlexBetween>
            <MoreHorizOutlined />
          </FlexBetween>
        )}

        <Button onClick={handlePost}>Post</Button>
      </FlexBetween>
    </WidgetWrapper>
  );
}
