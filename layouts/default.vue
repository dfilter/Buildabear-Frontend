<template>
  <div>
    <navbar :games="games" :isLoggedin="isLoggedin" :user="user"></navbar>
    <nuxt/>
  </div>
</template>

<script>
import Navbar from "~/components/Navbar.vue";
import {mapGetters} from 'vuex'

export default {
  components: {
    Navbar
  },
  computed: {
    ...mapGetters({
      games: 'getGames',
      isLoggedin: 'getIsLoggedin',
      user: 'getUser'
    })
  }
};
</script>
