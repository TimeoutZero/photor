

# =============================================
# Main Module
# =============================================
angular.module 'Photor'

  # =============================================
  # Config Twain
  # =============================================
  .config ($stateProvider, $urlRouterProvider) ->


    $stateProvider
      .state "main",
        url         : "/main"
        views:
          '':
            templateUrl : "app/features/mainActivity/main/template.html"
            controller  : 'MainActivityController'





    # $urlRouterProvider.otherwise '/OAuth'