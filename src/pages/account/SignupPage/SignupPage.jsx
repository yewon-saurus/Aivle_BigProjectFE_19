import React from 'react'
import SignupForm from './SignupForm'
import Description from '../LoginPage/Description'


function SignupPage() {
  return (
    <div style={{padding:'63px'}}>
        <section style={{ width: '100%', height: '75vh', display: 'flex', flexDirection: 'column' }} >
            <div style= {{ flex: '1', display:'flex' }}>
                <Description />
                <SignupForm />
            </div>
        </section>
    </div>
  )
}

export default SignupPage