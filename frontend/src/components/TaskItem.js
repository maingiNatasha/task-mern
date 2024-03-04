import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteTask } from '../features/tasks/taskSlice';
import { useNavigate } from 'react-router-dom';
import { FaEdit } from "react-icons/fa";
import { MdDeleteSweep } from "react-icons/md";
import { toast } from 'react-toastify';

const TaskItem = ({ task }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleDelete = async() => {
        try {
            await dispatch(deleteTask(task._id));
            toast.success('Task deleted');
        }
        catch (error) {
            toast.error(error.message);
        }
    }

    return (
        <div className='task'>
            <div>
                {new Date(task.createdAt).toLocaleString('en-US')}
            </div>
            <h2>{task.text}</h2>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <button style={{ backgroundColor: '#f0ffff', border: 'none' }} onClick={handleDelete}>
                    <MdDeleteSweep size={25} />
                </button>
                <button style={{ backgroundColor: '#f0ffff', border: 'none' }} onClick={() => navigate(`/editTask/${task._id}`)}>
                    <FaEdit size={25} />
                </button>
            </div>
        </div>
    )
}

export default TaskItem