const warningTimeout = 1800000;
const timeoutNow = 60000;
let warningTimerID;
let timeoutTimerID;

function startTimer() {
  // window.setTimeout returns an Id that can be used to start and stop a timer
  warningTimerID = window.setTimeout(warningInactive, warningTimeout);
}

// counts down to initiate inactivity warning
function warningInactive() {
  window.clearTimeout(warningTimerID);
  timeoutTimerID = window.setTimeout(autoLogout, timeoutNow);
  let stayLoggedIn = alert(
    "You have been inactive for 30 minutes. If you click ok within 60 seconds, you will stay logged in. Otherwise, you will need to log in again."
  );
  if (stayLoggedIn) {
    resetTimer();
  }
}

// resets the timers
function resetTimer() {
  window.clearTimeout(timeoutTimerID);
  window.clearTimeout(warningTimerID);
  startTimer();
}

// Logout the user.
function autoLogout() {
  document.getElementById("logout").click();
}

// initiates timer on login
startTimer();

// any of the next three actions reset the timer
document.onmousemove = function () {
  resetTimer();
};

document.addEventListener("scroll", function () {
  resetTimer();
});

document.onkeypress = function () {
  resetTimer();
};

// logout before leaving page
window.onbeforeunload = function () {
  autoLogout();
};
