import style from "./style.css";
import Sidebar from "./Sidebar";
import { useEffect, useState, useRef } from "react";

import { LuMenu } from "react-icons/lu";
import { IoMdLogOut } from "react-icons/io";
import { FaRankingStar } from "react-icons/fa6";

function Header(props) {
    const SIDEBAR_WIDTH = 360;

    const [isOpen, setOpen] = useState(false);
    const [xPosition, setX] = useState(SIDEBAR_WIDTH);
    
    // button 클릭 시 토글
    const toggleMenu = () => {
        if (xPosition > 0) {
            setX(0);
            setOpen(true);
        } else {
            setX(SIDEBAR_WIDTH);
            setOpen(false);
        }
    };

    return (
        <div className={`w-full flex justify-center bg-white z-50 top-0 fixed`}>
            <div className="w-[100%] flex justify-between items-center px-4 py-2">
                <div className="flex items-center gap-[1em]">
                    <div className="lg:hidden">
                        <div className="flex">
                            <button onClick={() => toggleMenu()} >
                                <LuMenu size={30} color="var(--color-primary-600)" />
                            </button>
                        </div>
                        <Sidebar width={SIDEBAR_WIDTH} isLogin={props.isLogin} isOpen={isOpen} setOpen={setOpen} setX={setX} xPosition={xPosition} />
                    </div>
                    <a href={process.env.PUBLIC_URL + "/"} className="flex items-center gap-2 mr-5">
                        <img className="w-10 h-10" src={process.env.PUBLIC_URL + '/logo192.png'} />
                        <h1 className="text-xl">문해력</h1>
                    </a>
                </div>
                <div className="lg:flex hidden">
                    {
                        props.isLogin ?
                        <div className="flex items-center gap-[2em]">
                            <a href="" className="flex hover:text-[var(--color-primary-600)]" ><FaRankingStar style={{width: '20px', height: 'auto',}} /><span>&nbsp;&nbsp;--위</span></a>
                            <a href="" className="hover:text-[var(--color-primary-600)]" >찬스 --개</a>
                            <a href="" className="hover:text-[var(--color-primary-600)]" >포인트 --점</a> 
                            <a href="#" className="flex hover:text-[var(--color-warning-600)]" onClick=""><IoMdLogOut style={{width: '20px', height: 'auto',}} /><span>&nbsp;&nbsp;로그아웃</span></a>
                        </div>
                        :
                        <div>
                            <a href={process.env.PUBLIC_URL+'/login'} className={``}>로그인</a>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}

export default Header;