
const timeSwitch = document.querySelectorAll(".profile__timeframe>p");
const titles = document.querySelectorAll(".stats__card>p>span:first-of-type");
const currTimeStat = document.querySelectorAll(".stats__card>div>h1");
const lastTimeStat = document.querySelectorAll(".stats__card>div>p");

timeSwitch.forEach((timeSwitcher) => {
  timeSwitcher.addEventListener("click", () => {
    //Remove the active class if on click of a different time-switcher
    timeSwitch.forEach((timeSwitcher) => timeSwitcher.classList.remove("active"));
    //Add the active class if the clicked time-switcher doesn't already have it
    timeSwitcher.classList.add("active");
    //Fetch data from the provided JSOn file
    fetch("./data.json")
    .then(res => res.json())
    .then((data, index) => {
      //loop through the provided JSON file using the index of each piece of data
      for (index = 0; index < data.length; index++){
        titles.forEach(title => {
          //check If the title in the UI is the same as the title of any of the piece of data contained in the JSON file 
          if (title.textContent === data[index].title) {
            for (let i = 0, j = 0; i < currTimeStat.length, j < lastTimeStat.length; i++, j++) {
              //check if the index of the JSON data is the same as the index of the corresponding title in the UI
              if (index === i) {
                let prevTimeText;
                (timeSwitcher.textContent === "Daily")?prevTimeText = "Day":
                (timeSwitcher.textContent === "Weekly")?prevTimeText = "Week":
                prevTimeText = "Month"
                //If So, we update the data on the UI
                currTimeStat[i].textContent = `${data[index].timeframes[timeSwitcher.textContent.toLocaleLowerCase()].current}hrs`;

                lastTimeStat[i].textContent = `Last ${prevTimeText} - ${data[index].timeframes[timeSwitcher.textContent.toLocaleLowerCase()].previous}hrs`
              }
            }
          }
        })
      }
    })
  })
});


