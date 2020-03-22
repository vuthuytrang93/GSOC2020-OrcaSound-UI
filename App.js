import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
// import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SpeakerIcon from '@material-ui/icons/SpeakerPhone';
import AccountCircle from '@material-ui/icons/AccountCircle';
import CardContent from '@material-ui/core/CardContent';
import ReactHLS from 'react-hls';
import GoogleMapReact from 'google-map-react';
import './App.css';

// Resources:
import townsend from './resources/townsend.jpg';


const streams = [
  {
    name: 'Port Townsend',
    url: 'https://s3-us-west-2.amazonaws.com/streaming-orcasound-net/rpi_bush_point/hls/1584145821/live.m3u8',
    lat: 47.737258,
    lng: -123.7650885
  },
  {
    name: 'Bush Point',
    url: 'https://s3-us-west-2.amazonaws.com/streaming-orcasound-net/rpi_bush_point/hls/1584145821/live.m3u8',
    lat: 48.0144277,
    lng: -122.570103
  },
  {
    name: 'Orcasound Lab',
    url: 'https://s3-us-west-2.amazonaws.com/streaming-orcasound-net/rpi_orcasound_lab/hls/1584149419/live.m3u8',
    lat: 48.5470407,
    lng: -123.339093
  }
];


var active = false;


function App() {

  /** TODO: handle play button */
  // function handlePlay(event) {
  //   var getStream = this.refs.vidRef;
  //   if (getStream.paused) {
  //     getStream.play();
  //   } else {
  //     getStream.pause();
  //   }
  //   console.log(event);
  // }

  // function handleCard(event) {
  //   console.log(event);
  //   isVisible = !isVisible;
  // };



  function TheCard() {
    active = !active;
    console.log(active);
    if (active) {
      return (
        <div className='floating-element'>
          <Card className='card'>
            <img alt="cover" className="card-sample" src={townsend}></img>
            <div className='{classes.details}'>
              <CardContent >
                <Typography component='h5' variant='h5'>
                  {streams[0].name}
                </Typography>
              </CardContent>
              <div >
                Live Sound
                <ReactHLS id='streaming' width='250px' height='50px' url={streams[0].url}> </ReactHLS>
                {/**
                 * TODO: HANDLE SEPARATE PLAY BUTTON
                 */
            /* <IconButton aria-label='play/pause'>
                  <PlayArrowIcon onClick={handlePlay} className='{classes.playIcon}' />
                </IconButton> */}
              </div>
              <div>
                <p>Help us identify the Orcas:</p>
                <div className="button-list">
                  <IconButton>  <span aria-label="human" role="img">😃</span></IconButton>
                  <IconButton color="primary"> <span aria-label="whales" role="img">🐋</span></IconButton>
                  <IconButton>  <span aria-label="ship" role="img">🚢</span></IconButton>
                  <IconButton>  <span aria-label="text-log" role="img">📝</span></IconButton>
                </div>
              </div>
              <div>
                <p>Sample Orca Sound:</p>
                <audio controls>
                  <source src="http://www.orcasound.net/data/product/SRKW/greatest-hits/orcasite-4min-sample.ogg" type="audio/ogg" />
                  <source src="http://www.orcasound.net/data/product/SRKW/greatest-hits/orcasite-4min-sample.mp3" type="audio/mpeg" />
                </audio>
              </div>
            </div>

          </Card>
        </div>
      )
    } else {
      return (
      <div>
        Test  
      </div>);
    };
  }

  const SoundLocation = ({ text }) =>
    <Tooltip title={text}>
      <Fab onClick={TheCard} className='marker'>
        <SpeakerIcon />
      </Fab >
    </Tooltip>;


  const locations = streams.map((stream) =>
    <SoundLocation
      key={stream.name}
      lat={stream.lat}
      lng={stream.lng}
      text={stream.name}
    />
  );

  return (
    <div className='App'>
      <AppBar position='static' className='top-app-bar'>
        <Toolbar className='app-bar'>
          <div></div>
          <Typography variant='h6' className='app-title'>
            Orcasound
          </Typography>
          <div>
            <IconButton><AccountCircle /></IconButton>
          </div>
        </Toolbar>
      </AppBar>

      <div className='maps' style={{ height: 'calc(100vh - 64px)', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'INSERT GOOOGLE MAP' }}
          defaultCenter={{ lat: 48.402665, lng: -121.3110077 }}
          defaultZoom={8}
        >
          {locations}
        </GoogleMapReact>
      </div>
      <TheCard />
    </div>
  );
}

export default App;
