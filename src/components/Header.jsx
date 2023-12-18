import { useEffect, useState } from "react";

function Header(props) {
    const [isScroll, setIsScroll] = useState(0);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, []);

    const handleScroll = () => {
        const scrollPosition = window.pageYOffset;
        if (scrollPosition === 0) {
            setIsScroll(0);
        } else {
            setIsScroll(1);
        }
    };

    return (
        <div className={`${isScroll === 1 ? 'top-0 z-50 sticky' : ''} w-full flex justify-center mb-2`}>
            <div className="w-[90%] flex justify-between items-center py-2">
                <div className="flex items-center gap-[1em]">
                    <a href={process.env.PUBLIC_URL + "/"} className="flex items-center gap-2 mr-5">
                        <img className="w-10 h-10" src={process.env.PUBLIC_URL + '/logo192.png'} />
                        <h1 className="text-xl">문해력</h1>
                    </a>
                    <a href="#" className={``}>메뉴1</a>
                    <a href="#" className={``} >메뉴2</a>
                    <a href="#" className={``} >메뉴3</a>
                </div>
                <div>
                    <a href={process.env.PUBLIC_URL+'/login'} className={``}>로그인</a>
                </div>
            </div>
        </div>
    );
}

export default Header;