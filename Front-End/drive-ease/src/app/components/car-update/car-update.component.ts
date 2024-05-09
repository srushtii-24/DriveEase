import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Brand } from 'src/app/models/entities/brand';
import { Car } from 'src/app/models/entities/car';
import { Color } from 'src/app/models/entities/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-car-update',
  providers: [MessageService],
  templateUrl: './car-update.component.html',
  styleUrls: ['./car-update.component.css'],
})
export class CarUpdateComponent implements OnInit {
  car: Car;
  brands: Brand[];
  colors: Color[];
  brandName: any;
  colorName: any;
  carUpdateForm: FormGroup;

  constructor(
    private carService: CarService,
    private brandService: BrandService,
    private colorService: ColorService,
    private messageService: MessageService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(async (params) => {
      if (params['carId']) {
        this.createCarUpdateForm(params['carId']);
        this.getCarById(params['carId']);
      }
    });
  }

  clear() {
    this.carUpdateForm.reset();
  }

  getCarById(carId: number) {
    this.carService.getCarById(carId).subscribe((response) => {
      if (response && response.success) {
        this.car = response.data;
        this.carUpdateForm.get('carName')?.setValue(response.data.carName);
        this.carUpdateForm
          .get('dailyPrice')
          ?.setValue(response.data.dailyPrice);
        this.carUpdateForm.get('modelYear')?.setValue(response.data.modelYear);
        this.carUpdateForm
          .get('description')
          ?.setValue(response.data.description);
        this.getColors(response.data.colorId);
        this.getBrands(response.data.brandId);
        // this.carUpdateForm.get('carId')?.setValue(response.data.carId);
        // this.carUpdateForm.get('brandId')?.setValue(response.data.brandId);
      }
    });
  }

  async getBrands(brandId: number) {
    this.brandService.getBrands().subscribe(
      (response) => {
        if (response && response.success) {
          this.brands = response.data;
          let brand = this.brands.find((brand) => brand?.brandId == brandId);
          this.carUpdateForm.get('brandId')?.setValue(brand?.brandId);
        }
      },
      (error) => {}
    );
  }

  async getColors(colorId: number) {
    this.colorService.getColors().subscribe(
      (response) => {
        if (response && response.success) {
          this.colors = response.data;
          let color = this.colors.find((color) => color.colorId == colorId);
          this.carUpdateForm.get('colorId')?.setValue(color?.colorId);
        }
      },
      (error) => {}
    );
  }

  createCarUpdateForm(carId: number) {
    this.carUpdateForm = this.formBuilder.group({
      carId: [carId, Validators.required],
      brandId: ['', Validators.required],
      colorId: ['', Validators.required],
      carName: ['', Validators.required],
      dailyPrice: ['', Validators.required],
      modelYear: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  updateCar() {
    this.carUpdateForm.patchValue({ carId: this.car.carId });
    console.log(this.carUpdateForm);
    if (this.carUpdateForm.valid) {
      let carModel = Object.assign({}, this.carUpdateForm.value);
      this.carService.updateCar(carModel).subscribe(
        (response) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: response.message,
          });
        },
        (responseError) => {
          if (responseError.error.ValidationErrors.length > 0) {
            for (
              let i = 0;
              i < responseError.error.ValidationErrors.length;
              i++
            ) {
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: responseError.error.ValidationErrors[i].ErrorMessage,
              });
            }
          }
        }
      );
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'The form is missing.',
      });
    }
  }
}
