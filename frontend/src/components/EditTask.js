import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateTask } from '../features/tasks/taskSlice';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';


const EditTask = () => {
    const { id } = useParams();
    const { user } = useSelector(state => state.auth);
    const { tasks, isLoading, message } = useSelector(state => state.tasks);
    const task = tasks?.find(task => task._id === id);
    const [text, setText] = useState('');
    console.log(task);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (!user) navigate('/login');
        if (task) setText(task.text);
    }, [task, user, navigate])

    const onChange = e => {
        setText(e.target.value);
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            await dispatch(updateTask({ id: task._id, taskData: { text } }));
            toast.success('Task updated successfully');
            navigate('/allTasks');
        }
        catch (error) {
            toast.error(message);
        }
    }


    return (
        <div>
            <div>
                <span>Created At: </span><span>{new Date(task?.createdAt).toLocaleString('en-US')}</span><br />
                <span>Last Updated: </span><span>{new Date(task?.updatedAt).toLocaleString('en-US')}</span><br />
            </div>
            <section className='form' style={{ paddingVertical: '16px' }}>
                <form onSubmit={onSubmit}>
                    <div className='form-group'>
                        <label htmlFor='text' style={{ fontWeight: 'bolder' }}>Task</label>
                        <input type='text' id='text' value={text} onChange={onChange} />
                    </div>
                    <div className='form-group'>
                        <button className='btn btn-block' type='submit'>
                            {isLoading ? 'Updating...' : 'Update Task'}
                        </button>
                    </div>
                </form>
            </section>
        </div>
    )
}

export default EditTask