import React from 'react';
import ContactList from '../components/ContactList';
import { useNavigate } from 'react-router-dom';
import './dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className='dashboard-wrapper'>
      <h2 className='dashHead'>DASHBOARD</h2>
      
      <ContactList />

      <div className="center">
        <div className="subBtn">
          <button onClick={handleLogout}> {
            <span> Logout </span>
          }</button>
            </div>
            </div>

    </div>
  );
};

export default Dashboard;