
# =============================================
# Module
# =============================================
angular.module 'Photor.controllers'

  # =============================================
  # MainTimerController
  # =============================================
  .controller 'NotificationController', ($rootScope, $scope, $cordovaLocalNotification, $timeout) ->

    # =============================================
    # Attributes
    # =============================================
    $scope.attrs =
      notifications          : []
      triggeredNotifications : []

    # =============================================
    # Methods
    # =============================================
    $scope.methods =
      scheduleNotification: () ->
        $cordovaLocalNotification.schedule({
          id    : _.uniqueId()
          title : 'Photor'
          text  : 'No jangers? Que tal uma foto com a galera?'
          at    : moment().add(10, 'seconds').toDate()
          badge : 1
        })#.then((result) ->)

      updateNotificationCount: () ->
        $rootScope.notificationCount = $scope.attrs.triggeredNotifications.length

    # =============================================
    # Aux Methods
    # =============================================

    # =============================================
    # Watchers && Listeners
    # =============================================
    $scope.$watch('attrs.triggeredNotifications', () ->
      $scope.methods.updateNotificationCount()
    , yes)

    $rootScope.$on('$cordovaLocalNotification:schedule', (e, notification, state) ->
      $scope.attrs.notifications.push(notification)
    )

    $rootScope.$on('$cordovaLocalNotification:trigger', (e, notification, state) ->
      $scope.attrs.triggeredNotifications.push(notification)

      $scope.attrs.notifications = _.filter($scope.attrs.notifications, (i) ->
        return i.id isnt notification.id
      )
    )

    $rootScope.$on('$cordovaLocalNotification:clear', (e, notification, state) ->
      $scope.attrs.triggeredNotifications = _.filter($scope.attrs.triggeredNotifications, (i) ->
        return i.id isnt notification.id
      )
    )

    # =============================================
    # Initialize
    # =============================================

    return @

