import React, { useRef } from 'react';

const InfoItem = ({Icon, title, describe}) => {
    const infoItemContainerRef = useRef();

    const handleMouseMoveInfoItem = (e) => {
        var x = e.nativeEvent.offsetX;
        var y = e.nativeEvent.offsetY;
        var rotateY = -1/9 * x + 12;
        var rotateX = 1/16 * y - 12;

        if (infoItemContainerRef.current) infoItemContainerRef.current.style = `transform : perspective(350px) rotateY(${rotateY}deg) rotateX(${rotateX}deg);`;
    }

    const handleMouseOutInfoItem = () => {
        if (infoItemContainerRef.current) infoItemContainerRef.current.style = 'transform : perspective(350px) rotateY(0deg) rotateX(0deg);'
    }

    return (
        <div ref={infoItemContainerRef} onMouseMove={handleMouseMoveInfoItem} onMouseOut={handleMouseOutInfoItem}
            className="w-[270px] h-[480px] bg-white rounded-2xl text-center px-4 py-8 flex flex-col justify-center items-center ani-pulse hover:animate-none duration-700"
        >
            {Icon}
            <div className="text-2xl font-bold mt-6 mb-2">{title}</div>
            <div className="text-lg whitespace-pre-wrap">{describe}</div>
        </div>
    );
}

export default InfoItem;