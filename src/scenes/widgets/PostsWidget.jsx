import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import PostWidget from "./PostWidget";

const PostsWidget = ({ userId, isProfile = false }) => {
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.posts);
    const token = useSelector((state) => state.token);

    const getPosts = async () => {
        const response = await fetch(`https://socialnetwork-be-pe8p.onrender.com/posts`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        dispatch(setPosts({ posts: data }));
    };

    const getUserPosts = async () => {
        const response = await fetch(`https://socialnetwork-be-pe8p.onrender.com/posts/${userId}/posts`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        dispatch(setPosts({ posts: data }));
    };

    useEffect(() => {
        if (isProfile) {
            getUserPosts();
        } else {
            getPosts();
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
                    imagePath,
                    userImagePath,
                    likes,
                    comments
                }) => (
                    <PostWidget
                        key={_id}
                        postId={_id}
                        postUserId={userId}
                        name={`${firstName} ${lastName}`}
                        description={description}
                        location={location}
                        imagePath={imagePath}
                        userImagePath={userImagePath}
                        likes={likes}
                        comments={comments}
                    />
                )
            )}
        </>
    )
};

export default PostsWidget;