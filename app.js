new Vue({
    el: '#app',
    data: {
        saludJugador: 100,
        saludMonstruo: 100,
        hayUnaPartidaEnJuego: false,
        turnos: [], //es para registrar los eventos de la partida
        esJugador: false,
        rangoAtaque: [3, 10],
        rangoAtaqueEspecial: [10, 20],
        rangoAtaqueDelMonstruo: [5, 12],
    },

    methods: {
        getSalud(salud) {
            return `${salud}%`
        },
        empezarPartida: function () {
            
                this.hayUnaPartidaEnJuego = true;
                this.saludJugador = 100;
                this.saludMonstruo = 100;
                this.turnos = [];
        },
        atacar: function () {
            var ataque = this.calcularHeridas(rangoAtaque);
            this.saludMonstruo -= ataque;
            this.turnos.unshift({
                esJugador: true,
                text: "El jugador golpeo al monstruo por " + ataque
              });
              if (this.verificarGanador()) {
                return;
              }
              this.ataqueDelMonstruo();
        },

        ataqueEspecial: function () {
            var ataqueEspecial = this.calcularHeridas(rangoAtaqueEspecial);
            this.saludMonstruo -= ataqueEspecial;
            this.turnos.unshift({
                esJugador: true,
                text: "El jugador golpeo al monstruo por " + ataqueEspecial  
              });
              if (this.verificarGanador()) {
                return;
              }
              this.ataqueDelMonstruo();
        },

        curar: function () {
         if (this.saludJugador < 90) {
            this.saludJugador += 10;
          } else {
            this.saludJugador = 100;
          }
          this.turnos.unshift({
            esJugador: true,
            text: "El jugador gana 10 de vida"
          });
          this.ataqueDelMonstruo();
        },

        registrarEvento(evento) {
        },
        terminarPartida: function () {
            var rendirse = confirm("Desea rendirse y jugar otra vez?");
            if (rendirse == true) {
             this.empezarPartida();
            this.hayUnaPartidaEnJuego = false;
             } else {
             return false;
             }
        },

        ataqueDelMonstruo: function () {
            var ataqueMonstruo = this.calcularHeridas(2, 10);
            this.saludJugador -= ataqueMonstruo;
            this.turnos.unshift({
              esJugador: false,
              text: "El monstruo lastima al jugador en " + ataqueMonstruo 
            });
        },

        calcularHeridas: function (min, max) {
            return Math.max(Math.floor(Math.random() * max) + 1, min);

        },
        verificarGanador: function () {
           
            if (this.saludMonstruo <= 0) {
                if (confirm("Ganaste! Jugar de nuevo?")) {
                  this.empezarPartida();
                } else {
                  this.hayUnaPartidaEnJuego = false;
                }
                return true;
              } else if (this.saludJugador <= 0) {
                if (confirm("Perdiste!  Jugar de nuevo? ")) {
                  this.empezarPartida();
                } else {
                  this.hayUnaPartidaEnJuego = false;
                }
                return true;
              }
              return false;
           
        },
        cssEvento(turno) {
            //Este return de un objeto es prque vue asi lo requiere, pero ponerlo acá queda mucho mas entendible en el codigo HTML.
            return {
                'player-turno': turno.esJugador,
                'monster-turno': !turno.esJugador
            }
        }
    }
});