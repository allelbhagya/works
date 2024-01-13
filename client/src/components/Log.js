// Log.js
import React from 'react';

const Log = ({ _id, time, duration, region, sensorID, profile, stoppage, measure, comment, onDelete, onEdit }) => {
  return (
    <tr>
      <td>{time}</td>
      <td>{duration}</td>
      <td className="region-head">{region}</td>
      <td>{sensorID}</td> 
      <td>{profile}</td>
      <td>{stoppage}</td>
      <td>{measure}</td>
      <td>{comment}</td>
      <td>
        <div className='log-buttons'>
          <button onClick={() => onEdit(_id)}>Edit</button>
          <button onClick={() => onDelete(_id)}>Delete</button>
        </div>
      </td>
    </tr>
  );
};

export default Log;
