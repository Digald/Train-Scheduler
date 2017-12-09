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
    var trainTime = 0;
    var trainFrequency = 0;
    // push values from form to firebase
    $("#submit-btn").on("click", function(event) {
        event.preventDefault();

        // grab values from text boxes
        trainName = $("#train-input").val().trim();
        destination = $("#destination-input").val().trim();
        trainTime = $("#firsttime-input").val().trim();
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
            Frequency: trainFrequency
        });

        // call back values from firebase
        database.ref().on("child_added", function(snapshot, prevVal) {
        	// console.log(snapshot.val());

        	// reuse variables to store values
        	var trainName = snapshot.val().TrainName;
        	var destination = snapshot.val().Destination;
        	var trainTime = snapshot.val().TrainTime;
        	var trainFrequency = snapshot.val().Frequency;
        	// console.log(trainName, destination, trainTime, trainFrequency);

        	// calculate time using moment.js

        	// add variables to table
        	$("#info-dump").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + trainTime + "</td><td>" + trainFrequency + "</td></tr>");
        });
           
 
    }); // end of submit form button
}); // end page ready