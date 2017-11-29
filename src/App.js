import './App.css';
import React, { Component } from 'react';
import Menu from './components/Menu';
import { MuiThemeProvider, createMuiTheme, withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Header from './components/Header';
import Main from './views/main';

const theme = createMuiTheme({
    palette: {
        primary: {
         "50": "#e3f2fd",
         "100": "#bbdefb",
         "200": "#90caf9",
         "300": "#64b5f6",
         "400": "#42a5f5",
         "500": "#212121",
         "600": "#1e88e5",
         "700": "#1976d2",
         "800": "#1565c0",
         "900": "#0d47a1",
         "A100": "#82b1ff",
         "A200": "#448aff",
         "A400": "#2979ff",
         "A700": "#2962ff",
         "contrastDefaultColor": "light"
        },
    },
    background: {
        primary: "rgb(238,238,238)"
    }
});

const styles = theme => ({
    paper: {
        backgroundColor:'rgb(235,235,235)',
        maxWidth: 1000,
        padding: 10,
        margin: 'auto',
        marginTop: 64
    }
});

class App extends Component {    
       
   render() {
       var { classes } = this.props;
       document.body.style.backgroundColor = 'rgb(33,33,33)'


    return (
        <MuiThemeProvider theme={theme}>
            <div >
                <Menu title="Voyager Radio" />
                <Paper className={classes.paper}>
                    <Header/>
                    <Main/>
                </Paper>
            </div>
        </MuiThemeProvider>
    );
  }
}                   
export default withStyles(styles)(App);
