return function(element) {
  var log_nm = 'Dim: Clicked Element Identifier - ';
  var log = _satellite.logger;
  var errlog = _satellite.getVar("Util: Error Code Storage");
  
  // get ancestor element of actual clicked element in case it is a nested span or image.
  var el = _satellite.getVar('Util: First Ancestor')(element, '[data-modal],a,button,[data-gtm-name],div.swe_embed');
  
  console.log('Clicked Element:', el);
  
  //var event = {{Event}};
  var image = el.querySelector('svg') || el.querySelector('img');
  //var navigationType = window.performance.navigation.type;
  var pageSection = 'unknown';
  var components = '';
  var tagName = el.tagName;
  var elementName = '';
  var out;
  try {
    // Get Element Name
    if (el) {
      if (el.dataset.gtmName) { //if we have data-gtm-name attribute use it
        if (el.dataset.productName) { // Added below if else condition for ticket: DA-11231
          var dataProductName = el.dataset.productName;
          var updatedProductName = dataProductName.toLowerCase().replace(/\s+/g, '-');
          elementName = 'compareproduct~'+ updatedProductName;
        } else {
          elementName = el.dataset.gtmName;
        }
      } else if (el.parentElement.dataset.gtmName) {// or the parent has a data-gtm-name attribute?
          if (el.parentElement.dataset.productName) { // Added below if else condition for ticket: DA-11231
            var parentDataProductName = el.parentElement.dataset.productName;
            var parentUpdatedProductName = parentDataProductName.toLowerCase().replace(/\s+/g, '-');
            elementName = 'compareproduct~'+ parentUpdatedProductName;
          } else {
            elementName = el.parentElement.dataset.gtmName;
          }
      } else {
        elementName = 'no heading';
        // check headers and p elements
        var txt_target = el.querySelector('h1,h2,h3,h4,h5,p');
        if (!!txt_target) elementName = txt_target.innerText.slice(0, 75);
        // next check 1st div with text
        else {
          var divs = el.querySelectorAll('div');
          var divs_length = divs.length;
          if (divs.length > 0) {
            for (var i = 0; i < divs_length; i++) {
              if (divs[i].innerText) txt_target = divs[i];
              break;
            }
          }
          if (txt_target) elementName = txt_target.innerText.slice(0, 75);
          // Next look for any innerText value

          else if (el.innerText) {
            elementName = el.innerText.slice(0, 75);
          }
          //next look for any img and get the alt value
          else if (image && image.alt) {
            elementName = image.alt.slice(0, 75);
          }
          // try and find class names or IDS 
          // in nav element
          else if (el.id) {
            elementName = '#' + el.id.trim().slice(0, 75);
          } else if (el.className) {
            elementName = '.' + el.className.trim().slice(0, 75);
          }
          // in nested svg or img 
          else if (image && image.className) {
            elementName = '.' + image.getAttribute('class').trim().slice(0, 75);
          }
          //lastly return any text not picked up by innerText (i.e. hidden,style or script)
          else if (el.textContent) {
            elementName = el.textContent.trim().slice(0, 75);
          }
        }
        elementName = '~' + elementName.toLowerCase().trim();
      }
    }

    // Get Page Section
    var checkParent = function(parentNode, childNode) {
      if ('contains' in parentNode) {
        return parentNode.contains(childNode);
      } else {
        return parentNode.compareDocumentPosition(childNode) % 16;
      }
    };

    var sections = {
      'main': document.getElementsByTagName('main')[0],
      'header': document.getElementsByTagName('header')[0],
      'footer': document.getElementsByTagName('footer')[0],
      'aside': document.getElementsByTagName('aside')[0]

    };

    for (var p in sections) {
      if (sections.hasOwnProperty(p)) {
        if (sections[p] !== undefined) {
          if (checkParent(sections[p], el)) {
            pageSection = p;
          }
        }
      }
    }

    //Page Components
    var componentArr = [];
    while (el.parentNode) {
      if (el.dataset.gtmComponent) {
        componentArr.unshift(el.dataset.gtmComponent);
      }
      el = el.parentNode;
    }
    components = componentArr.join(':');

    out = (pageSection + '|' + components + '|' + elementName + '|' + tagName).toLowerCase();
    //}

  } catch (err) {
    log.error(log_nm, err);
    errlog('TMS-D015-00');
  } finally {
    return (out).toLowerCase();
  }
};