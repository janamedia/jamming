import React from 'react';
import './SearchBar.css';

// import Spotify from '../../util/Spotify';

class SearchBar extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            term: ''
        }

        this.search = this.search.bind(this);
        this.handleTermChange = this.handleTermChange.bind(this);
    }

    // search() {
    //     let searchProm = Spotify.search(this.state.term);
    //     console.log(searchProm);
    //     if (searchProm){
    //         this.props.update(searchProm);
    //     }
    //     // then(searchResults => {
    //     //  this.props.update(searchResults);
    //     // })
    //     // this.props.onSearch(this.state.term);
    //     // console.log(this.state.term);
        
    // }    

    search() {
        this.props.onChange(this.state.term)
    }
    

    handleTermChange(event){
        this.setState({term: event.target.value})
        console.log(this.state.term);
        this.search()
    }



    componentDidMount() {
        const searchOne = document.getElementById('Search')
        searchOne.addEventListener("search", this.search)
    }

    render () {
        return (
            <div className="SearchBar" >
               <input id='Search' type='search' onChange={this.handleTermChange} placeholder="Enter A Song, Album or Artist" />
        
               <button className="SearchButton" type='submit'>Search</button>
            </div>
        )
    }
    }

export default SearchBar;