import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../../state";
import { useEffect } from "react";
import PostWidget from "./PostWidget";

export default function PostsWidget({ userId, isProfile = false }) {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);

  const getPosts = async () => {
    const response = await axios.get("http://localhost:3000/posts", {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch(setPosts({ posts: response.data }));
  };

  const getUserPosts = async () => {
    const response = await axios.get(
      `http://localhost:3000/posts/${userId}/posts`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    dispatch(setPosts({ posts: response.data }));
  };

  useEffect(() => {
    if (!isProfile) {
      getUserPosts();
    } else {
      getPosts();
    }
  }, []);
  return (
    <>
      {posts.map(
        ({
          _id,
          userId,
          firstName,
          lastName,
          description,
          location,
          picturePath,
          likes,
          comments,
        }) => (
          <PostWidget
            key={_id}
            postId={_id}
            postUserId={userId}
            name={`${firstName} ${lastName}`}
            description={description}
            location={location}
            picturePath={picturePath}
            userPicturePath={userPicturePath}
            likes={likes}
            comments={comments}
          />
        )
      )}
    </>
  );
}