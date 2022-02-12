import './App.css'
import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'
import { BrowserRouter } from 'react-router-dom'

import Routes from './Routes'
import Nav from '../components/template/Nav'
import Logo from '../components/template/Logo'
import Footer from '../components/template/Footer'

export default props =>
    <BrowserRouter>
        <div className="app">
            <Logo/>
            <Nav/>
            <Routes/>
            <Footer/>
        </div>

    </BrowserRouter>