var context = new AudioContext();

var gainNodes = {};
var oscillators = {};
var keycodes = [65, 87, 83, 69, 68, 70, 84, 71, 89, 72, 85, 74, 75];
var keysdown = [false, false, false, false, false, false, false, false, false, false, false, false, false];
var frequencies = [523.3, 554.4, 587.3, 622.3, 659.3, 698.5, 740.0, 784.0, 830.6, 880.0, 932.3, 987.8, 1047.0]
for (var i in [65, 87, 83, 69, 68, 70, 84, 71, 89, 72, 85, 74, 75])
{
    gainNodes[i] = context.createGain();
    gainNodes[i].gain.value = 0.5;
    gainNodes[i].connect(context.destination);
}


var gainNode = context.createGain();
gainNode.gain.value = 0.5;
var waveform = "square";

var octave = 5;

var slider = document.getElementById("volRange");
var output = document.getElementById("demo");

output.innerHTML = slider.value;

slider.oninput = function() {
    output.innerHTML = this.value;
    for (var i in gainNodes)
    {
        gainNodes[i].gain.value = (parseFloat(this.value)) / 100;
    }
}

function SelectedWave(sel)
{
    value = sel.options[sel.selectedIndex].value;
    waveform = value;
}

window.addEventListener('keydown', function (e) {
    
    if (e.keyCode == 38 && octave < 8) // go up an octave
    {
        for (var i = frequencies.length - 1; i >= 0; i--) {
            frequencies[i] *= 2;
        }
        octave++;
        document.getElementById("octavecount").innerHTML = "Octave: " + octave;
    }

    if (e.keyCode == 40 && octave > 0) // go down an octave
    {
        var list = document.getElementsByClassName("synth");
        for (var i = frequencies.length - 1; i >= 0; i--) {
            frequencies[i] /= 2;
        }
        octave--;
        document.getElementById("octavecount").innerHTML = "Octave: " + octave;
    }

    if (keycodes.includes(e.keyCode))
    {
        if (keysdown[keycodes.indexOf(e.keyCode)] == false)
        {
            const key = document.querySelector(`.synth[data-key="${e.keyCode}"]`);
            key.style.borderColor = "#ffc600";
            oscillators[keycodes.indexOf(e.keyCode)] = context.createOscillator();
            oscillators[keycodes.indexOf(e.keyCode)].connect(gainNodes[keycodes.indexOf(e.keyCode)]);
            oscillators[keycodes.indexOf(e.keyCode)].type = waveform;
            oscillators[keycodes.indexOf(e.keyCode)].frequency.value = frequencies[keycodes.indexOf(e.keyCode)];
            oscillators[keycodes.indexOf(e.keyCode)].start(context.currentTime);
            keysdown[keycodes.indexOf(e.keyCode)] = true;
        }
    }
});

window.addEventListener('keyup', function (e) {
  	
    if (keycodes.includes(e.keyCode))
    {
        if (keysdown[keycodes.indexOf(e.keyCode)] == true)
        {
            const key = document.querySelector(`.synth[data-key="${e.keyCode}"]`);
            oscillators[keycodes.indexOf(e.keyCode)].stop(context.currentTime);
            keysdown[keycodes.indexOf(e.keyCode)] = false;
            oscillators[keycodes.indexOf(e.keyCode)].disconnect();
            if (key.classList.contains("white"))
            {
                key.style.borderColor = "white";
            }
            else if (key.classList.contains("black"))
            {
                key.style.borderColor = "black";
            }
        }
    }
});