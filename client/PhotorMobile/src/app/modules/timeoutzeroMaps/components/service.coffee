angular.module "timeoutzeroMap.services"
  .service "timeoutzeroMapService", ($q, $rootScope) ->

    map                = null
    markers            = []
    bounds             = new google.maps.LatLngBounds()
    geocoder           = new google.maps.Geocoder()
    directionsService  = new google.maps.DirectionsService()
    directionsRenderer = new google.maps.DirectionsRenderer()

    return {

      directionsService  : directionsService
      directionsRenderer : directionsRenderer

      staticMap: (lat, lng, size) ->
        return "https://maps.googleapis.com/maps/api/staticmap?markers=#{lat},#{lng}&size=#{size}x#{size}"

      registerMap: (mapInstance) ->
        map = mapInstance
        $rootScope.$broadcast 'timeoutzeroMapService:mapRegistered'

      formatWaypoints: (latLngArray) ->
        waypointsArray = []
        for waypoint in latLngArray.slice(1, -1)
          waypointsArray.push { location: waypoint }

        return waypointsArray

      setPath : (latLngArray) ->
        directionsRenderer.setMap(null)
        directionsRenderer.setMap(map)

        request =
          origin            : latLngArray[0]
          destination       : latLngArray[latLngArray.length - 1]
          waypoints         : @formatWaypoints(latLngArray)
          optimizeWaypoints : true
          travelMode        : google.maps.TravelMode.DRIVING

        deferred = $q.defer()
        directionsService.route request, @routeCallback

        return deferred.promise

      routeCallback : (response, status) ->
        deferred = $q.defer()
        if status is google.maps.DirectionsStatus.OK
          deferred.resolve directionsRenderer.setDirections(response)
        else
          deferred.reject 'exception.timeoutzeroMap.addressToLatLng'

      addToBounds : (latLng) ->
        bounds.extend latLng
        map.fitBounds(bounds)
        map.panToBounds(bounds)

      panTo : (latLng) ->
        map.setZoom(15)
        map.setCenter(latLng)
        map.panTo(latLng)

      addMarker: (latLng, title, animation) ->
        markers.push new google.maps.Marker({
          position: latLng
          map: map
          title: title if title
          animation: animation if animation
        })

      hideMarkers: () ->
        for marker in markers
          marker.setMap(null)

      showMarkers: () ->
        for marker in markers
          marker.setMap(map)

      removeMarkers: () ->
        @hideMarkers()
        markers = []

      latLngToAddress : (lat, lng) ->
        deferred = $q.defer()
        latLng = {lat: lat, lng: lng}
        geocoder.geocode {'location': latLng}, (results, status) ->
          if status is google.maps.GeocoderStatus.OK
            address = results[0].formatted_address
            deferred.resolve address
          else
            deferred.reject 'exception.timeoutzeroMap.latLngToAddress'

        return deferred.promise

      addressToLatLng : (address) ->
        deferred = $q.defer()
        geocoder.geocode {'address': address}, (results, status) ->
          if status is google.maps.GeocoderStatus.OK
            latLng = results[0].geometry.location
            deferred.resolve latLng
          else
            deferred.reject 'exception.timeoutzeroMap.addressToLatLng'

        return deferred.promise

      createLatLng : (lat, lng) ->
        return new google.maps.LatLng(lat, lng)

      setEvent : (eventName, cb) ->
        google.maps.event.addDomListener(map, eventName, cb)

    }

