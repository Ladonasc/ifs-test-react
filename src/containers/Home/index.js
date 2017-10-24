import React, { Component } from 'react'
import request from 'superagent'

// import components
import SelectFilter from 'components/SelectFilter'

import styles from './index.css'


export default class Home extends Component {

    state = {
        data: [],
        currentFilter: ''
    }

    componentDidMount() {

        request
            .get('http://localhost:5000/category')
            .end((err, res) => {
                if (res) {
                    this.setState({
                        data: res.body
                    });
                }
            });
    }

    render() {
        return (
            <div className={ styles.home }>
                <h1>ifs test react</h1>
                <SelectFilter
                    filters={this.state.data}
                    onChange={(currentFilter) => {
                        this.setState({
                            currentFilter: currentFilter
                        });
                    }}
                    rootStyle={ styles.filter }
                />
                <div className={ styles.currentFilter }>
                    Filter by: {this.state.currentFilter}
                </div>
            </div>
        )
    }
}
