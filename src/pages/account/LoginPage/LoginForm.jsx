import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function LoginForm({setIsLogin}) {

    const [Id, setId] = useState("")
    const [Password, setPassword] = useState("")

    const nav = useNavigate();

    const onIdHandler = (e) => {
        setId(e.currentTarget.value)
    }

    const onPasswordHandler = (e) => {
        setPassword(e.currentTarget.value)
    }

    const onSubmitHandler = (e) => {
        e.preventDefault()

        const url = "http://127.0.0.1:8000/accounts/login/";
        const req = {
            'username': Id,
            'password': Password,
        };
        const config = {"Content-Type": 'application/json'};

        axios.post(url, req, config)
            .then(res => {
                console.log("Login success");
                sessionStorage.setItem('aivle19_username', req.username);
                sessionStorage.setItem('aivle19_token', res.data.token);
                setIsLogin(true);
                nav('/');
            }).catch(err => {
                // 에러 처리
                console.log(err.response.data.message);
                alert("아이디 또는 비밀번호를 확인해 주세요.")
            });
      };

    return (
        <div style={{ 
            flexBasis: '50%', alignItems: 'center', justifyContent: 'center', 
            display:'flex', flexDirection:'column' }}>
            
            <h3 className="font-semibold">환영합니다!</h3>
            <h3 className="font-semibold">귀하의 계정에 로그인하십시오</h3>
            
            <form style={{ display:'flex', flexDirection:'column' }} className="w-full max-w-sm font-semibold">
              <div className="w-full px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for='grid-id'>
                아이디
                </label>
                <input value={Id} onChange={onIdHandler} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-id" type="text" placeholder="Your ID" />

              </div>
                <div className="w-full px-3">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                  비밀번호
                  </label>
                  <input value={Password} onChange={onPasswordHandler} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="password" placeholder="******************" />
                </div>
                <br />
              <button onClick={onSubmitHandler} className='py-2 px-3 rounded-md text-white font-semibold bg-indigo-600 border border-indigo-600 hover:text-indigo-600 hover:bg-white' >
                    로그인
                </button>
                {/* {error && <div style={{ color: 'red' }}>{error}</div>} */}
  
            </form>
            <span style={{color:'grey'}}>아직 계정이 없으신가요?</span>
            <a href='/signup' className='text-sm "text-blue-600 visited:text-purple-600 ..."'>회원가입</a>
        </div>
    )
}

export default LoginForm