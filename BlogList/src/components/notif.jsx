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

Notif.propTypes = {
    error: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.oneOf([null])
    ]),
    tipoError: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.oneOf([null])
    ])
  }
  
export default Notif