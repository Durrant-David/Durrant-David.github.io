function accordion(acc) {
    //var acc = document.getElementsByClassName("accordion");
    acc.classList.toggle("active");

    /* Toggle between hiding and showing the active panel */
    var panel = acc.nextElementSibling;
    panel.classList.toggle("active");
    var panelHeight = panel.scrollHeight;
    if(panel.classList.contains("active")) {
    panel.style.height = panelHeight + 'px';
    } else {
        panel.style.height = 0 +'px';
    }
}

function drpDwn() {
    if(document.getElementById("myDropdown").classList.contains("active")){
        document.getElementById("myDropdown").classList.remove("active");
        document.getElementById("myDropdown").classList.add("hide");
    } else if (document.getElementById("myDropdown").classList.contains("hide")) {
        document.getElementById("myDropdown").classList.remove("hide");
        document.getElementById("myDropdown").classList.add("active");
    } else {
        document.getElementById("myDropdown").classList.remove("hide");
        document.getElementById("myDropdown").classList.add("active");
    }
}

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}
