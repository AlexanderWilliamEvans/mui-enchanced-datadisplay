import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from '../pages/Home/Home';
import BasicExample from '../examples/BasicExample';
import StatisticsExample from "../examples/StatisticsExample";
import DraggableExample from "../examples/DraggableExample";
import EditableExample from "../examples/EditableExample";

const Router = () => {

    const loggedIn = true;

    React.useEffect(() => {

    }, [loggedIn]);

    return (
            <React.Fragment>
                {
                    loggedIn ? (<Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/BasicExample" component={BasicExample} />
                        <Route exact path="/StatisticsExample" component={StatisticsExample} />
                        <Route exact path="/EditableExample" component={EditableExample} />
                        <Route exact path="/DraggableExample" component={DraggableExample} />
                    </Switch>) : (
                            <Switch>
                                <Route exact path="/" component={Home} />
                            </Switch>
                        )
                }
            </React.Fragment>
    );

};
export default Router;