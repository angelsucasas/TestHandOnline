$("#iterations").on("keypress", function(evt) {
  let keycode = evt.charCode || evt.keyCode;  
  if (keycode == 46 || this.value.length==7 ||keycode == 45) {
    return false;
  }
});