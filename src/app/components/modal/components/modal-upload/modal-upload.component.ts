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
  fileName!: string;
  isUpload!: boolean;
  disabledUploadLogo!: boolean;
  disabledRemoveLogo!: boolean;
  
  maximumSizeUpload: number = 5242880;
  extensionAllowedUpload: string[] = ['jpg', 'jpeg', 'png'];
  extensionAllowedUploadMessage!: string[];
  
  hideMessageSizeUpload!: boolean;
  hideMessageExtensionUpload!: boolean;
  hideMessageVerifyUpload!: boolean;

  @Output() confirmUpload = new EventEmitter<boolean>();

  constructor(
    private requestService: RequestService,
  ) { }

  ngOnInit(): void {
    this.hideMessageVerifyUpload = true;
    this.hideMessageSizeUpload = false;
    this.hideMessageExtensionUpload = false;
    this.isUpload = false;
    this.disabledUploadLogo = true;

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
    
    const formData: FormData = new FormData();
    formData.append('url_invoice', fileToUpload, fileToUpload.name);
    formData.append('id', this.idRequest);

    return formData;
  }

  handleFileInput(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.isUpload = true;
      this.file = event.target.files[0];
      this.fileName = event.target.files[0].name;

      this.checkFileType(event);
      this.checkFileSize(event.target.files[0].size);
    }

    this.checkNumberOfFiles(event.target.files.length);
    this.disabledUploadLogo = this.hideMessageVerifyUpload || this.hideMessageSizeUpload || this.hideMessageExtensionUpload ? true : false;
  }

  private checkNumberOfFiles(countFile: number){
    this.hideMessageVerifyUpload = countFile != 1 ? true : false;
  }

  private checkFileType(event: any){
    this.hideMessageExtensionUpload = true;
    if(event.target.files[0].type && event.target.files[0].type.split('/')[0] == ["image"]){
      this.extensionAllowedUpload.forEach(data =>{
        event.target.files[0].type.split('/')[1] == data ? this.hideMessageExtensionUpload = false : '';
      });
    }
  }

  private checkFileSize(fileSize: any){
    this.hideMessageSizeUpload = fileSize < this.maximumSizeUpload ? false : true;
  }

  private uploadRequest() {
    const data = this.translateFormCreateOrUpdate(this.file);
    
    this.requestService.upload(this.idRequest, data)
      .pipe(first())
      .subscribe(() => {
        window.location.href = '/requests/visualize/'+this.idRequest;
      })
      .add();
  }

}