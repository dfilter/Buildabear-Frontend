<template>
  <b-container>
    <b-row>
      <b-col md="12" class="mt-4">
        <b-card
            no-body
            header-tag="header">
          <h3 slot="header"
              class="mb-0 text-center">Add a Game</h3>
          <b-card-body>
            <b-form @submit.prevent="onSubmit">
              <b-form-group
                  label="Game Id (Placeholder):">
                <b-form-input 
                    type="text"
                    v-model="build.game_id"
                    required>
                </b-form-input>
              </b-form-group>
              <b-form-group
                  label="User Id (Placeholder):">
                <b-form-input 
                    type="text"
                    v-model="build.user_id"
                    required>
                </b-form-input>
              </b-form-group>
              <b-form-group
                  label="Build Title:">
                <b-form-input 
                    type="text"
                    v-model="build.build_description"
                    required>
                </b-form-input>
              </b-form-group>
              <b-form-group
                  label="Build Description:">
                <b-form-textarea 
                    v-model="build.build_markup"
                    :rows="3"
                    :max-rows="6"
                    required>
                </b-form-textarea>
              </b-form-group>
              <b-form-group
                  label="Image Url:">
                <b-form-input 
                    type="text"
                    v-model="build.image_url"
                    required>
                </b-form-input>
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
      build: {
        build_description: '',
        build_markup: '',
        game_id: '',
        user_id: '',
        image_url: ''
      }
    }
  },
  methods: {
    onSubmit() {
      this.$axios
        .post('http://127.0.0.1:5000/build', this.build)
        .then(response => {
          console.log(response)
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>
