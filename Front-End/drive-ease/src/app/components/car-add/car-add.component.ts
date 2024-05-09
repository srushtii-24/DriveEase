import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Car } from 'src/app/models/entities/car';
import { CarService } from '../../services/car.service';
import { Brand } from 'src/app/models/entities/brand';
import { BrandService } from '../../services/brand.service';
import { Color } from 'src/app/models/entities/color';
import { ColorService } from '../../services/color.service';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-car-add',
  providers: [MessageService],
  templateUrl: './car-add.component.html',
  styleUrls: ['./car-add.component.css']
})
export class CarAddComponent implements OnInit {

  brands:Brand[];
  colors:Color[];
  carAddForm:FormGroup;

  constructor(private carService:CarService,
              private brandService:BrandService,
              private colorService:ColorService,
              private Router:Router,
              private messageService:MessageService,
              private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.createCarAddForm();
    this.getBrands();
    this.getColors();
  }

  clear(){
    this.carAddForm.reset();
  }

  getBrands(){
    this.brandService.getBrands().subscribe(response => {
      this.brands = response.data;
    })
  }

  getColors(){
    this.colorService.getColors().subscribe(response => {
      this.colors = response.data;
    })
  }

  createCarAddForm(){
    this.carAddForm=this.formBuilder.group({
      brandId:["",Validators.required],
      colorId:["",Validators.required],
      carName:["",Validators.required],
      dailyPrice:["",Validators.required],
      modelYear:["",Validators.required],
      description:["",Validators.required],
      image:["",Validators.required]
    })
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.carAddForm.get('image')?.setValue(file);
    }
  }

  addCar(){
    if(this.carAddForm.valid){
      let carModel = Object.assign({},this.carAddForm.value);
      this.carService.addCar(carModel).subscribe(
        response => {
          if(response && response.success){
            if(response.data){
              this.carService.addCarImage(this.carAddForm.controls['image']?.value,response.data.carId).subscribe(
                (response) => {
                  this.messageService.add({severity:'success', summary: 'Success', detail: 'Car details added.'});
                  this.carAddForm.reset();
                  this.Router.navigate(['/carlist']);
                },
                (responseError) => {
                  if(responseError.error.ValidationErrors.length > 0) {
                    for(let i=0;i<responseError.error.ValidationErrors.length;i++) {
                    this.messageService.add({severity:'error', summary: 'Error', detail: responseError.error.ValidationErrors[i].ErrorMessage});
                    }
                  }
                }
              );
            }
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
