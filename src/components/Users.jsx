import React, {useEffect, useState } from 'react';
import "./Users.css";
import axios from 'axios';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { toast } from 'react-hot-toast';


const Users = ({setLoading}) => {


    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [isDetailVisible, setIsDetailVisible] = useState(false);
    const [isListVisible, setIsListVisible] = useState(false);
    const [isSlideIn, setIsSlideIn] = useState(false);

    useEffect(() => {
      axios
        .get("https://602e7c2c4410730017c50b9d.mockapi.io/users", {
        })
        .then((response) => {
          const fetchedUsers = response.data;
          setUsers(fetchedUsers);
          setLoading(false);
        })
        .catch(() => {
          setUsers([]);
          setLoading(false);
          toast.error("Server Error");
        });
    }, [setLoading]);

    const userHandler = (userId) => {
        const selectedUser = users.find((user) => user.profile.username === userId);
        setSelectedUser(selectedUser);
        setIsDetailVisible(true);
        setIsListVisible(true);
        setIsSlideIn(true);
        setTimeout(() => {
          setIsSlideIn(false);
        }, 0.5 * 1000);
    }

    const detailHandler = () => {
       setIsDetailVisible(false);
       setIsListVisible(false);
    }
    

  return (
        <div className='users-page'>
          <div className={`users-list ${isListVisible ? 'isListVisible' : ''}`}>
           <div className='list-head'>
             <h2>USERS LIST</h2>
           </div>
           <div className='list-body'>
             {users.length > 0 ? (
               users.slice(10).map((user) => (
                 <div key={user.profile.username} onClick={() => userHandler(user.profile.username)}>
                   <img src={user.avatar} alt='profile' />
                   {user.profile.firstName} {user.profile.lastName}
                 </div>
               ))
             ) : (
                <div className='no-data'>NO DATA TO SHOW</div>
              )}
            </div>
          </div>
  
          <div className={`user-details ${isDetailVisible ? 'isDetailVisible' : ''} ${isSlideIn ? 'isSlideIn' : ''}`}>
          <div className='details-head'>
            <h2>USER DETAILS </h2>
            <div className='cancel-detail'><CancelOutlinedIcon onClick={detailHandler} /></div>
          </div>
          <div className='details-body'>
            {selectedUser ? (
              <>
                <img src={selectedUser.avatar} alt='profile' />
                <div className='username'>@{selectedUser.profile.username}</div>
                <div className='bio'>{selectedUser.Bio}</div>
                <div className='fullname-head'>Full Name</div>
                <div className='fullname'>{selectedUser.profile.firstName} {selectedUser.profile.lastName}</div>
                <div className='job-head'>Job Title</div>
                <div className='job'>{selectedUser.jobTitle}</div>
                <div className='email-head'>Email</div>
                <div className='email'>{selectedUser.profile.email}</div>
              </>
            ) : (
              <div className='no-user'>NO USER SELECTED</div>
            )}
          </div>
        </div>
      </div>
  );
}

export default Users;