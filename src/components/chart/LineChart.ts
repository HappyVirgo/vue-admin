import { Component } from "vue-property-decorator";
import { mixins } from "vue-class-component";

import { Line } from "vue-chartjs";

@Component({
  name: "LineChart"
})
export default class LineChart extends mixins(Line) {
  public gradient: TODO;
  public gradient2: TODO;

  mounted() {

    this.renderChart(
      {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July"
        ],
        datasets: [
          {
            label: "Data One",
            borderColor: "#FC2525",
            pointBackgroundColor: "white",
            borderWidth: 1,
            pointBorderColor: "white",
            backgroundColor: this.gradient,
            data: [40, 39, 10, 40, 39, 80, 40]
          },
          {
            label: "Data Two",
            borderColor: "#05CBE1",
            pointBackgroundColor: "white",
            pointBorderColor: "white",
            borderWidth: 1,
            backgroundColor: this.gradient2,
            data: [60, 55, 32, 10, 2, 12, 53]
          }
        ]
      },
      { responsive: true, maintainAspectRatio: false }
    );
  }
}
