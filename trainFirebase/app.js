//FIREBASE

////////////////////////////////////////////////////////////////
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDkPBJGDhVr2feQilQT8GDp3SK3IEFHijg",
  authDomain: "train-scheduler-d9a88.firebaseapp.com",
  databaseURL: "https://train-scheduler-d9a88.firebaseio.com",
  projectId: "train-scheduler-d9a88",
  storageBucket: "train-scheduler-d9a88.appspot.com",
  messagingSenderId: "182827452930",
  appId: "1:182827452930:web:8b8136ac623a907a40351b",
  measurementId: "G-BCYR2YZFN0"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Get a reference to the database service
var database = firebase.database();


//INPUT
////////////////////////////////////////////////////////////////

$("#submit").on("click", function (event) {
  event.preventDefault();

  //variables
  var trainName = $("#name").val();
  var destination = $("#destination").val();
  var firstTrain = $('#firstTrain').val();
  var frequency = $("#frequency").val();

  initiateTime = moment().format("HH:mm");

  var newTrain = {
    name: trainName,
    time: initiateTime,
    firstTrain: firstTrain,
    destination: destination,
    frequency: frequency,
    dateAdded: firebase.database.ServerValue.TIMESTAMP
  };

  console.log(newTrain);

  // Uploads
  database.ref().push(newTrain);

  // Alert
  alert("Train successfully added");

});

//MATH
////////////////////////////////////////////////////////////////
// Firebase watcher + initial loader HINT: This code behaves similarly to .on("value")

database.ref().on("child_added", function (snapshot) {

  // Snap dat ass
  var name = snapshot.val().name;
  var destination = snapshot.val().destination;

  // A moment for moment.js
  var frequency = snapshot.val().frequency;
  var firstTrain = snapshot.val().firstTrain;
  var firstTrainConverted = moment(firstTrain, "HH:mm").subtract(1, "years");
  var currentTime = moment();
  console.log("current time: " + moment(currentTime).format("hh:mm"));
  var timeDifference = moment().diff(moment(firstTrainConverted), "minutes");
  var remainder = timeDifference % frequency;
  var minutesAway = frequency - remainder;

  var nextArrival = moment().add(minutesAway, "minutes");


  //DISPLAY
  ////////////////////////////////////////////////////////////////
  // Log everything that's coming out of snapshot
  console.log("Train Name: " + name);
  console.log("Destination: " + destination);
  console.log("Frequency: " + frequency);
  console.log("First Train: " + firstTrain);
  console.log("Next Arrival: " + nextArrival.format("hh:mm"));
  console.log("Minutes Away: " + minutesAway);

  //New row onto table
  $("#trainTable").append(
    "<tr>" + "<td>" + name +
    "</td>" + "<td>" + destination +
    "</td>" + "<td>" + frequency +
    "</td>" + "<td>" + nextArrival.format("hh:mm") +
    "</td>" + "<td>" + minutesAway +
    "</td>" + "</tr>");

});

