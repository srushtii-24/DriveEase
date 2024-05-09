import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand-add',
  templateUrl: './brand-add.component.html',
  styleUrls: ['./brand-add.component.css'],
  providers: [MessageService]

})
export class BrandAddComponent implements OnInit {

  brandAddForm: FormGroup;

  constructor(private brandService: BrandService,
    private messageService: MessageService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.createBrandAddForm();
  }

  createBrandAddForm() {
    this.brandAddForm = this.formBuilder.group({
      brandName: ["", Validators.required]
    })
  }

  clear(){
    this.brandAddForm.reset();
  }

  addBrand() {
    if (this.brandAddForm.valid) {
      let brandModel = Object.assign({}, this.brandAddForm.value);
      this.brandService.addBrand(brandModel).subscribe(
        (response) => {
          this.brandAddForm.reset();
          this.messageService.add({severity:'success', summary: 'Success', detail: response.message});
        },
        responseError => {
          if (responseError.error.ValidationErrors.length > 0) {
            for (let i = 0; i < responseError.error.ValidationErrors.length; i++) {
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
