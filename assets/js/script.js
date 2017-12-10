$(document).ready(function() {
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyArp7u2NzLnTP0rmv-QD5bxXqxalpdNNfY",
        authDomain: "rps-online-d3bbc.firebaseapp.com",
        databaseURL: "https://rps-online-d3bbc.firebaseio.com",
        projectId: "rps-online-d3bbc",
        storageBucket: "rps-online-d3bbc.appspot.com",
        messagingSenderId: "158929288163"
    };
    firebase.initializeApp(config);
    var database = firebase.database();

    var trainName = "";
    var destination = "";
    var trainTime = "";
    var trainFrequency = 0;
    // push values from form to firebase
    $("#submit-btn").on("click", function(event) {
        event.preventDefault();

        // grab values from text boxes
        trainName = $("#train-input").val().trim();
        destination = $("#destination-input").val().trim();
        trainTime = moment($("#firsttime-input").val().trim(), "HH:mm").format();
        trainFrequency = $("#frequency-input").val().trim();

        // clear text fields for new input
        $("#train-input").val("");
        $("#destination-input").val("");
        $("#firsttime-input").val("");
        $("#frequency-input").val("");

        // push these values to firebase
        database.ref().push({
            TrainName: trainName,
            Destination: destination,
            TrainTime: trainTime,
            Frequency: trainFrequency,
            dateAdded: firebase.database.ServerValue.TIMESTAMP
        });
    }); // end of submit form button

    // call back values from firebase
    database.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(childSnapshot) {
        console.log("From Firebase: " + childSnapshot);

        // reuse variables to store values
        var trainName = childSnapshot.val().TrainName;
        var destination = childSnapshot.val().Destination;
        var trainTime = childSnapshot.val().TrainTime;
        var trainFrequency = childSnapshot.val().Frequency;

        // calculate time using moment.js
        var convertTime = moment(trainTime, "HH:mm").subtract(1, "years");
        // console.log(convertTime);

        // current time to compare minutes until next train
        var currentTime = moment();
        console.log("Current Time: " + moment(currentTime).format("HH:mm"));

        // different in time between converted time and current
        var diffTime = moment().diff(moment(convertTime), "minutes");

        var remainder = diffTime % trainFrequency;

        // minutes until next train comes
        var minToNextTrain = trainFrequency - remainder;
        console.log("Minutes until next train: " + minToNextTrain);

        // arrival time in UNIX? convert to military time before displaying on html
        var nextArrival = moment().add(minToNextTrain, "minutes");
        console.log("Arrival Time: " + nextArrival);

        


        console.log("-----------------------------------------------------------------")
        // add variables to table
        $("#info-dump").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" +
            trainFrequency + "</td><td>" + moment(nextArrival).format("HH:mm") + "</td><td>" +  minToNextTrain +"</td></tr>");
    });



}); // end page ready