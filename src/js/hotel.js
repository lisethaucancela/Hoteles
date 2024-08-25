const hotels = [
    {
        nombre: 'Lakewood',
        calificacion: 3,
        precios: [
            {
                tipo: 'semana',
                regular: 110,
                recompensa: 80
            },
            {
                tipo: 'finSemana',
                regular: 90,
                recompensa: 80

            }],
        foto: 'assets/image/hotel1.jpg'
    },
    {
        nombre: 'Bridgewood',
        calificacion: 4,
        precios: [
            {
                tipo: 'semana',
                regular: 160,
                recompensa: 110
            },
            {
                tipo: 'finSemana',
                regular: 60,
                recompensa: 50

            }],
        foto: 'assets/image/hotel2.jpg'
    },
    {
        nombre: 'Ridgewood',
        calificacion: 5,
        precios: [
            {
                tipo: 'semana',
                regular: 220,
                recompensa: 100
            },
            {
                tipo: 'finSemana',
                regular: 150,
                recompensa: 40

            }],
        foto: 'assets/image/hotel3.jpg'
    }
];

document.addEventListener('DOMContentLoaded', () => {

    function calcularPrecio(hotel, tipoCliente, fechas) {
        var total = 0;

        fechas.forEach(fecha => {
            const dia = new Date(fecha).getDay();
            const tipoSemana = (dia === 0 || dia === 6) ? 'finSemana' : 'semana';

            const precios = hotel.precios.find(p => p.tipo === tipoSemana);

            if (precios) {
                total += precios[tipoCliente];
            }
        });
        return total;
    };

    function encontrarHotel(fechas, tipoCliente) {
        var hotelBarato = null;
        var menorPrecio = Infinity;

        hotels.forEach(hotel => {
            var precioXHotel = calcularPrecio(hotel, tipoCliente, fechas);
            var calificacion = hotelBarato ? hotelBarato.calificacion : 0;

            if (precioXHotel < menorPrecio ||
                (precioXHotel === menorPrecio && hotel.calificacion > calificacion)) {
                menorPrecio = precioXHotel;
                hotelBarato = hotel;
            }
        });

        return {
            Hotel: hotelBarato,
            precioTotal: menorPrecio
        };
    };

    function numStars(stars) {
        let total = ""
        for (let i = 0; i < stars; i++) {
            total += "★"
        }
        return total
    }

    function cargarTarifas(varHotel) {
        var card = '';
        card = ` <div class="grid-container">
            <div class="flex">
                <label class="subtitulo">TARIFA REGULAR</label>
                <label>Entre semana <b> $ ${varHotel.precios.find(p => p.tipo === 'semana')['regular']}</b></label> 
                <span>Fin semana  <b> $ ${varHotel.precios.find(p => p.tipo === 'finSemana')['regular']}</b> </span>
            </div>
            <div class="flex">
                <label class="subtitulo">TARIFA RECOMPENSA</label>
                <label>Entre semana  <b> $ ${varHotel.precios.find(p => p.tipo === 'semana')['recompensa']} </b> </label> 
                <span>Fin semana  <b> $ ${varHotel.precios.find(p => p.tipo === 'finSemana')['recompensa']} </b> </span>
            </div>
        </div>`;
        return card;
    }

    document.getElementById('button-reserva').addEventListener('click', function () {
        event.preventDefault();
        var tipo = document.getElementById('tipoCliente').checked;
        var tipoCliente = tipo ? 'recompensa' : 'regular';

        console.log(tipo)

        var fechaItems = document.querySelectorAll('.fecha-item');
        var fechas = [];

        if (fechaItems.length == 0) {
            alert('Por favor, ingrese al menos una fecha.');
            return;
        }
        fechaItems.forEach(item => {
            var fechaText = item.querySelector('.fecha-text').textContent;
            fechas.push(fechaText.trim());
        });
        var Respuesta = encontrarHotel(fechas, tipoCliente);
        var estrellas = numStars(Respuesta.Hotel.calificacion);

        var cardHotel = document.getElementById('hotel-card');
        cardHotel.textContent = '';

        var sectionHotel = document.getElementById('hotel-list');
        sectionHotel.classList.remove('hide');
        sectionHotel.classList.add('flex');

        cardHotel.innerHTML = ` 
        <img src="${Respuesta.Hotel.foto}" class="img-hotel">
        <div class="card-header">
           
            <span class="nombre-hotel">${Respuesta.Hotel.nombre} | </span> 
            <span class="stars"> ${estrellas}</span>
        
            <div class="grid-container">
                <div class="flex">
                    <label class="subtitulo">FECHAS</label>
                    <h3>${fechas.join(', ')}</h3>
                </div>
                <div class="flex">
                    <label class="subtitulo">TOTAL A PAGAR</label>
                    <h3>$ ${Respuesta.precioTotal}</h3>
                </div>
            </div>

            ${cargarTarifas(Respuesta.Hotel)};
        </div>`;

        var cardHotel = document.getElementById('otraOpcion');
        var filterHotel = hotels.filter(x => x.nombre != Respuesta.Hotel.nombre);
        cardHotel.innerHTML =`<h3 class="text-center">Otras opciones  </h3> `;
        filterHotel.forEach(function (item) {
            cardHotel.innerHTML += ` 
        <p class="nombre-hotel">${item.nombre}</p>` + cargarTarifas(item);
        });

        console.log(Respuesta.Hotel);

    })
});
