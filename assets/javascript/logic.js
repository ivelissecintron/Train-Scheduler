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

    // on click event when add train button is clicked 
    $("#add-train-button").on("click", function(event) {
    event.preventDefault();

    //grabbing user input
    var trainName = $("#train-name-input").val().trim();
    var destinationName = $("#destination-input").val().trim();
    var firstTrainTime = $("#first-train-time-input").val().trim(); 
    var frequencyMin = $("#frequency-input").val().trim();

    //using moment.js to convert time
    var firstTrainTimeConv = moment(firstTrainTime, "hh:mm A").subtract(10, "years");
    var timeDifference = moment().diff(moment(firstTrainTimeConv), "minutes") % frequencyMin;
    var minutesAway = frequencyMin - timeDifference;
    var nextTrain = moment().add(minutesAway, "minutes").format("hh:mm A");

    //uploads new train data to the database
    database.ref().push(
    
    //creating object for holding new train data
    {
        name: trainName,
        destination: destinationName,
        time: firstTrainTime,
        frequency: frequencyMin,
        arrival: nextTrain,
        minutesAway: minutesAway,
    });
    
    //create firebase event for adding train to the database 
    database.ref().on("child_added", function (childSnapshot) {
    
    //store everything in a variable
    var trainName = childSnapshot.val().name;
    var destinationName = childSnapshot.val().destination;
    var firstTrainTime = childSnapshot.val().time;
    var frequencyMin = childSnapshot.val().frequency;

    //appending data to the table
    $(".table").append("<tr><td> " + childSnapshot.val().name +
    " </td><td> " + childSnapshot.val().destination +
    " </td><td> " + childSnapshot.val().frequency +
    " </td><td> " + childSnapshot.val().arrival + "</td><td> " + childSnapshot.val().minutesAway + "</td></tr>");
    })

    //clears all the text boxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#first-train-time-input").val("");
    $("#frequency-input").val("");

})
