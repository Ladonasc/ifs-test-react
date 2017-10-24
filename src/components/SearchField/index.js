import React, { Component, PropTypes } from 'react'
import classNames from 'classnames'

import styles from './index.css'

export default class SearchField extends Component {

    static propTypes = {
        value: PropTypes.string,
        onChange: PropTypes.func,
        rootStyle: PropTypes.string
    }

    render() {
        return (
            <div className={classNames(styles.searchField, this.props.rootStyle)}>
                <input 
                    type="text" 
                    placeholder="Search" 
                    value={this.props.value} 
                    onChange={e => (
                        this.props.onChange(e.target.value)
                    )} />
            </div>
        )
    }
}
