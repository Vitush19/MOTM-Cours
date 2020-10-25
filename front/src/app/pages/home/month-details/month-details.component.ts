import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
@Component({
  selector: 'app-month-details',
  templateUrl: './month-details.component.html',
  styleUrls: ['./month-details.component.css']
})
export class MonthDetailsComponent implements OnChanges {
  
  @Input() month: string;
  @Input() notesMonth: number[];
  @Input() commentsMonth: string[];
  comments: string[];
  notes: number[];
  result: number;

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    const c = changes['commentsMonth'];
    const r = changes['notesMonth'];
    this.notes = r.previousValue;
    if(this.notes !== undefined && this.notes.length > 0){
      this.result = this.notes.reduce((p,c) => p+c, )/this.notes.length;
    }
    this.comments = c.previousValue;
  }

}
