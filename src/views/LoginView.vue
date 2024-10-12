<template>
    <v-container class="d-flex align-center justify-center fill-height">
      <v-row class="align-center justify-center">
        <v-col cols="12" md="5">
          <v-card class="elevation-12 mx-auto my-0 position-relative" max-width="600">
            <v-card-title class="text-center justify-center">
              <h2 class="font-weight-bold mb-8">Login</h2>
            </v-card-title>
            <div class="logo-container">
              <v-img
                :src="logo"
                alt="Company Logo"
                class="logo-img"
              ></v-img>
            </div>

            <v-card-text>
              <v-form @submit.prevent="handleLogin">
                <v-text-field
                  v-model="email"
                  label="Email"
                  type="email"
                  prepend-icon="mdi-email"
                  outlined
                  dense
                  required
                ></v-text-field>
                <v-text-field
                  v-model="password"
                  label="Password"
                  type="password"
                  prepend-icon="mdi-lock"
                  outlined
                  dense
                  required
                ></v-text-field>
                <v-btn color="success" class="mt-4" block @click="handleLogin">
                  Ingresar
                </v-btn>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn text color="secondary">
                Forgot password?
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>

  <script setup>
  import { ref } from 'vue';
  import logo from '@/img/neto.jpeg';

  const email = ref('');
  const password = ref('');

  const handleLogin = () => {
    console.log('Email:', email.value, 'Password:', password.value);
  };
  </script>

  <style scoped>
  .v-card {
    position: relative;
    padding-top: 100px;
    padding-bottom: 40px;
    max-width: 600px;
  }

  .logo-container {
    position: absolute;
    top: 40px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 2;
  }

  .logo-img {
    border-radius: 50%;
    border: 5px solid white;
    width: 140px;
    height: 140px;
  }

  .mx-auto {
    margin-left: auto;
    margin-right: auto;
  }

  .mb-8 {
    margin-bottom: 2rem;
  }
  </style>
