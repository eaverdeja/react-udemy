import React, { Component } from 'react'
import Aux from '../Aux/Aux'
import Modal from '../../components/UI/Modal/Modal'

const withErrorHandler = (WrapperComponent, axios) =>
    class extends Component {
        state = {
            error: null,
        }

        componentWillMount () {
            this.requestInterceptor = axios.interceptors.request.use(req => {
                this.setState({ error: null })
                return req
            })
            this.responseInterceptor = axios.interceptors.response.use(
                res => res,
                error => this.setState({ error })
            )
        }
        
        componentWillUnmount () {
            axios.interceptors.request.eject(this.requestInterceptor)
            axios.interceptors.response.eject(this.responseInterceptor)
        }

        errorConfirmedHandler = () => this.setState({ error: null })

        render() {
            console.log(this.state.error)
            return (
                <Aux>
                    <Modal
                        visible={this.state.error}
                        closeModal={this.errorConfirmedHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrapperComponent {...this.props} />
                </Aux>
            )
        }
    }

export default withErrorHandler
