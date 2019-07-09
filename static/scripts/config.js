angular.module('HashBangURLs',[]).config(['$locationProvider', function($location) {
    $location.hashPrefix('!');
}]);

angular.module('HTML5ModeURLs', []).config(['$routeProvider', function($route){
    $route.html5Mode(true);
}]);

var app = angular.module('sanwik',[
        'HashBangURLs',
	'sanwik.services',
	'sanwik.controllers',
	'sanwik.directives',
    'sanwik.filters'
]);

app.config(function($sceProvider){

	var _ie = function(){
	    var b = document.createElement('b');
	    b.innerHTML = '<!--[if IE]><i></i><![endif]-->';
	    return b.getElementsByTagName('i').length === 1;
	};

	if ( _ie )
	{ 
	   // $sce 在ie(version < 8) quirks mode 不支持， 当ie(version < 8) 处于quirks mode时关闭此功能	  
	   //  定义文档兼容性  http://msdn.microsoft.com/zh-cn/library/cc288325(v=vs.85).aspx
	   if (!document.documentMode || document.documentMode < 8 ) // IE8
	   {
	      $sceProvider.enabled(false);   //  ＊＊＊关闭此功能会变得易受攻击＊＊＊
	   }
	}
});

app.config(['$routeProvider','$locationProvider', function($routeProvider,$locationProvider) {
	$routeProvider.
		when('/', {
			templateUrl: '/static/views/home.html',
			controller: 'ViewHome'
		}).

		when('/about/4', {
            controller: 'ViewNews',
            resolve: {
                news_list:  function(MultiNewsListLoader) {
                    return MultiNewsListLoader();
                }
            },
            templateUrl: '/static/views/news_list.html'
        }).
        when('/about/4/:newsId', {
            controller: 'ViewNewsDetail',
            resolve: {
                news:  function(NewsListLoader) {
                    return NewsListLoader();
                }
            },
            templateUrl: '/static/views/news_detail.html'
        }).
        when('/about/5', {
            controller: 'Activies',
            resolve: {
                activities_list:  function(MultiActivitesListLoader) {
                    return MultiActivitesListLoader();
                }
            },
            templateUrl: '/static/views/activities_list.html'
        }).
        when('/about/5/:activityId', {
            controller: 'ActiviesDetail',
            resolve: {
                activities:  function(ActivitesListLoader) {
                    return ActivitesListLoader();
                }
            },
            templateUrl: '/static/views/activities_detail.html'
        }).
		when('/about/:descriptionId', {
			controller: 'ViewAboutsanwik',
			resolve: {
				company_description: ["CompanyDescriptionLoader", function(CompanyDescriptionLoader) {
					return CompanyDescriptionLoader();
				}]
			},
            templateUrl:'/static/views/about_index.html'
          
		}).
        when('/about/2/2',{
            controller:'ViewAboutpatent',
            resolve:{patents:function(MultiPatentListLoader){
                return MultiPatentListLoader();}
            },
            templateUrl:'/static/views/about_patent.html'
        }).

		when('/products/:categoryId', {
			controller: 'ViewProducts',
			resolve: {
				products_list:  function(ProductsListLoader) {
					return ProductsListLoader();
				}

			},
			templateUrl: '/static/views/products_index.html'
		}).
		when('/products/:categoryId/:productId', {
			controller: 'ViewProductsDetail',
			resolve: {
				products_detail: function(ProductsDetailLoader) {
					return ProductsDetailLoader();
				}
			},
			templateUrl: '/static/views/products_detail.html'
		}).
		when('/supports/:supportId', {
			controller: 'ViewSupports',
			resolve: {
				supports_list:  function(SupportsLoader) {
					return SupportsLoader();
				}
			},
			templateUrl: '/static/views/supports_index.html'
		}).

		when('/joinus/:joinusId', {
			controller: 'ViewJoinus',
			resolve: {
				joinus_list: function(JoinusLoader) {
					return JoinusLoader();
				}
			},
			templateUrl: '/static/views/joinus_index.html'
		}).

		when('/contact/:contactId', {
			controller: 'ViewContact',
			resolve: {
				contact_list:  function(ContactLoader) {
					return ContactLoader();
				}
			},
			templateUrl: '/static/views/contact_index.html'
		}).

		when('/solutions/:solutionsId', {
			controller: 'ViewSolutions',
			resolve: {
				solutions_list: function(SolutionsLoader) {
					return SolutionsLoader();
				}
			},
			templateUrl: '/static/views/solutions_list.html'
		}).otherwise({redirectTo: '/'});
	$locationProvider.html5Mode(true);
}]).run(function ($rootScope, $location) {

	$rootScope.SecondaryNav = null;
	$rootScope.SecondaryNavTemplate = "/static/views/secondary_nav.html";
	$rootScope.$watch('$rootScope.SecondaryNav', 1);

	var page ={
		'home': '0',
		'about': '1',
		'products': '2',
		'solutions': '3',
		'supports': '4',
		'joinus': '5',
		'contact': '6'
	};
	var page_index = 0;

	$rootScope.$on('$locationChangeSuccess', function() {

		if($location.url().split('/')[1]=='') {
			page_index = 0;
		}
		else {
			page_index=page[$location.url().split('/')[1]];
		}

		var menu_wrapper = $('#page-menu');
		menu_wrapper.children('.first-menu').removeClass('active');
		menu_wrapper.children('.first-menu').eq(page_index).addClass('active');

		
	});

});;
