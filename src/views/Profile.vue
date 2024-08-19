<template>
  <div class="profile">
    <div class="profile__content">
      <div class="profile__picture">
        <vue-gravatar :email="email" :size="150" default-image="mp"/>
        <input type="file" @change="uploadProfilePicture" />
      </div>
      <div class="profile__info">
        <div v-if="!isEditing">
          <p class="profile__info__name">{{ fullName }}</p>
          <p class="profile__info__email">{{ email }}</p>

          <div class="profile__info__socials">
            <font-awesome-icon icon="star" class="profile__info__socials__blue" />
           <div class="profile__info__socials__dash"></div>
           <font-awesome-icon :icon="['far', 'envelope']" />
           <font-awesome-icon :icon="['fas', 'earth-americas']" />
           <font-awesome-icon :icon="['far', 'paper-plane']" />
           <font-awesome-icon :icon="['fas', 'blog']" />
          </div>

          <p class="profile__info__description">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur rerum voluptatum iste nam illo deserunt alias suscipit natus! Voluptates nostrum laborum corporis? Voluptates quos alias harum voluptatibus ut debitis officiis.
          </p>

          <button  @click="toggleEdit" class="profile__info__edit-button">
            <i class="fas fa-pencil-alt"></i> Edit
          </button>
        </div>
        <div v-else class="profile__form">
          <div class="profile__form-wrapper">
            <div class="profile__form-group">
              <strong>First Name:</strong>
              <input type="text" v-model="firstName" placeholder="First Name" class="profile__input" />
            </div>
            <div class="profile__form-group">
              <strong>Last Name:</strong>
              <input type="text" v-model="lastName" placeholder="Last Name" class="profile__input"/>
            </div>
          </div>
          <p>
            <strong>Email:</strong>
            <div class="profile__form-group">
              <input type="email" v-model="email" @input="validateEmail" placeholder="Email" class="profile__input"/>
              <span v-if="emailError" class="error">{{ emailError }}</span>
            </div>
          </p>
          <div class="profile__button-container">
            <button @click="saveChanges" class="profile__button-container__primary" :class="hasErrorName? 'disabled' : ''" :disabled="hasErrorName">Save</button>
            <button @click="toggleEdit" class="profile__button-container__secondary">Cancel</button>
          </div>
        
          <div class="profile__change-password">
            <h2>Change Password</h2>
            <form @submit.prevent="changePassword" class="profile__form">
              <div class="profile__form-group">
                <input type="password" v-model="currentPassword" @input="validateCurrentPassword" placeholder="Current Password" class="profile__input" />
                <span v-if="currentPasswordError" class="error">{{ currentPasswordError }}</span>
              </div>
              <div class="profile__form-group">
                <input :type="showNewPassword ? 'text' : 'password'" v-model="newPassword" @input="validateNewPassword" placeholder="New Password" class="profile__input" />
                <button class="profile__form-group__eye" type="button" @click="toggleShowNewPassword">
                  <font-awesome-icon :icon="['fas', 'eye']" v-if="showNewPassword"/>
                  <font-awesome-icon :icon="['fas', 'eye-slash']" v-else/>
                </button>
                <div class="password-strength" :class="passwordStrength">
                  {{ passwordStrengthText }}
                </div>
                <span v-if="newPasswordError" class="error">{{ newPasswordError }}</span>
              </div>
              <button type="submit" class="profile__button" :disabled="hasErrorPassword" :class="hasErrorPassword? 'disabled' : ''">Change Password</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import zxcvbn from 'zxcvbn';

export default {
  data() {
    return {
      profilePicture: 'https://www.gravatar.com/avatar/default',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      currentPassword: '',
      newPassword: '',
      showNewPassword: false,
      isEditing: false,
      emailError: '',
      currentPasswordError: '',
    };
  },
  computed: {
    fullName() {
      return `${this.firstName} ${this.lastName}`;
    },
    passwordStrength() {
      const score = zxcvbn(this.newPassword).score;
      return ['weak', 'fair', 'good', 'strong'][score];
    },
    passwordStrengthText() {
      const score = zxcvbn(this.newPassword).score;
      return ['Weak', 'Fair', 'Good', 'Strong'][score];
    },
    hasErrorPassword() {
      return Boolean(this.currentPasswordError)  || Boolean(this.newPasswordError)
    },
    hasErrorName() {
     return Boolean(this.emailError) || this.firstName === '' || this.lastName === ''
    }
  },
  methods: {
    uploadProfilePicture(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.profilePicture = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    },
    toggleEdit() {
      this.isEditing = !this.isEditing;
    },
    toggleShowNewPassword() {
      this.showNewPassword = !this.showNewPassword;
    },
    validateEmail() {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(this.email)) {
        this.emailError = 'Please enter a valid email address.';
      } else {
        this.emailError = '';
      }
    },
    validateCurrentPassword() {
      if (this.currentPassword.length < 8) {
        this.currentPasswordError = 'Current password must be at least 8 characters long.';
      } else {
        this.currentPasswordError = '';
      }
    },
    validateNewPassword() {
      if (this.newPassword.length < 8) {
        this.newPasswordError = 'New password must be at least 8 characters long.';
      } else {
        this.newPasswordError = '';
      }
    },
    changePassword() {
      this.validateCurrentPassword();
      this.validateNewPassword();
      if (!this.currentPasswordError && !this.newPasswordError) {
        // Proceed with password change logic
      }
    },
    saveChanges() {
      this.isEditing = false;
      // Add logic to save the changes
    },
  },
};
</script>

<style lang="scss" scoped>
.profile {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  font-family: 'Open Sans', sans-serif;
  background: linear-gradient(300deg, #ffffffde, #aad9ff);

  &__content {
    background: #fff;
    padding: 50px;
    border-radius: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 450px;
  }

  &__picture {
    display: flex;
    flex-direction: column;
    align-items: left;
    margin-bottom: 10px;

    img {
      border-radius: 50%;
      width: 180px;
      height: 180px;
      object-fit: cover;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    input[type="file"] {
      display: none;
    }
  }

  &__info {
    text-align: left;

    &__name {
      font-size: 55px;
      font-weight: 900;
      margin: 0;
    }

    &__email {
      font-size: 1rem;
      color: #666;
      margin: 0;
    }

    &__socials {
      display: flex;
      align-items: center;
      font-size: 2rem;
      color: #666;
      margin: 30px 0;
      gap: 30px;

      &__blue {
        color: #1877f2;
      }

      &__dash {
        width: 20px;
        height: 2px;
        background-color: #666;
      }

      p {
        margin: 0 5px;
      }
    }

    &__description {
      font-size: 1rem;
      color: #666;
      margin: 0;
    }

    &__edit-button {
      background: none;
      border: none;
      cursor: pointer;
      color: #007bff;
      margin-top: 35px;
      width: 100%;
      border: 1px solid #007bff;
      font-size: 1.2rem;

      &:hover {
        color: #0056b3;
      }
    }
  }

  

  &__change-password, &__form {
    margin-top: 30px;

    h2 {
      font-size: 1.8rem;
      color: #1877f2;
      margin-bottom: 15px;
      text-align: center;
    }

    &-wrapper {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 10px;
    }

    .profile__form-group {
      margin-bottom: 10px;
      position: relative;

      input {
        width: 100%;
        padding: 12px;
        border: 1px solid #ddd;
        border-radius: 5px;
        box-sizing: border-box;
        font-size: 1rem;
        transition: border-color 0.3s, box-shadow 0.3s;

        &:focus {
          border-color: #1877f2;
        }
      }

      &__eye {
        position: absolute;
        right: 0px;
        top: 35%;
        transform: translateY(-50%);
        background: none;
        border: none;
        cursor: pointer;
        color: #007bff;
        font-size: 1.2rem;

        &:hover {
          color: #0056b3;
        }
      }
    }

    .profile__button {
      width: 100%;
      padding: 12px;
      background-color: #1877f2;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      font-size: 1.1rem;
      margin-top: 15px;
      transition: background-color 0.3s;

      &:hover {
        background-color: #165dbb;
      }
    }

    .password-strength {
      margin-top: 5px;
      font-size: 0.875rem;
      text-align: center;

      &.weak {
        color: red;
      }

      &.fair {
        color: orange;
      }

      &.good {
        color: yellowgreen;
      }

      &.strong {
        color: green;
      }
    }
  }

  &__button-container {
    display: flex;
    gap: 10px;
    width: 100%;
    margin: 30px 0 50px 0;

    &__primary {
      flex-grow: 1;
      background-color: #1877f2;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      padding: 10px 20px;
      font-size: 1.1rem;
      transition: background-color 0.3s;

      &:hover {
        background-color: #165dbb;
      }
    }

    &__secondary {
      flex-grow: 1;
      background-color: #dc3545;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      padding: 10px 20px;
      font-size: 1.1rem;
      transition: background-color 0.3s;

      &:hover {
        background-color: #c82333;
      }
    }
  }

  .error {
    color: red;
    font-size: 0.875rem;
  }

  .disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
}
</style>