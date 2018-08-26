import React, { Component } from 'react';
import { connect } from 'react-redux'
import {
    increment,
    DECREMENT,
    ADD,
    SUBTRACT,
    STORE_RESULT,
    DELETE_RESULT
} from '../../store/actions/actions'

import CounterControl from '../../components/CounterControl/CounterControl';
import CounterOutput from '../../components/CounterOutput/CounterOutput';

class Counter extends Component {
    render () {
        return (
            <div>
                <CounterOutput value={this.props.counter} />
                <CounterControl
                    label="Increment"
                    clicked={this.props.onIncrementCounter} />
                <CounterControl
                    label="Decrement"
                    clicked={this.props.onDecrementCounter}  />
                <CounterControl
                    label="Add 5"
                    clicked={() => this.props.onAddCounter(5)}  />
                <CounterControl
                    label="Subtract 5"
                    clicked={() => this.props.onSubtractCounter(5)}  />
                <hr/>
                <button
                    onClick={() => this.props.onStoreResult(this.props.counter)}>
                    Store Result
                </button>
                <ul>
                    {this.props.results.map(result => (
                        <li
                            key={result.id}
                            onClick={() => this.props.onDeleteResult(result.id)}>
                            {result.value}
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

const mapStateToProps = ({ counter, results }) => ({
    counter: counter.value,
    results: results.values
})

const mapDispatchToProps = dispatch => ({
    onIncrementCounter: () => dispatch(increment()),
    onDecrementCounter: () => dispatch({type: DECREMENT}),
    onAddCounter: (value) => dispatch({type: ADD, value}),
    onSubtractCounter: (value) => dispatch({type: SUBTRACT, value}),
    onStoreResult: (value) => dispatch({type: STORE_RESULT, value}),
    onDeleteResult: (id) => dispatch({type: DELETE_RESULT, id}),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Counter)
