## RXJS

### Create project

```bash
mkdir curso-rxjs
cd curso-rxjs
npm init --yes
npm i rxjs webpack webpack-dev-server
npm i -D webpack-cli
```

Create
**webpack.config.js**

```javascript

const path = require('path');
module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public'),
  },
  mode: 'development'
}
```

Add script start to package.json (optional --open)

```json
"start": "webpack serve --open"

```

- Create index.js and index.html
**public/index.html**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Curso RXJS</title>
</head>
<body>
  <script src="./bundle.js"></script>
</body>
</html>
```

**src/index.js**

```javascript
import { Observable } from "rxjs";

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

```

- `npm start` to start the project

## NOTE

- Cuando usamos el método .complete() se librerará la memoria asignada.

## Observables: fromEvent

> Creates an Observable that emits events of a specific type coming from the given event target.

- example `fromEvent(target, eventName)`

```javascript
observableAlfa$.subscribe(observador);

//fromEvent to mousemove
const observableMouse$ = fromEvent(document, 'mousemove');
const observadorMouse$ = {
  next: (value) => console.log('Mouse', value),
}
observableMouse$.subscribe(observadorMouse$);

//fromEvent to keydown
const observableKey$ = fromEvent(document, 'keydown');
const observadorKey$ = {
  next: (value) => console.log('Keyboard', value.key),
}
observableKey$.subscribe(observadorKey$);
```

## Aplicación de fromEvent en PlatziWordle

```javascript
import { fromEvent } from "rxjs";
const letterRows = Array.from(document.getElementsByClassName('letter-row') || [])
const onKeyDown$ = fromEvent(document, 'keydown');
let letterIndex = 0;
let letterRowIndex = 0;

const insertLetter$ = {
  next: (value) => {
    const pressedKey = value.key;
    if (letterRowIndex > 5) {
      return
    }
    if (pressedKey.length == 1 && pressedKey.match(/[a-z]/i) && letterIndex <= 4) {
      let letterBox = letterRows[letterRowIndex].children[letterIndex];
      letterBox.textContent = pressedKey.toUpperCase();
      letterBox.classList.add('filled-letter');
      letterIndex++;
    }

    if (pressedKey == 'Backspace' && letterRows[letterRowIndex].children[letterIndex - 1]) {
      let letterBox = letterRows[letterRowIndex].children[letterIndex - 1];
      letterBox.textContent = null;
      letterBox.classList.remove('filled-letter');
      letterIndex--;
    }

    if (pressedKey == 'Enter' && letterIndex > 4) {
      letterRowIndex++;
      letterIndex = 0;
    }
  },
  complete: () => {
    console.info('Finished');
  },
  error: (error) => {
    console.error(error)
  }
}
onKeyDown$.subscribe(insertLetter$);
```

## Observables: Subject

- Podemos unir las partes observadoras por medio de su caracteristica **multicast**
- además de observable, se puede conectar a un observador
- pude funcionar como un pipe (tuberia multicast)

> What is a Subject? An RxJS Subject is a special type of Observable that allows values to be multicasted to many Observers. While plain Observables are unicast (each subscribed Observer owns an independent execution of the Observable), Subjects are multicast.

> Every Subject is an Observable. Given a Subject, you can subscribe to it, providing an Observer, which will start receiving values normally. From the perspective of the Observer, it cannot tell whether the Observable execution is coming from a plain unicast Observable or a Subject.

> Every Subject is an Observer. It is an object with the methods next(v), error(e), and complete(). To feed a new value to the Subject, just call next(theValue), and it will be multicasted to the Observers registered to listen to the Subject.

### Sin Subject

De esta forma se ejecuta el código de forma diferente (2 ejecuciones distintas)

```javascript
import { Observable } from "rxjs";

const observableAlfa$ = new Observable(suscriber => {
  suscriber.next(Math.random());
})

const observador = {
  next: (value) => {
    console.log('observador', value);
  }
}

const observador2 = {
  next: (value) => {
    console.log('observador2', value);
  }
}
observableAlfa$.subscribe(observador);
observableAlfa$.subscribe(observador2);
```

### Con Subject

De esta forma se ejecuta el código de forma unica (1 ejecución y envia el mismo valos a los observadores)

```javascript
/**
 * Observables: Subject
 * https://rxjs.dev/guide/subject
 */
import { Observable, Subject } from "rxjs";

const numbers$ = new Observable((subscriber) => {
  // Podemos enviar una función (como Math.random) que generará el mismo dato en observador1 y observador2.
  subscriber.next(Math.round(Math.random() * 100));
  subscriber.next(Math.round(Math.random() * 100));

});

const numbersRandom$ = new Subject();

const observador1 = {
  next: (number) => {
    console.log('observador1 ' + number);
  },
};

const observador2 = {
  next: (number) => {
    console.log('observador2 ' + number);
  },
};

numbersRandom$.subscribe(observador1);
numbersRandom$.subscribe(observador2);

numbers$.subscribe(numbersRandom$);
// También podemos enviar valores fuera del observable Subject.
numbersRandom$.next(45);
numbersRandom$.next(Math.round(Math.random() * 100));

```
