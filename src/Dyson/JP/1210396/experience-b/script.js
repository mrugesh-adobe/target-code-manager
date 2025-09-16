var staticVideo = {
  "972205-01":
    "https://video-eu.assetsadobe.com/dyson/_renditions_/e6c/e6cc18f6-d13b-4090-a8ec-ae7c7a07f3f4/avs/972205-01-0x720-3000k.mp4",
};

var overlay = `<div class="overlay overlay--video atVideo">
  <div class="overlay__content overlay__content--video">
    <a
      role="button"
      href="#"
      aria-label="Close video"
      class="trade-up-item__close js-video-close js-video-close-button"
    >
      <svg class="icon icon--close" viewBox="0 0 42 42">
        <path
          d="M42 2.8L39.2 0 21 18.2 2.8 0 0 2.8 18.2 21 0 39.2 2.8 42 21 23.8 39.2 42l2.8-2.8L23.8 21 42 2.8z"
        ></path>
      </svg>
    </a>
    <div class="trade-up-item__video js-video-container video-hybris">
      <video width="100%" controls autoplay playsinline>
        <source src="" type="video/mp4" />
        Your browser does not support HTML video.
      </video>
    </div>
  </div>
</div>`;

document.querySelector("body").insertAdjacentHTML("afterbegin", overlay);

(function (w, d) {
  var logInfo = function (str) {
    //console.info(str)
  };
  var Flickerlessly = w.Flickerlessly || {};
  !(function (t) {
    "use strict";
    var e = function (t, e, n, o) {
        var a = "atNodeInserted" + t,
          i = [],
          s = ["", "-moz-", "-webkit-", "-ms-", "-o-"];
        s.forEach(function (t, e) {
          i.push(
            "@" + t + "keyframes " + a + " {from {opacity:0.99} to {opacity:1}}"
          );
        }),
          i.push(e + "{"),
          s.forEach(function (t, e) {
            i.push(
              t + "animation-duration:0.001s;" + t + "animation-name:" + a + ";"
            );
          }),
          i.push("}");
        var r = d.getElementsByTagName("head")[0];
        if (r) {
          var c = d.createElement("style");
          c.setAttribute("type", "text/css"),
            c.styleSheet
              ? (c.styleSheet.cssText = i.join("\n"))
              : c.appendChild(d.createTextNode(i.join("\n"))),
            r.insertBefore(c, r.firstChild);
        }
        var l = function (t) {
          if (t.animationName === a && "object" == typeof t.target) {
            var i =
              o === !0 ||
              (o === !1 && null === t.target.getAttribute("data-flk-success"));
            w.console &&
              logInfo("('" + e + "') ready! Execute: " + i, t.target),
              "function" == typeof n && i
                ? (n(t.target), t.target.setAttribute("data-flk-success", a))
                : w.console && console.error("Cannot Callback", i, n);
          }
        };
        ["animationstart", "MSAnimationStart", "webkitAnimationStart"].forEach(
          function (t, e) {
            d.addEventListener(t, l, !1);
          }
        );
      },
      n = Math.floor(1e3 * Math.random() + 1);
    t.onReady = function () {
      for (var t = 0; t < arguments.length; t++) {
        var o = arguments[t],
          a = o.selector,
          i = o.success || null,
          s = o.persist || !1;
        e(n++, a, i, s);
      }
    };
  })(Flickerlessly);

  window.screen.width <= 767 &&
    Flickerlessly.onReady(
      {
        selector: ".basket-body__summary--section",
        success: function (el) {
          if (document.querySelector(".basket-recommendations_T546")) {
            var r = document.querySelector(".basket-recommendations_T546");
            r.remove(r);
          }

          //   if (document.querySelector('.recs-container_T546')) {
          //                 var r = document.querySelector('.recs-container_T546');
          //                 r.parentNode.removeChild(r);
          //             }
          window.scrollTo({
            left: 0,
            top: 0,
          });
          checkDatalayer();
          setTimeout(() => {
            matchHeight();
            setTimeout(() => {
              var images = document.querySelectorAll(
                ".plp-cards__image-container img"
              );
              var imageHeights = [];
              for (var i = images.length - 1; i >= 0; i--) {
                imageHeights.push(images[i].offsetHeight);
              }
              var highest = Math.max(...imageHeights);
              var lowest = Math.min(...imageHeights);
              var delta = highest - lowest;
              for (var i = images.length - 1; i >= 0; i--) {
                if (images[i].offsetHeight < highest) {
                  console.log("here");
                  console.log(
                    Number(
                      images[
                        i
                      ].parentElement.parentElement.nextElementSibling.style.minHeight.replace(
                        "px",
                        ""
                      )
                    )
                  );
                  console.log(delta);
                  images[
                    i
                  ].parentElement.parentElement.nextElementSibling.style.minHeight =
                    Number(
                      images[
                        i
                      ].parentElement.parentElement.nextElementSibling.style.minHeight.replace(
                        "px",
                        ""
                      )
                    ) +
                    delta +
                    "px";
                }
              }
            }, 0);
          }, 1500);
        },
        persist: true,
      },
      {
        selector: ".trade-up-item__play",
        success: function (el) {
          var sku = el.dataset.sku;
          el.addEventListener("click", function (e) {
            e.preventDefault();
            $(".atVideo video").attr("src", staticVideo[sku]);
            //$('.atVideo video')[0].play();
            $(".atVideo").addClass("overlay-is-open");
          });
        },
        persist: true,
      },
      {
        selector: ".js-video-close-button",
        success: function (el) {
          el.addEventListener("click", function () {
            $(".atVideo video").attr("src", "");
            $(".atVideo").removeClass("overlay-is-open");
          });
        },
        persist: true,
      },

      {
        selector: ".at_recs_card_T546 ",
        success: function (el) {
          var h2 = document.querySelector(
            ".basket-recommendations_T546 h2.text__heading.h2.hidden-xs-up"
          );
          if (h2) {
            //console.log("Header Container is present");
            //h2.innerHTML = 'Products related to items in your basket';
            h2.className = "text__heading h2";
          }
        },
        persist: true,
      },
      {
        selector:
          ".at_recs_card_T546 .button--transactional:not(.at_target_T546)",
        success: function (el) {
          el.className += " at_target_T546";
          el.addEventListener("click", addToCart);
        },
        persist: true,
      },
      /*{
              selector: ".basket-empty .basket-empty__container",
              success: function (el) {
                var recs = document.querySelector(".basket-recommendations_T546");
                if (recs) {
                  var parent = recs.parentNode;
                  parent.removeChild(recs);
                }
              },
              persist: true,
            },*/
      {
        selector: ".toolTip-icon",
        success: function (el) {
          if (
            el
              .closest(".plp-cards__item--list")
              .querySelector(".tooltip .plp-cards__description").innerHTML ===
            ""
          ) {
            el.style.display = "none";
          }

          el.addEventListener("click", function (event) {
            event.preventDefault();
            el.tabIndex = 0;
            document.querySelectorAll(".tooltip").forEach((item) => {
              item.classList.add("hide-tooltip");
            });
            const productContainer = event.target.closest(
              ".plp-cards__item--list"
            );
            event.target
              .closest(".plp-cards__item--list")
              .querySelector(".tooltip")
              .classList.remove("hide-tooltip");
            //   const tooltipheight = event.target.closest('.plp-cards__item--list').querySelector('.tooltip').offsetHeight;
            //   const listElementHeight = event.target.closest('.plp-cards__item--list').offsetHeight;
            //   document.querySelector(' .snapper_pane').style.height = listElementHeight + tooltipheight/3 + 'px';
            //   document.querySelector('.toolTip-icon .tooltip').classList.remove("hide-tooltip")
          });
        },
        persist: true,
      },
      {
        selector: ".tooltipclosebutton",
        success: function (el) {
          el.addEventListener("click", function (event) {
            event.preventDefault();

            el.tabIndex = 0;

            event.target.closest(".tooltip").classList.add("hide-tooltip");
            document
              .querySelector(" .snapper_pane")
              .style.removeProperty("height");

            //    document.querySelector('.toolTip-icon .tooltip').classList.add("hide-tooltip")
          });
        },
        persist: true,
      },
      {
        selector:
          "#skip-navigation-target > div.basket-body.parbase.js-basket-body > section > div > div.col-xs-12.col-lg-4.float-lg-right.basket-body__summary--container.sticky-initial > div > div.basket-aside__container.js-basket-aside-container.tablet.col-md-6.col-lg-12 > div:nth-child(2)",
        success: function (el) {
          var orderSummary = el;
          orderSummary.classList.add("order-summary-total");
          var appendToLoc = document.querySelector(
            "#skip-navigation-target > div.basket-body.parbase.js-basket-body > section > div > div.col-xs-12.col-lg-4.float-lg-right.basket-body__summary--container.sticky-initial > div > div.tablet.col-md-6.col-lg-12.basket-aside__payment-container > div:nth-child(3)"
          );
          appendToLoc.append(orderSummary);
          var summaryies = document.querySelectorAll(".order-summary-total");
          for (var i = 0; i < summaryies.length; i++) {
            if (i < summaryies.length - 1) {
              summaryies[i].remove();
            }
          }
          document
            .querySelector(" .basket-aside-title")
            .classList.add("top-spacing");
        },
        persist: false,
      }
      //   {
      //     selector: ".analytics-link-track",
      //     success: function (el) {
      //      el.addEventListener("click",function (event) {
      //         event.preventDefault();
      //      })
      // },
      //     persist: true,
      //   },
    );

  window.screen.width > 767 &&
    Flickerlessly.onReady(
      {
        selector: ".basket-body__summary--section",
        success: function (el) {
          if (document.querySelector(".recs-container_T546")) {
            var r = document.querySelector(".recs-container_T546");
            r.parentNode.removeChild(r);
          }
          window.scrollTo({
            left: 0,
            top: 0,
          });
          checkDatalayer();
        },
        persist: true,
      },
      {
        selector: ".trade-up-item__play",
        success: function (el) {
          var sku = el.dataset.sku;
          el.addEventListener("click", function (e) {
            e.preventDefault();
            $(".atVideo video").attr("src", staticVideo[sku]);
            //$('.atVideo video')[0].play();
            $(".atVideo").addClass("overlay-is-open");
          });
        },
        persist: true,
      },
      {
        selector: ".js-video-close-button",
        success: function (el) {
          el.addEventListener("click", function () {
            $(".atVideo video").attr("src", "");
            $(".atVideo").removeClass("overlay-is-open");
          });
        },
        persist: true,
      },

      {
        selector: ".at_recs_card_T546 ",
        success: function (el) {
          var h2 = document.querySelector(
            ".basket-recommendations_T546 h2.text__heading.h2.hidden-xs-up"
          );
          if (h2) {
            //console.log("Header Container is present");
            //h2.innerHTML = 'Products related to items in your basket';
            h2.className = "text__heading h2";
          }
        },
        persist: true,
      },
      {
        selector:
          ".at_recs_card_T546 .button--transactional:not(.at_target_T546)",
        success: function (el) {
          el.className += " at_target_T546";
          el.addEventListener("click", addToCart);
        },
        persist: true,
      }
      /* {
                selector: ".basket-empty .basket-empty__container",
                success: function (el) {
          debugger;
                    var recs = document.querySelector('.basket-recommendations_T546');
                    if (recs) {
                        var parent = recs.parentNode;
                        parent.removeChild(recs);
                    }
                },
                persist: true
            }*/
    );

  //var responseObject = [];
  var fetchData = function (base_url, sku) {
    if (
      document.querySelectorAll(
        ".basket-recommendations_T546 ul.plp-cards__items > li"
      ).length >= 3
    ) {
      return;
    }
    var xhttp = new XMLHttpRequest(),
      id = sku;
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        try {
          var res = JSON.parse(this.responseText),
            obj = {};
          console.log(res, "response object here ::;");
          obj.ratings = res["bazaarVoiceAverageRating"];
          obj.reviews = res["bazaarVoiceNumberOfReviews"];
          obj.hideWasNowPricing = res["hideWasNowPricing"];
          obj.stockBand = res["stockBand"];
          // if (res["stockBand"] !== "A") {
          //     return;
          // }

          obj.name = res.webName ? res.webName : null;

          if (!obj.name) {
            obj.name =
              res.localWebNames && res.localWebNames.en
                ? res.localWebNames.en
                : null;
          }
          if (!obj.name) {
            obj.name =
              res.globalWebNames && res.globalWebNames.en
                ? res.globalWebNames.en
                : null;
          }

          obj.fullPrice = res.price && res.price.value ? res.price.value : null;
          if (obj.fullPrice != null) {
            obj.fullPrice = obj.fullPrice.toFixed(2)?.replace(".", ".");
          }

          if (res.reducedPrice && res.reducedPrice.value) {
            obj.salePrice = res.reducedPrice.value
              .toFixed(2)
              ?.replace(".", ".");
          }

          if (res.savings && res.savings.value) {
            obj.savings = res.savings.value?.toString().replace(".", ".");
          }

          if (res.badgeText) {
            obj.badgeText = res.badgeText;
          }

          if (res.badgeThemeCode) {
            obj.badgeClass = res.badgeThemeCode;
          }

          /*if(!obj.salePrice){
                                          obj.salePrice = obj.fullPrice;
                                      }*/
          obj.url = res.url;
          obj.sku = id;

          obj.description = res["description"] || "";

          var stars = "";

          if (obj.ratings && !isNaN(Number(obj.ratings))) {
            //console.log('No ratings -> ', obj.ratings);
            var ratings = Number(obj.ratings);
            if (ratings >= 5) {
              stars = "five";
            } else if (ratings >= 4.5) {
              stars = "four-five";
            } else if (ratings >= 4) {
              stars = "four";
            } else if (ratings >= 3.5) {
              stars = "three-five";
            } else if (ratings < 3.5) {
              stars = "three";
            }

            obj.stars = stars;
          }
          console.log(id, obj, ":::::::object response");
          collectResponses(obj);
        } catch (err) {
          console.log(err);
        }
      }
    };

    //"https://api.dyson.com/apiman-gateway/dyson/product/1.0/us/"
    //https://api.dyson.co.uk/apiman-gateway/dyson/product/1.0/gb/226364-01

    xhttp.open("GET", base_url + sku, true);
    xhttp.send();
  };

  function collectResponses(product) {
    responseObject.push(product);
    if (res.length == responseObject.length) {
      for (i = 0; i < res.length; i++) {
        var objValue = responseObject.filter(
          (element) => element.sku == res[i] && element.stockBand == "A"
        );
        objValue = Object.assign({}, ...objValue);
        createProduct(objValue);
      }
    }
  }

  function createProduct(product) {
    if (
      product &&
      product.sku &&
      document.querySelectorAll(
        ".basket-recommendations_T546 ul.plp-cards__items > li"
      ).length < 3
    ) {
      var parent = document.querySelector(
        ".basket-recommendations_T546 ul.plp-cards__items"
      );
      var name = product.name,
        sku = product.sku,
        fullPrice = product.fullPrice, //.toFixed(2),
        salePrice = product.salePrice, //.toFixed(2),
        savings = product.savings,
        ratings = product.ratings,
        reviews = product.reviews,
        stars = product.stars,
        hideWasNowPricing = product.hideWasNowPricing,
        badgeText = product.badgeText || "",
        badgeClass = product.badgeClass || "",
        url = product.url;
      available = product.stockBand == "A";
      description = product.description;

      var template =
        window.screen.width <= 767
          ? document.getElementById("at_recs_item_template_mobile").innerHTML
          : document.getElementById("at_recs_item_template_desktop").innerHTML;

      template = template
        .replace(/PAGE_URL/g, url)
        .replace(/CURR/g, " ¥")
        .replace(/LNAME/g, name.toLowerCase())
        .replace(/NAME/g, name)
        .replace(/SKU/g, sku)
        .replace(/BADGECLASS/g, badgeClass)
        .replace(/BADGETEXT/g, badgeText)
        .replace(
          /IMG_URL/g,
          "https://dyson-h.assetsadobe2.com/is/image/content/dam/dyson/adobetarget/basket-recommendations/" +
            sku +
            ".jpg"
        );
      template = template.replace(/ALTR/g, name);

      if (savings && salePrice && salePrice !== fullPrice) {
        template = template
          .replace(/HIDE_SALE/g, "hidden-xs-up")
          .replace(/HIDE_DISCOUNTED/g, "")
          .replace(/FULL_PRICE/g, fullPrice)
          .replace(/SALE_PRICE/g, salePrice)
          .replace(/SAVINGS/g, savings);
      } else {
        template = template
          .replace(/HIDE_DISCOUNTED/g, "hidden-xs-up")
          .replace(/HIDE_SALE/g, "")
          .replace(/SALE_PRICE/g, fullPrice);
      }
      template = template
        .replace(/BADGE/g, badgeText)
        .replace(/BADGE_CLASS/g, badgeClass);

      //parent.setAttribute('data-analytics-action-title', name);
      if (
        document.querySelectorAll(
          ".basket-recommendations_T546 ul.plp-cards__items > li"
        ).length < 4
      ) {
        parent.insertAdjacentHTML("beforeend", template);

        if (staticVideo[sku] != undefined) {
          document
            .querySelector(
              '.at_recs_card_T546[sku="' +
                sku +
                '"] .plp-cards__image-container img'
            )
            .insertAdjacentHTML(
              "afterend",
              '<a href="#" data-analytics-action-name="link~play-video" class="trade-up-item__play trade-up-item__play--small js-product-video-trigger active" data-sku=' +
                sku +
                ' role="button" aria-label="Play "> <span class="trade-up-item__icon-wrapper"> <svg class="icon icon-play--small" viewBox="0 0 32 48"> <path d="M0 0v48l32-24zm4 8l21.3 16L4 40z"></path></svg> </span> </a>'
            );
        }

        if (description && window.screen.width <= 767) {
          console.log(description);
          document.querySelector(
            '.at_recs_card_T546[sku="' +
              sku +
              '"] + div.tooltip .plp-cards__description'
          ).innerHTML = description;
        }

        if (description && window.screen.width > 767) {
          console.log(description);
          document.querySelector(
            '.at_recs_card_T546[sku="' + sku + '"] .plp-cards__description'
          ).innerHTML = description;
        }
      }
      $(document).trigger("enhance");
      window.dispatchEvent(new Event("resize"));
    }
  }

  function checkLoggedIn() {
    return dataLayer.customer.credentialID !== "anonymous";
  }

  function checkcart() {
    var cookie = (document.cookie || "").split(";");
    for (var i = cookie.length - 1; i >= 0; i--) {
      if (cookie[i].trim().indexOf("cartguid=") > -1) {
        return decodeURIComponent(cookie[i].trim().replace("cartguid=", ""));
      }
    }
    return null;
  }

  function getCookieVal(cname) {
    var cookie = (document.cookie || "").split(";");
    for (var i = cookie.length - 1; i >= 0; i--) {
      if (cookie[i].trim().indexOf(cname + "=") > -1) {
        return decodeURIComponent(cookie[i].trim().replace(cname + "=", ""));
      }
    }
    return null;
  }

  function getcsrf() {
    var cookie = (document.cookie || "").split(";");
    for (var i = cookie.length - 1; i >= 0; i--) {
      if (cookie[i].trim().indexOf("CSRF_TOKEN=") > -1) {
        return decodeURIComponent(cookie[i].trim().replace("CSRF_TOKEN=", ""));
      }
    }
    return null;
  }

  function addToCart(e) {
    e.stopPropagation();
    e.preventDefault();
    var btn = e.target;
    jQuery(btn)
      .parents(".at_recs_card_T546.plp-cards__item.js-plp-cards-item")
      .addClass("active");

    var sku = this.getAttribute("sku");
    var xhttp = new XMLHttpRequest();
    xhttp.withCredentials = true;
    var url = "";
    if (btn && btn.getAttribute("data-basket-processing-button-text")) {
      btn.className =
        "button--transactional button--fluid active at_target_T546";
      btn.innerHTML = btn.getAttribute("data-basket-processing-button-text");
      btn.setAttribute("disabled", true);
    }
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status === 200) {
        //Refresh window

        var res = JSON.parse(this.responseText);
        //console.log('ADDTOBASKET', typeof res, this.responseText);
        if (typeof res === "object") {
          if (res.statusCode === "success") {
            if (btn) {
              btn.innerHTML = "&nbsp";
              btn.className =
                "button--transactional button--fluid completed_T791 active at_target_T546";
            }
            setTimeout(function () {
              window.location.reload();
            }, 500);
          }
        }
      } else if (this.readyState === 4 && this.status !== 200) {
        if (btn && btn.getAttribute("data-basket-processing-button-text")) {
          btn.className = "button--transactional at_target_T546";
          btn.innerHTML = "Add to cart";
          btn.removeAttribute("disabled");
        }
      }
    };
    var product = JSON.stringify({
      product: {
        code: sku,
      },
      quantity: 1,
    });
    if (checkLoggedIn()) {
      url =
        window.CART_BASE_URL_T546 +
        "users/" +
        dataLayer.customer.credentialID +
        "/carts/current";
    } else {
      //Not logged In
      var cartId = getCookieVal("cartguid");
      if (cartId) {
        url =
          window.CART_BASE_URL_T546 +
          "users/anonymous/carts/" +
          cartId.replace(/\"/g, "") +
          "/entries";
      } else {
        //create new cart
        url =
          window.CART_BASE_URL_T546 +
          "users/anonymous/carts/createCart?lang=en";
      }
    }
    xhttp.open("POST", url + ("?code=" + sku + "&lang=en"), true);
    xhttp.setRequestHeader("Accept", "application/json");
    xhttp.setRequestHeader("Content-type", "application/json");
    //xhttp.setRequestHeader("Cookie", ("CSRF_TOKEN=" + getcsrf() + ";path=www.dyson.com"));
    xhttp.setRequestHeader("x-csrf-token", getCookieVal("CSRF_TOKEN") || "");

    xhttp.send(product);
  }

  var timeOut = 10000;

  var getCartAccessories = function () {
    var res = [];
    if (dataLayer && dataLayer.products && Array.isArray(dataLayer.products)) {
      var products = dataLayer.products;
      for (var i = products.length - 1; i >= 0; i--) {
        if (
          products[i].localProductSKU &&
          (products[i].sapDivision === "SPARE_PARTS" ||
            products[i].sapDivision === "ACCESSORIES")
        ) {
          res.push(products[i].localProductSKU);
        }
      }
    }
    return res;
  };

  function randomiseArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  }

  function checkDatalayer() {
    if (dataLayer && dataLayer.products && dataLayer.products.length > 0) {
      var products = dataLayer.products || [];
      var statKeys = Object.keys(window.staticIds);

      for (var i = products.length - 1; i >= 0; i--) {
        if (
          products[i].sapDivision &&
          products[i].sapDivision === "FINISHED_GOODS"
        ) {
          sku = products[i].localProductSKU;
          if (
            !window.showForProducts ||
            window.showForProducts.length === 0 ||
            window.showForProducts.indexOf(sku) > -1 ||
            statKeys.indexOf(sku.toString()) > -1
          ) {
            document
              .querySelector(
                ".basket-items__container.js-basket-items-container"
              )
              .insertAdjacentHTML(
                "afterend",
                document.getElementById("at_template_recs_T546").innerHTML
              );
            if (window.staticIds[sku]) {
              fetchStaticIds(sku);
              //debugger;
            } else {
              fetchAccessories(sku);
            }

            break;
          }
        }
      }
    } else {
      if (timeOut > 0) {
        timeOut -= 50;
        setTimeout(checkDatalayer, 50);
      }
    }
  }

  var res = [];
  var responseObject = [];

  function fetchStaticIds(sku) {
    res = [];
    responseObject = [];
    var tools = window.staticIds[sku];
    var basketPageProduct = dataLayer.products.map((x) => x.globalProductSKU);
    tools = tools.filter((item) => basketPageProduct.indexOf(item) == -1);
    var addedAccessories = getCartAccessories();
    for (var i = 0; i < tools.length; i++) {
      if (addedAccessories.indexOf(tools[i]) === -1) {
        res.push(tools[i]);
      }
    }
    /* Commented to have the same order of items*/
    //randomiseArray(res);
    for (var i = 0; i < res.length; i++) {
      fetchData(BASE_URL, res[i]);
    }
  }

  function fetchAccessories(sku) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        // Typical action to be performed when the document is ready:
        //document.getElementById("demo").innerHTML = xhttp.responseText;
        var res = JSON.parse(this.responseText) || {};
        var tools = res.productReferences || [];
        var set = new Set();
        var includedTools = getIncluded();

        for (var i = tools.length - 1; i >= 0; i--) {
          if (tools[i].referenceType === "CONSISTS_OF") {
            //console.log('CONSISTS_OF', tools[i].target.webName);
          } else if (tools[i].referenceType === "SPAREPART") {
            //console.log('SPAREPART', tools[i].target.webName);
          } else if (tools[i].referenceType === "ACCESSORIES") {
            //console.log('ACCESSORIES', tools[i].target.webName);
          }
          if (
            tools[i].target.sapDivision === "SPARE_PARTS" ||
            tools[i].target.sapDivision === "ACCESSORIES"
          ) {
            //set.add(tools[i].target.code);
            if (includedTools.indexOf(tools[i].target.webName || "") === -1) {
              //console.log('productReferences', tools[i].target.code, tools[i].target.sapDivision);
              set.add(tools[i].target.code);
            }
          }
        }

        //console.log(tools, includedTools, Array.from(set));
        tools = Array.from(set);
        for (var i = 0; i < tools.length; i++) {
          fetchData(BASE_URL, tools[i]);
        }
        //triggerCustomMbox(sku, Array.from(set));
      }
    };
    xhttp.open("GET", BASE_URL + sku, true);
    xhttp.send();
  }

  function getIncluded() {
    var els = document.querySelectorAll(
        ".basket-item-accordion__section-bundle.basket-item-accordion__section-bundle--included .basket-item-accordion__content-flex .basket-item-accordion__content--tools .basket-item-accordion__bundle-text .basket-item-accordion__bundle-tool-name"
      ),
      res = [];
    for (var i = els.length - 1; i >= 0; i--) {
      res.push(els[i].innerHTML);
    }
    if (dataLayer && dataLayer.products && Array.isArray(dataLayer.products)) {
      var products = dataLayer.products;
      for (var i = products.length - 1; i >= 0; i--) {
        if (
          products[i].localWebNames &&
          products[i].localWebNames.en &&
          (products[i].sapDivision === "SPARE_PARTS" ||
            products[i].sapDivision === "ACCESSORIES")
        ) {
          res.push(products[i].localWebNames.en);
        }
      }
    }
    return res;
  }
})(window, document);
