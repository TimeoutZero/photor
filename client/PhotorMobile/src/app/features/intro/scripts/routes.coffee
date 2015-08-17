

# =============================================
# Main Module
# =============================================
angular.module 'Photor'

  # =============================================
  # Config Twain
  # =============================================
  .config ($stateProvider, $urlRouterProvider) ->


    $stateProvider
      .state "intro",
        url         : "/intro"
        views:
          '':
            templateUrl : "app/features/intro/templates/main.html"
            controller  : 'MainIntroController'
          'welcome@intro' :
            templateUrl : "app/features/intro/templates/welcome.html"



    # $urlRouterProvider.otherwise '/OAuth'