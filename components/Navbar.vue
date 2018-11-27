<template>
  <b-navbar toggleable="md" type="dark" variant="info">
    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
    <b-navbar-brand href="/">Buildabear</b-navbar-brand>
    <b-collapse is-nav id="nav_collapse">
      <b-navbar-nav>
        <b-nav-item-dropdown text="Game" right>
          <b-dropdown-item 
              v-for="(game, index) in games" 
              :key="index" 
              :href="'/' + game.game_id">{{ game.game_name }}</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">

        <b-nav-form>
          <b-form-input size="sm" class="mr-sm-2" type="text" placeholder="Search"/>
          <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
        </b-nav-form>

        <b-nav-item-dropdown text="Search by" right>
          <b-dropdown-item 
              v-for="(item, index) in searchBy" 
              :key="index" 
              @click="changeOrderBy(item)">{{ item.text }}</b-dropdown-item>
        </b-nav-item-dropdown>

        <b-nav-item-dropdown right text="Username">
          <!-- Using button-content slot -->
          <template slot="button-content">
            <em>{{ user.userName }}</em>
          </template>
          <b-dropdown-item 
              v-if="signInState.signedIn"
              :href="profileUrl">Profile</b-dropdown-item>
          <b-dropdown-item href="/login">{{ signInState.text ? signInState.text : 'Sign In' }}</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
export default {
  data() {
    return {
      searchBy: [
        { text: "Author", order: null, desending: true },
        { text: "Build Name", order: null, desending: true },
        { text: "Newest", order: "date_posted", desending: true },
        { text: "Oldest", order: "date_posted", desending: false },
        { text: "Highest Rated", order: "up_vote", desending: true },
        { text: "Lowest Rated", order: "down_vote", desending: false },
        { text: "Highest Views", order: "views", desending: true },
        { text: "Lowest Views", order: "views", desending: false }
      ],
      orderBy: { text: "Build Name", order: null, desending: true },
      user: {
        userName: "",
        userId: null
      },
      signInState: {
        text: "Sign In",
        signedIn: false
      }
    };
  },
  methods: {
    changeOrderBy(obj) {
      this.orderBy = obj;
    }
  },
  computed: {
    profileUrl() {
      return "/profile/" + this.user.userId;
    },
    games() {
      return this.$store.getters.getGames;
    }
  }
};
</script>

