(function() {
  var hasProp = {}.hasOwnProperty;

  angular.module('hAnalytics.services').service('hGATracker', function(hAnalyticsTrackers, hTimer, $window) {
    var API;
    return API = {
      ga: {
        send: function(tracker, options) {
          var e;
          try {
            return $window.ga(tracker.name + ".send", options);
          } catch (_error) {
            e = _error;
            return console.log('hAnalytics.track error', e, tracker);
          }
        },
        set: function(tracker, options) {
          var e;
          try {
            return $window.ga(tracker.name + ".set", options);
          } catch (_error) {
            e = _error;
            return console.log('hAnalytics.track error', e, tracker);
          }
        }
      },
      all: {
        send: function(options) {
          var key, results, tracker;
          results = [];
          for (key in hAnalyticsTrackers) {
            if (!hasProp.call(hAnalyticsTrackers, key)) continue;
            tracker = hAnalyticsTrackers[key];
            results.push(API.ga.send(tracker, options));
          }
          return results;
        },
        set: function(options) {
          var key, results, tracker;
          results = [];
          for (key in hAnalyticsTrackers) {
            if (!hasProp.call(hAnalyticsTrackers, key)) continue;
            tracker = hAnalyticsTrackers[key];
            results.push(API.ga.set(tracker, options));
          }
          return results;
        }
      },
      byName: {
        send: function(name, options) {
          var tracker;
          tracker = hAnalyticsTrackers[name];
          if (tracker != null) {
            return API.ga.send(tracker, options);
          }
        },
        set: function(name, options) {
          var tracker;
          tracker = hAnalyticsTrackers[name];
          if (tracker != null) {
            return API.ga.set(tracker, options);
          }
        }
      },
      setUser: function(user) {
        return API.all.set({
          userId: "USER_" + user.id
        });
      },
      setPage: function(page) {
        return API.all.set({
          page: page
        });
      },
      setAppVersion: function(version, name) {
        var key, options, results, tracker;
        options = {};
        if (name != null) {
          tracker = hAnalyticsTrackers[name];
          if ((tracker != null) && (tracker.versionDimension != null)) {
            options[tracker.versionDimension] = version;
            return API.ga.set(tracker, options);
          }
        } else {
          results = [];
          for (key in hAnalyticsTrackers) {
            if (!hasProp.call(hAnalyticsTrackers, key)) continue;
            tracker = hAnalyticsTrackers[key];
            if (tracker.versionDimension != null) {
              options[tracker.versionDimension] = version;
              results.push(API.ga.set(tracker, options));
            } else {
              results.push(void 0);
            }
          }
          return results;
        }
      },
      trackEvent: function(values, name) {
        var hit;
        hit = {
          hitType: 'event',
          eventValue: 1
        };
        $.extend(true, hit, values);
        if (name != null) {
          API.byName.send(name, hit);
        } else {
          API.all.send(hit);
        }
        if (!values.ignoreTiming) {
          API.trackTiming({
            timingCategory: 'Interactions',
            timingVar: 'UserInteractions',
            timingValue: hTimer.getTime('interactions')
          });
        }
        return hTimer.start('interactions');
      },
      trackView: function(values, name) {
        var hit;
        hit = {
          hitType: 'pageview'
        };
        $.extend(true, hit, values);
        if (name != null) {
          API.byName.send(name, hit);
        } else {
          API.all.send(hit);
        }
        API.trackTiming({
          timingCategory: 'Navigation',
          timingVar: 'UserNavigation',
          timingValue: hTimer.getTime('navigation')
        });
        return hTimer.start('navigation');
      },
      trackTiming: function(values) {
        var hit;
        hit = {
          hitType: 'timing'
        };
        $.extend(true, hit, values);
        return API.all.send(hit);
      }
    };
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vZHVsZXMvaEFuYWx5dGljcy9jb21wb25lbnRzL3NlcnZpY2UuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUEsTUFBQTs7RUFBQSxPQUFPLENBQUMsTUFBUixDQUFlLHFCQUFmLENBQ0EsQ0FBQyxPQURELENBQ1MsWUFEVCxFQUN1QixTQUFDLGtCQUFELEVBQXFCLE1BQXJCLEVBQTZCLE9BQTdCO0FBRXJCLFFBQUE7QUFBQSxXQUFPLEdBQUEsR0FBTTtNQUNYLEVBQUEsRUFDRTtRQUFBLElBQUEsRUFBTSxTQUFDLE9BQUQsRUFBVSxPQUFWO0FBQ0osY0FBQTtBQUFBO21CQUNFLE9BQU8sQ0FBQyxFQUFSLENBQWMsT0FBTyxDQUFDLElBQVQsR0FBYyxPQUEzQixFQUFtQyxPQUFuQyxFQURGO1dBQUEsY0FBQTtZQUVNO21CQUNKLE9BQU8sQ0FBQyxHQUFSLENBQVksd0JBQVosRUFBc0MsQ0FBdEMsRUFBeUMsT0FBekMsRUFIRjs7UUFESSxDQUFOO1FBTUEsR0FBQSxFQUFLLFNBQUMsT0FBRCxFQUFVLE9BQVY7QUFDSCxjQUFBO0FBQUE7bUJBQ0UsT0FBTyxDQUFDLEVBQVIsQ0FBYyxPQUFPLENBQUMsSUFBVCxHQUFjLE1BQTNCLEVBQWtDLE9BQWxDLEVBREY7V0FBQSxjQUFBO1lBRU07bUJBQ0osT0FBTyxDQUFDLEdBQVIsQ0FBWSx3QkFBWixFQUFzQyxDQUF0QyxFQUF5QyxPQUF6QyxFQUhGOztRQURHLENBTkw7T0FGUztNQWNYLEdBQUEsRUFDRTtRQUFBLElBQUEsRUFBTSxTQUFDLE9BQUQ7QUFDSixjQUFBO0FBQUE7ZUFBQSx5QkFBQTs7O3lCQUNFLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBUCxDQUFZLE9BQVosRUFBcUIsT0FBckI7QUFERjs7UUFESSxDQUFOO1FBSUEsR0FBQSxFQUFLLFNBQUMsT0FBRDtBQUNILGNBQUE7QUFBQTtlQUFBLHlCQUFBOzs7eUJBQ0UsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFQLENBQVcsT0FB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Y0FBQSxFQUFnQixZQURGO1VBRWQsU0FBQSxFQUFXLGdCQUZHO1VBR2QsV0FBQSxFQUFhLE1BQU0sQ0FBQyxPQUFQLENBQWUsWUFBZixDQUhDO1NBQWhCO2VBT0EsTUFBTSxDQUFDLEtBQVAsQ0FBYSxZQUFiO01BbEJTLENBM0VBO01BK0ZYLFdBQUEsRUFBYSxTQUFDLE1BQUQ7QUFDWCxZQUFBO1FBQUEsR0FBQSxHQUNFO1VBQUEsT0FBQSxFQUFTLFFBQVQ7O1FBRUYsQ0FBQyxDQUFDLE1BQUYsQ0FBUyxJQUFULEVBQWUsR0FBZixFQUFvQixNQUFwQjtlQUNBLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBUixDQUFhLEdBQWI7TUFMVyxDQS9GRjs7RUFGUSxDQUR2QjtBQUFBIiwiZmlsZSI6Im1vZHVsZXMvaEFuYWx5dGljcy9jb21wb25lbnRzL3NlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8iLCJzb3VyY2VzQ29udGVudCI6WyJhbmd1bGFyLm1vZHVsZSAnaEFuYWx5dGljcy5zZXJ2aWNlcydcbi5zZXJ2aWNlICdoR0FUcmFja2VyJywgKGhBbmFseXRpY3NUcmFja2VycywgaFRpbWVyLCAkd2luZG93KS0+XG5cbiAgcmV0dXJuIEFQSSA9IHtcbiAgICBnYTpcbiAgICAgIHNlbmQ6ICh0cmFja2VyLCBvcHRpb25zKS0+XG4gICAgICAgIHRyeVxuICAgICAgICAgICR3aW5kb3cuZ2EgXCIje3RyYWNrZXIubmFtZX0uc2VuZFwiLCBvcHRpb25zXG4gICAgICAgIGNhdGNoIGVcbiAgICAgICAgICBjb25zb2xlLmxvZyAnaEFuYWx5dGljcy50cmFjayBlcnJvcicsIGUsIHRyYWNrZXJcblxuICAgICAgc2V0OiAodHJhY2tlciwgb3B0aW9ucyktPlxuICAgICAgICB0cnlcbiAgICAgICAgICAkd2luZG93LmdhIFwiI3t0cmFja2VyLm5hbWV9LnNldFwiLCBvcHRpb25zXG4gICAgICAgIGNhdGNoIGVcbiAgICAgICAgICBjb25zb2xlLmxvZyAnaEFuYWx5dGljcy50cmFjayBlcnJvcicsIGUsIHRyYWNrZXJcblxuICAgIGFsbDpcbiAgICAgIHNlbmQ6IChvcHRpb25zKS0+XG4gICAgICAgIGZvciBvd24ga2V5LCB0cmFja2VyIG9mIGhBbmFseXRpY3NUcmFja2Vyc1xuICAgICAgICAgIEFQSS5nYS5zZW5kIHRyYWNrZXIsIG9wdGlvbnNcblxuICAgICAgc2V0OiAob3B0aW9ucyktPlxuICAgICAgICBmb3Igb3duIGtleSwgdHJhY2tlciBvZiBoQW5hbHl0aWNzVHJhY2tlcnNcbiAgICAgICAgICBBUEkuZ2Euc2V0IHRyYWNrZXIsIG9wdGlvbnNcblxuICAgIGJ5TmFtZTpcbiAgICAgIHNlbmQ6IChuYW1lLCBvcHRpb25zKS0+XG4gICAgICAgIHRyYWNrZXIgPSBoQW5hbHl0aWNzVHJhY2tlcnNbbmFtZV1cbiAgICAgICAgaWYgdHJhY2tlcj9cbiAgICAgICAgICBBUEkuZ2Euc2VuZCB0cmFja2VyLCBvcHRpb25zXG5cbiAgICAgIHNldDogKG5hbWUsIG9wdGlvbnMpLT5cbiAgICAgICAgdHJhY2tlciA9IGhBbmFseXRpY3NUcmFja2Vyc1tuYW1lXVxuICAgICAgICBpZiB0cmFja2VyP1xuICAgICAgICAgIEFQSS5nYS5zZXQgdHJhY2tlciwgb3B0aW9uc1xuXG4gICAgc2V0VXNlcjogKHVzZXIpLT5cbiAgICAgIEFQSS5hbGwuc2V0KHt1c2VySWQ6IFwiVVNFUl8je3VzZXIuaWR9XCJ9KVxuXG4gICAgc2V0UGFnZTogKHBhZ2UpLT5cbiAgICAgIEFQSS5hbGwuc2V0KHtwYWdlOiBwYWdlfSlcblxuICAgIHNldEFwcFZlcnNpb246ICh2ZXJzaW9uLCBuYW1lKS0+XG4gICAgICBvcHRpb25zID0ge31cbiAgICAgIGlmIG5hbWU/XG4gICAgICAgIHRyYWNrZXIgPSBoQW5hbHl0aWNzVHJhY2tlcnNbbmFtZV1cbiAgICAgICAgaWYgdHJhY2tlcj8gYW5kIHRyYWNrZXIudmVyc2lvbkRpbWVuc2lvbj9cbiAgICAgICAgICBvcHRpb25zW3RyYWNrZXIudmVyc2lvbkRpbWVuc2lvbl0gPSB2ZXJzaW9uXG4gICAgICAgICAgQVBJLmdhLnNldCh0cmFja2VyLCBvcHRpb25zKVxuICAgICAgZWxzZVxuICAgICAgICBmb3Igb3duIGtleSwgdHJhY2tlciBvZiBoQW5hbHl0aWNzVHJhY2tlcnNcbiAgICAgICAgICBpZiB0cmFja2VyLnZlcnNpb25EaW1lbnNpb24/XG4gICAgICAgICAgICBvcHRpb25zW3RyYWNrZXIudmVyc2lvbkRpbWVuc2lvbl0gPSB2ZXJzaW9uXG4gICAgICAgICAgICBBUEkuZ2Euc2V0KHRyYWNrZXIsIG9wdGlvbnMpXG5cbiAgICB0cmFja0V2ZW50OiAodmFsdWVzLCBuYW1lKS0+XG4gICAgICBoaXQgPVxuICAgICAgICBoaXRUeXBlOiAnZXZlbnQnXG4gICAgICAgIGV2ZW50VmFsdWU6IDFcblxuICAgICAgJC5leHRlbmQgdHJ1ZSwgaGl0LCB2YWx1ZXNcblxuICAgICAgaWYgbmFtZT9cbiAgICAgICAgQVBJLmJ5TmFtZS5zZW5kKG5hbWUsIGhpdClcbiAgICAgIGVsc2VcbiAgICAgICAgQVBJLmFsbC5zZW5kKGhpdClcblxuICAgICAgaWYgIXZhbHVlcy5pZ25vcmVUaW1pbmdcbiAgICAgICAgQVBJLnRyYWNrVGltaW5nIHtcbiAgICAgICAgICB0aW1pbmdDYXRlZ29yeTogJ0ludGVyYWN0aW9ucydcbiAgICAgICAgICB0aW1pbmdWYXI6ICdVc2VySW50ZXJhY3Rpb25zJ1xuICAgICAgICAgIHRpbWluZ1ZhbHVlOiBoVGltZXIuZ2V0VGltZSgnaW50ZXJhY3Rpb25zJylcbiAgICAgICAgfVxuXG4gICAgICAjIHJlc3RhcnQgaW50ZXJhY3Rpb25zIHRpbWVyXG4gICAgICBoVGltZXIuc3RhcnQoJ2ludGVyYWN0aW9ucycpXG5cbiAgICB0cmFja1ZpZXc6ICh2YWx1ZXMsIG5hbWUpLT5cbiAgICAgIGhpdCA9XG4gICAgICAgIGhpdFR5cGU6ICdwYWdldmlldydcblxuICAgICAgJC5leHRlbmQgdHJ1ZSwgaGl0LCB2YWx1ZXNcblxuICAgICAgaWYgbmFtZT9cbiAgICAgICAgQVBJLmJ5TmFtZS5zZW5kKG5hbWUsIGhpdClcbiAgICAgIGVsc2VcbiAgICAgICAgQVBJLmFsbC5zZW5kKGhpdClcblxuICAgICAgQVBJLnRyYWNrVGltaW5nIHtcbiAgICAgICAgdGltaW5nQ2F0ZWdvcnk6ICdOYXZpZ2F0aW9uJ1xuICAgICAgICB0aW1pbmdWYXI6ICdVc2VyTmF2aWdhdGlvbidcbiAgICAgICAgdGltaW5nVmFsdWU6IGhUaW1lci5nZXRUaW1lKCduYXZpZ2F0aW9uJylcbiAgICAgIH1cblxuICAgICAgIyByZXN0YXJ0IG5hdmlnYXRpb24gdGltZXJcbiAgICAgIGhUaW1lci5zdGFydCgnbmF2aWdhdGlvbicpXG5cbiAgICB0cmFja1RpbWluZzogKHZhbHVlcyktPlxuICAgICAgaGl0ID1cbiAgICAgICAgaGl0VHlwZTogJ3RpbWluZydcblxuICAgICAgJC5leHRlbmQgdHJ1ZSwgaGl0LCB2YWx1ZXNcbiAgICAgIEFQSS5hbGwuc2VuZCBoaXRcblxuXG4gIH1cblxuXG5cblxuXG5cblxuXG4iXX0=