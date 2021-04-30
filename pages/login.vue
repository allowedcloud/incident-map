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
  head: {
    title: "Login"
  },
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
