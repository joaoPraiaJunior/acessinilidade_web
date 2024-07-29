(function() {

  'use strict';

  const elementos = {
    botoesControladores: '[data-js="botoes-controladores"]',
  }
  
  const botoesControladores = document.querySelectorAll(elementos.botoesControladores);

  // Percorre todos os botoes controladores
  botoesControladores.forEach(function(botaoControlador) {
    botaoControlador.addEventListener('click', function() {
      // Remove classe 'ativo' dos outros botoes
      botoesControladores.forEach(function(botaoRemoveClass) {
        botaoRemoveClass.classList.remove('listaDeArtigos-slider-item--ativo')
      });
  
      this.classList.add('listaDeArtigos-slider-item--ativo')
      adicionaDescricaoSlideAtual(botaoControlador);
    });
  });

  function adicionaDescricaoSlideAtual(botaoControlador) {
    const span = document.createElement('span');
    span.id = 'escondeVisualmente';
    span.classList.add('escondeVisualmente');
    span.textContent = '(Slide atual)';
    botaoControlador.append(span);
    removeDescricaoSlideAtual();
  }

  function removeDescricaoSlideAtual() {
    const span = document.getElementById('escondeVisualmente');
    span.remove();
  }

})();

