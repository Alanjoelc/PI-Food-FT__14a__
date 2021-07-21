import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import Filter from './Filter';
import Buttons from './Buttons';
import './styles/NavBar.css'


export default function NavBar({onSearch}) {

    return (
        <header>
            <nav>
                <div className='bodyNB'>
                    <a href='https://github.com/Alanjoelc'>
                        <img className='imgNB' src='https://image.flaticon.com/icons/png/512/25/25231.png'/>
                    </a>
                    <NavLink exact to="/">
                        <img src='https://images.vexels.com/media/users/3/157257/isolated/preview/d3bd73477873ff05a127e686ee688f65-icono-de-casa-blanco-y-negro.png' className='homeNB'/>
                    </NavLink>
                    <NavLink to='/newrecipe'>
                        <img src='https://image.flaticon.com/icons/png/512/35/35689.png' className='NewNB'/>
                    </NavLink>
                    <SearchBar/>
                    <Filter/>
                    <Buttons/>
                </div>
            </nav>
        </header>
    )
}