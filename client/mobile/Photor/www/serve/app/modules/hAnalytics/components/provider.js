(function() {
  var hasProp = {}.hasOwnProperty;

  angular.module('hAnalytics.providers').provider('hAnalyticsTrackers', function() {
    var loadGA, methods, trackers;
    loadGA = function() {
      return (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','//www.google-analytics.com/analytics.js','ga');;
    };
    loadGA();
    trackers = {};
    methods = {
      createTracker: function(tracker) {
        var e;
        try {
          return ga('create', tracker.UA, {
            name: tracker.name,
            cookieDomain: 'none'
          });
        } catch (_error) {
          e = _error;
          return console.log('hAnalytics.createTracker error', e);
        }
      },
      init: function() {
        var count, key, results, tracker;
        count = 0;
        results = [];
        for (key in trackers) {
          if (!hasProp.call(trackers, key)) continue;
          tracker = trackers[key];
          if (!tracker.UA) {
            continue;
          }
          if (tracker.name == null) {
            tracker.name = "" + key;
          }
          count++;
          results.push(methods.createTracker(tracker));
        }
        return results;
      }
    };
    this.set = function(config) {
      trackers = $.extend(true, trackers, config);
      return methods.init();
    };
    this.$get = [
      function($window) {
        return trackers;
      }
    ];
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vZHVsZXMvaEFuYWx5dGljcy9jb21wb25lbnRzL3Byb3ZpZGVyLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUFBLE1BQUE7O0VBQUEsT0FBTyxDQUFDLE1BQVIsQ0FBZSxzQkFBZixDQUNBLENBQUMsUUFERCxDQUNVLG9CQURWLEVBQ2dDLFNBQUE7QUFDOUIsUUFBQTtJQUFBLE1BQUEsR0FBUyxTQUFBO2FBQ1A7Ozs7SUFETztJQU1ULE1BQUEsQ0FBQTtJQUVBLFFBQUEsR0FBVztJQUVYLE9BQUEsR0FDRTtNQUFBLGFBQUEsRUFBZSxTQUFDLE9BQUQ7QUFDYixZQUFBO0FBQUE7aUJBQ0UsRUFBQSxDQUFHLFFBQUgsRUFBYSxPQUFPLENBQUMsRUFBckIsRUFBeUI7WUFBQyxJQUFBLEVBQU0sT0FBTyxDQUFDLElBQWY7WUFBcUIsWUFBQSxFQUFjLE1BQW5DO1dBQXpCLEVBREY7U0FBQSxjQUFBO1VBRU07aUJBQ0osT0FBTyxDQUFDLEdBQVIsQ0FBWSxnQ0FBWixFQUE4QyxDQUE5QyxFQUhGOztNQURhLENBQWY7TUFPQSxJQUFBLEVBQU0sU0FBQTtBQUNKLFlBQUE7UUFBQSxLQUFBLEdBQVE7QUFDUjthQUFBLGVBQUE7OztVQUNFLElBQVksQ0FBQyxPQUFPLENBQUMsRUFBckI7QUFBQSxxQkFBQTs7VUFDQSxJQUFJLG9CQUFKO1lBQ0UsT0FBTyxDQUFDLElBQVIsR0FBZSxFQUFBLEdBQUcsSUFEcEI7O1VBRUEsS0FBQTt1QkFDQSxPQUFPLENBQUMsYUFBUixDQUFzQixPQUF0QjtBQUxGOztNQUZJLENBUE47O0lBaUJGLElBQUMsQ0FBQSxHQUFELEdBQU8sU0FBQyxNQUFEO01BQ0wsUUFBQSxHQUFXLENBQUMsQ0FBQyxNQUFGLENBQVMsSUFBVCxFQUFlLFFBQWYsRUFBeUIsTUFBekI7YUFFWCxPQUFPLENBQUMsSUFBUixDQUFBO0lBSEs7SUFLUCxJQUFDLENBQUEsSUFBRCxHQUFRO01BQUMsU0FBQyxPQUFEO0FBQ1AsZUFBTztNQURBLENBQUQ7O0VBbENzQixDQURoQztBQUFBIiwiZmlsZSI6Im1vZHVsZXMvaEFuYWx5dGljcy9jb21wb25lbnRzL3Byb3ZpZGVyLmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIiwic291cmNlc0NvbnRlbnQiOlsiYW5ndWxhci5tb2R1bGUgJ2hBbmFseXRpY3MucHJvdmlkZXJzJ1xuLnByb3ZpZGVyICdoQW5hbHl0aWNzVHJhY2tlcnMnLCAoKS0+XG4gIGxvYWRHQSA9IC0+XG4gICAgYChmdW5jdGlvbihpLHMsbyxnLHIsYSxtKXtpWydHb29nbGVBbmFseXRpY3NPYmplY3QnXT1yO2lbcl09aVtyXXx8ZnVuY3Rpb24oKXtcbiAgICAoaVtyXS5xPWlbcl0ucXx8W10pLnB1c2goYXJndW1lbnRzKX0saVtyXS5sPTEqbmV3IERhdGUoKTthPXMuY3JlYXRlRWxlbWVudChvKSxcbiAgICBtPXMuZ2V0RWxlbWVudHNCeVRhZ05hbWUobylbMF07YS5hc3luYz0xO2Euc3JjPWc7bS5wYXJlbnROb2RlLmluc2VydEJlZm9yZShhLG0pXG4gICAgfSkod2luZG93LGRvY3VtZW50LCdzY3JpcHQnLCcvL3d3dy5nb29nbGUtYW5hbHl0aWNzLmNvbS9hbmFseXRpY3MuanMnLCdnYScpO2BcblxuICBsb2FkR0EoKVxuXG4gIHRyYWNrZXJzID0ge31cblxuICBtZXRob2RzID1cbiAgICBjcmVhdGVUcmFja2VyOiAodHJhY2tlciktPlxuICAgICAgdHJ5XG4gICAgICAgIGdhICdjcmVhdGUnLCB0cmFja2VyLlVBLCB7bmFtZTogdHJhY2tlci5uYW1lLCBjb29raWVEb21haW46ICdub25lJ31cbiAgICAgIGNhdGNoIGVcbiAgICAgICAgY29uc29sZS5sb2cgJ2hBbmFseXRpY3MuY3JlYXRlVHJhY2tlciBlcnJvcicsIGVcblxuXG4gICAgaW5pdDogKCktPlxuICAgICAgY291bnQgPSAwXG4gICAgICBmb3Igb3duIGtleSwgdHJhY2tlciBvZiB0cmFja2Vyc1xuICAgICAgICBjb250aW51ZSBpZiAhdHJhY2tlci5VQVxuICAgICAgICBpZiAhdHJhY2tlci5uYW1lP1xuICAgICAgICAgIHRyYWNrZXIubmFtZSA9IFwiI3trZXl9XCJcbiAgICAgICAgY291bnQrK1xuICAgICAgICBtZXRob2RzLmNyZWF0ZVRyYWNrZXIgdHJhY2tlclxuXG5cbiAgQHNldCA9IChjb25maWcpLT5cbiAgICB0cmFja2VycyA9ICQuZXh0ZW5kIHRydWUsIHRyYWNrZXJzLCBjb25maWdcblxuICAgIG1ldGhvZHMuaW5pdCgpXG5cbiAgQCRnZXQgPSBbKCR3aW5kb3cpLT5cbiAgICByZXR1cm4gdHJhY2tlcnNcbiAgXVxuXG4gIHJldHVybiJdfQ==