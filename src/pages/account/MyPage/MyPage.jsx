import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar2 from '../../../components/SideBar2';

function MyPage() {
    const [userData, setUserData] = useState(null);
    const token = sessionStorage.getItem('aivle19_token')

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/accounts/user/', {
            headers: {
                'Authorization': `Token ${token}`
            }
        })
        .then(response => {
            if(response.data) setUserData(response.data)
        })
        .catch(error => {
            console.error(error);
        });
    }, []);

  return (
    <div className="flex">
      <Sidebar2 />
        <div style={{padding:'63px', marginLeft:'256px'}}>
            <div className="px-4 sm:px-0">
            <h3 className="text-base font-semibold leading-7 text-gray-900">Introduction</h3>
            <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Hello. My name is zunza</p>
        </div>
        <div className="px-4 sm:px-0">
            <h3 className="text-base font-semibold leading-7 text-gray-900">Level</h3>
            <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
            {userData !== null ? userData.user_level : 'Loading...'}
            </p>
        </div>
        <div className="mt-6 border-t border-gray-100">
            <dl className="divide-y divide-gray-100">
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">Full name</dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {userData !== null ? userData.last_name + userData.first_name : 'Loading...'}
                </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">User ID</dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {userData !== null ? userData.username : 'Loading...'}
                </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">Email address</dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {userData !== null ? userData.email : 'Loading...'}
                </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">Last login</dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {userData !== null ? new Date(userData.last_login).toLocaleString() : 'Loading...'}
                </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">Join date</dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {userData !== null ? new Date(userData.date_joined).toLocaleString() : 'Loading...'}
                </dd>
            </div>
            </dl>
        </div>
        </div>
    </div>
  )
}

export default MyPage