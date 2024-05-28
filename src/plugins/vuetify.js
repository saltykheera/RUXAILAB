import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#1976D2',
        secondary: '#424242',
        accent: '#82B1FF',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107',
        background: '#FFFFFF', // Add a background color for light theme
      },
      dark: {
        primary: '#BB86FC',
        secondary: '#3700B3',
        accent: '#03DAC6',
        error: '#CF6679',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107',
        background: '#323437', // Add a background color for dark theme
        activeTab: '#f2a426',
        dataTableBackground: '#1E1E1E',
      },
    },
    dark: false, // Set initial theme to light
  },
})
