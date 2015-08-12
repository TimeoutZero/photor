

# =============================================
# Module
# =============================================
angular.module 'Photor'

  # =============================================
  # Initialize
  # =============================================
  .run ['$window', ($window) ->

    # Facebook SDK
    # =================================
    window.fbAsyncInit = () ->
      FB.init(
        appId      : '1654024714834818'
        xfbml      : yes
        version    : 'v2.4'
        status     : yes
        oauth      : yes
        cookie     : yes
      )

    do (d = document, s = 'script', id = 'facebook-jssdk') ->
      fjs = d.getElementsByTagName(s)[0]
      if d.getElementById(id) then return
      js      = d.createElement(s)
      js.id   = id
      js.src = "//connect.facebook.net/en_US/sdk.js"
      fjs.parentNode.insertBefore(js, fjs)

  ]