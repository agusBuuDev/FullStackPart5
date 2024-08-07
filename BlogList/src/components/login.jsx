import PropTypes from 'prop-types'
import { useState } from 'react'

const Login = ({ loguedUser, setLoguedUser, login, error, loginVisible, show, hide }) => {

    const [user, setUser] = useState('')
    const [pass, setPass] = useState('')
    

    const displayButton = { display: loginVisible ? 'none' : '' }
    const displayForm = { display: loginVisible ? '' : 'none' }

    const localLogin = async (event) => {
        event.preventDefault()
        const credentials = {
            username: user,
            password: pass
        }
        try {
            const userData = await login(credentials)
            if (userData) {
                setLoguedUser(userData.username)
                setUser('')
                setPass('')
            }
        } catch (error) {
            console.error('Error in login:', error)
        }
    }

    const logout = () => {
        window.localStorage.removeItem('user')
        window.location.reload()
    }

    console.log(user, pass)
    if (error != null && error === 'Wrong credentials') {
        return (
            <>
                <div className='logindiv'>
                    <form onSubmit={localLogin}>
                        <label>Usuario</label>
                        <input type='text' name='user' value={user} onChange={event => setUser(event.target.value)} />
                        <label>Contraseña</label>
                        <input type='password' name='pass' value={pass} onChange={event => setPass(event.target.value)} />
                        <button type='submit' className='libutton'>Login</button>
                    </form>
                </div>
                <p className='loginError'>Password or user incorrect</p>
            </>
        )
    } else if ((loguedUser == null || loguedUser === '')) {
        return (
            <>
                <div className='logindiv'>
                    <div style={displayForm}>
                        <form onSubmit={localLogin}>
                            <label>Usuario</label>
                            <input data-testid='user' type='text' name='user' value={user} onChange={event => setUser(event.target.value)} />
                            <label>Contraseña</label>
                            <input data-testid='password' type='password' name='pass' value={pass} onChange={event => setPass(event.target.value)} />
                            <button type='submit' className='libutton'>Login</button>
                        </form>
                        <button className='libutton' onClick={hide}>Cancel</button>
                    </div>
                    <div style={displayButton}>
                        <button className='libutton' onClick={show}>login</button>
                    </div>
                </div>
            </>
        )
    } else {
        return (
            <>
                <div className='logindiv'>
                    <p>Bienvenido/a: {loguedUser}</p>
                    <button className='libutton' onClick={logout}>Logout</button>
                </div>
            </>
        )
    }
}

Login.propTypes = {
    login: PropTypes.func.isRequired,
    error: PropTypes.string,
    show: PropTypes.func.isRequired,
    hide: PropTypes.func.isRequired,
    loginVisible: PropTypes.bool.isRequired,
    loguedUser: PropTypes.string,
    setLoguedUser: PropTypes.func
}

export default Login
