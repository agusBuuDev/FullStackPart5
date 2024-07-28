import { useState } from 'react'
import { useEffect } from 'react'
import blogHandler from './services/blogsHandle'
import Blog from './components/blog'
import Form from './components/form'
import Login from './components/login'
import loginService from './services/login'
import './style/main.css'
import Notif from './components/notif'

function App() {

  const [blogs, setBlogs] = useState([])// para cargar los blogs
  const [error, setError] = useState(null) //setear mensajes de error
  const [tipoError, setTipoError] = useState(null)
  //campos del formulario de ingreso de posts

  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [author, setAuthor] = useState('')
  const [likes, setLikes] = useState(0)
  const [user, setUser] = useState('')
  const [pass, setPass] = useState('')
  const [loguedUser, setLoguedUser] = useState('')



  //función de recargar la lista, se usará en las peticiones. 

  //siempre recargar al renderizar la pagina
  const recargar = async () => {
    try {
      const blogs = await blogHandler.fetchData('/blogs')
      setBlogs(blogs)
    } catch (err) {
      setError('Error fetching data', err)
      console.log(error)
    }
  }
  useEffect(() => {
    console.log(window.localStorage.getItem('user'))
    recargar()
  }, [])


  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('user')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setLoguedUser(user.username)
      blogHandler.setToken(user.token)
    }
  }, [])
  //función de crear blog 

  const addBlog = async () => {
    event.preventDefault() // Evita la recarga de la página
    console.log('esto va a andar pronto')
    console.log(`nuevo blog: ${title}, url: ${url}, author: ${author}, likes: ${likes}`)
    const newBlog = {
      title: title,
      url: url,
      author: author,
      likes: likes
    }
    try {
      await blogHandler.create(newBlog)
      setTitle('')
      setUrl('')
      setAuthor('')
      setLikes(0)
      recargar()
      setTipoError('notif')
      setError('Blog ingresado correctamente')
      setTimeout(() => {setError(null)      
      }, 5000)

      
      
      

    } catch{
      setTipoError('error')
      setError('Debe iniciar sesión para agregar un blog')
      setTimeout(() => {setError(null)      
      }, 5000)
    }
    

    

  }
  //función para borrar posts
  const deletePost = (post) => {

    console.log('aca se borraría el post')
    const id = post.id
    blogHandler.deletePost(id)
  }
  //función para likear posts 
  const likePost = async (blog) => {
    await blogHandler.updateLikes(blog)
    recargar()
  }

  //función login

  const handleLogin = async (event) => {
    const credentials = {
      "username": user,
      "password": pass
    }
    event.preventDefault()

    try {
      const response = await loginService(credentials)
      const userData = response.data
      console.log(userData)
      blogHandler.setToken(userData.token)
      setLoguedUser(userData.username)
      window.localStorage.setItem('user', JSON.stringify(userData))
      console.log('el user guardado localmente es: ', window.localStorage.getItem('user'))
      console.log('puedo acceder a una parte?', window.localStorage.getItem('user'))
      setUser('')
      setPass('')
      setError(null)
    } catch (exception) {
      setError('Wrong credentials')
      console.error(error)
      setTimeout(() => {setError(null)      
      }, 5000)

    }

  }

  const logout = () => {
    window.localStorage.removeItem('user')
    window.location.reload()

  }
  //verificamos que se esté leyendo correctamente la info del backend


  return (
    <>
      <Login login={handleLogin} user={user} setUser={setUser} pass={pass} setPass={setPass} loguedUser={loguedUser} error={error} logout={logout} />
      <h1>Mi lista de blogs</h1>

      <Form addBlog={addBlog} title={title} setTitle={setTitle} url={url} setUrl={setUrl} author={author} setAuthor={setAuthor} likes={likes} setLikes={setLikes} />
      <Notif error={error} tipoError={tipoError} />
      <ul>
        {blogs.map(blog => <Blog key={blog.title} blog={blog} deleteBlog={() => deletePost(blog)} like={() => likePost(blog)} />)}
      </ul>
    </>



  )

}

export default App
