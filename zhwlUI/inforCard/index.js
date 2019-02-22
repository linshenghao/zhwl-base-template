import Vue from 'vue';

/**
 * @author Duke
 *
 */
import inforCard from './src/inforCard.vue';

inforCard.install = function (Vue) {
  Vue.component(inforCard.name, inforCard);
};

export default inforCard;
