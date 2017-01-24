import { Component } from '@angular/core';
import {Observable} from 'rxjs/Rx';


@Component({
  selector: 'local-time',
  templateUrl: 'app/local-time.component.html',
  styleUrls: ['app/local-time.component.css']
    })
	
export class LocalTimeComponent {
	
  localTime:string=this.currentTime(24);
  hour:number;
  minutes:number;
  currentFormat:number=24;
  stringMinutes:string;
  
  
  ngOnInit(){
    let timer = Observable.timer(2000,1000);
    timer.subscribe(()=>this.currentTime(this.currentFormat,true));
  }
  
  chooseFormat(format:number)
  { 
	
	  if(this.currentFormat!=format && format===24) {
		  this.currentFormat=24;
		  }
		  
	  if(this.currentFormat!=format && format===12){
		  this.currentFormat=12;
		}
  }
  
  currentTime(format:number,update:boolean):string
  {
		console.error("format: "+format+", update: "+update);
		//calculate time:
		let currentTime = new Date();
		this.hour=currentTime.getHours();
		this.minutes=currentTime.getMinutes();
		//adding 0, if time like:2:05
		if(this.minutes<10)
		  this.stringMinutes="0"+this.minutes;
		else
		  this.stringMinutes=""+this.minutes;
		//console.error(this.hour+":"+this.minutes);
		
		
		
		if((update || this.currentFormat!=format) && format===24)
		{
			console.log("updating 24-hr format");
			this.localTime = this.hour+":"+this.stringMinutes;
			return this.localTime;
		}
	  	  
		//else if format==12  &&
	    else if(update || this.currentFormat!=format){
		  	
		  console.log("updating 12-hr format");
		  //adding 0, if time like:2:05
		  if(this.minutes<10)
			  this.stringMinutes="0"+this.minutes;
		  else
			  this.stringMinutes=""+this.minutes;
		  
		  if(this.hour===0)
		  {
			  this.hour+=12;
			  this.localTime=this.hour+":"+this.stringMinutes+" AM";
		  }
		  else if(this.hour==12)
		  {
			this.localTime=this.hour+":"+this.stringMinutes+" PM";  
		  }
		  else if(this.hour>12)
		  {
			this.hour-=12;
			this.localTime=this.hour+":"+this.stringMinutes+" PM";  
		  }
		  else
		  {
			//meaning this.hour is 1am-11:59am
			this.localTime=this.hour+":"+this.stringMinutes+" AM";
		  }
		  return this.localTime;
		}
		
		
		
  }
  
  
}

	