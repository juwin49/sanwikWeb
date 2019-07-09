var services = angular.module('sanwik.services',
	['ngResource','ngRoute']);

// Test IE version

	services.factory('IeVersion',function(){
		var _ie = function(version){
		    var b = document.createElement('b')
		    b.innerHTML = '<!--[if IE ' + version + ']><i></i><![endif]-->'
		    return b.getElementsByTagName('i').length === 1;
		};

		var _version = 0;


		if( _ie(6) ) {
			_version = 6;
		}
		else if( _ie(7) ) {
			_version = 7;
		}
		else if( _ie(8) ) {
			_version = 8;
		}
		else if( _ie(9) ) {
			_version = 9;
		}
		else if( _ie(10) ) {
			_version = 10;
		}
		else if( _ie(11) ) {
			_version = 11;
		}

		return _version;
	});


// Menu Services
	services.factory('Menu',
		function($resource) {
			return $resource('/api/menus/:id', {id: '@id'});
		}
	);

	services.factory('MultiMenuLoader',
		function(Menu, $q) {
			return function() {
				var delay = $q.defer();
				Menu.query(
					function(menus) {
						delay.resolve(menus);
					},
					function() {
						delay.reject('Unable to fetch menus');
					} 
				);
				return delay.promise;
			};
		}
	);

	services.factory('MenuLoader',
		function(Menu, $route, $q) {
			return function() {
				var delay = $q.defer();
				Menu.get({id: $route.current.params.menuId},
					function(menu) {
						delay.resolve(menu);
					},
					function() {
						delay.reject('Unable to fetch menu ' + $route.current.params.menuId);
					}
				);
				return delay.promise;
			};
		}
	);




//Home Product_Tips services
services.factory('ProductTips',
    function($resource) {
        return $resource('/api/home_product_background/:id',{ id: '@id'});
    }
);


services.factory('MultiProductTipsLoader',
    function(ProductTips, $q) {
        return function() {
            var delay = $q.defer();
            ProductTips.query(
                function(contents) {
                    delay.resolve(contents);
                },
                function() {
                    delay.reject('Unable to fetch tips information');
                }
            );
            return delay.promise;
        };
    }
);


services.factory('ProductTipsLoader',
    function(ProductTips, $route, $q) {
        return function() {
            var delay = $q.defer();
            ProductTips.get({id: $route.current.params.categoryId},
                function(information) {
                    delay.resolve(information);
                },
                function() {
                    delay.reject('Unable to fetch description ' + $route.current.params.categoryId);
                }
            );
            return delay.promise;
        };
    }
);


// About Page services
	services.factory('CompanyDescription',
		function($resource) {
			return $resource('/api/description/:id', {id: '@id'});
		}
	);


	services.factory('MultiCompanyDescriptiontLoader',
		function(CompanyDescription, $q) {
			return function() {
				var delay = $q.defer();
				CompanyDescription.query(
					function(descriptions) {
						delay.resolve(descriptions);
					},
					function() {
						delay.reject('Unable to fetch company descriptions');
					}
				);
				return delay.promise;
			};
		}
	);

	services.factory('CompanyDescriptionLoader',
		function(CompanyDescription, $route, $q) {
			return function() {
				var delay = $q.defer();
                var n = parseInt($route.current.params.descriptionId);
   				CompanyDescription.get({id: n},
					function(description) {
						delay.resolve(description);
					},
					function() {
						delay.reject('Unable to fetch description ' + $route.current.params.descriptionId);
					}
				);
				return delay.promise;
			};
		}
	);



// News Page services
	services.factory('NewsList',
		function($resource) {
			return $resource('/api/news_resource/:id', {id: '@id'});
		}
	);

	services.factory('MultiNewsListLoader',
		function(NewsList, $q) {
			return function() {
				var delay = $q.defer();
				NewsList.query(
					function(news) {
						delay.resolve(news);
					},
					function() {
						delay.reject('Unable to fetch news list');
					}
				);
				return delay.promise;
			};
		}
	);


	services.factory('NewsListLoader',
		function(NewsList, $route, $q) {
			return function() {
				var delay = $q.defer();
				NewsList.get({id:$route.current.params.newsId},

					function(news) {
						delay.resolve(news);
					},
					function() {
						delay.reject('Unable to fetch news ' + $route.current.params.newsId);
					}
				);
				return delay.promise;
			};
		}
	);


// Activities Page services
services.factory('Activities',
    function($resource) {
        return $resource('/api/activites_resource/:id', {id: '@id'});
    }
);

services.factory('MultiActivitesListLoader',
    function(Activities, $q) {
        return function() {
            var delay = $q.defer();
            Activities.query(
                function(activities) {
                    delay.resolve(activities);
                },
                function() {
                    delay.reject('Unable to fetch news list');
                }
            );
            return delay.promise;
        };
    }
);


services.factory('ActivitesListLoader',
    function(Activities, $route, $q) {
        return function() {
            var delay = $q.defer();
            Activities.get({id:$route.current.params.activityId},

                function(activities) {
                    delay.resolve(activities);
                },
                function() {
                    delay.reject('Unable to fetch news ' + $route.current.params.activityId);
                }
            );
            return delay.promise;
        };
    }
);

//Patent Page services
   services.factory('PatentList',function($resource){
           return $resource('/api/patent_list/:id',{id:'@id'});
       }

   );
   services.factory('MultiPatentListLoader',function(PatentList,$q){
       return function(){
           var delay = $q.defer();
           PatentList.query(
               function(patent){
                   delay.resolve(patent);
               },
               function(){
                   delay.reject('Unable to fetch products list');
               }
           )
           return delay.promise;
       }
   })

   services.factory('PatentListLoader',function(PatentList,$route,$q){
       return function(){
           var delay = $q.defer();
           PatentList.get({id:$route.current.params.patentId},
               function(patent){
                 delay.resolve(patent);
               },
               function(){
                   delay.reject('Unable to fetch news'+ $route.current.params.patentId);
               }
           );
           return delay.promise;
       }
   })



// Products List services
	services.factory('ProductsList',
		function($resource) {
			return $resource('/api/products_list/:id', {id: '@id'});
		}
	);

	services.factory('MultiProductsListLoader',
		function(ProductsList, $q) {
			return function() {
				var delay = $q.defer();
				ProductsList.query(
					function(products) {
						delay.resolve(products);
					},
					function() {
						delay.reject('Unable to fetch products list');
					}
				);
				return delay.promise;
			};
		}
	);

	services.factory('ProductsListLoader',
		function(ProductsList, $route, $q) {
			return function() {
				var delay = $q.defer();
				ProductsList.get({id: $route.current.params.categoryId},
					function(product) {
						delay.resolve(product);
					},
					function() {
						delay.reject('Unable to fetch product ' + $route.current.params.categoryId);
					}
				);
				return delay.promise;
			};
		}
	);




// Products Detail services
	services.factory('ProductsDetail',
		function($resource) {
			return $resource('/api/products_list/:categoryId/:productId', {categoryId: '@categoryId', productId: '@productId'});
		}
	);

	services.factory('ProductsDetailLoader',
		function(ProductsDetail, $route, $q) {
			return function() {
				var delay = $q.defer();
				ProductsDetail.get({categoryId: $route.current.params.categoryId, productId: $route.current.params.productId},
					function(product) {
						delay.resolve(product);
					},
					function() {
						delay.reject('Unable to fetch product ' + $route.current.params.categoryId);
					}
				);
				return delay.promise;
			}
		}
	);

//Supports Page Services
	services.factory('Supports',
		function($resource) {
			return $resource('/api/supports_resource/:id', {id: '@id'});
		}
	);

	services.factory('MultiSupportsLoader',
		function(Supports, $q) {
			return function() {
				var delay = $q.defer();

				Supports.query(
					function(supports) {
						delay.resolve(supports);
					},
					function() {
						delay.reject('Unable to fetch supports resource');
					}
				);
				return delay.promise;
			};
		}
	);

	services.factory('SupportsLoader',
		function(Supports, $route, $q) {
			return function() {
				var delay = $q.defer();

				Supports.get({id: $route.current.params.supportId},
					function(support) {
						delay.resolve(support);
					},
					function() {
						delay.reject('Unable to fetch support ' + $route.current.params.supportId);
					}
				);
				return delay.promise;
			};
		}
	);

//Join Us Page Services
	services.factory('Joinus',
		function($resource) {
			 return $resource('/api/joinus_resource/:id', {id: '@id'});
		}
	);

	services.factory('MultiJoinusLoader',
		function(Joinus, $q) {
			return function() {
				var delay = $q.defer();

				Joinus.query(
					function(joinus) {
						delay.resolve(joinus);
					},
					function() {
						delay.reject('Unable to fetch joinus resource');
					}
				);
				return delay.promise;
			};
		}
	);

	services.factory('JoinusLoader',
		function(Joinus, $route, $q) {
			return function() {
				var delay = $q.defer();

				Joinus.get({id: $route.current.params.joinusId},
					function(joinus) {
						delay.resolve(joinus);
					},
					function() {
						delay.reject('Unable to fetch joinus ' + $route.current.params.joinusId);
					}
				);
				return delay.promise;
			};
		}
	);

//Contact Page Services
	services.factory('Contact',
		function($resource) {
			return $resource('/api/contact_resource/:id', {id: '@id'});
		}
	);

	services.factory('MultiContactLoader',
		function(Contact, $q) {
			return function() {
				var delay = $q.defer();

				Contact.query(
					function(contact) {
						delay.resolve(contact);
					},
					function() {
						delay.reject('Unable to fetch contact resource');
					}
				);
				return delay.promise;
			};
		}
	);

	services.factory('ContactLoader',
		function(Contact, $route, $q) {
			return function() {
				var delay = $q.defer();

				Contact.get({id: $route.current.params.contactId},
					function(contact) {
						delay.resolve(contact);
					},
					function() {
						delay.reject('Unable to fetch contact ' + $route.current.params.contactId);
					}
				);
				return delay.promise;
			};
		}
	);

// Solutions Page Services
	services.factory('Solutions',
		function($resource) {
			return $resource('/api/solutions_resource/:id', {id: '@id'});
		}
	);

	services.factory('MultiSolutionsLoader',
		function(Solutions, $q) {
			return function() {
				var delay = $q.defer();

				Solutions.query(
					function(solutions) {
						delay.resolve(solutions);
					},
					function() {
						delay.reject('Unable to fetch solutions resource');
					}
				);
				return delay.promise;
			};
		}
	);

	services.factory('SolutionsLoader',
		function(Solutions, $route, $q) {
			return function() {
				var delay = $q.defer();

				Solutions.get({id: $route.current.params.solutionsId},
					function(solution) {
						delay.resolve(solution);
					},
					function() {
						delay.reject('Unable to fetch solution ' + $route.current.params.solutionsId);
					}
				);
				return delay.promise;
			};
		}
	);