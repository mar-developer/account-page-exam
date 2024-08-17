<template>
  <div class="profile">
    <div class="profile__content">
      <h1 class="profile__title">Profile</h1>
      <div class="profile__picture">
        <img :src="profilePicture" alt="Profile Picture" />
        <input type="file" @change="uploadProfilePicture" />
      </div>
      <div class="profile__info">
        <p><strong>Full Name:</strong> {{ fullName }}</p>
        <p><strong>Email:</strong> {{ email }}</p>
      </div>
      <div class="profile__change-password">
        <h2>Change Password</h2>
        <form @submit.prevent="changePassword" class="profile__form">
          <div class="profile__form-group">
            <input type="password" v-model="currentPassword" placeholder="Current Password" class="profile__input" />
          </div>
          <div class="profile__form-group">
            <input type="password" v-model="newPassword" placeholder="New Password" class="profile__input" />
          </div>
          <button type="submit" class="profile__button">Change Password</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      profilePicture: 'https://via.placeholder.com/150',
      fullName: 'John Doe',
      email: 'john.doe@example.com',
      currentPassword: '',
      newPassword: ''
    };
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
    changePassword() {
      // Implement change password logic here
      console.log('Changing password from', this.currentPassword, 'to', this.newPassword);
    }
  }
};
</script>

<style lang="scss" scoped>
.profile {
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

  &__picture {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 20px;

    img {
      border-radius: 50%;
      width: 150px;
      height: 150px;
      object-fit: cover;
      margin-bottom: 10px;
    }

    input[type="file"] {
      display: none;
    }

    label {
      cursor: pointer;
      background-color: #1877f2;
      color: white;
      padding: 10px;
      border-radius: 4px;
      font-size: 1rem;
      text-align: center;

      &:hover {
        background-color: #165dbb;
      }
    }
  }

  &__info {
    margin-bottom: 20px;

    p {
      font-size: 1rem;
      margin: 5px 0;
    }
  }

  &__change-password {
    h2 {
      font-size: 1.5rem;
      color: #1877f2;
      margin-bottom: 10px;
    }
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
}
</style>