import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
//import css
import './NavBar.css'

//import image
import logo from '../../image/maintenance-web.svg'
import parametre from '../../image/parametre.svg'
import logout from '../../image/menu.svg'
import menu from '../../image/menu2.svg'

const NavBar = () => {
    const [isActive, setisActive] = useState(false)

    const menuActive = () => {
        setisActive(!isActive)
    }

    const deconnexion = () => {
        sessionStorage.removeItem('user')
    }
    if (sessionStorage.getItem('user') == null) {
        return <Redirect to="/connexion" />
    }
    return (
        <nav
            className="navbar is-spacing nav"
            role="navigation"
            aria-label="main navigation"
        >
            <div className="navbar-brand">
                <img
                    src={logo}
                    style={{ margin: '10px' }}
                    width="100px"
                    alt="logo maintenance"
                    className="imgNav"
                />

                <a
                    role="button"
                    className="navbar-burger"
                    aria-label="menu"
                    aria-expanded="false"
                    style={{ color: '#000033' }}
                    onClick={menuActive}
                >
                    <img
                        src={menu}
                        alt="menu"
                        width="45px"
                        style={{ margin: '20px 0px' }}
                    />
                </a>
            </div>
            <div className={`navbar-menu ${isActive ? 'is-active' : ''}`}>
                <div className="navbar-start">
                    <a
                        className="navbar-item"
                        style={{
                            color: '#d7ebfa',

                            fontSize: '25px',

                            margin: '0 10px',
                            fontWeight: 'bold',
                        }}
                        href="/materiels"
                    >
                        Matériels
                    </a>

                    <a
                        className="navbar-item"
                        style={{
                            color: '#d7ebfa',

                            fontSize: '25px',

                            margin: '0 10px',
                            fontWeight: 'bold',
                        }}
                        href="/maintenance"
                    >
                        Maintenance
                    </a>

                    <a
                        className="navbar-item"
                        style={{
                            color: '#d7ebfa',

                            fontSize: '25px',

                            margin: '0 10px',
                            fontWeight: 'bold',
                        }}
                        href="/statistiques"
                    >
                        Statistiques
                    </a>
                </div>
                <div className="navbar-end">
                    <div className="navbar-item">
                        <div className="buttons is-ghost">
                            <a className="button is-ghost" href="/parametres">
                                <img
                                    src={parametre}
                                    alt="parametre"
                                    width="90px"
                                    className="imageparametre"
                                />
                            </a>
                            <a
                                className="button is-ghost "
                                onClick={deconnexion}
                                href="/connexion"
                            >
                                <img src={logout} alt="deconnexion" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default NavBar
