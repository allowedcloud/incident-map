<template>
  <div class="m-12 mx-36">
    <h1 class="text-3xl font-bold border-b-2 border-gray-300 mb-6">
      Add Incident
    </h1>
    <div
      class="flex flex-col h-screen items-center add-incident"
    >
      <FormulateForm
        name="add"
        @submit="addIncident"
        class="bg-gray-100 border-2 border-gray-200 p-8 shadow-lg rounded-lg"
      >
        <div class="grid grid-cols-6 form-grid">
          <div class="col-span-4">
            <FormulateInput
              type="text"
              name="title"
              label="Title"
              placeholder="Title"
              validation="required"
              class="title"
            />

            <FormulateInput
              type="select"
              name="type"
              label="Type"
              :options="['Confrontation', 'Execution']"
            />
            <FormulateInput
              type="date"
              name="date"
              label="Date"
              validation="required|after:2021-01-01"
            />

            <FormulateInput
              type="textarea"
              name="description"
              label="Description"
              validation="required|max:200"
              class="desc"
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
                  'Sinaloa',
                  'Tabasco',
                  'Tamaulipas',
                  'Tlaxcala',
                  'Veracruz',
                  'Yucatán',
                  'Zacatecas',
                ]"
              />
              <FormulateInput
                type="text"
                name="lat"
                label="Latitude"
                validation="required|number"
              />

              <FormulateInput
                type="text"
                name="long"
                label="Longitude"
                validation="required|number"
              />
            </div>
          </div>
          <div class="col-span-2 source">
            <FormulateInput
              type="group"
              name="sources"
              :repeatable="true"
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
import { API } from "aws-amplify";
import { createIncident } from "../src/graphql/mutations";

export default {
  name: "Add",
  data() {
    return {
      value: "What happens?",
    };
  },
  methods: {
    async addIncident(data) {
      await API.graphql({
        query: createIncident,
        variables: {
          input: data,
        },
      });
      this.$formulate.reset("add");
    },
  },
  middleware: "authenticated",
};
</script>

<style lang="scss">
.add-incident {
  .lat-long {
    gap: 2em;
    grid-gap: 2em;
    .formulate-input-wrapper {
      input {
        @apply w-20;
      }
    }
  }
  .form-grid {
    gap: 2em;
    grid-gap: 2em;
  }
  .formulate-input-errors {
    @apply text-xs;
    @apply text-red-400;
  }
  .formulate-input-group-repeatable-remove {
    @apply text-xs;
    @apply text-red-500;
    display: block;
    float: right;
  }
  .source {
    button {
      @apply text-xs;
    }
  }
  .title {
    input {
      width: 400px;
    }
  }
  .formulate-input-help--after {
    @apply text-xs;
    @apply font-bold;
  }
  .desc {
    .formulate-input-wrapper {
      height: 100px;
    }
  }
  select {
    @apply p-3;
    @apply my-2;
    @apply bg-white;
    @apply rounded-md;
    @apply font-mono;
  }

  input {
    @apply py-2;

    &:focus {
      @apply ring-2;
      @apply ring-yellow-400;
      @apply border-yellow-400;
    }
  }
  button {
    @apply bg-yellow-400;
    @apply rounded-md;
    @apply font-bold;
    @apply p-2;
    @apply mt-4;
  }

  textarea {
    width: 300px;

    &:focus {
      @apply ring-2;
      @apply ring-yellow-400;
      @apply border-yellow-400;
    }
  }

  .formulate-input-wrapper {
    label {
      @apply text-gray-600;
    }
  }
}
</style>
