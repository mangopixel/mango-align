(function () {

    angular.module( 'mangoAlign', [] )
        .directive( 'mangoAlign', mangoAlign );

    mangoAlign.$inject = ['$timeout'];

    function mangoAlign( $timeout ) {
        return {
            scope: {
                targetSelector: '@mangoAlign',
                origin: '@mangoAlignOrigin'
            },
            link: function (scope, el, attrs) {

                var target, win;

                // Init
                // ----

                $timeout( function () {
                    target = angular.element( document.querySelector(scope.targetSelector) );
                    win = angular.element(window);

                    if ( ! target.length )
                        return console.warn( 'mangoAlign: Could not find target element with selector:', scope.targetSelector );

                    win.on( 'resize scroll', applyStyling );
                    applyStyling()
                    target = angular.element( document.querySelector( scope.targetSelector ) );
                } );

                // Implementation
                // --------------

                /**
                 * Style aligned element
                 */
                function applyStyling() {
                    el.css({
                        position: 'fixed',
                        width: calcWidth(),
                        top: calcTop(),
                        left: calcLeft(),
                        zIndex: 999999,
                    });
                }

                function rect( el ) {
                    return el[0].getBoundingClientRect();
                }

                function calcWidth() {
                    if ( ! scope.origin || scope.origin === 'top' || scope.origin === 'bottom' )
                        return target[0].offsetWidth + 'px'
                }

                function calcTop() {
                    var result = rect( target ).top;

                    if ( scope.origin === 'bottom' || ! scope.origin )
                        result += rect( target ).height;

                    if ( scope.origin === 'top' )
                        result -= rect( el ).height;

                    return result + 'px';
                }

                function calcLeft() {
                    var result = rect( target ).left;

                    if ( scope.origin === 'left' )
                        result -= rect( el ).width;

                    if ( scope.origin === 'right' )
                        result += rect( target ).width

                    return result + 'px';
                }
            }
        };
    }
})();
