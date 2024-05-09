import { Payment } from 'src/app/models/entities/payment';
import { PaymentService } from './../../services/payment.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { CreditCard } from 'src/app/models/entities/credit-card';
import { CreditCardService } from 'src/app/services/credit-card.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-credit-card-list',
  templateUrl: './credit-card-list.component.html',
  providers: [MessageService],
  styleUrls: ['./credit-card-list.component.css']
})
export class CreditCardListComponent implements OnInit {

  creditCards:CreditCard[];
  rentalId:number;
  loading:boolean = false;

  constructor(private creditCardService:CreditCardService,
              private paymentService:PaymentService,
              private activatedRoute:ActivatedRoute,
              private messageService:MessageService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if(params["customerId"]){
        this.getCreditCardsByCustomerId(params["customerId"]);
      }
      if(params["rentalId"]){
        this.rentalId = params["rentalId"];
      }
    });
  }

  getCreditCardsByCustomerId(customerId:number) {
    this.loading = true;
    this.creditCardService.getCreditCardsByCustomerId(customerId).pipe(finalize(()=>{this.loading=false})).subscribe((response) => {
      this.creditCards = response.data;
    })
  }

  deleteCreditCard(creditCard:CreditCard) {
    this.creditCardService.deleteCreditCard(creditCard).subscribe((response) => {
    this.messageService.add({severity:'success', summary: 'Success', detail: "The credit card is deleted."});

      setTimeout(() => { window.location.reload(); }, 1500);
    })
  }

  paymentWithThisCreditCard(creditCard:CreditCard) {
    let payment:Payment = new Payment();
    payment.rentalId = Number(this.rentalId);
    payment.cardNo = creditCard.cardNo;
    payment.nameSurname = creditCard.nameSurname;
    payment.expirationDate = creditCard.expirationDate;
    payment.cvc = creditCard.cvc;
    this.paymentService.addPayment(payment).subscribe(
      res => { 

    this.messageService.add({severity:'success', summary: 'Success', detail: "Payment is successful."});
        
      },
      err => { 
        console.log(err.error);
    this.messageService.add({severity:'error', summary: 'Error', detail: err.error});
  }
    )
  }

}
