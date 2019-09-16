import React, {Component} from 'react';

import Header from '../Header';
import RandomPlanet from '../RandomPlanet';
import ErrorBoundry from '../ErrorBoundry';
import SwapiService from "../../services/swapi-service";
import {SwapiServiceProvider} from "../swapi-service-context";
import {
    PeoplePage,
    PlanetsPage,
    StarshipPage,
    SecretPage,
    LoginPage
} from "../pages";
import { StarshipDetails } from '../sw-components';

import {BrowserRouter as Router, Route} from "react-router-dom";

import './app.css';


class App extends Component {

    state = {
        swapiService: new SwapiService(),
        isLoggedIn: false
    };

    onLogin = () => {
        this.setState({
            isLoggedIn: true
        });
    }

    render() {
        const {isLoggedIn} = this.state;

        return(
            <ErrorBoundry>
                <SwapiServiceProvider value={this.state.swapiService} >
                    <Router>
                        <div className="app"> 
                            <Header />
                            <RandomPlanet />

                            <Route path="/" exact render={() => <h2>Welcome to StartDB</h2>} />
                            <Route path="/people/:id?" component={PeoplePage} />
                            <Route path="/planets/:id?" component={PlanetsPage} />
                            <Route path="/starships/" exact component={StarshipPage} />
                            <Route path="/starships/:id" 
                                render={({match}) => {
                                    const {id} = match.params;
                                    return <StarshipDetails itemId={id} />
                                }} />
                            <Route path="/login" render={() => <LoginPage isLoggedIn={isLoggedIn} onLogin={this.onLogin} />} />
                            <Route path="/secret" render={() => <SecretPage isLoggedIn={isLoggedIn} />} />
                        </div>
                    </Router>
                </SwapiServiceProvider>
            </ErrorBoundry>
        );
    };
};

export default App;