// Efecto de animación al hacer scroll
window.addEventListener('scroll', function () {
    let elements = document.querySelectorAll('.animar');
    let scrollTop = document.documentElement.scrollTop;

    elements.forEach(element => {
        let elementTop = element.offsetTop;
        if (elementTop - 500 < scrollTop) {
            element.classList.add('visible');
        } else {
            element.classList.remove('visible');
        }
    });
});

// Validación del formulario de contacto
document.getElementById('contact-form').addEventListener('submit', function (e) {
    e.preventDefault(); // Evita que el formulario se envíe

    let nombre = document.getElementById('nombre').value.trim();
    let email = document.getElementById('email').value.trim();
    let mensaje = document.getElementById('mensaje').value.trim();

    if (!nombre || !email || !mensaje) {
        alert('Por favor, completa todos los campos.');
        return;
    }

    if (!validarEmail(email)) {
        alert('Por favor, ingresa un correo electrónico válido.');
        return;
    }

    alert('¡Mensaje enviado correctamente!');
    e.target.reset(); // Reinicia el formulario
});

// Función para validar el formato del correo electrónico
function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Manejo del menú en dispositivos móviles
const navbarToggler = document.querySelector('.navbar-toggler');
const navbarNav = document.getElementById('navbarNav');

navbarToggler.addEventListener('click', () => {
    navbarNav.classList.toggle('show');
});

// Array para almacenar las notas
let notas = [
    { texto: "Practica la gratitud diariamente para mejorar tu bienestar emocional.", id: 1 },
    { texto: "La meditación y respiración consciente ayudan a reducir el estrés.", id: 2 },
    { texto: "Establece límites saludables en tus relaciones para cuidar tu energía mental.", id: 3 }
];

// Cargar las notas al iniciar la página
window.onload = () => mostrarNotas();

// Función para mostrar las notas en pantalla
function mostrarNotas() {
    const listaNotas = document.getElementById('listaNotas');
    listaNotas.innerHTML = ''; // Limpiar contenido previo

    notas.forEach((nota) => {
        const notaDiv = document.createElement('div');
        notaDiv.classList.add('nota');

        notaDiv.innerHTML = `
            <p contenteditable="true" onblur="modificarNota(${nota.id}, this)">${nota.texto}</p>
            <button class="btn eliminar-btn" onclick="eliminarNota(${nota.id})">
                <i class="fas fa-trash-alt"></i> Eliminar
            </button>
        `;
        listaNotas.appendChild(notaDiv);
    });
}

// Función para agregar una nueva nota
function crearNota() {
    const notaInput = document.getElementById('notaInput').value.trim();

    if (notaInput === '') {
        alert('Por favor, escribe una nota antes de agregarla.');
        return;
    }

    const nuevaNota = {
        texto: notaInput,
        id: Date.now()
    };

    notas.push(nuevaNota);
    document.getElementById('notaInput').value = ''; // Limpiar campo de entrada
    mostrarNotas();
}

// Función para modificar una nota (se guarda automáticamente al perder foco)
function modificarNota(id, elemento) {
    const nuevaTexto = elemento.innerText.trim();
    const nota = notas.find((n) => n.id === id);

    if (nota) {
        nota.texto = nuevaTexto;
    }
}

// Función para eliminar una nota
function eliminarNota(id) {
    notas = notas.filter((nota) => nota.id !== id);
    mostrarNotas();
}

