import React, { Component } from 'react'
import axios from 'axios'
import { Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button } from 'reactstrap';

class Hero extends Component {
    render() {
        const imgStyle = {
            width: '50%'
        }
        const defaultImage = 'http://2.bp.blogspot.com/-F0t_asq3RTI/WpWpAo9ESpI/AAAAAAAAIoo/6z72ratIukELQf6UfO18AQFfkLC76fNhgCK4BGAYYCw/s1600/e6fa6b92decd26328f1f3616620b3e89.gif'
        return (
            <Card>
                <CardImg className="mx-auto d-block" style={imgStyle} src={this.props.photo || defaultImage}></CardImg>
                <CardBody>
                    <CardTitle>
                        <input
                            type="text"
                            className="form-control"
                            value={this.props.name}
                            onChange={this.props.changed.bind(this, this.props.id)}
                        />
                    </CardTitle>
                    <CardText>
                        Hi! My name is {this.props.name} and my full name is {this.props.fullName}.
                    </CardText>
                    <Button onClick={this.props.click.bind(this, this.props.id)}>Shout name!</Button>
                </CardBody>
            </Card>
        )
    }
}

export default Hero
