import style from "./style.css";
import React, { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Info = () => {
    const nav = useNavigate();

    const mainImgContainerRef = useRef();
    
    window.onload = function() {
        const elm = document.querySelectorAll('.section');
        const elmCount = elm.length;
        elm.forEach(function(item, index) {
          item.addEventListener('mousewheel', function(event){
            event.preventDefault();
            var delta = 0;
  
            if (!event) event = window.event;
            if (event.wheelDelta) {
                delta = event.wheelDelta / 120;
                if (window.opera) delta = -delta;
            } 
            else if (event.detail)
                delta = -event.detail / 3;
  
            var moveTop = window.scrollY;
            var elmSelector = elm[index];
  
            // wheel down : move to next section
            if (delta < 0) {
              if (elmSelector !== elmCount-1) {
                try{
                  moveTop = window.pageYOffset + elmSelector.nextElementSibling.getBoundingClientRect().top;
                } catch (e) { }
              }
            }
            // wheel up : move to previous section
            else {
              if (elmSelector !== 0) {
                try {
                  moveTop = window.pageYOffset + elmSelector.previousElementSibling.getBoundingClientRect().top;
                } catch (e) { }
              }
            }
  
            const body = document.querySelector('html');
            window.scrollTo({top:moveTop, left:0, behavior:'smooth'});
          });
        });
      }

    const handleMouseMove = (e) => {
        var x = e.nativeEvent.offsetX;
        var y = e.nativeEvent.offsetY;
        var rotateY = x >= 300 ? -1/100 * x : 1/100 * x;
        var rotateX = y >= 300 ? 1/100 * y : -1/100 * y;

        if (mainImgContainerRef.current) mainImgContainerRef.current.style = `transform : perspective(350px) rotateX(${rotateX}deg) rotateY(${rotateY}deg);`;
    }

    const handleMouseOut = () => {
        if (mainImgContainerRef.current) mainImgContainerRef.current.style = 'transform : perspective(350px) rotateY(0deg) rotateX(0deg);'
    }

    return (
        <div>
            <div className='section w-full h-[100vh] flex justify-center items-center lg:gap-32 pt-[63px] bg-[var(--color-primary-500)]'>
                <div className="text-white lg:p-0 px-4 py-10">
                    <div className='introduce'>
                        <div className="lg:text-6xl text-4xl">LiQuest,</div>
                        <div className="lg:text-4xl text-2xl lg:mt-4">문해력을 깨우는 모험의 시작!</div>
                        <div className="lg:text-4xl text-2xl lg:mt-4">말하고, 듣고, 쓰기를 경험합니다.</div>
                    </div>
                    <div className='introduce-detail mt-10 lg:w-[600px] w-full text-justify'>
                        <div className="text-xl font-light">문해력이란 <span className="font-semibold">'글을 읽을 수 있는 능력'</span>을 말합니다. 어휘력이 풍부한 사람은 글을 막힘 없이 읽을 수 있지만, 그렇지 않은 사람은 글을 읽고 이해하기에 어려움을 겪습니다.</div>
                        <div className="text-xl font-light mt-4">어떤 어휘가 어떤 문장에서 어떻게 사용되는지, LiQuest와 함께 언어적 경험을 쌓아봅시다.</div>
                    </div>
                    <button className='text-lg mt-10 py-4 bg-[var(--color-primary-700)] hover:bg-[var(--color-primary-900)] w-[200px] hover:w-full transition-all rounded-full' type='button' onClick={() => {nav('/login');}}>시작하기</button>
                </div>
                <div ref={mainImgContainerRef} onMouseMove={handleMouseMove} onMouseOut={handleMouseOut} className='rounded-full transition-all'>
                    <div className='info-graphic lg:w-[600px] lg:h-[600px] md:w-[400px] rounded-full hover:w-[620px] hover:h-[620px] transition-all' />
                    {/* <a className='relative bottom-[4em] text-xs'
                        href="https://kr.freepik.com/free-vector/college-project-concept-illustration_35020245.htm#query=literacy&position=1&from_view=search&track=sph&uuid=a56fde11-07fb-45d7-bc27-b79b331cc0c1">출처 Freepik 작가 storyset</a> */}
                </div>
            </div>
            <div className='section w-full h-[100vh] lg:flex justify-center items-center lg:gap-10 bg-[var(--color-primary-400)]'>
                <div>단어 퀴즈</div>
                <div>단어 연습장(쓰기/읽기)</div>
                <div>작문 연습</div>
            </div>
        </div>
    );
};

export default Info;