import React from "react";
import Row from '../Row';
import {PlanetDetails, PlanetList} from "../sw-components";
import {withRouter} from "react-router-dom";

const PlanetsPage = ({history, match}) => {
    const {id} = match.params;

    return (
        <Row 
            left={<PlanetList onItemSelected={(id) => history.push(id)} />} 
            right={<PlanetDetails itemId={id} />} 
        />
    );
}

export default withRouter(PlanetsPage);