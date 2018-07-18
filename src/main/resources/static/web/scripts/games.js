$.ajax({
    dataType: "json",
    url: "http://localhost:8080/api/games",
    cache: true,
    data: JSON,
    success: function (data2) {
        data = data2;
        console.log("AJAX success! GOT GAMES Calling createList()");
        console.log(data.user);

        createList(data);

        function createList(data) {
            console.log("JSON data passed to function createList");
            //            console.log(data);
            //            console.log(data[0].gamePlayer[0].player.name)
            if (!(data.user == null)) {
                $("#username").html("Welcome " + data.user.name);
                $("#signUpForm").css("cssText", "display:none !important;");
                $("#logInForm").css("cssText", "display:none !important;");

            } else {
                $("#logInForm").css("cssText", "display:block !important;");
                $("#signUpForm").css("cssText", "display:block !important;");
                $("#logOut").css("cssText", "display:none !important;");

            }

            for (i = 0; i < data.games.length; i++) {
                //                console.log(data.games);
                var date = new Date(data.games[i].created);
                //                console.log(date);
                var insideP = date;

                var name1;
                var name3;
                var name2 = "| "
                var text = document.createElement("p");

                console.log(i);
                var joinButton = document.createElement("button");
                var buttonText = ("join game " + (i + 1));
                joinButton.innerHTML = buttonText;
                joinButton.setAttribute("data-number", (i + 1));

                $(joinButton).addClass("join");



                for (j = 0; j < data.games[i].gamePlayer.length; j++) {
                    //                    console.log(data.games[i].gamePlayer);
                    console.log(data.games[i].gamePlayer[j].player.name)
                    if (data.games[i].gamePlayer.length == 2) {

                        console.log(data.games[i].gamePlayer[1].player.name)
                    }

                    if (j == 0) {
                        name1 = data.games[i].gamePlayer[j].player.name;

                    }
                    if (j === 1) {

                        name3 = data.games[i].gamePlayer[j].player.name;
                    }
                    if (!(data.user == null) && data.user.id == data.games[i].gamePlayer[j].player.id) {
                        console.log(data.user.id);
                        var text = document.createElement("a");
                        text.href = ("/web/game.html?gp=" + data.games[i].gamePlayer[j].id)

                    }




                }
                var list = document.createElement("li");


                $("#orderedList").append(list);
                list.appendChild(text);
                list.appendChild(joinButton);



                text.innerHTML = (name1 + " VS " + name3 + name2 + insideP);
                name1 = "";
                name3 = "";


            }






        }
    }
});
$.ajax({
    dataType: "json",
    url: "http://localhost:8080/api/leaderboard",
    cache: true,
    data: JSON,
    success: function (data2) {
        data = data2;
        console.log("AJAX2 success! Got LEADERBOARD Calling createLeaderboard()");
        console.log(data);

        createLeaderboard(data);

        function createLeaderboard(data) {
            console.log("called createLeaderboard")
            var row0 = document.createElement("tr");
            var tdName = document.createElement("td");
            var tdTotal = document.createElement("td");
            var tdWon = document.createElement("td");
            var tdLost = document.createElement("td");
            var tdTied = document.createElement("td");

            $(tdName).html("Name");
            $(tdTotal).html("Total");
            $(tdWon).html("Won");
            $(tdLost).html("Lost");
            $(tdTied).html("Tied");

            row0.append(tdName);
            row0.append(tdTotal);
            row0.append(tdWon);
            row0.append(tdLost);
            row0.append(tdTied);

            $(row0).addClass("row0");
            var leaderboard = $("#leaderboard");
            leaderboard.append(row0);

            for (i = 0; i < data.length; i++) {
                console.log("entered loop");
                var row = document.createElement("tr");
                var name = document.createElement("td");
                var total = document.createElement("td");
                var won = document.createElement("td");
                var lost = document.createElement("td");
                var tied = document.createElement("td");

                $(name).html(data[i].name);
                $(total).html(data[i].totalScore);
                $(won).html(data[i].numberOfWins);
                $(lost).html(data[i].numberOfLosses);
                $(tied).html(data[i].numberOfTies);

                row.append(name);
                row.append(total);
                row.append(won);
                row.append(lost);
                row.append(tied);
                console.log(row);
                leaderboard.append(row);
            }
        }
    }
});

$("#logInSubmit").click(function () {
    console.log("log in button works");
    $("#infoTxt").html("")
    var logInName = $("#logInName").val();
    var logInPass = $("#logInPass").val();
    $.post("/api/login", {
            name: logInName,
            pwd: logInPass
        }).done(function () {
            console.log("logged in!");
            $("#username").html("Welcome " + logInName);
            $("#logInForm").css("cssText", "display:none");
            $("#signUpForm").css("cssText", "display:none");
            $("#logOut").css("cssText", "display:block");
        })
        .fail(function () {
            console.log("failed");
            $("#infoTxt").html("Log in failed. User not found.")
        })

})
$("#logOut").click(function () {
    console.log("log out button works");
    $.post("/api/logout").done(function () {
        console.log("logged out");
        $("#logInForm").css("cssText", "display:block");
        $("#signUpForm").css("cssText", "display:block");
        $("#logOut").css("cssText", "display:none");
        $("#username").html("");

    })

})
$("#signInSubmit").click(function () {
    console.log("log in button works");
    var signUpName = $("#signUpName").val();
    var signUpPass = $("#signUpPass").val();
    $.post("/api/players", {
        name: signUpName,
        password: signUpPass
    }).done(function () {
        console.log("signed in !");
        //        $("#signUpForm").css("cssText", "display:none");
        //        $("#logInForm").css("cssText", "display:none");
    }).fail(function () {
        console.log("failed");
        $("#infoTxt").html("Sign in failed. Username alraedy taken.")
    })

})
$("#createGame").click(function () {
    $.post("/api/games").done(function (data) {
        console.log("post to/api/games");
        console.log(data.gpId);
        window.location.href = ('http://localhost:8080/web/game.html?gp=' + data.gpId)
    }).fail(function () {
        console.log("game creation failed");
        $("#infoTxt").html("Could not create game. No player logged in")
    })
})

//
//(".join").click(function () {
//    console.log("trying to toast");
////    toastToJoin($(this).attr("data"));
//    console.log(("/api/game/"+$(this).attr("data")+"players"))
//    
//})

//function toastToJoin(number){
//    var link = ("/api/game/"+number+"players");
//    $.post(link).done(function (data) {
//        console.log(data);
//    }).fail(function(){
//        console.log("coulnd't toast");
//    })
//}


$(document).on('click', '#orderedList .join', function(){ 
    var button = $( this );
    var number = button.attr("data-number");
        var link = ("/api/game/" + number + "/players");
        $.post(link).done(function (data) {
            console.log(data);
        }).fail(function () {
            console.log("coulnd't toast");
            
            $("#infoTxt").html("Could not join");
        })
});
