import Vue from 'vue';
import countUp from './countUp/index.js'
import inforCard from './inforCard/index.js'

const components = [
  countUp,inforCard
]
const install = function(Vue) {
  if (install.installed){
    return ;
  }
  components.map(component => Vue.component(component.name, component));
};

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install,
  countUp,
  inforCard,
}

