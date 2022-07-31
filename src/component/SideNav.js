import React from 'react';
import { Link } from 'react-router-dom';


function SideNav() {
    return (
        <div>
            <div className="sidenav">
                <Link to="/" >Customer</Link>
                <Link to="/Product" >Product</Link>
                <Link to="/Bill" >Bill</Link>
                <Link to="/Report" >Report </Link>
                <Link to="/Filter" >Filter </Link>
            </div>
        </div>
    )
}

export default SideNav