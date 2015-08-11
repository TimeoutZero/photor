'use strict'

angular.module "timeoutzeroMap.templates"
  .run [
    '$templateCache'
    ($templateCache)->
      $templateCache.put 'timeoutzeroMap/map.html',
        """
        <div class="timeoutzero-map"></div>
        """
  ]
