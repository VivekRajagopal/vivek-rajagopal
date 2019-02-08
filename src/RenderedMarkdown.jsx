import React, { Component, Fragment } from 'react';
import MarkdownIt from 'markdown-it';
import Loader from './Loader';

import {getPageData, doesPageExist} from './page-data';

const md = new MarkdownIt();
const errorPage = '/page-data/error.md';

class RenderedMarkdown extends Component {
    state = {
        markdown: ""
    }

    componentDidMount() {
        if (doesPageExist(this.props.path))            
            fetch(this.props.path)
                .then(res => res.text())            
                .then(markdown => this.setState({markdown}))
        else
            fetch(errorPage)
                .then(res => res.text())            
                .then(markdown => this.setState({markdown}))
        } 

    render() {
        return <div className={`${this.props.className} content`} dangerouslySetInnerHTML={{__html: md.render(this.state.markdown)}}/>
    }
}

export default RenderedMarkdown;