const clientID = 'a6ef67b0fb654fd7b43f07d6de3b1b4e';
// const clientSecret = '49ae1e107cf641a4a0edff132bd2b88e';

const redirectURI = 'http://localhost:3000/';

let accessToken;


let Spotify = {
    

    getAccessToken(){
       if(accessToken){
       
           return accessToken
       } else {

        // check for token match

        const tokenMatch= window.location.href.match(/access_token=([^&]*)/);
        const tokenExpirationMatch = window.location.href.match(/expires_in=([^&]*)/)
        
        if (tokenMatch && tokenExpirationMatch) {
            accessToken = tokenMatch[1];
            const tokenExpiration = tokenExpirationMatch[1];
            // Clears params to get new token on expiration
            window.setTimeout(() => accessToken = '', tokenExpiration * 1000);
            window.history.pushState('token', null, '/');
            return accessToken;
        } else {
            // const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
            // var url = 'https://accounts.spotify.com/authorize';
            // url += '?response_type=token';
            // url += '&client_id=' + clientID;
            // url += '&scope=' + 'scope=playlist-modify-public';
            // url += '&redirect_uri=' + redirectURI;
            // url += '&state=' + encodeURIComponent(state);

            let scope = 'playlist-modify-public';

            var url = 'https://accounts.spotify.com/authorize';
            url += '?response_type=token';
            url += '&client_id=' + encodeURIComponent(clientID);
            url += '&scope=' + encodeURIComponent(scope);
            url += '&redirect_uri=' + encodeURIComponent(redirectURI);
            // url += '&state=' + encodeURIComponent(state);

            const accessUrl = url;



            window.location = accessUrl;
        }

       }

       

    },

    search(term){
        
        const accessToken = Spotify.getAccessToken();

        
        
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, 
        {
            headers: {
            Authorization: `Bearer ${accessToken}`
            }
        }
        ).then(response => {
            return response.json();
        }).then(jsonResponse => {
            if (!jsonResponse.tracks){
                return[];
            }
            return jsonResponse.tracks.items.map(track => 
                ({
                    id: track.id,
                    name: track.name,
                    artist: track.artists[0].name,
                    album: track.album.name,
                    uri: track.uri
                }));

            
        })   

    },

    savePlaylist(name, trackUris){
        if (!name || !trackUris){
            return;
        }

        const accessToken = Spotify.getAccessToken();
        if (accessToken) {console.log('Has Token')};
        const headers = { Authorization: `Bearer ${accessToken}`};
        let userId;

        
        return fetch('https://api.spotify.com/v1/me',{headers : headers}
        ).then(response => response.json()
        ).then(jsonResponse => {
            userId = jsonResponse.id;

            return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`,
            {
                method: 'POST',
                headers: headers,
                body: JSON.stringify({name: name})
            }).then(response => response.json()
            ).then(jsonTResponse => {
                const playlistId = jsonTResponse.id;
                console.log(playlistId);
                return fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, 
                {
                  method: 'POST',
                  headers: headers,
                  body : JSON.stringify(trackUris),
                }).then(response => response.json() ).then( jsonRResponse => {
                    console.log(jsonRResponse)
                })
            });


        })
        


    }
}

export default Spotify;


