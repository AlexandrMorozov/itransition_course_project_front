import { Component, OnInit } from '@angular/core';
import { Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-img-input',
  templateUrl: './img-input.component.html',
  styleUrls: ['./img-input.component.css']
})
export class ImgInputComponent implements OnInit {

  @Output() onFileChange = new EventEmitter<File[]>();
  
  @Output() onSavedPictureChange = new EventEmitter<any[]>();

  files: File[] = [];

  @Input() images:any[];

  selectedImages:any[];

  constructor() { }

  ngOnInit(): void {
  }

  onSelect(event) {
    this.files.push(...event.addedFiles);
    this.onFileChange.emit(this.files);
  }

  onRemove(event) {
    this.files.splice(this.files.indexOf(event), 1);
    this.onFileChange.emit(this.files);
  }

  deleteSelectedImages() {
    this.images = this.images.filter(val => !this.selectedImages.includes(val));
    this.selectedImages = null;

    this.onSavedPictureChange.emit(this.images);
  }
}
