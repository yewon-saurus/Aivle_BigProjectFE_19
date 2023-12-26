import React, { useState, useRef } from 'react';

const MessageItem = ({ message, step, setStep }) => {
    const [imgFile, setImageFile] = useState("");

    const imgRef = useRef();

    const handleSaveImgFile = () => {
        const file = imgRef.current.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setImageFile(reader.result);
        };
        // console.log(file);
        // TODO: 이미지 파일도 불러올 수 있도록, 서버에 이미지 파일 전송 및 저장되도록 처리하면 더 아름다울 것 같다.
    };
    
    const handleSubmitImgFile = () => {
        setStep(4);
        // TODO: OCR 모듈 request, response에 따라 재시도 하도록 유도하거나 통과 처리 할 수 있도록 조치할 것
    }

    if (message.mode === 'handwriting') {
        return (
            <form>
                <label className='' htmlFor='handwriting'>(모든 타입의 이미지 파일이 허용됩니다.)</label>
                { imgFile && <img src={imgFile} alt='handwriting image' /> }
                <input
                    className=''
                    type='file'
                    accept='image/*'
                    id='handwriting'
                    onChange={handleSaveImgFile}
                    ref={imgRef}
                />
                { imgFile && step === 3 && <button className='text-sm mt-2 w-[100%] p-2 bg-[var(--color-primary-500)] text-white rounded-full' type='button' onClick={handleSubmitImgFile}>제출하기</button>}
            </form>
        );
    }
    else if (message.mode === 'reading') console.log('call reading module');
    else if (message.mode === 'writing') console.log('call writing module');
    else {
        // mode === undefined
        return message.text;
    }
}

export default MessageItem;