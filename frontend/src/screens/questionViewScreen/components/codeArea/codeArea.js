import {useState, useEffect} from 'react'
import './styles.css';
import axios from 'axios';


function CodeArea() {

    const [latestStatus, setlatestStatus] = useState('');
    const [textAreaValue, settextAreaValue] = useState(`function solution (x, y, z) {
        let ans = 0;
        return ans;
    }`); //backtick text to string text conversion



    async function handleSubmitCode () {

        try {
        const readyToPost = {function: textAreaValue};
        const res = await axios.post('http://localhost:9000/submitDocker', readyToPost);
        if  ( res.data?.error ) {
            setlatestStatus('error');
        } else {
            setlatestStatus(res.data.passed.toString());
        }
        console.log(res.data);
        } catch {
            console.log('errorSubmittingCode');
        }

    }

    function onChangeCode (event) {
        settextAreaValue(event.target.value);
    }

    return (
        <div className='CAparentDiv'>
            <div className='CBparentDiv' >
                <textarea rows='30' cols='25' className='textArea' value={textAreaValue} onChange={onChangeCode} />
            </div>
            <div className='CAFparentDiv'>
                Latest Status:  <br/>&#187;<br/> {latestStatus}
                <button onClick={handleSubmitCode} className='submitButton'>Submit <br/>Code</button>
            </div>          
        </div>
    )
}

export default CodeArea;