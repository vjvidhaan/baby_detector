img = "";
status = "";
objects = [];
alarm=""


function preload() {
    alarm= loadSound("alarm.mp3");
    }

    
function setup() {
    canvas = createCanvas(380, 380);
    canvas.center()
    video = createCapture(VIDEO)
    video.size(380, 380)
    video.hide();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";

}



function draw() {
    image(video, 0, 0, 380, 380);
    if (status != "") {
        objectDetector.detect(video, gotResults);
        r = random(255);
        g = random(255);
        b = random(255);
        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "status: Detected";
            document.getElementById("number_of_objects").innerHTML = "number of objects are:" + objects.length;
            fill(r, g, b)
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + "%", objects[i].x, objects[i].y);
            nofill();
            stroke(r, g, b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

            if(objects[i].label == "person"){
                alarm.stop();
                document.getElementById("baby_found").innerHTML = "BABY: found";
            }
            else{
                alarm.play();
                document.getElementById("baby_found").innerHTML = "BABY: not found";
            }
        }

    }
}

function modelLoaded() {
    console.log("modelLoaded");
    status = true;
    
}

function gotResults(error, results) {
    if (error) {
        console.log(error);
    }

    console.log(results);
    objects = results;
}