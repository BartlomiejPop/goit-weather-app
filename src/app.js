const dataEL = document.getElementById("data");
const searchButtonEl = document.getElementById("search");
const searchInputEl = document.getElementById("search-input");
const errorMessageEl = document.getElementById("error-message");
const tableContentEl = document.getElementById("table-content");

function getWeatherData(city) {
  errorMessageEl.textContent = "";
  dataEL.textContent = "";

  fetch(
    `http://api.weatherapi.com/v1/current.json?key=c43b11ab80144ee4bd4174150231602&q=${city}&aqi=no`
  )
    .then((response) => response.json())
    .then((data) => {
      dataEL.textContent = JSON.stringify(data, null, 2);
      if (data.error) {
        errorMessageEl.textContent = data.error.message;
      } else {
        dataEL.textContent = JSON.stringify(data, null, 2);

        let content = "";
        for (const [key, value] of Object.entries(data.location)) {
          content += `
            < tr >
                <td class="px-6 py-4">${key}</td>
              <td class="px-6 py-4">${value}</td>
            </tr >
            `;
        }
        tableContentEl.innerHTML = content;
      }
    });
}
searchButtonEl.addEventListener("click", () => {
  const city = searchInputEl.value;
  getWeatherData(city);
});
