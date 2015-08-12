

# =============================================
# Main Module
# =============================================
angular.module 'Photor'

  # =============================================
  # Config Twain
  # =============================================
  .config ($stateProvider, $urlRouterProvider) ->

    $stateProvider
      .state "oauth",
        url         : "/OAuth"
        templateUrl : "app/features/OAuth/templates/main.html"
        controller  : 'MainOAuthController'


    $urlRouterProvider.otherwise '/OAuth'