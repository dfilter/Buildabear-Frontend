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
            <nuxt-link :to="game.url">
              <b-card
                  no-body
                  :img-src="game.imageUrl"
                  img-alt="Image"
                  img-top
                  tag="article"
                  style="max-width: 20rem;"
                  class="mb-4 text-center"
                  :footer="game.gameName"
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
  data() {
    return {
      games: [
        {
          gameName: "Dark Souls III",
          imageUrl: "https://picsum.photos/600/300/?image=25",
          url: "/"
        },
        {
          gameName: "Dark Souls III",
          imageUrl: "https://picsum.photos/600/300/?image=25",
          url: "/"
        },
        {
          gameName: "Dark Souls III",
          imageUrl: "https://picsum.photos/600/300/?image=25",
          url: "/"
        },
        {
          gameName: "Dark Souls III",
          imageUrl: "https://picsum.photos/600/300/?image=25",
          url: "/"
        },
        {
          gameName: "Dark Souls III",
          imageUrl: "https://picsum.photos/600/300/?image=25",
          url: "/"
        }
      ]
    };
  }
};
</script>

<style>
</style>
