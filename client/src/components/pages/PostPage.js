import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { formatISO9075 } from 'date-fns';
import '../../App.css';

export default function PostPage() {
  const [postInfo, setPostInfo] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:4000/post/${id}`).then((response) => {
      response.json().then((postInfo) => {
        setPostInfo(postInfo);
      });
    });
    // eslint-disable-next-line
  }, []);
  if (!postInfo) return '';

  return (
    <div className="post-page">
      <h1>{postInfo.title}</h1>
      <time>{formatISO9075(new Date(postInfo.createdAt))}</time>
      <div className="author">
        by @{postInfo.author.username}
      </div>
        <div className="image">
            <img src={`http://localhost:4000/${postInfo.cover}`} alt="" />
        </div>
        <div dangerouslySetInnerHTML={{__html: postInfo.content}} /> 
        {/*!👆if you want to print html from a string, you need to set a self closing div tag and you need to set dangerouslySetInnerHTML to an object that includes __html to be the string that you want to print */}
    </div>
  )
}
