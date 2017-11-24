import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import PlayIcon from 'material-ui-icons/PlayArrow';
import PauseIcon from 'material-ui-icons/Pause';
import Button from 'material-ui/Button';


const styles = theme => ({
    root : {
        color: 'white',
        width: '100%',
        height: 100,
        position: 'relative',
    },
    button: {
        position: 'absolute',
        right: 0,
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

class Player extends Component {
    constructor(props){
        super(props);
    }

    componentDidMount() {
        const player = document.createElement("div");
        player.class = "radionomy-player"
        this.instance.appendChild(player)
        
        const script = document.createElement("script");
        script.type = 'text/javascript';
        script.async = true;
    	script.innerHTML= "(function (win, doc, script, source, objectName) { (win.RadionomyPlayerObject = win.RadionomyPlayerObject || []).push(objectName); win[objectName] = win[objectName] || function (k, v) { (win[objectName].parameters = win[objectName].parameters || { src: source, version: '1.1' })[k] = v; }; var js, rjs = doc.getElementsByTagName(script)[0]; js = doc.createElement(script); js.async = 1; js.src = source; rjs.parentNode.insertBefore(js, rjs); }(window, document, 'script', 'https://www.radionomy.com/js/radionomy.player.js', 'radplayer'));radplayer('url', 'voyagerelectronicradio');radplayer('type', 'mobile');radplayer('autoplay', '0');radplayer('volume', '50');radplayer('color1', '#000000'); radplayer('color2', '#ffffff');";
        this.instance.appendChild(script);

    }

    render() {
        return (
            <div>
            <div ref={el => (this.instance = el)} />
            <div className="radionomy-player"></div>
            </div>

        )
    }
}
export default withStyles(styles)(Player);

