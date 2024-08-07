import PropTypes from 'prop-types'
import likeimg from '../media/like.png'
import { useState, useEffect } from 'react'

const Blog = ({ blog, deleteBlog, like }) => {
    const [visibleToogle, setVisibleToogle] = useState(false)
    const [visibleButton, setVisibleButton] = useState(false)
    const [loguedUserId, setLoguedUserId] = useState('')


    const hideWhenVisible = { display: visibleToogle ? 'none' : '' }
    const showWhenVisible = { display: visibleToogle ? '' : 'none' }

    const toggleVisibility = () => {
        setVisibleToogle(!visibleToogle)
    }

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('user')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setLoguedUserId(user.id)
            console.log(loguedUserId)

        }
    }, [])

    useEffect(() => {
        if (loguedUserId == blog.user.id) {
            setVisibleButton(true)

        }

    }, [loguedUserId, blog.user.id])


    const displayButton = { display: visibleButton ? '' : 'none' }

    console.log()

    return (
        <div className="blogdiv">
            <li className='blog' >{blog.title}

                <div>
                    <div style={hideWhenVisible}>
                        <button className='toggle' onClick={toggleVisibility}>Mostrar detalles</button>
                    </div>
                    <div style={showWhenVisible}>
                        <button className='toggleHide' onClick={toggleVisibility}>Hide</button>
                        <ul>
                            <li data-testid='url'><a href={blog.url}>URL: {blog.url}</a></li>
                            <li data-testid='author'>Author: {blog.author}</li>
                            <li data-testid='user'>User: {blog.user.name}</li>

                            <button style={displayButton} onClick={deleteBlog}>borrar</button>
                            <button data-testid='like' className="libutton" onClick={like}>like</button>
                            {blog.likes}
                            <img className='likeicon' src={likeimg} />

                        </ul>
                    </div>
                </div>







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
        id: PropTypes.string.isRequired,
        user: PropTypes.shape({
            id: PropTypes.string,
            username: PropTypes.string,
            name: PropTypes.string
        })
    }).isRequired,
    deleteBlog: PropTypes.func.isRequired,
    like: PropTypes.func.isRequired,
    loguedUser: PropTypes.string

}

export default Blog