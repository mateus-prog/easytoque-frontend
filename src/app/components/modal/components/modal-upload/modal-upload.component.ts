import { OnInit, Component, Input, Output, EventEmitter } from '@angular/core';
import { first } from 'rxjs/operators';

import { RequestService } from 'src/app/requests/service/request.service';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styleUrls: ['./modal-upload.component.css']
})
export class ModalUploadComponent implements OnInit {

  @Input() id!: string;
  @Input() idRequest!: string;
  @Input() title!: string;
  @Input() buttonCancel!: string;
  @Input() buttonConfirm!: string;
  @Input() reason!: string;
  disabled: boolean = true;
  
  file!: File | null;
  maximumSizeUpload: number = 5242880;
  extensionAllowedUpload: string[] = ['jpg', 'jpeg', 'png'];
  extensionAllowedUploadMessage!: string[];
  fileName!: string;

  @Output() confirmUpload = new EventEmitter<boolean>();

  constructor(
    private requestService: RequestService,
  ) { }

  ngOnInit(): void {
    this.extensionAllowedUploadMessage = this.extensionAllowedUpload.map(
      x => `${x.toUpperCase()}`
    );
    this.fileName = 'Selecione um arquivo';
  }

  transformMegaBytes(): number{
    return (this.maximumSizeUpload / 1024) / 1024;
  }

  confirmModal(){
    this.uploadRequest();
    this.confirmUpload.emit(true);
  }

  cancelModal(){
    this.confirmUpload.emit(false);
  }

  private translateFormCreateOrUpdate(fileToUpload: any){
    //let dataForm = this.form.value;
    //delete dataForm.url_invoice;

    const formData: FormData = new FormData();
    formData.append('url_invoice', fileToUpload, fileToUpload.name);

    return formData;
  }

  handleFileInput(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.file = event.target.files[0];
      this.fileName = event.target.files[0].name;
    }
  }

  private uploadRequest() {
    const data = this.translateFormCreateOrUpdate(this.file);
    
    this.requestService.upload(this.idRequest, data)
      .pipe(first())
      .subscribe(() => {
        //window.location.href = '/partners';
      })
      .add();
  }

}