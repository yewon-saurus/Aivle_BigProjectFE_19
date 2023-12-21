import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

function SignupForm() {

    const [LastName, setLastName] = useState("")
    const [FirstName, setFirstName] = useState("")
    const [Email, setEmail] = useState("")
    const [Id, setId] = useState("")
    const [Password, setPassword] = useState("")
    const [CheckPassword, setCheckPassword] = useState("")
    const [passwordsMatch, setPasswordsMatch] = useState(true);
    const nav = useNavigate();
    const [error, setError] = useState("")

    const onFirstNameHandler = (e) => {
        setFirstName(e.currentTarget.value)
    }

    const onLastNameHandler = (e) => {
        setLastName(e.currentTarget.value)
    }

    const onEmailHandler = (e) => {
        setEmail(e.currentTarget.value)
    }

    const onIdHandler = (e) => {
        setId(e.currentTarget.value)
    }

    const onPasswordHandler = (e) => {
        setPassword(e.currentTarget.value)

        setPasswordsMatch(e.target.value === CheckPassword);
    }

    const onCheckPasswordHandler = (e) => {
        setCheckPassword(e.currentTarget.value);
        // 비밀번호 확인이 변경될 때마다 일치 여부를 다시 확인
        setPasswordsMatch(e.currentTarget.value === Password);
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault()

        let req = {
            last_name: LastName,
            first_name: FirstName,
            email: Email,
            username: Id,
            password: Password,
        };

        try {
          const response = await axios.post('http://127.0.0.1:8000/accounts/signup/', req
           );
            console.log('Sign-up successful');
            nav('/login')
        } catch (error) {
            console.error('Error during login:', error);

            if ('email' in error.response.data && 'username' in error.response.data) {
                alert("이미 사용 중인 아이디, 이메일 입니다.")
            } else if ('email' in error.response.data) {
                alert("이미 사용 중인 이메일 입니다.")
            } else if ('username' in error.response.data) {
                alert("이미 사용 중인 아이디 입니다.")
            }

            
      };
    }
    return (
        <div style={{ 
            flexBasis: '50%', alignItems: 'center', justifyContent: 'center', 
            display:'flex', flexDirection:'column' }}>
            <div>
            <span className='font-semibold'>Create your account!</span>
            </div>    
            
            <form class="w-full max-w-lg m-10">
            <div class="flex flex-wrap -mx-3 mb-4">
                <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                    First Name
                </label>
                <input value={FirstName} onChange={onFirstNameHandler} class="appearance-none block w-full bg-gray-200 text-gray-700 border border-grey-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="이름" />
                </div>
                <div class="w-full md:w-1/2 px-3">
                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                    Last Name
                </label>
                <input value={LastName} onChange={onLastNameHandler} class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="성" />
                </div>
            </div>
            <div class="flex flex-wrap -mx-3 mb-4">
                <div class="w-full px-3">
                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-email">
                    Email
                </label>
                <input value={Email} onChange={onEmailHandler} class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-email" type="email" placeholder="your@example.com" />
                </div>
            </div>
            <div class="flex flex-wrap -mx-3 mb-4">
                <div class="w-full px-3">
                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-id">
                    ID
                </label>
                <input value={Id} onChange={onIdHandler} class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-id" type="text" placeholder="ID" />
                </div>
            </div>
            <div class="flex flex-wrap -mx-3 mb-4">
                <div class="w-full px-3">
                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                    Password
                </label>
                <input value={Password} onChange={onPasswordHandler} class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="password" placeholder="******************" />
                </div>
            </div>
            <div class="flex flex-wrap -mx-3 mb-4">
                <div class="w-full px-3">
                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                    Check Password
                </label>
                <input value={CheckPassword} onChange={onCheckPasswordHandler} class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="password" placeholder="******************" />
                {!passwordsMatch && <p className='text-sm font-semibold' style={{ color: 'red' }}>비밀번호가 일치하지 않습니다.</p>}
                </div>
            </div>
            <button onClick={onSubmitHandler} className='py-2 w-full px-3 rounded-md text-white font-semibold bg-indigo-600 border border-indigo-600 hover:text-indigo-600 hover:bg-white'>
            Sign-up
            </button> 
            </form>

        </div>
    )
}

export default SignupForm