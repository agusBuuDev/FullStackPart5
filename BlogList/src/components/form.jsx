import PropTypes from 'prop-types'


const Form = ({ addBlog, title, setTitle, url, setUrl, author, setAuthor, likes, setLikes }) => {
    return (
        <>
            <div className='formBox'>
                <form onSubmit={addBlog}>
                    <div className='formline'>
                    <h2>Agregar un nuevo blog</h2>

                    </div>
                    <div className='formline'>
                        <label>Título: </label>
                        <input type='text' name='title' value={title} onChange={event => setTitle(event.target.value)}></input>
                    </div>

                    <div className='formline'>
                        <label>URL: </label>
                        <input type='text' name='url' value={url} onChange={event => setUrl(event.target.value)}></input>
                    </div>
                    <div className='formline'>
                        <label>Author: </label>
                        <input type="text" name='author' value={author} onChange={event => setAuthor(event.target.value)}></input>
                    </div>
                    <div className='formline'>
                        <label>Likes: </label>
                        <input type="number" name="likes" value={likes} onChange={event => setLikes(event.target.value)}></input>
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
    addBlog: PropTypes.func.isRequired, // Debe ser una función y es requerida
    title: PropTypes.string.isRequired, // Debe ser una cadena y es requerida
    setTitle: PropTypes.func.isRequired, // Debe ser una función y es requerida
    url: PropTypes.string.isRequired, // Debe ser una cadena y es requerida
    setUrl: PropTypes.func.isRequired, // Debe ser una función y es requerida
    author: PropTypes.string.isRequired, // Debe ser una cadena y es requerida
    setAuthor: PropTypes.func.isRequired, // Debe ser una función y es requerida
    likes: PropTypes.number.isRequired, // Debe ser un número y es requerido
    setLikes: PropTypes.func.isRequired // Debe ser una función y es requerida
}

export default Form