<template>
    <div class="app">
        <keep-alive>
            <router-view />
        </keep-alive>
        <app-modal />
        <app-menu />
    </div>
</template>

<script>
    import moment from 'moment';
    import AppModal from './AppModal';
    import AppMenu from './AppMenu';

    export default {
        name: 'App',
        components: {
            AppModal,
            AppMenu,
        },
        created() {
            if (this.$i18n.locale === 'ru') {
                moment.updateLocale('ru', {
                    monthsShort: ['янв', 'фев', 'мар', 'апр', 'мая', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'],
                    weekdays : ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"],
                });
            }

            moment.locale(this.$i18n.locale);
        },
    }
</script>

<style lang="less">
    @import (reference) '../less/style';

    .app {
        .flex(column, nowrap, flex-start, center);
        width: 100%;
    }
</style>