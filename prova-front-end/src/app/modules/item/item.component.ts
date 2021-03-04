import { Component, Input, OnInit } from '@angular/core';
import { AppService } from '../../service/parser.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {
  @Input() item: any;
  @Input() ParentsId: Array<number> = [];

  public obj: any;
  public hasChildren = false;
  public checked = false;

  public arrayParentsId: Array<number> = [];

  constructor(
    public parser: AppService,
  ) { }

  ngOnInit() {
    this.obj = this.item.value;
    this.hasChildren = Object.keys(this.obj.children).length > 0;
    this.arrayParentsId = [...this.ParentsId];
    this.arrayParentsId.push( Number(this.item.key));
  }

  toggleInput(): void {
    this.parser.changeInput(this.arrayParentsId, this.obj.checked ? 'unCheck' : 'check');
  }

  toogleOpenNode(): void {
    this.parser.toogleOpenNode(this.arrayParentsId);
  }
}
