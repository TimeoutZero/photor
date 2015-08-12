

# =============================================
# Main Module
# =============================================
angular.module 'Photor'

  # =============================================
  # Config Twain
  # =============================================
  .config ($stateProvider, $urlRouterProvider) ->

    $stateProvider
      .state "pocs",
        url         : "/pocs"
        abstract    : yes
        templateUrl : "app/features/pocTabs/main.html"


    # $urlRouterProvider.otherwise '/OAuth'