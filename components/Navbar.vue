<template>
  <b-navbar toggleable="md" type="dark" variant="info">
    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
    <b-navbar-brand href="#">Buildabear</b-navbar-brand>
    <b-collapse is-nav id="nav_collapse">
      <b-navbar-nav>
        <b-nav-item href="#">Games</b-nav-item>
        <b-nav-item href="#">Builds</b-nav-item>
        <b-nav-item href="#">Forums</b-nav-item>
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
              :href="item.href">{{ item.text }}</b-dropdown-item>
        </b-nav-item-dropdown>

        <b-nav-item-dropdown right>
          <!-- Using button-content slot -->
          <template slot="button-content">
            <em>{{ user.userName }}</em>
          </template>
          <b-dropdown-item href="#">Profile</b-dropdown-item>
          <b-dropdown-item href="#">{{ signInState.text }}</b-dropdown-item>
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
        { text: "Build Name", href: 1 },
        { text: "Date Created", href: 2 },
        { text: "Rating", href: 3 },
        { text: "...", href: 4 }
      ],
      user: {
        userName: "Username",
        userId: 0
      },
      signInState: {
        text: "Sign In",
        signedIn: false
      }
    };
  }
};
</script>

