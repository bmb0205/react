import React, { Component } from 'react';
import { connect } from 'react-redux';

/**
 * Higher order component
 */
export default (ChildComponent) => {
    class ComposedComponent extends Component {

        // called after component is rendered
        componentDidMount() {
            this.shouldNavigateAway();
        }

        // called any time component receives new props
        componentDidUpdate() {
            this.shouldNavigateAway();
        }

        shouldNavigateAway() {
            if (!this.props.auth) {
                this.props.history.push('/')
            }
        }

        render() {
            return <ChildComponent {...this.props} />
        }
    }

    function mapStateToProps(state) {
        return {
            auth: state.auth
        };
    }

    return connect(mapStateToProps)(ComposedComponent);
};

