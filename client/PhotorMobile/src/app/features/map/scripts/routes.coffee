

# =============================================
# Main Module
# =============================================
angular.module 'Photor'

  # =============================================
  # Config
  # =============================================
  .config ($stateProvider, $urlRouterProvider) ->

    $stateProvider
      .state "map",
        url         : "/map"
        templateUrl : "app/features/map/templates/main.html"
        controller  : 'MapController'