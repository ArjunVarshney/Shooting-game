document.addEventListener("mousemove", move);
document.addEventListener("touchmove", movetouch);
document.addEventListener("touchstart", movetouch);
let scene = document.querySelector(".scene");
let rocket = document.querySelector(".rocket");
rocket.style.width = "40px";
let score = 0;
let y = 1500;
let c = 0;
document.addEventListener("keypress", (e) => {
  if (e.key == " ") {
    if (c == 0) {
      let begintxt = document.querySelector(".begin");
      begintxt.style.opacity = "0";
      let stars = document.getElementsByTagName("i");
      Array.from(stars).forEach((element) => {
        element.style.opacity = "0";
      });
      setTimeout(() => {
        document.querySelector("body").removeChild(begintxt);
        Array.from(stars).forEach((element) => scene.removeChild(element));
      }, 2000);
      makeenemy();
      callenemy();
      animate();

      setInterval(() => {
        if (y - 250 >= (4000 - innerWidth) / 15) {
          y = y - 50;
        }
      }, 3000);
      c++;
    }
    let projectile = document.createElement("span");
    projectile.classList.add("shot");
    projectile.style.top = rocket.style.top;
    projectile.style.left = rocket.style.left;
    projectile.style.width = "10px";
    scene.appendChild(projectile);
  }
});

function movetouch(e) {
  let x = e.touches[0].clientX;
  let y = e.touches[0].clientY;
  let rocket = document.querySelector(".rocket");
  rocket.style.top = y + "px";
  rocket.style.left = x + "px";
  if (c == 0) {
    let begintxt = document.querySelector(".begin");
    begintxt.style.opacity = "0";
    let stars = document.getElementsByTagName("i");
    Array.from(stars).forEach((element) => {
      element.style.opacity = "0";
    });
    setTimeout(() => {
      document.querySelector("body").removeChild(begintxt);
      Array.from(stars).forEach((element) => scene.removeChild(element));
    }, 2000);
    makeenemy();
    callenemy();
    animate();

    setInterval(() => {
      if (y - 250 >= (4000 - innerWidth) / 15) {
        y = y - 50;
      }
    }, 3000);
    setInterval(() => {
      let projectile = document.createElement("span");
      projectile.classList.add("shot");
      projectile.style.top = rocket.style.top;
      projectile.style.left = rocket.style.left;
      projectile.style.width = "10px";
      scene.appendChild(projectile);
    }, 50);
    c++;
  }
}

function makeenemy() {
  x = Math.random() * y;
  setTimeout(() => {
    callenemy();
    makeenemy();
  }, x);
}

let c2 = 0;
function callenemy() {
  if (c2 == 0) {
    animateenemy();
    c2++;
  }
  let enemy = document.createElement("div");
  enemy.classList.add("enemy");
  let w = 20 + Math.random() * 60 + "px";
  let r = Math.random() * 255;
  let g = Math.random() * 255;
  let b = Math.random() * 255;
  let left = 10 + Math.random() * (innerWidth - 10) + "px";

  enemy.style.top = -100 + "px";
  enemy.style.left = left;
  enemy.style.width = w;
  enemy.style.height = w;
  enemy.style.background = `rgb(${r},${g},${b})`;
  enemy.style.boxShadow = `0 0 40px 15px rgba(${r},${b},${g},0.5)`;
  scene.appendChild(enemy);
}

let f = 0;
function animateenemy() {
  if (f != 1) {
    window.requestAnimationFrame(animateenemy);
  }
  let enemy = document.getElementsByClassName("enemy");
  let shots = document.getElementsByClassName("shot");
  Array.from(enemy).forEach((element) => {
    velocity = (100 - parseInt(element.style.width)) / 10;
    element.style.top = parseInt(element.style.top) + velocity + "px";
    if (parseInt(element.style.top) >= innerHeight + 200) {
      scene.removeChild(element);
    }
    let ex = parseInt(element.style.left);
    (ey = parseInt(element.style.top)),
      (xr = parseInt(rocket.style.left)),
      (xy = parseInt(rocket.style.top)),
      (dx = ex - xr),
      (dy = ey - xy),
      (distance = Math.sqrt(dx * dx + dy * dy));
    let mindis =
      parseInt(rocket.style.width, 10) / 2 +
      parseInt(element.style.width, 10) / 2;
    if (distance <= mindis + 10) {
      let n = document.createElement("div");
      n.classList.add("begin");
      n.innerText = "You Crashed";
      document.querySelector("body").appendChild(n);
      setInterval(() => {
        window.location.reload();
      }, 1000);
      f = 1;
    }
    Array.from(shots).forEach((e) => {
      let sy = parseInt(e.style.top),
        sx = parseInt(e.style.left),
        dx2 = ex - sx;
      dy2 = ey - sy;
      dis = Math.sqrt(dx2 * dx2 + dy2 * dy2);
      let min = parseInt(e.style.width) / 2 + parseInt(element.style.width) / 2;
      if (dis <= min + 20) {
        element.style.width = parseInt(element.style.width) - 3 + "px";
        element.style.height = element.style.width;
        scene.removeChild(e);
        if (parseInt(element.style.width) <= 5) {
          scene.removeChild(element);
          score++;
          document.querySelector(".score").innerHTML = score;
        }
      }
    });
  });
}

let shots;
function animate() {
  window.requestAnimationFrame(animate);
  shots = document.getElementsByClassName("shot");
  Array.from(shots).forEach((element) => {
    element.style.top = parseInt(element.style.top) - 5 + "px";
    if (element.style.top <= "-50px") {
      scene.removeChild(element);
    }
  });
}
function move(e) {
  let x = e.offsetX;
  let y = e.offsetY;

  rocket.style.top = y + "px";
  rocket.style.left = x + "px";
}

function stars() {
  let c = innerWidth / 10;
  let i = 0;
  while (i < c) {
    let star = document.createElement("i");
    star.style.transition = `opacity 2s`;
    let x = Math.floor(Math.random() * window.innerWidth);

    let d = Math.random() * 1.6;
    let h = 60 + Math.random() * 100;
    let shadow = Math.random();
    let opacity = Math.random() * 0.4;

    star.style.boxShadow = `0 0 5px ${shadow}px rgba(255,255,255,${opacity})`;
    star.style.left = x + "px";
    star.style.width = 1 + "px";
    star.style.height = h + "px";
    star.style.animationDuration = d + "s";
    scene.appendChild(star);
    i++;
  }
}
stars();
