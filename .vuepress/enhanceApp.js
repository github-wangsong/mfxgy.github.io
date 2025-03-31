import * as Matter from 'matter-js';

export default async ({
  Vue
}) => {
  if (typeof process === 'undefined') {
    Vue.prototype.$matter = Matter
  }
}


// import components from '@/components'

// export default ({ Vue }) => {
//     components.forEach(({name, component}) => Vue.component(name, component))
// }