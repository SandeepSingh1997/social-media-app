import axios from "axios";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import WidgetWrapper from "../../components/WidgetWrapper";
import Friend from "../../components/Friend";
import { Box, Divider, IconButton, Typography } from "@mui/material";
import FlexBetween from "../../components/FlexBetween";
import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
} from "@mui/icons-material";

export default function PostWidget({
  postId,
  postUserId,
  name,
  description,
  location,
  picturePath,
  userPicturePath,
  likes,
  comments,
}) {
  const [isComments, setIsComments] = useState(false);

  const token = useSelector((state) => state.token);
  const dispatch = useDispatch();

  const loggedInUserId = useSelector((state) => state.user._id);
  const isLiked = Boolean(likes[loggedInUserId]);

  const likeCount = Object.keys(likes).length;

  const patchLike = async () => {
    const res = axios.patch(
      `http://localhost:3000/posts/${postId}/like`,
      JSON.stringify({ userId: loggedInUserId }),
      {
        headers: { Autherization: `Bearer ${token}` },
      }
    );

    ///start here
    const updatedPost = (await res).data;
    dispatch(setPost({ post: updatedPost }));
  };
  return (
    <WidgetWrapper m="10px 0px">
      <Friend
        friendId={postUserId}
        name={name}
        subtitle={location}
        userPicturePath={userPicturePath}
      />
      <Typography m="5px 0px">{description}</Typography>
      {picturePath && (
        <img
          width="100%"
          height="auto"
          alt="post"
          src={`http://localhost:3000/assets/${picturePath}`}
          style={{ margin: "5px 0px", borderRadius: "5px" }}
          crossOrigin="anonymous"
        />
      )}
      <FlexBetween m="5px 0px">
        <FlexBetween>
          <FlexBetween>
            <IconButton onClick={patchLike}>
              {isLiked ? <FavoriteOutlined /> : <FavoriteBorderOutlined />}
            </IconButton>
            <Typography>{likeCount}</Typography>
          </FlexBetween>
          <FlexBetween>
            <IconButton onClick={() => setIsComments(!isComments)}>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography>{comments.length}</Typography>
          </FlexBetween>
        </FlexBetween>
        <IconButton>
          <ShareOutlined />
        </IconButton>
      </FlexBetween>
      {isComments && (
        <Box>
          {comments.map((comment, i) => (
            <Box key={`${name}-${i}`}>
              <Divider />
              <Typography>{comment}</Typography>
            </Box>
          ))}
        </Box>
      )}
    </WidgetWrapper>
  );
}
