import api from '../modules/api';
import moment from 'moment';

function initialState() {
    return {
        items: [],
    };
}

export default {
    namespaced: true,
    state: initialState,
    getters: {
        items: state => state.items,
        timingsCount: state => state.items.length,
        todayTimings: state => state.items.filter(timing => {
            if (moment(timing.start).isSame(moment(), 'day')) {
                return timing;
            }
        }),
        otherTimings: state => state.items.filter(timing => {
            if (!moment(timing.start).isSame(moment(), 'day')) {
                return timing;
            }
        }),
        todayTimingsCount: state => state.items.filter(timing => {
            if (moment(timing.start).isSame(moment(), 'day')) {
                return timing;
            }
        }).length,
        otherTimingsCount: state => state.items.filter(timing => {
            if (!moment(timing.start).isSame(moment(), 'day')) {
                return timing;
            }
        }).length,
    },
    actions: {
        timingLoad({ commit }) {
            api.get('/timing')
                .then(response => {
                    commit('timingLoad', response.data.map(timing => {
                        return {
                            id: timing.id,
                            taskId: timing.task.id,
                            start: new Date(Date.parse(timing.startedAt)),
                            end: new Date(Date.parse(timing.endedAt)),
                        };
                    }))
                })
            ;
        },
        timingAdd({ commit }, { taskId, start, end }) {
            api.post('/timing', {
                taskId,
                startedAt: moment(start).utc().unix(),
                endedAt: moment(end).utc().unix(),
            })
                .then(response => {
                    let id = response.data.id;

                    commit('timingAdd', { id, taskId, start, end });
                })
            ;
        },
    },
    mutations: {
        timingLoad(state, timings) {
            timings.forEach(timing => state.items.push(timing));
        },
        timingAdd(state, { id, taskId, start, end }) {
            state.items.unshift({
                id,
                taskId,
                start,
                end,
            });
        },
        reset(state) {
            const s = initialState();

            Object.keys(s).forEach(key => {
                state[key] = s[key];
            });
        },
    },
}