// APP CONSTRUCTOR
function App() {

    // all our lets
    let _pixelsContainer,
        _houseArray,
        _frontdoor,
        _roomState,
        _backdoor,
        _lamps,
        _outlets,
        _uid;



    // initializing all whats needed in the right order
    function init(){

        _database = firebase.database();
        
        // house char array
        _houseArray = `FFFOBOOOOOOOOOOOOOOYOOOYBOOOOOOOBOOOOOOOOOOYOOOYOOOOOOOODDDOBOOO`.split('')

        // cache dom elements
        _pixelsContainer = document.querySelector('.container');
        _roomState = document.querySelector('.roomState');
        generateHouse();
        roomState();
    }

    // check authentication 
    firebase.auth().onAuthStateChanged(function(user) {
        _uid = null;
        if (user) {
            // User is signed in.
            _uid = user.uid;
        } else {
            // if not logged in, back to login page
            _uid = null;
            window.location.replace('auth.html')
        }
    });

    // create the layout of our house in divs
    function generateHouse () {
        let tempStr = '';
        for (let i = 0; i < _houseArray.length; i++) {
            if(_houseArray[i] === "O") {
               tempStr +=   `<div class="pixel floor"></div>`;
            } else if (_houseArray[i] === "F") {
                tempStr +=   `<div class="pixel frontdoor-open"></div>`;
            } else if (_houseArray[i] === "D") {
                tempStr +=   `<div class="pixel backdoor-open"></div>`;
            } else if (_houseArray[i] === "Y") {
                tempStr +=   `<div class="pixel lamps-on"></div>`;
            } else {
                tempStr +=   `<div class="pixel outlets-on"></div>`;
            }        
        }
        _pixelsContainer.innerHTML = tempStr;
    }

    // house alert when someone breaks in
    function houseBreak () {
        // TODO
    }


    // house temperature and humidity
    function roomState () {

        tempStr = '';
        _database.ref("domotica").child('room').on("value", function(snapshot) {  

            tempStr +=  `<div class="temperature">Temperature: ${snapshot.val().temperature}°C </div>`
            tempStr +=  `<div class="humidity">Humidity: ${snapshot.val().humidity}% </div>`
            
         });
        setTimeout(function(){ _roomState.innerHTML = tempStr; }, 2000);
    }


    // the buttons neccessary for domotica
    // closes and opens front door
    document.querySelector('.frontdoor').addEventListener('click', function () {
        _frontdoor_closed = document.querySelectorAll('.pixel.frontdoor-closed');
        _frontdoor = document.querySelectorAll('.pixel.frontdoor-open');

        if(_frontdoor.length == 0) {
            document.querySelector('.frontdoor').style.backgroundColor = "green";
            for(let i = 0; i < _frontdoor_closed.length; i++) {
                _frontdoor_closed[i].className = "pixel frontdoor-open"
            }
        } else {
            document.querySelector('.frontdoor').style.backgroundColor = "red";
              for(let i = 0; i < _frontdoor.length; i++) {
                _frontdoor[i].className = "pixel frontdoor-closed"
            }
        }
    })

    // closes and opens backdoor
    document.querySelector('.backdoor').addEventListener('click', function () {
        _backdoor_closed = document.querySelectorAll('.pixel.backdoor-closed');
        _backdoor = document.querySelectorAll('.pixel.backdoor-open');

        if(_backdoor.length == 0) {
            document.querySelector('.backdoor').style.backgroundColor = "green";
            for(let i = 0; i < _backdoor_closed.length; i++) {
                _backdoor_closed[i].className = "pixel backdoor-open"
            }
        } else {
            document.querySelector('.backdoor').style.backgroundColor = "red";
            for(let i = 0; i < _backdoor.length; i++) {
                _backdoor[i].className = "pixel backdoor-closed"
            }
        }
    })

     // closes and opens outlets
     document.querySelector('.outlets').addEventListener('click', function () {
        _outlets_off = document.querySelectorAll('.pixel.outlets-off');
        _outlets = document.querySelectorAll('.pixel.outlets-on');

        if(_outlets.length == 0) {
            document.querySelector('.outlets').style.backgroundColor = "green";
            for(let i = 0; i < _outlets_off.length; i++) {
                _outlets_off[i].className = "pixel outlets-on"
            }
        } else {
            document.querySelector('.outlets').style.backgroundColor = "red";
            for(let i = 0; i < _outlets.length; i++) {
                _outlets[i].className = "pixel outlets-off"
            }
        }
    })

     // closes and opens lamps
     document.querySelector('.lamps').addEventListener('click', function () {
        _lamps_off = document.querySelectorAll('.pixel.lamps-off');
        _lamps = document.querySelectorAll('.pixel.lamps-on');

        if(_lamps.length == 0) {
            document.querySelector('.lamps').style.backgroundColor = "green";
            for(let i = 0; i < _lamps_off.length; i++) {
                _lamps_off[i].className = "pixel lamps-on"
            }
        } else {
            document.querySelector('.lamps').style.backgroundColor = "red";
              for(let i = 0; i < _lamps.length; i++) {
                _lamps[i].className = "pixel lamps-off"
            }
        }
    })

    function alertTheOwner() {
        console.log('someone broke in!!')
    }

    // TODO: when someone breaks into our house
    document.querySelector('.alert').addEventListener('click', function (item) {
        let _interval =  setInterval(function(){ alertTheOwner() }, 3000);
        let _clearInterval = clearInterval(_interval);

        if(document.querySelector('.alert')) {
            document.querySelector('.alert').className = "alertOn"
            this._interval;

        } else if (!document.querySelector('.alert')) {
            document.querySelector('.alertOn').className = "alert"
            _clearInterval;
        }
    })

    
    // logout function
    document.querySelector('.logout').addEventListener('click', function () {
        firebase.auth().signOut();
    })




    return {
        init: init
    };

}

// init the application 
window.onload = function(){
    const app = new App();
    app.init();
}


 