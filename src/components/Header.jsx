import style from "./style.css";
import Sidebar from "./Sidebar";
import { useEffect, useState, useRef } from "react";
import { LuMenu } from "react-icons/lu";

function Header(props) {
    const SIDEBAR_WIDTH = 320;

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
        <div className={`w-full flex justify-center mb-2 bg-white z-50 top-0 sticky`}>
            <div className="w-[100%] flex justify-between items-center px-4 py-2">
                <div className="flex items-center gap-[1em]">
                    <div className="pt-[7px]">
                        <button onClick={() => toggleMenu()} >
                            <LuMenu size={30} color="var(--color-primary-600)" />
                        </button>
                        <Sidebar width={SIDEBAR_WIDTH} isOpen={isOpen} setOpen={setOpen} setX={setX} xPosition={xPosition} />
                    </div>
                    <a href={process.env.PUBLIC_URL + "/"} className="flex items-center gap-2 mr-5">
                        <img className="w-10 h-10" src={process.env.PUBLIC_URL + '/logo192.png'} />
                        <h1 className="text-xl">문해력</h1>
                    </a>
                </div>
                {
                    props.isLogin ?
                    <div className="flex items-center gap-[2em]">
                        <a href="" className="" >--위</a>
                        <a href="" className="" >초기화 찬스 --개</a>
                        <a href="" className="" >포인트 --점</a>
                        <a href="#" className="" onClick="">로그아웃</a>
                    </div>
                    :
                    <div>
                        <a href={process.env.PUBLIC_URL+'/login'} className={``}>로그인</a>
                    </div>
                }
            </div>
        </div>
    );
}

export default Header;