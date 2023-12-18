import style from "./style.css";
import React, {useEffect, useRef, useState} from "react";

const Sidebar = (props) => {
    return (
    <div>
        <div ref={props.side} className={`${props.isOpen === true? 'drop-shadow-[25px_25px_100px_var(--color-primary-500)]' :'drop-shadow-none'} sidebar`} style={{ width: `${props.width}px`, height: '100%',  transform: `translatex(${-props.xPosition}px)`}}>
            <div className="content">
                <div>hi</div>
                <div>hi</div>
            </div>
        </div>
    </div>
    );
};

export default Sidebar;