import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color-add',
  templateUrl: './color-add.component.html',
  providers: [MessageService],
  styleUrls: ['./color-add.component.css']
})
export class ColorAddComponent implements OnInit {

  colorAddForm:FormGroup;

  constructor(private colorService:ColorService,
              private messageService:MessageService,
              private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.createColorAddForm();
  }

  createColorAddForm(){
    this.colorAddForm=this.formBuilder.group({
      colorName:["",Validators.required]
    })
  }

  clear(){
    this.colorAddForm.reset();
  }

  addColor(){
    if(this.colorAddForm.valid){
      let colorModel = Object.assign({},this.colorAddForm.value);
      this.colorService.addColor(colorModel).subscribe(
        response => {
          if(response && response.success){
            this.messageService.add({severity:'success', summary: 'Success', detail: response.message});
            this.colorAddForm.reset();
          }

        },
        responseError => {
        if(responseError.error.ValidationErrors.length > 0) {
          for(let i=0;i<responseError.error.ValidationErrors.length;i++) {
      this.messageService.add({severity:'error', summary: 'Error', detail: responseError.error.ValidationErrors[i].ErrorMessage});

          }
        }
      })
    }
    else {
      this.messageService.add({severity:'error', summary: 'Error', detail: "The form is missing."});

    }
  }

}
