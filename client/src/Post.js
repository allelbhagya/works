import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Post({ _id, title, summary, createdAt, author }) {

    return (
        <>

        <tr className="post">
            <td className="cell">
                <Link to={`/post/${_id}`}>
                    {title}
                </Link>
            </td>
            <td className="cell">{author.username}</td>
            <td className="cell">{createdAt}</td>
            <td className="cell summary">{summary}</td>
        </tr>
        </>

    );
}
