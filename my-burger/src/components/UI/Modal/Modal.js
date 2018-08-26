import React, { Component } from 'react'
import classes from './Modal.css'

import Aux from '../../../hoc/Auxiliary/Aux'
import Backdrop from '../Backdrop/Backdrop'

class Modal extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        if(nextProps.visible !== this.props.visible
            && nextProps.children !== this.props.children
        ) {
            return true
        }
        return false
    }

    componentWillUpdate() {
        console.log('[Modal] willUpdate')
    }

    render () {
        return (
            <Aux>
                <Backdrop visible={this.props.visible} clicked={this.props.closeModal} />
                <div 
                    className={classes.Modal}
                    style={{
                        transform: this.props.visible ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.visible ? '1': '0'
                    }}>
                    {this.props.children}
                </div>
            </Aux>
        )
    }
}

export default Modal
