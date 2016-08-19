

var url = "js/storageUsers.jsonp";
var ok = 0;



$('#submit').on("click", function() {
    

    var user = capitalizeFirstLetter($('#user').val());
   var password = $('#password').val();

    $.ajax({
        url: url,
        type: "GET",
        dataType: "jsonp",
        crossDomain: true,
        jsonpCallback: "storageUsers",
        success: function(respuesta) {

            for (var i = 0; i < respuesta.users.length; i++) {
                if (respuesta.users[i].name == user && respuesta.users[i].password == password) {
                    ok = 1;
                   
                    var currentName = respuesta.users[i].name;
                    
                    if(window.localStorage.getItem(currentName)){

                          loggedUser = JSON.parse(window.localStorage.getItem(currentName));
                    }
                    else{var loggedUser = {
                        name : respuesta.users[i].name,
                       favouriteList : {}

                    };
                         window.localStorage.setItem(currentName,JSON.stringify(loggedUser))

                    }
                    
                    
                    window.sessionStorage.setItem("userLogged",JSON.stringify(currentName));
                    window.location.href = "balU.html";

                }
            }

            if(ok === 0) {
                alert("Wrong password, users, metaframes");
            }
        },
        error: function() {
            console.log('eligió mal wey');
        }

    })


})



function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}