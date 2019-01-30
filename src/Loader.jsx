import React from 'react';
import './Loader.css'
import loader from './loader.svg';

class Loader extends React.Component {
    render() {
        return (
            <div className="loader-container">
                <img className="loader" fill="#666" stroke="#f03" src={loader} alt=""/>
            </div>            
        )
    }
}

export default Loader;