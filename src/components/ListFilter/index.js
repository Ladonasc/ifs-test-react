import React, { Component, PropTypes } from 'react'
import classNames from 'classnames'

// import components
import SearchField from 'components/SearchField'

import styles from './index.css'

export default class ListFilter extends Component {

    static propTypes = {
        filters: PropTypes.arrayOf(PropTypes.shape({
            name: PropTypes.string,
            children: PropTypes.array,
        })).isRequired,
        onSelect: PropTypes.func,
        rootStyle: PropTypes.string
    }

    getFilteredFilters(filters) {
        let searchValue = this.state.searchValue;
        
        return filters.map(filter => {
            return {
                name: filter.name,
                children: filter.children.filter(item => {
                    return item.name.toLowerCase().indexOf(searchValue) === 0;
                })
            };
        }).filter(filter => {
            // Remove filter with no children (all filtered out)
            return filter.children.length > 0;
        });
    }

    renderFilters(filters) {
        return this.getFilteredFilters(filters).map(this.renderFilter.bind(this));
    }

    renderFilter(filter) {
        return (
            <div className={classNames(styles.filter)} key={filter.name}>
                <span>{filter.name}</span>
                <ul>
                    {this.renderItems(filter.children)}
                </ul>
            </div>
            
        );
    }

    renderItems(items) {
        return items.map(this.renderItem.bind(this));
    }

    renderItem(item) {
        return (
            <li 
                key={item.name} 
                onClick={(e) => {
                    this.props.onSelect(e.target.textContent)
                }}>{item.name}</li>
        )
    }

    constructor(props) {
        super(props);

        this.state = { searchValue: '' };
    }

    render() {
        return (
            <div className={classNames(this.props.rootStyle)}>
                <SearchField 
                    value={this.state.searchValue} 
                    onChange={(value) => {
                        this.setState({
                            searchValue: value
                        });
                    }}
                    rootStyle={styles.search} />
                <div className={classNames(styles.filters)}>
                    {this.renderFilters(this.props.filters)}
                </div>
            </div>
        )
    }

}
