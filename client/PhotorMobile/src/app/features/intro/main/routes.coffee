

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
            templateUrl : "app/features/intro/main/template.html"
            controller  : 'MainIntroController'
          'welcome@intro' :
            templateUrl : "app/features/intro/welcome/template.html"
          'social@intro' :
            templateUrl : "app/features/intro/social/template.html"
          'maps@intro' :
            templateUrl : "app/features/intro/map/template.html"
            controller  : 'IntroMapController'



    # $urlRouterProvider.otherwise '/OAuth'