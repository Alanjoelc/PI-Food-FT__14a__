import React from 'react';
import { NavLink } from 'react-router-dom';

export default function NavBar() {
    return (
        <header>
            <div>
                <p>XD IMG</p>
            </div>
            <nav>
                <ul>
                    <li>
                        <NavLink exact to="/" >Home...</NavLink>
                        <NavLink to="/xd" >paginado...</NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    )
}