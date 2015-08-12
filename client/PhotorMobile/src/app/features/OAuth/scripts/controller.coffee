
# =============================================
# Module
# =============================================
angular.module 'Photor.controllers'

  # =============================================
  # MainOAuthController
  # =============================================
  .controller 'MainOAuthController', ($scope, $cordovaOauth) ->

    # =============================================
    # Attributes
    # =============================================
    $scope.attrs = {}

    # =============================================
    # Methods
    # =============================================
    $scope.methods =
      loginWithFacebook: ->
        success = (data) ->
          console.log(data)
          alert 'Uhuuuuu o/'

        error = (data) ->
          console.log(data)
          alert '=('

        $cordovaOauth.facebook("1654024714834818", ["email"]).then(success, error)

    # =============================================
    # Aux Methods
    # =============================================


    # =============================================
    # Initialize
    # =============================================

    return @

