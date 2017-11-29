import React, { Component } from 'react';
import DocumentTitle from 'react-document-title';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';

class About extends Component {
    render() {
    return(
    <div>
        <DocumentTitle title="About Voyager"/>
        <Paper style={{
            padding: 10,
        }}>
        <Typography type="headline" >
            About Voyager:
        </Typography>
        <Divider/>
        <Typography type="body1"
            style={{
                marginTop: 10
            }}
        >
            Voyager started out with a simple idea in mind. To bring free simple music to anyone who wishes to listen. Using prior experience from working in the radio industry, I decided to make a simple internet radio station. This is something I've thought about doing for a long while now and am happy to see come to fruition. I hope in the future I can expand Voyager into a full fledged radio streaming platform for others to utilize and make it as simple as possible to get started in the music or streaming industry. Voyager symbolizes a big piece of where I come from and my personal background, and I hope you enjoy just as well.
        <br/>
        <br/>
        Phil Gore
        </Typography>
        </Paper>
   </div>
    );
    }
}

export default About;

