

# =============================================
# Main Module
# =============================================
angular.module 'Photor'

  # =============================================
  # Config Twain
  # =============================================
  .config ($stateProvider, $urlRouterProvider) ->

    $stateProvider
      .state "/timer",
        url         : "timer"
        templateUrl : "app/features/timer/templates/main.html"
        controller  : ($scope) ->


    $urlRouterProvider.otherwise '/timer'