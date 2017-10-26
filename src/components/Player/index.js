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
        this.state = {playing: false};
    }
    
    togglePlay = () => {
        if (this.state.playing) {
          this.rap.pause();
        } else {
           this.rap.play();
        }
           this.setState({playing: !this.state.playing})
    }

    render() {
        return (
            <div className={this.props.classes.root}>
                <audio ref={(element) => {this.rap = element; }} >
                    <source src="http://streaming.shoutcast.com/VoyagerElectronicRadio" type="audio/mpeg"/>
                    Your browser does not support the audio element.
                </audio>
                <Button fab className={this.props.classes.button} onClick={this.togglePlay} color="primary" aria-label="add" >
                    { this.state.playing ? <PauseIcon/>:<PlayIcon/> }
                </Button>
            </div>
        )
    }
}

export default withStyles(styles)(Player);

// Visualizer
class Visualizer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: "player" + this.props.playerId + "Visualizer"
        }
    }

    componentDidMount() {
        /*
            MOVE ALL OF THIS
            - This all should go into the MusicPlayer component and be passed through as props
            - Figure out best way to store and pass the Analyser, Media Element, etc...

        */
        // Get the audio data and format it for clean handoff to D3.js
        var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        var audioElement = document.getElementById(this.props.audioNodeId);
        var audioSrc = audioCtx.createMediaElementSource(audioElement);
        var analyser = audioCtx.createAnalyser();

        // Bind our analyser to the media element source.
        audioSrc.connect(analyser);
        audioSrc.connect(audioCtx.destination);

        /*
           D3 setup
        */
        // Setup the SVG
        var svgHeight = document.getElementById(this.state.id + "Container").offsetHeight;
        var svgWidth = document.getElementById(this.state.id + "Container").offsetWidth;
        function createSvg(parent, height, width) {
            return d3.select(parent)
                .append('svg')
                .attr('height', height)
                .attr('width', width);
        }

        // Visualizer
        var graph = createSvg('#' + this.state.id, svgHeight, svgWidth);
        var frequencyData = new Uint8Array(255);
        switch (this.props.visualizerType) {
            case "RIPPLES":
                this.renderFrequencyRipples(graph, analyser, svgWidth, svgHeight)
                this.pulsateArt(analyser)
                break;
            case "BARS":
                this.renderFrequencyBars(graph, analyser, svgWidth, svgHeight)
                this.pulsateArt(analyser)
                break;
            default:
                this.renderFrequencyBars(graph, analyser, svgWidth, svgHeight)
                this.pulsateArt(analyser)
        }

    }

    renderFrequencyRipples(graph, analyser, svgWidth, svgHeight) {
        var i = 0;
        var frequencyData = new Uint8Array(svgWidth);
        var color = this.props.theme.visualizer.rippleColor;

        // NEED TO DO THIS THE REACT WAY!!
        // Continuously loop and update chart with frequency data.
        function renderChart() {
            requestAnimationFrame(renderChart);
            //var color = d3.hsl((i = (i + 1) % 360), 1, 0.66);
            //var color = helpers.randomProperty(gradient);
            // Copy frequency data to frequencyData array.
            analyser.getByteFrequencyData(frequencyData);

            graph.insert("circle", "rect")
                .data(frequencyData)
                .attr("cx", (d, i) => d * (svgWidth / frequencyData.length))
                .attr("cy", (d) =>  svgHeight + 10)
                .attr("r", 1e-6)
                .style("stroke", color)
                .style("stroke-opacity", 0.7)
                .transition()
                .duration(10000)
                .ease(Math.sqrt)
                .attr("r", 600)
                .style("stroke-opacity", 0.001)
                .remove();

        }
        // Run the loop
        renderChart();
    }

    pulsateArt(analyser) {
        var albumArt = document.getElementById(this.props.playerId + "AlbumArtImg");
        var frequencyData = new Uint8Array(8);
        
        function pulsate() {
            requestAnimationFrame(pulsate);
            // Copy frequency data to frequencyData array.
            analyser.getByteFrequencyData(frequencyData);
            // Get the average level
            var average = Math.ceil(helpers.getAverageVolume(frequencyData) / 10) * 10;
            // Pulsate the art
            albumArt.style.webkitFilter = "blur(" + average / 50 + "px)";
            albumArt.style.filter = "blur(" + average / 50 + "px)";
        }
        
        pulsate();
    }

    renderFrequencyBars(graph, analyser, svgWidth, svgHeight) {
        var barPadding = 1;
        var i = 0;
        var color = this.props.theme.visualizer.barColor;
        var gradient = this.props.theme.gradient;
        var frequencyData = new Uint8Array(133);
        graph.selectAll('rect')
            .data(frequencyData)
            .enter()
            .append('rect')
            .attr('fill', function(d) {
                //return d3.hsl((d = (d + 1) % 360), 1, 0.66)
                //return d3.hsl((i = (i + 1) % 360), 1, 0.66)
                return color
            })
            .attr('width', svgWidth / frequencyData.length - barPadding)
            .attr('x', function (d, i) {
                return i * (svgWidth / frequencyData.length);
            })

        // NEED TO DO THIS THE REACT WAY!!
        // Continuously loop and update chart with frequency data.
        function renderChart() {
            requestAnimationFrame(renderChart);
            
            // Copy frequency data to frequencyData array.
            analyser.getByteFrequencyData(frequencyData);

            // Update d3 chart with new data.
            graph.selectAll('rect')
                .data(frequencyData)
                .attr('y', function(d) {
                return svgHeight - d;
            })
                .attr('height', function(d) {
                return d;
            })
        }
        // Run the loop
        renderChart();
    }

    render() {
        return (
            <div id={this.state.id}>
            </div>
        )
    }
}


class VisualizerContainer extends React.Component {
    getStyles() {
        var dark = this.props.theme == darkTheme,
            isPlaying = this.props.isPlaying;
        // Get dimension of album art
        // These are the dimensions we will map the visualizer to... for now..
        var albumId = this.props.playerId + "AlbumArt",
            width = this.props.playerWidth,
            height = this.props.playerWidth;

        return {
            position: "absolute",
            top: 0,
            left: 0,
            width: width,
            height: height,
            zIndex: 99,
            transition: "all ease 0.7s",
            opacity: isPlaying ? 1 : 0,
            //background:  dark ? "rgba(20,20,20,0.2)" : "rgba(255,255,255,0.2)"
        }
    }
    render() {
        var id = "player" + this.props.playerId + "VisualizerContainer";
        return (
            <div id={id} style={this.getStyles()}>
                <Visualizer
                    {...this.props}>
                </Visualizer>
            </div>
        )
    }
}
