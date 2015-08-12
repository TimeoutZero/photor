'use strict'

angular.module "timeoutzeroMap.directives"
.directive "timeoutzeroMap", ($timeout, $window, timeoutzeroMapService) ->
  restrict    : 'A'
  scope       :
    options : '='
  replace     : yes
  templateUrl : 'timeoutzeroMap/map.html'

  link : (scope, elem, attr) ->

    ##################################
    ## Attributes
    ##################################
    scope.map = null

    ##################################
    ## Watchers
    ##################################

    ##################################
    ## Methods
    ##################################

    ##################################
    ## Init
    ##################################
    $timeout () ->
      scope.map = new window.google.maps.Map(elem[0], scope.options)
      timeoutzeroMapService.registerMap scope.map
