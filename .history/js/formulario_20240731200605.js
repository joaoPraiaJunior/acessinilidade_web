(function () {

    'use strict';

    const elementos = {
        formulario: '[data-js="formulario"]',
        camposDoFormulario: '[data-js="campos-do-formulario"]',
    }

    const formulario = document.querySelector(elementos.formulario);
    const camposDoFormulario = document.querySelectorAll(elementos.camposDoFormulario);

    const dadosDeUsuarios = JSON.parse(localStorage.getItem('Contato')) || [];

    const domains = ['gmail.com', 'aol.com', 'yahoo.com', 'hotmail.com', 'live.com', 'outlook.com', 'globo.com', 'uol.com.br', 'bol.com.br', 'terra.com.br', 'ig.com.br', 'r7.com', 'zipmail.com.br', 'joaopraia.com.br'];
    const secondLevelDomains = ['hotmail', 'live', 'outlook', 'globo', 'uol', 'bol', 'terra', 'ig', 'r7', 'zipmail', 'joaopraia'];
    const topLevelDomains = ["com", "net", "org", "info", "edu", "gov", "br", "com.br", "net.br", "org.br", "info.br", "edu.br", "gov.br"];

    const tiposDeErro = [
        'valueMissing',
        'typeMismatch',
        'patternMismatch',
        'tooShort',
        'customError'
    ]

    const mensagensDeErro = {
        nome: {
            valueMissing: "O campo de nome não pode estar vazio.",
            patternMismatch: "Por favor, preencha seu nome completo somente com letras.",
            tooShort: "Por favor, preencha seu nome completo com mais de 5 caracteres."
        },
        email: {
            valueMissing: "O campo de e-mail não pode estar vazio.",
            typeMismatch: "Por favor, preencha um email válido.",
            tooShort: "Por favor, preencha um email válido."
        },
        telefone: {
            valueMissing: "O campo de telefone não pode estar vazio.",
            patternMismatch: "Seu telefone deve ser um número válido.",
            tooShort: "O telefone ultrapassou o número máximo de caracteress."
        },
        cep: {
            valueMissing: 'O campo de cep não pode estar vazio.',
            patternMismatch: "Por favor, preencha um Cep válido.",
            customError: "O Cep digitado não existe.",
            tooShort: "O campo de Cep não tem caractéres suficientes."
        },
        endereco: {
            valueMissing: 'O campo de endereço não pode estar vazio.',
            patternMismatch: "Por favor, preencha um endereço válido.",
            customError: "O endereço digitado não existe.",
            tooShort: "O campo de endereço não tem caractéres suficientes."
        },
        bairro: {
            valueMissing: 'O campo bairro não pode estar vazio.',
            patternMismatch: "Por favor, preencha um bairro válido.",
            customError: "O bairro digitado não existe.",
            tooShort: "O campo bairro não tem caractéres suficientes."
        },
        cidade: {
            valueMissing: 'O campo cidade não pode estar vazio.',
            patternMismatch: "Por favor, preencha um cidade válido.",
            customError: "O cidade digitado não existe.",
            tooShort: "O campo cidade não tem caractéres suficientes."
        },
        estado: {
            valueMissing: 'O campo estado não pode estar vazio.',
            patternMismatch: "Por favor, preencha um estado válido.",
            customError: "O estado digitado não existe.",
            tooShort: "O campo estado deve conter 2 dígitos."
        },
        mensagem: {
            valueMissing: 'O campo mensagem não pode estar vazio.',
            patternMismatch: "Por favor, caracteres inseridos não são válidos.",
            tooShort: "O campo mensagem não tem caractéres suficientes."
        },

        termos: {
            valueMissing: 'Você deve aceitar nossos termos antes de continuar.',
        }
    }

    const listaDeEventos = ['invalid', 'blur', 'input'];

    camposDoFormulario.forEach((campo) => {
        listaDeEventos.forEach(eventoListener => {
            campo.addEventListener(eventoListener, (evento) => validaCampos(campo, evento));
        });
    });

    function validaCampos(campo) {
        let mensagemCustomizada = '';
        campo.setCustomValidity('');
        const validadorDeCampo = campo.validity.valid;
        tiposDeErro.forEach(erro => {
            if (campo.validity[erro]) {
                mensagemCustomizada = mensagensDeErro[campo.name][erro];
            }
        });

        if (!validadorDeCampo) {
            campo.setCustomValidity(mensagemCustomizada);
            campo.parentElement.classList.add('contatoCampo--erro');
            campo.classList.add('contatoCampo--validouErro');
        } else {
            campo.parentElement.classList.add('contatoCampo--sucesso');
            campo.classList.add('contatoCampo--validouFoi');
            campo.parentElement.classList.remove('contatoCampo--erro');
            campo.classList.remove('contatoCampo--validouErro');
            campo.setCustomValidity('');
        }

        sugestoesDeEmail(campo.email);
    }

    formulario.addEventListener('submit', function (evento) {
        evento.preventDefault();

        const dadosDoFormulario = {
            nome: formulario.nome.value,
            email: formulario.email.value,
            telefone: formulario.telefone.value,
            cep: formulario.cep.value,
            endereco: formulario.endereco.value,
            bairro: formulario.bairro.value,
            cidade: formulario.cidade.value,
            estado: formulario.estado.value,
            mensagem: formulario.mensagem.value,
            destaques: formulario.destaques.checked
        }

        dadosDeUsuarios.push(dadosDoFormulario);

        localStorage.setItem('Contato', JSON.stringify(dadosDeUsuarios));

        limpaFormulario();
        
    });

    function limpaFormulario() {
        formulario.reset();
        camposDoFormulario.forEach(campo => {
            campo.classList.remove('contatoCampo--validouFoi');
            campo.parentElement.classList.remove('contatoCampo--sucesso');
        });
    }

    function sugestoesDeEmail(campoEmail) {
        const sugestaoDeEmail = document.querySelector(elementos.sugestaoDeEmail);
        Mailcheck.run({
            email: campoEmail.value,
            domains: domains,                       // optional
            topLevelDomains: topLevelDomains,       // optional
            secondLevelDomains: secondLevelDomains, // optional
            suggested: function (suggestion) {
                sugestaoDeEmail.value = `Você quis dizer: ${suggestion.full}?`;
                // sugestaoDeEmail.style.display = 'inline-block';
                sugestaoDeEmail.parentNode.classList.remove('contatoCampo--sucesso');
                campoEmail.classList.remove('contatoCampo--validouFoi');
                sugestaoDeEmail.parentNode.classList.add('contatoCampo--erro');
                campoEmail.classList.add('contatoCampo--validouErro');
                sugestaoDeEmail.setAttribute('role', 'alert');
                sugestaoDeEmail.setAttribute('type', 'text');
                sugestaoDeEmail.setAttribute('tabindex', '0');

            }
        });
    }
})();