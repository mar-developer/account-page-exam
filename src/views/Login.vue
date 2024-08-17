<template>
  <div class="login">
    <div class="login__background"></div>
    <div class="login__content">
      <h1 class="login__title">Login</h1>
      <form @submit.prevent="login" class="login__form">
        <div class="login__form-group">
          <div class="login__input-wrapper">
            <i class="fas fa-envelope login__icon"></i>
            <input type="email" v-model="email" placeholder="Email" class="login__input" />
          </div>
          <span v-if="errors.email" class="login__error">{{ errors.email }}</span>
        </div>
        <div class="login__form-group">
          <div class="login__input-wrapper">
            <i class="fas fa-lock login__icon"></i>
            <input type="password" v-model="password" placeholder="Password" class="login__input" />
          </div>
          <span v-if="errors.password" class="login__error">{{ errors.password }}</span>
        </div>
        <button type="submit" class="login__button">
          <i class="fas fa-sign-in-alt"></i> Login
        </button>
        <router-link to="/signup" class="login__link">Create New Account</router-link>
      </form>
    </div>
  </div>
</template>

<script>
import * as yup from 'yup';

export default {
  data() {
    return {
      email: '',
      password: '',
      errors: {}
    };
  },
  methods: {
    async login() {
      this.errors = {};
      const schema = yup.object().shape({
        email: yup.string().email('Invalid email address').required('Email is required'),
        password: yup.string().required('Password is required')
      });

      try {
        await schema.validate({ email: this.email, password: this.password }, { abortEarly: false });
        // Implement login logic here
        console.log('Logging in with', this.email, this);
        this.$store.dispatch('login', { email: this.email });
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
.login {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  overflow: hidden;

  &__background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url('https://res.cloudinary.com/development-mar/image/upload/v1711351204/samples/coffee.jpg');
    background-size: cover;
    background-attachment: fixed;
    background-position: center;
    filter: blur(8px);
    z-index: -1;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7));
      z-index: -1;
    }
  }

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

  &__input-wrapper {
    position: relative;
  }

  &__icon {
    position: absolute;
    top: 50%;
    left: 10px;
    transform: translateY(-50%);
    color: #aaa;
  }

  &__input {
    width: 100%;
    padding: 10px 10px 10px 30px;
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
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
      background-color: #165dbb;
    }

    i {
      margin-right: 5px;
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