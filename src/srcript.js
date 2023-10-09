let currentIndex = 0;
let pass = [123,123,123,123,123];
const items = document.querySelectorAll('.carousel-item');

function prevSlide() {
    items[currentIndex].style.display = 'none';
    document.getElementsByClassName("summon_circles")[currentIndex].classList.add("summon_appear");
    currentIndex = (currentIndex - 1 + items.length) % items.length;
    items[currentIndex].style.display = 'block';
}

function nextSlide() {
    items[currentIndex].style.display = 'none';
    document.getElementsByClassName("summon_circles")[currentIndex].classList.add("summon_appear");
    currentIndex = (currentIndex + 1) % items.length;
    items[currentIndex].style.display = 'block';
}

function selected() {
    //desaparecer la seccion de arriba
    document.getElementsByClassName("header")[0].classList.add("vanish");
    document.getElementsByClassName("name")[currentIndex].classList.add("vanish");
    setTimeout(() => { 
        document.getElementsByClassName("header")[0].style.opacity=0; 
        document.getElementsByClassName("name")[currentIndex].style.opacity=0; 
    }, 250);
    setTimeout(() => { 
        document.getElementsByClassName("header")[0].classList.remove("vanish");
        document.getElementsByClassName("name")[currentIndex].classList.remove("vanish");
    }, 251);

    //desaparecer los cuadrados
    document.getElementsByClassName("summon_squares")[currentIndex].classList.add("summon_disappear");
    setTimeout(() => { document.getElementsByClassName("summon_squares")[currentIndex].style.display="none"; }, 500);
    setTimeout(() => { document.getElementsByClassName("summon_squares")[currentIndex].classList.remove("summon_disappear"); }, 501);

    //expandir el circulo giratorio
    document.getElementsByClassName("summon_circles")[currentIndex].classList.remove("summon_appear");
    setTimeout(() => { document.getElementsByClassName("summon_circles")[currentIndex].classList.add("expand"); }, 1);
    
    //aparecer el brillo del fondo y el patron
    document.getElementsByClassName("bg_circle")[currentIndex].classList.add("fadein"); 
    document.getElementsByClassName("password_cont_cent")[0].classList.add("fadein"); 
    setTimeout(() => {  
        document.getElementsByClassName("bg_circle")[currentIndex].style.display="block";  
        document.getElementsByClassName("password_cont_cent")[0].style.display="block"; 
    }, 1);
    setTimeout(() => {  
        document.getElementsByClassName("bg_circle")[currentIndex].classList.remove("fadein"); 
        document.getElementsByClassName("password_cont_cent")[0].classList.remove("fadein");
    }, 252);
   
}

function deselected() {
    //reaparecer la seccion de arriba
    document.getElementsByClassName("header")[0].classList.add("fadein");
    document.getElementsByClassName("name")[currentIndex].classList.add("fadein");
    setTimeout(() => { 
        document.getElementsByClassName("header")[0].style.opacity=1; 
        document.getElementsByClassName("name")[currentIndex].style.opacity=1; 
    }, 250);
    setTimeout(() => { 
        document.getElementsByClassName("header")[0].classList.remove("fadein");
        document.getElementsByClassName("name")[currentIndex].classList.remove("fadein");
    }, 251);

    //reaparecer los cuadrados
    document.getElementsByClassName("summon_squares")[currentIndex].style.display="flex";


    //reducir el circulo giratorio
    document.getElementsByClassName("summon_circles")[currentIndex].classList.remove("expand");
    setTimeout(() => { document.getElementsByClassName("summon_circles")[currentIndex].classList.add("-expand"); }, 1);
    setTimeout(() => { document.getElementsByClassName("summon_circles")[currentIndex].classList.remove("-expand"); }, 502);
    
    //desaparecer el brillo del fondo y el patron

    document.getElementsByClassName("bg_circle")[currentIndex].classList.add("vanish");
    document.getElementsByClassName("password_cont_cent")[0].classList.add("vanish"); 
    setTimeout(() => {  
        document.getElementsByClassName("bg_circle")[currentIndex].classList.remove("vanish");
        document.getElementsByClassName("password_cont_cent")[0].classList.remove("vanish");
        document.getElementsByClassName("bg_circle")[currentIndex].style.display="none";  
        document.getElementsByClassName("password_cont_cent")[0].style.display="none"; 
    }, 251);
    
}

function unlocked (){
    //desaparecemos los circulos y el brillo dramaticamente
    document.getElementsByClassName("summon_circles")[currentIndex].classList.remove("expand");
    setTimeout(() => { 
        document.getElementsByClassName("summon_circles")[currentIndex].classList.add("summon_disappear");
        document.getElementsByClassName("bg_circle")[currentIndex].classList.add("summon_disappear");
    }, 1);

    //desaparecemos el pattern
    document.getElementsByClassName("password_cont_cent")[0].classList.add("vanish");
}

var lock = new PatternLock("#lock", {
    onPattern: function(pattern) {
      // Context is the pattern lock instance
      if(pattern===pass[currentIndex]){
        lock.success();
        unlocked();
      }else{
        lock.error();
        setTimeout(() => { lock.clear(); }, 1000);
      }   
     }
  });

  