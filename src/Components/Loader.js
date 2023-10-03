import React from 'react'

function Loader(props) {

    let setHeight

    if(props.height !== undefined) { 

        setHeight = props.height
    }
return (

<div className="loaderWrap" style={{height: setHeight || ""}}><div className="spinner"></div>{props.text}</div>


)

}
export default Loader;