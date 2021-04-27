import Vue from "vue";
import VueTippy, { TippyComponent } from "vue-tippy";
// Add additional themes.
import "../node_modules/tippy.js/themes/light.css";
import "../node_modules/tippy.js/themes/light-border.css";
import "../node_modules/tippy.js/themes/google.css";
import "../node_modules/tippy.js/themes/translucent.css";

Vue.use(VueTippy);
Vue.component("tippy", TippyComponent);

// or
Vue.use(VueTippy, {
  directive: "tippy", // => v-tippy
  flipDuration: 0,
  popperOptions: {
    modifiers: {
      preventOverflow: {
        enabled: false
      }
    }
  }
});
Vue.component("tippy", TippyComponent);
