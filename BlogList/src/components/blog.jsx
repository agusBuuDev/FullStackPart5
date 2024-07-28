import PropTypes from 'prop-types'
import likeimg from '../media/like.png'
const Blog = ({blog, deleteBlog, like})=>{
    console.log(blog.title)
    return(
        <div className="blogdiv">
        <li className='blog' >{blog.title}
            <ul>
                <li><a href={blog.url}>URL: {blog.url}</a></li>
                <li>Author: {blog.author}</li>
                <li>id: {blog.id}</li>
                
                <button className="libutton" onClick={deleteBlog}>borrar</button>
                <button className="libutton" onClick={like}>like</button>
                {blog.likes}
                <img className='likeicon' src={likeimg}/>
                
            </ul>
            
            
            
        </li>
        </div>
    )

}


Blog.propTypes = {
    blog: PropTypes.shape({
        title: PropTypes.string.isRequired, 
        url: PropTypes.string.isRequired,
        author: PropTypes.string.isRequired, 
        likes: PropTypes.number.isRequired, 
        id: PropTypes.string.isRequired
      }).isRequired, 
    deleteBlog: PropTypes.func.isRequired,
    like: PropTypes.func.isRequired
}
    
export default Blog