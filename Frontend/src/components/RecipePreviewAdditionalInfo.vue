<template>
  <div  :key="componentKey">
        <b-iconstack font-scale="2.3" v-if="additionalInfo.favorite">
          <b-icon stacked icon="heart-fill" variant="danger" animation="throb" scale="0.75" shift-v="-0.25"></b-icon>
        </b-iconstack>
      <b-iconstack font-scale="2.3" @click="addToFavorite" v-else>
        <b-icon stacked icon="heart" variant="danger" animation="throb" scale="0.75" shift-v="-0.25"></b-icon>
      </b-iconstack>
        <b-iconstack font-scale="2.3" v-if="additionalInfo.watched">
          <b-icon stacked icon="eye-fill" variant="warning" scale="0.75" shift-v="-0.25"></b-icon>
          <b-icon stacked icon="circle" variant="info"></b-icon>
        </b-iconstack>
      <b-iconstack font-scale="2.3"  v-else >
        <b-icon stacked icon="eye-fill" variant="warning" scale="0.75" shift-v="-0.25"></b-icon>
        <b-icon stacked icon="slash-circle" variant="info"></b-icon>
      </b-iconstack>
  </div>
</template>

<script>
export default {
  props: {
    recipeId: {
      required: true
    },
    additionalInfoProp: {
      type: Object,
      required: false
    }
  },
  data() {
    return {
      additionalInfo: {
        watched: false,
        favorite: false
      },
      componentKey: 0,
      
    };
  },
  mounted() {
    this.retrieveAdditionalInfo();
  },
  methods: {
    async retrieveAdditionalInfo() {
      if (!this.additionalInfoProp) {
        if (!(typeof this.recipeId == "string")) {
          try {
            const response = await this.axios.get(
              `${this.$root.store.baseUrl}/user/loggedPreview/recipeID/${this.recipeId}`
            );
            let { favorite, watched } = response.data;
            this.additionalInfo = {
              watched: watched,
              favorite: favorite
            };
          } catch (error) {
            console.log(error.response);
          }
        }
      } else {
        this.additionalInfo = this.additionalInfoProp;
      }
    },

    async addToFavorite()
    {
      try{
        if($cookies.get('session')){
          let response = await this.axios.put(
              `${this.$root.store.baseUrl}/user/addToFavorite/recipeID/${this.recipeId}`
            );
            this.additionalInfo.favorite = true;
            this.forceRerender();
        }
      }catch(error){
        console.log(error)
      }

    },
    forceRerender() {
      this.componentKey += 1
    },
  }
};
</script>

<style>

.additionalInfoStyle{
    display: flex;
    justify-content: center;
}
</style>>
