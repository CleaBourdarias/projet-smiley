import './global.sass'

//import css
import './App.css'

//Import react
import React from 'react'
import { Switch, Route, Router } from 'react-router-dom'
import { Redirect } from 'react-router-dom'

//Import Page
import Connexion from './components/Page/Connexion/Connexion'
import Statistiques from './components/Page/Statistiques/Statistique'
import Materiels from './components/Page/Materiels/Materiel'
import Maintenance from './components/Page/Maintenance/Maintenance'
import Parametres from './components/Page/Parametres/Parametres'

//import navbar
import NavBar from './components/NavBar/NavBar'

//Import historique navigateur
import { createBrowserHistory } from 'history'
const history = createBrowserHistory()

function App() {
    if (window.sessionStorage.getItem('user') != null) {
        return (
            <Router history={history}>
                <NavBar />
                <div>
                    <Switch>
                        <Route exact path="/connexion" component={Connexion} />
                        <Route exact path="/materiels" component={Materiels} />
                        <Route
                            exact
                            path="/statistiques"
                            component={Statistiques}
                        />
                        <Route
                            exact
                            path="/maintenance"
                            component={Maintenance}
                        />
                        <Route
                            exact
                            path="/parametres"
                            component={Parametres}
                        />
                    </Switch>
                </div>
            </Router>
        )
    } else {
        return (
            <Router history={history}>
                <div>
                    <Route
                        exact
                        path={['/', '/connexion']}
                        component={Connexion}
                    />
                </div>
            </Router>
        )
    }
}

export default App
