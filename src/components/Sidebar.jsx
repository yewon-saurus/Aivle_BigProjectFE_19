import style from "./style.css";
import React, {useEffect, useRef, useState} from "react";
import NewChatAndHistory from "./NewChatAndHistory";

import { IoMdLogOut } from "react-icons/io";
import { FaRankingStar } from "react-icons/fa6";

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
                                <td colspan="2">
                                    <a href="#" onClick="" className="flex justify-end hover:text-[var(--color-warning-600)]">
                                        <IoMdLogOut size={25} />
                                        <span>&nbsp;&nbsp;로그아웃</span>
                                    </a>
                                </td>
                            </tr>
                            <tr>
                                <td colspan="2">
                                    <a href="" className="flex justify-end hover:text-[var(--color-primary-600)]">
                                        <FaRankingStar size={25} />
                                        <span>&nbsp;&nbsp;--위</span>
                                    </a>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <a href="" className="flex justify-end hover:text-[var(--color-primary-600)]" >
                                        {/* <FaRegLightbulb size={25} /> */}
                                        <span>&nbsp;&nbsp;찬스 --개</span>
                                    </a>
                                </td>
                                <td>
                                    <a href="" className="flex justify-end hover:text-[var(--color-primary-600)]" >
                                        {/* <FaCoins size={25} /> */}
                                        <span>&nbsp;&nbsp;포인트 --점</span>
                                    </a>
                                </td>
                            </tr>
                        </table>
                        :
                        <div>
                            <a href={process.env.PUBLIC_URL+'/login'} className={``}>로그인</a>
                        </div>
                    }
                </div>
                <div>
                    <NewChatAndHistory />
                </div>
            </div>
        </div>
    </div>
    );
};

export default Sidebar;