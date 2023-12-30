import React, { useState, useRef } from 'react';

const MessageItem = ({ message, step, setStep }) => {
    const [imgFile, setImageFile] = useState("");
    const [stream, setStream] = useState();
    const [media, setMedia] = useState();
    const [onRec, setOnRec] = useState(true);
    const [source, setSource] = useState();
    const [analyser, setAnalyser] = useState();
    const [audioUrl, setAudioUrl] = useState();
    const [disabled, setDisabled] = useState(true);

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

    const handleSubmitAudioFile = () => {
        setStep(5);
        // TODO: TTS 모듈 request, response에 따라 재시도 하도록 유도하거나 통과 처리 할 수 있도록 조치할 것
    }

    const onRecAudio = () => {
        setDisabled(true);

        const audioCtx = new (window.AudioContext || window.webkitAudioContext)(); // 음원 정보를 담은 노드를 생성하거나 음원을 실행/디코딩
        const analyser = audioCtx.createScriptProcessor(0, 1, 1); // 자바스크립트를 통해 음원의 진행 상태에 직접 접근
        setAnalyser(analyser);

        function makeSound(stream) {
            // 내 컴퓨터의 마이크나 다른 소스를 통해 발생한 오디오 스트림의 정보를 보여줌
            const source = audioCtx.createMediaStreamSource(stream);
            setSource(source);
            source.connect(analyser);
            analyser.connect(audioCtx.destination);
        }
        
        // 마이크 사용 권한 획득
        navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
            const mediaRecorder = new MediaRecorder(stream);
            mediaRecorder.start();
            setStream(stream);
            setMedia(mediaRecorder);
            makeSound(stream);

            analyser.onaudioprocess = function (e) {
            if (e.playbackTime > 180) {
                // 3분(180초) 지나면 자동으로 음성 저장 및 녹음 중지
                stream.getAudioTracks().forEach(function (track) {
                track.stop();
                });
                mediaRecorder.stop();
                analyser.disconnect(); // 메서드가 호출 된 노드 연결 해제
                audioCtx.createMediaStreamSource(stream).disconnect();

                mediaRecorder.ondataavailable = function (e) {
                    setAudioUrl(e.data);
                    setOnRec(true);
                };
            } else {
                setOnRec(false);
            }
            };
        });
    }

    const offRecAudio = () => {
        media.ondataavailable = function (e) {
            // dataavailable 이벤트로 Blob 데이터에 대한 응답을 받을 수 있음
            setAudioUrl(e.data);
            setOnRec(true);
        };
    
        stream.getAudioTracks().forEach(function (track) {
            // 모든 트랙에서 stop()을 호출해 오디오 스트림을 정지
            track.stop();
        });
    
        media.stop(); // 미디어 캡처 중지
        analyser.disconnect(); // 메서드가 호출 된 노드 연결 해제
        source.disconnect();
        
        if (audioUrl) {
            URL.createObjectURL(audioUrl); // 출력된 링크에서 녹음된 오디오 확인 가능
        }
        setDisabled(false);
        
        // File 생성자를 사용해 파일로 변환
        // const sound = new File([audioUrl], "soundBlob", {
        //     lastModified: new Date().getTime(),
        //     type: "audio",
        // });

        // console.log(sound);
    }

    const audioPLay = () => {
        const audio = new Audio(URL.createObjectURL(audioUrl));
        audio.loop = false;
        audio.volume = 1;
        audio.play();
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
                { imgFile && step === 3 && <button className='text-sm mt-2 w-[100%] p-2 bg-[var(--color-primary-500)] hover:bg-[var(--color-primary-600)] transition-colors text-white rounded-full' type='button' onClick={handleSubmitImgFile}>제출하기</button>}
            </form>
        );
    }
    else if (message.mode === 'reading') {
        return (
            <div>
                <div>'말하기' 버튼을 클릭 한 후, 마이크를 통해 음성을 녹음해 보세요. 녹음된 음성은 '내 녹음 들어보기' 버튼을 클릭해 들어볼 수 있습니다.</div>
                <br></br>
                <div>이미 녹음된 내용이 있는 상태에서 다시 '말하기' 버튼을 클릭하시면, 기존 녹음 내용은 삭제되고 새 녹음이 시작됩니다.</div>
                <br></br>
                <button className='text-sm w-[100%] p-2 border border-[var(--color-primary-500)] rounded-full' onClick={onRec ? onRecAudio : offRecAudio}>{onRec ? '🎤 말하기(녹음 시작)' : '녹음 중지'}</button>
                <button className={`text-sm mt-2 w-[100%] p-2 border border-[var(--color-primary-500)] rounded-full transition-colors ${disabled ? 'bg-gray-200 text-white border-0' : ''}`} onClick={audioPLay} disabled={disabled}>내 녹음 들어보기</button>
                {audioUrl && step === 4 && <button className='text-sm mt-2 w-[100%] p-2 bg-[var(--color-primary-500)] hover:bg-[var(--color-primary-600)] transition-colors text-white rounded-full' type='button' onClick={handleSubmitAudioFile}>제출하기</button>}
            </div>
        );
    }
    else if (message.mode === 'areYouWantToWriting') {
        return (
            <div>
                <div>작문 연습은 작문 능력, 어휘, 문법 및 비판적 사고 능력을 향상시키는 데 도움 되며,</div>
                <br></br>
                <div>효과적인 작문 연습을 하려면 규칙적인 루틴을 설정하고 수행하는 것이 중요합니다.</div>
                {
                    step === 6 && 
                    <div>
                        <button className='text-sm mt-2 w-[100%] p-2 bg-[var(--color-primary-500)] hover:bg-[var(--color-primary-600)] transition-colors text-white rounded-full' onClick={() => {setStep(7);}}>네, 작문하기를 시작합니다.</button>
                        <button className='text-sm mt-2 w-[100%] p-2 bg-[var(--color-primary-500)] hover:bg-[var(--color-primary-600)] transition-colors text-white rounded-full' onClick={() => {setStep(-1);}}>아니오, 오늘은 이만 마치겠습니다.</button>
                    </div>
                }
            </div>
        );
    }
    else if (message.mode === 'writing') console.log('call writing module');
    else {
        // mode === undefined
        return message.text;
    }
}

export default MessageItem;