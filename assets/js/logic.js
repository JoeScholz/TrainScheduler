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
  var trainDatabase = firebase.database();

//  Button to add train info
$("#train-submit").on("click", function(event) {
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
trainDatabase.ref().push(trainInput);

//  console info to check
  console.log(trainInput.name);
  console.log(trainInput.dest);
  console.log(trainInput.first);
  console.log(trainInput.freq);

  $("#train-name").val("");
  $("#destination").val("");
  $("#first-train").val("");
  $("#frequency-train").val("");

});

trainDatabase.ref().on("child_added", function(childSnapshot, previousKey){
  console.log(childSnapshot.val());

  var newTrain = childSnapshot.val();
  var trainName = newTrain.name;
  var destination = newTrain.dest;
  var firstTrain = newTrain.first;
  var frequency = newTrain.freq;

  firstTrain = moment(firstTrain, "HH:mm").subtract(1, "years");
  // raminder/minutes/next/moment
  var remainder = moment().diff(moment(firstTrain), "minutes") % frequency;
  var mins = frequency - remainder;
  var nextArrival = moment().add(mins, "minutes").format("hh:mm A");


  $("tbody").append(
    $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(destination),
      $("<td>").text(frequency),
      $("<td>").text(nextArrival),
      $("<td>").text(mins)

    ) 
  );

  

})