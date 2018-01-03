var isRecording = false;
var isPlaying = false;
var keyPresses = [];

var synthCodes = [65, 87, 83, 69, 68, 70, 84, 71, 89, 72, 85, 74, 75];
var synthDowns = [false, false, false, false, false, false, false, false, false, false, false, false, false];

// THESE TWO VARIABLES STORE THE TIME AND DATE WHEN THE PAGE IS LOADED
var startDate = new Date();
var startTime = startDate.getTime();
var currTime;
setInterval(getCurrTime, 1);

// THIS FUNCTION CALCULATES THE SECONDS ELAPSED SINCE THE PAGE WAS LOADED
function getCurrTime () 
{ 
	var date_now = new Date(); 
	var time_now = parseFloat(date_now.getTime()); 
	var time_diff = parseFloat(time_now - startTime); 
	currTime = time_diff;
};

var recbutton = document.getElementById("recordbtn");
var playbutton = document.getElementById("playbtn");
var recordStart = 0;

recbutton.onclick = function ()
{
	if (isRecording)
	{
		recbutton.style.backgroundColor = "#4CAF50";
		isRecording = false;
	}
	else if (!isRecording)
	{
		recbutton.style.backgroundColor = "red";
		isRecording = true;
		keyPresses = [];
		recordStart = currTime;
	}
}

window.addEventListener("keydown", function (e)
{
	if (isRecording)
	{
		if (synthCodes.includes(e.keyCode))
		{
			if (!synthDowns[synthCodes.indexOf(e.keyCode)])
			{
				var keyDown = {time : currTime - recordStart, keycode : e.keyCode, keyEvent : 'keydown', type : 'synth'};
				keyPresses.push(keyDown);
				synthDowns[synthCodes.indexOf(e.keyCode)] = true;
			}
		}
		else
		{
			var keyDown = {time : currTime - recordStart, keycode : e.keyCode, keyEvent : 'keydown', type : 'drums'};
			keyPresses.push(keyDown);
		}
	}
});

window.addEventListener("keyup", function (e)
{
	if (isRecording)
	{
		if (synthCodes.includes(e.keyCode))
		{
			if (synthDowns[synthCodes.indexOf(e.keyCode)])
			{
				var keyUp = {time : currTime - recordStart, keycode : e.keyCode, keyEvent : 'keyup', type : 'synth'};
				keyPresses.push(keyUp);
				synthDowns[synthCodes.indexOf(e.keyCode)] = false;
			}
		}
		else
		{
			var keyUp = {time : currTime - recordStart, keycode : e.keyCode, keyEvent : 'keyup', type : 'drums'};
			keyPresses.push(keyUp);
		}
	}
});



var playfunc;
var playStart;

var lastPlayed = 0;

playbutton.onclick = function ()
{
	if (!isRecording && keyPresses && !isPlaying)
	{
		playbutton.style.backgroundColor = "red";
		isPlaying = true;
		playStart = currTime;
		playfunc = setInterval(Play, 10);
		lastPlayed = 0;
	}
	else if (isPlaying)
	{
		playbutton.style.backgroundColor = "#4CAF50";
		isPlaying = false;
		clearInterval(playfunc);

		for (var i = 0; i < keyPresses.length; i++) {
			fireKeyboardEvent("keyup", keyPresses[i].keycode);
		}
	}
}


function Play ()
{
	var playTime = currTime - playStart;
	for (var i = lastPlayed; i < keyPresses.length; i++)
	{
		if (playTime >= keyPresses[i].time)
		{
			fireKeyboardEvent(keyPresses[i].keyEvent, keyPresses[i].keycode);
			lastPlayed = i + 1;
		}

		if (lastPlayed == keyPresses.length)
		{
			playbutton.style.backgroundColor = "#4CAF50";
			isPlaying = false;
			clearInterval(playfunc);
		}
	}
}

function fireKeyboardEvent(event, keycode)
{
	var keyboardEvent = document.createEventObject ?
		document.createEventObject() : document.createEvent("Events");

	if(keyboardEvent.initEvent) {
		keyboardEvent.initEvent(event, true, true);
	}

	keyboardEvent.keyCode = keycode;
	keyboardEvent.which = keycode;

	document.dispatchEvent ? document.dispatchEvent(keyboardEvent) 
	                   : document.fireEvent(event, keyboardEvent);
}
