import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withStyles } from 'material-ui/styles';
import PlayIcon from 'material-ui-icons/PlayArrow';
import PauseIcon from 'material-ui-icons/Pause';
import Button from 'material-ui/Button';
import { fetchCurrentTrack } from '../../actions';
import Divider from 'material-ui/Divider';

const styles = theme => ({
    root : {
        border: 'rgba(255,255,255,0)',
        borderRadius: 10,
        overflow: 'hidden',
        color: 'white',
        width: '100%',
        height: 100,
        position: 'relative',
        backgroundSize: 'cover'
    },
    button: {
        position: 'absolute',
        right: 20,
        bottom: 22,
    },
    overlay: {
        position: 'absolute',
        top:0,
        backgroundColor:'rgba(33,33,33,.6)',
        width: '100%',
        height: '100%',
    },
    metadata: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    },
    title: {
        position:'absolute',
        left: 10,
        bottom: 40,
        fontSize: 15,
    },
    visualizer: {
        height:'100%',
        width: '100%'
    },
    artist: {
        position: 'absolute',
        left: 10,
        bottom: 10
    }

});

class Player extends Component {
    constructor(props){
        super(props);
        this.state = {isPlaying: false};
        this.createVisualization = this.createVisualization.bind(this)
    }                               

    componentDidMount(){
        this.props.fetchCurrentTrack();
        this.createVisualization();
    }
    componentWillReceiveProps(nextProps){
        setTimeout(this.props.fetchCurrentTrack, 30000);
    }

    handleClick() {
        const audioComponent = this.audioComponent;
        this.setState(prevState => ({
            isPlaying: !prevState.isPlaying
        }));
        if (!this.state.isPlaying){
            audioComponent.src = 'http://radio.philgore.net:8000/;?type=http&nocache=1'
            audioComponent.load()
            audioComponent.play();

        } else {
            audioComponent.src = ''
            audioComponent.load()
            audioComponent.pause();
        }
    }
                                                      
    createVisualization(){
        let context = new AudioContext();
        let analyser = context.createAnalyser();
        let canvas = this.analyzerCanvas;
        let ctx = canvas.getContext('2d');
        let audio = this.audioComponent;
        audio.crossOrigin = "anonymous";
        let audioSrc = context.createMediaElementSource(audio);
        audioSrc.connect(analyser);
        audioSrc.connect(context.destination);
        analyser.connect(context.destination);

        function renderFrame(){
            let freqData = new Uint8Array(analyser.frequencyBinCount)
            requestAnimationFrame(renderFrame)
            analyser.getByteFrequencyData(freqData)
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            ctx.fillStyle = '#1f23e4';
            let bars = 110;
            for (var i = 0; i < bars; i++) {
                let bar_x = i * 3;
                let bar_width = 2;
                let bar_height = -(freqData[i] / 2);
                ctx.fillRect(bar_x, canvas.height, bar_width, bar_height)
            }
        };
        renderFrame()
    }

    render() {
        return (
            <div style={{backgroundImage: 'url("' + this.props.currentTrack.album_art + '")'}} className={this.props.classes.root}>
                <audio preload="none" ref={(audio) => this.audioComponent = audio}>
                  <source src="http://radio.philgore.net:8000/;?type=http&nocache=1" type="audio/mpeg"/>
                  Your browser does not support the audio element.
                </audio>
        
            <canvas className={this.props.classes.visualizer} ref={a => this.analyzerCanvas = a} id="analyzer">
            </canvas>
            <div className={this.props.classes.overlay}>
                <div className={this.props.classes.metadata}>
                    <div className={this.props.classes.title}>
                        {this.props.currentTrack.title}
                    </div>
                    <Divider light/>
                    <div className={this.props.classes.artist}>
                        {this.props.currentTrack.artist}
                    </div>
                </div>
            </div>
            <Button fab color="primary" className={this.props.classes.button} onClick={this.handleClick.bind(this)}>
                {this.state.isPlaying 
                 ? <PauseIcon />
                 : <PlayIcon />
                }
            </Button>
            </div>

        )
    }
}
function mapStateToProps(state) {
    return {
        currentTrack: state.currentStore.currentTrack
    }
}

export default compose(withStyles(styles),connect(mapStateToProps, {fetchCurrentTrack}))(Player);
