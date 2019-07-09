var app = angular.module('sanwik.controllers',
    ['sanwik.services', 'ngSanitize']);

app.controller('ViewHome',
    function ($scope, $http, $rootScope, IeVersion,MultiNewsListLoader,MultiProductTipsLoader) {
        $rootScope.SecondaryNav = null;


            var banner_wrapper = $('#banner');
            var slide_btn_wrapper = $('#slide-btn');
            var banner_collection = $('#banner .banner');
            var slide_btn_collection = slide_btn_wrapper.find('li');
            var len = banner_collection.length;
            var index = 0;
            var _interval = null;
            var _add_reset = null;
            var _remove_reset = null;


            $scope.change_slide = function (index) {
                clearTimeout(_add_reset);
                clearTimeout(_remove_reset);


                banner_collection.find('span').attr('style', '');
                clearInterval(_interval);

                go(index + 1);
                _interval = setInterval(go, 10000);
            };

            var banner_data = [

                {
                    'word': {
                        'delay': '0',
                        'property': 'right',
                        'property_offset': '100px'
                    }
                },
                {
                    'word': {
                        'delay': '0',
                        'property': 'left',
                        'property_offset': '140px'
                    }
                },
                {

                    'word': {
                        'delay': '0',
                        'property': 'right',
                        'property_offset': '100px'
                    }
                },
                {

                    'word': {
                        'delay': '0',
                        'property': 'top',
                        'property_offset': '125px'
                    }
                }
            ];


            var banner_data_reset = [

                {

                    'word': {
                        'delay': '0',
                        'property': 'right',
                        'property_offset': '-1000px'
                    }
                },
                {

                    'word': {
                        'delay': '0',
                        'property': 'left',
                        'property_offset': '-1000px'
                    }
                },
                {

                    'word': {
                        'delay': '0',
                        'property': 'right',
                        'property_offset': '-1000px'
                    }
                },
                {

                    'word': {
                        'delay': '0',
                        'property': 'top',
                        'property_offset': '-1000px'
                    }
                }

            ];


            var execute = function (element, delay_time, property, property_offset) {
                if (property == 'top') {
                    element.delay(delay_time).animate({top: property_offset}, 1000);
                }
                else if (property == 'bottom') {
                    element.delay(delay_time).animate({bottom: property_offset}, 1000);
                }
                else if (property == 'left') {
                    element.delay(delay_time).animate({left: property_offset}, 1000);
                }
                else if (property == 'right') {
                    element.delay(delay_time).animate({right: property_offset}, 1000);
                }
            };

            var go = function (start) {
                if (start) {
                    index = start - 1;
                }
                else {
                    index = (index >= len - 1 ) ? 0 : (++index);
                }

                slide_btn_collection.removeClass('active');
                slide_btn_collection.eq(index).addClass('active');
                banner_collection.css({display: 'none'});
                banner_collection.eq(index).fadeIn("slow");
                //banner_collection.eq(index).css({display: 'block'});


                _add_reset = setTimeout(function () {

                  //  execute(banner_collection.eq(index).find('.img'), banner_data[index].img.delay, banner_data[index].img.property, banner_data[index].img.property_offset);
                    execute(banner_collection.eq(index).find('.word'), banner_data[index].word.delay, banner_data[index].word.property, banner_data[index].word.property_offset);

                }, 1000);


                _remove_reset = setTimeout(function () {
                    banner_collection.eq(index).fadeOut("slow");

                  //  execute(banner_collection.eq(index).find('.img'), banner_data_reset[index].img.delay, banner_data_reset[index].img.property, banner_data_reset[index].img.property_offset);
                    execute(banner_collection.eq(index).find('.word'), banner_data_reset[index].word.delay, banner_data_reset[index].word.property, banner_data_reset[index].word.property_offset);
                    /*
                     banner_data[index].img.property_offset = '-1000px';
                     banner_data[index].word.property_offset = '-1000px';
                     */


                }, 8000);


            };

            go(1);

            _interval = setInterval(go, 10000);


        MultiNewsListLoader().then(
            function (newstitle) {
                $scope.first_title = newstitle[0].first_title;
                $scope.second_title = newstitle[0].second_title;
                $scope.img = newstitle[0].img_url;
                $scope.keyword = newstitle[0].keyword;
                $scope.tip2 = newstitle[1].title;
                $scope.tip3 = newstitle[2].title;
                $scope.tip4 = newstitle[3].title;
            });




        $scope.change_category = function (index) {
            var category_wrapper = angular.element(document.querySelector('#solution-category'));
            var description_wrapper = angular.element(document.querySelector('#solution-description'));
            category_wrapper.find('a').removeClass('active');
            category_wrapper.find('a').eq(index - 1).addClass('active');
            description_wrapper.children('.solution-description').removeClass('active');
            description_wrapper.children('.solution-description').eq(index - 1).addClass('active');
        };

        MultiProductTipsLoader().then(
            function(data){
                $scope.tips = data;
               })

        $scope.MouseOverTips = function(tip,index) {
            var category_wrapper = $('#solution-category');
            category_wrapper.find('a').removeClass('active');
            category_wrapper.find('a').eq(index).addClass('active');

            var description_wrapper = $('.solution-description');
            description_wrapper.removeClass('active');
            description_wrapper.eq(index).addClass('active');
        }
    }


);

app.controller('SearchProduct',
    function ($scope, $location) {
        $scope.search_products = function (search) {
            $location.url('/products/1');
            $scope.query = search ? { search: search } : '';
            $location.search($scope.query);
          //  $location.search(search);
        };

    }
);

app.controller('ShowMenu',
    function ($scope, MultiMenuLoader, $location) {
        $scope.ShowMenuTemplate = "/static/views/show_menu.html";

        MultiMenuLoader().then(
            function (data) {
                $scope.menus = data;
                for (var key in $scope.menus) {
                    if ($location.url().indexOf($scope.menus[key].page_name) != -1) {
                        $scope.page = $scope.menus[key].id - 1;
                    }
                }
            },
            function (errorReason) {
                //error reason
            }
        );
    }
);

app.controller('SecondaryNavShow',
    function ($scope, $location) {

        if ($location.url().split('/')[2] != undefined) {
            $scope.page = $location.url().split('/')[2] - 1;

            var _ie7_ngClass = setInterval(function () {

                if ($('#secondary-nav').find('a').length > $scope.page) {

                    $('#secondary-nav').find('a').eq($scope.page).addClass('active');
                    clearInterval(_ie7_ngClass);
                }

            }, 10);
        }
        ;

        $scope.$on('$locationChangeSuccess', function () {

            if ($location.url().split('/')[2] != undefined) {
                $scope.page = $location.url().split('/')[2] - 1;

                var _ie7_ngClass = setInterval(function () {

                    if ($('#secondary-nav').find('a').length > $scope.page) {

                        $('#secondary-nav').find('a').eq($scope.page).addClass('active');
                        clearInterval(_ie7_ngClass);
                    }

                }, 10);
            }
        });
    }
);



app.controller('ViewAboutsanwik',
    function (Menu, $rootScope,$routeParams,$scope,CompanyDescriptionLoader) {
        $rootScope.SecondaryNav = Menu.get({id: 2});

       $scope.n = parseInt($routeParams.descriptionId);
        if($scope.n == 1){
            $scope.aboutpage = '/static/views/about_sanwik.html';
        };
        if($scope.n == 2){
            $scope.aboutpage = '/static/views/about_strength.html';
        };
        if($scope.n == 3){
            $scope.aboutpage = '/static/views/about_cultural.html';
        };
        if($scope.n == 5){
            $scope.aboutpage = '/static/views/about_environment.html';
        };
        if($scope.n == 6){
            $scope.aboutpage = '/static/views/about_environment.html';
        };




        CompanyDescriptionLoader().then(
            function(data){
                $scope.company_description = data;
            }
        )
    }
);

app.controller('ViewAboutpatent',
    function($scope,patents,Menu,$rootScope){
        $rootScope.SecondaryNav = Menu.get({id: 2});
        $scope.patents = patents;

        $scope.currentpage = 0;
        $scope.pagesize = 10;
        $scope.pagecount  = Math.floor( (patents.length-1)/$scope.pagesize )+ 1;
        $scope.nextPage = function() {
            if ($scope.currentpage < $scope.pagecount-1) {
                $scope.currentpage++;}
        };
        $scope.prevPage = function() {
            if ($scope.currentpage > 0) {
                $scope.currentpage--; }
        };

        $scope.firstPage = function(){
            $scope.currentpage = 0;
        }

        $scope.lastPage = function(){
            $scope.currentpage = $scope.pagecount-1;
        }

        $scope.gotoPage = function(inputPage){
            var n = parseInt(inputPage) ;
            if(n<($scope.pagecount+1) && n>0){
                $scope.currentpage = n-1;
            }


        }

        $scope.enlarge = function(item,index){
            $scope.big = item.bigimg;


            $('#patent-content').find('#smallimg').eq(index).mousemove(function (e) {
                $("#bigimgdiv").css({'display':'block'});
                if(e.pageX<560){
                    $('#bigimgdiv').css("top", e.pageY+15 ).css("left", e.pageX+15);
                }
                else{
                    $('#bigimgdiv').css("top", e.pageY+15 ).css("left", e.pageX-560);
                }
                $("#bigimg").css({'display':'block'});
              //  var tempX = e.pageX - $('#patent-content').find('#smallimg').eq(index).offset().left;
                var tempY = e.pageY - $('#patent-content').find('#smallimg').eq(index).offset().top;
                $('#bigimg').css("top", -tempY*8 ).css("left", 0);
            });


            $('#patent-content').find('#smallimg').eq(index).mouseleave(function () {
                $("#bigimgdiv").css({'display':'none'});
            });
            return false;
        }
    }
)


app.controller('ViewNews',
    function ($scope, news_list, Menu, $rootScope) {
        $rootScope.SecondaryNav = Menu.get({id: 2});
        $scope.news_list = news_list;


        $scope.currentpage = 0;
        $scope.pagesize = 10;
        $scope.pagecount  = Math.floor( (news_list.length-1)/$scope.pagesize )+ 1;
        $scope.nextPage = function() {
            if ($scope.currentpage < $scope.pagecount-1) {
                $scope.currentpage++;}
            };
        $scope.prevPage = function() {
            if ($scope.currentpage > 0) {
                $scope.currentpage--; }
            };

        $scope.firstPage = function(){
            $scope.currentpage = 0;
        }

        $scope.lastPage = function(){
            $scope.currentpage = $scope.pagecount-1;
        }

        $scope.gotoPage = function(inputPage){
                var n = parseInt(inputPage) ;
                if(n<($scope.pagecount+1) && n>0){
                    $scope.currentpage = n-1;
                }


        }
    }
);

app.controller('ViewNewsDetail',
    function ($scope, news, Menu, $rootScope) {
        $rootScope.SecondaryNav = Menu.get({id: 2});
        $scope.news = news;
        $scope.small_img = news.large_img;

        if($scope.news.large_img.length<2){
            $("#small").css({'display':'none'});
            $("#leftspan").css({'display':'none'});
            $("#rightspan").css({'display':'none'});
        };

       if(!news.video_url && news.large_img){
            $('#img').css({'display': 'block'});

        $scope.currentIndex = 0;
        var lImg = $scope.currentIndex;
        $scope.currentImg = news.large_img[0];
        $scope.length = news.large_img.length;

        $scope.preImg = function(){
            if(lImg > 0){
                lImg--;
               $scope.currentImg = news.large_img[lImg];
               $('#small-block').children('span').removeClass();
               $('#small-block').children('span').eq(lImg).addClass('active');
               $('#small').scrollLeft(lImg*33);
            }
        }

        $scope.nextImg = function(){
            if(lImg < $scope.length-1){
                lImg++;
                $scope.currentImg = news.large_img[lImg];
                $('#small-block').children('span').removeClass();
                $('#small-block').children('span').eq(lImg).addClass('active');
                $('#small').scrollLeft(lImg*33);
            }
        }

        $scope.choose_img = function(index){
            lImg = index;
            $scope.currentImg = news.large_img[index];
            $('#small-block').children('span').removeClass();
            $('#small-block').children('span').eq(index).addClass('active');
            $('#small').scrollLeft(lImg*33);
        }
      }

       else{
          if(news.video_url){
              $('#video').css({'display': 'block'});
              $scope.play_pause =function(){
                  if(!document.flash.IsPlaying())
                  {
                      document.flash.Play();
                      $('#play').css({'display': 'none'});
                      $('#pause').css({'display': 'block'});
                  }
                  else
                  {
                      document.flash.StopPlay();
                      $('#pause').css({'display': 'none'});
                      $('#play').css({'display': 'block'});
                  }
              }
          }

      };

        if(news.special){
            $("#news-detail").css({'display':'none'});
            $("#news-special").css({'display':'block'});
        }else{
            $("#news-detail").css({'display':'block'});
            $("#news-special").css({'display':'none'});
        };

    }
);


app.controller('Activies',
    function ($scope, activities_list, Menu, $rootScope) {
        $rootScope.SecondaryNav = Menu.get({id: 2});
        $scope.activities_list = activities_list;

        $scope.currentpage = 0;
        $scope.pagesize = 10;
        $scope.pagecount  = Math.floor( (activities_list.length-1)/$scope.pagesize )+ 1;
        $scope.nextPage = function() {
            if ($scope.currentpage < $scope.pagecount-1) {
                $scope.currentpage++;}
        };
        $scope.prevPage = function() {
            if ($scope.currentpage > 0) {
                $scope.currentpage--; }
        };

        $scope.firstPage = function(){
            $scope.currentpage = 0;
        }

        $scope.lastPage = function(){
            $scope.currentpage = $scope.pagecount-1;
        }

        $scope.gotoPage = function(inputPage){
            var n = parseInt(inputPage) ;
            if(n<($scope.pagecount+1) && n>0){
                $scope.currentpage = n-1;
            }


        }
    }
);

app.controller('ActiviesDetail',
    function ($scope, activities, Menu, $rootScope) {
        $rootScope.SecondaryNav = Menu.get({id: 2});
        $scope.activities = activities;

        if(!activities.video_url && activities.large_img){
            $('#img').css({'display': 'block'});
            $scope.currentIndex = 0;
            var lImg = $scope.currentIndex;
            $scope.currentImg = activities.large_img[0];
            $scope.length = activities.large_img.length;

            $scope.preImg = function(){
                if(lImg > 0){
                    lImg--;
                    $scope.currentImg = activities.large_img[lImg];
                    $('#small-block').children('span').removeClass();
                    $('#small-block').children('span').eq(lImg).addClass('active');
                    $('#small').scrollLeft(lImg*33);
                }
            }

            $scope.nextImg = function(){
                if(lImg < $scope.length-1){
                    lImg++;
                    $scope.currentImg = activities.large_img[lImg];
                    $('#small-block').children('span').removeClass();
                    $('#small-block').children('span').eq(lImg).addClass('active');
                    $('#small').scrollLeft(lImg*33);
                }
            }

            $scope.choose_img = function(index){
                lImg = index;
                $scope.currentImg = activities.large_img[index];
                $('#small-block').children('span').removeClass();
                $('#small-block').children('span').eq(index).addClass('active');
                $('#small').scrollLeft(lImg*33);
            }
        }


       /* else{
            $('#video').css({'display': 'block'});
            $scope.play_pause =function(){
                if(!document.flash.IsPlaying())
                {
                    document.flash.Play();
                    $('#play').css({'display': 'none'});
                    $('#pause').css({'display': 'block'});
                }
                else
                {
                    document.flash.StopPlay();
                    $('#pause').css({'display': 'none'});
                    $('#play').css({'display': 'block'});
                }
            }
        }*/

    }
);


app.controller('ViewProducts',
    function ($scope, products_list, Menu, $rootScope, $route, MultiProductsListLoader,ProductTipsLoader) {
        $rootScope.SecondaryNav = Menu.get({id: 3});


        var search = $route.current.params.search;
        if (search != undefined) {
            MultiProductsListLoader().then(
                function (products) {
                    $scope.products_list = [];
                    for (var i in products) {
                        products[i] = angular.fromJson(angular.toJson(products[i]));
                        for (var key in products[i]) {
                            if (products[i][key].no.indexOf(search) != -1 || products[i][key].name.indexOf(search) != -1) {
                                $scope.products_list.push(products[i][key]);
                            }
                        }
                    }
                },
                function (errorReason) {
                    //error reason
                }
            );
        }
        else {
            ProductTipsLoader().then(
               function(data){
                   $scope.describe = data ;

               }
            )
            $scope.products_list = products_list;
        }


    }
);

app.controller('ViewProductsDetail',
    function ($scope, products_detail, Menu, $rootScope) {
        $rootScope.SecondaryNav = Menu.get({id: 3});
        $scope.products_detail = products_detail;


        var wrapper = $('#detail-imgs');
        var len = products_detail.detail.length;
        var is_load_detail = false;
        var small_img_wrapper = $('#small-img');
        var large_img_wrapper = $('#large-img');
        var detail_wrapper = $('#detail-content').children('div');
        var title_wrapper = $('#detail-title');


        var _ie7_ngClass = setInterval(function () {
            if (small_img_wrapper.children('span').length > 0) {
                small_img_wrapper.children('span').eq(0).addClass('active');
                large_img_wrapper.children('img').eq(0).addClass('active');
                clearInterval(_ie7_ngClass);
            }
        }, 10);


        var insert_img = function (index, src) {
            var img = new Image();

            img.src = src;

            img.onload = function () {
                wrapper.append(angular.element('<img src="' + img.src + '"/>'));

                if (index == (len - 1)) {
                    $('#detail-display-loading').css({'display': 'none'});
                }
            }
        };



        $scope.load_detail = function () {
            if (!is_load_detail) {
                $('#detail-display-loading').css({'display': 'block'});
                for (var index in products_detail.detail) {
                    insert_img(index, products_detail.detail[index]);
                }
                is_load_detail = true;
            }

        };


        var show_div = function(index){
            title_wrapper.find('li').removeClass('active');
            title_wrapper.find('li').eq(index).addClass('active');

            var div = products_detail.detai[index].div;
            for(var i=0; i<detail_wrapper.length ;i++){
                if(div == detail_wrapper.eq(i).attr('id')){
                    detail_wrapper.css({'display':'none'});
                    detail_wrapper.eq(i).css({'display':'block'});

                }

            }
            // $('#'+div+'').css({'display':'block'});
        }

        if(products_detail.detai){
            show_div(0);
        }

         $scope.choose = function(index){
             show_div(index);
         };



        $scope.change_img = function (index) {
            small_img_wrapper.children('span').removeClass('active');
            small_img_wrapper.children('span').eq(index).addClass('active');
            large_img_wrapper.children('img').removeClass('active');
            large_img_wrapper.children('img').eq(index).addClass('active');
        }
    }
);

app.controller('ViewSolutions',
    function ($scope, solutions_list, Menu, $rootScope) {
        $rootScope.SecondaryNav = Menu.get({id: 4});
        $scope.solutions_list = solutions_list;

    }
);

app.controller('ViewSupports',
    function ($scope, supports_list, Menu, $rootScope) {
        $rootScope.SecondaryNav = Menu.get({id: 5});
        $scope.supports_list = supports_list;
    }
);

app.controller('ViewJoinus',
    function ($scope, joinus_list, Menu, $rootScope) {
        $rootScope.SecondaryNav = Menu.get({id: 6});
        $scope.joinus_list = joinus_list;
    }
);

app.controller('ViewContact',
    function ($scope, contact_list, Menu, $rootScope) {
        $rootScope.SecondaryNav = Menu.get({id: 7});
        $scope.contact_list = contact_list;

    }
);
