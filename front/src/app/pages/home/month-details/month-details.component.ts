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
  rawResult: number;
  result: number;


  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    const c = changes['commentsMonth'];
    const r = changes['notesMonth'];
    this.notes = r.previousValue;
    if(this.notes !== undefined && this.notes.length > 0){
      this.rawResult = this.notes.reduce((p,c) => p+c, )/this.notes.length;
      let nb = (this.rawResult*100)/5 //result in %
      let arrondi = nb*100;
      arrondi = Math.round(arrondi);
      this.result = arrondi/100;
    }
    else {
      this.rawResult = undefined;
      this.result = undefined;
    }
    this.comments = c.previousValue;
  }

}
