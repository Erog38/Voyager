
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withStyles } from 'material-ui/styles';
import Avatar from 'material-ui/Avatar';
import Typography from 'material-ui/Typography';
import List, { ListItem, ListItemText, ListItemAvatar } from 'material-ui/List';
import { fetchHistory } from '../../actions';

const styles = theme => ({
    root : {
        border: 'rgba(255,255,255,0)',
        borderRadius: 10,
        overflow: 'hidden',
        color: 'white',
        width: '100%',
        height: 400,
        position: 'relative',
        backgroundColor: 'rgb(33,33,33)',
    },
    scroller :{
        height: '95%',
        width: '100%',
        overflow: 'auto',
        paddingRight: 20,
    },
    title: {
        marginTop: 5,
        color: 'white',
    },
    listItem: {
        textDecoration: 'none',
    },
    list: {
        color: 'white',
    },
    text: {
        color: 'white',
        fontSize: 13
    }

});

class History extends Component {

    componentDidMount(){
        this.props.fetchHistory();
    }
    render() {
        let histItems = this.props.history.map((track) => {
            return (
                <a href={track.url} className={this.props.classes.listItem} key={track.track_id + Math.random()}>
                <ListItem button>
                  <ListItemAvatar>
                    <Avatar src={track.album_art}/>
                  </ListItemAvatar>
                  <ListItemText classes={{text: this.props.classes.text}}
                    primary={track.title}
                    secondary={track.artist}
                  />
                </ListItem>
                </a>
            )
        })

        return (
            <div className={this.props.classes.root}>
                    <Typography type="title" className={this.props.classes.title}>
                        Recently Played:
                    </Typography>
                <div className={this.props.classes.scroller}>
                    <div className={this.props.classes.list}>
                        <List>
                            {histItems}          
                        </List>
                    </div>
                </div>
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        history: state.historicStore.history
    }
}

export default compose(withStyles(styles),connect(mapStateToProps, {fetchHistory}))(History);
