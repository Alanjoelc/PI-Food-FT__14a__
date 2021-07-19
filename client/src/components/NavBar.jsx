import React from 'react';
import { NavLink } from 'react-router-dom';
import SearchBar from './SearchBar';
import Filter from './Filter';
import Buttons from './Buttons';

export default function NavBar({onSearch}) {

    return (
        <header>
            <div>
                <p>XD IMG</p>
            </div>
            <nav>
                <div>
                    <NavLink exact to="/" >Home...</NavLink>
                    <NavLink to="/xd" >paginado...</NavLink>
                    <SearchBar/>
                    <Filter/>
                    <Buttons/>
                </div>
            </nav>
        </header>
    )
}