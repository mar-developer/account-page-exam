<template>
  <div class="signup">
    <div class="signup__content">
      <h1 class="signup__title">Sign Up</h1>
      <form @submit.prevent="signup" class="signup__form">
        <div class="signup__form-group">
          <input type="text" v-model="fullName" placeholder="Full Name" class="signup__input" />
          <span v-if="errors.fullName" class="signup__error">{{ errors.fullName }}</span>
        </div>
        <div class="signup__form-group">
          <input type="email" v-model="email" placeholder="Email" class="signup__input" />
          <span v-if="errors.email" class="signup__error">{{ errors.email }}</span>
        </div>
        <div class="signup__form-group">
          <input type="password" v-model="password" placeholder="Password" class="signup__input" />
          <span v-if="errors.password" class="signup__error">{{ errors.password }}</span>
        </div>
        <button type="submit" class="signup__button">Sign Up</button>
        <router-link to="/login" class="signup__link">Already have an account? Login</router-link>
      </form>
    </div>
  </div>
</template>

<script>
import * as yup from 'yup';

export default {
  data() {
    return {
      fullName: '',
      email: '',
      password: '',
      errors: {}
    };
  },
  methods: {
    async signup() {
      this.errors = {};
      const schema = yup.object().shape({
        fullName: yup.string().required('Full Name is required'),
        email: yup.string().email('Invalid email address').required('Email is required'),
        password: yup.string().required('Password is required')
      });

      try {
        await schema.validate({ fullName: this.fullName, email: this.email, password: this.password }, { abortEarly: false });
        // Implement sign-up logic here
        console.log('Signing up with', this.fullName, this.email, this.password);
        this.$store.dispatch('signup', { fullName: this.fullName, email: this.email, password: this.password });
        this.$router.push('/profile');
      } catch (err) {
        if (err.inner) {
          err.inner.forEach(error => {
            this.$set(this.errors, error.path, error.message);
          });
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.signup {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;

  &__content {
    background: rgba(255, 255, 255, 0.9);
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 400px;
  }

  &__title {
    font-size: 2rem;
    color: #1877f2;
    margin-bottom: 20px;
  }

  &__form-group {
    margin-bottom: 15px;
  }

  &__input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    box-sizing: border-box;
    font-size: 1rem;
  }

  &__error {
    color: red;
    font-size: 0.875rem;
    margin-top: 5px;
  }

  &__button {
    width: 100%;
    padding: 10px;
    background-color: #1877f2;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
    margin-top: 10px;

    &:hover {
      background-color: #165dbb;
    }
  }

  &__link {
    display: block;
    text-align: center;
    margin-top: 15px;
    color: #1877f2;
    text-decoration: none;
    font-size: 1rem;

    &:hover {
      text-decoration: underline;
    }
  }
}
</style>