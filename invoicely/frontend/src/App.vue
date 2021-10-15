<template>
  <div id="wrapper">
    <nav class="navbar is-dark">
      <div class="navbar-brand">
        <router-link to="/" class="navbar-item">
        <img alt="Hutao" src="./assets/hu-tao.gif">
        <strong>Invoicely</strong>
        </router-link>
      </div>

      <div class="navbar-menu">
        <div class="navbar-end">
          <template v-if="$store.state.isAuthenticated">

            <div class="navbar-item">
              <div class="buttons">
                <router-link to="/dashboard/invoices/add" class="button is-success">Add invoice</router-link>
                <router-link to="/dashboard/my-account" class="button is-light">Hi, {{this.$store.state.user.username}}</router-link>
              </div>
            </div>      
          </template>

          <template v-else>
            <router-link to="/" class="navbar-item">Home</router-link>
            <div class="navbar-item">
              <div class="buttons">
                <router-link to="/sign-up" class="button is-success"><strong>Sign up</strong></router-link>
                <router-link to="/log-in" class="button is-light">Log in</router-link>
              </div>
            </div> 
          </template>
        </div>
      </div>
    </nav>

    <section class="main-content columns">
      <template v-if="$store.state.isAuthenticated">
        <aside class="column is-2 is-fullheight section" style="background-color:#343434">
          <p class="menu-label is-hidden-touch">Navigation</p>
          <ul class="menu-list">
            <li>
              <router-link to="/dashboard" class="navbar-item is-tab" style="color:#dddddd" >Dashboard</router-link>
            </li>
            <li>
              <router-link to="/dashboard/clients" class="navbar-item is-tab" style="color:#dddddd">Clients</router-link>
            </li>
            <li>
              <router-link to="/dashboard/invoices" class="navbar-item is-tab" style="color:#dddddd">Invoices</router-link>
            </li>
          </ul>
        </aside>
        <router-view class="column is-10 mt-6" style="height: 100vh"/>
      </template>
      <template v-else>
        <router-view class="column is-12 mt-6" style="height: 100vh"/>
      </template>
    </section>

    <footer class="footer">
      <p class="has-text-centered">Copyright (c) 2021</p>
    </footer>

  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    name: 'App',
    beforeCreate() {
      this.$store.commit('initStore')

      const token = this.$store.state.token

      if (token)
        axios.defaults.headers.common['Authorization'] = "Token " + token
      else
        axios.defaults.headers.common['Authorization'] = ""
    }
  }
</script>



<style lang="scss">
@import '../node_modules/bulma'
</style>
