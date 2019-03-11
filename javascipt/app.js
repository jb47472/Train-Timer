
var clock;
var time;


$(document).ready(function () {

  function runningClock() {
    time = moment().format("hh:mm:ss A");
    $("#time").text(time);
  }


  clock = setInterval(runningClock, 1000);


  // Initialize Firebase

  var config = {
    apiKey: "AIzaSyDxBuaNLSn0Q37a1QH43USMu3ImLjn4GRQ",
    authDomain: "dude-5edba.firebaseapp.com",
    databaseURL: "https://dude-5edba.firebaseio.com",
    projectId: "dude-5edba",
    storageBucket: "dude-5edba.appspot.com",
    messagingSenderId: "150782794440"
  };

  firebase.initializeApp(config);

  // Create a variable to reference the database.
  var database = firebase.database();



  $("#submitButton").on("click", function (event) {
    console.log("What up?");

    event.preventDefault();

    name = $("#trainNameInput").val().trim();
    destination = $("#destinationInput").val().trim();
    firstTrainTime = $("#firstTrainTimeInput").val().trim();
    frequency = $("#frequencyInput").val().trim();

    // Code for "Setting values in the database"
    database.ref().push({
      name: name,
      destination: destination,
      firstTrainTime: firstTrainTime,
      frequency: frequency
    });

    clear();
  });

  // Firebase watcher + initial loader HINT: .on("value")
  database.ref().on("child_added", function (snapshot) {

    //Log everything that's coming out of snapshot
    console.log(snapshot.val());
    var name = snapshot.val().name;
    var destination = snapshot.val().destination;
    var firstTrainTime = snapshot.val().firstTrainTime;
    var frequency = snapshot.val().frequency;
    console.log(name);
    console.log(destination);
    console.log(firstTrainTime);
    console.log(frequency);


    var firstTime = "03:30";

    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    var tFrequency = 3;

    // Time apart (remainder)
    var tRemainder = diffTime % tFrequency;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = tFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("dddd, MMMM Do YYYY, h:mm:ss a"));


    // Change the HTML to reflect
    var newRow = $("<tr>").append(
      $("<td>").text(name),
      $("<td>").text(destination),
      $("<td>").text(frequency),
      $("<td>").text(nextTrain),
      $("<td>").text(tMinutesTillTrain),

    )


    $(".table > tbody:last-child").append(newRow);


    // Handle the errors
  }, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);

  })


  function clear() {
    $("#trainNameInput").val("");
    $("#destinationInput").val("");
    $("#firstTrainTimeInput").val("");
    $("#frequencyInput").val("");
  }

})