import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Card, CardHeader, CardBody, Image} from "@nextui-org/react";
import Sidebar2 from '../../../components/SideBar2';

function Profile() {
    const [userData, setUserData] = useState(null);
    const token = sessionStorage.getItem('aivle19_token')

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/accounts/profile/', {
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
    <div>
        <Sidebar2 />
        <div style={{padding:'63px', marginLeft:'256px', marginBottom:'200px'}}>
            <Card className="py-4" style={{ width: '300px', height: '370px' }}>
                <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                    <p className="text-tiny uppercase font-bold">Level.</p>
                    <small className="text-default-500">
                        {userData !== null ? userData.profile.user_level : 'Loading...'}
                    </small>
                    <h4 className="font-bold text-large">
                        {userData !== null ? userData.profile.introduction : 'Loading...'}
                    </h4>
                </CardHeader>
                <CardBody className="overflow-visible py-2">
                    <Image
                    alt="Card background"
                    className="object-cover rounded-xl"
                    src={userData !== null ? userData.profile.image : 'Loading...'}
                    width={270}
                    />
                </CardBody>
            </Card>
        </div>
    </div>
  )
}

export default Profile