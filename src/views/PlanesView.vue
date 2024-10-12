<template>
    <v-container>
      <h1 class="title">Planes</h1>
      <v-row>
        <v-col cols="12" md="4">
          <v-card class="plan-card basic-card">
            <v-card-title class="card-title">Plan Básico</v-card-title>
            <v-card-subtitle class="card-subtitle">$5.99/mes</v-card-subtitle>
            <v-card-text>
              <ul class="card-list">
                <li>Plantillas predeterminadas para camisas, pantalones y prendas básicas.</li>
                <li>Asistencia técnica general.</li>
                <li>Acceso limitado a las herramientas básicas de diseño</li>
                <li>Almacenamiento reducido para guardar diseños</li>
                <li>Posibilidad de crear hasta un número limitado de diseños por mes.</li>
              </ul>
            </v-card-text>
            <v-card-actions>
              <v-btn class="select-button" color="primary" outlined>Seleccionar</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col cols="12" md="4">
          <v-card class="plan-card premium-card ">
            <v-card-title class="card-title">Plan Intermedio</v-card-title>
            <v-card-subtitle class="card-subtitle">$10.99/mes</v-card-subtitle>
            <v-card-text>
              <ul class="card-list">
                <li>Opciones de personalización más avanzadas, como cambios de textura,
estampados y colores.
</li>
                <li>Capacidad para crear y guardar un número mayor de diseños
                    mensualmente</li>
                <li>Mayor capacidad de almacenamiento.</li>
                <li>Acceso a más plantillas y estilos de ropa.</li>
                <li>Asistencia técnica prioritaria.</li>
              </ul>
            </v-card-text>
            <v-card-actions>
              <v-btn class="select-button" color="primary" outlined>Seleccionar</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col cols="12" md="4">
          <v-card class="plan-card medium-card">
            <v-card-title class="card-title">Plan Premium</v-card-title>
            <v-card-subtitle class="card-subtitle">$15.99/mes</v-card-subtitle>
            <v-card-text>
              <ul class="card-list">
                <li>Acceso ilimitado a todas las herramientas de diseño disponibles en la
                    plataforma.</li>
                <li>Mayor variedad de plantillas y opciones de personalización avanzadas.</li>
                <li>Herramientas de diseño colaborativo para equipos.
                </li>
                <li>Almacenamiento extendido para guardar todos los proyectos de diseño.</li>
                <li>Soporte técnico Premium.</li>
              </ul>
            </v-card-text>
            <v-card-actions>
              <v-btn class="select-button" color="primary" outlined>Seleccionar</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>

  <script setup>
  </script>

  <style scoped>
  .title {
    text-align: center;
    margin-bottom: 30px;
    font-weight: bold;
    font-size: 2.5rem;
    color: #333; /* Color del texto */
  }

  .plan-card {
    transition: transform 0.3s, box-shadow 0.3s;
    border-radius: 15px;
    overflow: hidden;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1); /* Sombra sutil */
    position: relative;
  }

  .plan-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2); /* Sombra más intensa al pasar el mouse */
  }

  .card-title {
    background-color: #2196F3; /* Azul Brillante */
    padding: 15px;
    font-size: 1.6rem;
    font-weight: bold;
    color: #fff; /* Color del texto */
    border-bottom: 3px solid #1976D2; /* Línea inferior */
  }

  .card-subtitle {
    color: #555; /* Color gris oscuro */
    margin: 10px 0 20px;
    font-weight: bold; /* Resaltar subtítulo */
  }

  .card-list {
    list-style-type: none; /* Elimina viñetas */
    padding: 0; /* Elimina padding */
  }

  .card-list li {
    margin: 8px 0;
    font-size: 1rem; /* Aumentar el tamaño del texto */
    color: #333; /* Color del texto */
  }

  .basic-card {
    background-color: #E3F2FD; /* Azul claro */
  }

  .medium-card {
    background-color: #FFF3E0; /* Naranja claro */
  }

  .premium-card {
    background-color: #E8F5E9; /* Verde claro */
  }

  .select-button {
    color: #2196F3; /* Color de texto del botón */
    border-radius: 20px;
    text-transform: uppercase;
    font-weight: bold; /* Resaltar texto del botón */
    border: 2px solid #2196F3; /* Borde del botón */
  }

  .select-button:hover {
    background-color: #E3F2FD; /* Fondo del botón al pasar el mouse */
  }
  </style>
