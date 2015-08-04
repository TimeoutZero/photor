(function() {
  angular.module("hQueue.configs").config(function($provide) {
    return $provide.decorator("$q", function($delegate) {
      var isPromiseLike, serial;
      isPromiseLike = function(obj) {
        return obj && angular.isFunction(obj.then);
      };

      /*
       * @description Execute a collection of tasks serially.  A task is a function that returns a promise
       *
       * @param {Array.<Function>|Object.<Function>} tasks An array or hash of tasks.  A tasks is a function
       *   that returns a promise.  You can also provide a collection of objects with a success tasks, failure task, and/or notify function
       * @returns {Promise} Returns a single promise that will be resolved or rejected when the last task
       *   has been resolved or rejected.
       */
      serial = function(tasks) {
        var error, prevPromise;
        prevPromise = null;
        error = new Error();
        angular.forEach(tasks, function(task, key) {
          var fail, nextPromise, nextPromiseError, nextPromiseSuccess, notify, success;
          success = task.success || task;
          fail = task.fail;
          notify = task.notify;
          nextPromise;
          if (!prevPromise) {
            nextPromise = success();
            if (!isPromiseLike(nextPromise)) {
              error.message = "Task " + key + " did not return a promise.";
              throw error;
            }
          } else {
            nextPromiseSuccess = function(data) {
              var ret;
              if (!success) {
                return data;
              }
              ret = success(data);
              if (!isPromiseLike(ret)) {
                error.message = "Task " + key + " did not return a promise.";
                throw error;
              }
              return ret;
            };
            nextPromiseError = function(reason) {
              var ret;
              if (!fail) {
                return $delegate.reject(reason);
              }
              ret = fail(reason);
              if (!isPromiseLike(ret)) {
                error.message = "Fail for task " + key + " did not return a promise.";
                throw error;
              }
              return ret;
            };
            nextPromise = prevPromise.then(nextPromiseSuccess, nextPromiseError, notify);
          }
          prevPromise = nextPromise;
        });
        return prevPromise || $delegate.when();
      };
      $delegate.serial = serial;
      return $delegate;
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vZHVsZXMvcmVkc3BhcmtVdGlscy9jb21wb25lbnRzL2hRdWV1ZS9zY3JpcHRzL3NlcmlhbC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBR0E7RUFBQSxPQUFPLENBQUMsTUFBUixDQUFlLGdCQUFmLENBS0EsQ0FBQyxNQUxELENBS1EsU0FBQyxRQUFEO1dBQ04sUUFBUSxDQUFDLFNBQVQsQ0FBbUIsSUFBbkIsRUFBeUIsU0FBQyxTQUFEO0FBSXZCLFVBQUE7TUFBQSxhQUFBLEdBQWdCLFNBQUMsR0FBRDtBQUFTLGVBQU8sR0FBQSxJQUFPLE9BQU8sQ0FBQyxVQUFSLENBQW1CLEdBQUcsQ0FBQyxJQUF2QjtNQUF2Qjs7QUFFaEI7Ozs7Ozs7O01BUUEsTUFBQSxHQUFTLFNBQUMsS0FBRDtBQUVQLFlBQUE7UUFBQSxXQUFBLEdBQWM7UUFDZCxLQUFBLEdBQVksSUFBQSxLQUFBLENBQUE7UUFFWixPQUFPLENBQUMsT0FBUixDQUFnQixLQUFoQixFQUF1QixTQUFDLElBQUQsRUFBTyxHQUFQO0FBQ3JCLGNBQUE7VUFBQSxPQUFBLEdBQVUsSUFBSSxDQUFDLE9BQUwsSUFBZ0I7VUFDMUIsSUFBQSxHQUFPLElBQUksQ0FBQztVQUNaLE1BQUEsR0FBUyxJQUFJLENBQUM7VUFDZDtVQUdBLElBQUcsQ0FBQyxXQUFKO1lBQ0UsV0FBQSxHQUFjLE9BQUEsQ0FBQTtZQUNkLElBQUcsQ0FBQyxhQUFBLENBQWMsV0FBZCxDQUFKO2NBQ0UsS0FBSyxDQUFDLE9BQU4sR0FBZ0IsT0FBQSxHQUFVLEdBQVYsR0FBZ0I7QUFDaEMsb0JBQU0sTUFGUjthQUZGO1dBQUEsTUFBQTtZQU9FLGtCQUFBLEdBQXFCLFNBQUMsSUFBRDtBQUNuQixrQkFBQTtjQUFBLElBQWUsQ0FBQyxPQUFoQjtBQUFBLHVCQUFPLEtBQVA7O2NBQ0EsR0FBQSxHQUFNLE9BQUEsQ0FBUSxJQUFSO2NBQ04sSUFBRyxDQUFDLGFBQUEsQ0FBYyxHQUFkLENBQUo7Z0JBQ0UsS0FBSyxDQUFDLE9BQU4sR0FBZ0IsT0FBQSxHQUFVLEdBQVYsR0FBZ0I7QUFDaEMsc0JBQU0sTUFGUjs7QUFJQSxxQkFBTztZQVBZO1lBU3JCLGdCQUFBLEdBQW1CLFNBQUMsTUFBRDtBQUNqQixrQkFBQTtjQUFBLElBQW1DLENBQUMsSUFBcEM7QUFBQSx1QkFBTyxTQUFTLENBQUMsTUFBVixDQUFpQixNQUFqQixFQUFQOztjQUNBLEdBQUEsR0FBTSxJQUFBLENBQUssTUFBTDtjQUNOLElBQUcsQ0FBQyxhQUFBLENBQWMsR0FBZCxDQUFKO2dCQUNFLEtBQUssQ0FBQyxPQUFOLEdBQWdCLGdCQUFBLEdBQW1CLEdBQW5CLEdBQXlCO0FBQ3pDLHNCQUFNLE1BRlI7O0FBSUEscUJBQU87WUFQVTtZQVVuQixXQUFBLEdBQWMsV0FBVyxDQUFDLElBQVosQ0FBaUIsa0JBQWpCLEVBQXFDLGdCQUFyQyxFQUF1RCxNQUF2RCxFQTFCaEI7O1VBNEJBLFdBQUEsR0FBYztRQW5DTyxDQUF2QjtBQXNDQSxlQUFPLFdBQUEsSUFBZSxTQUFTLENBQUMsSUFBVixDQUFBO01BM0NmO01BNkNULFNBQVMsQ0FBQyxNQUFWLEdBQW1CO0FBQ25CLGFBQU87SUE1RGdCLENBQXpCO0VBRE0sQ0FMUjtBQUFBIiwiZmlsZSI6Im1vZHVsZXMvcmVkc3BhcmtVdGlscy9jb21wb25lbnRzL2hRdWV1ZS9zY3JpcHRzL3NlcmlhbC5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyIsInNvdXJjZXNDb250ZW50IjpbIiMgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4jIE1vZHVsZXNcbiMgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5hbmd1bGFyLm1vZHVsZSBcImhRdWV1ZS5jb25maWdzXCJcblxuIyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiMgJHEuc2VyaWFsICgkcSBkZWNvcmF0b3IpXG4jID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuLmNvbmZpZyAoJHByb3ZpZGUpLT5cbiAgJHByb3ZpZGUuZGVjb3JhdG9yIFwiJHFcIiwgKCRkZWxlZ2F0ZSktPlxuXG4gICAgIyBjb2RlIGJsb2NrIGZyb20gaHR0cDovL3d3dy5jb2RlZHVja3kub3JnL3Etc2VyaWFsL1xuICAgICNIZWxwZXIgbWV0aG9kIGNvcGllZCBmcm9tIHEuanMuXG4gICAgaXNQcm9taXNlTGlrZSA9IChvYmopIC0+IHJldHVybiBvYmogJiYgYW5ndWxhci5pc0Z1bmN0aW9uKG9iai50aGVuKVxuXG4gICAgIyMjXG4gICAgIyBAZGVzY3JpcHRpb24gRXhlY3V0ZSBhIGNvbGxlY3Rpb24gb2YgdGFza3Mgc2VyaWFsbHkuICBBIHRhc2sgaXMgYSBmdW5jdGlvbiB0aGF0IHJldHVybnMgYSBwcm9taXNlXG4gICAgI1xuICAgICMgQHBhcmFtIHtBcnJheS48RnVuY3Rpb24+fE9iamVjdC48RnVuY3Rpb24+fSB0YXNrcyBBbiBhcnJheSBvciBoYXNoIG9mIHRhc2tzLiAgQSB0YXNrcyBpcyBhIGZ1bmN0aW9uXG4gICAgIyAgIHRoYXQgcmV0dXJucyBhIHByb21pc2UuICBZb3UgY2FuIGFsc28gcHJvdmlkZSBhIGNvbGxlY3Rpb24gb2Ygb2JqZWN0cyB3aXRoIGEgc3VjY2VzcyB0YXNrcywgZmFpbHVyZSB0YXNrLCBhbmQvb3Igbm90aWZ5IGZ1bmN0aW9uXG4gICAgIyBAcmV0dXJucyB7UHJvbWlzZX0gUmV0dXJucyBhIHNpbmdsZSBwcm9taXNlIHRoYXQgd2lsbCBiZSByZXNvbHZlZCBvciByZWplY3RlZCB3aGVuIHRoZSBsYXN0IHRhc2tcbiAgICAjICAgaGFzIGJlZW4gcmVzb2x2ZWQgb3IgcmVqZWN0ZWQuXG4gICAgIyMjXG4gICAgc2VyaWFsID0gKHRhc2tzKS0+XG4gICAgICAjRmFrZSBhIFwicHJldmlvdXMgdGFza1wiIGZvciBvdXIgaW5pdGlhbCBpdGVyYXRpb25cbiAgICAgIHByZXZQcm9taXNlID0gbnVsbFxuICAgICAgZXJyb3IgPSBuZXcgRXJyb3IoKVxuXG4gICAgICBhbmd1bGFyLmZvckVhY2ggdGFza3MsICh0YXNrLCBrZXkpLT5cbiAgICAgICAgc3VjY2VzcyA9IHRhc2suc3VjY2VzcyB8fCB0YXNrXG4gICAgICAgIGZhaWwgPSB0YXNrLmZhaWxcbiAgICAgICAgbm90aWZ5ID0gdGFzay5ub3RpZnlcbiAgICAgICAgbmV4dFByb21pc2VcblxuICAgICAgICAjRmlyc3QgdGFza1xuICAgICAgICBpZiAhcHJldlByb21pc2VcbiAgICAgICAgICBuZXh0UHJvbWlzZSA9IHN1Y2Nlc3MoKVxuICAgICAgICAgIGlmICFpc1Byb21pc2VMaWtlKG5leHRQcm9taXNlKVxuICAgICAgICAgICAgZXJyb3IubWVzc2FnZSA9IFwiVGFzayBcIiArIGtleSArIFwiIGRpZCBub3QgcmV0dXJuIGEgcHJvbWlzZS5cIlxuICAgICAgICAgICAgdGhyb3cgZXJyb3JcblxuICAgICAgICBlbHNlXG4gICAgICAgICAgbmV4dFByb21pc2VTdWNjZXNzID0gKGRhdGEpLT5cbiAgICAgICAgICAgIHJldHVybiBkYXRhIGlmICFzdWNjZXNzXG4gICAgICAgICAgICByZXQgPSBzdWNjZXNzKGRhdGEpXG4gICAgICAgICAgICBpZiAhaXNQcm9taXNlTGlrZShyZXQpXG4gICAgICAgICAgICAgIGVycm9yLm1lc3NhZ2UgPSBcIlRhc2sgXCIgKyBrZXkgKyBcIiBkaWQgbm90IHJldHVybiBhIHByb21pc2UuXCJcbiAgICAgICAgICAgICAgdGhyb3cgZXJyb3JcblxuICAgICAgICAgICAgcmV0dXJuIHJldFxuXG4gICAgICAgICAgbmV4dFByb21pc2VFcnJvciA9IChyZWFzb24pLT4gI2ZhaWx1cmVcbiAgICAgICAgICAgIHJldHVybiAkZGVsZWdhdGUucmVqZWN0KHJlYXNvbikgaWYgIWZhaWxcbiAgICAgICAgICAgIHJldCA9IGZhaWwocmVhc29uKVxuICAgICAgICAgICAgaWYgIWlzUHJvbWlzZUxpa2UocmV0KVxuICAgICAgICAgICAgICBlcnJvci5tZXNzYWdlID0gXCJGYWlsIGZvciB0YXNrIFwiICsga2V5ICsgXCIgZGlkIG5vdCByZXR1cm4gYSBwcm9taXNlLlwiXG4gICAgICAgICAgICAgIHRocm93IGVycm9yXG5cbiAgICAgICAgICAgIHJldHVybiByZXRcblxuICAgICAgICAgICNXYWl0IHVudGlsIHRoZSBwcmV2aW91cyBwcm9taXNlIGhhcyByZXNvbHZlZCBvciByZWplY3RlZCB0byBleGVjdXRlIHRoZSBuZXh0IHRhc2tcbiAgICAgICAgICBuZXh0UHJvbWlzZSA9IHByZXZQcm9taXNlLnRoZW4gbmV4dFByb21pc2VTdWNjZXNzLCBuZXh0UHJvbWlzZUVycm9yLCBub3RpZnlcblxuICAgICAgICBwcmV2UHJvbWlzZSA9IG5leHRQcm9taXNlXG4gICAgICAgIHJldHVyblxuXG4gICAgICByZXR1cm4gcHJldlByb21pc2UgfHwgJGRlbGVnYXRlLndoZW4oKVxuXG4gICAgJGRlbGVnYXRlLnNlcmlhbCA9IHNlcmlhbFxuICAgIHJldHVybiAkZGVsZWdhdGUiXX0=