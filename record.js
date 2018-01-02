var isRecording = false;
var keyDowns = [];
var keyUps = [];

var synthCodes = [65, 87, 83, 69, 68, 70, 84, 71, 89, 72, 85, 74, 75];
var synthDowns = [false, false, false, false, false, false, false, false, false, false, false, false, false];


var recbutton = document.getElementById("recordbtn");
recbutton.onclick = function ()
{
	if (isRecording)
	{
		recbutton.style.backgroundColor = "#4CAF50";
		isRecording = false;
		console.log(isRecording);
	}
	else if (!isRecording)
	{
		recbutton.style.backgroundColor = "red";
		isRecording = true;
		console.log(isRecording);
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
				var keyDown = {time : e.timeStamp, key : e.keyCode, key : e.code};
				keyDowns.push(keyDown);
				console.log(keyDowns);
				synthDowns[synthCodes.indexOf(e.keyCode)] = true;
			}
		}
		else
		{
			var keyDown = {time : e.timeStamp, key : e.keyCode, key : e.code};
			keyDowns.push(keyDown);
			console.log(keyDowns);
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
				var keyUp = {time : e.timeStamp, keycode : e.keyCode, key : e.code};
				keyUps.push(keyUp);
				console.log(keyUps);
				synthDowns[synthCodes.indexOf(e.keyCode)] = false;
			}
		}
		else
		{
			var keyUp = {time : e.timeStamp, keycode : e.keyCode, key : e.code};
			keyUps.push(keyUp);
			console.log(keyUps);
		}
	}
});
