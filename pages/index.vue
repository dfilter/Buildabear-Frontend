<template>
  <b-container>
    <b-row>
      <b-col md="12">
        <div class="text-center mt-3">
          <h1>Welcome to Buildabear</h1>
          <p>Click on one of the games below to navigate to it</p>
        </div>
        <b-row>
          <b-col md="3" v-for="(game, index) in games" :key="index">
            <nuxt-link :to="'/' + game.game_id">
              <b-card
                  no-body
                  :img-src="game.game_image"
                  img-alt="Image"
                  img-top
                  tag="article"
                  style="max-width: 20rem;"
                  class="mb-4 text-center"
                  :footer="game.game_name"
                  footer-tag="footer">
              </b-card>
            </nuxt-link>
          </b-col>
          <b-col md="3" v-if="$store.getters.getIsLoggedin">
            <nuxt-link to="/creategame">
              <b-card
                  no-body
                  img-alt="Image"
                  img-top
                  tag="article"
                  style="max-width: 20rem;"
                  class="mb-4 text-center"
                  footer="Create Game"
                  footer-tag="footer">
              </b-card>
            </nuxt-link>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  asyncData(context) {
    return context.app.$axios
      .$get("http://127.0.0.1:5000/games")
      .then(response => {
        context.store.commit('mutateGames', response.games)
        return {
          games: response.games
        }
      })
      .catch(error => console.log(error));
  }
};
</script>
