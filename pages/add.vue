<template>
  <div class="m-12 mx-36">
    <div class="flex flex-col items-center">
      <FormulateForm
        name="add"
        @submit="addIncident"
        class="bg-gray-100 border border-gray-300 p-8 shadow-lg rounded-lg"
      >
        <div class="grid grid-cols-6 form-grid">
          <div class="col-span-4">
            <FormulateInput
              type="text"
              name="title"
              label="Title"
              validation="required"
              class="title"
            />

            <div class="flex">

            <FormulateInput
              type="select"
              name="type"
              label="Type"
              :options="[
                'Confrontation',
                'Homicide',
                'Drug Trafficking',
                'Apprehension',
                'Kidnapping',
                'Narco-message',
                'Military',
                'Recorded video'
              ]"
              class="mr-12"
            />
            <FormulateInput
              type="date"
              name="date"
              label="Date"
              validation="required|after:2021-01-01"
            />
            </div>

            <FormulateInput
              type="textarea"
              name="description"
              label="Description"
              validation="required|max:200"
            />

            <h1
              class="text-xl uppercase font-bold mb-4 border-b-2 border-gray-300 mt-6"
            >
              Location
            </h1>

            <div class="lat-long flex flex-row">
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
                  'Sonora',
                  'Sinaloa',
                  'Tabasco',
                  'Tamaulipas',
                  'Tlaxcala',
                  'Veracruz',
                  'Yucatán',
                  'Zacatecas',
                ]"
                class="mr-4"
              />
              <FormulateInput
                type="text"
                name="lat"
                label="Latitude"
                validation="required|number"
                class="mx-2"
              />

              <FormulateInput
                type="text"
                name="long"
                label="Longitude"
                validation="required|number"
                class="mx-2"
              />
            </div>
          </div>
          <div class="col-span-2 source">
            <FormulateInput
              type="group"
              name="sources"
              :repeatable="true"
              validation-name="sources"
              validation="max:3, length"
              add-label="+ Source"
            >
              <FormulateInput
                type="url"
                name="link"
                label="Source URL"
                placeholder="https://"
                validation="required|url"
              />
            </FormulateInput>
          </div>
        </div>
        <FormulateInput type="submit" label="Submit" />
      </FormulateForm>
    </div>
  </div>
</template>

<script>
export default {
  name: "Add",
  middleware: "authenticated",
  head: {
    title: "Add activity"
  },
  methods: {
    addIncident(payload) {
      const _ = require("lodash");  
      payload.primarySource = payload.sources[0].link
      if (payload.sources[1] === undefined) {
        payload.secondarySource = "#"
      } else {
        payload.secondarySource = payload.sources[1].link
      }
      if (payload.sources[2] === undefined) {
        payload.thirdSource = "#"
      } else {
        payload.thirdSource = payload.source[2].link
      }
      payload = _.omit(payload, ['sources'])
      this.$store.dispatch("incidents/addIncident", payload);
      this.$formulate.reset("add");
    }
  }
};
</script>
