
# =============================================
# Module
# =============================================
angular.module 'Photor.controllers'

  # =============================================
  # IntroDayInDayOutController
  # =============================================
  .controller 'IntroDayInDayOutController', ($scope, $ionicSlideBoxDelegate) ->

    # =============================================
    # Attributes
    # =============================================
    $scope.attrs =
      days: [
        { label: 'S', name: 'MONDAY'    , enabled : no, order: 0 }
        { label: 'T', name: 'TUESDAY'   , enabled : no, order: 1 }
        { label: 'Q', name: 'WEDNESDAY' , enabled : no, order: 2 }
        { label: 'Q', name: 'THURSDAY'  , enabled : no, order: 3 }
        { label: 'S', name: 'FRIDAY'    , enabled : no, order: 4 }
        { label: 'S', name: 'SATURDAY'  , enabled : no, order: 5 }
        { label: 'D', name: 'SUNDAY'    , enabled : no, order: 6 }
      ]

    # =============================================
    # Methods
    # =============================================
    $scope.actions = {}



    # =============================================
    # Aux Methods
    # =============================================


    # =============================================
    # Initialize
    # =============================================

    return @


