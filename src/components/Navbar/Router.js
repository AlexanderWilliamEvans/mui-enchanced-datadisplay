import React, { Fragment, useEffect } from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from '../pages/Home/Home';
import BasicExample from '../examples/BasicExample';
import StatisticsExample from "../examples/StatisticsExample";

const Router = () => {

    const loggedIn = true;

    useEffect(() => {

    }, [loggedIn]);

    return (
            <Fragment>
                {
                    loggedIn ? (<Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/BasicExample" component={BasicExample} />
                        <Route exact path="/StatisticsExample" component={StatisticsExample} />
                    </Switch>) : (
                            <Switch>
                                <Route exact path="/" component={Home} />
                            </Switch>
                        )
                }
            </Fragment>
    );

};
export default Router;