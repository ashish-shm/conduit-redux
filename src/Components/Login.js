import React from 'react';
import Header from './Header'
import Footer from './Footer'
import {Link} from 'react-router-dom'

export default class Login extends React.Component {
    render() {
        return (
            <>
            <Header />
            <div className='container login'>
                <h2>Sign In</h2>
                <Link to='/register'>Need an account?</Link>
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