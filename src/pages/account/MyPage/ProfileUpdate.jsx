import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Sidebar2 from '../../../components/SideBar2'

function ProfileUpdate() {
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

    const nav = useNavigate();
    const [Image, setImage] = useState(null);
    const [fileName, setFileName] = useState('')
    const [About, setAbout] = useState(userData !== null ? userData.profile.introduction : '');
    const [AboutInitial, setAboutInitial] = useState(true);

    const onImageHandler = (e) => {
        const Image = e.currentTarget.files[0]
        const imageUrl = URL.createObjectURL(Image);
        setImage(imageUrl);

        const file = e.currentTarget.files[0];
        setFileName(file.name);
        setImage(file);
    };

    const onAboutHandler = (e) => {
        setAbout(e.currentTarget.value);
        setAboutInitial(false);
    };

    const onSubmitHandler = (e) => {
        e.preventDefault()
        
        const url = "http://127.0.0.1:8000/accounts/profile/update/";
        const formData = new FormData();
        formData.append('introduction', AboutInitial ? userData?.profile.introduction : About);
        formData.append('image', Image === null ? userData?.profile.image : Image);

        axios
            .put(url, formData, {
                headers: {
                    "Authorization": `Token ${token}`,
                    "Content-Type": "multipart/form-data"
                }
            }) // 파일을 업로드할 엔드포인트 URL을 입력합니다.
            .then((response) => {
                console.log('파일 업로드 성공:', response.data);
                nav('/profile')
            })
            .catch((error) => {
                console.error('파일 업로드 실패:', error);
            });

        }


  return (
    <div>
        <Sidebar2 />
        <div style={{padding:'63px', marginLeft:'256px'}}>
            <form encType='multipart/form-data'>
                <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12"></div>
                    <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">프로필 수정</h2>
                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="col-span-full">
                        <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                            소개
                        </label>
                        <div className="mt-2">
                            <textarea
                            id="about"
                            name="about"
                            rows={3}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            value={(AboutInitial && userData !== null) ? userData.profile.introduction : About}
                            onChange={onAboutHandler}
                            />
                        </div>
                        <p className="mt-3 text-sm leading-6 text-gray-600">Write a few sentences about yourself.</p>
                        </div>


                        <div className="col-span-full">
                        <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
                            프로필 사진
                        </label>
                        <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                            <div className="text-center">
                            <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                <label
                                htmlFor="file-upload"
                                className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                >
                                <span>Upload a file</span>
                                <input onChange={onImageHandler} accept='image/*' id="file-upload" name="file-upload" type="file" className="sr-only" />
                                </label>
                                <p className="pl-1">or drag and drop</p>
                            </div>
                            <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                            </div>
                        </div>
                        </div>
                    </div>
                    <label htmlFor="file-upload" className="text-sm leading-6 text-gray-600">
                        {fileName ? fileName : ""}
                    </label>
                    </div>
                    </div>

                <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button onClick={() => nav('/profile')} type="button" className="text-sm font-semibold leading-6 text-gray-900">
                        취소
                    </button>
                    <button
                    onClick={onSubmitHandler}
                    type="submit"
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        저장
                    </button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default ProfileUpdate