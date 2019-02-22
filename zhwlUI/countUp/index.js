import Vue from 'vue';

/**
 * @author Duke
 *
 */
import countUp from './src/countUp.vue';

countUp.install = function (Vue) {
  Vue.component(countUp.name, countUp);
};

export default countUp;
