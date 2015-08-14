

# =============================================
# Main Module
# =============================================
angular.module 'Photor'

  # =============================================
  # Config Twain
  # =============================================
  .config ($stateProvider, $urlRouterProvider) ->


    $stateProvider
      .state "pocs.camera",
        url         : "/camera"
        views:
          'camera':
            templateUrl : "app/features/camera/templates/main.html"
            controller  : 'MainCameraController'



    # $urlRouterProvider.otherwise '/OAuth'