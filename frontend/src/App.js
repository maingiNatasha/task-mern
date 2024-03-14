import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Register from './components/Register';
import Header from './components/Header';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TaskList from './components/TaskList';
import EditTask from './components/EditTask';

function App() {
	return (
		<>
			<Router>
				<div className='container' data-testid="root">
					<Header />
					<Routes>
						<Route path='/' element={<Dashboard />} />
						<Route path='/login' element={<Login />} />
						<Route path='/register' element={<Register />} />
						<Route path='/allTasks' element={<TaskList />} />
						<Route path='/editTask/:id' element={<EditTask />} />
					</Routes>
				</div>
			</Router>
			<ToastContainer />
		</>
	);
}

export default App;
