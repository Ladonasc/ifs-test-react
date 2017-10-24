import React, { Component, PropTypes } from 'react'
import classNames from 'classnames'

// import components
import ListFilter from 'components/ListFilter'

import styles from './index.css'


export default class SelectFilter extends Component {

    static propTypes = {
        filters: PropTypes.arrayOf(PropTypes.shape({
            name: PropTypes.string,
            children: PropTypes.array,
        })).isRequired,
        onChange: PropTypes.func,
        rootStyle: PropTypes.string
    }

    handleLabelClick() {
        this.setState(prevState => ({
            isOpen: !prevState.isOpen
        }))
    }

    constructor(props) {
        super(props);
        this.state = { isOpen: false };

        this.handleLabelClick = this.handleLabelClick.bind(this);
    }

    render() {
        const {
            rootStyle
        } = this.props;

        return (
            <div className={classNames(styles.selectfilter, rootStyle)}>
                <div 
                    className={classNames(styles.label)} 
                    onClick={this.handleLabelClick}>
                    Select a channel
                    <span className={classNames(styles.arrow)}>{this.state.isOpen ? '▲' : '▼'}</span>
                </div>
                <ListFilter 
                    filters={this.props.filters} 
                    onSelect={this.props.onChange}
                    rootStyle={this.state.isOpen ? styles.open : styles.close} />
            </div>
        )
    }

}
