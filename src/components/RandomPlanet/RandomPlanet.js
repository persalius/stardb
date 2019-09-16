import React, { Component, Fragment } from 'react';
import SwapiService from "../../services/swapi-service"
import Spinner from "../Spinner";
import ErrorIndicator from "../ErrorIndicator";
import PropType from "prop-types";
import './random-planet.css';

class RandomPlanet extends Component {

  state = {
    planet: {},
    loading: true
  };

  static defaultProps = {
    updateIntarval: 10000
  };

  static propTypes = {
    updateIntarval: PropType.number
  }

  componentDidMount() {
    const {updateIntarval} = this.props;
    this.updatePlanet();
    this.interval = setInterval(this.updatePlanet, updateIntarval);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  swapiService = new SwapiService();

  onPlanetLoaded = planet => {
    this.setState({
      planet,
      loading: false,
      error: false
    });
  }

  onError = err => {
    this.setState({
      error: true,
      loading: false
    });
  }

  updatePlanet = () => {
    const id = Math.floor(Math.random()*25) + 2;

    this.swapiService.getPlanet(id)
      .then(this.onPlanetLoaded)
      .catch(this.onError);
  }

  render() {
    const {planet, loading, error} = this.state;

    const errorMessage = error ? <ErrorIndicator /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error) ? <PlanetView planet={planet} /> : null;

    return (
      <div className="random-planet jumbotron rounded">
        {errorMessage}
        {spinner}
        {content}
      </div>
    );
  }
};

export default RandomPlanet;

const PlanetView = ({planet}) => {
  const {id, name, population, rotationPeriod, diameter} = planet;

  return(
    <Fragment>
      <img className="planet-image"
             src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`} alt="img" />
        <div>
          <h4>{name}</h4>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <span className="term">Population</span>
              <span>{population}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Rotation Period</span>
              <span>{rotationPeriod}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Diameter</span>
              <span>{diameter}</span>
            </li>
          </ul>
        </div>
    </Fragment>
  );
};