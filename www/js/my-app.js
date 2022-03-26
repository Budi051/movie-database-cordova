var $$ = Dom7;

var app = new Framework7({
   root: '#app',
   name: 'My App',
   id: 'com.ubaya.hybrid',
   panel: { swipe: 'left', },
   theme: 'md',

   routes: [
      {
         path: '/index/',
         url: 'index.html',
         on: {
            pageInit: function(e, page)
            {
               app.request.post("http://ubaya.prototipe.net/s160418051/project/movielist.php", {}, function(data){
                  var drivers = JSON.parse(data);
                  if(localStorage.username != null)
                  {
                     $$('.right').html("<a href='/index/' class='link' id='btnlogout'>"+localStorage.username+"</a>");
                  }
                  else if(localStorage.username == null)
                  {
                     $$('.right').html("<a href='/login/' class='link'>Login</a>");
                  }
                  for(var i = 0; i < drivers.length; i++)
                  {
                     $$('.page-content').append(
                        "<a href='/moviedetail/"+drivers[i]['idmovie']+"'> <div class='block'> "+
                           "<div class='card demo-card-header-pic'>"+
                              "<div style='background-image:url(http://ubaya.prototipe.net/s160418051/project/images/"+drivers[i]['idmovie']+drivers[i]['extension_poster']+")' class='card-header align-items-flex-end'>"+
                              "</div>"+
                              "<div class='card-content card-content-padding'>"+
                                 "<p class='date'>"+drivers[i]['judul']+"</p>"+
                              "</div>"+
                           "</div>"+
                        "</div> </a>");
                  }
               });
            },
         },
      },

      {
         path: '/login/',
         url: 'login.html',
      },

      {
         path: '/inputfilm/',
         url: 'inputfilm.html',
         on: {
            pageInit: function(e, page)
            {
               app.request.post("http://ubaya.prototipe.net/s160418051/project/genrelist.php", {}, function(data){
                  var drivers = JSON.parse(data);
                  for(var i = 0; i < drivers.length; i++)
                  {
                     $$('#genre').append(
                        "<input type='checkbox' id='genre' name='genre[]' value='"+drivers[i]['idgenre']+"'>"+
                        "<label for='"+drivers[i]['idgenre']+"'>"+drivers[i]['nama']+"</label><br>");
                  }
                  $$('.form-ajax-submit').append("<input id='iduser' name='iduser' type='hidden' value='"+localStorage.username+"'>");
               });
            }
         }
      },

      {
         path: '/genrelist/',
         url: 'genrelist.html',
         on: {
            pageInit: function(e, page)
            {
               app.request.post("http://ubaya.prototipe.net/s160418051/project/genrelist.php", {}, function(data){
                  var drivers = JSON.parse(data);
                  for(var i = 0; i < drivers.length; i++)
                  {
                     $$('.page-content').append(
                        "<div class='block'><a href='/movielist_genre/"+drivers[i]['idgenre']+
                           "' class='col button button-big button-fill about-button'>"+drivers[i]['nama']+
                        "</a></div>");
                  }
               });
            },
         },
      },

      {
         path: '/movielist_genre/:id',
         url: 'movielist_genre.html',
         on : {
            pageInit: function(e, page)
            {
               app.request.post("http://ubaya.prototipe.net/s160418051/project/movielist_genre.php?id=" + 
                  page.router.currentRoute.params.id, {}, function(data){
                     $$('.left').html("<a href='/genrelist/' class='link'>< Back</a>");
                     if(data == "Unable to process you request, please try again")
                     {
                        $$('.page-content').append("<center><h4>Tidak ada data film untuk genre ini</h4><center>");
                     }
                     else
                     {
                        var drivers = JSON.parse(data);
                        $$('.right').html("<div class='right'><a href='#' class='link'>"+drivers[0]['nama']+"</a></div>");
                        for(var i = 0; i < drivers.length; i++)
                        {
                           $$('.page-content').append(
                           "<a href='/moviedetail/"+drivers[i]['idmovie']+"'> <div class='block'> "+
                              "<div class='card demo-card-header-pic'>"+
                                 "<div style='background-image:url(http://ubaya.prototipe.net/s160418051/project/images/"+drivers[i]['idmovie']+drivers[i]['extension_poster']+")' class='card-header align-items-flex-end'>"+
                                 "</div>"+
                                 "<div class='card-content card-content-padding'>"+
                                    "<p class='date'>"+drivers[i]['judul']+"</p>"+
                                 "</div>"+
                              "</div>"+
                           "</div> </a>");
                        }
                     }
                  });
            },
         },
      },

      {
         path: '/moviedetail/:id',
         url: 'moviedetail.html',
         on: {
            pageInit: function(e, page)
            {
               app.request.post("http://ubaya.prototipe.net/s160418051/project/movie_detail.php?id=" + 
               page.router.currentRoute.params.id, {}, function(data){
                  var drivers = JSON.parse(data);
                  $$('#movie').append(
                           "<div class='card demo-card-header-pic'>"+
                              "<div style='background-image:url(http://ubaya.prototipe.net/s160418051/project/images/"+drivers[0]['realid']+drivers[0]['extension_poster']+")' class='card-header align-items-flex-end'>"+
                              "</div>"+
                              "<div class='card-content card-content-padding'>"+
                                 "<p class='date'>"+drivers[0]['judul']+"</p>"+
                                 "<p>Rating = "+drivers[0]['rerata']+
                                       "<br>Pemain : "+drivers[0]['pemain']+
                                       "<br>Sinopsis : <br>"+drivers[0]['sinopsis']+
                                 "</p>"+
                              "</div>"+
                           "</div>");

                  for(var i = 0; i < drivers.length; i++)
                  {
                     if(drivers[i]['iduser'] == localStorage.username)
                     {
                        $$('#btnreview').hide();
                        break;
                     }
                     else
                     {
                        $$('#btnreview').show();
                     }
                  }
                  
                  if(drivers[0]['review'] == "")
                  {
                     $$('#review').append("<center><h4>Belum ada review untuk film ini</h4></center>")
                  }
                  else
                  {
                     for(var i = 0; i < drivers.length; i++)
                     {
                        $$('#review').append(
                                          "<p><b>Pereview : "+drivers[i]['iduser']+"</b>"+
                                                "<br>Rating = "+drivers[i]['rating']+
                                                "<br>Review : <br>"+drivers[i]['review']+
                                          "</p>");
                     }
                  }
               });
            },
         },
      },

      {
         path: '/review/:id',
         url: 'review.html',
         on: {
            pageInit: function(e, page)
            {
               app.request.post("http://ubaya.prototipe.net/s160418051/project/movie_detail.php?id=" + 
               page.router.currentRoute.params.id, {}, function(data){
                  var drivers = JSON.parse(data);
                  $$('.date').html("<b id='idmovie' value='"+drivers[0]['realid']+"'>"+drivers[0]['judul']+"</b>");
                  $$('.card-content-padding').html(
                     "<div style='background-image:url(http://ubaya.prototipe.net/s160418051/project/images/"+
                        drivers[0]['realid']+drivers[0]['extension_poster']+")' class='card-header align-items-flex-end'>");
                  $$('.left').html("<a href='/moviedetail/"+page.router.currentRoute.params.id+"' class='link'>< Back</a>");
                  // $$('.form-ajax-submit').append("<input type='hidden' id='idmovie' name='idmovie' value='"+page.router.currentRoute.params.id+"'>");
                  // $$('.form-ajax-submit').append("<input type='hidden' id='iduser' name='iduser' value='"+localStorage.username+"'>");
               });
            },
         },
      },
   ],
   // ... other parameters
});

var mainView = app.views.create('.view-main', {
   url: '/index/'
});


// var user = '';
// if(user == '')  {
//    mainView.router.navigate("/login/");
// }

$$(document).on('page:init', function (e, page) {
   if(page.name == "login") 
   { 
      $$('#btnsignin').on('click', function () {
         var isiData = new FormData($$(".form-ajax-submit")[0]);
         app.request.post('http://ubaya.prototipe.net/s160418051/project/ceklogin.php', isiData , function (data){
            var pesan = JSON.parse(data);
            if(pesan == "success")
            {
               localStorage.username = $$('#iduser').val();
               app.dialog.alert("Login Berhasil");
               mainView.router.navigate('/index/');
            }
            else if(pesan == "gagal")
            {
               app.dialog.alert("Login Gagal. ID User atau password salah");
            }
            else
            {
               app.dialog.alert(data + " Tidak mendeteksi penekanan tombol");
            }
         });
      });
   }

   if(page.name == "home")
   {
      $$('#btnlogout').on('click', function(){
         if(localStorage.username == null)
         {

         }
         else
         {
            app.dialog.confirm('Apakah anda ingin logout?', function(){
               localStorage.removeItem("username");
               mainView.router.navigate('/index/');
               $$('.right').html("<a href='/login/' class='link'>Login</a>");
            });
         }
      });

      $$('#btninputfilm').on('click', function(){
         if(localStorage.username == null)
         {
            app.dialog.alert("Anda belum login");
         }
         else
         {
            mainView.router.navigate('/inputfilm/');
         }
      });
   }

   if(page.name == "moviedetail")
   {
      $$('#btnreview').on('click', function(){
         if(localStorage.username == null)
         {
            app.dialog.alert("Anda belum login");
         }
         else
         {
            mainView.router.navigate('/review/'+page.router.currentRoute.params.id);
         }
      });
   }

   if(page.name == "review")
   {
      $$('#btnsubmit').on('click', function(){
         if($$('#rating').val() > 10 || $$('#rating').val() < 0)
         {
            app.dialog.alert("Nilai rating tidak sesuai. Range : 0-10");
         }
         else
         {
            app.request.post("http://ubaya.prototipe.net/s160418051/project/review.php", 
            {iduser: localStorage.username, idmovie:page.router.currentRoute.params.id, rating: $$('#rating').val(), review: $$('#review2').val()}, 
            function(data){
               var pesan = JSON.parse(data);
               if(pesan == "success")
               {
                  app.dialog.alert("Review Berhasil");
                  page.router.navigate('/moviedetail/'+page.router.currentRoute.params.id);
               }
               else
               {
                  app.dialog.alert("Gagal menambahkan review. Pesan : "+pesan);
               }
            });
         }
      });
   }

   if(page.name == 'inputfilm') 
   {
      app.calendar.create({
         inputEl: '#tgltayang',
         closeOnSelect: true,
         dateFormat:"yyyy-mm-dd"
      });

      $$('#btnsubmit').on('click', function(){
         var isiData = new FormData($$(".form-ajax-submit")[0]);
         app.request.post("http://ubaya.prototipe.net/s160418051/project/uploadfilm.php", isiData, 
            function(data){
               var hasil = JSON.parse(data);
               if(hasil.status)
               {
                  var idmovie = hasil.pesan;
                  var imgUri = $$("#poster").attr("src");
                  if(!imgUri)
                  {
                     app.dialog.alert("Foto belum dipilih");
                     return;
                  }
                  var options = new FileUploadOptions();
                  var filename = imgUri.substr(imgUri.lastIndexOf('/') + 1);
                  var ext = "jpg";

                  options.fileKey = "photo";
                  options.fileName = filename;
                  options.mimeType = "image/jpeg";
                  options.params = { idmovie: idmovie, ext: ext};
                  var ft = new FileTransfer();
                  ft.upload(imgUri, 
                           encodeURI("http://ubaya.prototipe.net/s160418051/project/uploadpic.php"),
                           function(result){
                              //app.dialog.alert(JSON.stringify(result));
                              app.dialog.alert("Upload film berhasil");
                              mainView.router.navigate('/index/');
                           },
                           function(error){
                              app.dialog.alert(JSON.stringify("Gagal. " + error));
                           }, options
                  );
               }
               else
               {
                  app.dialog.alert("Gagal. Pesan = "+hasil.pesan);
               }
         });
      });

      $$('#btnpic').on('click', function(e){
         navigator.camera.getPicture(onSuccess, onFail, {
            quality: 100,
            destinationType: Camera.DestinationType.DATA_URL,
            sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
            encodingType: Camera.EncodingType.JPEG,
            mediaType: Camera.MediaType.PICTURE,
            correctOrientation: true
         });
         function onSuccess(imageData)
         {
            $$('#poster').attr('src', "data:image/jpeg;base64," + imageData);
         }
         function onFail(message) 
         { 
            app.dialog.alert('Failed because: ' + message);
         }
      });
   }
});