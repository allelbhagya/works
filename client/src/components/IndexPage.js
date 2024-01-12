import { useEffect, useState } from "react";
import Log from "./Log";

export default function IndexPage() {
  const [logs, setLogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

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

  const filteredLogs = logs.filter(log =>
    Object.values(log).some(value =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="log">
      <div>
        <>
          <h4>Search for a log</h4>
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </>
      </div>
      <table>
        <thead>
          <tr>
            <th>Time</th>
            <th>Duration</th>
            <th className="region-head">Region</th>
            <th>Sensor ID</th>
            <th>Profile</th>
            <th>Stoppage</th>
            <th>Measure</th>
            <th>Comment</th>
          </tr>
        </thead>
        <tbody>
          {filteredLogs.length > 0 ? (
            filteredLogs.map(log => (
              <Log key={log._id} {...log} />
            ))
          ) : (
            <tr>
              <td colSpan="7">No matching logs found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
