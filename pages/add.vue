<template>
  <div class="flex h-screen items-center place-content-center">
    <FormulateForm name="add" @submit="addIncident">

      <FormulateInput
        type="text"
        name="title"
        label="Incident title"
      />
      
      <FormulateInput
        type="date"
        name="date"
        label="Incident date"
      />
      
      <FormulateInput
        type="select"
        name="state"
        label="State"
        :options="[
          'Aguascalientes',
          'Baja California',
          'Baja California Sur',
          'Campeche',
          'Chiapas',
          'Chihuahua',
          'Mexico City',
          'Coahuila',
          'Colima',
          'Durango',
          'Guanajuato',
          'Guerrero',
          'Hidalgo',
          'Jalisco',
          'México',
          'Michoacán',
          'Morelos',
          'Nayarit',
          'Nuevo León',
          'Oaxaca',
          'Puebla',
          'Querétaro',
          'Quintana Roo',
          'San Luis Potosí',
          'Sinaloa',
          'Tabasco',
          'Tamaulipas',
          'Tlaxcala',
          'Veracruz',
          'Yucatán',
          'Zacatecas'
        ]"
      />
      
      <div class="lat-long flex flex-row">      
        <FormulateInput
          type="text"
          name="lat"
          label="Latitude"
        />
      
        <FormulateInput
          type="text"
          name="long"
          label="Longitude"
        />
      </div>
      
      <FormulateInput
        type="textarea"
        name="description"
        label="Description"
      />
   
      <FormulateInput
        type="submit"
        label="Submit"
      /> 

    </FormulateForm>
  </div>
</template>

<script>
import { API } from 'aws-amplify'
import { createIncident } from '../src/graphql/mutations'

export default {
  name: 'Add',
  methods: {
      async addIncident(data) {
          await API.graphql({
              query: createIncident,
              variables: {
                  input: data
                }
            })
          this.$formulate.reset('add')
        }
    }
}
</script>

<style lang="scss">
.lat-long {
    .formulate-input-wrapper {
        @apply mx-2;
        input {
            @apply w-20;
          }
      }
  }
select {
    @apply p-2;
    @apply my-2;
    @apply bg-gray-100;
    @apply rounded-md;
  }
</style>
