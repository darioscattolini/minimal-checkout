# Pasarela de pago minimalista

> Componente que implementa una pasarela de pago minimalista utilizando Angular
> y Angular Material, siguiendo las consignas de la Hackathon de Jump2Digital.

## Demostración

En este enlace [se puede visualizar el componente y evaluar su
funcionamiento](https://darioscattolini.github.io/minimal-checkout/).

## Componente

La pasarela de pago es implementada por el componente `CheckoutComponent`. Éste
actualmente se encuentra incrustado dentro de una aplicación de Angular. La
aplicación lo carga dentro de un componente Dialog de Angular Material,
inyectándole los datos del producto que se va a comprar. Su funcionamiento
requiere entonces la instalación de Angular y de Angular Material.

Los datos del producto deben adecuarse a la siguiente interfaz:

```typescript
interface ArticleCheckoutData {
  id: string;
  name: string;
  price: string;
  imgPath: string;
}
```

La carga del componente debe realizarse empleando la API del [componente Dialog
de Angular Material](https://material.angular.io/components/dialog/overview).
Esto requiere:

1. Importar el módulo `MatDialogModule` en el módulo de Angular que hará uso del
   componente (en nuestro caso lo hacemos en el módulo `app.module.ts`):

```typescript
import { MatDialogModule } from '@angular/material/dialog'; 
```

2. Inyectar el servicio `MatDialog` en el componente desde el que se iniciará la
   carga de `CheckoutComponent` (en nuestro caso lo hacemos desde
   `AppComponent`):

```typescript
import { MatDialog } from '@angular/material/dialog';

// ...

export class AppComponent implements OnInit {
  constructor(public dialog: MatDialog) {}

  // ...
}
```

3. Algún método del componente anterior debe solicitar al servicio `MatDialog`
   la carga de `CheckoutComponent`, de la siguiente manera:

```typescript
this.dialog.open(CheckoutComponent, { 
  autoFocus: 'first-heading',
  data,
  disableClose: true,
  panelClass: 'checkout-dialog',
});
```

Los datos de configuración `autoFocus`, `disableClose` y `panelClass` deben
especificarse como en el anterior ejemplo para una correcta visualización del
componente. La propiedad `data`, por su parte, contiene los datos del artículo
que será comprado, y su valor debe amoldarse a la interfaz `ArticleCheckoutData`
presentada anteriormente.

El componente no implementa ninguna lógica para la ejecución del pago más allá
de diferenciar entre los botones de Apple Pay y de pago con tarjeta. A los
efectos de la demostración, cada botón emite un `alert` mostrando los datos que
se recogen del componente y lo que debería suceder después.

## Instalación

El componente por el momento no existe como una librería separada o un
componente autónomo (aunque sería factible exportarlo como un Web Component),
por lo que su instalación requiere reproducir la aplicación de Angular.

En primer lugar es necesario clonar el repositorio e instalar las dependencias
con `npm`:

```shell
git clone https://github.com/darioscattolini/minimal-checkout.git
npm install
```

El comando `ng serve` de la CLI de Angular monta un servidor local desde el cual
se puede visualizar el proyecto. Se trata de un servidor de desarrollo, que
recarga automáticamente la aplicación ante cambios en el código fuente. Puede
accederse a él desde el explorador web, en la dirección`http://localhost:4200/`.

[La documentación de Angular](https://angular.io/) contiene más información
sobre el framework para quienes estén interesados en trabajar en un fork del
proyecto.

## Enfoque y tecnologías adoptados

Para cumplir con la consigna de la Hackathon he elegido el framework
[Angular](https://angular.io/) por estar más familiarizado con él y porque
contiene funcionalidades muy útiles para la construcción y validación de
formularios.

Esta elección me ha permitido utilizar la librería [Angular
Material](https://material.angular.io/), que implementa los componentes de
Material Design para Angular. Ésta ofrece una estética mejorada para los
diversos elementos empleados en el formulario (`input`, `select`, `button`), y
una API sencilla para mostrar pistas y mensajes de error.

Para la validación de números de tarjetas de crédito he empleado la librería
[Credit Card Validator](https://github.com/braintree/card-validator). Esta
librería permite entre otras cosas detectar el proveedor de la tarjeta de
crédito, posibilitando personalizar el resto de los campos de formulario. En
este caso lo demuestro modificando el nombre del código CVV, que varía según el
proveedor (p. ej., comprobar el cambio con la siguiente tarjeta American
Express: 378282246310005). Esto podría explotarse en validaciones más útiles (p.
ej., la longitud del código CVV, que en algunos proveedores es de cuatro
dígitos).

Para la obtención de los nombres y códigos de paíes se utiliza la API [REST
Countries](https://restcountries.com/).

Al tratarse de una aplicación sencilla, cuya función es demostrar el
funcionamiento de un único componente, no se requirió demasiado diseño para la
arquitectura. He empleado un único módulo de Angular (`AppModule`), y no fue
necesario desarrollar ningún servicio. El código fuente, entonces, comprende
básicamente los componentes y los modelos.

Los componentes están ubicados en la carpeta `/app/components`. Sus funciones
son las siguientes:

* `AppComponent` se crea automáticamente al iniciar un nuevo proyecto de
  Angular. Yo le he añadido un esqueleto muy básico de lo que sería una tienda
  online, y es el componente desde el que se dispara la carga de la pasarela de
  pago.
* `CheckoutComponent` es el componente que implementa la pasarela de pago. Su
  lógica se encuentra distribuida en varios componentes hijos, por lo que sólo
  es relevante su método `pay()` que recoge los datos de los campos del
  formulario y dispararía la ejecución del pago en caso de que se implementase.
* A `ArticleComponent` se le delega la presentación del artículo a comprar
  (nombre, imagen, precio).
* A `CreditCardFormComponent` se le delega la gestión del formulario para el
  pago con tarjeta de crédito, y contiene las reglas de validación y los
  mensajes de error.
* He separado el selector de países en un componente diferenciado:
  `CountrySelectorComponent`. Esto obedece a dos razones. La primera es que es
  un componente que puede ser reutilizable (p. ej., en un formulario de registro
  de usuario). La segunda es que involucra una llamada a API y procesamiento de
  la respuesta, lo que recargaría demasiado la lógica de
  `CreditCardFormComponent`.

En la carpeta `models` incluyo interfaces que facilitan el trabajo con el
sistema de tipos estricto de TypeScript. Allí se definen tipos para los
artículos mostrados en la pasarela de pago, para la respuesta a las llamadas a
la API REST Countries, y para el tipo de objeto al que esa respuesta es
transformada.

## Licencia

[MIT](https://opensource.org/licenses/MIT)
