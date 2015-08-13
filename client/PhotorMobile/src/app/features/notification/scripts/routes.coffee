

# =============================================
# Main Module
# =============================================
angular.module 'Photor'

  # =============================================
  # Config
  # =============================================
  .config ($stateProvider, $urlRouterProvider) ->

    $stateProvider
      .state "pocs.notification",
        url         : "/notification"
        views:
          'notification':
            templateUrl : "app/features/notification/templates/main.html"
            controller  : 'NotificationController'