<template>
  <div class="strongTitle">
    <h1>
      <b>{{ title }}</b>
    </h1>
    <img :src="photo" class="center border" />
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
.border {
  padding: 2px;
  border: 2px solid grey;
  background-color: #e1ad01;
}

.center {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
}


.strongTitle {
  position: relative;
  font-family: "Dosis", sans-serif;
  max-width: 800px;
  margin: 0 5% 1rem;
  font-size: 2.5rem;
  font-weight: 800;
  color: black;
  background-image: url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/664131/underline.svg");
  background-repeat: no-repeat;

  background-size: cover;
}
</style>>

