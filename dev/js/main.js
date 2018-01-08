
function getTimes(year, month, day, hour, minute, thinkWillLive) {
    const dateNow = new Date();
    const dateNowMs = +dateNow;
    const currentYear = dateNow.getFullYear();
    const currentYearDateBirthMs = +new Date(currentYear, month - 1, day, hour, minute, 0, 0);
    let years, prevDateBirthMs, nextDateBirthMs;
    if(currentYearDateBirthMs > dateNowMs) {
        years = currentYear - year - 1;
        prevDateBirthMs = +new Date(currentYear - 1, month - 1, day, hour, minute, 0, 0);
        nextDateBirthMs = currentYearDateBirthMs;
    } else {
        years = currentYear - year;
        prevDateBirthMs = currentYearDateBirthMs;
        nextDateBirthMs = +new Date(currentYear + 1, month - 1, day, hour, minute, 0, 0);
    }
    const betweenDatesMs = (nextDateBirthMs - prevDateBirthMs);
    const tillNextDateMs = (nextDateBirthMs  - dateNowMs);
    const fromLastDateMs = betweenDatesMs - tillNextDateMs;
    let counts = fromLastDateMs / betweenDatesMs;
    counts = counts.toFixed(9);
    counts = counts.slice(2);
    return `
        <hr>
        <div style="text-align: right">life expectancy: ${thinkWillLive}</div>
        <div style="text-align: right">life spent: ${years}.${counts}</div>
        <div style="text-align: right">life left: ${thinkWillLive - years -1}.${1000000000 - counts}</div>
    `;
}

function getDays(year, month, day, hour, minute, thinkWillLive) {
    const dateBirthMs = +new Date(year, month - 1, day, hour, minute, 0, 0);
    const dateDeathMs = +new Date(year + thinkWillLive, month - 1, day, hour, minute, 0, 0);
    const daysLive = Math.floor((+new Date() - dateBirthMs) / 1000 / 60 / 60 / 24);
    const daysTillDeath = Math.floor((dateDeathMs - dateBirthMs) / 1000 / 60 / 60 / 24) - daysLive;
    return `
        <hr>
        <div style="text-align: right">days spent: ${daysLive}</div>
        <div style="text-align: right">days left: ${daysTillDeath}</div>
    `;
}

function lifeCounter({timesContainer = "times", daysContainer = "days", year = 2000, month = 1, day = 1, hour = 0, minute = 0, thinkWillLive = 90}) {

    const times = document.getElementById(timesContainer);
    if(times) {
        setInterval(() => {
            times.innerHTML = getTimes(year, month, day, hour, minute, thinkWillLive);
        }, 200);
    }

    const days = document.getElementById(daysContainer);
    if (days) {
        days.innerHTML = getDays(year, month, day, hour, minute, thinkWillLive);
    }

}

lifeCounter({
    timesContainer: "times",
    daysContainer: "days",
    year: 1984,
    month: 3,
    day: 21,
    hour: 10,
    thinkWillLive: 80
});
