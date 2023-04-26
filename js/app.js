/* Variables */
const input = document.querySelector('.formulario__texto');
const btnEncriptador = document.querySelector('.botones__boton--encriptar');
const btnDesencriptador = document.querySelector('.botones__boton--desencriptar');
const mensaje = document.querySelector('.mensajes');
const formulario = document.querySelector('.formulario');

const encriptador = {
    a: 'ai',
    e: 'enter',
    i: 'imes',
    o: 'ober',
    u: 'ufat'
}

/* Eventos */
btnEncriptador.addEventListener('click', encriptar);
btnDesencriptador.addEventListener('click', desencriptar);


/* Funciones */
function encriptar(e) {
    e.preventDefault();

    if(input.value === '') {
        error('Ingrese el texto a encriptar');
        return;
    }

    if (!validarInput()) {
        error('Solo letras minúsculas y sin acentos');
        return;
    }

    let resultado = '';
    const palabra = input.value.split('');

    palabra.forEach(letra => {
        resultado+=encriptador[letra] || letra;
    });

    if (resultado === input.value) {
        error('Ingrese una palabra o frase valida');
        return;
    }

    insertarResultados(resultado);
}

function desencriptar(e) {
    e.preventDefault();

    if(input.value === '') {
        error('Ingrese el texto a desencriptar');
        return;
    }

    if (!validarInput()) {
        error('Solo letras minúsculas y sin acentos');
        return;
    }

    let resultado = input.value;
    const keys = Object.keys(encriptador);

    while (true) {
        let temporal = resultado;
        keys.forEach(key => {
            resultado = resultado.replace(encriptador[key], key);  
        });
        if (temporal === resultado) {
            break;
        }
    }

    if (resultado === input.value) {
        error('Ingrese una palabra o frase encriptada');
        return;
    }

    insertarResultados(resultado);

}

function error(error) {
    const advertencia = document.querySelector('.formulario__advertencia');
    const advertenciaIcon = document.querySelector('.formulario__alerta path');
    advertencia.textContent = error;
    advertencia.classList.add('formulario__info--error');
    advertenciaIcon.setAttribute('fill', 'red');

    setTimeout(() => {
        advertencia.textContent = 'Solo letras minúsculas y sin acentos';
        advertencia.classList.remove('formulario__info--error');
        advertenciaIcon.setAttribute('fill', '#495057');

    }, 3200);
}
    
function validarInput() {
    const regex = /^[a-zñ ]+$/;
    return regex.test(input.value);
}

function insertarResultados(result) {
    limpiarHTML()
    const resultado = document.createElement('div');
    const texto = document.createElement('p');
    texto.classList.add('mensajes__resultado');
    texto.textContent = result;
    resultado.classList.add('mensajes__contenido');
    mensaje.classList.add('mensajes--whit');
    resultado.appendChild(texto);
    mensaje.appendChild(resultado);
    btnCopiar(result);
    formulario.reset();
}

function limpiarHTML() {
    while (mensaje.firstChild) {
        mensaje.firstChild.remove();
    }
}

function btnCopiar(texto) {
    const btn = document.createElement('button');
    btn.classList.add('botones__boton', 'botones__boton--copiar');
    btn.textContent = 'Copiar';
    btn.addEventListener('click', ()=> {
        navigator.clipboard.writeText(texto);
    })
    mensaje.appendChild(btn);
    
}

