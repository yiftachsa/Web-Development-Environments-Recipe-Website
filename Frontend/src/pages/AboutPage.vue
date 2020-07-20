<template>
  <div class="textStyle">
    <h1 class="title">About us</h1>
    <div class="text">
      <b-container>
        <b-row no-gutters>
          <b-col>
            <h2 class="subTitle">Who we are?</h2>
            <div class="normal">
              <section>
                <p>
                  We are two Software and Information Systems Engineering
                  students.
                </p>
                <p>
                  We have built this site to learn, explore and expand our
                  knowledge in Full Stack development as part of an internet
                  programing environments course. In the process of building
                  this web application we tried to challenge ourselves to
                  incorporate a wide array of new and existing technologies.
                </p>
                <p>
                  As part of the development process we designed a comprehensive
                  <a href="https://app.swaggerhub.com/apis/shmera6/Assignment3.1/1.0.5"> RESTfull API</a>
                  for the backend of the web application. We
                  designed and programmed a backend server that would implement
                  the API using NODE JS. In addition, we setup and used an Azure
                  cloud DB which we use for all the backend storage needs.
                </p>
                <p>
                  The frontend of the web application is designed as a Single
                  Page Application which we built using Vue JS framework. The
                  frontend was designed to be fast, simple, comfortable, and
                  interactive.
                </p>
              </section>
              <section>
                <strong>Other projects</strong>
                <p>
                  This project is one of several projects we had collaborated on
                  in this course.
                </p>
                <ul>
                  <li>
                    <p>
                      most notably we developed a Pacman online game. The game
                      was designed and written in JavaScript using jQuery
                      framework.
                      <a
                        href="https://sise-web-development-environments.github.io/assignment2-merav-yiftach"
                        >Check it out!</a
                      >
                    </p>
                  </li>
                  <li>
                    Merav's first assignment
                    <a
                      href="https://sise-web-development-environments.github.io/205795537/"
                      >Take me there!</a
                    >
                  </li>
                  <li>
                    Yiftach's first assignment
                    <a
                      href="https://sise-web-development-environments.github.io/312141369/"
                      >Give it a glance!</a
                    >
                  </li>
                </ul>
              </section>
            </div>
          </b-col>
          <b-col>
            <div>
              <!-- <b-container> -->
              <img class="imgAbout" src="@/assets/developers.jpeg" alt="developers" />
              <!-- </b-container> -->
            </div>
          </b-col>
        </b-row>
      </b-container>
    </div>
  </div>
</template>

<script>
export default {
  name: "About",
};
</script>
<style lang="scss">
.subTitle {
  font-family: Dosis, Helvetica, Arial, sans-serif;
  max-width: 800px;
  font-size: 2.25rem;
  font-weight: 400;
}
.normal {
  font-family: "Dosis", sans-serif;
  font-size: 1rem;
  font-weight: 400;
  color: black;
}
.imgAbout {
  max-width: 100%;
  max-height: 100%;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 5px;
}
</style>
