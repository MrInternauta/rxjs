/**
 * Observables: Subject
 * https://rxjs.dev/guide/subject
 */
import { Observable, Subject } from "rxjs";
import { from, of, asyncScheduler } from 'rxjs';
import { interval, timer } from 'rxjs';


const numbers$ = new Observable((subscriber) => {
  // Podemos enviar una función (como Math.random) que generará el mismo dato en observador1 y observador2.
  subscriber.next(Math.round(Math.random() * 100));
  subscriber.next(Math.round(Math.random() * 100));
  subscriber.complete();

});

const numbersRandom$ = new Subject();

numbersRandom$.subscribe({
  next: (number) => {
    console.log('observador1 ' + number);
  },
});
numbersRandom$.subscribe({
  next: (number) => {
    console.log('observador2 ' + number);
  },
});

numbers$.subscribe({
  next: (number) => {
    console.log('observadorx ' + number);
  },
  complete: () => console.log('::::x Completed x::::::')
});
// También podemos enviar valores fuera del observable Subject.
numbersRandom$.next(45);
numbersRandom$.next(Math.round(Math.random() * 100));
numbers$.subscribe(numbersRandom$)



const fruits$ = from(['Apple', 'Pinnaple', 'Tangerine'], asyncScheduler);
const fruits2$ = of('Apple', 'Pinnaple', 'Tangerine');

fruits$.subscribe(console.log)
//fruits2$.subscribe(console.log)

//const sequenceNumber$ = interval(1000); //sent value accourding with the interval

const sequenceNumber$ = timer(1000); //delay a value

sequenceNumber$.subscribe(console.log)
