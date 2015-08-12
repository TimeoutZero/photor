# =============================================
# Vendors Module
# =============================================
# angular.module 'timeoutzeroMap.vendors' , []

# =============================================
# Modules
# =============================================
# angular.module 'timeoutzeroMap.controllers' , ['timeoutzeroMap.vendors']
# angular.module 'timeoutzeroMap.filters'     , ['timeoutzeroMap.vendors']
# angular.module 'timeoutzeroMap.factories'   , ['timeoutzeroMap.vendors']
angular.module 'timeoutzeroMap.services'      , []
# angular.module 'timeoutzeroMap.constants'   , ['timeoutzeroMap.vendors']
angular.module 'timeoutzeroMap.directives'    , []
# angular.module 'timeoutzeroMap.mocks'       , ['timeoutzeroMap.vendors']
# angular.module 'timeoutzeroMap.providers'   , ['timeoutzeroMap.vendors']
angular.module 'timeoutzeroMap.templates'     , []
# angular.module 'timeoutzeroMap.configs'     , ['timeoutzeroMap.vendors']

# =============================================
# Scripts Module
# =============================================
angular.module 'timeoutzeroMap.scripts'     , [
  # 'timeoutzeroMap.controllers'
  # 'timeoutzeroMap.constants'
  # 'timeoutzeroMap.filters'
  # 'timeoutzeroMap.factories'
  'timeoutzeroMap.services'
  'timeoutzeroMap.directives'
  # 'timeoutzeroMap.mocks'
  # 'timeoutzeroMap.providers'
  'timeoutzeroMap.templates'
  # 'timeoutzeroMap.configs'
]

# =============================================
# Main Module
# =============================================
angular.module 'timeoutzeroMap', [
  # 'timeoutzeroMap.vendors'
  'timeoutzeroMap.scripts'
]