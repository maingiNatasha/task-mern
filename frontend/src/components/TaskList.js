import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTasks, /*reset*/ } from '../features/tasks/taskSlice';
import TaskItem from './TaskItem';
import Spinner from './Spinner';
import { useNavigate } from 'react-router-dom';

const TaskList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { tasks, isLoading, isError, message } = useSelector(state => state.tasks);
    const { user } = useSelector(state => state.auth);

    useEffect(() => {
        if (!user) navigate('/login');
        if (isError) console.log(message);
        dispatch(getTasks());
        //return () => dispatch(reset());
    }, [isError, message, dispatch, navigate, user])

    return (
        isLoading ? <Spinner /> : (
            <section className='content'>
                <h1 style={{ fontWeight: 'bolder' }}>My Tasks</h1>
                {tasks.length > 0 ? (
                    <div className='tasks'>
                        {tasks.map((task) => <TaskItem key={task._id} task={task} />)}
                    </div>
                ) : (
                    <div>
                        <h2>No tasks have been created yet</h2>
                        <p>
                            To create a new task, click the button below <br />
                        </p>
                        <div style={{ display: 'flex', justifyContent: 'center'}}>
                            <button className='btn' onClick={() => navigate('/')}>Create new Task</button>
                        </div>
                    </div>
                )}
            </section>
        )
    )
}

export default TaskList