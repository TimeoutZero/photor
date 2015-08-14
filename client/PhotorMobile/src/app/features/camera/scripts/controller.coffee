
# =============================================
# Module
# =============================================
angular.module 'Photor.controllers'

  # =============================================
  # MainOAuthController
  # =============================================
  .controller 'MainCameraController', ($scope, $cordovaCamera, $cordovaVibration) ->

    # =============================================
    # Attributes
    # =============================================
    $scope.attrs =
      imageUrl: null

    # =============================================
    # Methods
    # =============================================
    $scope.methods =
      getPicture: ->
        $cordovaVibration.vibrate(10)

        success = (imageData) ->
          $scope.attrs.imageUrl = imageData
          alert 'Uhuuuuu o/'

        error = (data) ->
          console.log(data)
          alert '=('


        options =
          quality          : 50
          destinationType  : Camera.DestinationType.FILE_URI
          sourceType       : Camera.PictureSourceType.CAMERA
          allowEdit        : yes
          encodingType     : Camera.EncodingType.JPEG
          targetWidth      : 100
          targetHeight     : 100
          popoverOptions   : {}
          saveToPhotoAlbum : no

        $cordovaCamera.getPicture(options).then(success, error)



    # =============================================
    # Aux Methods
    # =============================================


    # =============================================
    # Initialize
    # =============================================

    return @

