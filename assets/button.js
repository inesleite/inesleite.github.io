(function() {

  function copy() {
    var element = document.getElementById('input');
  
    element.select();
    document.execCommand('copy');
    element.blur();
  }

})();