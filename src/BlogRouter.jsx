import React, { Fragment } from 'react';
import {Route, } from 'react-router-dom';
import RenderedMarkdown from './RenderedMarkdown';

const BlogMain = () => <RenderedMarkdown path={`/page-data/blog.md`} className=""/>
const BlogView = ({match}) => <RenderedMarkdown path={`/page-data/blog/${match.params.blogId}.md`} className=""/>

const BlogRouter = ({match}) => {
    return (
        <Fragment>            
            <Route exact path={match.path} component={BlogMain}/>
            <Route path={`${match.path}/:blogId`} component={BlogView} />
        </Fragment>
    )
}

export default BlogRouter;