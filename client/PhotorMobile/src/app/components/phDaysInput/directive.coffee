
# =============================================
# Module
# =============================================
angular.module 'Photor.directives'

  # =============================================
  # phDaysInput
  # =============================================
  .directive 'phDaysInput', () ->
    restrict: 'AE'
    replace : yes
    scope:
      days : '='
    controller: 'PhDaysInputController'
    template:"""
      <div class="daysInputWrapper">
        <label ng-repeat="day in days track by day.name | orderBy:'order'"
          class="dayWrapper"
          ng-class="{
            active: day.enabled
          }">
          <input type="checkbox"
            ng-model="day.enabled"
            class="dayCheck"
            ng-class="{
              active: day.enabled
            }">
          <span ng-bind="day.label" class="dayLabel" ></span>
        </label>
      </div>
    """