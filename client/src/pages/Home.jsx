import React, {useState, useEffect} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import '../assets/css/Style.css';

function Home () {
    const navigate = useNavigate();
    const [task, setTask] = useState("");
    const [record, setRecord] = useState([]);

    useEffect(() => {
        getRecord();
    },[])

    const getRecord = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}`);

            setRecord(response.data);
        } catch (error) {
            
        }
    }

    const submit = async (e) => {
        e.preventDefault();

        try {
            await axios.post(`${import.meta.env.VITE_API_URL}`, {task});

            Swal.fire({
                title:'Task Added',
                text:'The task has been added successfully',
                icon:'success'
            }).then((result) => {
                if (result.isConfirmed) {
                    setTask("");
                    getRecord();
                    navigate('/');
                }
            })
        } catch (error) {
            
        }
    }

    const del = async (id) => {
        try {
            await axios.delete(`${import.meta.env.VITE_API_URL}/${id}`);

            Swal.fire({
                title:'Task Deleted',
                text:'The task had been deleted successfully',
                icon:'success'
            }).then((result) => {
                if (result.isConfirmed) {
                    setTask("");
                    getRecord();
                    navigate('/');
                }
            })
        } catch (error) {
            
        }
    }
    return (
        <>
        <br />
        <div style={{display:'flex', justifyContent:'center'}}>
            <div className='div'>
                <form onSubmit={submit}>
                    <div style={{display:'flex'}}>
                        <input type="text" placeholder='Enter a task' value={task} onChange={(e) => setTask(e.target.value)} className='form-control' />
                        <button className='btn btn-primary' style={{marginLeft:15}}>Enter</button>
                    </div>
                </form>
            </div>
        </div>
        <br />
        <div style={{display:'flex', justifyContent:'center'}}>
            <table className='table'>
                <thead>
                    <th style={{textAlign:'center', fontSize:20, height:50, backgroundColor:'black', color:'white'}}>Task</th>
                    <th style={{textAlign:'center', fontSize:20, height:50, backgroundColor:'black', color:'white'}}>Action</th>
                </thead>

                {record.map((rec) => (
                <tbody key={rec.id}>
                    <td style={{textAlign:'center', fontSize:17, height:30}}>{rec.task}</td>
                    <td style={{textAlign:'center', fontSize:17, height:30}}><button className='btn btn-warning'>Edit</button> <button className='btn btn-danger' onClick={() => del(rec.id)}>Delete</button></td>
                </tbody>
                ))}
            </table>
        </div>
        </>
    );
}

export default Home;