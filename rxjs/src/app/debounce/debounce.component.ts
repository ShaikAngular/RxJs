import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { debounceTime, take, takeWhile, takeLast, of, filter, from, Observable, first, last, elementAt, distinct, skip, count, max, min} from 'rxjs';
@Component({
  selector: 'app-debounce',
  templateUrl: './debounce.component.html',
  styleUrls: ['./debounce.component.scss']
})
export class DebounceComponent implements OnInit {
  searchForm: FormGroup ;
  name: FormControl | undefined;
  ordersList = ['tv', 'mobile', 'tablet', 'apple'];
  orders$: Observable<string> = from(this.ordersList);

  catogoriesList = ['mobiles', 'chargers', 'tv', 'AC'];
  catogories$: Observable<string> = from(this.catogoriesList);

  fruitsList = ['apple', 'banana', 'mango', 'custurd apple', 'pine apple', 'kiwi', 'avocado', 'jack fruit', 'apple', 'banana', 'mango', 'fig'];
  fruits$: Observable<string> = from(this.fruitsList);

  marksList = [1,33,22,74,45,99,23,54];
  marks$: Observable<number> = from(this.marksList);

  constructor(private formBuilder: FormBuilder){
  }
  
  ngOnInit(): void {
    this.searchForm = new FormGroup({
      name: new FormControl('start search')
    });
    this.searchForm.get('name').valueChanges
    .pipe(
      // take(2), //take N values
      // takeWhile((v)=>this.checkCondition(v)), // conditional operations, takes values till condition is true
      // takeLast(2),
      debounceTime(3000) // timelag before it emits next value
      )
    .subscribe(data=>
      {
        console.log(data);
        this.orders$.pipe(
          takeLast(2) // wherever we are sure about dataset, we need specific last emitted values
        ).subscribe(data2=>
       console.log("take last",data2)
        )
      });

    this.catogories$.
    pipe(
      first() // takes first value from the observable
    ).
    subscribe(list=>
      console.log('cate', list)
      )

      this.catogories$.
      pipe(
        last() // takes last value from the observable
      ).
      subscribe(end=>
        console.log('cate', end)
      )

      this.catogories$.
      pipe(
        elementAt(2)
        ). // provides element at specified index
      subscribe(at=>
        console.log('cate', at)
      )

      //filter operator
    this.fruits$.pipe(
      filter((v)=>this.filterFruits(v)) // filtering list based on length
    )
    .subscribe(fruit=>
      console.log('fruit', fruit))

    //distinct operator
    this.fruits$.pipe(
      distinct() // distinct (unique) values
    )
    .subscribe(fruitD=>
      console.log('fruit distinct', fruitD))

    // skip operator
    this.fruits$.pipe(
      distinct(), // distinct (unique) values
      skip(2) // skip first 2 elements from the list
    )
    .subscribe(fruitskip=>
      console.log('distinct skip', fruitskip))

    // count operator
    this.fruits$.pipe(
      count()
    )
    .subscribe(fruitcount=>
      console.log('count', fruitcount))

   // max operator
   this.marks$.pipe(
    max()
   )
   .subscribe(max=>
    console.log('max value', max)
   )

  // min operator
  // max operator
  this.marks$.pipe(
    min()
   )
   .subscribe(min=>
    console.log('min value', min)
   )

  }

  checkCondition(value){
    return value.length > 5 ? false :true;
  }

  readValue(){
    
  }

  filterFruits(v){
   return v.length >7 ? true : false;
  }
}
