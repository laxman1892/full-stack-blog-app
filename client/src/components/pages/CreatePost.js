import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';  
const modules = {
        toolbar: [
            ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
            ['blockquote', 'code-block'],
            ['link', 'image', 'video', 'formula'],
          
            [{ 'header': 1 }, { 'header': 2 }],               // custom button values
            [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }],
            [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
            [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
            [{ 'direction': 'rtl' }],                         // text direction
          
            [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
          
            [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
            [{ 'font': [] }],
            [{ 'align': [] }],
          
            ['clean']                                         // remove formatting button
          ]
    };

export default function CreatePost() {
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const  [content, setContent] = useState('');
    

    return (
        <form className='form' style={{height: '100px'}}>
            <input type="title"  placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
            <input type="summary"  placeholder="Summary" value={summary} onChange={e => setSummary(e.target.value)} />
            <input type="file" />
            <ReactQuill value={content} modules={modules} onChange={newValue => setContent(newValue)} style={{overflowY: 'auto'}} />
            <button style={{marginTop: 5}}>Create Post</button> 
        </form>
    )
}