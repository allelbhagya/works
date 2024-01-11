import { useEffect, useState } from "react";
import Log from "./Log";
export default function IndexPage() {
    const [logs, setLogs] = useState([]);

    useEffect(() => {
        fetch('http://localhost:4000/log')
            .then(response => response.json())
            .then(logs => {
                setLogs(logs);
            })
            .catch(error => {
                console.error('Error fetching logs:', error);
            });
    }, []);

    return (
        <div className="log">
            <div>
                <>
                <h4>Search for a log</h4>
                    <input type="text" placeholder="search"/>
                </></div>
            <table>
                <thead>
                    <tr>
                        <th>Time</th>
                        <th>Duration</th>
                        <th>Region</th>
                        <th>Sensor ID</th>
                        <th>Profile</th>
                        <th>Measure</th>
                        <th>Comment</th>
                    </tr>
                </thead>
                <tbody>
                    {logs.length > 0 && logs.map(log => (
                        <Log key={log._id} {...log} />
                    ))}
                </tbody>
            </table>
        </div>
    );
}
