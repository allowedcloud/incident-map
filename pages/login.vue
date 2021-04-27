<template>
  <div class="flex h-screen items-center place-content-center">
    <FormulateForm @submit="login" class="border-2 border-yellow-400 p-10 rounded-md shadow-lg">
      <h2 class="text-2xl font-bold border-b-2 border-yellow-400 pb-2 mb-4">Login</h2>
      <FormulateInput
        type="text"
        name="username"
        label="Username"
        validation="required"
      />
      <FormulateInput
        type="password"
        name="password"
        label="Password"
        validation="required"
      />
      <FormulateInput
        type="submit"
        label="Login"
        class="submit-button"
      />

      <div class="text-red-400 text-sm pt-4 w-40">{{ error.message }}</div>
    </FormulateForm>    
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
      return {
          error: []
        }
  },
  methods: {
      async login(data) {
          try {
              const user = await this.$store.dispatch('auth/login', {
                  username: data.username,
                  password: data.password
                })
              if (user) {
                  this.$router.push('/users/' + user.username)
                }
            } catch (error) {
                this.error = error
              }
        }
    },
  middleware({ store, redirect}) {
      if (store.getters['auth/isAuthenticated']) {
          return redirect('/')
        }
    }
}
</script>

<style lang="scss">
/* @import "../node_modules/@braid/vue-formulate/themes/snow/snow.scss"; */

input, textarea{
    border: 1px solid #D1D5DB;
    padding: 5px;
    border-radius: 5px;
    margin: 10px 0;
  }
label {
    font-weight: 600;
    margin: 5px 0;
}
.submit-button {
    @apply bg-yellow-400;
    @apply p-2;
    @apply my-2;
    @apply rounded-md;
    @apply w-16;
    @apply text-center;
  }
</style>
