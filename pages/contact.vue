<template>
  <div class="grid place-content-center h-screen">
    <FormulateForm name="contactForm" @submit="submitForm">
      <FormulateInput type="text" name="name" label="Name"  validation="required" />
      <FormulateInput type="text" name="email" label="Email" validation="required|email"/>
      <FormulateInput type="textarea" name="comment" label="Comment" validation="required" />
      <FormulateInput type="submit" label="Submit" />
    </FormulateForm>
  </div>
</template>

<script>
export default {
  name: "Contact",
  methods: {
    async submitForm (data) {
      await this.$axios.$post(process.env.formURL, data)
      this.$formulate.reset('contactForm')
      alert(`Thank you, ${data.name}`)
    }
  } 
};
</script>
