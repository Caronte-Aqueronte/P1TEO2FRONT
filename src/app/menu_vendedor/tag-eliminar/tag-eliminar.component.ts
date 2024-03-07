import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TagService } from 'src/app/servicios/tag.service';

@Component({
  selector: 'app-tag-eliminar',
  templateUrl: './tag-eliminar.component.html',
  styleUrls: ['./tag-eliminar.component.css'],
})
export class TagEliminarComponent implements OnInit {
  @Input() tag: any;
  @Output() event = new EventEmitter<void>();

  constructor(private tagService: TagService) {}
  ngOnInit(): void {}

  public eliminar(): void {
    this.tagService.eliminarTagPorId(this.tag.id).subscribe((res) => {
      alert(res.mensaje);
      if (res.bandera) {
        this.event.emit();
      }
    });
  }
}
