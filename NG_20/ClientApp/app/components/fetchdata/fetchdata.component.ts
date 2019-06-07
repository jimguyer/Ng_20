import { Component, Inject } from '@angular/core';
import { Http, URLSearchParams, Headers } from '@angular/http';

@Component({
    selector: 'fetchdata',
    templateUrl: './fetchdata.component.html'
})
export class FetchDataComponent {
    public Http: Http;
    public BaseURL: string;
    public Headers: Headers;
    public startDateIndex = 0;
    public forecasts = [];
    public forecast = { dateFormatted: "3/27/2020", temperatureC: 0, temperatureF: 32, summary: "Cold Post" };

    constructor(http: Http, @Inject('BASE_URL') baseUrl: string) {
        this.Http = http;
        this.BaseURL = baseUrl;
        this.Headers = new Headers();
        this.Headers.append('Content-Type', 'application/json');
        http.get(baseUrl + 'api/SampleData/WeatherForecasts')
            .subscribe(result => this.forecasts = result.json(), error => console.error(error));
    }
    public OnClick(pControl: string) {
        //console.log("LogOn.OnClick * pControl=" + pControl);
        switch (pControl) {
            case "Prior":
                this.startDateIndex -= 5;
                var params = new URLSearchParams;
                params.set("startDateIndex", this.startDateIndex.toString());
                this.Http.get(this.BaseURL + 'api/SampleData/WeatherForecasts/', { params: params })
                    .subscribe(result => this.forecasts = result.json(), error => console.error(error));
                break;
            case "Next":
                this.startDateIndex += 5;
                var params = new URLSearchParams;
                params.set("startDateIndex", this.startDateIndex.toString());
                this.Http.get(this.BaseURL + 'api/SampleData/WeatherForecasts/', { params: params })
                    .subscribe(result => this.forecasts = result.json(), error => console.error(error));
                break;
            case "Post":
                console.log("Post * this.forecast=" + JSON.stringify(this.forecast));
                this.Http.post(this.BaseURL + '/api/SampleData/Post/', this.forecast, { headers: this.Headers })
                    .subscribe(result => alert("Posted" + JSON.stringify(result.json())), error => console.error(error));
                break;
        }
    }
}