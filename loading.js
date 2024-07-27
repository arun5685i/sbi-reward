function startCountdown(duration, display) {
    var timer = duration, minutes, seconds;
    var countdownInterval = setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            clearInterval(countdownInterval);
            display.textContent = "00:00";
        }
    }, 1000);
}

function startShortCountdown(duration, display) {
    var timer = duration;
    var countdownInterval = setInterval(function () {
        if (timer <= 0) {
            clearInterval(countdownInterval);
            // Hide the loader
            document.getElementById('loader25').style.display = 'none';
            // Show the main content
            document.getElementById('root').style.display = 'block';
        } else {
            // Update the countdown timer
            timer--;
            var minutes = Math.floor(timer / 60);
            var seconds = timer % 60;
            display.textContent = `00:${seconds < 10 ? '0' : ''}${seconds}`;
        }
    }, 1000);
}

window.onload = function () {
    var twoMinutesFiftyNineSeconds = 2 * 60 + 59;
    var tenSeconds = 10;

    var display1 = document.querySelector('#timer');
    var display2 = document.querySelector('#countdown25');

    startCountdown(twoMinutesFiftyNineSeconds, display1);
    startShortCountdown(tenSeconds, display2);
};