// 1) Crear un array para almacenar los nombres
let amigos = [];

// 2) Implementa una función para agregar amigos (MEJORADA)
function agregarAmigo() {
    // Capturar el valor del campo de entrada
    const inputAmigo = document.getElementById('amigo');
    const nombreAmigo = inputAmigo.value.trim(); // trim() elimina espacios en blanco al inicio y final
    
    // VALIDACIÓN AVANZADA
    // 1. Verificar que no esté vacío
    if (nombreAmigo === "") {
        alert("Por favor, inserte un nombre.");
        return;
    }
    
    // 2. Validar longitud mínima (al menos 2 caracteres)
    if (nombreAmigo.length < 2) {
        alert("El nombre debe tener al menos 2 caracteres.");
        return;
    }
    
    // 3. Evitar nombres duplicados (comparación case-insensitive)
    const nombreExiste = amigos.some(amigo => 
        amigo.toLowerCase() === nombreAmigo.toLowerCase()
    );
    
    if (nombreExiste) {
        alert("Este nombre ya está en la lista. Por favor, ingrese un nombre diferente.");
        return;
    }
    
    // Actualizar el array de amigos
    amigos.push(nombreAmigo);
    
    // Limpiar el campo de entrada
    inputAmigo.value = "";
    
    // Llamar a la función para actualizar la lista visual
    actualizarListaAmigos();
    
    // Actualizar contador de amigos
    actualizarContador();
}

// 3) Implementa una función para actualizar la lista de amigos (MEJORADA)
function actualizarListaAmigos() {
    // Obtener el elemento de la lista
    const listaAmigos = document.getElementById('listaAmigos');
    
    // Limpiar la lista existente
    listaAmigos.innerHTML = "";
    
    // Iterar sobre el arreglo usando un bucle for
    for (let i = 0; i < amigos.length; i++) {
        // Crear un nuevo elemento de lista para cada amigo
        const elementoLista = document.createElement('li');
        
        // Crear el contenido con el nombre y botón de eliminar
        elementoLista.innerHTML = `
            <span>${amigos[i]}</span>
            <button class="button-delete" onclick="eliminarAmigo(${i})" title="Eliminar ${amigos[i]}">
                ❌
            </button>
        `;
        
        // Agregar el elemento a la lista
        listaAmigos.appendChild(elementoLista);
    }
}

// 4) Implementa una función para sortear los amigos (MEJORADA)
function sortearAmigo() {
    // Validar que haya amigos disponibles
    if (amigos.length === 0) {
        alert("No hay amigos registrados para sortear. Por favor, agregue amigos a la lista.");
        return;
    }
    
    // Validar que haya al menos 2 amigos para hacer el sorteo más interesante
    if (amigos.length === 1) {
        const confirmar = confirm("Solo hay 1 amigo en la lista. ¿Quieres sortear de todos modos?");
        if (!confirmar) {
            return;
        }
    }
    
    // Generar un índice aleatorio
    const indiceAleatorio = Math.floor(Math.random() * amigos.length);
    
    // Obtener el nombre sorteado
    const amigoSorteado = amigos[indiceAleatorio];
    
    // Mostrar el resultado
    const elementoResultado = document.getElementById('resultado');
    elementoResultado.innerHTML = `<li>🎉 El amigo secreto sorteado es: <strong>${amigoSorteado}</strong> 🎉</li>`;
}

// INICIALIZACIÓN Y EVENT LISTENERS
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar contador al cargar la página
    actualizarContador();
    
    // Event listener para la tecla Enter en el campo de texto
    document.getElementById('amigo').addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            agregarAmigo();
        }
    });
    
    // Crear botón de limpiar lista y agregarlo al DOM
    const botonLimpiar = document.createElement('button');
    botonLimpiar.textContent = '🗑️ Limpiar Lista';
    botonLimpiar.className = 'button-clear';
    botonLimpiar.onclick = limpiarLista;
    botonLimpiar.title = 'Eliminar todos los amigos de la lista';
    
    // Agregar el botón al contenedor de botones
    const contenedorBotones = document.querySelector('.button-container');
    contenedorBotones.appendChild(botonLimpiar);
});

// NUEVAS FUNCIONES PARA LAS MEJORAS

// Función para eliminar un amigo específico de la lista
function eliminarAmigo(indice) {
    // Validar que el índice sea válido
    if (indice >= 0 && indice < amigos.length) {
        const nombreEliminado = amigos[indice];
        
        // Confirmar la eliminación
        const confirmar = confirm(`¿Estás seguro de eliminar a "${nombreEliminado}" de la lista?`);
        
        if (confirmar) {
            // Eliminar el amigo del array usando splice()
            amigos.splice(indice, 1);
            
            // Actualizar la lista visual
            actualizarListaAmigos();
            
            // Actualizar contador
            actualizarContador();
            
            // Limpiar resultado si no hay más amigos
            if (amigos.length === 0) {
                const elementoResultado = document.getElementById('resultado');
                elementoResultado.innerHTML = "";
            }
        }
    }
}

// Función para limpiar toda la lista
function limpiarLista() {
    // Verificar si hay amigos en la lista
    if (amigos.length === 0) {
        alert("La lista ya está vacía.");
        return;
    }
    
    // Confirmar la limpieza total
    const confirmar = confirm(`¿Estás seguro de que quieres eliminar los ${amigos.length} amigos de la lista?`);
    
    if (confirmar) {
        // Vaciar el array completamente
        amigos = [];
        
        // Actualizar la lista visual
        actualizarListaAmigos();
        
        // Actualizar contador
        actualizarContador();
        
        // Limpiar resultado
        const elementoResultado = document.getElementById('resultado');
        elementoResultado.innerHTML = "";
        
        // Limpiar campo de entrada
        document.getElementById('amigo').value = "";
        
        // Mostrar mensaje de confirmación
        alert("Lista limpiada exitosamente.");
    }
}

// Función para actualizar el contador de amigos
function actualizarContador() {
    // Buscar si existe un elemento contador, si no, crearlo
    let contador = document.getElementById('contadorAmigos');
    
    if (!contador) {
        // Crear el elemento contador si no existe
        contador = document.createElement('p');
        contador.id = 'contadorAmigos';
        contador.className = 'contador-amigos';
        
        // Insertarlo antes de la lista de amigos
        const listaAmigos = document.getElementById('listaAmigos');
        listaAmigos.parentNode.insertBefore(contador, listaAmigos);
    }
    
    // Actualizar el texto del contador
    const cantidadAmigos = amigos.length;
    if (cantidadAmigos === 0) {
        contador.textContent = "No hay amigos en la lista";
    } else if (cantidadAmigos === 1) {
        contador.textContent = "1 amigo en la lista";
    } else {
        contador.textContent = `${cantidadAmigos} amigos en la lista`;
    }
}