import React, { Component } from 'react';
import './App.css';
import Menu from './components/Menu';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import Home from './views/home';
import Library from './views/library';
import About from './views/about';
import { Switch, Route } from 'react-router-dom';


const theme = createMuiTheme({
    status: {
        primary: "rgba(116, 145, 161, 1)",
        secondary: "rgba(22, 87, 127, 1)",
    },
    background: {
        primary: "rgb(238,238,238)"
    }
});

class App extends Component {
  render() {
    return (
        <MuiThemeProvider theme={theme}>
            <div className="App">
                <Menu title="Voyager Radio" />
                <Switch>
                    <Route exact path='/' component={Home}/>
                    <Route path='/about' component={About}/>
                    <Route path='/library' component={Library}/>
                </Switch>
            </div>
        </MuiThemeProvider>
    );
  }
}

export default App;
