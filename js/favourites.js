var sessionName = JSON.parse(window.sessionStorage.getItem("userLogged"));

var favouriteSongs = JSON.parse(window.localStorage.getItem(sessionName));

for (var key in favouriteSongs.favouriteList) {
        var trackUrl =   favouriteSongs.favouriteList[key].split(",")[0];
	    var artistName = favouriteSongs.favouriteList[key].split(",")[1];
    
        var cosas= "<li><p><h6>" + key + " - " + artistName +"</h6> </p><audio controls> <source src=\""+ trackUrl+"\" type=\"audio/mp4\"></audio></li>" ;
        $(".lista").append(cosas);
     }

