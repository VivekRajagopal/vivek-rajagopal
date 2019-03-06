import React from 'react';

import './Landing.css';
import './CV.css';

import "./FontIcon.css";

import RenderedMarkdown from './RenderedMarkdown';
import BlogRouter from './BlogRouter';
import DemoRouter from './DemoRouter';

const RenderedLanding = () => <RenderedMarkdown path={"/page-data/landing.md"} className="landing"/>
const RenderedAbout = () => <RenderedMarkdown path={"/page-data/about.md"} className=""/>
const RenderedCV = () => <RenderedMarkdown path={"/page-data/cv.md"} className="cv"/>

const routes = [
    {path: '/', exact: true, name: 'Home', icon: 'icon-home', component: RenderedLanding},
    {path: '/blog', exact: false, name: 'Blog', icon: 'icon-blog', component: BlogRouter},
    {path: '/demo', exact: false, name: 'Demos', icon: 'icon-demo', component: DemoRouter},
    {path: '/about', exact: true, name: 'About', icon: 'icon-about', component: RenderedAbout},
    {path: '/cv', navHide: true, exact: true, name: 'CV', icon: '', component: RenderedCV},
]

export default routes;