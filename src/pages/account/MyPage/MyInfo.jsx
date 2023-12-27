import React, { useState, useEffect } from 'react';
import {Card, CardBody} from "@nextui-org/react";
import axios from 'axios';
import Sidebar2 from '../../../components/SideBar2';

function MyInfo() {
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
        <Card style={{ width: '1050px', height: '570px' }} >
            <CardBody>
        <div className="mt-6 border-t border-gray-100">
            <dl className="divide-y divide-gray-100">
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">Full name</dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {userData !== null ? userData.user.last_name + userData.user.first_name : 'Loading...'}
                </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">User ID</dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {userData !== null ? userData.user.username : 'Loading...'}
                </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">Email address</dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {userData !== null ? userData.user.email : 'Loading...'}
                </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">Last login</dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {userData !== null ? new Date(userData.user.last_login).toLocaleString() : 'Loading...'}
                </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">Join date</dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {userData !== null ? new Date(userData.user.date_joined).toLocaleString() : 'Loading...'}
                </dd>
            </div>
            </dl>
        </div>
        </CardBody>
        </Card>
        </div>
    </div>
  )
}

export default MyInfo