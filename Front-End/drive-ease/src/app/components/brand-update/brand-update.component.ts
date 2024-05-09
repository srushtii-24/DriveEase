import { Brand } from './../../models/entities/brand';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { BrandService } from 'src/app/services/brand.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-brand-update',
  templateUrl: './brand-update.component.html',
  providers: [MessageService],
  styleUrls: ['./brand-update.component.css']
})
export class BrandUpdateComponent implements OnInit {

  brand:Brand;
  brandUpdateForm:FormGroup;

  constructor(private brandService:BrandService,
              private messageService:MessageService,
              private activatedRoute:ActivatedRoute,
              private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if(params["brandId"]){
        this.getBrandById(params["brandId"]);
        this.createBrandUpdateForm();
      }
    });
  }

  clear(){
    this.brandUpdateForm.reset();
  }

  getBrandById(brandId:number) {
    this.brandService.getBrandById(brandId).subscribe(response => {
      this.brand = response.data;
      if(response && response.data){
        this.brandUpdateForm.get('brandName')?.setValue(response.data.brandName);
      }
    });
  }

  createBrandUpdateForm(){
    this.brandUpdateForm=this.formBuilder.group({
      brandId:["",Validators.required],
      brandName:["",Validators.required]
    })
  }

  updateBrand(){
    this.brandUpdateForm.patchValue({ brandId: this.brand.brandId })
    if(this.brandUpdateForm.valid){
      let brandModel = Object.assign({},this.brandUpdateForm.value);
      this.brandService.updateBrand(brandModel).subscribe(
        response => {
          if(response && response.success == true){
            console.log('hello')
            this.messageService.add({severity:'success', summary: 'Success', detail: response.message});
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
