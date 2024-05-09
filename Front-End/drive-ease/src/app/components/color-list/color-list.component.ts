import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { finalize } from 'rxjs/operators';
import { Color } from 'src/app/models/entities/color';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color-list',
  providers: [MessageService],
  templateUrl: './color-list.component.html',
  styleUrls: ['./color-list.component.css']
})
export class ColorListComponent implements OnInit {

  colors:Color[];
  loading:boolean = false;

  constructor(private colorService:ColorService,
              private messageService:MessageService) { }

  ngOnInit(): void {
    this.getColors();
  }

  getColors() {
    this.loading = true;
    this.colorService.getColors().pipe(finalize(()=>{this.loading=false;})).subscribe((response) => {
      this.colors = response.data;
    })
  }

  deleteColor(color:Color) {
    this.colorService.deleteColor(color).subscribe((response) => {
    this.messageService.add({severity:'success', summary: 'Success', detail:"The color is deleted."});
    this.colors = this.colors.filter((col:Color) => col.colorId != color.colorId)

    })
  }

}
