import { BrandService } from 'src/app/services/brand.service';
import { ColorService } from 'src/app/services/color.service';
import { Color } from 'src/app/models/entities/color';
import { Brand } from 'src/app/models/entities/brand';
import { MessageService } from 'primeng/api';
import { Component, OnInit } from '@angular/core';
import { Car } from 'src/app/models/entities/car';
import { CarService } from 'src/app/services/car.service';
import { pipe } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  providers: [MessageService],
  styleUrls: ['./car-list.component.css'],
})
export class CarListComponent implements OnInit {
  cars: Car[];
  loading: boolean = false;

  brands: Brand[];
  colors: Color[];

  constructor(
    private carService: CarService,

    private brandService: BrandService,
    private colorService: ColorService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getBrands();
    this.getColors();
    this.getCars();
  }

  async getBrands() {
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data;
    });
  }

  async getColors() {
    this.colorService.getColors().subscribe(
      (response) => {
        this.colors = response.data;
      },
      (error) => {}
    );
  }

  getCars() {
    this.loading = true;
    this.carService
      .getCars()
      .pipe(
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe((response) => {
        this.cars = response.data;
      });
  }

  getBrandName(brandId: number) {
    if (this.brands && this.brands.length && brandId) {
      let brand = this.brands.find((brand) => brand.brandId == brandId);
      return brand?.brandName;
    } else {
      return 'N.A.';
    }
  }

  getColorName(colorId: number) {
    if (this.colors && this.colors.length && colorId) {
      let color = this.colors.find((color) => color.colorId == colorId);
      return color?.colorName;
    } else {
      return 'N.A.';
    }
  }

  deleteCar(car: Car) {
    this.carService.deleteCar(car).subscribe((response) => {
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'The car is deleted.',
      });
      this.cars = this.cars.filter((carObj: Car) => carObj.carId != car.carId);
    });
  }
}
