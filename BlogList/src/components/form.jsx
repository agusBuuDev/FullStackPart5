import PropTypes from 'prop-types'
import { useState } from 'react'


const Form = ({ creaBlog }) => {

    const [title, setTitle] = useState('')
    const [url, setUrl] = useState('')
    const [author, setAuthor] = useState('')
    const [likes, setLikes] = useState(0)

    const addBlog = (event) => {
        event.preventDefault() // Evita la recarga de la página
        console.log(`nuevo blog: ${title}, url: ${url}, author: ${author}, likes: ${likes}`)
        const newBlog = {
            title: title,
            url: url,
            author: author,
            likes: likes
        }

        creaBlog(newBlog)
        

        setTitle('')
        setUrl('')
        setAuthor('')
        setLikes(0)
       
    }


    return (
        <>
            <div className='formBox'>
                <form onSubmit={addBlog}>
                    <div className='formline'>
                        <h2>Agregar un nuevo blog</h2>

                    </div>
                    <div className='formline'>
                        <label htmlFor='title'>Título: </label>
                        <input id='title'  type='text' name='title' value={title} onChange={event => setTitle(event.target.value)}></input>
                    </div>

                    <div className='formline'>
                        <label htmlFor='url'>URL: </label>
                        <input id='url' type='text' name='url' value={url} onChange={event => setUrl(event.target.value)}></input>
                    </div>
                    <div className='formline'>
                        <label htmlFor='author' >Author: </label>
                        <input id='author' type="text" name='author' value={author} onChange={event => setAuthor(event.target.value)}></input>
                    </div>
                    <div className='formline'>
                        <label htmlFor='likes'>Likes: </label>
                        <input id='likes' type="number" name="likes" value={likes} onChange={event => setLikes(event.target.value)}></input>
                    </div>

                    <div className='formline'>
                        <button type='submit' className='libutton'>Guardar</button>
                    </div>
                </form>
            </div>




        </>
    )


}

Form.propTypes = {
    creaBlog: PropTypes.func.isRequired, // Debe ser una función y es requerida
    
}

export default Form