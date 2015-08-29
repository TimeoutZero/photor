

# =============================================
# Main Module
# =============================================
angular.module 'Photor'

  # =============================================
  # Config Android native scrolling
  # =============================================
  .config ($ionicConfigProvider) ->

    unless ionic.Platform.isIOS()
      $ionicConfigProvider.scrolling.jsScrolling(no)