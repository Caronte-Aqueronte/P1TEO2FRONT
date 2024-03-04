import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TagService } from 'src/app/servicios/tag.service';

@Component({
  selector: 'app-crear-tag',
  templateUrl: './crear-tag.component.html',
  styleUrls: ['./crear-tag.component.css'],
})
export class CrearTagComponent implements OnInit {
  formSubir: FormGroup; //formulario para la subida de archivos
  file!: File;
  banderaError: boolean = false;
  banderaAcierto: boolean = false;
  mensaje: string = '';
  constructor(
    private formBuilder: FormBuilder,
    private tagService: TagService
  ) {
    this.formSubir = this.formBuilder.group({
      nombreTag: ['', [Validators.required, Validators.minLength(1)]],
    });
  }
  ngOnInit(): void {}

  public crearTag(): void {}
}
