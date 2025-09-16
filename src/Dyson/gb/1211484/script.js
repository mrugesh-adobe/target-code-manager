
    if (!Element.prototype.matches) {
        Element.prototype.matches =
            Element.prototype.msMatchesSelector ||
            Element.prototype.webkitMatchesSelector;
    }

    if (!Element.prototype.closest) {
        Element.prototype.closest = function (s) {
            var el = this;

            do {
                if (Element.prototype.matches.call(el, s)) return el;
                el = el.parentElement || el.parentNode;
            } while (el !== null && el.nodeType === 1);
            return null;
        };
    }

    Flickerlessly = window.Flickerlessly || {}, !function (t) { "use strict"; var e = function (t, e, a, n) { var i = "atNodeInserted" + t, s = "@keyframes " + i + " {from {opacity:0.99} to {opacity:1} }\n"; s += e + "{animation-duration:0.001s;animation-name:" + i + ";visibility:visible}"; var o = document.getElementsByTagName("head")[0]; if (o) { var r = document.createElement("style"); r.setAttribute("type", "text/css"), r.styleSheet ? r.styleSheet.cssText = s : r.appendChild(document.createTextNode(s)), o.insertBefore(r, o.firstChild) } var c = function (t) { if (t.animationName === i && "object" == typeof t.target) { var s = n === !0 || n === !1 && null === t.target.getAttribute("data-flk-success") ? !0 : !1; console && console.info && console.info("Node " + e + " ready! Execute: " + s, t.target), "function" == typeof a && s && (a(t.target), t.target.setAttribute("data-flk-success", i)), t.target.style.visibility = "visible" } };["animationstart", "MSAnimationStart", "webkitAnimationStart"].forEach(function (t, e) { document.addEventListener(t, c, !1) }) }; t.onReady = function () { for (var t = 0; t < arguments.length; t++) { var a = arguments[t], n = a.selector, i = a.success || null, s = a.persist || !1, o = Math.floor(100 * Math.random() + 1); e(o, n, i, s) } } }(Flickerlessly);
    // Local cache to store all selected answers across steps
    var hmcAnswers = {};

    Flickerlessly.onReady({
       selector: "[data-testid='question-grid'] > div",
  persist: true,
  success: function (el) {
    el.addEventListener("click", function () {

      // Get all selected questions
      var selectedEls = document.querySelectorAll("[data-testid='question-grid'] > div[aria-checked='true'] h3");
      var selectedTexts = Array.from(selectedEls).map(el => el.innerText.trim());
      var profileValue = selectedTexts.join("|");

      // Get current step number from DOM
      var stepEl = document.querySelector(".stepsCounter-0-0-32");
      var stepNum = 1; // fallback
        if (stepEl && stepEl.innerText) {
            var match = stepEl.innerText.trim().match(/^(\d+)\s*\/\s*\d+$/);
            if (match) {
                stepNum = parseInt(match[1], 10);
            }
        } else {
            // Alternative DOM structure check
            var backButtonEl = document.getElementById("zv-back-button");
            if (backButtonEl && backButtonEl.innerText) {
                var text = backButtonEl.innerText.trim();
                var lastChar = text.charAt(text.length - 1);
                if (!isNaN(parseInt(lastChar))) {
                    stepNum = parseInt(lastChar) + 1;
                }
            }
        }

      // Store in cache
      hmcAnswers["hmcQuestion" + stepNum] = profileValue;

      // Always send ALL collected answers so far
      var profileParams = { ...hmcAnswers };

      // Add tool name
      var pageTitle = window?.dataLayer?.pageInfo?.pageTitle?.split(' | ')?.[1]?.split(' ')?.join('-') ?? '';
      profileParams["hmcTool"] = pageTitle;

      console.log("Current step:", stepNum, "| Profile params:", profileParams);

      // Build params with "profile." prefix
      var targetParams = {};
      Object.keys(profileParams).forEach(function (key) {
        targetParams["profile." + key] = profileParams[key];
      });

      // Send to Adobe Target
      adobe.target.getOffer({
        "mbox": "help-me-mbox",
        "params": targetParams, // ✅ all profile params passed here
        "success": function (offer) {
          adobe.target.applyOffer({
            "mbox": "help-me-mbox",
            "offer": offer
          });
        },
        "error": function (status, error) {
          console.error("Target error:", status, error);
        }
      });
    });
  }
    })