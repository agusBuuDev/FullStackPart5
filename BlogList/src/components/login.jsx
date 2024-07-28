import PropTypes from 'prop-types'
const Login = ({login, user, setUser, pass, setPass, loguedUser, error, logout})=>{

    console.log(user, pass)
    if(error!=null && error=='Wrong credentials'){
        return(
            <>
            <div className='logindiv'>
            <form onSubmit={login}>
                <label>Usuario</label>
                <input type='text' name='user' value={user} onChange={event=>setUser(event.target.value)}/>
                <label>Contraseña</label>
                <input type='password' name='pass' value={pass} onChange={event=> setPass(event.target.value)}/>
                <button type='submit' className='libutton'>Login</button>
                
            </form>
            </div>
            <p className='loginError'>Password or user incorrect</p>
            
            </>
        )

    }else if(loguedUser==null || loguedUser==''){
        return(
            <>
        <div className='logindiv'>
        <form onSubmit={login}>
            <label>Usuario</label>
            <input type='text' name='user' value={user} onChange={event=>setUser(event.target.value)}/>
            <label>Contraseña</label>
            <input type='password' name='pass' value={pass} onChange={event=> setPass(event.target.value)}/>
            <button type='submit' className='libutton'>Login</button>
            
        </form>
        </div>
       
        
        </>
        )
        


    }else{
        return(
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
    user: PropTypes.string.isRequired,
    setUser:PropTypes.func.isRequired,
    pass: PropTypes.string.isRequired,
    setPass: PropTypes.func.isRequired,
    login: PropTypes.func.isRequired,
    loguedUser: PropTypes.string.isRequired,
    error: PropTypes.string,
    logout: PropTypes.func.isRequired
}

export default Login