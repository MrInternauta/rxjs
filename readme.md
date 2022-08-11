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
