import { Routes } from '@angular/router';
import { LandingPageComponent } from './Components/landing-page/landing-page.component';
import { HomepageComponent } from './Components/homepage/homepage.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { CouresComponent } from './Components/courses/coures.component';
import { TrackerComponent } from './Components/tracker/tracker.component';
import { TimetableComponent } from './Components/timetable/timetable.component';
import { SettingsComponent } from './Components/settings/settings.component';

export const routes: Routes = [
    {
        path: '',
        component: LandingPageComponent
    },
    { path: 'home', component: HomepageComponent,
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full'  },
            { path: 'dashboard', component: DashboardComponent },
            { path: 'courses', component: CouresComponent },
            { path: 'timetable', component: TimetableComponent },
            { path: 'tracker', component: TrackerComponent },
            { path: 'settings', component: SettingsComponent }
        ]
     }
];
