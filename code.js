var status = "";
var canvas = "";
var video = "";
var objectDetector = "";
var input_value = "";
var objects = [];
var percent = "";
var label = "";
var SpeechRecognition = window.webkitSpeechRecognition;
var recognition = new SpeechRecognition();

function setup() {
    canvas = createCanvas(480, 380);
    canvas.center();

    video = createCapture(VIDEO);
    video.size(400, 380);
    video.hide();
}

function draw() {
    image(video, 0, 0, 480, 380);
    
    if (status != "") {
        objectDetector.detect(video, gotResults);

        for (let i = 0; i < objects.length; i++) {
            fill("#ff0000");
            percent = floor(objects[i].confidence * 100);
            label = objects[i].label;
            text(label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("#ff0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            if (input_value == objects) {
                video.stop();
                objectDetector.detect(gotResults);
                document.getElementById("status").innerHTML = objects + "Found!";
                var synth = window.speechSynthesis;
                var speak_data = objects + "Found!";
                var utterThis =  new SpeechSynthesisUtterance(speak_data);
                synth.speak(utterThis);
            }
            else {
                document.getElementById("status").innerHTML = objects + "Not Found!";
            }
        }
    }
}

function start() {
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
    input_value = document.getElementById("input").value;
    console.log(input_value);
}

function modelLoaded() {
    console.log("Model Loaded!");
    status = true;
}

function gotResults(error, results) {
    if (error) {
        console.log(error);
    }
    else {
        console.log(results);
        objects = results;
    }
}