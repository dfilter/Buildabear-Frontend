<template>
  <b-container>
    <b-row>
      <b-col md="12" class="mt-4">
        <b-card no-body header-tag="header">
          <h3 slot="header" class="mb-0 text-center">Add a Game</h3>
          <b-card-body>
            <b-form @submit.prevent="onSubmit">
              <b-form-group label="Game Name:">
                <b-form-input type="text" v-model="game.game_name" required></b-form-input>
              </b-form-group>
              <b-form-group label="Game Description:">
                <b-form-textarea v-model="game.game_description" :rows="3" :max-rows="6" required></b-form-textarea>
              </b-form-group>
              <b-form-group label="Image url:">
                <b-form-input type="text" v-model="game.game_image" required></b-form-input>
              </b-form-group>
              <b-form-group label="Game Table:">
                <b-form-input type="text" v-model="game.game_table" required></b-form-input>
              </b-form-group>
              <b-button type="submit" variant="primary">Submit</b-button>
              <b-button @click="$router.push('/')">Cancel</b-button>
            </b-form>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  data() {
    return {
      game: {
        game_name: "",
        game_description: "",
        game_image: "",
        game_table: ""
      }
    };
  },
  methods: {
    onSubmit() {
      this.$axios
        .post(
          "https://dfiltercapstone-buildabear-api.herokuapp.com/game",
          this.game
        )
        .then(response => {
          console.log(response);
          if (response.status == 200) {
            this.$router.push("/");
          } else {
            alert("Could not post game.");
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>
