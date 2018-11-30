<template>
  <b-container>
    <b-row>
      <b-col md="6" class="mt-4 offset-3">
        <b-card title="Authentication">
          <b-button type="submit" @click="$router.push('/auth/login')">Login</b-button>
          <b-button type="button" @click="$router.push('/auth/register')">Register</b-button>
          <b-button type="button" @click="$router.push('/auth/passwordReset')">Forgot Password</b-button>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>
