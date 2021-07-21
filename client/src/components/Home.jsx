import React from 'axios';
import { Link } from 'react-router-dom';
import './styles/Home.css'
import imghome from './images/imghome.jpg'


export default function Home (){
    return(
            <div className='bodyHm'>
                <a href='https://github.com/Alanjoelc'>
                    <img className='gitHm' src='https://image.flaticon.com/icons/png/512/25/25231.png'/>
                </a>
                <Link to='/welcome'>
                    <img src='https://prints.ultracoloringpages.com/3a617d117f3a4e8da7e6aa07e3576e95.png' className='cardHm'/>
                </Link>
                <img className='imgHm' src={imghome} alt='XD'/>
            </div>
    )
}