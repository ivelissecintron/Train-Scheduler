//firebase configuration and initialization 
var config = {
    apiKey: "AIzaSyDK6Vv-fexLacBsI05ZWeU899TIcRUNCbg",
    authDomain: "train-scheduler-3d519.firebaseapp.com",
    databaseURL: "https://train-scheduler-3d519.firebaseio.com",
    projectId: "train-scheduler-3d519",
    storageBucket: "",
    messagingSenderId: "683796599193"
  };

firebase.initializeApp(config);

var database = firebase.database();

// button for adding train
$("#add-train-button").on("click", function(event) {
    event.preventDefault();

    //grabbing user input
    var trainName = $("#train-name-input").val().trim();
    var destinationName = $("#destination-input").val().trim();
    //var firstTrainTime = moment($("#first-train-time-input").val().trim(), "DD/MM/YY").format("X");??
    var firstTrainTime = $("#first-train-time-input").val().trim(); 
    var frequencyMin = $("#frequency-input").val().trim();

    //creating local temporary object for holding new train data
    var newTrain = {
        name: trainName,
        destination: destinationName,
        time: firstTrainTime,
        frequency: frequencyMin
    };

    //uploads new train data to the database
    database.ref().push(newTrain);

    //logs to console
    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.time);
    console.log(newTrain.frequency);

    //alert
    alert("Train successfully added");

    //clears all the text boxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#first-train-time-input").val("");
    $("#frequency-input").val("");
});

