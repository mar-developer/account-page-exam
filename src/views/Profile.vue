<template>
  <div class="profile">
    <h1>Profile</h1>
    <div v-if="user">
      <p>Name: {{ user.name }}</p>
      <p>Email: {{ user.email }}</p>
      <button @click="logout" class="btn">Logout</button>
    </div>
    <div v-else>
      <p>Please log in to view your profile.</p>
      <router-link to="/login" class="link">Login</router-link>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    user() {
      return this.$store.state.user;
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('logout');
      this.$router.push('/login');
    }
  }
};
</script>

<style lang="scss" scoped>
.profile {
  padding: 20px;
  max-width: 400px;
  margin: auto;

  h1 {
    margin-bottom: 20px;
    text-align: center;
  }

  .btn {
    padding: 10px;
    background-color: #dc3545;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
      background-color: #c82333;
    }
  }

  .link {
    display: block;
    text-align: center;
    margin-top: 15px;
    color: #007bff;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
