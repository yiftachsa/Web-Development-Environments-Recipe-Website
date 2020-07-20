<template>
  <div>
    <div class="recipe-body">
      <img :src="photo" class="recipe-image" />
    </div>
    <div :title="title" class="centerTitle">
      <span class="styleTitle">{{ title }}</span>
    </div>
  </div>
</template>>

<script>
export default {
  props: {
    photo: {
      type: String
          },
    title: {
      type: String,
      required: true
    }
  }
};
</script>

<style>
.recipe-body .recipe-image{
  margin-left: auto;
  margin-right: auto;
  margin-top: auto;
  margin-bottom: auto;
  display: block;
  width: 98%;
  height: auto;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  background-size: cover;
}

.centerTitle {
  text-align: center;
  padding: 10px 20px;
}
.styleTitle {
  position: relative;
  font-family: "Dosis", sans-serif;
  max-width: 800px;
  margin: 0 5% 1rem;
  font-size: 1.5rem;
  font-weight: 600;
  color: black;
  background-image: url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/664131/underline.svg");
  background-repeat: no-repeat;

  background-size: cover;
}


</style>>
