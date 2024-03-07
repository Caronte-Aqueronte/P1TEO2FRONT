import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-tag-add',
  templateUrl: './tag-add.component.html',
  styleUrls: ['./tag-add.component.css'],
})
export class TagAddComponent implements OnInit {
  @Input() tag: any;
  @Output() event = new EventEmitter<void>();

  constructor() {}
  ngOnInit(): void {}

  public add(): void {
    this.event.emit();
  }
}
