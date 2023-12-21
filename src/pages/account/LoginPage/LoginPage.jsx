import React from 'react'
import LoginForm from './LoginForm'
import Description from './Description'


function LoginPage() {
  return (
    <div>
        <section style={{ width: '100%', height: '100vh', display: 'flex', flexDirection: 'column' }} >

            <div style= {{ flex: '1', display:'flex' }}>
                <Description />
                <LoginForm />
            </div>
        </section>
    </div>
  )
}

export default LoginPage