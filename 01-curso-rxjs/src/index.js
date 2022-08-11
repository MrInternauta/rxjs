import { fromEvent, Observable } from "rxjs";

// agregar $ al final
const observableAlfa$ = new Observable(suscriber => {
  suscriber.next(10);
  suscriber.next(2);
  suscriber.next(3);
  suscriber.next(1);
  suscriber.complete() //observable finished
  //suscriber.error('Error en el flujo') //observable finished
})

const observador = {
  next: (value) => {
    console.log('Value', value);
  },
  complete: () => {
    console.info('Finished');
  },
  error: (error) => {
    console.error(error)
  }
}

observableAlfa$.subscribe(observador);

//fromEvent to mousemove
// const observableMouse$ = fromEvent(document, 'mousemove');
// const observadorMouse$ = {
//   next: (value) => console.log('Mouse', value),
// }
// observableMouse$.subscribe(observadorMouse$);

//fromEvent to keydown
const observableKey$ = fromEvent(document, 'keydown');
const observadorKey$ = {
  next: (value) => console.log('Keyboard', value.key),
}
observableKey$.subscribe(observadorKey$);