// Cabecera con borde al bajar, pestañas de instalación, copiar y la demo del permiso.
(function () {
  var cabecera = document.querySelector('.cabecera');
  if (cabecera) {
    var marcar = function () { cabecera.classList.toggle('con-borde', window.scrollY > 8); };
    window.addEventListener('scroll', marcar, { passive: true });
    marcar();
  }

  document.querySelectorAll('[role="tablist"]').forEach(function (lista) {
    var pestanas = Array.prototype.slice.call(lista.querySelectorAll('[role="tab"]'));
    function elegir(pestana, foco) {
      pestanas.forEach(function (otra) {
        var activa = otra === pestana;
        otra.setAttribute('aria-selected', activa ? 'true' : 'false');
        otra.tabIndex = activa ? 0 : -1;
        document.getElementById(otra.getAttribute('aria-controls')).hidden = !activa;
      });
      if (foco) pestana.focus();
    }
    pestanas.forEach(function (pestana, i) {
      pestana.addEventListener('click', function () { elegir(pestana, false); });
      pestana.addEventListener('keydown', function (e) {
        var siguiente = null;
        if (e.key === 'ArrowRight') siguiente = pestanas[(i + 1) % pestanas.length];
        if (e.key === 'ArrowLeft') siguiente = pestanas[(i - 1 + pestanas.length) % pestanas.length];
        if (siguiente) { e.preventDefault(); elegir(siguiente, true); }
      });
    });
  });

  document.querySelectorAll('.copiar').forEach(function (boton) {
    boton.addEventListener('click', function () {
      var pre = boton.parentElement.querySelector('pre');
      var lineas = Array.prototype.map.call(pre.querySelectorAll('.orden'), function (l) { return l.textContent; });
      var texto = lineas.length ? lineas.join('\n') : pre.textContent;
      var listo = function () {
        boton.classList.add('copiado');
        boton.setAttribute('aria-label', 'Copiado');
        setTimeout(function () { boton.classList.remove('copiado'); boton.setAttribute('aria-label', 'Copiar'); }, 1800);
      };
      if (navigator.clipboard) navigator.clipboard.writeText(texto).then(listo, function () {});
    });
  });

  // Demo: el agente pide permiso y la respuesta cambia lo que pasa después.
  var demo = document.getElementById('demo');
  if (!demo) return;
  var permiso = demo.querySelector('.permiso');
  var pasoProbar = demo.querySelector('[data-paso="probar"]');
  var siAprueba = demo.querySelectorAll('[data-si]');
  var siRechaza = demo.querySelectorAll('[data-no]');
  var estado = document.getElementById('estado-demo');
  var reiniciar = document.getElementById('reiniciar-demo');
  var iconoHecho = document.getElementById('icono-hecho').innerHTML;
  var iconoAhora = pasoProbar.querySelector('svg').outerHTML;

  function mostrar(lista) { lista.forEach(function (n) { n.classList.remove('oculto'); }); }
  function responder(aprobado, texto) {
    permiso.classList.add('resuelto');
    permiso.querySelector('.decision').textContent = texto;
    if (aprobado) {
      mostrar(siAprueba);
      pasoProbar.classList.remove('ahora');
      pasoProbar.classList.add('hecho');
      pasoProbar.querySelector('svg').outerHTML = iconoHecho;
      estado.textContent = 'Aprobaste la orden: el agente ejecutó las pruebas y terminó.';
    } else {
      mostrar(siRechaza);
      estado.textContent = 'Rechazaste la orden: el agente no la ejecutó.';
    }
    reiniciar.classList.remove('oculto');
  }
  demo.querySelector('[data-accion="una"]').addEventListener('click', function () { responder(true, 'Permitida una vez.'); });
  demo.querySelector('[data-accion="sesion"]').addEventListener('click', function () { responder(true, 'Permitida en esta sesión.'); });
  demo.querySelector('[data-accion="no"]').addEventListener('click', function () { responder(false, 'Rechazada.'); });
  reiniciar.addEventListener('click', function () {
    permiso.classList.remove('resuelto');
    permiso.querySelector('.decision').textContent = '';
    siAprueba.forEach(function (n) { n.classList.add('oculto'); });
    siRechaza.forEach(function (n) { n.classList.add('oculto'); });
    pasoProbar.classList.remove('hecho');
    pasoProbar.classList.add('ahora');
    pasoProbar.querySelector('svg').outerHTML = iconoAhora;
    estado.textContent = '';
    reiniciar.classList.add('oculto');
    demo.querySelector('[data-accion="una"]').focus();
  });
})();
