import React from 'react';
import Header from './Header'
import Footer from './Footer'

export default class Login extends React.Component {
    render() {
        return (
            <>
            <Header />
            <div className='container login'>
                <h2>Sign In</h2>
                <a href='/register'>Need an account?</a>
                <form >
                    <input type='email' placeholder='Email' name='email'></input>
                    <input type='password' placeholder='Password' name='password'></input>
                    <input type='submit'></input>
                </form>
            </div>
            <Footer />

            </>
        )
    }
}