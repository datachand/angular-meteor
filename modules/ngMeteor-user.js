var ngMeteorUser = angular.module('ngMeteor.user', []);

ngMeteorUser.factory("$user", [function() {
  return {
    bind: function(scope, property) {
      Deps.autorun(function(self) {
        scope[property] = Meteor.user();
        if (!scope.$$phase) scope.$apply();
      });
    }
  }
}]);
