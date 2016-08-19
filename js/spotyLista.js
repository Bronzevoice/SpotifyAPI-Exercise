var sessionName = JSON.parse(window.sessionStorage.getItem("userLogged"));

$('#welcome').append("Welcome " + sessionName);




$('#search').on('click', function() {
    var query = $('#artistName').val();
    query = query.split(' ').join('+');
    
    $('#artistAlbum').empty();
    searchArtist(query);

})


function searchArtist(query) {
    $.ajax({
        url: "https://api.spotify.com/v1/search?query=" + query + "&offset=0&limit=20&type=artist",
        success: formatArtists,
        error: function() {
            console.log('fatal error!!!');
        },
        dataType: 'json'
    });
}


function formatArtists(response) {

    var artistName = response.artists.items[0].name;
    var artistId = response.artists.items[0].id;

    var html = "";
    html = "<h3>" + artistName + "</h3>"

    $("#artistAlbum").append(html);

    $.ajax({
        url: "https://api.spotify.com/v1/artists/" + artistId + "/albums?offset=0&limit=20&album_type=album",
        success: formatAlbums,
        error: function() {
            console.log('fatal error!!!');
        },
        dataType: 'json'
    });

}




function formatAlbums(albums) {

    for (var i = 0; i < 12; i++) {

        var albumId = albums.items[i].id;

        var html =
            "<div class=\"col s4\">" + "<h6 class=\"album-name" + i + "\">" + albums.items[i].name +
            "</h6>" + "<img onclick=\"getTracks(" + i + ")\" data-target=\"modal1\"class=\"modal-trigger responsive-img \" id=\"imagen\" src=" + albums.items[i].images[1].url + ">" +
            "<div id=\"album" + i + "\" hidden >" + albumId + "</div>" +

            "</div>";

        $("#artistAlbum").append(html);
        $('.modal-trigger').leanModal();


    }
}


function getTracks(number) {
    $(".modal-body").empty();
    $(".modal-title").empty();
    var albumId = $("#album" + number).text();
    var albumName = $(".album-name" + number).text();
    $(".modal-title").append(albumName);
    console.log(albumName);
   
    $.ajax({
        url: "https://api.spotify.com/v1/albums/" + albumId + "/tracks",
        success: getTracksNow,
        error: function() {
            console.log('fatal error!!!');
        },
        dataType: 'json'
    });

    function getTracksNow(tracks) {
        for (var i = 0; i < tracks.items.length; i++) {

            var trackName = tracks.items[i].name;
            var trackPreview = tracks.items[i].preview_url;
            var trackNumber = tracks.items[i].track_number;
            var trackArtist = tracks.items[0].artists[0].name;

            var htmlTracks =
                "<ul>" +
                "<li>" + trackNumber +" "+"<a href=" + trackPreview + ">" + trackName +"</a>&nbsp;&nbsp;&nbsp;"+ 
                "<a class=\"btn-floating btn-xs lime lighten-2 \" onclick=\"saveFavourites(\'"+trackName+"\',\'"+trackPreview+"\',\'"+trackArtist+"\')\"><i id=\"fav\" class=\"tiny material-icons green accent-4\">grade</i></a>";

            $(".modal-body").append(htmlTracks);

        }

    }
}


function saveFavourites(nameTrack,trackPreview,trackArtist){
    
    var loggedUserData = JSON.parse(window.localStorage.getItem(sessionName));
    loggedUserData.favouriteList[nameTrack] = trackPreview + "," + trackArtist;

    window.localStorage.setItem(sessionName,JSON.stringify(loggedUserData));
}

function favourites(){
    
    window.location.href = "favourites.html"
}
