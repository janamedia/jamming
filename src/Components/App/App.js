import React from 'react';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import SearchBar from '../SearchBar/SearchBar';
import './App.css';


class App extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      searchResults: [
      {
        name: "TransparentSoul",
        artist: "WILLOW, Travis Barker",
        album: "Rand",
        id: '1'
      },

      {
        name: "FleaBag",
        artist: "YoungBlud",
        album: "Rand",
        id: '2'
      },

      {
        name: "Thunda Thighs",
        artist: "Moonchild Sanely",
        album: "Boobeams",
        id: '3'
      }

    ],

    playlistName: 'My Playlist',
    playlistTracks: [{name: "Thunda Thighs",artist: "Moonchild Sanely",album: "Boobeams",id: '3'
      },{
        name: "Thunda Thighs",
        artist: "Moonchild Sanely",
        album: "Boobeams",
        id: '3'
      }

    ]
  }

  this.addTrack = this.addTrack.bind(this);
  this.removeTrack = this.removeTrack.bind(this);

    


}

    addTrack(track) {
    let tracks = this.state.playlistTracks;
    if (tracks.find(savedTrack => savedTrack.id === track.id)){
      return;
    }

    tracks.push(track);
    this.setState({playlistTracks: tracks})

    }

    removeTrack(track) {
      let tracks = this.state.playlistTracks;
      tracks = tracks.filter(currentTrack => currentTrack.id !== track.id);

      this.setState({ playlistTracks: tracks});
    }
 



    render() {
    return (
      <div>
      <h1>Ja<span className="highlight">mmm</span>ing</h1>
      <div className="App">
        <SearchBar/>
        <div className="App-playlist">
         <SearchResults searchResults={this.state.searchResults}
           onAdd={this.props.onAdd}
           isRemoval={false}/> 
         <Playlist playlistName={this.state.playlistName}
          playlistTracks={this.state.playlistTracks}
          onRemove={this.removeTrack}/>
        </div>
      </div>
    </div>
    )
  }
}




export default App;
