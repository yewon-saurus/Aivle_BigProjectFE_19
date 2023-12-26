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
      <div className="h-screen fixed bg-light-blue-500 text-black w-64">
        <div className="flex flex-col p-6">
          <MenuIcon className="h-6 w-6 mb-8" />
          <div
            onClick={() => navigateTo('/profile')}
            className={`cursor-pointer mb-2 last:mb-0 ${location.pathname === "/profile" ? "text-green-500" : ""}`}
          >
            프로필
          </div>
          <div
            onClick={() => navigateTo('/info')}
            className={`cursor-pointer mb-2 last:mb-0 ${location.pathname === "/mypage" ? "text-green-500" : ""}`}
          >
            회원 정보
          </div>
          <div
            onClick={() => navigateTo('/edit')}
            className={`cursor-pointer mb-2 last:mb-0 ${location.pathname === "/edit" ? "text-green-500" : ""}`}
          >
            회원 정보 수정
          </div>
        </div>
      </div>
    )
}

export default Sidebar2;