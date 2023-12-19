import React from 'react';
import NewChatAndHistory from '../../components/NewChatAndHistory';

const Main = () => {
    return (
        <div className='flex'>
            <div className='w-0 lg:w-[400px]'>
                <NewChatAndHistory />
            </div>
            <div className='page'>
                메인 페이지 입니다.
            </div>
        </div>
    );
};

export default Main;