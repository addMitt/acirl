$(function() {
    FastClick.attach(document.body);
});

//get the time and setup the time of day classes and get the transition timeouts going for all the next time-of-day states

var currentTime = new Date();

var sunrise = new Date();
sunrise.setHours(7);
sunrise.setMinutes(0);
sunrise.setSeconds(0);
var sundown = new Date();
sundown.setHours(19);
sundown.setMinutes(0);
sundown.setSeconds(0);

var midnight = new Date(sundown);
midnight.setHours(24,0,0,0);

//functions that control transitioning to different time-of-day states according to sunrise/sundown
function NightToDawn1() {
    $("body").removeClass("day dusk1 dusk2 night dawn1 dawn2 transition").addClass("transition dawn1")
    
    setTimeout(Dawn1ToDawn2, 3600000);
}
function Dawn1ToDawn2() {
    $("body").removeClass("day dusk1 dusk2 night dawn1 dawn2 transition").addClass("transition dawn2")
    
    setTimeout(Dawn2ToDay, 3600000);
}
function Dawn2ToDay() {
    $("body").removeClass("day dusk1 dusk2 night dawn1 dawn2 transition").addClass("transition day")
    
    setTimeout(DayToDusk1, (sundown - 7200000 - 600000) - sunrise);
}
function DayToDusk1() {
    $("body").removeClass("day dusk1 dusk2 night dawn1 dawn2 transition").addClass("transition dusk1")
    
    setTimeout(Dusk1ToDusk2, 3600000);
}
function Dusk1ToDusk2() {
    $("body").removeClass("day dusk1 dusk2 night dawn1 dawn2 transition").addClass("transition dusk2")
    
    setTimeout(Dusk2ToNight, 3600000);
}
function Dusk2ToNight() {
    $("body").removeClass("day dusk1 dusk2 night dawn1 dawn2 transition").addClass("transition night")
    
    setTimeout(ItsMidnight, midnight - (sundown - 600000));
}
function ItsMidnight() {
    //new currentTime
    currentTime = new Date();
    
    //make sure we change season if you're looking at this at midnight
    setSeason(currentTime);
    
    //new (temporary) sunrise
    sunrise = new Date();
    sunrise.setHours(7);
    sunrise.setMinutes(0);
    
    //new (temporary) sundown
    sundown = new Date();
    sundown.setHours(19);
    sundown.setMinutes(0);
    
    setTimeout(NightToDawn1, (sunrise - 7200000 - 600000) - currentTime);
}

//set the season real quick

setSeason(currentTime);

//7200000 = 2 hours
//3600000 = 1 hour
//600000 = 10 minutes

//the initial time-of-day set
if (currentTime < (sunrise - 7200000 - 600000)) {
    //night (morning)
    $("body").removeClass("day dusk1 dusk2 night dawn1 dawn2").addClass("night");
    
    setTimeout(NightToDawn1, (sunrise - 7200000 - 600000) - currentTime);
}
else if (currentTime >= (sunrise - 7200000 - 600000) && currentTime < (sunrise - 3600000 - 600000)) {
    //dawn1
    $("body").removeClass("day dusk1 dusk2 night dawn1 dawn2").addClass("dawn1");
    
    setTimeout(Dawn1ToDawn2, (sunrise - 3600000 - 600000) - currentTime);
}
else if (currentTime >= (sunrise - 3600000 - 600000) && currentTime < (sunrise - 600000)) {
    //dawn2
    $("body").removeClass("day dusk1 dusk2 night dawn1 dawn2").addClass("dawn2");
    
    setTimeout(Dawn2ToDay, (sunrise - 600000) - currentTime);
}
else if (currentTime >= (sunrise - 600000)  && currentTime < (sundown - 7200000 - 600000)) {
    //day time
    $("body").removeClass("day dusk1 dusk2 night dawn1 dawn2").addClass("day");
    
    setTimeout(DayToDusk1, (sundown - 7200000 - 600000) - currentTime);
}
else if (currentTime >= (sundown - 7200000 - 600000) && currentTime < (sundown - 3600000 - 600000)) {
    //dusk1
    $("body").removeClass("day dusk1 dusk2 night dawn1 dawn2").addClass("dusk1");
    
    setTimeout(Dusk1ToDusk2, (sundown - 3600000 - 600000) - currentTime);
}
else if (currentTime >= (sundown - 3600000 - 600000) && currentTime < (sundown - 600000)) {
    //dusk2
    $("body").removeClass("day dusk1 dusk2 night dawn1 dawn2").addClass("dusk2");
    
    setTimeout(Dusk2ToNight, (sundown - 600000) - currentTime);
}
else if (currentTime >= (sundown - 600000)) {
    //night
    $("body").removeClass("day dusk1 dusk2 night dawn1 dawn2").addClass("night");
    
    setTimeout(ItsMidnight, midnight - currentTime);
}


//weather stuff, needs to be changed to a new API with HTTPS

/*function getWeatherLatLong(latitude, longitude) {
    var url = 'https://api.openweathermap.org/data/2.5/weather?lat=' + latitude + '&lon=' + longitude + '&APPID=dfb5b545089ddd41294f1b68078d0dec';
    $.ajax({
        type: "POST",
        dataType: "jsonp",
        url: url,
        success: function (data) {
        },
        error: function (errorData) {
        }
    });
}

function getWeatherPostal(postal) {
    var url = 'https://api.openweathermap.org/data/2.5/weather?zip=' + postal + '&APPID=dfb5b545089ddd41294f1b68078d0dec';
    $.ajax({
        type: "POST",
        dataType: "jsonp",
        url: url,
        success: function (data) {
        },
        error: function (errorData) {
        }
    });
}

if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(function(position) {
        geolocationStatus = true;
        getWeatherLatLong(position.coords.latitude,position.coords.longitude);
    }, function(error) {
        $('.postal-input').addClass('show');
    });
}
else {
   geolocation IS NOT available 
  $('.postal-input').addClass('show');
}

$('.postal-input button').on('click',function() {
    getWeatherPostal($('.postal-input input').val());
});*/



//get the fruits and grass

var fruits = ["apple","orange","pear","cherries","peach"];
var grass = ["square","triangle","circle"];

if (sessionStorage.getItem("fruit") == null || sessionStorage.getItem("grass") == null) {
    //clear em both
    sessionStorage.removeItem("fruit");
    sessionStorage.removeItem("grass");
    
    //set the fruit to a random number         max min      min
    var newFruit = (Math.floor(Math.random() * (4 - 0 + 1) + 0));
    //set the grass to a random number         max min      min
    var newGrass = (Math.floor(Math.random() * (2 - 0 + 1) + 0));
    
    //save it
    sessionStorage.setItem("fruit", newFruit);
    sessionStorage.setItem("grass", newGrass);
    
    //show them
    $('.fruit').addClass(fruits[newFruit]);
    //something for showing grass here
    
}
else {
    //set their fruit to the stored variable
    var currentFruit = sessionStorage.getItem("fruit");
    //show them
    $('.fruit').addClass(fruits[currentFruit]);
}

var debugFruitsCounter = 0;
$('body').on('click','.debug-fruits-button', function() {
    $('.fruit').removeClass("apple orange pear cherries peach");
    $('.fruit').addClass(fruits[debugFruitsCounter]);
    debugFruitsCounter++;
    if (debugFruitsCounter > 4) {debugFruitsCounter = 0;}
});


//season stuff

function setSeason(time) {
    //clean it up
    $('body').removeClass('spring summer autumn winter1 winter2');
    //when I have weather, check if weather is not snow
    $('body').removeClass('snow');
    
    var month = time.getMonth();
    var day = time.getDate();
    console.log(month);
    console.log(day);
    
    if ((month >= 1) && (month < 2 && day < 15)) {
        $('body').addClass('winter2 snow');
    }
    else if ((month >= 2 && day >= 15) && (month < 5)) {
        $('body').addClass('spring');
    }
    else if ((month >= 5) && (month < 8)) {
        $('body').addClass('summer');
    }
    else if ((month >= 8) && (month <= 10 && day < 15)) {
        $('body').addClass('autumn');
    }
    else if ((month >= 10 && day >= 15) || (month <= 1)) {
        $('body').addClass('winter1 snow');
    }
    
}

var seasons = ["spring","summer","autumn","winter1","winter2"];

var debugSeasonsCounter = 0;
$('body').on('click','.debug-seasons-button', function() {
    $('body').removeClass('spring summer autumn winter1 winter2 snow');
    $('body').addClass(seasons[debugSeasonsCounter]);
    if (debugSeasonsCounter == 3 || debugSeasonsCounter == 4) {
        $('body').addClass('snow');
    }
    debugSeasonsCounter++;
    if (debugSeasonsCounter > 4) {debugSeasonsCounter = 0;}
});

//some YouTube initialization stuff
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var videoIds = [ //AC, WW, CF, NL
    ["odZ-OV8JWNk","hyIPaz3UJAI","fyMM5ZMIMH8","_4G7EWJ7Ik8"], //0   12AM
    ["zriYPJvR45s","kFSTf-q9qX4","qDUevjay8Rc","ogZOuyEUaqM"], //1   1AM
    ["J36o0MZ7EzU","_ITM1vFiV6U","5Pd5K-TQ1gY","6ctYQ2giDfw"], //2   2AM
    ["zXcpYHhiQZk","gWH27B8TPDA","XGgT_6tYYGg","rjoi8HzYjnY"], //3   3AM
    ["of877S78m5k","84V2PZa1F-c","Tf5TX0TSGps","alCXAH7tzT4"], //4   4AM
    ["SY69KnqL8DE","K5W5WLKdnlg","h2XCGASo6r4","YsRHAojQK20"], //5   5AM
    ["gSO3-wVsrOU","QTZ3-oLu7cw","Fqptn0peqLE","tnlpjqXHQnI"], //6   6AM
    ["WA-iIVYYqsI","d3d7DdKBSrM","exK1ee3RR48","DHskPDrg-fQ"], //7   7AM
    ["fYSMZpiF7sA","_Z_Eg5DgTe4","8gJomk45kFw","r7Ncy-yY9Uw"], //8   8AM
    ["JDQu0rr7gEo","cdB3harSmZ8","ikjVV_ZcVwE","qRAt72y7Dl0"], //9   9AM
    ["GAHD10BeSqM","-K1jZ0Oek18","bc-YhiwcA_E","BtxRvNYYUUo"], //10  10AM
    ["ONKmAo8KsGk","nvKUou7Ty0c","4tcZAm84h_w","1ZXwbqjoHQ8"], //11  11AM
    ["6QgNRFuRQUs","SRt7ISfi7OQ","uDmjN8kgqmE","kginZ7__1aE"], //12  12PM
    ["bskJpsmSzQo","QH8ICY7-qvg","IT7vypPRA-Y","JkHgU_O6f64"], //13  1PM
    ["dIWlztcYiJg","u-bmQy-xi_I","t3fjGXA2dWo","yQicvIsa8W8"], //14  2PM
    ["6bWilabrMFw","Jr0nWQkyZb0","-GgytCQr5o4","WalIFXKCmHU"], //15  3PM
    ["Dlx9Kqg7u4Y","5nqWwV2kn7Y","catR8Ul2n_k","N5Xx8r2uTLI"], //16  4PM
    ["tF5sm6TBXhg","ZTvNX1R5QlU","3SaT4Yp0FaA","37UjXU-3wZ8"], //17  5PM
    ["37F1qzbtDnA","SOKGTIw2fCk","x1zDj6AgWjI","5QJaWg5fOAo"], //18  6PM
    ["q5FFPzAX-Jg","BD3lqQ9-8Ig","ugHzq90-h08","qYhA2QqFDS8"], //19  7PM
    ["eZ8lmEQO8ks","0jWetqSVGNc","UJG3UdgKOwE","Fksz_uENt9U"], //20  8PM
    ["w_md7sA7syU","oWmT9EGNuOU","HIaSN8OHfV8","ZUPm4MT64VU"], //21  9PM
    ["cRCuIlnGpBY","vvw5eCl8okI","LEhlv7okIoA","YukcuUPS05U"], //22  10PM
    ["YrEss6dcsc8","2ntrw94Pbe0","vzcH0HFWWiE","xbjbGNa-7eE"]  //23  11PM
];

var extendedVideoIds = [ //AC, WW, CF, NL (no Wild World, no one uploaded extended versions)
    ["As6_i8RoKP0","hyIPaz3UJAI","UWx_K5g2fI8","A_00O4KWBxY"], //0   12AM
    ["8qnkNjDAd4k","kFSTf-q9qX4","qDUevjay8Rc","uX2NxSN49Tg"], //1   1AM
    ["QdrjrVPAMvQ","_ITM1vFiV6U","lA7Q03Zids4","LAioanQMG_A"], //2   2AM
    ["nOROAUpqrGU","gWH27B8TPDA","BWmxsv43t5U","_pCBzrFnTlw"], //3   3AM
    ["xTXgAy1TJt8","84V2PZa1F-c","PZQVC_nBAoc","eSfQrWXD94A"], //4   4AM
    ["nXRK1OmRUq4","K5W5WLKdnlg","n9UmEMFVnII","zQLvrhUXwtE"], //5   5AM
    ["voceB48hemo","QTZ3-oLu7cw","3m6VPcr-ppU","mWa-tiP3a_o"], //6   6AM
    ["l5285eKta-c","d3d7DdKBSrM","RhYOHSTa3CM","-CtfRww-2YM"], //7   7AM
    ["w0uOCxFYq2U","_Z_Eg5DgTe4","F98WiwAQjV8","OHxpIqpAjz0"], //8   8AM
    ["wxd56GLRxa0","cdB3harSmZ8","me7URNQeQoQ","T9ieUkNOEf4"], //9   9AM
    ["Wdvh7PLW0G0","-K1jZ0Oek18","AbvBd2_0aOM","25wXOGbmWOc"], //10  10AM
    ["X0FFrjTeWr0","nvKUou7Ty0c","s5IBmnS_j7Y","TPFZhtkP7M0"], //11  11AM
    ["_1YpXECC7MY","SRt7ISfi7OQ","0vrwZlwSpg0","vZVS2FtVWHA"], //12  12PM
    ["OvhAeNNG-RQ","QH8ICY7-qvg","2CJ6ia2De74","G3rtW1G2Ixg"], //13  1PM
    ["uuduck3SJo8","u-bmQy-xi_I","IKgjYchV8po","LiXoQXCFhF8"], //14  2PM
    ["aGUzuX6cJvc","Jr0nWQkyZb0","KOdyX4GuffI","CM58GBw4JkE"], //15  3PM
    ["uOsads28JTg","5nqWwV2kn7Y","RU1BcTnIqV8","wqaKOCbeXmY"], //16  4PM
    ["Wqu5UfBFUW8","ZTvNX1R5QlU","Y5eVLcSHiCk","HXG9zU2Lb6g"], //17  5PM
    ["FtPwnwHmS9I","SOKGTIw2fCk","7hCC7YiEojg","iLSwc8wgJeo"], //18  6PM
    ["6c7Kgf0d2qk","BD3lqQ9-8Ig","ejhyQ291CFQ","rmtKHo7GB64"], //19  7PM
    ["NOA89fdYmqw","0jWetqSVGNc","b_AOf5r9Dto","DhrsQO9Pkbs"], //20  8PM
    ["RKPjKC8bs14","oWmT9EGNuOU","YTmEUx3xDNM","Fl4M-a3eBnw"], //21  9PM
    ["KYjFqcTNzM0","vvw5eCl8okI","oR-29kYl_a0","tEWFq1_NVSg"], //22  10PM
    ["qw8FTCaAFSM","2ntrw94Pbe0","dG_En_T9AnA","ytHqYVbuLt4"]  //23  11PM
];

var shopIds = [
    [ //AC
        "mzfbPjip-GY", //museum
        "phowwzwxUis", //museum (fish)
        "Sb8-I6H32Hg", //museum (fossil)
        "rFYUUaCdQSc", //museum (paintings)
        "Dt0Hsb15Uo8", //police station
        "sJB4snwFYow", //able sisters
        "QYEjk_hwbiY", //post office (night)
        "3QxmOgK92Lo", //post office (day)
        "eRhU2S4t70M", //nookington's
        "T3JmCpNrZfc", //nookway
        "D5N5vm-b2Uo", //nook n go
        "azc3wo9O8kE", //nooks cranny
        "2w57bROOY7s" //island
    ],
    [ //WW
        "u9_f5SD4uVg", //town hall (day)
        "mpdZcsHlvUU", //town hall (night)
        "U3gTFqwzVbw", //nook's cranny
        "evklHqN4H_0", //nook n go
        "1KUKNtXDxsg", //nookingtons
        "v87WFpr0g_U", //able sisters
        "-MThpEvpxDY", //museum
        "H61XBWV1WoA", //cafe
        "9eh66NDEAZc", //katrinas tent
        "rf3_GE_AHYM" //redds tent
    ],
    [ //CF
        "eeBnyM25JT8", //town hall (day)
        "zXMHHreKoik", //town hall (night)
        "zBMYDRmYxEo", //nooks cranny
        "uvg6YjgV-qs", //nook n go
        "1w-_P4P7NEk", //nookway
        "R8at8-VHeLQ", //nookingtons
        "jTVJWSe8ndU", //able sisters
        "f2oD6BUDFEI", //museum
        "oQnlNRbsKt4", //museum (paintings)
        "hIX54RxMUvE", //museum (fossils)
        "dCxHiCw1Pwc", //museum (fish)
        "mSHQRgep4PE", //museum (observatory)
        "R_Tk_LS6EKA", //museum (bugs)
        "vz8Y_1CgHHY", //the roost
        "o4ohYw3lmb4", //city (morning)
        "pLyQ8p4RyMU", //city (day)
        "yLF_QrZ8t2A", //city (evening)
        "UDBSlY7C0qE", //city (night)
        "t0h8QjQXpfQ", //crazy redds shady shack
        "H1HMe6jHINo", //marquee
        "5tBI0CayE5c", //happy room academy
        "VyZUa3TBmZw", //graciegrace
        "TH5PSX1RwQY", //auction house
        "wrVc2FNkcx4", //shampoodle
        "mgCT25coTa0", //katrinas luck shop
    ],
    [ //NL
        "7a5LXIaoSoo", //island (day)
        "jHsyfau2SeI", //main street 1 (day)
        "aSYx2zKy0v0", //main street 1 (night)
        "aZdy098YpAo", //main street 2 (day)
        "8VbndEBj8Hs", //main street 2 (night)
        "h3fvF0IkwuA", //main street 3 (day)
        "r8WU5M-OW7Y", //main street 3 (night)
        "wkhViUGJGFI", //museum
        "w99ffghZByk", //museum (insects)
        "aXCxflcRI4U", //museum (custom showroom)
        "_nsBLzrTpIA", //shoe store
        "y27bs7XwYaY", //able sisters
        "Os_HrGGg3zY", //able sisters (labelle)
        "DW5rZOp4jAY", //shampoodle
        "nD5ftFZk00U", //garden shop
        "aloTIQrhEpk", //nookling junction
        "j6btLVoaE74", //T&T mart
        "MzaMBUwJWS4", //Super T&T
        "Q57b1n0OM8A", //TIY
        "0sMGrBeVgao", //TIY (garden shop)
        "w7uETlmkPV8", //T&T Emporium
        "g_l4vARxnNY", //T&T Emporium (Gracie)
        "YjcA7Hoz7Ys", //street pass houses
        "WZH9WdYoRD8", //post office (day)
        "tVHryiI6PTs", //post office (night)
        "UDUk1Z0JkQE", //nooks homes
        "xqmQ5rW8cCU", //club lol (day)
        "NUmen6f8bAg", //dream suite
        "3IXkrgVtxv8", //redds tent
        "b1CDhKGRhjI", //police box
        "U1RDTp4Ad2U", //the roost
        "tr8ZoooJhHQ", //re-tail
        "I_sZ-p_VM5Y", //igloo (winter)
        "zXN0xgehBPM", //train station
        "520hRY6k1no", //city hall
        "e8d8p1nYZu8", //island (day)
        "GSqwxQRy_OA", //island (night)
        "c3WAcuPF3aQ", //island (shop)
        "42X9OLEU8e4", //island (minigame)
        "2BJY19bZGgk", //island (minigame night)
        "MQnCH0xWbfo", //island (hide and seek)
    ]
];

function shuffle(array) { //Fisher–Yates Shuffle shamefully taken from bost.ocks.org/mike/shuffle
    var m = array.length, t, i;
    
    // While there remain elements to shuffle…
    while (m) {
        
        // Pick a remaining element…
        i = Math.floor(Math.random() * m--);
        
        // And swap it with the current element.
        t = array[m];
        array[m] = array[i];
        array[i] = t;
    }
    
    return array;
}

var currentGames = [];
var shoppingState = false;

var player;

function onYouTubeIframeAPIReady() {

    player = new YT.Player('player', {
        width: 320,
        height: 180,
        videoId: "odZ-OV8JWNk",
        playerVars: {
            loop: 1,
            autohide: 1,
            playlist: "odZ-OV8JWNk",
            fs: 0,
            iv_load_policy: 3,
            rel: 0,
            color: "white",
            wmode: "transparent"
        },
        events: {
            'onReady': onPlayerReady
        }
    });
    
}

var hourRefresh = setTimeout(function(){updatePlayer();},3600000);

function updatePlayer() {
    
    clearTimeout(hourRefresh);
    
    currentGames = [];
    
    shoppingState = $(".shopping").hasClass("on");
    
    $(".left .circle-button.on").each(function() {
        
        currentGames.push(parseInt($(this).attr("data-game")));
        
    }).promise().done( function(){
        
        localStorage.setItem("currentGames", JSON.stringify(currentGames));
        localStorage.setItem("shoppingState", shoppingState);
        
        if (currentGames.length == 0) {
            $("#player").hide();
            player.stopVideo();
        }
        else {
            $("#player").show();
            
            var currentPlaylist = [];
            
            var currentHour = new Date();
            currentHour = currentHour.getHours();
            
            if (shoppingState == true) {
                //make an array of all the shopping IDs for the selected games
                if (currentGames.length == 1) {
                    var shopPlaylist = shuffle(shopIds[currentGames[0]]);
                }
                else {
                    var shopPlaylist = [];
                    for(var i=0; i<currentGames.length; i++) {
                        shopPlaylist = shopPlaylist.concat(shopIds[currentGames[i]]);
                    }
                }
                
                //shuffle up dem shop IDs
                var shopPlaylist = shuffle(shopPlaylist);
                
                //shopping counter
                var j = 0;
                //regular game counter
                var k = 0;
                //30 passes to make a playlist of 30 songs (approx 1 hour)
                for(var i = 1; i <= 30 ; i++) {
                    if ((i%3) == 0){
                        //Add a shopping song and iterate its counter
                        currentPlaylist.push(shopPlaylist[j]);
                        j++;
                    }  else {
                        //Add a game song
                        var modK = k % currentGames.length;
                        currentPlaylist.push(videoIds[currentHour][currentGames[modK]]);
                        k++;
                    }
                }
            }
            else {
                //just make a short playlist out of the selected games
                if (currentGames.length == 1) {
                    currentPlaylist.push(extendedVideoIds[currentHour][currentGames[0]]);
                }
                else {
                    for(var i=0; i<currentGames.length; i++) {
                        currentPlaylist.push(videoIds[currentHour][currentGames[i]]);
                    }
                }
            }
            
            //get current player state so I can pause it again after loading, if necessary
            var currentState = player.getPlayerState();
            
            if (currentState == 5 || currentState == 2) {
                player.cuePlaylist({
                    playlist:currentPlaylist
                });
            }
            else {
                player.loadPlaylist({
                    playlist:currentPlaylist
                });
            }
            player.setLoop(true);
        }
        
        var nextHourTime = new Date();
        nextHourTime.setHours(nextHourTime.getHours()+1);
        nextHourTime.setMinutes(0);
        nextHourTime.setSeconds(0);
        nextHourTime = nextHourTime - Date.now();
        
        hourRefresh = setTimeout(function() { updatePlayer(); }, nextHourTime);
        
    });
}

function onPlayerReady() {
    
    if (localStorage.getItem("currentGames") != null) {
        
        currentGames = JSON.parse(localStorage.getItem("currentGames"));
        var lastShoppingState = localStorage.getItem("shoppingState");
        
        for(var i = 0; i < currentGames.length; i++) {
            $(".left .circle-button[data-game=" + currentGames[i] + "]").toggleClass("on");
        }
        if (lastShoppingState == "true") {
            $(".shopping").addClass("on");
        }
        
        updatePlayer();
    }
    else {
        $(".left .circle-button").toggleClass("on");
        updatePlayer();
    }
    
    $("body").on("click", ".circle-button", function () {
        $(this).toggleClass("on");
        updatePlayer();
    });
}
