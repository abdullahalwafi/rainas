const apiKey = "1fe5f03e8b679377cbc41601289edfdd";

function getWeather() {
  let city = document.getElementById("city").value;
  if (city === "") {
    city = "Jakarta";
  }
  document.getElementById(
    "Hasilcity"
  ).innerHTML = `Hasil cuaca untuk kota ${city}`;
  const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      const weatherDataContainer = document.getElementById("weather-data");
      weatherDataContainer.innerHTML = "";

      // Ambil data untuk 6 jam ke depan
      const forecastData = data.list.slice(0, 6);

      forecastData.forEach((forecast, index) => {
        // Mendapatkan waktu ramalan cuaca
        const timestamp = new Date(forecast.dt * 1000); // Konversi dari detik ke milidetik
        const hours = timestamp.getHours();
        const minutes = timestamp.getMinutes();
        const timeString = `${hours < 10 ? "0" : ""}${hours}:${
          minutes < 10 ? "0" : ""
        }${minutes}`;

        // Mendapatkan ikon cuaca dari data cuaca saat ini
        const icon = forecast.weather[0].icon;
        // Membuat URL ikon cuaca dari kode ikon
        const img = `http://openweathermap.org/img/wn/${icon}.png`;

        // Menghitung suhu dalam Celsius
        const suhuCelsius = (forecast.main.temp - 273.15).toFixed(2);
        const tanggal = timestamp.toLocaleDateString("en-ID", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        });
        // Membuat elemen untuk menampilkan informasi cuaca
        const weatherInfo = document.createElement("div");
        weatherInfo.classList.add("weather-info");
        weatherInfo.innerHTML = `
                    <img src="${img}" alt="weather-icon" />
                    <p>Tanggal: ${tanggal}</p>
                    <p>Waktu: ${timeString}</p>
                    <p>Cuaca: ${forecast.weather[0].description}</p>
                    <p>Suhu: ${suhuCelsius} °C</p>
                `;

        // Tambahkan elemen informasi cuaca ke kontainer
        weatherDataContainer.appendChild(weatherInfo);
      });
    })
    .catch((error) => console.log("Error fetching weather data:", error));
}

window.onload = getWeather;

$(document).ready(function () {
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $("#main-header").addClass("scrolled");
    } else {
      $("#main-header").removeClass("scrolled");
    }
  });
});
