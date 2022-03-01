const clientID = 'a6ef67b0fb654fd7b43f07d6de3b1b4e';
const clientSecret = '49ae1e107cf641a4a0edff132bd2b88e';

const redirectURI = 'http://localhost:3000/';

let token;


let Spotify = {
    

    getAccessToken(){
       if(token){
           return token
       } else {

        // check for token match

        const tokenMatch= window.location.href.match(/access_token=([^&]*)/);
        const tokenExpirationMatch = window.location.href.match(/expires_in=([^&]*)/)
        
        if (tokenMatch && tokenExpirationMatch) {
            token = tokenMatch[1];
            const tokenExpiration = tokenExpirationMatch[1];
            // Clears params to get new token on expiration
            window.setTimeout(() => token = '', tokenExpiration * 1000);
            window.history.pushState('token', null, '/');
        } else {
            const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=${token}&scope=playlist-modify-public&redirect_uri=${redirectURI}`;

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
                    artist: track.artist[0].name,
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
        const headers = { Authorization: `Bearer ${accessToken}`};
        let userId;

        return fetch('https://api.spotify.com/v1/me',{headers : headers}
        ).then(response => response.json()
        ).then(jsonResponse => {
            userId = jsonResponse.id;
            return fetch(`https://api.spotify.com//v1/users/${userId}/playlists`,
            {
                headers: headers,
                method: 'POST',
                body: JSON.stringify({name: name})
            }).then(response => response.json()
            ).then(jsonResponse => {
                const playlistId = jsonResponse.id;
                return fetch(`https://api.spotify.com//v1/users/${userId}/playlists/${playlistId}/tracks/`), 
                {
                  headers: headers,
                  method: 'POST',
                  body: JSON.stringify({uris: trackUris})
                }
            });
        })
    }
}

export default Spotify;