

# =============================================
# Main Module
# =============================================
angular.module 'Photor'

  # =============================================
  # Config Twain
  # =============================================
  .config ($stateProvider, $urlRouterProvider) ->

    $urlRouterProvider.otherwise '/pocs/OAuth'