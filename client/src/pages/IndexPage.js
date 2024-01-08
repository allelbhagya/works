import { useEffect, useState } from "react";
import Post from "../Post";

export default function IndexPage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:4000/post');
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div>
      <h3>data for logs here</h3>
          <>
        <tr className="post-header">
        <th className="cell">Region</th>
        <th className="cell">Created by</th>
        <th className="cell">Time</th>
        <th className="cell">SensorID</th>
    </tr>
    
      {posts.length > 0 && posts.map(post => (
        <Post key={post._id} {...post} />
      ))}
    </>
    </div>

  );
}
