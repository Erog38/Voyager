import React, { Component } from 'react';
import './App.css';
import Menu from './components/Menu';
import { MuiThemeProvider, createMuiTheme, withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Home from './views/home';
import Library from './views/library';
import About from './views/about';
import Blog from './views/blog';
import Header from './components/Header';
import { Switch, Route } from 'react-router-dom';

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
 classes=this.props.classes;
   render() {
       document.body.style.backgroundColor = 'rgb(33,33,33)'
    return (
        <MuiThemeProvider theme={theme}>
            <div class='App'>
                <Menu title="Voyager Radio" />
                <Paper className={this.classes.paper}>
                <Header/>
                <Switch>
                    <Route exact path='/' component={Home}/>
                    <Route path='/about' component={About}/>
                    <Route path='/library' component={Library}/>
                    <Route path='/blog' component={Blog}/>
                </Switch>
                </Paper>
            </div>
        </MuiThemeProvider>
    );
  }
}

export default withStyles(styles)(App);
