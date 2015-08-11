
# =============================================
# Vendors Module
# =============================================
angular.module 'Photor.vendors' , [
  'objectToArray'
  'ui.select'
  'ui.bootstrap'
  'ui.utils.masks'
  'ngAnimate'
  'ngCookies'
  'ngTouch'
  'ngSanitize'
  'ngResource'
  'ngCordova'
  'ionic'
  'timeoutzeroMap'
]

# =============================================
# Modules
# =============================================
angular.module 'Photor.controllers' , ['Photor.vendors']
angular.module 'Photor.filters'     , ['Photor.vendors']
angular.module 'Photor.factories'   , ['Photor.vendors']
angular.module 'Photor.services'    , ['Photor.vendors']
angular.module 'Photor.constants'   , ['Photor.vendors']
angular.module 'Photor.directives'  , ['Photor.vendors']
angular.module 'Photor.mocks'       , ['Photor.vendors']
angular.module 'Photor.providers'   , ['Photor.vendors']
angular.module 'Photor.templates'   , ['Photor.vendors']
angular.module 'Photor.configs'     , ['Photor.vendors']




# =============================================
# Scripts Module
# =============================================
angular.module 'Photor.scripts'     , [
  'Photor.controllers'
  'Photor.constants'
  'Photor.filters'
  'Photor.factories'
  'Photor.services'
  'Photor.directives'
  'Photor.mocks'
  'Photor.providers'
  'Photor.templates'
  'Photor.configs'
]


# =============================================
# Main Module
# =============================================
angular.module 'Photor', [
  'ui.router'
  'Photor.vendors'
  'Photor.scripts'
]