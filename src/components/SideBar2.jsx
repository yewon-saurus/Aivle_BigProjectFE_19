import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { MenuIcon } from '@heroicons/react/solid';

function Sidebar2() {
    const navigate = useNavigate();
    const location = useLocation();
  
    const navigateTo = (path) => {
      navigate(path);
    }
  
    return (
      <div className="h-screen fixed bg-blue-500 bg-opacity-50 text-white w-64 shadow-2xl">
        <div className="flex flex-col p-8">
          <MenuIcon className="h-6 w-6 mb-8" />
          <div className="flex flex-col p-9 mb-6">
          <div
            onClick={() => navigateTo('/profile')}
            className={`cursor-pointer mb-2 last:mb-0 text-lg font-bold ${location.pathname === "/profile" ? "text-gray-500" : ""}`}
          >
            프로필
          </div>
          <div
            onClick={() => navigateTo('/myinfo')}
            className={`cursor-pointer mb-2 last:mb-0 text-lg font-bold ${location.pathname === "/myinfo" ? "text-gray-500" : ""}`}
          >
            회원 정보
          </div>
          <div
            onClick={() => navigateTo('/infoUpdate')}
            className={`cursor-pointer mb-2 last:mb-0 text-lg font-bold ${location.pathname === "/infoUpdate" ? "text-gray-500" : ""}`}
          >
            회원 정보 수정
          </div>
          <div
            onClick={() => navigateTo('/profileUpdate')}
            className={`cursor-pointer mb-2 last:mb-0 text-lg font-bold ${location.pathname === "/profileUpdate" ? "text-gray-500" : ""}`}
          >
            프로필 수정
          </div>
        </div>
      </div>
      </div>
    )
}

export default Sidebar2;