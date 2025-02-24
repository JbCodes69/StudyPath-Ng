import { Component } from '@angular/core';import { ScheduleModule, RecurrenceEditorModule } from '@syncfusion/ej2-angular-schedule';

import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [ScheduleModule, RecurrenceEditorModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'studypath-ng';
}
