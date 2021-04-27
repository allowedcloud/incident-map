<template>
  <div class="m-12">
    <h1 class="text-3xl font-bold border-b-2 border-gray-300 mx-24">
      Edit Activities
    </h1>
    <div class="m-6 flex justify-center">
      <div class="grid grid-cols-2 gap-12">
        <div
          v-for="incident in incidents"
          :key="incident.id"
          class="p-4 my-4 shadow-md rounded-lg border border-gray-400 w-96"
        >
          <template v-if="incident.id === editing">
            <FormulateForm @submit="updateIncident">
              <div class="flex flex-col float-right">
                <FormulateInput type="submit">
                  <img src="/check.svg" alt="Ok" class="w-4 cursor-pointer" />
                </FormulateInput>
              </div>
              <FormulateInput
                type="text"
                name="title"
                v-model="incident.title"
                validation="required"
                class="title"
              />

              <FormulateInput
                type="select"
                name="type"
                v-model="incident.type"
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
              />
              <FormulateInput
                type="date"
                name="date"
                v-model="incident.date"
                validation="required|after:2021-01-01"
              />

              <FormulateInput
                type="textarea"
                name="description"
                v-model="incident.description"
                validation="required|max:200"
                class="desc"
              />

              <FormulateInput
                type="select"
                name="state"
                v-model="incident.state"
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
              />
              <FormulateInput
                type="text"
                name="lat"
                validation="required|number"
                v-model="incident.lat"
              />

              <FormulateInput
                type="text"
                name="long"
                validation="required|number"
                v-model="incident.long"
              />

              <FormulateInput
                type="text"
                name="primarySource"
                validation="required|url"
                v-model="incident.primarySource"
              />
              <FormulateInput
                type="text"
                name="secondarySource"
                v-model="incident.secondarySource"
              />
              <FormulateInput
                type="text"
                name="thirdSource"
                v-model="incident.thirdSource"
              />
            </FormulateForm>
          </template>

          <template v-else>
            <img
              src="/circle-x.svg"
              alt="Delete"
              title="Delete"
              class="w-4 ml-2 float-right cursor-pointer"
              @click="deleteIncident(incident.id, incident.title)"
            />
            <img
              src="/edit.svg"
              alt="Edit"
              title="Edit"
              class="w-4 float-right cursor-pointer"
              @click="editEvent(incident.id)"
            />
            <p class="text-gray-500">{{ incident.state }}</p>
            <h1 class="text-xl font-bold">{{ incident.title }}</h1>
            <p class="text-gray-500">{{ incident.date }}</p>
            <div class="flex flex-row text-sm font-mono text-gray-400">
              {{ incident.lat }}, {{ incident.long }}
            </div>
            <p class="text-gray-500">{{ incident.description }}</p>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { API } from "aws-amplify";
import { listIncidents } from "../src/graphql/queries";
import * as mutations from "../src/graphql/mutations";
export default {
  // middleware: "authenticated",
  data() {
    return {
      incidents: [],
      editing: "",
    };
  },
  computed: {
    getUser() {
      return this.$store.state.auth?.cognitoUser || "Unknown User";
    },
    sorted() {
      const sort = this.incidents.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );
      this.incidents = sort;
    },
  },
  mounted() {
    this.getIncidents();
  },
  methods: {
    async getIncidents() {
      const incidents = await API.graphql({
        query: listIncidents,
      });
      this.incidents = incidents.data.listIncidents.items;
      this.incidents = this.incidents.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );
    },
    editEvent(id) {
      this.editing = id;
    },
    stopEdit() {
      this.editing = "";
    },
    updateIncident(payload) {
      payload.id = this.editing;
      API.graphql({
        query: mutations.updateIncident,
        variables: { input: payload },
      });
      this.editing = "";
      this.getIncidents;
      this.sorted;
      this.$store.dispatch("incidents/getIncidents");
    },
    deleteIncident(id, title) {
      const payload = {
        id: id,
      };
      if (confirm(`Delete ${title}?`)) {
        API.graphql({
          query: mutations.deleteIncident,
          variables: { input: payload },
        });
        this.getIncidents;
        this.sorted;
        this.$store.dispatch("incidents/getIncidents")
      } else {
        console.log("CANCELED");
      }
    },
  },
};
</script>

<style>
.formulate-input-help--after {
  @apply text-xs;
}
</style>
