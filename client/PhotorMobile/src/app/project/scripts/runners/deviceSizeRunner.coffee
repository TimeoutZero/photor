

# =============================================
# Module
# =============================================
angular.module 'Photor'

  # =============================================
  # Initialize
  # =============================================
  .run ['$rootScope', '$window', ($rootScope, $window) ->

    # Window height
    # =================================
    $rootScope.isSmallDevice = $window.screen.height < 568 # Tamanho da tela do iPhone 5

  ]