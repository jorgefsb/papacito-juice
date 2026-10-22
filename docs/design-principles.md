# Principios del perfil

Los principios generales (disparador más respuesta, proporción, capas, niveles, sonido con consentimiento, loops éticos, QA) son los de Game Feel: https://github.com/jorgefsb/game-feel/blob/main/docs/design-principles.md. Aquí va solo lo propio de la marca personal. Si chocan, este perfil manda para la marca personal.

## Alcance

- Aplica a páginas y apps de la marca personal de Jorge Suárez.
- No aplica a otras marcas ni empresas. Esas conservan su identidad y, si quieren juice, usan Game Feel con su propio perfil y su propio permiso.
- Si no sabes de quién es un sitio, pregunta antes de tocarlo.

## El contenido no cambia

Se alinea el formato, no lo que se dice. Textos, cifras, secciones, enlaces, CTAs y selector de idioma se quedan tal cual. Un texto nuevo entra solo como propuesta aprobada.

## Marca en dos líneas

- **Color:** fondo `#0A0A0A`, superficie `#161616`, acento único `#FF6B35`, ámbar `#FFA500`. Texto sobre oscuro `#FFFFFF`, secundario `#B7B3AD`, borde `#8A7E70`. Papel `#F4E8D5`, kraft `#B99168`, tinta `#22211F`. Sobre naranja el texto va en tinta. El papel nunca es color de texto. Sin neón ni glow. Un acento por pantalla.
- **Tipografía:** Outfit 700 en títulos e Inter 400 en cuerpo, por `--brand-font-heading` y `--brand-font-body`. Radios: 6 controles, 12 tarjetas, 18 paneles.

Fuente de verdad: el brandkit público de la marca (https://brandkit.jorgesuarez.com.mx). Si algo aquí no coincide, gana el brandkit.

## Respuestas

- `jz-tap` en botones, éxito al terminar un formulario, error con shake, fiesta solo en momentos grandes (pago confirmado, todos los Mokis encontrados).
- Partículas solo en `#FF6B35`, `#FFA500` y `#F4E8D5`, detrás del texto.
- Flash corto en el acento, sin resplandor. Solo `transform` y `opacity`. Sin loops permanentes.

## Sonido

Prendido de inicio (`data-jz-sound="on"`) con botón visible para apagarlo. Si la persona lo apaga, se queda apagado. Nunca suena antes de un gesto. Sonidos de juice de menos de 150 ms. Excepciones de la marca: el «¡Ay!» de Moki y la fanfarria de la fiesta.

## Moki, siempre

- Papacito Juice siempre incluye a Moki. Sin Moki no es este perfil.
- Solo arte autorizado del banco de Moki. Nunca espejado. Poses nuevas solo con las reglas del brandkit y como versión nueva del paquete.
- Escondidas diarias: escondites `arriba`, `saluda`, `cuelga` y `asoma` con `data-moki-id`. Más escondites que `data-moki-show`. Nunca la misma pose dos veces en la página.
- Nunca tapa texto ni botones. Quieto en Nada. Reacciona en momentos clave.
- Encontrar a todos los Mokis del día da fiesta y abre Hardcore. Es un logro real, no un atajo.

## Loop de regreso

Escondidas diarias: los escondites cambian cada día. La racha solo felicita, nunca castiga. Nada de escasez falsa, contadores inventados ni datos personales.

## Reglas de página

- Toda página liga de regreso a https://jorgesuarez.com.mx.
- Taps de 44 px mínimo, nada encima de un botón, idiomas funcionando.
- Cero notas internas visibles en texto público.
