
# =============================================
# Module
# =============================================
angular.module 'Photor.directives'

  # =============================================
  # phMainHeader
  # =============================================
  .directive 'phMainHeader', () ->
    restrict: 'EA'
    replace : yes
    scope: {}
    templateUrl: 'app/components/phMainHeader/template.html'
