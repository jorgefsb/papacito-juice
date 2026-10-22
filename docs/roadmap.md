# Roadmap

La versión estable tiene cuatro niveles: Nada, Poquito, Mucho y Hardcore. Lo de abajo es una propuesta. No está implementado y no es un quinto nivel en esta versión.

## Propuesta: «Legendario»

**Idea.** El entorno responde a acciones útiles. Cuando la persona termina algo que vale (manda un formulario, encuentra a los Mokis, llega a lo que buscaba), esa zona contesta con una respuesta visual corta y una celebración que depende del contexto.

**En este perfil**

- Moki participa solo aquí, en la marca personal, con arte autorizado y poses existentes. Game Feel genérico no agrega mascota.
- El campo del cursor no crece: el máximo sigue siendo 18 px de Hardcore.
- El algoritmo del renderer y su trabajo en GPU no cambian. Cursor líquido sigue con su renderer aprobado byte por byte.
- Movimiento reducido apaga todo.
- Nada bloquea navegación, clics, scroll ni teclado.

**Para que deje de ser propuesta**

1. Pruebas con personas que muestren sonrisas o repetición del gesto.
2. Versión nueva de juice que lo soporte, sin editar 1.2.0.
3. Pruebas automáticas de no obstrucción, movimiento reducido y trabajo acotado.
4. Aprobación del dueño de la marca.

## Pendientes conocidos

- Un interruptor documentado en juice para apagar la estela vieja de Hardcore en vez de ocultarla con CSS.
- Publicar los releases de Game Feel 1.0.1 y Cursor líquido 1.0.1 para que `npm run setup` no necesite rutas locales.
