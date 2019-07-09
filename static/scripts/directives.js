var directives = angular.module('sanwik.directives', []);
    directives.directive('ngClassFix', function($parse){
        return {
            restrict:'A',
            //scope: true, 
            link: function(scope, element, attrs){
                var str = attrs["ngClass"];
               // str = eval(str.call(scope));
                scope.$parent.$watch(function(){
                    var output = null;
                    //var getter = $parse('user.name');
                    //var context = {user:{name:'angular'}};
                    //var locals = {user:{name:'local'}};
                   // alert( $parse(str)(scope).active );

                    //output = $parse(str)(scope);
                    return output;
                },function(newValue, oldValue){
                    //alert(newValue);
                    angular.element(element).removeClass(oldValue).addClass(newValue).addClass('ng-scope');
                });
            }
        }
    }); 
