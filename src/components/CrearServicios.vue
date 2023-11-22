<template>
    <div class="container mt-5">
      <h2 class="text-center">Crear Usuario</h2>
      <form @submit.prevent="CrearUsuario" class="mt-4">
        <div class="form-group">
          <label for="nameUser">Nombre:</label>
          <input type="text" id="nameUser" v-model="userData.nameUser" class="form-control" required>
        </div>
        <div class="form-group">
          <label for="nickname">Usuario:</label>
          <input type="text" id="nickname" v-model="userData.nickname" class="form-control" required>
        </div>
        <div class="form-group">
          <label for="phoneUser">Teléfono:</label>
          <input type="text" id="phoneUser" v-model="userData.phoneUser" class="form-control" required>
        </div>
        <div class="form-group">
          <label for="passwordUser">Contraseña:</label>
          <input type="password" id="passwordUser" v-model="userData.passwordUser" class="form-control" required>
        </div>
        <div class="form-group">
          <label for="documentUser">Documento:</label>
          <input type="text" id="documentUser" v-model="userData.documentUser" class="form-control" required>
        </div>
        <div class="form-group">
          <label for="positionUser">Posición:</label>
          <input type="text" id="positionUser" v-model="userData.positionUser" class="form-control" required>
        </div>
        <div class="form-group">
          <label for="userType">Tipo de Usuario (int):</label>
          <input type="number" id="userType" v-model="userData.userType" class="form-control" required>
        </div>
        <div class="form-group">
          <label for="userEntityId">ID de Entidad (int):</label>
          <input type="number" id="userEntityId" v-model="userData.userEntityId" class="form-control" required>
        </div>
        <div class="text-center">
          <button type="submit" class="btn btn-primary">Aceptar</button>
        </div>
      </form>
    </div>
  </template>