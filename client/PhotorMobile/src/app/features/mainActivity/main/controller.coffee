
# =============================================
# Module
# =============================================
angular.module 'Photor.controllers'

  # =============================================
  # MainActviController
  # =============================================
  .controller 'MainActivityController', ($scope, $cordovaOauth, $ionicSlideBoxDelegate) ->

    # =============================================
    # Attributes
    # =============================================
    $scope.attrs = {}

    # =============================================
    # Methods
    # =============================================
    $scope.actions =
      nextSlide : ->
        currentIndex = $ionicSlideBoxDelegate.currentIndex()
        $ionicSlideBoxDelegate.slide(currentIndex + 1)

    # =============================================
    # Aux Methods
    # =============================================


    # =============================================
    # Initialize
    # =============================================

    return @

