let running = false;
let bag1Level = 0;
let bag2Level = 0;
let bag1Interval = null;
let bag2Interval = null;

// Start/Stop button logic bag fill animation
const bag1Fill = document.getElementById('bag1Fill');
const bag2Fill = document.getElementById('bag2Fill');
const bag1LevelText = document.getElementById('bag1-level');
const bag2LevelText = document.getElementById('bag2-level');
const alarmBag1 = document.getElementById('alarmBag1');
const alarmBag2 = document.getElementById('alarmBag2');
const changeBag1Btn = document.getElementById('changeBag1Btn');
const changeBag2Btn = document.getElementById('changeBag2Btn');

function updateBagDisplay() {
    bag1Fill.setAttribute('y', 400 - bag1Level);
    bag1Fill.setAttribute('height', bag1Level);
    let percent1 = Math.round((bag1Level / 60) * 100);
    bag1LevelText.textContent = percent1 + "%";
    bag2Fill.setAttribute('y', 440 - bag2Level);
    bag2Fill.setAttribute('height', bag2Level);
    let percent2 = Math.round((bag2Level / 60) * 100);
    bag2LevelText.textContent = percent2 + "%";

    // Alarm logic
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
    // Prevent multiple intervals
    stopBagFill();
    bag1Interval = setInterval(() => {
        if (!running) return;
        if (bag1Level < 60) {
            bag1Level += 0.1;
            updateBagDisplay();
        }
    }, 100);
    bag2Interval = setInterval(() => {
        if (!running) return;
        if (bag2Level < 60) {
            bag2Level += 0.1;
            updateBagDisplay();
        }
    }, 100);
}

function stopBagFill() {
    clearInterval(bag1Interval);
    clearInterval(bag2Interval);
    bag1Interval = null;
    bag2Interval = null;
}

window.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.getElementById('startBtn');
    const changeBag1Btn = document.getElementById('changeBag1Btn');
    const changeBag2Btn = document.getElementById('changeBag2Btn');
    if (!startBtn) return;

    startBtn.addEventListener('click', () => {
  
        if (startBtn.classList.contains('running')) {
            animateBagFill();
        } else {
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

    updateBagDisplay();
});
