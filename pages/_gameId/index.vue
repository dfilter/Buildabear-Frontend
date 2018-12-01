<template>
  <b-container>
    <b-row>
      <b-col md="12">
        <div class="text-center mt-3">
          <h1>{{ game.game_name }}</h1>
          <p></p>
        </div>
        <b-row>
          <b-col md="6">
            <nuxt-link :to="$route.fullPath +'/forum'">
              <b-card
                no-body
                :img-src="game.game_image"
                img-alt="Image"
                img-top
                tag="article"
                class="mb-4 text-center"
                footer="Forum Posts"
                footer-tag="footer"
              ></b-card>
            </nuxt-link>
          </b-col>
          <b-col md="6">
            <nuxt-link :to="$route.fullPath + '/builds'">
              <b-card
                no-body
                :img-src="game.game_image"
                img-alt="Image"
                img-top
                tag="article"
                class="mb-4 text-center"
                footer="Build Guids"
                footer-tag="footer"
              ></b-card>
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
      .$get("https://dfiltercapstone-buildabear-api.herokuapp.com/game", {
        params: { game_id: context.params.gameId }
      })
      .then(response => {
        context.store.commit("mutateGame", response.game);
        return {
          game: response.game
        };
      })
      .catch(error => console.log(error));
  }
};
</script>
