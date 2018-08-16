'use strict';
$(function() {
  
  var yandex_map_div_id = 'map-yandex';
  var CMS__TPL_PATH = '/local/templates/azbn7theme';
  var CMS__TPL_PATH = '';
  
  var yandex_map = $('#' + yandex_map_div_id);
  
  if(yandex_map.length) {
    
      var 
        map_area = yandex_map, 
        map_area_center = {   
          center: [56.129057, 40.406635], // расположение района
          zoom: 8,
          controls: ['smallMapDefaultSet']
        },
        map_area_block;
      var initYandexMapGlonass = function() {
        
        var map_area_block = new ymaps.Map(yandex_map_div_id, map_area_center, {
          //searchControlProvider: 'yandex#search'
        });
        
        //$('.azbn__contacts__item').each(function(index){
          
          var block = $(this);
          var block_data = JSON.parse(block.attr('data-contact') || '{}');
          
          //var polygonLayout_isActive = (index > 0) ? 'is--active' : '';
          var polygonLayout = ymaps.templateLayoutFactory.createClass('<div class="kontakty-card__location"><svg class="icon-svg icon-map-location" role="img"><use xlink:href="' + CMS__TPL_PATH + '/img/svg/sprite.svg#map-location"></use></svg></div>');
          var polygonLayout_active = ymaps.templateLayoutFactory.createClass('<div class="kontakty-card__location is--active"><svg class="icon-svg icon-map-location-active" role="img"><use xlink:href="' + CMS__TPL_PATH + '/img/svg/sprite.svg#map-location-active"></use></svg></div>');
          var clusterLayout = ymaps.templateLayoutFactory.createClass('<div style="color: #024f85; font-weight: bold;">$[properties.geoObjects.length]</div>');
          
          var items = $('.azbn__contacts__item');
          
          if(items.length) {
            
            /*
            var geoObjects = [];
            
            var clusterer = new ymaps.Clusterer({
              preset : 'islands#nightClusterIcons',
              gridSize : 128,
              clusterIconContentLayout : clusterLayout ,
              groupByCoordinates : false,
              clusterDisableClickZoom : false,
              clusterHideIconOnBalloonOpen : false,
              geoObjectHideIconOnBalloonOpen : false,
            });
            */

            items.each(function(index){
              
              var item = $(this);
              
              try {
                
                var item_data = JSON.parse(item.attr('data-contact') || {});
                
                item.attr('data-map-index', index);
                
                //geoObjects.push();
                
                var map_placemark = new ymaps.Placemark(item_data.coord, {
                  //hintContent: '' 
                }, {
                  iconLayout : polygonLayout,
                  iconImageSize : [60, 60],
                  iconImageOffset : [-30, -60],
                  clusterCaption : item_data.title,
                });
                
                map_area_block
                  .geoObjects
                    .add(map_placemark, index)
                ;
                
                
              } catch(ex) {
                
                console.dir(ex);
                console.dir(item);
                
              }
              
            });
            
            /*
            clusterer.options.set({
              gridSize: 80,
              clusterDisableClickZoom: true
            });
            */
            
            /*
            clusterer.add(geoObjects);
            map_area_block.geoObjects.add(clusterer);
            
            map_area_block.setBounds(clusterer.getBounds(), {
              checkZoomRange: true,
            });
            */
            
            $(document.body).on('click.azbn7', '.azbn__contacts__item a.azbn7__map-point-link', null, function(event){
              event.preventDefault();
              
              var item = $(this).closest('.azbn__contacts__item');
              var item_data = JSON.parse(item.attr('data-contact') || {});
              var item_index = parseInt(item.attr('data-map-index'));
              
              map_area_block.setCenter(item_data.coord, 16, {
                duration : 555,
              });
              /*
              map_area_block.setZoom(15, {
                smooth : true,
              });
              */
              
              map_area_block.geoObjects.each(function(pm){
                
                pm.options.set({
                  iconLayout : polygonLayout,
                });
                
              });
              
              
              //var icon = map_area_block.geoObjects.get(item_index);
              
              //console.dir(icon);
              
              map_area_block.geoObjects.get(item_index).options.set({
                iconLayout : polygonLayout_active,
              });
              
            });
            
            
          }
          
          
          
        //});
      }
      
      if(map_area.length) {
        ymaps.ready(initYandexMapGlonass);
      }
    
  } 
  
});
/*
google map
function initMap() {  
  var map_container_div_id = 'map-google';
  var cont = $('#' + map_container_div_id);  
  var CMS__TPL_PATH = '/wp-content/themes/azbn7theme';  
  if(cont.length) {    
    var map_data = JSON.parse(cont.attr('data-map') || '{}');
    var coordMapOfficeOne = map_data.center;
    var zoomMapOfficeOne = map_data.zoom;    
     if($(document).width() < 768) {
        var coordMapOfficeOne = map_data.center_xs;
        var zoomMapOfficeOne = map_data.zoom_xs;    
     }  
    var styleMapOfficeOne = [{"featureType":"landscape.man_made","elementType":"geometry.fill","stylers":[{"color":"#e9e5dc"}]},{"featureType":"landscape.natural","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#b8cb93"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"poi.business","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"poi.medical","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"poi.park","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"poi.park","elementType":"geometry.fill","stylers":[{"color":"#ccdca1"}]},{"featureType":"poi.sports_complex","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"road","elementType":"geometry.fill","stylers":[{"hue":"#ff0000"},{"saturation":-100},{"lightness":99}]},{"featureType":"road","elementType":"geometry.stroke","stylers":[{"color":"#808080"},{"lightness":54},{"visibility":"off"}]},{"featureType":"road","elementType":"labels.text.fill","stylers":[{"color":"#767676"}]},{"featureType":"road","elementType":"labels.text.stroke","stylers":[{"color":"#ffffff"}]},{"featureType":"water","elementType":"all","stylers":[{"saturation":43},{"lightness":-11},{"color":"#89cada"}]}],
        optionsMapOfficeOne = {
          zoom: zoomMapOfficeOne, 
          center: new google.maps.LatLng(coordMapOfficeOne[0], coordMapOfficeOne[1]), 
          //styles: styleMapOfficeOne
        }, 
      idOfficeOne = document.getElementById(map_container_div_id),
      mapOfficeOne = new google.maps.Map(idOfficeOne, optionsMapOfficeOne),
      iconOfficeOne = {   
        path: "M29.0061 0C12.9878 0 -5.73408e-07 12.8421 -5.73408e-07 28.6841C-5.73408e-07 36.7885 7.98612 51.308 7.98612 51.308L27.9369 85L48.7532 51.7014C48.7532 51.7014 58 37.848 58 28.6841C58.0024 12.8421 45.0171 0 29.0061 0ZM28.8703 44.4827C19.6962 44.4827 12.2653 37.0854 12.2653 27.9432C12.2653 18.813 19.6938 11.4205 28.8703 11.4205C38.0395 11.4205 45.4777 18.813 45.4777 27.9432C45.4777 37.0854 38.0395 44.4827 28.8703 44.4827Z", 
        fillColor: '#00AEF3',
        strokeColor: '#000000',
        fillOpacity: 1,
        //anchor: new google.maps.Point(26,65),
        anchor: new google.maps.Point(29,85),
        strokeWeight: 0,
        scale: 1,
      }; 
      if(map_data.placemarks.length) {
        for(var i = 0; i < map_data.placemarks.length; i++) {
          var iconCoordOfficeOne = {lat: map_data.placemarks[i].coord[0],  lng: map_data.placemarks[i].coord[1]}, 
          OfficeOne = new google.maps.Marker({
            position: iconCoordOfficeOne,
            map: mapOfficeOne,
            icon: iconOfficeOne,
            title: map_data.placemarks[i].title,
              //animation: google.maps.Animation.DROP
          });
        }
      }      
      $(document.body).on('click.azbn7', '.azbn__office__map__set-center-btn', null, function(event){
        event.preventDefault();
        var btn = $(this);
        var coord = btn.attr('data-coord');
        var coord_arr = coord.split(',');
        console.dir(coord_arr);
        mapOfficeOne.setCenter({
          lat : parseFloat((coord_arr[0] || '').trim()),
          lng : parseFloat((coord_arr[1] || '').trim()),
        });
        
      });
      
    
  }
  
}; 
$(function () {
  $(document.body).on('shown.bs.modal', '.modal', {}, function(event){
    event.preventDefault();
    $(window).trigger('resize');    
  });  
});*/