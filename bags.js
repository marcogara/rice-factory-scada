// Custom tooltip for alarm boxes
const alarmBag1 = document.getElementById('alarmBag1');
const alarmBag2 = document.getElementById('alarmBag2');

function showAlarmTooltip(evt, text) {
    if (!text) return;
    tooltip.textContent = text;
    tooltip.style.opacity = 1;
    tooltip.style.left = (evt.clientX + 10) + 'px';
    tooltip.style.top = (evt.clientY - 10) + 'px';
}
function hideAlarmTooltip() {
    tooltip.style.opacity = 0;
}

[alarmBag1, alarmBag2].forEach(alarm => {
    alarm.addEventListener('mouseenter', function(evt) {
        if (this.title) showAlarmTooltip(evt, this.title);
    });
    alarm.addEventListener('mousemove', function(evt) {
        if (this.title) showAlarmTooltip(evt, this.title);
    });
    alarm.addEventListener('mouseleave', hideAlarmTooltip);
});

// Start/Stop button logic and bag fill animation
const startBtn = document.getElementById('startBtn');
const bag1Fill = document.getElementById('bag1Fill');
const bag2Fill = document.getElementById('bag2Fill');
const bag1LevelText = document.getElementById('bag1-level');
const bag2LevelText = document.getElementById('bag2-level');
const changeBag1Btn = document.getElementById('changeBag1Btn');
const changeBag2Btn = document.getElementById('changeBag2Btn');

let running = false;
let bag1Level = 0;
let bag2Level = 0;
let bag1Interval = null;
let bag2Interval = null;

function updateBagDisplay() {
    // Bag 1
    bag1Fill.setAttribute('y', 400 - bag1Level);
    bag1Fill.setAttribute('height', bag1Level);
    let percent1 = Math.round((bag1Level / 60) * 100);
    bag1LevelText.textContent = percent1 + "%";
    // Bag 2
    bag2Fill.setAttribute('y', 440 - bag2Level);
    bag2Fill.setAttribute('height', bag2Level);
    let percent2 = Math.round((bag2Level / 60) * 100);
    bag2LevelText.textContent = percent2 + "%";

    // Alarm logic: if over 80% show alarm, if over 100% show "over" alarm
    if (percent1 >= 100) {
        alarmBag1.textContent = "BAG-003";
        alarmBag1.classList.add("active");
        alarmBag1.title = "OVER!";
    } else if (percent1 >= 80) {
        alarmBag1.textContent = "BAG-003";
        alarmBag1.classList.add("active");
        alarmBag1.title = "almost full";
    } else {
        alarmBag1.textContent = "BAG-003";
        alarmBag1.classList.remove("active");
        alarmBag1.title = "";
    }
    if (percent2 >= 100) {
        alarmBag2.textContent = "BAG-004";
        alarmBag2.classList.add("active");
        alarmBag2.title = "OVER!";
    } else if (percent2 >= 80) {
        alarmBag2.textContent = "BAG-004";
        alarmBag2.classList.add("active");
        alarmBag2.title = "almost full";
    } else {
        alarmBag2.textContent = "BAG-004";
        alarmBag2.classList.remove("active");
        alarmBag2.title = "";
    }

    // Enable/disable change buttons
    changeBag1Btn.disabled = percent1 < 90;
    changeBag1Btn.style.background = percent1 < 90 ? "#eee" : "#51cf66";
    changeBag2Btn.disabled = percent2 < 90;
    changeBag2Btn.style.background = percent2 < 90 ? "#eee" : "#51cf66";
}

function animateBagFill() {
    // Bag 1 (OUT-003): slow fill
    bag1Level = 0;
    bag1Fill.setAttribute('y', 400);
    bag1Fill.setAttribute('height', 0);
    // Bag 2 (OUT-004): slow fill
    bag2Level = 0;
    bag2Fill.setAttribute('y', 440);
    bag2Fill.setAttribute('height', 0);
    updateBagDisplay();
    bag1Interval = setInterval(() => {
        if (!running) return;
        if (bag1Level < 60) {
            bag1Level += 0.3; // very slow
            updateBagDisplay();
        }
    }, 100);
    bag2Interval = setInterval(() => {
        if (!running) return;
        if (bag2Level < 60) {
            bag2Level += 0.1; // very slow
            updateBagDisplay();
        }
    }, 100);
}

function stopBagFill() {
    clearInterval(bag1Interval);
    clearInterval(bag2Interval);
}

startBtn.addEventListener('click', function() {
    running = !running;

    if (running) {
        startBtn.textContent = "Stop";
        startBtn.classList.add("running");
        animateBagFill();
    } else {
        startBtn.textContent = "Start";
        startBtn.classList.remove("running");
        stopBagFill();
    }
});
changeBag1Btn.addEventListener('click', function() {
    if (!this.disabled) {
        bag1Level = 0;
        updateBagDisplay();
    }
});
changeBag2Btn.addEventListener('click', function() {
    if (!this.disabled) {
        bag2Level = 0;
        updateBagDisplay();
    }
});