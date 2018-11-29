<template>
  <b-navbar toggleable="md" type="dark" variant="info">
    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
    <b-navbar-brand class="custom-hover" @click="$router.push('/')">Buildabear</b-navbar-brand>
    <b-collapse is-nav id="nav_collapse">
      <b-navbar-nav>
        <b-nav-item-dropdown text="Game" right>
          <b-dropdown-item 
              v-for="(game, index) in games" 
              :key="index" 
              @click="$router.push('/' + game.game_id)">{{ game.game_name }}</b-dropdown-item>
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

        <b-nav-item-dropdown right v-if="isLoggedin">
          <!-- Using button-content slot -->
          <template slot="button-content">
            <em>{{ user.username }}</em>
          </template>
          <b-dropdown-item 
              @click="$router.push('/profiles/' + user.user_id)">Profile</b-dropdown-item>
          <b-dropdown-item href="/">Logout</b-dropdown-item>
        </b-nav-item-dropdown>
        <b-nav-item @click="$router.push('/login')" v-else>Login</b-nav-item>
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
      orderBy: { text: "Build Name", order: null, desending: true }
    };
  },
  props: {
    games: {
      type: Array,
      default: []
    },
    user: {
      type: Object,
      default: {
        user_id: 1,
        username: 'Default User'
      }
    },
    isLoggedin: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    changeOrderBy(obj) {
      this.orderBy = obj;
    },
  },
  computed: {
    profileUrl() {
      return "/profiles/" + this.user.userId;
    }
  }
};
</script>

<style scoped>
.custom-hover:hover {
  cursor: pointer;
}
</style>
