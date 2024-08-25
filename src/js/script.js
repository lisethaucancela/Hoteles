document.getElementById('fecha-input').addEventListener('change', function () {
    var fechaSeleccionadaValue = document.getElementById('fecha-input').value;
    var fechaSeleccionadasContainer = document.getElementById('selected-fecha');


    if (fechaSeleccionadaValue) {
        var fechaItem = document.createElement('div');
        fechaItem.className = 'fecha-item';

        var fechaText = document.createElement('span');
        fechaText.className = 'fecha-text';
        fechaText.textContent = formatDate(new Date(fechaSeleccionadaValue));

        var removeButton = document.createElement('button');
        removeButton.className = 'remove-button';
        removeButton.textContent = '×';
        removeButton.addEventListener('click', function () {
            fechaSeleccionadasContainer.removeChild(fechaItem);
        });

        fechaItem.appendChild(fechaText);
        fechaItem.appendChild(removeButton);
        fechaSeleccionadasContainer.appendChild(fechaItem);

        fechaSeleccionadaValue = '';
    } else {
        alert('Por favor, selecciona una fecha.');
    }

    function formatDate(fecha) { 
       fecha.setDate(fecha.getDate() + 1);
    
        console.log(fecha)
        var day = fecha.getDate();
        var month = fecha.toLocaleString('en-US', { month: 'short' });
        var year = fecha.getFullYear();
        var dayOfWeek = fecha.toLocaleString('en-US', { weekday: 'short' });
        return `${day} ${month} ${year} (${dayOfWeek})`;

    }
}); 