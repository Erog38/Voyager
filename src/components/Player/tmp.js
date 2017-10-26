// Work In Progress. 😝
// Wanna convert this a Redux app when I have the following features stubbed out:
// • Add Data Visualiztions
// • Add scrubbing
// • Full Screenage
// • Hook up to Soundcloud api
//   - Build SoundCloud search

/*
    Artists
    ===========================
    Andrew Bird
    http://www.andrewbird.net/

    Portugal, The Man.
    http://www.portugaltheman.com
    ===========================
*/

// Config
let helpers = {
    secondsToHMS: function(d) {
        d = Number(d);
        var h = Math.floor(d / 3600);
        var m = Math.floor(d % 3600 / 60);
        var s = Math.floor(d % 3600 % 60);
        return ((h > 0 ? h + ":" + (m < 10 ? "0" : "") : "") + m + ":" + (s < 10 ? "0" : "") + s); 
    },
    randomProperty: function (obj) {
        var keys = Object.keys(obj)
        return obj[keys[ keys.length * Math.random() << 0]];
    },
    cycleThroughObject: (obj, i) => {
        var keys = Object.keys(obj);
        i < keys.length ? i++ : i = 0;
        return i
    },
    getAverageVolume: (array) => {
        var values = 0;
        var average;

        var length = array.length;

        // get all the frequency amplitudes
        for (var i = 0; i < length; i++) {
            values += array[i];
        }

        average = values / length;
        return average;
    },
    hexToRgb: (hex) => {
        hex.replace("#", "");
        var bigint = parseInt(hex, 16);
        var r = (bigint >> 16) & 255;
        var g = (bigint >> 8) & 255;
        var b = bigint & 255;

        return r + "," + g + "," + b;
    }
}
let darkTheme = {
    overlayBg: "rgba(40,40,40,0.9)",
    textColor: "#eee",
    iconColor: "#fff",
    playButtonColor: "#000",
    brightTone: "#898787",
    lightTone: "#333333",
    midTone: "#222222",
    darkTone: "#111111",
    gradient: {
        primary: "#557c89",
        secondary: "#ace33b",
        tertiary: "#ffcf06"
    },
    visualizer: {
        rippleColor: "#557c89",
        barColor:"#fff"
    }
}
let lightTheme = {
    overlayBg: "rgba(255,255,255,0.9)",
    textColor: "#333",
    iconColor: "#3BD0E3",
    playButtonColor: "#fff",
    brightTone: "#fafafa",
    lightTone: "#eee",
    midTone: "#aaaaaa",
    darkTone: "#777",
    gradient: {
        primary: "#7E5589",
        secondary: "#3BD0E3",
        tertiary: "#FF067E"
    },
    visualizer: {
        rippleColor: "#FF067E",
        barColor:"#3BD0E3"
    }
}

//////////////////
// Player
//////////////////
/* 
    The meat and potatoes... of a somewhat messy, but very tasty, soup.
*/
class MusicPlayer extends React.Component {
    constructor(props) {
        super(props);
        /*
            In componentDidMount we set this to reference the 
            corresponding <audio> DOM node so it is available as a global reference.
            There is probably a better way to do this. Look into it, Tedd.
        */
        this.audioNode;

        this.state = {
            hover: false,
            isPlaying: false,
            currentSongTimeElapsed: 0,
            currentSongDuration: 0,
            theme: this.props.theme,
            showOverlay: null,
            audioNodeId: "audioNode" + this.props.id,
            layoutConfig: {
                playerWidth: 360,
                scrubberBar: {
                    height: 7
                }
            }
        }
    }
    componentDidMount() {
        // Give our player component a global variable that references the corresponding HTML <audio> tag
        this.audioNode = document.getElementById(this.state.audioNodeId);

        /* 
            Song
            -----------------
            Setting up events that observe the audio element's actions
            = Play
            = Pause
            = Update elapsed time
        */
        var song = this.audioNode;
        // Set the duration time
        song.onloadedmetadata = () => this.setState({currentSongDuration: song.duration});
        // Update the elapsed playtime
        song.ontimeupdate = () => this.updateTime();
        // Update when played
        song.onplay = () => this.setState({isPlaying: true})
        // Update when paused
        song.onpause = () => this.setState({isPlaying: false})
    }

    /* 
       Audio Events
    */
    updateTime(){
        var currentTime = this.audioNode.currentTime;
        this.setState({currentSongTimeElapsed : currentTime})
    }
    pauseAudio() {
        this.audioNode.pause();
        this.setState({isPlaying: false});
    }
    playAudio() {
        // Pause all first
        // Eventually we will want to move this to a isPlaying react state... Probably Redux, ya know?
        var audioNodes = document.getElementsByTagName("audio");
        _.each(audioNodes, (n) => document.getElementById(n.id).pause());

        // Play selected song
        this.audioNode.play();
    }

    /* 
       Interaction Event Handlers
    */
    handleMouseEnter() {
        this.setState({hover: true})
    }
    handleMouseLeave() {
        this.setState({hover: false})
    }

    /* 
       Switch Theme
    */
    setTheme(theme) {
        if (theme == "Dark") {
            this.setState({theme: darkTheme});
        } else {
            this.setState({theme: lightTheme});
        }
    }

    enlargePlayer() {
        this.state.layoutConfig.playerWidth = 500;
        this.setState({layoutConfig : this.state.layoutConfig})
    }
    shrinkPlayer() {
        this.state.layoutConfig.playerWidth = 250;
        this.setState({layoutConfig : this.state.layoutConfig})
    }
    showOverlay() {
        this.setState({showOverlay: true});
    }
    hideOverlay() {
        this.setState({showOverlay: false});
    }
    /* 
       Styles
    */
    getStyles() {
        var hover = this.state.hover,
            isPlaying = this.state.isPlaying;
        return {
            background: "#fff",
            position: "relative",
            //overflow: "hidden",
            width: this.state.layoutConfig.playerWidth,
            transform: hover || isPlaying ? "translateY(-3px)" : "",
            boxShadow: hover || isPlaying ? "2px 6px 20px 0px rgba(0,0,0,0.6)" : "1px 0px 4px 0px rgba(0,0,0,0.66)",
            transition: "all ease 0.3s",
            margin: 10
        }    
    }
    /* 
       Render Methods
    */
    renderOverlay() {
        if (this.state.showOverlay) {
            return (
                <MusicPlayerOverlay
                    theme={this.state.theme}
                    hideOverlay={this.hideOverlay.bind(this)}>
                </MusicPlayerOverlay>
            )
        }
    }
    renderUtilities() {
        if (this.props.utilities) {
            return (
                <MusicPlayerUtilityBelt
                    isPlaying={this.state.isPlaying}
                    showOverlay={this.showOverlay.bind(this)}
                    theme={this.state.theme}
                    enlarge>
                </MusicPlayerUtilityBelt>
            )
        }
    }

    render() {
        return (
            <div id="music-player"
                ref="musicPlayer"
                style={this.getStyles()}
                onTouchStart={this.handleMouseEnter.bind(this)}
                onTouchEnd={this.handleMouseLeave.bind(this)}
                onMouseEnter={this.handleMouseEnter.bind(this)}
                onMouseLeave={this.handleMouseLeave.bind(this)}>
                {/*
                <ThemeToggle 
                    setTheme={this.setTheme.bind(this)}
                    theme={this.state.theme}
                    playerHover={this.state.hover}></ThemeToggle>*/}
                <AlbumArt
                    albumArt={this.props.albumArt}
                    hover={this.state.hover}
                    isPlaying={this.state.isPlaying}
                    theme={this.state.theme}
                    trackInfo={this.props.trackInfo}
                    playerId={this.props.id}></AlbumArt>
                <VisualizerContainer
                    visualizerType={this.props.visualizerType}
                    playerId={this.props.id}
                    audioNodeId={this.state.audioNodeId}
                    theme={this.state.theme}
                    isPlaying={this.state.isPlaying}
                    playerWidth={this.state.layoutConfig.playerWidth}>
                </VisualizerContainer>
                <MusicPlayerControls
                    audioNode={this.audioNode}
                    isPlaying={this.state.isPlaying}
                    play={this.playAudio.bind(this)}
                    pause={this.pauseAudio.bind(this)}
                    theme={this.state.theme}
                    layoutConfig={this.state.layoutConfig}
                    currentSongTimeElapsed={this.state.currentSongTimeElapsed}
                    currentSongDuration={this.state.currentSongDuration}></MusicPlayerControls>
                {this.renderUtilities()}
                {this.renderOverlay()}
                <AudioElement
                    playerId={this.props.id}
                    trackUrl={this.props.trackUrl}
                    isPlaying={this.state.isPlaying}>
                </AudioElement>
            </div>
        )
    }
}
class AudioElement extends React.Component {
    componentDidMount() {
        if (this.props.isPlaying) {
            this.refs.audioNode.play();
        }
    }
    render() {
        var id = "audioNode" + this.props.playerId,
            trackUrl = this.props.trackUrl;
        return (
            <audio 
                id={id} 
                ref={id} 
                src={trackUrl}
                crossOrigin="anonymous">
                Your browser does not support the audio tag.
            </audio>
        )
    }
}

// Controls
class MusicPlayerControls extends React.Component {
    getStyles() {
        var bgColor = this.props.theme == darkTheme ? this.props.theme.midTone : this.props.theme.brightTone;
        return {
            background: bgColor,
            color: "#fff",
            height: 40,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
            overflow: "visible",
            position: "relative",
            zIndex: 101
        }
    }
    getScrubTimeStyles() {
        return {
            fontSize: "0.8em", 
            color: this.props.theme.textColor
        }
    }
    render() {
        return (
            <div style={this.getStyles()}>
                <div style={this.getScrubTimeStyles()}>{helpers.secondsToHMS(this.props.currentSongTimeElapsed)}</div>
                <PlayButton 
                    {...this.props}></PlayButton>
                <div style={this.getScrubTimeStyles()}>{helpers.secondsToHMS(this.props.currentSongDuration)}</div>
                <Scrubber 
                    {...this.props}>
                </Scrubber>
            </div>
        )
    }
}
class PlayButton extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            hover: false
        }
    }
    handleMouseEnter() {
        this.setState({hover: true})
    }
    handleMouseLeave() {
        this.setState({hover: false})
    }
    handleClick() {
        if (this.props.audioNode.paused) {
            this.props.play();
        } else {
            this.props.pause();
        }
    }

    getStyles() {
        var hover = this.state.hover,
            isPlaying = this.props.isPlaying,
            dark = this.props.theme == darkTheme;
        return {
            background: hover || isPlaying ? (dark ? "#111" : this.props.theme.iconColor) : null,
            color: "#fff",
            height: 60,
            width: 60,
            marginBottom: hover || isPlaying ? 10 : -10,
            borderRadius: "50%",
            alignSelf: "flex-end",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            transition: "all ease 0.3s"
        }
    }
    render() {
        var hover = this.state.hover,
            isPlaying = this.props.isPlaying,
            icon = isPlaying ? <PauseIcon theme={this.props.theme} active={hover || isPlaying}></PauseIcon> : <PlayIcon theme={this.props.theme} active={hover || isPlaying}></PlayIcon>;
        return (
            <div style={this.getStyles()}
                onClick={this.handleClick.bind(this)}
                onMouseEnter={this.handleMouseEnter.bind(this)}
                onMouseLeave={this.handleMouseLeave.bind(this)}>
                {icon}
            </div>
        )
    }
}
class AlbumArt extends React.Component {
    getStyles() {
        return {
            width: "100%",
            height: "auto",
            display: "block",
            position: "relative",
            margin: 0,
            overflow: "hidden"
        }
    }
    render() {
        var id = this.props.playerId + "AlbumArt",
            imgId= this.props.playerId + "AlbumArtImg"
        return (
            <div 
                id={id}
                style={this.getStyles()}>
                <TrackInfoOverlay 
                    {...this.props}>
                </TrackInfoOverlay>
                <img 
                    id={imgId}
                    ref="art"
                    style={{width: "100%", transform: "translateZ(0)"}}
                    src={this.props.albumArt} />
            </div>
        )
    }
}
class TrackInfoOverlay extends React.Component {
    getStyles() {
        var hover = this.props.hover,
            isPlaying = this.props.isPlaying,
            dark = this.props.theme == darkTheme,
            tone = dark ? this.props.theme.midTone : this.props.theme.brightTone;
        return {
            width: "100%",
            height: "auto",
            background: "linear-gradient(transparent, " + tone + ")",
            display: "block",
            margin: 0,
            position: "absolute",
            zIndex: 100,
            bottom: 0,
            left: 0,
            padding: "100px 20px 20px",
            color: dark ? "#fff" : "#333",
            transition: "all ease 0.5s",
            textShadow: dark ? "2px 2px 2px rgba(0,0,0,0.5)" : "2px 2px 2px rgba(255,255,255,0.5)",
            transform: hover || isPlaying ? "translateY(0%)" : "translateY(100%)"
        }
    }

    getNowPlayingStyles() {
        var isPlaying = this.props.isPlaying,
            dark = this.props.theme == darkTheme;
        return {
            fontSize: "0.5em",
            background: dark ? "rgba(0,0,0,0.8)" : "rgba(255,255,255,0.8)",
            padding: "5px 10px",
            margin: "10px 0px",
            borderRadius: 3,
            fontWeight: 700,
            opacity: isPlaying ? 1 : 0,
            transform: isPlaying ? "translateY(0px)" : "translateY(-20px)" ,
            textTransform: "uppercase"
        }
    }
    render() {
        var isPlaying = this.props.isPlaying,
            nowPlaying = isPlaying ? "Now Playing" : null;
        return (
            <div style={this.getStyles()}>
                <span style={this.getNowPlayingStyles()}>Now Playing</span>
                <h3 style={{margin: "10px 0px", fontSize: "1.8em"}}>{this.props.trackInfo.artist || null}</h3>
                <p style={{margin: "5px 0px"}}>{this.props.trackInfo.title || null}</p>
                <p style={{margin: "10px 0px", fontSize: "0.8em", fontStyle: "italic"}}>{this.props.trackInfo.album || null}</p>
            </div>
        )
    }
}

// Scrubber
class Scrubber extends React.Component {
    getStyles() {
        return {
            width: "100%",
            height: "auto",
            position: "absolute",
            bottom: -this.props.layoutConfig.scrubberBar.height, 
            left: 0
        }
    }
    render() {
        var handle = this.props.isPlaying ? <ScrubberHandle elapsed={this.props.elapsed} duration={this.props.duration}></ScrubberHandle> : null;
        return (
            <div id="scrubber"
                style={this.getStyles()}>
                <ScrubberBar 
                    {...this.props}></ScrubberBar>
                {handle}
            </div>
        )
    }
}
class ScrubberBar extends React.Component {
    getStyles() {
        return {
            width: "100%",
            height: this.props.layoutConfig.scrubberBar.height,
            position: "absolute",
            bottom: 0, left: 0,
            transition: "all ease 0.3s"
        }
    }
    render() {
        var classes = this.props.theme == darkTheme ? "scrollingGradientBackground dark" : "scrollingGradientBackground";
        return (
            <div style={this.getStyles()}
                className={classes}>
            </div>
        )
    }
}
class ScrubberHandle extends React.Component {
    constructor() {
        super();

        this.state = {
            hover: false
        }
    }
    handleMouseOver() {
        this.setState({hover: true});
    }
    handleMouseOut() {
        this.setState({hover: false});
    }
    getStyles() {
        var hover = this.state.hover,
            scrubberPosition = (this.props.elapsed / this.props.duration * 100);
        return {
            width:  hover ? 20 : 15,
            height:  hover ? 20 : 15,
            position: "absolute",
            top: hover ? -15 : -10, 
            left: scrubberPosition + "%",
            borderRadius: "50%",
            border: "solid 2px #ddd",
            transition: "all ease 0.2s",
            cursor: "ew-resize",
            background: "radial-gradient(#fff, #ddd)",
            boxShadow: hover ? "0px 0px 8px 2px rgba(255,255,255,0.5), inset 0px 0px 2px rgba(0,0,0,0.4)" : "0px 0px 4px 0px rgba(0,0,0,0.3), inset 0px 0px 2px rgba(0,0,0,0.3)",
        }
    }
    render() {
        return (
            <div style={this.getStyles()}
                onMouseOver={this.handleMouseOver.bind(this)}
                onMouseOut={this.handleMouseOut.bind(this)}>
            </div>
        )
    }
}

// Utility Belt
class MusicPlayerUtilityBelt extends React.Component {
    getStyles() {
        return {
            width: "100%",
            height: "auto",
            background: this.props.theme.lightTone,
            display: "flex",
            position: "relative",
            zIndex: 100
        }
    }
    getLiStyles() {
        return {
            listStyle: "none",
            flex: "1 0 auto",
            textAlign: "center",
            color: "#eee",
            textTransform: "uppercase",
            fontSize: "8px",
            letterSpacing: "1px",
            padding: "12px 0px 8px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexFlow: "row wrap"
        }
    }
    getIconStyles() {
        return {
            height: 18
        }
    }
    getTitleStyles() {
        return {
            flex: "2 0 100%",
            marginTop: 12,
            color: this.props.theme.textColor
        }
    }
    render() {
        return (
            <div style={this.getStyles()}>
                <li style={this.getLiStyles()}
                    onClick={this.props.showOverlay}>
                    <div style={this.getLiStyles()}>
                        <VisualizerIcon 
                            style={this.getIconStyles()}
                            theme={this.props.theme}>
                        </VisualizerIcon>
                        <span style={this.getTitleStyles()}>Visualizer</span>
                    </div>
                </li>
                <li style={this.getLiStyles()}
                    onClick={this.props.showOverlay}>
                    <div style={this.getLiStyles()}>
                        <SearchIcon 
                            style={this.getIconStyles()}
                            theme={this.props.theme}>
                        </SearchIcon>
                        <span style={this.getTitleStyles()}>Search</span>
                    </div>
                </li>
                <li style={this.getLiStyles()}
                    onClick={this.props.showOverlay}>
                    <div style={this.getLiStyles()}>
                        <FullScreenIcon 
                            style={this.getIconStyles()}
                            theme={this.props.theme}>
                        </FullScreenIcon>
                        <span style={this.getTitleStyles()}>Enlarge</span>
                    </div>
                </li>
            </div>
        )
    }
}
//Utility Overlay
class MusicPlayerOverlay extends React.Component {
    getOverlayStyles() {
        return {
            width: "100%",
            height: "100%",
            background: this.props.theme.overlayBg,
            display: "flex",
            position: "absolute",
            top: 0, left: 0,
            zIndex: 101
        }
    }
    getCloseIconStyles() {
        var dark = this.props.theme == darkTheme;
        return {
            padding: 10,
            position: "absolute",
            right: 10, top: 10,
            background: dark ? null : "#fff"
        }
    }
    render() {
        var dark = this.props.theme == darkTheme;
        return (
            <div style={this.getOverlayStyles()}>
                <CloseIcon
                    onClick={this.props.hideOverlay}
                    color={dark ? "#fff" : this.props.theme.iconColor}
                    style={this.getCloseIconStyles()}></CloseIcon>
            </div>
        )
    }
}

// Visualizer
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

// Icons
/*
    Hey Tedd! Convert these to stateless components, eh?!
*/
class VisualizerIcon extends React.Component {
    render() {
        return (
            <svg onClick={this.props.onClick} version="1.1" id="Layer_1" x="0px" y="0px" height={this.props.style.height}
                viewBox="0 0 263.1 200.4" enable-background="new 0 0 263.1 200.4">
                <g id="hF24br.tif">
                    <g>
                        <path fill={this.props.theme.iconColor} d="M138.1,100.2c0,31.5-0.2,62.9,0.2,94.4c0.1,6.1-3,5.6-7,5.7c-4.4,0.2-6.5-0.5-6.4-5.8
                                                                   c0.1-54.9,0-109.9-0.1-164.8c0-8.2,0.3-16.3,0.1-24.5c-0.1-3.7,0.8-5.4,4.9-5.2c9.7,0.4,8.3-0.7,8.3,8.3
                                                                   C138.2,38.9,138.1,69.6,138.1,100.2z"/>
                        <path fill={this.props.theme.iconColor} d="M113.1,99.2c0,23.5-0.1,46.9,0.1,70.4c0,4.7-1.4,6-5.9,5.8c-7.3-0.3-7.3-0.1-7.4-7.2
                                                                   c-0.1-41.3-0.1-82.6-0.2-123.8c0-5.7,0.3-11.3,0.1-17c-0.1-3.3,1.2-4.3,4.4-4.2c10.6,0.2,8.8-0.8,8.8,8.7
                                                                   C113.2,54.2,113.1,76.7,113.1,99.2z"/>
                        <path fill={this.props.theme.iconColor} d="M163.1,99.3c0,20.8-0.1,41.6,0.1,62.4c0,4.3-1.1,5.9-5.6,5.6c-8.8-0.4-7.7,0.6-7.7-7.9
                                                                   c0-40.8,0-81.6,0-122.3c0-1.9,0.7-5.4,1.5-5.6c3.5-0.5,7.2-0.2,10.8,0.2c0.5,0.1,0.8,3,0.8,4.6C163.2,57.4,163.1,78.3,163.1,99.3z
                                                                   "/>
                        <path fill={this.props.theme.iconColor} d="M63.1,99.3c0,14-0.1,27.9,0.1,41.9c0.1,4.3-1.6,5.6-5.5,5.1c-1.1-0.1-2.3-0.1-3.5,0
                                                                   c-3.2,0.4-4.4-1-4.3-4.3c0.1-10.8-0.1-21.6-0.1-32.4c0-17.5,0.2-34.9,0.1-52.4c0-4.3,1.6-5.6,5.5-5.1c1.1,0.1,2.3,0.1,3.5,0
                                                                   c3.2-0.4,4.4,1,4.3,4.3C63.1,70.6,63.1,84.9,63.1,99.3z"/>
                        <path fill={this.props.theme.iconColor} d="M174.9,98.6c0-9,0.2-18-0.1-26.9c-0.1-3.9,1.4-4.8,5-4.7c9.7,0.3,8.3-0.9,8.4,8.2
                                                                   c0.3,17.1-0.1,34.2,0,51.4c0,3.9-1.4,5.1-5,4.7c-1.5-0.2-3-0.1-4.5,0c-2.7,0.2-3.9-0.9-3.8-3.7C175,117.9,175,108.3,174.9,98.6
                                                                   C175,98.6,175,98.6,174.9,98.6z"/>
                        <path fill={this.props.theme.iconColor} d="M88.1,99.7c0,8.6-0.2,17.3,0.1,25.9c0.1,3.9-1.3,4.8-4.9,4.7c-9.7-0.3-8.3,0.8-8.3-8.2
                                                                   c-0.1-16.1,0.1-32.2-0.1-48.4c-0.1-4.2,0.8-6,5.4-5.7c8.9,0.4,7.7-0.7,7.8,7.8C88.2,83.7,88.1,91.7,88.1,99.7z"/>
                        <path fill={this.props.theme.iconColor} d="M38.1,99.3c0,4-0.1,8,0,11.9c0.1,3-1,4-4,4.1c-8.9,0.2-9.1,0.4-9.3-8.3c-0.2-6.6,0.2-13.3,0-19.9
                                                                   c-0.1-3,1-4,4-4.1c8.9-0.2,9-0.4,9.3,8.3c0.1,2.6,0,5.3,0,8C38.2,99.3,38.2,99.3,38.1,99.3z"/>
                        <path fill={this.props.theme.iconColor} d="M213.1,99c0,3.5-0.3,7,0.1,10.4c0.4,4.1-1.5,5.3-5.2,4.9c-1-0.1-2-0.1-3,0c-3.8,0.5-5.3-0.9-5.1-4.9
                                                                   c0.3-6.8,0.3-13.6,0-20.4c-0.2-4.1,1.5-5.3,5.2-4.9c1,0.1,2,0.1,3,0c3.8-0.5,5.5,0.9,5.1,5C212.9,92.3,213.1,95.7,213.1,99z"/>
                        <path fill={this.props.theme.iconColor} d="M13.3,99.3c0,7.4-4.5,10.5-11.6,7.7c-0.7-0.3-1.6-1.3-1.6-2.1c-0.1-4-0.1-7.9,0-11.9
                                                                   c0-0.7,1.1-1.5,1.8-1.8c0.9-0.3,2-0.2,3-0.2C13.3,91,13.3,91,13.3,99.3z"/>
                        <path fill={this.props.theme.iconColor} d="M225.1,91.2c4.5,0,8.6,0,13,0c0,5.3,0,10.4,0,15.9c-4.2,0-8.4,0-13,0C225.1,101.9,225.1,96.8,225.1,91.2z"
                            />
                        <path fill={this.props.theme.iconColor} d="M263.1,94.2c0,3.5,0,6.5,0,9.9c-4.3,0-8.4,0-12.9,0c0-3.2,0-6.4,0-9.9C254.3,94.2,258.4,94.2,263.1,94.2z"
                            />
                    </g>
                </g>
            </svg>
        )
    }
}
class SearchIcon extends React.Component {
    render() {
        return (
            <svg height={this.props.style.height} viewBox="0 0 18 17" version="1.1">
                <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <g id="Group" transform="translate(-174.000000, -15.000000)" fill={this.props.theme.iconColor}>
                        <path d="M184.037798,27.0294582 C186.885432,26.3541691 189,23.8455695 189,20.8541667 C189,17.3448573 186.089851,14.5 182.5,14.5 C178.910149,14.5 176,17.3448573 176,20.8541667 C176,23.8458689 178.114992,26.3546712 180.963057,27.0296609 C180.855406,27.2535459 180.795082,27.5046315 180.795082,27.769954 L180.795082,32.792546 C180.795082,33.7355468 181.551835,34.5 182.5,34.5 C183.4416,34.5 184.204918,33.7363468 184.204918,32.792546 L184.204918,27.769954 C184.204918,27.5046387 184.145014,27.2534571 184.037798,27.0294582 Z M182.553279,25.75 C185.289804,25.75 187.508197,23.5813793 187.508197,20.90625 C187.508197,18.2311207 185.289804,16.0625 182.553279,16.0625 C179.816753,16.0625 177.598361,18.2311207 177.598361,20.90625 C177.598361,23.5813793 179.816753,25.75 182.553279,25.75 Z" id="Oval-1" transform="translate(182.500000, 24.500000) rotate(50.000000) translate(-182.500000, -24.500000) "></path>
                    </g>
                </g>
            </svg>
        )
    }
}
class FullScreenIcon extends React.Component {
    render() {
        return (
            <svg style={this.props.style}
                viewBox="0 0 38 24" 
                width="20px"
                enable-background="new 0 0 38 24">
                <g>
                    <path fill={this.props.theme.iconColor} d="M0,0v24h38V0H0z M33,12H20V5h13V12z"/>
                </g>
            </svg>
        )
    }
}
class PlayIcon extends React.Component {
    render() {
        var active = this.props.active;
        return (
            <svg height="20px" 
                viewBox="0 0 39 42">
                <g id="Page-1" 
                    stroke="none" 
                    stroke-width="1" 
                    fill="none" 
                    fill-rule="evenodd">
                    <path 
                        d="M0.784313725,41.5 L0.784313725,0 L38.2156863,20.75 L0.784313725,41.5 Z" 
                        id="Triangle-15" 
                        fill={active ? "#fff" : this.props.theme.iconColor}>
                    </path>
                </g>
            </svg>
        )
    }
}
class PauseIcon extends React.Component {
    render() {
        var active = this.props.active;
        return (
            <svg height="20px" viewBox="0 0 23 23" version="1.1">
                <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <g id="Rectangle-68-+-Rectangle-62"  transform="translate(0.000000, 1.000000)" fill={active ? "#fff" : this.props.theme.iconColor}>
                        <rect id="Rectangle-68" x="0" y="-0.48" width="8.21428571" height="22.48"></rect>
                        <rect id="Rectangle-62" x="14.7857143" y="-0.48" width="8.21428571" height="22.48"></rect>
                    </g>
                </g>
            </svg>
        )
    }
}
class CloseIcon extends React.Component {
    render() {
        return (
            <svg version="1.1" id="Layer_1" x="0px" y="0px"
                height={this.props.height || "30px"}
                style={this.props.style}
                onClick={this.props.onClick}
                viewBox="0 0 11.8 11.8" enable-background="new 0 0 11.8 11.8">
                <line fill="none" stroke={this.props.color} stroke-width="3" stroke-linejoin="bevel" stroke-miterlimit="10" x1="1.1" y1="1.1" x2="10.7" y2="10.7"/>
                <line fill="none" stroke={this.props.color} stroke-width="3" stroke-linejoin="bevel" stroke-miterlimit="10" x1="1.1" y1="10.7" x2="10.7" y2="1.1"/>
            </svg>
        ) 
    }
}

// Theme Toggle
class ThemeToggle extends React.Component {
    getStyles() {
        var dark = this.props.theme == darkTheme,
            playerHover = this.props.playerHover;
        return {
            position: "absolute",
            top: 10,
            right: 10,
            width: "auto",
            height: "auto",
            color: "#fff",
            padding: 4,
            zIndex: 101,
            transform: playerHover ? "translateX(0%)" : "translateX(0%)" ,
            transition: "all ease 0.5s",
            background: dark ? "rgba(0,0,0,0.66)" : "rgba(255,255,255,0.66)"
        }
    }
    render() {
        return (
            <div style={this.getStyles()}>
                <ThemeToggleButton title="Dark"
                    setAsActive={this.props.setTheme}></ThemeToggleButton>
                <ThemeToggleButton title="Light"
                    setAsActive={this.props.setTheme}></ThemeToggleButton>
            </div>
        )
    }
}
class ThemeToggleButton extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            hover: false
        }
    }
    handleClick() {
        this.props.setAsActive(this.props.title);
    }
    handleMouseEnter() {
        this.setState({hover: true})
    }
    handleMouseLeave() {
        this.setState({hover: false})
    }
    getStyles() {
        var hover = this.state.hover;
        return {
            padding: "6px 12px",
            cursor: "pointer",
            background: hover ? "rgba(0,0,0,0.75)": "rgba(0,0,0,0.5)",
            fontSize: 12
        }
    }
    render() {
        return (
            <div style={this.getStyles()}
                onClick={this.handleClick.bind(this)}
                onMouseEnter={this.handleMouseEnter.bind(this)}
                onMouseLeave={this.handleMouseLeave.bind(this)}>
                {this.props.title}
            </div>
        )
    }
}
