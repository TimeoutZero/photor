
# =============================================
# Module
# =============================================
angular.module 'Photor.controllers'

  # =============================================
  # IntroMapController
  # =============================================
  .controller 'IntroMapController', ($scope, $cordovaGeolocation, $timeout, timeoutzeroMapService) ->

    # =============================================
    # Attributes
    # =============================================
    $scope.attrs =
      mapOptions   : null
      viewMode     : 'onlyRead'
      lockedAdress : null

    # =============================================
    # Watchers
    # =============================================
    # $scope.$on 'timeoutzeroMapService:mapRegistered', () ->
    #   latLng = timeoutzeroMapService.createLatLng($scope.attrs.lat, $scope.attrs.lng)
    #   $scope.methods.addMarker(latLng)

    # =============================================
    # Methods
    # =============================================
    $scope.methods =
      getFormattedAddress: (lat, lng) ->
        timeoutzeroMapService.latLngToAddress(lat, lng)
          .then (result) ->
            $scope.attrs.address = result

      getUserPosition: () ->
        options = { timeout: 60000, enableHighAccuracy: yes }
        $cordovaGeolocation.getCurrentPosition(options)
          .then (position) ->
            $scope.attrs.lat = position.coords.latitude
            $scope.attrs.lng = position.coords.longitude
            $scope.attrs.mapUrl = timeoutzeroMapService.staticMap(position.coords.latitude, position.coords.longitude, 200)

          .then () ->
            $scope.methods.getFormattedAddress($scope.attrs.lat, $scope.attrs.lng)

          .catch (error) ->
            throw error

      searchAddress: () ->
        success = (latLng) ->
          $scope.attrs.lat      = latLng.G
          $scope.attrs.lng      = latLng.K
          $scope.attrs.viewMode = 'onlyRead'

        timeoutzeroMapService.addressToLatLng($scope.attrs.address).then(success)

      editAdress: ->
        $scope.attrs.lockedAdress = angular.copy($scope.attrs.adress)
        $scope.attrs.viewMode = null

      cancelToEditAddress: ->
        $scope.attrs.adress = angular.copy($scope.attrs.lockedAdress)
        $scope.attrs.viewMode = 'onlyRead'

    # =============================================
    # Aux Methods
    # =============================================

    # =============================================
    # Watchers
    # =============================================

    # =============================================
    # Initialize
    # =============================================
    $timeout () ->
      $scope.methods.getUserPosition()

    return @
