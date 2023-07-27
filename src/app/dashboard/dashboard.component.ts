import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { DataService } from '../services/data.service';
import { NgxLoadingComponent, ngxLoadingAnimationTypes } from 'ngx-loading';

export interface PagingConfig {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
   loading = false;
   cityListCount:any;
  countryList:any;
  stateList:any;
  cityList:any;
  isPrograss:any=false;
  tableSize: number[] = [5, 10, 15, 20];

 
  currentPage:number  = 1;
  itemsPerPage: number = 5;
  totalItems: number = 0;

 PrimaryWhite:any = '#dd0032';
 SecondaryGrey:any= '#dd0038';
 PrimaryRed:any = '#dd0031';
 SecondaryBlue = '#1976d2';

 primaryColour = this.PrimaryWhite;
 secondaryColour = this.SecondaryGrey;

@ViewChild('ngxLoading', { static: false })
ngxLoadingComponent!: NgxLoadingComponent;
@ViewChild('customLoadingTemplate', { static: false })
customLoadingTemplate!: TemplateRef<any>;
@ViewChild('emptyLoadingTemplate', { static: false })
emptyLoadingTemplate!: TemplateRef<any>;
showingTemplate = false;
 ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;

public coloursEnabled = false;
public loadingTemplate!: TemplateRef<any>;
public config = {
  animationType: ngxLoadingAnimationTypes.rotatingPlane,

  backdropBorderRadius: '13px',
};
pagingConfig: PagingConfig = {} as PagingConfig;

  constructor(private _service:DataService)
  {
    this.pagingConfig = {
      itemsPerPage: this.itemsPerPage,
      currentPage: this.currentPage,
      totalItems: this.totalItems
    }
  }

ngOnInit(){
  
  this.loading = true;
  this.isPrograss=true;
  this._service.getAllCountries().subscribe(res=>{
    //this.loading = false;
  this.countryList=res.data;
  this.loading = true;
  this.isPrograss=false;
},
(err) => {
 // this.loading = false;
  
})
 
}

onSelect(_selectedValue:any,_entity:any)
{
  this.isPrograss=true;
   debugger
  if(_entity=="Country"){

  this._service.getStateByCountryId(_selectedValue.value).subscribe(
    res=>{
      console.log("my state data is ",res);
      this.stateList=res;
      this.stateList=this.stateList.data;
      this.isPrograss=false;
    });
  }
    else{
      debugger
      this.isPrograss=true;
      this._service.getCityByStateId(_selectedValue.value).subscribe(
        (res:any)=>{
          console.log("my city data is ",res.data.length);
          
          this.cityList=res;
          this.cityList=this.cityList.data;
          if(this.cityList.length>0)
          {
            this.cityListCount=1;
          }
          
           this.isPrograss=false;
           this.pagingConfig.totalItems = this.cityList.length;
        });
    }
}

onTableDataChange(event:any){
  this.pagingConfig.currentPage  = event;
  //this.onSelect();
}
onTableSizeChange(event:any): void {
  this.pagingConfig.itemsPerPage = event.target.value;
  this.pagingConfig.currentPage = 1;
 // this.getCustomers();
}

}
