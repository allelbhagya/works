import React from 'react';
import { Link } from 'react-router-dom';

export default function Post({ _id, title, summary, cover, content, createdAt, author }) {
    return (
        <>
            <tr className="post-header">
                <th className="cell">Title</th>
                <th className="cell">Author</th>
                <th className="cell">Created At</th>
                <th className="cell">Summary</th>
            </tr>
            <tr className="post">
                <td className="cell">
                    <Link to={`/post/${_id}`}>
                        <h2>{title}</h2>
                    </Link>
                </td>
                <td className="cell">{author.username}</td>
                <td className="cell">{createdAt}</td>
                <td className="cell summary">{summary}</td>
            </tr>
        </>
    );
}
