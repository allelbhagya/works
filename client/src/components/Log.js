export default function Log({ time, duration, region, sensorID, profile, measure, comment }) {
    return (
        <tr>
            <td>{time}</td>
            <td>{duration}</td>
            <td>{region}</td>
            <td>{sensorID}</td>
            <td>{profile}</td>
            <td>{measure}</td>
            <td>{comment}</td>
        </tr>
    );
}
