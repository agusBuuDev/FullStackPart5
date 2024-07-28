import PropTypes from 'prop-types'

const Notif= ({error, tipoError})=>{
   
    if(error!=null && error!= 'Wrong credentials'){
        return(
            <>
            <div className={tipoError}>
                <p>{error}</p>
            </div>
            </>
        )   

    }

}

Notif.propTypes={
    error: PropTypes.string.isRequired,
    tipoError: PropTypes.string.isRequired
}
export default Notif