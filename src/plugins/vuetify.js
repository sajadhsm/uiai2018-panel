import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import 'vuetify/src/stylus/app.styl'
import fa from 'vuetify/es5/locale/fa'

Vue.use(Vuetify, {
  iconfont: 'md',
  rtl: true,
  lang: {
    locales: { fa },
    current: 'fa'
  }
})
