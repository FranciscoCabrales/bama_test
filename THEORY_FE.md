Preguntas Teóricas - Frontend

1. ¿Cuáles son las diferencias entre useMemo y useCallback en React y en qué casos deberías usarlos, especialmente considerando un proyecto con Vite que prioriza el rendimiento en desarrollo?

useMemo lo uso para evitar que se recalculen cosas pesadas en cada render. Por ejemplo, si tengo que filtrar y sumar muchos datos, lo meto en un useMemo con sus dependencias y listo.

Por ejemplo:
Memoiza el resultado de una función
Evita cálculos costosos en cada render
Retorna el valor calculado

useCallback me sirve para mantener estable una función entre renders, sobre todo si la paso a componentes hijos y no quiero que se re-rendericen innecesariamente.

por ejemplo: 
Memoiza la función en sí
Evita crear nuevas referencias de función
Retorna la función memoizada



2. ¿Cómo maneja Zustand el estado global sin necesidad de Context API, y qué ventajas ofrece frente a soluciones como Redux o Context para aplicaciones SPA modernas?

Zustand funciona sin Context ni reducers. Creás un store con create(), definís el estado, algunas funciones  y listo. Por ejemplo, tengo usuarios, productos y carrito, y manejo todo desde ahí, incluso funciones asíncronas como fetch de productos. También puedo crear getters como cartTotal() sin complicaciones.
Lo bueno es que los componentes solo se actualizan si usan directamente ese pedazo del estado. O sea, nada de renders innecesarios como pasa a veces con Context.

Comparado con Redux, Zustand te ahorra muchísimo código. No necesitás actions, reducers, ni configurar middlewares. Es más directo: lo que necesitás y usás el hook.


3. ¿Cómo asegura Radix UI la accesibilidad y consistencia visual en componentes reutilizables, y cómo encaja esto con una arquitectura basada en diseño atómico o componentes desacoplados?

Radix UI se encarga de la accesibilidad automáticamente, porque ya mete los atributos ARIA que hacen que los componentes funcionen bien con lectores de pantalla y demás ayudas. Encaja perfecto con diseño atómico porque te da componentes base súper accesibles y estilizados que podés usar como “átomos” en tu sistema. Desde ahí, vas armando componentes más grandes sin perder ni accesibilidad ni consistencia visual.

4. ¿Qué estrategias puedes aplicar para manejar critical CSS y evitar FOUC (Flash of Unstyled Content) en una app construida con Vite y componentes de UI como Radix?

*Inyecto el CSS crítico directo en el HTML con un plugin de Vite.
*Uso capas CSS para separar los estilos en un archivo crítico que cargue rápido
*Para Radix en particular, tengo un hook que añade y quita una clase global que previene el FOUC

5. ¿Cuál sería el paso mínimo para automatizar un despliegue blue-green de una SPA estática (React + Vite) usando AWS S3 y CloudFront, minimizando tiempo de inactividad y errores de caché?


El proceso seria así:

Construyo la app.

Subo todo al bucket de staging.

Corro pruebas básicas para asegurar que funciona.

Cambio el tráfico de CloudFront para que apunte a staging (Blue-Green switch).

Limpio la caché para que los usuarios vean la versión nueva sin problemas.
Si algo falla, hago rollback rápido cambiando el tráfico de vuelta a production y limpio caché otra vez.