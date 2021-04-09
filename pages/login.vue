<template>
  <div class="flex h-screen items-center place-content-center">
    <FormulateForm @submit="login" class="border-2 border-indigo-200 p-6 rounded-md shadow-lg">
      <h2 class="text-2xl font-bold border-b-2 border-indigo-200 pb-2 mb-2">Login</h2>
      <FormulateInput
        type="text"
        name="username"
        label="Username"
      />
      <FormulateInput
        type="password"
        name="password"
        label="Password"
      />
      <FormulateInput
        type="submit"
        label="Login"
      />

      <div class="text-red-400 text-sm pt-4">{{ error.message }}</div>
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
                  this.$router.push('/')
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

input {
    border: 1px solid #D1D5DB;
    padding: 5px;
    border-radius: 5px;
    margin: 10px 0;
  }
label {
    font-weight: 600;
    margin: 5px 0;
}
button {
    @apply bg-indigo-200;
    @apply p-2;
    @apply my-2;
    @apply rounded-md;
  }
</style>
