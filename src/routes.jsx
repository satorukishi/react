import React from 'react';
import {Switch, Route} from 'react-router-dom';

import Search from './pages/Search';
import Details from './pages/Details';

const Routes = () => (
    <Switch>
        <Route exact path='/' component={Search} />
        <Route path='/Details/:id' component={Details} />
        <Route component={ () => (
            <div>Page not found</div>
        )} />
    </Switch>
);

export default Routes;