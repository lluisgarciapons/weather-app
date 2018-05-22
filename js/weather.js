$("#alert").hide();

var app = new Vue({
    el: "#showWeather",
    data: {
        url: 'http://api.openweathermap.org/data/2.5/forecast?q=',
        weather: "",
        forecast: "",
        name: "",
        city_name: "",
        time_now: "",
        time_in_3h: "",
        time_in_6h: "",
        main_weather_now: "",
        temp_now: "",
        temp_in_3h: "",
        temp_in_6h: "",
        description_now: "",
        description_in_3h: "",
        description_in_6h: "",
        min_temp_now: "",
        max_temp_now: "",

        image: "",
        APIkey: '&APPID=90a78a58e157a8a6c7226c208a6c85c3'
    },

    methods: {
        knowCity: function () {
            $("#alert").hide();
             var city_name = $("#city").val();
            city_name = city_name.charAt(0).toUpperCase() + city_name.slice(1);
            this.getData(city_name);
        },

        getData: function (name) {
            $.ajax({
                type: "GET",
                dataType: "json",
                url: this.url + name + '&units=metric' + this.APIkey,

                success: function (json) {
                    var data = json;
                    app.weather = data;
                    app.forecast = app.weather.list;

                    app.city_name = name;
                    $(".hidden").removeClass("hidden");
                    $("#intro").addClass("hidden");
                    $(".info").show();
                    $(".min-max").show();
                    $("#weatherImg").show();
                    $("#three-h-later").show();
                    $("#six-h-later").show();
                    app.getInfo();
                    app.getTime();
                    app.getImage();
                },
                
                error: function() {
                    $("#intro").removeClass("hidden");
                    $("#alert").show().fadeIn(300);
                    $(".info").hide();
                    $(".min-max").hide();
                    $("#weatherImg").hide();
                    $("#three-h-later").hide();
                    $("#six-h-later").hide();
                }
            });
        },

        getInfo: function () {

            this.main_weather_now = app.forecast[0].weather[0].main;

            this.temp_now = Math.round(app.forecast[0].main.temp * 10) / 10;
            this.temp_in_3h = Math.round(app.forecast[1].main.temp) + "ºC";
            this.temp_in_6h = Math.round(app.forecast[2].main.temp) + "ºC";

            this.description_now = app.forecast[0].weather[0].description.charAt(0).toUpperCase() + app.forecast[0].weather[0].description.slice(1);
            this.description_in_3h = app.forecast[1].weather[0].description.charAt(0).toUpperCase() + app.forecast[1].weather[0].description.slice(1);
            this.description_in_6h = app.forecast[2].weather[0].description.charAt(0).toUpperCase() + app.forecast[2].weather[0].description.slice(1);

            this.min_temp_now = app.forecast[0].main.temp_min;

            this.max_temp_now = app.forecast[0].main.temp_max;
        },

        getTime: function () {
            var times = [];
            for (i = 0; i < 3; i++) {
                var time = new Date(app.forecast[i].dt * 1000);
                var timeHours = time.getHours();
                var timeMinutes = "0" + time.getMinutes();
                times.push(timeHours + ':' + timeMinutes.substr(-2));
            }
            this.time_now = times[0];
            this.time_in_3h = times[1];
            this.time_in_6h = times[2];
        },

        getImage: function () {
            var hour = new Date(app.forecast[0].dt * 1000).getHours();
            if (hour < 20 && hour > 7) {

                switch (app.forecast[0].weather[0].main) {
                    case "Clouds":
                        $("#image").removeClass();
                        $("#image").addClass("wi wi-day-cloudy");
                        break;
                    case "Clear":
                        $("#image").removeClass();
                        $("#image").addClass("wi wi-day-sunny");
                        break;
                    case "Rain":
                        $("#image").removeClass();
                        $("#image").addClass("wi wi-day-rain");
                        break;
                    case "Snow":
                        $("#image").removeClass();
                        $("#image").addClass("wi wi-day-snow");
                        break;
                    default:
                        $("#image").removeClass();
                        $("#image").addClass("wi wi-cloud");
                        break;
                }
            } else {
                switch (app.forecast[0].weather[0].main) {
                    case "Clouds":
                        $("#image").removeClass();
                        $("#image").addClass("wi wi-night-alt-cloudy");
                        break;
                    case "Clear":
                        $("#image").removeClass();
                        $("#image").addClass("wi wi-night-clear");
                        break;
                    case "Rain":
                        $("#image").removeClass();
                        $("#image").addClass("wi wi-night-alt-rain");
                        break;
                        case "Snow":
                        $("#image").removeClass();
                        $("#image").addClass("wi wi-night-alt-snow");
                        break;
                    default:
                        $("#image").removeClass();
                        $("#image").addClass("wi wi-cloud");
                        break;
                }
            }
        }
    }
});
