
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
    $scope.$on 'timeoutzeroMapService:mapRegistered', () ->
      latLng = timeoutzeroMapService.createLatLng($scope.attrs.lat, $scope.attrs.lng)
      $scope.methods.addMarker(latLng)

    # =============================================
    # Methods
    # =============================================
    $scope.methods =
      getUserPosition: () ->
        options = { timeout: 60000, enableHighAccuracy: yes }
        $cordovaGeolocation.getCurrentPosition(options)
          .then (position) ->
            $scope.attrs.lat = position.coords.latitude
            $scope.attrs.lng = position.coords.longitude
            $scope.attrs.mapOptions =
              center            : new google.maps.LatLng position.coords.latitude, position.coords.longitude
              zoom              : 15
              mapTypeId         : google.maps.MapTypeId.ROADMAP
              draggable         : false
              minZoom           : 10
              maxZoom           : 18
              panControl        : no
              streetViewControl : no
              mapTypeControl    : no

            (error) ->
              throw error

      addMarker: (latLng, title) ->
        timeoutzeroMapService.removeMarkers()
        timeoutzeroMapService.addMarker(latLng, title, google.maps.Animation.DROP)
        timeoutzeroMapService.panTo(latLng)

      searchAddress: () ->
        success = (latLng) ->
          $scope.attrs.lat = latLng.G
          $scope.attrs.lng = latLng.K
          $scope.methods.addMarker(latLng)
          $scope.attrs.viewMode = 'onlyRead'

        timeoutzeroMapService.addressToLatLng($scope.attrs.address).then(success)

      geolocate: () ->
        options = { timeout: 60000, enableHighAccuracy: yes }
        $cordovaGeolocation.getCurrentPosition(options)
          .then (position) ->
            $scope.attrs.address = null
            $scope.attrs.lat     = position.coords.latitude
            $scope.attrs.lng     = position.coords.longitude

            $scope.methods.addMarker(new google.maps.LatLng position.coords.latitude, position.coords.longitude)

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
