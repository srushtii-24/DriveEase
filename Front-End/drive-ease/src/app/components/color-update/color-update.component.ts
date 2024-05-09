import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Color } from 'src/app/models/entities/color';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color-update',
  providers: [MessageService],
  templateUrl: './color-update.component.html',
  styleUrls: ['./color-update.component.css']
})
export class ColorUpdateComponent implements OnInit {

  color:Color;
  colorUpdateForm:FormGroup;

  constructor(private colorService:ColorService,
              private messageService:MessageService,
              private activatedRoute:ActivatedRoute,
              private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if(params["colorId"]){
        this.getColorById(params["colorId"]);
        this.createColorUpdateForm();
      }
    });
  }

  getColorById(colorId:number) {
    this.colorService.getColorById(colorId).subscribe(response => {
      if(response && response.success){
        this.color = response.data;
        this.colorUpdateForm.get('colorName')?.setValue(response.data.colorName);
      }
    });
  }

  createColorUpdateForm(){
    this.colorUpdateForm=this.formBuilder.group({
      colorId:["",Validators.required],
      colorName:["",Validators.required]
    })
  }

  clear(){
    this.colorUpdateForm.reset();
  }

  updateColor(){
    this.colorUpdateForm.patchValue({ colorId: this.color.colorId })
    if(this.colorUpdateForm.valid){
      let colorModel = Object.assign({},this.colorUpdateForm.value);
      this.colorService.updateColor(colorModel).subscribe(
        response => {
    this.messageService.add({severity:'success', summary: 'Success', detail: response.message});
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
