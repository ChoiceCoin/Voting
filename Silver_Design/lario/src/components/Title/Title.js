import React from 'react'
import './Title.css'
import Fade from 'react-reveal/Fade'

const Title = ({title}) => {
    return (
        <Fade left >
        <div className="section__title">
            {title}
        </div>
        </Fade>
    )
}

export default Title
