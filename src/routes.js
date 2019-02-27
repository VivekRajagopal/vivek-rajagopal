import React from 'react';

import './Landing.css';

import RenderedMarkdown from './RenderedMarkdown';
import BlogRouter from './BlogRouter';
import DemoRouter from './DemoRouter';

const RenderedLanding = () => <RenderedMarkdown path={"/page-data/landing.md"} className="landing"/>
const RenderedAbout = () => <RenderedMarkdown path={"/page-data/about.md"} className=""/>

const routes = [
    {path: '/', exact: true, name: 'Home', iconName: '🏠', component: RenderedLanding},
    {path: '/blog', exact: false, name: 'Blog', iconName: '📖', component: BlogRouter},
    {path: '/demo', exact: false, name: 'Demos', iconName: '🛠️', component: DemoRouter},
    {path: '/about', exact: true, name: 'About', iconName: '🖊️', component: RenderedAbout},
]

export default routes;