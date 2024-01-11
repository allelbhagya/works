import { useState } from "react"
import { Navigate } from "react-router-dom";

export default function CreateLog(){
    const [times, setTimes] = useState('');
    const [duration, setDuration] = useState('');
    const [region, setRegion] = useState('');
    const [sensorID, setSensorID] = useState('');
    const [stop, setStop] = useState('');
    const [prof, setProf] = useState('');
    const [mea, setMea] = useState('');
    const [comms, setComms] = useState('');
    const [redirect, setRedirect] = useState(false);

    async function createNewLog(ev){
        const data = new FormData();
        data.set('time', times);
        data.set('duration', duration);
        data.set('region', region);
        data.set('sensorID', sensorID);
        data.set('stoppage', stop);
        data.set('profile', prof);
        data.set('comment', comms);
        data.set('measure', mea);


        ev.preventDefault();
        const response = await fetch('http://localhost:4000/log',{
            method:'POST',
            body:data,
        })
        if(response.ok){
            setRedirect(true);
        }

    }
    if(redirect){
        return <Navigate to={'/'}/>
    }

    return(
        <form className="logform" onSubmit={createNewLog}>
            <h2>Report a cobble</h2>
            <label>Report time</label>
            <input
        type="datetime-local"
        value={times}
        onChange={(ev) => setTimes(ev.target.value)}
      />
            <label>
                Duration (in minutes)
            </label>
            <input type="number" 
            value = {duration}
            onChange={ev=>setDuration(ev.target.value)}
            />
            <label>
                Affected Region
            </label>
            <input type="text" 
            placeholder="region"
            value={region}
            onChange={ev=>setRegion(ev.target.value)}/>
            <label>
                SensorID and Tag name
            </label>
            <input type="text" 
            placeholder="sensorID"
            value={sensorID}
            onChange={ev=>setSensorID(ev.target.value)}/>
            <label>
                Stoppage
            </label>
            <input type="text" 
            placeholder="stoppage"
            value={stop}
            onChange={ev=>setStop(ev.target.value)}/>
            <label>
                Profile
            </label>
            <input type="text" 
            placeholder="profile"
            value={prof}
            onChange={ev=>setProf(ev.target.value)}/>
            <label>
                Correctness Measure
            </label>
            <textarea name="" 
            id="" rows="3"
            value={mea}
            onChange={ev=>setMea(ev.target.value)}></textarea>
            <label>
                Comments
            </label>
            <input type="text" 
            placeholder="comment"
            value={comms}
            onChange={ev=>setComms(ev.target.value)}/>
            <button>Submit log</button>
        </form>
    )
}