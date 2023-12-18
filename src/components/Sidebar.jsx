import style from "./style.css";
import React, {useEffect, useRef, useState} from "react";

const Sidebar = (props) => {
    return (
    <div>
        <div ref={props.side} className="sidebar" style={{ width: `${props.width}px`, height: '100%',  transform: `translatex(${-props.xPosition}px)`}}>
            <div className="content">
                <div>hi</div>
                <div>hi</div>
            </div>
        </div>
    </div>
    );
};

export default Sidebar;