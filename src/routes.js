import React from 'react';
import {doesPageExist} from './page-data';

import './Landing.css';

import RenderedMarkdown from './RenderedMarkdown';
import BlogRouter from './BlogRouter';

const RenderedHome = () => <RenderedMarkdown path={"/page-data/home.md"} className="landing"/>
const RenderedAbout = () => <RenderedMarkdown path={"/page-data/about.md"}/>
const RenderedDemo = () => <RenderedMarkdown path={"/page-data/demo.md"}/>


const routes = [
    {path: '/', exact: true, name: 'Home', component: RenderedHome},
    {path: '/blog', exact: false, name: 'Blog', component: BlogRouter},
    {path: '/demo', exact: false, name: 'Demos', component: RenderedDemo},
    {path: '/about', exact: false, name: 'About', component: RenderedAbout},
]

export default routes;