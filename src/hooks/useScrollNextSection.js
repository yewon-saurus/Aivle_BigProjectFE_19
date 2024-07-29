import { useEffect } from "react";

export default function useScrollNextSection() {
    useEffect(() => {
        const elm = document.querySelectorAll('.section');
        const elmCount = elm.length;

        const handleWheel = (event) => {
            event.preventDefault();

            var delta = 0;

            if (event.wheelDelta) {
                delta = event.wheelDelta / 120;
                if (window.opera) delta = -delta;
            } else if (event.detail) {
                delta = -event.detail / 3;
            }

            var moveTop = window.scrollY;
            var elmSelector = elm[Math.round(moveTop / window.innerHeight)];

            // 휠을 아래로 돌릴 때: 다음 섹션으로 이동
            if (delta < 0) {
                if (elmSelector !== elmCount - 1) {
                    try {
                        moveTop = window.pageYOffset + elmSelector.nextElementSibling.getBoundingClientRect().top;
                    } catch (e) { }
                }
            }
            // 휠을 위로 돌릴 때: 이전 섹션으로 이동
            else {
                if (elmSelector !== 0) {
                    try {
                        moveTop = window.pageYOffset + elmSelector.previousElementSibling.getBoundingClientRect().top;
                    } catch (e) { }
                }
            }

            window.scrollTo({ top: moveTop, left: 0, behavior: 'smooth' });
        };

        // 문서에 wheel 이벤트 리스너를 추가
        document.addEventListener('wheel', handleWheel);

        // 컴포넌트가 언마운트될 때 이벤트 리스너를 제거
        return () => {
            document.removeEventListener('wheel', handleWheel);
        };
    }, []);
}