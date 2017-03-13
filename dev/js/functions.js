// Check if an element has scrolled into view
// set offset to a number to start doing stuff a little
// bit before they actually appear
function isScrolledIntoView(el, offset) {
    if (typeof offset === 'undefined') offset = 0;
    var elemTop = el.getBoundingClientRect().top;
    var elemBottom = el.getBoundingClientRect().bottom;
    var elemHeight = elemBottom - elemTop;

    if (offset > 0) {
      elemTop = elemTop + offset;
      elemBottom = elemBottom - offset;
    }

    var isVisible = (elemTop >= 0) && (elemBottom <= window.innerHeight);
    return isVisible;
}

// Decode HTML special characters
function htmlDecode(input){
  var e = document.createElement('div');
  e.innerHTML = input;
  return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
}

// cancel event
function cancelEvent(event) {
   if (event.preventDefault) { 
      event.preventDefault();
   } else {
      event.returnValue = false; 
   }
}

// Check if variable is numeric
function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

// Get useful stuff from a youtube or vimeo link
function parseVideoURL(url) {

    function getParm(url, base) {
        var re = new RegExp("(\\?|&)" + base + "\\=([^&]*)(&|$)");
        var matches = url.match(re);
        if (matches) {
            return(matches[2]);
        } else {
            return("");
        }
    }

    var retVal = {};
    var matches;
    var success = false;

    if ( url.match('http(s)?://(www.)?youtube|youtu\.be') ) {
      if (url.match('embed')) { retVal.id = url.split(/embed\//)[1].split('"')[0]; }
        else { retVal.id = url.split(/v\/|v=|youtu\.be\//)[1].split(/[?&]/)[0]; }
        retVal.provider = "youtube";
        retVal.videoUrl = 'https://www.youtube.com/embed/' + retVal.id + '?rel=0';
        success = true;
    } else if (matches = url.match(/vimeo.com\/(\d+)/)) {
        retVal.provider = "vimeo";
        retVal.id = matches[1];
        retVal.videoUrl = 'http://player.vimeo.com/video/' + retVal.id;
        success = true;
    }

  if (success) {
    return retVal;
  }
  else { 
  	return false;
  }
}

// Serialize objects
$.fn.serializeObject = function()
{
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};

// Return cookie value by name
function getCookie(name) {
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length == 2) return parts.pop().split(";").shift();
}

