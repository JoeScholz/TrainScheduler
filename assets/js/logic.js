var config = {
    apiKey: "AIzaSyD6BYUcH9Teccw6SwJrk_sr5r9dSxoTOyU",
    authDomain: "trainscheduler-5c713.firebaseapp.com",
    databaseURL: "https://trainscheduler-5c713.firebaseio.com",
    projectId: "trainscheduler-5c713",
    storageBucket: "trainscheduler-5c713.appspot.com",
    messagingSenderId: "194759685154"
  };
  firebase.initializeApp(config);

//  Database variable for ease of reference
  var database = firebase.database();

//  Button to add train info
$("#train-sumbit").on("click", function(event) {
  event.preventDefault();

//  Varibles to grab user input
  var trainName = $("#train-name").val().trim();
  var destination = $("#destination").val().trim();
//  ???MOMENT???
  var firstTrain = $("#first-train").val().trim();
  var frequency = $("#frequency-train").val().trim();

//  object for holding local data
  var trainInput = {
    name: trainName,
    dest: destination,
    first: firstTrain,
    freq: frequency
  };
//  .push to 'firebase' database (not local)
  database.ref().push(trainInput);

//  console info to check
  console.log(trainInput.name);
  console.log(trainInput.dest);
  console.log(trainInput.first);
  console.log(trainInput.freq);

// confirmation
  alert("Train info added");
  

});
