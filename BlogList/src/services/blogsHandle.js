import axios from 'Axios'

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3003/api',
})
let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const fetchData = async (url) => {
  try {
    const response = await axiosInstance.get(url)
    return response.data
  } catch (error) {
    console.error('Error fetching data:', error)
    throw error
  }
}

const create = async (newBlog)=>{
  const config = {
    headers: { Authorization: token },
  }
   try{
    return(
        await axiosInstance.post('/blogs/',newBlog, config)       
    )
   }catch(error) {
    console.error('Error fetching data:', error)
    throw error
  }
}

const deletePost = async (id)=>{
 try{
    await axiosInstance.delete(`/blogs/${id}`)
 }catch(error){
    console.error('Error al borrar el post: ', error)
 }
}

const updateLikes = async (post)=>{
    console.log('el id a updatear es: ', post.id)
    const oldpost = await axiosInstance.get(`/blogs/${post.id}`)
    const newPost = { ...oldpost, likes: post.likes + 1 }
    await axiosInstance.put(`/blogs/${post.id}`, newPost)

}
const blogHandler= {fetchData, create, deletePost, updateLikes, setToken}
export default blogHandler