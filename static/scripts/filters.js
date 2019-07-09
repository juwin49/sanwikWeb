/**
 * Created by Administrator on 14-4-26.
 */

angular.module('sanwik.filters', []).
    filter('offset', function() {
        return function(input, start) {
            start = parseInt(start, 10);
            return input.slice(start); };
    });