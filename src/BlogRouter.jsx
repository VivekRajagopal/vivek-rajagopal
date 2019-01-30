import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom';
import RenderedMarkdown from './RenderedMarkdown';

const BlogMain = () => <RenderedMarkdown path={`/page-data/blog.md`}/>
const BlogView = ({match}) => <RenderedMarkdown path={`/page-data/blog-${match.params.blogId}.md`}/>

const BlogRouter = ({match}) => {
    return (
        <div>            
            <Route exact path={match.path} component={BlogMain}/>
            <Route path={`${match.path}/:blogId`} component={BlogView} />
        </div>
    )
}

export default BlogRouter;