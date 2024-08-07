import { useState } from 'react'
import { useEffect } from 'react'
import { useRef } from 'react'
import blogHandler from './services/blogsHandle'
import Blog from './components/blog'
import Form from './components/form'
import Login from './components/login'
import loginService from './services/login'
import './style/main.css'
import Notif from './components/notif'
import Togglable from './components/togglable'

function App() {

  const [blogs, setBlogs] = useState([])// para cargar los blogs
  const [error, setError] = useState(null) //setear mensajes de error
  const [tipoError, setTipoError] = useState(null)
  const [loguedUser, setLoguedUser] = useState('')
  const [loginVisible, setLoginVisible] = useState(false)
  const [loguedUserId, setUserId] = useState('')


  const togglableRef = useRef()

  //siempre recargar al renderizar la pagina
  const recargar = async () => {
    try {
      const blogs = await blogHandler.fetchData('/blogs')
      // Ordenar los blogs por likes en orden descendente
      const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)
      setBlogs(sortedBlogs)
    } catch (err) {
      setError('Error fetching data')
      console.log(err)
    }
  }
  useEffect(() => {
    recargar()
  }, [])


  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('user')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setLoguedUser(user.username)
      setUserId(user.id)
     
      blogHandler.setToken(user.token)
    }
  }, [])

 
  //función de crear blog 
  const creaBlog = async (newBlog) => {
    try {
      await blogHandler.create(newBlog)
      recargar()
      setTipoError('notif')
      setError('Blog ingresado correctamente')
      togglableRef.current.toggleVisibility()

      setTimeout(() => {
        setError(null)
      }, 5000)
    } catch {
      setTipoError('error')
      setError('Debe iniciar sesión para agregar un blog')
      setTimeout(() => {
        setError(null)
      }, 5000)

    }
  }

  //función para borrar posts
  const deletePost = async (post) => {
    const confirmation = window.confirm('¿Estás seguro de que deseas eliminar este blog?')
    if (confirmation) {
        console.log('Se borrará el post')
        const id = post.id
        await blogHandler.deletePost(id)
        recargar()
    } else {
        console.log('El post no fue borrado')
    }
}


const likePost = async (blog) => {
    await blogHandler.updateLikes(blog)
    recargar()
}

  //función login

  const handleLogin = async (credentials) => {


    try {
      const response = await loginService(credentials)
      const userData = response.data
      console.log(userData)
      blogHandler.setToken(userData.token)
      window.localStorage.setItem('user', JSON.stringify(userData))
      setError(null)
      return (userData)
    } catch (exception) {
      setError('Wrong credentials')
      console.error(error)
      setTimeout(() => {
        setError(null)
      }, 5000)

    }

  }


  //funcion de mostrar y esconder el formulario
  const show = () => {
    setLoginVisible(true)
  }
  const hide = () => {
    setLoginVisible(false)
  }



  return (
    <>
      <Login login={handleLogin} loguedUser={loguedUser} setLoguedUser={setLoguedUser} error={error} loginVisible={loginVisible} show={show} hide={hide} />
      <h1>Mi lista de blogs</h1>

      <div style={{ height: '50px' }}></div>
      <Togglable buttonLabel="About info">
        <div className='blogdiv'>
          <p>This app was created for educational purposes</p>
          <p>Author: AgusBuuDev</p>
          <p>Course: Full Stack Open Part 5 </p>
          <p>July 2024</p>

        </div>
      </Togglable>
      <div className='blog'></div>

      <Togglable buttonLabel='Agregar Blog' ref={togglableRef}>
        <Form creaBlog={creaBlog} loguedUser={loguedUserId} />
      </Togglable>
      <Notif error={error || null} tipoError={tipoError || null} />
      <ul>
        {blogs.map(blog => <Blog key={blog.title} blog={blog} deleteBlog={() => deletePost(blog)} like={() => likePost(blog)} />)}
      </ul>
    </>



  )

}

export default App
