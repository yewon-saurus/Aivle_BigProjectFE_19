import style from "./style.css";
import React, {useEffect, useRef, useState} from "react";
import { IoMdLogOut } from "react-icons/io";

const Sidebar = (props) => {
    return (
    <div>
        <div ref={props.side} className={`${props.isOpen === true? 'drop-shadow-[25px_25px_100px_var(--color-primary-500)]' :'drop-shadow-none'} sidebar`} style={{ width: `${props.width}px`, height: '100%',  transform: `translatex(${-props.xPosition}px)`}}>
            <div className="content">
                <div className="lg:hidden">
                    {
                        props.isLogin ?
                        <table className="w-[100%] text-right">
                            <tr>
                                <td></td>
                                <td><a href="#" className="" onClick="">로그아웃</a><br /></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td><a href="" className="" >--위</a><br /></td>
                            </tr>
                            <tr>
                                <td><a href="" className="" >찬스 --개</a></td>
                                <td><a href="" className="" >포인트 --점</a></td>
                            </tr>
                        </table>
                        :
                        <div>
                            <a href={process.env.PUBLIC_URL+'/login'} className={``}>로그인</a>
                        </div>
                    }
                </div>
                <div>
                    <div>hi</div>
                    <div>hi</div>
                </div>
            </div>
        </div>
    </div>
    );
};

export default Sidebar;