var metronomeOn = false;
var value = "sounds/tink.wav";

/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */

function playSound(e)
{
	const keyaudio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
	const key = document.querySelector(`.drumkey[data-key="${e.keyCode}"]`);
	if(!keyaudio) return;
	keyaudio.currentTime = 0;
	keyaudio.play();
	key.classList.add('playing');
}

function removeTransition(e) {
	if(e.propertyName !== 'transform') return;
	this.classList.remove('playing');
}

const keys = document.querySelectorAll('.drumkey');
keys.forEach(key => key.addEventListener('transitionend', removeTransition));
window.addEventListener('keydown', playSound);

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

var button = document.getElementById("button");
button.onclick = function() {
	var bpm = parseFloat(document.getElementById("inputbpm").value);
	console.log	(document.getElementById("inputbpm").value);
	if (metronomeOn)
	{
		metronomeOn = false;
		button.style.backgroundColor = "#4CAF50";
	}
	else if (bpm && bpm > 0 && bpm <= 400 && !metronomeOn)
	{
		metronomeOn = true;
		button.style.backgroundColor = "red";
		metronome(bpm);
	}
	else if (bpm <= 0 || bpm > 400)
	{
		metronomeOn = false;
		alert("BPM range is between 1 and 400.");
	}
};

// there is a zero space character between these characters: }​;​

function SelectedValue(sel) {
	if (!metronomeOn)
	{
		value = sel.options[sel.selectedIndex].value;
	}
	else
	{
		alert("Can change the metronome sound when the metronome is off");
	}
}

async function metronome (beats) {
	var audio = new Audio(value);
	while (metronomeOn == true)
	{
		if (beats > 0)
		{
			audio.play();
			console.log("played audio");
			await sleep((60 / beats) * 1000);
			audio.pause();
			audio.currentTime = 0.0;
		}
	}
}
