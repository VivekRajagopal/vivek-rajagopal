import React, { Component, Fragment } from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import RenderedMarkdown from './RenderedMarkdown';

const DemoMain = () => <RenderedMarkdown path={`/page-data/demo.md`} className=""/>

const DemoRouter = ({match}) => {
    return (
        <Fragment>            
            <Route exact path={match.path} component={DemoMain}/>
        </Fragment>
    )
}

export default DemoRouter;