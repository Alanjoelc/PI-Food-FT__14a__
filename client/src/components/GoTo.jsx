import React from 'react';
import { NavLink } from 'react-router-dom';
import './styles/GoTo.css';


export default function GoTo (){
    return (
        <div className='Nav'>
            <NavLink to='/welcome'>
                <img src='http://4.bp.blogspot.com/-YhWtIwqdSOg/U96HdUoB95I/AAAAAAAAIts/oBDDhv_EHAU/s1600/30kawaii.png'className='Gt'/>
            </NavLink>
            <NavLink to='/'>
                <img src='https://images.vexels.com/media/users/3/157257/isolated/preview/d3bd73477873ff05a127e686ee688f65-icono-de-casa-blanco-y-negro.png' className='homeGt'/>
            </NavLink>
        </div>
    )
}