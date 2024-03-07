import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-tag-del',
  templateUrl: './tag-del.component.html',
  styleUrls: ['./tag-del.component.css'],
})
export class TagDelComponent implements OnInit {
  @Input() tag: any;
  @Output() event = new EventEmitter<void>();

  constructor() {}
  ngOnInit(): void {}

  public eliminar(): void {
    this.event.emit();
  }
}
