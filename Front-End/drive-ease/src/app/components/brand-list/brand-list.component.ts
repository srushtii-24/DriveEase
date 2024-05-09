import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Brand } from 'src/app/models/entities/brand';
import { BrandService } from 'src/app/services/brand.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-brand-list',
  templateUrl: './brand-list.component.html',
  styleUrls: ['./brand-list.component.css'],
  providers: [MessageService],
})
export class BrandListComponent implements OnInit {
  brands: Brand[];
  loading: boolean = false;

  constructor(
    private brandService: BrandService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getBrands();
  }

  getBrands() {
    this.loading = true;
    this.brandService
      .getBrands()
      .pipe(
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe((response) => {
        this.brands = response.data;
      });
  }

  deleteBrand(brand: Brand) {
    this.brandService.deleteBrand(brand).subscribe((response) => {
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'The brand is deleted.',
      });
      this.brands = this.brands.filter(
        (brandObj: Brand) => brandObj.brandId != brand.brandId
      );
    });
  }
}
