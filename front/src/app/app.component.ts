import { Component } from '@angular/core';
import { Router, RoutesRecognized } from '@angular/router';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  

  test: boolean;
  
  constructor(private router: Router){
    this.router.events
      .pipe(filter(event => event instanceof RoutesRecognized))
      .pipe(map((event:RoutesRecognized) => event.state.root.firstChild.data['navbar']))
      .subscribe(navbar => this.test = navbar);
  }

  goHome() {
    this.router.navigateByUrl('/');
  }
}
