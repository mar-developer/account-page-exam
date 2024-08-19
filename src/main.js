import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import VueGravatar from 'vue3-gravatar';

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core';

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

/* import specific icons */
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';

library.add(fas, far, fab);

const app = createApp(App);

app.component('font-awesome-icon', FontAwesomeIcon);
app.use(VueGravatar);
app.use(router);
app.mount('#app');
