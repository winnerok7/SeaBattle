var view = {
   displayMessage: function (msg) {
      var messageArea = document.querySelector('#messageArea');
      messageArea.innerHTML = msg;
   },
   displayHit: function (location) {
      var cell = document.getElementById(location);
      cell.setAttribute("class", "hit");
   },
   displayMiss: function (location) {
      var mell = document.getElementById(location);
      mell.setAttribute("class", "miss");

   }
};

var model = {
   boardSize: 7,
   shipLength: 3,
   numShips: 3,
   shipsSunk: 0,

   ships: [
      ship1 = { locations: ['', '', ''], hits: ['', '', ''] },
      ship2 = { locations: ['', '', ''], hits: ['', '', ''] },
      ship3 = { locations: ['', '', ''], hits: ['', '', ''] }],

   fire: function (guess) {
      for (var i = 0; i < this.numShips; i++) {
         var ship = this.ships[i];

         /*location = ship.location; // Избавляемся от временной переменной!
         var index = location.indexOf(guess);*/

         var index = ship.locations.indexOf(guess);
         if (index >= 0) {
            ship.hits[index] = "hit";
            view.displayHit(guess);
            view.displayMessage("HIT!!!");
            if (this.isSunk(ship)) {
               view.displayMessage("Ship was sunk!");
               this.shipsSunk++;
            }
            return true;
         }
      }
      view.displayMiss(guess);
      view.displayMessage("You missed!");
      return false;
   },
   isSunk: function (ship) {
      for (i = 0; i < this.shipLength; i++) {
         if (ship.hits[i] !== "hit") {
            return false;
         }
      }
      return true;
   },

   generateShipLocations: function () {
      var locations;
      for (var i = 0; i < this.numShips; i++) {
         do {
            locations = this.generateShip();
         } while (this.collision(locations));
         this.ships[i].locations = locations;
      }
      console.log("Ships array: ");
      console.log(this.ships);
   },

   generateShip: function () {
      var direction = Math.floor(Math.random() * 2);
      var row, col;

      if (direction == 1) {
         row = Math.floor(Math.random() * this.boardSize);
         col = Math.floor(Math.random() * (this.boardSize - this.shipLength + 1));
      } else {
         col = Math.floor(Math.random() * this.boardSize);
         row = Math.floor(Math.random() * (this.boardSize - this.shipLength + 1));
      }

      var newShipLocations = [];

      for (var i = 0; i < this.shipLength; i++) {
         if (direction == 1) {
            newShipLocations.push(row + "" + (col + i));
         } else {
            newShipLocations.push((row + i) + "" + col);
         }
      }
      return newShipLocations;
   },

   collision: function (locations) {
      for (var i = 0; i < this.numShips; i++) {
         var ship = this.ships[i];
         for (var j = 0; j < locations.length; j++) {
            if (ship.locations.indexOf(locations[j]) >= 0) {
               return true;
            }
         }
      }
      return false;
   }
};

var controller = {
   guesses: 0,
   processGuess: function (guess) {
      var location = parseGuess(guess);
      if (location) {
         this.guesses++;
         var hit = model.fire(location);
      }
      if (hit && model.shipsSunk == model.numShips) {
         view.displayMessage("Вы потопили все корбали за " + this.guesses + " выстрелов!");
      }

   }

}

function parseGuess(guess) {
   var alphabet = ["A", "B", "C", "D", "E", "F", "G"];

   if (guess === null || guess.length !== 2) {
      alert("Вы ввели неправильно координаты");
   } else {
      firstChar = guess.charAt(0);
      var row = alphabet.indexOf(firstChar);
      var column = guess.charAt(1);

      if (isNaN(row) || isNaN(column)) {
         alert("Вы ввели неправильно координаты");
      } else if (row < 0 || row >= model.boardSize || column < 0 || column >= model.boardSize) {
         alert("Вы ввели неправильно координаты");
      } else {
         return row + column;
      }
   }
   return null;
}



function init() {
   var fireButton = document.getElementById('fireButton');
   fireButton.onclick = HandleFireButton;
   var guessInput = document.getElementById('guessInput');
   guessInput.onkeypress = handleKeyPress;
   //Enter mechanic
   model.generateShipLocations();

}

function HandleFireButton() {
   var guessInput = document.getElementById('guessInput');
   var guess = guessInput.value;
   controller.processGuess(guess);
   guessInput.value = "";
}


function handleKeyPress(key) {
   var fireButton = document.getElementById('fireButton');
   if (key.keycode == 13) {
      fireButton.click();
      return false;
   }
}



window.onload = init;



/* controller.processGuess("B0");
controller.processGuess("C0");
controller.processGuess("D0");

controller.processGuess("B5");
controller.processGuess("C4");
controller.processGuess("F0");

controller.processGuess("D2");
controller.processGuess("D3");
controller.processGuess("D4");

controller.processGuess("G3");
controller.processGuess("G4");
controller.processGuess("G5"); */


/*
view.displayMessage("Some Message");
view.displayHit("04");
view.displayMiss("05"); */