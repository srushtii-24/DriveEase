import { CarService } from 'src/app/services/car.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  imageUrl:string = "https://localhost:44388";
  cars:any[]=[];
  currentImage : any;
  dataLoaded:boolean = false;
  constructor(
    private carService:CarService,
  ) { }

  ngOnInit(): void {
    this.getCars()
  }
  getCars(){
    this.carService.getCars().subscribe((response: any)=>{
      this.cars=response.data.slice(0,6);
      this.dataLoaded=true;
    })
  }

  getCurrentImageClass(car:any){
    if(car==this.cars[0]){
      return "carousel-item active"
    } else {
      return "carousel-item"
    }
  }

  getButtonClass(car:any){
    if(car==this.cars[0]){
      return "active"
    } else {
      return ""
    }
  }

}
