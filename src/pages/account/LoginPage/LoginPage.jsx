import React from 'react'
import LoginForm from './LoginForm'
import Description from './Description'


function LoginPage({setIsLogin}) {
  return (
    <div style={{padding:'63px'}}>
        <section style={{ width: '100%', height: '75vh', display: 'flex', flexDirection: 'column' }} >

            <div style= {{ flex: '1', display:'flex' }}>
                <Description />
                <LoginForm setIsLogin={setIsLogin} />
            </div>
        </section>
    </div>
  )
}

export default LoginPage