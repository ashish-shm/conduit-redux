import React from 'react';
import Header from './Header'
import Footer from './Footer'

export default class Register extends React.Component {
    render() {
        return (
            <>
            <Header />
            <div className='container login'>
                <h2>Sign Up</h2>
                <a href='/login'>Have an account?</a>
                <form >
                    <input type='text' placeholder='Username' name='username'></input>
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