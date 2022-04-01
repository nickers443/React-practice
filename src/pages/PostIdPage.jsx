import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PostService from "../API/PostService";
import Loader from "../components/UI/Loader/Loader";
import { useFetching } from "../hooks/useFetching";

export default function PostIdPage() {
  const params = useParams();
  const [post, setPost] = useState({});
  const [comments, setComments] =useState([])
  const [fetchPostById, isLoading, error] = useFetching(async (id) => {
    const response = await PostService.getById(id);
    setPost(response.data)
  });
  const [fetchComments, isComLoading, comError] = useFetching(async (id) => {
    const response = await PostService.getCommentsByPostId(id);
    setComments(response.data)
  });
  useEffect(() => {
    fetchPostById(params.id)
    fetchComments(params.id)
  }, []);

  return (
    <div>
      <h1>Вы зашли на страницу поста с ID = {params.id}</h1>
      {isLoading
        ? <Loader />
        : <div>{post.id}. {post.title}</div>
      }
      <h1>Комментарии</h1>
      {isComLoading
        ? <Loader />
        : <div>
            {comments.map(comment => 
              <div key={comment.id} style={{marginTop: 10}}>
                <h5>{comment.email}</h5>
                <div>{comment.body}</div>
              </div>
            )}
          </div>
      }
    </div>
  );
}
