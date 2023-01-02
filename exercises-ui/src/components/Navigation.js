import React from 'react'
import { Link } from "react-router-dom"

const Navigation = () => {
    return (
        <nav id="navigation">
            <Link className='link' to="/">Homepage</Link>
            <Link className='link' to="/add-exercise">Create an Exercise</Link>
        </nav>
    )
}

 export {Navigation}