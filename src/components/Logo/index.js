import React, { Component } from 'react';
import Divider from 'material-ui/Divider';
import { withStyles } from 'material-ui/styles';
import logo from '../../images/logo.png'

const styles = theme => ({
    root : {
        padding: '5px 5px',
        backgroundColor: '#212121',
        color: 'white'
    },
    logo: {
        width: "25%",
        float: 'left'
    },
    title: {
        fontSize: 21,
        fontWeight: 500,
        fontFamily: ["Roboto", "Helvetica", "Arial", 'sans-serif'],
        lineHeight:1,
        textAlign: 'center'
    },
    divider: {
    }
});

class Logo extends Component {
    render() {
        return (
            <div className={this.props.classes.root}>
                <img src={logo} alt="Logo" className={this.props.classes.logo}/>
                <h4 className={this.props.classes.title}>
                    {this.props.title}
                </h4>
                <Divider className={this.props.classes.divider} />
            </div>
        )
    }
}

export default withStyles(styles)(Logo);
