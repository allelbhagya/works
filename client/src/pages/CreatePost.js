import { useState } from 'react';
import ReactQill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {Navigate} from 'react-router-dom';
import Editor from '../Editor';

export default function CreatePost(){
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [files, setFiles] = useState('');
    const [redirect, setRedirect] = useState(false);

    async function createNewPost(ev){
        const data = new FormData();
        data.set('title', title)
        data.set('summary', summary)
        data.set('content', content)
        data.set('file', files[0])
        ev.preventDefault();
        const response = await fetch('http://localhost:4000/post',{
            method: 'POST',
            body: data,
            credentials: 'include',
        })
        if(response.ok){
            setRedirect(true);
        }
        
    }

if(redirect){
    <Navigate to={'/'}/>
}
    return (
<form onSubmit={createNewPost}>
    <h4>Region</h4>
    <input type="title" 
    placeholder={'Region'} 
    value ={title} 
    onChange={ev=> setTitle(ev.target.value)}/>
    <h4>SensorID</h4>
    <input type = "summary" 
    placeholder={'SensorID'}
    value = {summary}
    onChange={ev=> setSummary(ev.target.value)}/>
    <h4>Image Attached</h4>
    <input type = "file"
    onChange={ev=>setFiles(ev.target.files)}/>
    <h4>Precautions taken</h4>
    <Editor value={content} onChange={setContent}/>
    <div className='cobblePostbtn'>
    <button style={{marginTop:'5px'}}>Add log</button>
    </div>


</form>
    )
}

