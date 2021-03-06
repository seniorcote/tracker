import Vue from 'vue';
import VueRouter from 'vue-router';
import VueI18n from 'vue-i18n'
import App from './components/App';
import Public from './components/Public';
import router from './modules/router';
import store from './store';
import Menu from './plugins/Menu';
import Modal from './plugins/Modal';
import EventBus from './plugins/EventBus';
import en from './locales/en';
import ru from './locales/ru';
import 'moment/locale/ru.js';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../src/less/style.less';

Vue.use(VueRouter);
Vue.use(VueI18n);
Vue.use(Modal);
Vue.use(Menu);
Vue.use(EventBus);

const i18n = new VueI18n({
    locale: 'en',
    fallbackLocale: 'en',
    messages: {
        en,
        ru,
    },
});

new Vue({
    el: '#app',
    router,
    store,
    i18n,
    render: h => store.state.user.authenticated ? h(App) : h(Public),
});