import React , {Component}  from 'react';
import './layout.css'
import {Breadcrumbs} from 'react-breadcrumbs-dynamic';
import {Outlet} from 'react-router-dom';
import Navbar from '../components/Header/Navbar.js'
class Layout extends Component {

    state = {
        showNav: false
    }
    //This is used to display Sidenav after button is clicked
    toggleSideNav = (action) =>
    {
        this.setState (
            {
                showNav:action
            })
    }

    render (){
        return(
            <div className = 'layout'>
                 
               
                
            
            <div className = "head">
                {/* EVery other component is rendered here as a child of HOC */}
                <Navbar/>
            </div>
            <div className = "main-content">
                {/* EVery other component is rendered here as a child of HOC */}
                <Outlet />
            </div>
            </div>
        )
    }
}
export default Layout;