var namestyles= ["Icon","StretchyIcon","DotIcon","CircleIcon","CircleDotIcon","DotIconWithCaption","CircleDotIconWithCaption"];
var shareurl;
$(document).ready(function()
{
  $("#cord1").inputmask("Regex", {regex: "^[-]?([0-9]{1}|[8]{1}[0-5]{1}|[1-7]{1}[0-9]{1})([.]{1}[0-9]{1,40})?$",showMaskOnHover:false,showMaskOnFocus: false});
  $("#cord2").inputmask("Regex", {regex: "^[-]?([0-9]{1,2}|[1]{1}[0-7]{1}[0-9]{1}|180)([.]{1}[0-9]{1,40})?$",showMaskOnHover:false,showMaskOnFocus: false});
  $("#namemetka").inputmask("Regex", {regex: "^[А-Яа-я0-9 ]{1,30}$",showMaskOnHover:false,showMaskOnFocus: false});
  $("#textadv").inputmask("Regex", {regex: "^[А-Яа-я0-9 ]{1,30}$",showMaskOnHover:false,showMaskOnFocus: false});
});
ymaps.ready(init);
    var myMap;
	var myMetki={'type':'FeatureCollection','features':[]},
		tmpMetka,
		myGeoQueryResultTmp,
		myGeoQueryResultFinal;
	
function init()
{     
var coord=[57.631912, 39.887646];
myMap = new ymaps.Map("map", {
        center: coord,
        zoom: 16
    });
	myGeoQueryResultFinal=myGeoQueryResultTmp=ymaps.geoQuery(tmpMetka);
myMap.events.add('click', function (e) {
var coords = e.get('coords');
$('#cord1').val(coords[0]);
$('#cord2').val(coords[1]);
add_map();
});
}
function add_map()
{
myGeoQueryResultTmp.removeFromMap(myMap);
tmpMetka = new ymaps.GeoObject({
            // Описание геометрии.
            geometry: {
                type: "Point",
                coordinates: [$('#cord1').val(),$('#cord2').val()]
            },
            // Свойства.
            properties: {
                // Контент метки.
               iconContent: $('#namemetka').val(),
					iconCaption: $('#namemetka').val(),
                    hintContent: $('#textadv').val()
            }
        }, {
            // Опции.
            // Иконка метки будет растягиваться под размер ее содержимого.
            preset:'islands#'+$('#cstyle').val()+namestyles[$('#style').val()-1],
            // Метку можно перемещать.
            draggable: true
        });
		tmpMetka.events.add('dragend', function(e) {
   // Получение ссылки на объект, который был передвинут.
   var thisPlacemark = e.get('target');
   // Определение координат метки
   var coords = thisPlacemark.geometry.getCoordinates();
   // и вывод их при щелчке на метке
   $('#cord1').val(coords[0]);
   $('#cord2').val(coords[1]);
});
		myGeoQueryResultTmp=ymaps.geoQuery(tmpMetka).addToMap(myMap);
}
function add_metka()
{
    if(!$('#cord1').val().length)
	{
	$('#cord1').focus();
	alert('Поля формы не должны быть пустыми!');
	return 1;
	}
	if(!$('#cord2').val().length)
	{
	$('#cord2').focus();
	alert('Поля формы не должны быть пустыми!');
	return 1;
	}
	if(!$('#namemetka').val().length)
	{
	$('#namemetka').focus();
	alert('Поля формы не должны быть пустыми!');
	return 1;
	}
	if(!$('#textadv').val().length)
	{
	$('#textadv').focus();
	alert('Поля формы не должны быть пустыми!');
	return 1;
	}
    myGeoQueryResultTmp.removeFromMap(myMap);
	myGeoQueryResultFinal.removeFromMap(myMap);
	myMetki.features.push({type: 'Feature', geometry: {type: "Point", coordinates: [$('#cord1').val(),$('#cord2').val()]},options:{preset: 'islands#'+$('#cstyle').val()+namestyles[$('#style').val()-1]},properties:{iconContent: $('#namemetka').val(),iconCaption: $('#namemetka').val(),hintContent: $('#textadv').val()}});
	myGeoQueryResultFinal=ymaps.geoQuery(myMetki).addToMap(myMap);
	up_list();
}
function delete_metka(idx)
{
var status = confirm("Вы действительно хотите удалить метку "+myMetki.features[idx].properties.iconContent+"?");
if(status)
{
$("#metka"+idx).alert("close");
myMetki.features.splice(idx, 1);
up_list();
	myGeoQueryResultFinal.removeFromMap(myMap);
	myGeoQueryResultFinal=ymaps.geoQuery(myMetki).addToMap(myMap);
}
}
function up_list()
{
    var htmll="";
	for(var i = 0;i<myMetki.features.length;i++)
	{
	htmll+='<div class="alert alert-success alert-dismissible gb-metka_el" id="metka'+i+'"><span onclick="on_centermap('+i+')" class="gb-nm_metka">'+(i+1)+'.'+myMetki.features[i].properties.iconContent+'</span><a href="#" class="close" title="Удалить" onclick="delete_metka('+i+')">×</a></div>';
	}
	$('#list_metki').html(htmll);
}
function on_centermap(num)
{
myMap.setCenter(myMetki.features[num].geometry.coordinates,16);
}
function change_param()
{
    if(isObject(tmpMetka))
	{
    tmpMetka.properties.set({
                    iconContent: $('#namemetka').val(),
					iconCaption: $('#namemetka').val(),
                    hintContent: $('#textadv').val()
                });
	tmpMetka.geometry.setCoordinates([$('#cord1').val(),$('#cord2').val()]);
	tmpMetka.options.set('preset', 'islands#'+$('#cstyle').val()+namestyles[$('#style').val()-1]);
	}
	else
	add_map();
}
function change_style(el,num)
{
$('.style-img').removeClass("gb-active");
$('#style').val(num);
$(el).addClass("gb-active");
change_param();
}
function isObject(obj) {   return ('object' === typeof(obj) && obj!== null); } 