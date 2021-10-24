import { Component } from "@angular/core";

@Component({
  selector: 'app-search-results',
  templateUrl: './results.component.html'
})

export class ResultComponent {
  types = ['user', 'repository']
}
