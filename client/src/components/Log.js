export default function Log({ time, duration, region, sensorID, profile, measure, comment, stoppage }) {
    return (
        <tr>
            <td>{time}</td>
            <td>{duration}</td>
            <td>{region}</td>
            <td>{sensorID}</td>
            <td>{profile}</td>
            <td>{stoppage}</td>
            <td>{measure}</td>
            <td>{comment}</td>

        </tr>
    );
}
