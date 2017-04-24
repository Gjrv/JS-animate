var btn = document.getElementById("btn");

var now = new Date();
var arrMonth = ["Января","Февраля", "Марта","Апреля","Мая","Июня","Июля","Aвгуста","Сентября","Октября","Ноября","Декабря"];
var arrDay = ["Воскресенье","Понедельник","Вторник","Среда","Четверг","Пятница","Суббота"];

document.getElementById("day").textContent = arrDay[now.getDay()];
document.getElementById("month").textContent = arrMonth[now.getMonth()];
document.getElementById("num").textContent = now.getDate().toString();
document.getElementById("year").textContent = now.getFullYear().toString();

btn.onclick = function(){
  $('.moon').toggleClass("active");
  $('.main-page').toggleClass("night");
  $('.sun').toggleClass("passive");
  $('#btn').toggleClass("night");
};

var canvas_1 = document.getElementById('canvas1');
var con = canvas_1.getContext('2d');
var w = canvas_1.width = $(window).width();
var h = canvas_1.height = $(window).height();
var rain = [];
var rain_count = 100;
var rain_speed = 20;

function random(min, max)
{
  return Math.random() * (max - min + 1) + min;
}
function createRain()
{
  for(var i = 0;i<rain_count;i++)
  {
    rain[i] = {
      x:Math.random() * w,
      y:Math.random() * h,
      length:Math.floor(random(1, 50))
    };
  }
}
function drawRain(i)
{
  con.beginPath();
  var grad = con.createLinearGradient(0, rain[i].y, 0, rain[i].y + rain[i].length);
  grad.addColorStop(0, "rgba(255,255,255,0)");
  grad.addColorStop(1, "rgba(255,255,255,1)");

  con.fillStyle = grad;
  con.fillRect(rain[i].x, rain[i].y, 1, rain[i].length);
  con.fill();
}
function animateRain()
{
  con.clearRect(0, 0, w, h);
  for(var i = 0;i<rain_count;i++)
  {
    if(rain[i].y > h)
      rain[i].y = 0;
    else
      rain[i].y += rain_speed;
    drawRain(i);
  }
}
createRain();
function animate()
{
  animateRain();
  requestAnimationFrame(animate);
}
animate();