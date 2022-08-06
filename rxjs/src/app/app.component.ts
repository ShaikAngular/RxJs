import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { debounceTime, from, fromEvent, interval, Observable, of } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'rxjs';
  agents: Observable<string> | undefined;
  agentName: string | undefined;
  studentsList = ['shaik', 'indivar', 'aadil', 'ihaan']
  students: Observable<string[]> = of(this.studentsList)
  ordersArray = ['dal', 'roti', 'paneer', 'chicken', 'ice cream']
  orders$: Observable<string> = from(this.ordersArray);
  @ViewChild('myButton')
  myButton: ElementRef | undefined;
  
  constructor(private formBuilder: FormBuilder){
  }

  ngOnInit(){
   
    this.agents = new Observable(
      function(observer){
        try{
             observer.next('shaik');
             setInterval(()=>
             observer.next('indivar'),3000)
             setInterval(()=>
             observer.next('hello'),6000)
        }
        catch(e){
             observer.error(e);
        }
      }
    );

    this.agents.subscribe(res=>{
      console.log(res);
      this.agentName = res;
    })

  // of operator
  this.students.subscribe(res=>console.log('of',res + 'Dhiman'));

  
  // from operator
  this.orders$.subscribe(res=>console.log('from',res + 'Dhiman'));

  // interval operator
  this.orders$.subscribe(res=>{
    const setNum$ = interval(1000);
    setNum$.subscribe(num=>{
      if(num < 5){
        console.log(res + num)
      }
      
    }
      );
  })
  }

  // fromEvent operator
  rxjsFromEvent(){
    const btnObservable$ = fromEvent(this.myButton?.nativeElement, 'click');
    btnObservable$.subscribe(res=>console.log(res))
  }

  readValue(){

  }
}
