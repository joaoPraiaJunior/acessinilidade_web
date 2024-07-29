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
    span.classList.add('escondeVisualmente');
    span.textContent = '(Slide atual)';
    removeDescricaoSlideAtual();
    botaoControlador.append(span);
  }

  function removeDescricaoSlideAtual() {
    const spans = document.getElementsByClassName('escondeVisualmente');
    spans[0].remove();
  }

})();

