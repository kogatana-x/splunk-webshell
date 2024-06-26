/*

 |       __ _____                     ________                              __
 |      / // _  /__ __ _____ ___ __ _/__  ___/__ ___ ______ __ __  __ ___  / /
 |  __ / // // // // // _  // _// // / / // _  // _//     // //  \/ // _ \/ /
 | /  / // // // // // ___// / / // / / // ___// / / / / // // /\  // // / /__
 | \___//____ \\___//____//_/ _\_  / /_//____//_/ /_/ /_//_//_/ /_/ \__\_\___/
 |           \/              /____/                              version 0.7.6
 http://terminal.jcubic.pl

 Licensed under GNU LGPL Version 3 license
 Copyright (c) 2011-2013 Jakub Jankiewicz <http://jcubic.pl>

 Includes:

 Storage plugin Distributed under the MIT License
 Copyright (c) 2010 Dave Schindler

 jQuery Timers licenced with the WTFPL
 <http://jquery.offput.ca/every/>

 Cross-Browser Split 1.1.1
 Copyright 2007-2012 Steven Levithan <stevenlevithan.com>
 Available under the MIT License

 Date: Sun, 08 Sep 2013 08:20:42 +0000
*/
(function (d, R) {
    function ta(c, e) { var i; if (typeof c === "string" && typeof e === "string") { localStorage[c] = e; return true } else if (typeof c === "object" && typeof e === "undefined") { for (i in c) if (c.hasOwnProperty(i)) localStorage[i] = c[i]; return true } return false } function ka(c, e) {
        var i, g; i = new Date; i.setTime(i.getTime() + 31536E6); i = "; expires=" + i.toGMTString(); if (typeof c === "string" && typeof e === "string") { document.cookie = c + "=" + e + i + "; path=/"; return true } else if (typeof c === "object" && typeof e === "undefined") {
            for (g in c) if (c.hasOwnProperty(g)) document.cookie =
                g + "=" + c[g] + i + "; path=/"; return true
        } return false
    } function ua(c) { return localStorage[c] } function va(c) { var e, i, g; c += "="; e = document.cookie.split(";"); for (i = 0; i < e.length; i++) { for (g = e[i]; g.charAt(0) === " ";)g = g.substring(1, g.length); if (g.indexOf(c) === 0) return g.substring(c.length, g.length) } return null } function wa(c) { return delete localStorage[c] } function xa(c) { return ka(c, "", -1) } function ia(c, e) { var i = [], g = c.length; if (g < e) return [c]; for (var l = 0; l < g; l += e)i.push(c.substring(l, l + e)); return i } function ya(c) {
        var e =
            c ? [c] : []; d.extend(this, { size: function () { return e.length }, pop: function () { if (e.length === 0) return null; else { var i = e[e.length - 1]; e = e.slice(0, e.length - 1); return i } }, push: function (i) { e = e.concat([i]); return i }, top: function () { return e.length > 0 ? e[e.length - 1] : null } })
    } function za(c, e) {
        var i = true; if (typeof c === "string" && c !== "") c += "_"; var g = d.Storage.get(c + "commands"); g = g ? (new Function("return " + g + ";"))() : []; var l = g.length - 1; d.extend(this, {
            append: function (o) {
                if (i) if (g[g.length - 1] !== o) {
                    g.push(o); l = g.length - 1; if (e &&
                        g.length > e) g = g.slice(-e); d.Storage.set(c + "commands", d.json_stringify(g))
                }
            }, data: function () { return g }, next: function () { l < g.length - 1 && ++l; if (l !== -1) return g[l] }, reset: function () { l = g.length - 1 }, last: function () { return g[length - 1] }, end: function () { return l === g.length - 1 }, position: function () { return l }, previous: function () { var o = l; l > 0 && --l; if (o !== -1) return g[o] }, clear: function () { g = []; this.purge() }, enabled: function () { return i }, enable: function () { i = true }, purge: function () { d.Storage.remove(c + "commands") }, disable: function () {
                i =
                false
            }
        })
    } function ja(c, e) { var i = c.split(/(\s+)/); return { name: i[0], args: e(i.slice(2).join("")) } } function la(c) { var e = d('<div class="terminal"><span>&nbsp;</span></div>').appendTo("body"), i = e.find("span").width(); e.remove(); e = Math.floor(c.width() / i); if (ha(c)) { c = c.innerWidth() - c.width(); e -= Math.ceil((20 - c / 2) / (i - 1)) } return e } function ha(c) { return c.get(0).scrollHeight > c.innerHeight() } d.omap = function (c, e) { var i = {}; d.each(c, function (g, l) { i[g] = e.call(c, g, l) }); return i }; var da = typeof window.localStorage !==
        "undefined"; d.extend({ Storage: { set: da ? ta : ka, get: da ? ua : va, remove: da ? wa : xa } }); jQuery.fn.extend({ everyTime: function (c, e, i, g, l) { return this.each(function () { jQuery.timer.add(this, c, e, i, g, l) }) }, oneTime: function (c, e, i) { return this.each(function () { jQuery.timer.add(this, c, e, i, 1) }) }, stopTime: function (c, e) { return this.each(function () { jQuery.timer.remove(this, c, e) }) } }); jQuery.extend({
            timer: {
                guid: 1, global: {}, regex: /^([0-9]+)\s*(.*s)?$/, powers: { ms: 1, cs: 10, ds: 100, s: 1E3, das: 1E4, hs: 1E5, ks: 1E6 }, timeParse: function (c) {
                    if (c ===
                        R || c === null) return null; var e = this.regex.exec(jQuery.trim(c.toString())); return e[2] ? parseInt(e[1], 10) * (this.powers[e[2]] || 1) : c
                }, add: function (c, e, i, g, l, o) {
                    var A = 0; if (jQuery.isFunction(i)) { l || (l = g); g = i; i = e } e = jQuery.timer.timeParse(e); if (!(typeof e !== "number" || isNaN(e) || e <= 0)) {
                        if (l && l.constructor !== Number) { o = !!l; l = 0 } l = l || 0; o = o || false; if (!c.$timers) c.$timers = {}; c.$timers[i] || (c.$timers[i] = {}); g.$timerID = g.$timerID || this.guid++; var k = function () {
                            if (!(o && k.inProgress)) {
                                k.inProgress = true; if (++A > l && l !== 0 ||
                                    g.call(c, A) === false) jQuery.timer.remove(c, i, g); k.inProgress = false
                            }
                        }; k.$timerID = g.$timerID; c.$timers[i][g.$timerID] || (c.$timers[i][g.$timerID] = window.setInterval(k, e)); this.global[i] || (this.global[i] = []); this.global[i].push(c)
                    }
                }, remove: function (c, e, i) {
                    var g = c.$timers, l; if (g) {
                        if (e) {
                            if (g[e]) {
                                if (i) { if (i.$timerID) { window.clearInterval(g[e][i.$timerID]); delete g[e][i.$timerID] } } else for (var o in g[e]) if (g[e].hasOwnProperty(o)) { window.clearInterval(g[e][o]); delete g[e][o] } for (l in g[e]) if (g[e].hasOwnProperty(l)) break;
                                if (!l) { l = null; delete g[e] }
                            }
                        } else for (var A in g) g.hasOwnProperty(A) && this.remove(c, A, i); for (l in g) if (g.hasOwnProperty(l)) break; if (!l) c.$timers = null
                    }
                }
            }
        }); if (jQuery.browser && jQuery.browser.msie || /(msie) ([\w.]+)/.exec(navigator.userAgent.toLowerCase())) jQuery(window).one("unload", function () { var c = jQuery.timer.global, e; for (e in c) if (c.hasOwnProperty(e)) for (var i = c[e], g = i.length; --g;)jQuery.timer.remove(i[g], e) }); (function (c) {
            if (String.prototype.split.toString().match(/\[native/)) {
                var e = String.prototype.split,
                i = /()??/.exec("")[1] === c, g; g = function (l, o, A) {
                    if (Object.prototype.toString.call(o) !== "[object RegExp]") return e.call(l, o, A); var k = [], x = (o.ignoreCase ? "i" : "") + (o.multiline ? "m" : "") + (o.extended ? "x" : "") + (o.sticky ? "y" : ""), B = 0, D, v, y; o = RegExp(o.source, x + "g"); l += ""; i || (D = RegExp("^" + o.source + "$(?!\\s)", x)); for (A = A === c ? 4294967295 : A >>> 0; v = o.exec(l);) {
                        x = v.index + v[0].length; if (x > B) {
                            k.push(l.slice(B, v.index)); !i && v.length > 1 && v[0].replace(D, function () {
                                for (var F = 1; F < arguments.length - 2; F++)if (arguments[F] === c) v[F] =
                                    c
                            }); v.length > 1 && v.index < l.length && Array.prototype.push.apply(k, v.slice(1)); y = v[0].length; B = x; if (k.length >= A) break
                        } o.lastIndex === v.index && o.lastIndex++
                    } if (B === l.length) { if (y || !o.test("")) k.push("") } else k.push(l.slice(B)); return k.length > A ? k.slice(0, A) : k
                }; String.prototype.split = function (l, o) { return g(this, l, o) }; return g
            }
        })(); d.json_stringify = function (c, e) {
            var i = "", g; e = e === R ? 1 : e; switch (typeof c) {
                case "function": i += c; break; case "boolean": i += c ? "true" : "false"; break; case "object": if (c === null) i += "null";
                else if (c instanceof Array) { i += "["; var l = c.length; for (g = 0; g < l - 1; ++g)i += d.json_stringify(c[g], e + 1); i += d.json_stringify(c[l - 1], e + 1) + "]" } else { i += "{"; for (l in c) if (c.hasOwnProperty(l)) i += '"' + l + '":' + d.json_stringify(c[l], e + 1); i += "}" } break; case "string": l = c; var o = { "\\\\": "\\\\", '"': '\\"', "/": "\\/", "\\n": "\\n", "\\r": "\\r", "\\t": "\\t" }; for (g in o) if (o.hasOwnProperty(g)) l = l.replace(RegExp(g, "g"), o[g]); i += '"' + l + '"'; break; case "number": i += String(c)
            }i += e > 1 ? "," : ""; if (e === 1) i = i.replace(/,([\]}])/g, "$1"); return i.replace(/([\[{]),/g,
                "$1")
        }; d.fn.cmd = function (c) {
            function e() { b.toggleClass("inverted") } function i() { K = "(reverse-i-search)`" + F + "': "; Z() } function g(f) { var t = P.data(), L = t.length; if (f && G > 0) L -= G; if (F.length > 0) for (var S = F.length; S > 0; S--) { f = RegExp("^" + F.substring(0, S)); for (var Y = L; Y--;)if (f.test(t[Y])) { G = t.length - Y; r = 0; k.set(t[Y], true); I(); if (F.length !== S) { F = F.substring(0, S); i() } return } } } function l(f) { var t = f.substring(0, D - v); f = f.substring(D - v); return [t].concat(ia(f, D)) } function o() {
                B.focus(); k.oneTime(1, function () {
                    k.insert(B.val());
                    B.blur().val("")
                })
            } function A(f) {
                var t; if (typeof c.keydown == "function") { t = c.keydown(f); if (t !== R) return t } if (T) {
                    if (f.which !== 38 && !(f.which === 80 && f.ctrlKey)) ba = true; if (y && (f.which === 35 || f.which === 36 || f.which === 37 || f.which === 38 || f.which === 39 || f.which === 40 || f.which === 13 || f.which === 27)) { K = H; y = false; G = null; F = ""; Z(); if (f.which === 27) n = ""; I(); A.call(this, f) } else if (f.altKey) { if (f.which === 68) { k.set(n.slice(0, r) + n.slice(r).replace(/[^ ]+ |[^ ]+$/, ""), true); return false } return true } else if (f.keyCode === 13) {
                        if (P &&
                            n && (c.historyFilter && c.historyFilter(n) || !c.historyFilter)) P.append(n); f = n; P.reset(); k.set(""); c.commands && c.commands(f); typeof K === "function" && Z()
                    } else if (f.which === 8) if (y) { F = F.slice(0, -1); i() } else { if (n !== "" && r > 0) { n = n.slice(0, r - 1) + n.slice(r, n.length); --r; I() } } else if (f.which === 9 && !(f.ctrlKey || f.altKey)) k.insert("\t"); else if (f.which === 46) { if (n !== "" && r < n.length) { n = n.slice(0, r) + n.slice(r + 1, n.length); I() } return true } else if (P && f.which === 38 || f.which === 80 && f.ctrlKey) { if (ba) Q = n; ba = false; k.set(P.previous()) } else if (P &&
                        f.which === 40 || f.which === 78 && f.ctrlKey) k.set(P.end() ? Q : P.next()); else if (f.which === 37 || f.which === 66 && f.ctrlKey) if (f.ctrlKey && f.which !== 66) { t = r - 1; f = 0; for (n[t] === " " && --t; t > 0; --t)if (n[t] === " " && n[t + 1] !== " ") { f = t + 1; break } else if (n[t] === "\n" && n[t + 1] !== "\n") { f = t; break } k.position(f) } else { if (r > 0) { --r; I() } } else if (f.which === 82 && f.ctrlKey) if (y) g(true); else { H = K; i(); Q = n; n = ""; I(); y = true } else if (f.which == 71 && f.ctrlKey) { if (y) { K = H; Z(); n = Q; I(); y = false } } else if (f.which === 39 || f.which === 70 && f.ctrlKey) if (f.ctrlKey && f.which !==
                            70) { n[r] === " " && ++r; f = n.slice(r).match(/\S[\n\s]{2,}|[\n\s]+\S?/); if (!f || f[0].match(/^\s+$/)) r = n.length; else if (f[0][0] !== " ") r += f.index + 1; else { r += f.index + f[0].length - 1; f[0][f[0].length - 1] !== " " && --r } I() } else { if (r < n.length) { ++r; I() } } else if (f.which === 123) return true; else if (f.which === 36) k.position(0); else if (f.which === 35) k.position(n.length); else if (f.shiftKey && f.which == 45) { o(); return true } else if (f.ctrlKey || f.metaKey) {
                                if (f.which === 192) return true; if (f.metaKey) if (f.which === 82) return true; else if (f.which ===
                                    76) return true; if (f.shiftKey) { if (f.which === 84) return true } else if (f.which === 87) { if (n !== "") { f = n.slice(0, r); t = n.slice(r + 1); var L = f.match(/([^ ]+ *$)/); r = f.length - L[0].length; n = f.slice(0, r) + t; I() } } else if (f.which === 72) { if (n !== "" && r > 0) { n = n.slice(0, --r); if (r < n.length - 1) n += n.slice(r); I() } } else if (f.which === 65) k.position(0); else if (f.which === 69) k.position(n.length); else if (f.which === 88 || f.which === 67 || f.which === 84) return true; else if (f.which === 86) { o(); return true } else if (f.which === 75) if (r === 0) k.set(""); else r !==
                                        n.length && k.set(n.slice(0, r)); else if (f.which === 85) { k.set(n.slice(r, n.length)); k.position(0) }
                            } else return true; return false
                }
            } var k = this, x = k.data("cmd"); if (x) return x; k.addClass("cmd"); k.append('<span class="prompt"></span><span></span><span class="cursor">&nbsp;</span><span></span>'); var B = d("<textarea/>").addClass("clipboard").appendTo(k); c.width && k.width(c.width); var D, v, y = false, F = "", G = null, H, M = c.mask || false, n = "", r = 0, K, T = c.enabled, ea = c.historySize || 60, N, P, b = k.find(".cursor"), I = function (f) {
                function t(z,
                    C) { if (C === z.length) { X.html(d.terminal.encode(z, true)); b.html("&nbsp;"); m.html("") } else if (C === 0) { X.html(""); b.html(d.terminal.encode(z.slice(0, 1), true)); m.html(d.terminal.encode(z.slice(1), true)) } else { var E = d.terminal.encode(z.slice(0, C), true); X.html(E); E = z.slice(C, C + 1); b.html(E === " " ? "&nbsp;" : d.terminal.encode(E, true)); C === z.length - 1 ? m.html("") : m.html(d.terminal.encode(z.slice(C + 1), true)) } } function L(z) { return "<div>" + d.terminal.encode(z, true) + "</div>" } function S(z) {
                        var C = m; d.each(z, function (E, s) {
                            C =
                            d(L(s)).insertAfter(C).addClass("clear")
                        })
                    } function Y(z) { d.each(z, function (C, E) { X.before(L(E)) }) } var X = b.prev(), m = b.next(); return function () {
                        var z = M ? n.replace(/./g, "*") : n, C, E; f.find("div").remove(); X.html(""); if (z.length > D - v - 1 || z.match(/\n/)) {
                            var s, u = z.match(/\t/g), a = u ? u.length * 3 : 0; if (u) z = z.replace(/\t/g, "\u0000\u0000\u0000\u0000"); if (z.match(/\n/)) {
                                var h = z.split("\n"); E = D - v - 1; for (C = 0; C < h.length - 1; ++C)h[C] += " "; if (h[0].length > E) { s = [h[0].substring(0, E)]; s = s.concat(ia(h[0].substring(E), D)) } else s = [h[0]];
                                for (C = 1; C < h.length; ++C)if (h[C].length > D) s = s.concat(ia(h[C], D)); else s.push(h[C])
                            } else s = l(z); if (u) s = d.map(s, function (p) { return p.replace(/\x00\x00\x00\x00/g, "\t") }); E = s[0].length; if (!(E === 0 && s.length === 1)) if (r < E) { t(s[0], r); S(s.slice(1)) } else if (r === E) { X.before(L(s[0])); t(s[1], 0); S(s.slice(2)) } else {
                                C = s.length; if (r < E) { t(s[0], r); S(s.slice(1)) } else if (r === E) { X.before(L(s[0])); t(s[1], 0); S(s.slice(2)) } else {
                                    u = s.slice(-1)[0]; h = z.length - r; var j = u.length; z = 0; if (h <= j) { Y(s.slice(0, -1)); t(u, (j === h ? 0 : j - h) + a) } else if (C ===
                                        3) { X.before("<div>" + d.terminal.encode(s[0], true) + "</div>"); t(s[1], r - E - 1); m.after('<div class="clear">' + d.terminal.encode(s[2], true) + "</div>") } else { z = r; for (C = 0; C < s.length; ++C) { E = s[C].length; if (z > E) z -= E; else break } E = s[C]; a = C; if (z === E.length) { z = 0; E = s[++a] } t(E, z); Y(s.slice(0, a)); S(s.slice(a + 1)) }
                                }
                            }
                        } else if (z === "") { X.html(""); b.html("&nbsp;"); m.html("") } else t(z, r)
                    }
            }(k), Q, Z = function () {
                function f(L) { v = d("<div>" + d.terminal.strip(L) + "</div>").text().length; t.html(d.terminal.format(d.terminal.encode(L))) } var t =
                    k.find(".prompt"); return function () { switch (typeof K) { case "string": f(K); break; case "function": K(f) } }
            }(), ba = true, J = []; d.extend(k, {
                name: function (f) { if (f !== R) { N = f; P = new za(f, ea); (f = J.length) && !J[f - 1].enabled() && P.disable(); J.push(P); return k } else return N }, purge: function () { for (var f = J.length; f--;)J[f].purge(); J = []; return k }, history: function () { return P }, set: function (f, t) { if (f !== R) { n = f; if (!t) r = n.length; I(); if (typeof c.onCommandChange === "function") c.onCommandChange(n) } return k }, insert: function (f, t) {
                    if (r ===
                        n.length) n += f; else n = r === 0 ? f + n : n.slice(0, r) + f + n.slice(r); t || (r += f.length); I(); if (typeof c.onCommandChange === "function") c.onCommandChange(n); return k
                }, get: function () { return n }, commands: function (f) { if (f) { c.commands = f; return k } else return f }, destroy: function () { d(document.documentElement || window).unbind(".cmd"); k.stopTime("blink", e); k.find(".cursor").next().remove().end().prev().remove().end().remove(); k.find(".prompt, .clipboard").remove(); k.removeClass("cmd").removeData("cmd"); return k }, prompt: function (f) {
                    if (f ===
                        R) return K; else { if (typeof f === "string" || typeof f === "function") K = f; else throw "prompt must be a function or string"; Z(); I(); return k }
                }, position: function (f) { if (typeof f === "number") { r = f < 0 ? 0 : f > n.length ? n.length : f; I(); return k } else return r }, visible: function () { var f = k.visible; return function () { f.apply(k, []); I(); Z() } }(), show: function () { var f = k.show; return function () { f.apply(k, []); I(); Z() } }(), resize: function (f) { if (f) D = f; else { f = k.width(); var t = b.innerWidth(); D = Math.floor(f / t) } I(); return k }, enable: function () {
                    if (!T) {
                        b.addClass("inverted");
                        k.everyTime(500, "blink", e); T = true
                    } return k
                }, isenabled: function () { return T }, disable: function () { if (T) { k.stopTime("blink", e); b.removeClass("inverted"); T = false } return k }, mask: function (f) { if (typeof f === "boolean") { M = f; I(); return k } else return M }
            }); k.name(c.name || c.prompt || ""); K = c.prompt || "> "; Z(); if (c.enabled === R || c.enabled === true) k.enable(); d(document.documentElement || window).bind("keypress.cmd", function (f) {
                var t; if (f.ctrlKey && f.which === 99) return true; if (!y && typeof c.keypress === "function") t = c.keypress(f);
                if (t === R || t) { if (T) if (d.inArray(f.which, [38, 13, 0, 8]) > -1 && f.keyCode !== 123 && !(f.which === 38 && f.shiftKey)) return false; else if (!f.ctrlKey && !(f.altKey && f.which === 100) || f.altKey) { if (y) { F += String.fromCharCode(f.which); g(); i() } else k.insert(String.fromCharCode(f.which)); return false } } else return t
            }).bind("keydown.cmd", A); k.data("cmd", k); return k
        }; var Aa = /(\[\[[gbiuso]*;[^;]*;[^\]]*\](?:[^\]]*\\\][^\]]*|[^\]]*|[^\[]*\[[^\]]*)\]?)/, ma = /\[\[([gbiuso]*);([^;]*);([^;\]]*);?([^;\]]*);?([^\]]*)\]([^\]]*\\\][^\]]*|[^\]]*|[^\[]*\[[^\]]*)\]?/g,
            na = /\[\[([gbiuso]*;[^;\]]*;[^;\]]*(?:;|[^\]()]*);?[^\]]*)\]([^\]]*\\\][^\]]*|[^\]]*|[^\[]*\[[^\]]*)\]?/gi, oa = /#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})/, Ba = /https?:\/\/(?:(?!&[^;]+;)[^\s:"'<>)])+/g, Ca = /((([^<>('")[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,})))/g, pa = /('[^']*'|"(\\"|[^"])*"|\/(\\\/|[^\/])*\/|(\\ |[^ ])+|[\w-]+)/g, qa = /(\[\[[gbiuso]*;[^;]*;[^\]]*\])/, ra = /\[\[[gbiuso]*;[^;]*;[^\]]*\]?$/; d.terminal =
            {
                split_equal: function (c, e) {
                    for (var i = false, g = false, l = "", o = [], A = c.replace(na, function (M, n, r) { M = n.match(/;/g).length; return "[[" + n + (M == 2 ? ";;" : M == 3 ? ";" : "") + r.replace(/\\\]/g, "&#93;").replace(/\n/g, "\\n") + "]" + r + "]" }).split(/\n/g), k = 0, x = A.length; k < x; ++k)if (A[k] === "") o.push(""); else for (var B = A[k], D = 0, v = 0, y = 0, F = B.length; y < F; ++y) {
                        if (B[y] === "[" && B[y + 1] === "[") i = true; else if (i && B[y] === "]") if (g) g = i = false; else g = true; else if (i && g || !i) if (B[y] === "&") {
                            var G = B.substring(y).match(/^(&[^;]+;)/); if (!G) throw "Unclosed html entity in line " +
                                (k + 1) + " at char " + (y + 1); y += G[1].length - 2; y === F - 1 && o.push(H + G[1]); continue
                        } else if (B[y] === "]" && B[y - 1] === "\\") --v; else ++v; if (v === e || y === F - 1) { var H = B.substring(D, y + 1); if (l) { H = l + H; if (H.match("]")) l = "" } D = y + 1; v = 0; if (G = H.match(na)) { G = G[G.length - 1]; if (G[G.length - 1] !== "]") { l = G.match(qa)[1]; H += "]" } else if (H.match(ra)) { H = H.replace(ra, ""); l = G.match(qa)[1] } } o.push(H) }
                    } return o
                }, encode: function (c, e) {
                    c = e ? c.replace(/&(?![^=]+=)/g, "&amp;") : c.replace(/&(?!#[0-9]+;|[a-zA-Z]+;|[^= "]+=[^=])/g, "&amp;"); return c.replace(/</g,
                        "&lt;").replace(/>/g, "&gt;").replace(/ /g, "&nbsp;").replace(/\t/g, "&nbsp;&nbsp;&nbsp;&nbsp;")
                }, format: function (c, e) {
                    var i = d.extend({}, { linksNoReferrer: false }, e || {}); if (typeof c === "string") {
                        var g = c.split(Aa); if (g && g.length > 1) c = d.map(g, function (l) {
                            return l === "" ? l : l.substring(0, 1) === "[" ? l.replace(ma, function (o, A, k, x, B, D, v) {
                                if (v === "") return ""; v = v.replace(/\\]/g, "]"); o = ""; if (A.indexOf("b") !== -1) o += "font-weight:bold;"; var y = []; A.indexOf("u") !== -1 && y.push("underline"); A.indexOf("s") !== -1 && y.push("line-through");
                                A.indexOf("o") !== -1 && y.push("overline"); if (y.length) o += "text-decoration:" + y.join(" ") + ";"; if (A.indexOf("i") !== -1) o += "font-style:italic;"; if (k.match(oa)) { o += "color:" + k + ";"; if (A.indexOf("g") !== -1) o += "text-shadow:0 0 5px " + k + ";" } if (x.match(oa)) o += "background-color:" + x; return '<span style="' + o + '"' + (B !== "" ? ' class="' + B + '"' : "") + ' data-text="' + (D === "" ? v : D.replace(/&#93;/g, "]")).replace('"', "&quote;") + '">' + v + "</span>"
                            }) : "<span>" + l + "</span>"
                        }).join(""); return d.map(c.split(/(<\/?span[^>]*>)/g), function (l) {
                            return l.match(/span/) ?
                                l : l.replace(Ba, function (o) { var A = o.match(/\.$/); o = o.replace(/\.$/, ""); return '<a target="_blank" ' + (i.linksNoReferer ? ' rel="noreferrer" ' : "") + 'href="' + o + '">' + o + "</a>" + (A ? "." : "") }).replace(Ca, '<a href="mailto:$1">$1</a>')
                        }).join("").replace(/<span><br\/?><\/span>/g, "<br/>")
                    } else return ""
                }, escape_brackets: function (c) { return c.replace(/\[/g, "&#91;").replace(/\]/g, "&#93;") }, strip: function (c) { return c.replace(ma, "$6") }, active: function () { return $.front() }, from_ntroff: function (c) {
                    return c.replace(/((?:_\x08.|.\x08_)+)/g,
                        function (e) { return "[[u;;]" + e.replace(/_x08|\x08_|_\u0008|\u0008_/g, "") + "]" }).replace(/((?:.\x08.)+)/g, function (e) { return "[[b;#fff;]" + e.replace(/(.)(?:\x08|\u0008)(.)/g, function (i, g, l) { return l }) + "]" })
                }, ansi_colors: {
                    normal: { black: "#000", red: "#A00", green: "#008400", yellow: "#A50", blue: "#00A", magenta: "#A0A", cyan: "#0AA", white: "#AAA" }, faited: { black: "#000", red: "#640000", green: "#006100", yellow: "#737300", blue: "#000087", magenta: "#650065", cyan: "#008787", white: "#818181" }, bold: {
                        black: "#000", red: "#F55", green: "#44D544",
                        yellow: "#FF5", blue: "#55F", magenta: "#F5F", cyan: "#5FF", white: "#FFF"
                    }, palette: ["#000000", "#AA0000", "#00AA00", "#AA5500", "#0000AA", "#AA00AA", "#00AAAA", "#AAAAAA", "#555555", "#FF5555", "#55FF55", "#FFFF55", "#5555FF", "#FF55FF", "#55FFFF", "#FFFFFF", "#000000", "#00005F", "#000087", "#0000AF", "#0000D7", "#0000FF", "#005F00", "#005F5F", "#005F87", "#005FAF", "#005FD7", "#005FFF", "#008700", "#00875F", "#008787", "#0087AF", "#0087D7", "#00AF00", "#00AF5F", "#00AF87", "#00AFAF", "#00AFD7", "#00AFFF", "#00D700", "#00D75F", "#00D787", "#00D7AF",
                        "#00D7D7", "#00D7FF", "#00FF00", "#00FF5F", "#00FF87", "#00FFAF", "#00FFD7", "#00FFFF", "#5F0000", "#5F005F", "#5F0087", "#5F00AF", "#5F00D7", "#5F00FF", "#5F5F00", "#5F5F5F", "#5F5F87", "#5F5FAF", "#5F5FD7", "#5F5FFF", "#5F8700", "#5F875F", "#5F8787", "#5F87AF", "#5F87D7", "#5F87FF", "#5FAF00", "#5FAF5F", "#5FAF87", "#5FAFAF", "#5FAFD7", "#5FAFFF", "#5FD700", "#5FD75F", "#5FD787", "#5FD7AF", "#5FD7D7", "#5FD7FF", "#5FFF00", "#5FFF5F", "#5FFF87", "#5FFFAF", "#5FFFD7", "#5FFFFF", "#870000", "#87005F", "#870087", "#8700AF", "#8700D7", "#8700FF", "#875F00",
                        "#875F5F", "#875F87", "#875FAF", "#875FD7", "#875FFF", "#878700", "#87875F", "#878787", "#8787AF", "#8787D7", "#8787FF", "#87AF00", "#87AF5F", "#87AF87", "#87AFAF", "#87AFD7", "#87AFFF", "#87D700", "#87D75F", "#87D787", "#87D7AF", "#87D7D7", "#87D7FF", "#87FF00", "#87FF5F", "#87FF87", "#87FFAF", "#87FFD7", "#87FFFF", "#AF0000", "#AF005F", "#AF0087", "#AF00AF", "#AF00D7", "#AF00FF", "#AF5F00", "#AF5F5F", "#AF5F87", "#AF5FAF", "#AF5FD7", "#AF5FFF", "#AF8700", "#AF875F", "#AF8787", "#AF87AF", "#AF87D7", "#AF87FF", "#AFAF00", "#AFAF5F", "#AFAF87", "#AFAFAF",
                        "#AFAFD7", "#AFAFFF", "#AFD700", "#AFD75F", "#AFD787", "#AFD7AF", "#AFD7D7", "#AFD7FF", "#AFFF00", "#AFFF5F", "#AFFF87", "#AFFFAF", "#AFFFD7", "#AFFFFF", "#D70000", "#D7005F", "#D70087", "#D700AF", "#D700D7", "#D700FF", "#D75F00", "#D75F5F", "#D75F87", "#D75FAF", "#D75FD7", "#D75FFF", "#D78700", "#D7875F", "#D78787", "#D787AF", "#D787D7", "#D787FF", "#D7AF00", "#D7AF5F", "#D7AF87", "#D7AFAF", "#D7AFD7", "#D7AFFF", "#D7D700", "#D7D75F", "#D7D787", "#D7D7AF", "#D7D7D7", "#D7D7FF", "#D7FF00", "#D7FF5F", "#D7FF87", "#D7FFAF", "#D7FFD7", "#D7FFFF", "#FF0000",
                        "#FF005F", "#FF0087", "#FF00AF", "#FF00D7", "#FF00FF", "#FF5F00", "#FF5F5F", "#FF5F87", "#FF5FAF", "#FF5FD7", "#FF5FFF", "#FF8700", "#FF875F", "#FF8787", "#FF87AF", "#FF87D7", "#FF87FF", "#FFAF00", "#FFAF5F", "#FFAF87", "#FFAFAF", "#FFAFD7", "#FFAFFF", "#FFD700", "#FFD75F", "#FFD787", "#FFD7AF", "#FFD7D7", "#FFD7FF", "#FFFF00", "#FFFF5F", "#FFFF87", "#FFFFAF", "#FFFFD7", "#FFFFFF", "#080808", "#121212", "#1C1C1C", "#262626", "#303030", "#3A3A3A", "#444444", "#4E4E4E", "#585858", "#626262", "#6C6C6C", "#767676", "#808080", "#8A8A8A", "#949494", "#9E9E9E",
                        "#A8A8A8", "#B2B2B2", "#BCBCBC", "#C6C6C6", "#D0D0D0", "#DADADA", "#E4E4E4", "#EEEEEE"]
                }, from_ansi: function () {
                    var c = { 30: "black", 31: "red", 32: "green", 33: "yellow", 34: "blue", 35: "magenta", 36: "cyan", 37: "white", 39: "white" }, e = { 40: "black", 41: "red", 42: "green", 43: "yellow", 44: "blue", 45: "magenta", 46: "cyan", 47: "white", 49: "black" }; return function (i) {
                        var g = i.split(/(\x1B\[[0-9;]*[A-Za-z])/g); if (g.length == 1) return i; i = []; if (g.length > 3 && g.slice(0, 3).join("") == "[0m") g = g.slice(3); for (var l = false, o, A, k, x, B = 0; B < g.length; ++B)if (x =
                            g[B].match(/^\x1B\[([0-9;]*)([A-Za-z])$/)) switch (x[2]) {
                                case "m": if (x[1] === "") continue; if (x[1] !== "0") {
                                    var D = x[1].split(";"), v = void 0, y = k = false, F = false, G = [], H = "", M = "", n = false, r = false, K = false, T = d.terminal.ansi_colors.palette, ea = void 0; for (ea in D) {
                                        v = parseInt(D[ea], 10); switch (v) {
                                            case 1: G.push("b"); F = true; k = false; break; case 4: G.push("u"); break; case 3: G.push("i"); break; case 5: K = true; break; case 38: n = true; break; case 48: r = true; break; case 2: k = true; F = false; break; case 7: y = true; break; default: if (n && K && T[v - 1]) H =
                                                T[v - 1]; else if (c[v]) H = c[v]; if (r && K && T[v - 1]) M = T[v - 1]; else if (e[v]) M = e[v]
                                        }if (v !== 5) K = false
                                    } if (y) if (H && M) { D = M; M = H; H = D } else { H = "black"; M = "white" } D = void 0; v = void 0; D = F ? v = d.terminal.ansi_colors.bold : k ? v = d.terminal.ansi_colors.faited : v = d.terminal.ansi_colors.normal; k = [G.join(""), n ? H : D[H], r ? M : v[M]]
                                } else k = ["", ""]; if (l) { i.push("]"); if (x[1] == "0") { l = false; o = A = "" } else { k[1] = k[1] || o; k[2] = k[2] || A; i.push("[[" + k.join(";") + "]"); if (k[1]) o = k[1]; if (k[2]) A = k[2] } } else {
                                    l = true; i.push("[[" + k.join(";") + "]"); if (k[1]) o = k[1]; if (k[2]) A =
                                        k[2]
                                }
                            } else i.push(g[B]); l && i.push("]"); return i.join("")
                    }
                }(), parseArguments: function (c) {
                    return d.map(c.match(pa) || [], function (e) {
                        if (e[0] === "'" && e[e.length - 1] === "'") return e.replace(/^'|'$/g, ""); else if (e[0] === '"' && e[e.length - 1] === '"') {
                            e = e.replace(/^"|"$/g, "").replace(/\\([" ])/g, "$1"); return e.replace(/\\\\|\\t|\\n/g, function (i) { return i[1] === "t" ? "\t" : i[1] === "n" ? "\n" : "\\" }).replace(/\\x([0-9a-f]+)/gi, function (i, g) { return String.fromCharCode(parseInt(g, 16)) }).replace(/\\0([0-7]+)/g, function (i, g) {
                                return String.fromCharCode(parseInt(g,
                                    8))
                            })
                        } else return e[0] === "/" && e[e.length - 1] == "/" ? RegExp(e.replace(/^\/|\/$/g, "")) : e.match(/^-?[0-9]+$/) ? parseInt(e, 10) : e.match(/^[-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?$/) ? parseFloat(e) : e.replace(/\\ /g, " ")
                    })
                }, splitArguments: function (c) { return d.map(c.match(pa) || [], function (e) { return e[0] === "'" && e[e.length - 1] === "'" ? e.replace(/^'|'$/g, "") : e[0] === '"' && e[e.length - 1] === '"' ? e.replace(/^"|"$/g, "").replace(/\\([" ])/g, "$1") : e[0] === "/" && e[e.length - 1] == "/" ? e : e.replace(/\\ /g, " ") }) }, parseCommand: function (c) {
                    return ja(c,
                        d.terminal.parseArguments)
                }, splitCommand: function (c) { return ja(c, d.terminal.splitArguments) }, test: function () {
                    function c(x, B) { e.echo(B + " &#91;" + (x ? "[[b;#44D544;]PASS]" : "[[b;#FF5555;]FAIL]") + "&#93;") } var e = d("body").terminal(d.noop).css("margin", 0); e.outerHeight(); e.height(); d(window).resize(function () { e.css("height", d(window).height() - 20) }).resize(); e.echo("Testing..."); var i = 'name "foo bar" baz /^asd [x]/ str\\ str 10 1e10', g = d.terminal.splitCommand(i); c(g.name === "name" && g.args[0] === "foo bar" && g.args[1] ===
                        "baz" && g.args[2] === "/^asd [x]/" && g.args[3] === "str str" && g.args[4] === "10" && g.args[5] === "1e10", "$.terminal.splitCommand"); g = d.terminal.parseCommand(i); c(g.name === "name" && g.args[0] === "foo bar" && g.args[1] === "baz" && d.type(g.args[2]) === "regexp" && g.args[2].source === "^asd [x]" && g.args[3] === "str str" && g.args[4] === 10 && g.args[5] === 1E10, "$.terminal.parseCommand"); c(d.terminal.from_ansi("\u001b[2;31;46mFoo\u001b[1;3;4;32;45mBar\u001b[0m\u001b[7mBaz") === "[[;#640000;#008787]Foo][[biu;#44D544;#F5F]Bar][[;#000;#AAA]Baz]",
                            "$.terminal.from_ansi"); i = "[[biugs;#fff;#000]Foo][[i;;;foo]Bar][[ous;;]Baz]"; e.echo("$.terminal.format"); c(d.terminal.format(i) === '<span style="font-weight:bold;text-decoration:underline line-through;font-style:italic;color:#fff;text-shadow:0 0 5px #fff;background-color:#000" data-text="Foo">Foo</span><span style="font-style:italic;" class="foo" data-text="Bar">Bar</span><span style="text-decoration:underline line-through overline;" data-text="Baz">Baz</span>', "\tformatting"); c(d.terminal.format("http://terminal.jcubic.pl/examples.php https://www.google.com/?q=jquery%20terminal") ===
                                '<a target="_blank" href="http://terminal.jcubic.pl/examples.php">http://terminal.jcubic.pl/examples.php</a> <a target="_blank" href="https://www.google.com/?q=jquery%20terminal">https://www.google.com/?q=jquery%20terminal</a>', "\turls"); c(d.terminal.format("foo@bar.com baz.quux@example.com") === '<a href="mailto:foo@bar.com">foo@bar.com</a> <a href="mailto:baz.quux@example.com">baz.quux@example.com</a>', "\temails"); c(d.terminal.strip("-_-[[biugs;#fff;#000]Foo]-_-[[i;;;foo]Bar]-_-[[ous;;]Baz]-_-") ===
                                    "-_-Foo-_-Bar-_-Baz-_-", "$.terminal.strip"); i = "[[bui;#fff;]Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sed dolor nisl, in suscipit justo. Donec a enim et est porttitor semper at vitae augue. Proin at nulla at dui mattis mattis. Nam a volutpat ante. Aliquam consequat dui eu sem convallis ullamcorper. Nulla suscipit, massa vitae suscipit ornare, tellus] est [[b;;#f00]consequat nunc, quis blandit elit odio eu arcu. Nam a urna nec nisl varius sodales. Mauris iaculis tincidunt orci id commodo. Aliquam] non magna quis [[i;;]tortor malesuada aliquam] eget ut lacus. Nam ut vestibulum est. Praesent volutpat tellus in eros dapibus elementum. Nam laoreet risus non nulla mollis ac luctus [[ub;#fff;]felis dapibus. Pellentesque mattis elementum augue non sollicitudin. Nullam lobortis fermentum elit ac mollis. Nam ac varius risus. Cras faucibus euismod nulla, ac auctor diam rutrum sit amet. Nulla vel odio erat], ac mattis enim.";
                    e.echo("$.terminal.split_equal"); g = [10, 40, 60, 400]; for (var l = g.length; l--;) { for (var o = d.terminal.split_equal(i, g[l]), A = true, k = 0; k < o.length; ++k)if (d.terminal.strip(o[k]).length > g[l]) { A = false; break } c(A, "\tsplit " + g[l]) }
                }
            }; d.fn.visible = function () { return this.css("visibility", "visible") }; d.fn.hidden = function () { return this.css("visibility", "hidden") }; var Da = 0; d.jrpc = function (c, e, i, g, l) {
                e = d.json_stringify({ jsonrpc: "2.0", method: e, params: i, id: ++Da }); return d.ajax({
                    url: c, data: e, success: g, error: l, contentType: "application/json",
                    dataType: "json", async: true, cache: false, type: "POST"
                })
            }; da = / {13}$/; var Ea = [["jQuery Terminal", "(c) 2011-2013 jcubic"], ["jQuery Terminal Emulator v. 0.7.6", "Copyright (c) 2011-2013 Jakub Jankiewicz <http://jcubic.pl>".replace(/ *<.*>/, "")], ["jQuery Terminal Emulator version version 0.7.6", "Copyright (c) 2011-2013 Jakub Jankiewicz <http://jcubic.pl>".replace(/^Copyright /, "")], ["      _______                 ________                        __", "     / / _  /_ ____________ _/__  ___/______________  _____  / /",
                " __ / / // / // / _  / _/ // / / / _  / _/     / /  \\/ / _ \\/ /", "/  / / // / // / ___/ // // / / / ___/ // / / / / /\\  / // / /__", "\\___/____ \\\\__/____/_/ \\__ / /_/____/_//_/ /_/ /_/  \\/\\__\\_\\___/", "         \\/          /____/                                   ".replace(da, "") + "version 0.7.6", "Copyright (c) 2011-2013 Jakub Jankiewicz <http://jcubic.pl>"], ["      __ _____                     ________                              __", "     / // _  /__ __ _____ ___ __ _/__  ___/__ ___ ______ __ __  __ ___  / /",
                " __ / // // // // // _  // _// // / / // _  // _//     // //  \\/ // _ \\/ /", "/  / // // // // // ___// / / // / / // ___// / / / / // // /\\  // // / /__", "\\___//____ \\\\___//____//_/ _\\_  / /_//____//_/ /_/ /_//_//_/ /_/ \\__\\_\\___/", "          \\/              /____/                                          ".replace(da, "") + "version 0.7.6", "Copyright (c) 2011-2013 Jakub Jankiewicz <http://jcubic.pl>"]]; d.terminal.defaults = {
                    prompt: "> ", history: true, exit: true, clear: true, enabled: true, historySize: 60,
                    checkArity: true, displayExceptions: true, cancelableAjax: true, processArguments: true, linksNoReferrer: false, login: null, outputLimit: -1, tabcompletion: null, historyFilter: null, onInit: d.noop, onClear: d.noop, onBlur: d.noop, onFocus: d.noop, onTerminalChange: d.noop, onExit: d.noop, keypress: d.noop, keydown: d.noop
                }; var fa = [], $ = new function (c) {
                    var e = c ? [c] : [], i = 0; d.extend(this, {
                        get: function () { return e }, rotate: function () { if (e.length === 1) return e[0]; else { if (i === e.length - 1) i = 0; else ++i; return e[i] } }, length: function () { return e.length },
                        set: function (g) { for (var l = e.length; l--;)if (e[l] === g) { i = l; return } this.append(g) }, front: function () { return e[i] }, append: function (g) { e.push(g) }
                    })
                }; d.fn.terminal = function (c, e) {
                    function i(a) { return typeof m.processArguments === "function" ? ja(a, m.processArguments) : m.processArguments ? d.terminal.parseCommand(a) : d.terminal.splitCommand(a) } function g(a) {
                        if (typeof a === "string") b.echo(a); else if (a instanceof Array) b.echo(d.map(a, function (h) { return d.json_stringify(h) }).join(" ")); else typeof a === "object" ? b.echo(d.json_stringify(a)) :
                            b.echo(a)
                    } function l(a) { var h = function (j, p) { b.pause(); d.jrpc(a, j, p, function (q) { q.error ? b.error("&#91;RPC&#93; " + q.error.message) : g(q.result); b.resume() }, function (q, w) { w !== "abort" && b.error("&#91;AJAX&#93; " + w + " - Server reponse is: \n" + q.responseText); b.resume() }) }; return function (j, p) { if (j !== "") { j = i(j); if (!m.login || j.name === "help") h(j.name, j.args); else { var q = p.token(); q ? h(j.name, [q].concat(j.args)) : p.error("&#91;AUTH&#93; Access denied (no token)") } } } } function o(a, h) {
                        return function (j, p) {
                            if (j !== "") {
                                j =
                                i(j); var q = a[j.name], w = d.type(q); if (w === "function") if (h && q.length !== j.args.length) b.error("&#91;Arity&#93; wrong number of arguments. Function '" + j.name + "' expect " + q.length + " got " + j.args.length); else return q.apply(b, j.args); else if (w === "object" || w === "string") { var U = []; if (w === "object") { for (var V in q) q.hasOwnProperty(V) && U.push(V); q = o(q, h) } p.push(q, { prompt: j.name + "> ", name: j.name, completion: w === "object" ? function (O, aa, W) { W(U) } : R }) } else p.error("Command '" + j.name + "' Not Found")
                            }
                        }
                    } function A(a, h) {
                        h =
                        h || d.noop; var j = d.type(a), p = {}; if (j === "string") {
                            b.pause(); d.jrpc(a, "system.describe", [], function (U) {
                                var V = []; if (U.procs) {
                                    var O = {}; d.each(U.procs, function (aa, W) {
                                        V.push(W.name); O[W.name] = function () {
                                            var ca = Array.prototype.slice.call(arguments); if (m.checkArity && W.params && W.params.length !== ca.length) b.error("&#91;Arity&#93; wrong number of arguments.Function '" + W.name + "' expect " + W.params.length + " got " + ca.length); else {
                                                b.pause(); d.jrpc(a, W.name, ca, function (ga) {
                                                    ga.error ? b.error("&#91;RPC&#93; " + ga.error.message) :
                                                    g(ga.result); b.resume()
                                                }, function (ga, sa) { sa !== "abort" && b.error("&#91;AJAX&#93; " + sa + " - Server reponse is: \n" + ga.responseText); b.resume() })
                                            }
                                        }
                                    }); p.interpreter = o(O, false); p.completion = function (aa, W, ca) { ca(V) }
                                } else { p.interpreter = l(a); p.completion = m.completion } b.resume(); h(p)
                            }, function () { p.completion = m.completion; p.interpreter = l(a); h(p) })
                        } else if (j === "object") { var q = [], w; for (w in a) q.push(w); p.interpreter = o(a, true); p.completion = function (U, V, O) { O(q) }; h(p) } else if (j !== "function") throw j + " is invalid interpreter value";
                        else h({ interpreter: a, completion: m.completion })
                    } function k(a) { return typeof a === "string" ? a : typeof a.fileName === "string" ? a.fileName + ": " + a.message : a.message } function x(a, h) { if (m.displayExceptions) { var j = k(a); b.error("&#91;" + h + "&#93;: " + j); if (typeof a.fileName === "string") { b.pause(); d.get(a.fileName, function (p) { b.resume(); var q = a.lineNumber - 1; (p = p.split("\n")[q]) && b.error("&#91;" + a.lineNumber + "&#93;: " + p) }) } a.stack && b.error(a.stack) } } function B() {
                        var a = Q.prop ? Q.prop("scrollHeight") : Q.attr("scrollHeight");
                        Q.scrollTop(a)
                    } function D(a, h) { try { if (typeof h === "function") h(function () { }); else if (typeof h !== "string") throw a + " must be string or function"; } catch (j) { x(j, a.toUpperCase()); return false } return true } function v(a, h) {
                        try {
                            var j = d.extend({ raw: false, finalize: d.noop }, h || {}); a = d.type(a) === "function" ? a() : a; a = d.type(a) === "string" ? a : String(a); var p, q; j.raw || (a = d.terminal.encode(a)); a = d.terminal.from_ntroff(a); a = d.terminal.from_ansi(a); N.push(P); if (!j.raw && (a.length > L || a.match(/\n/))) {
                                var w = d.terminal.split_equal(a,
                                    L); p = 0; for (q = w.length; p < q; ++p)if (w[p] === "" || w[p] === "\r") N.push("&nbsp"); else j.raw ? N.push(w[p]) : N.push(d.terminal.format(w[p], { linksNoReferer: m.linksNoReferer }))
                            } else { j.raw || (a = d.terminal.format(a, { linksNoReferer: m.linksNoReferer })); N.push(a) } N.push(j.finalize)
                        } catch (U) { N = []; alert("Internal Exception(draw_line):" + k(U) + "\n" + U.stack) }
                    } function y() {
                        try {
                            var a; if (m.outputLimit >= 0) {
                                var h = b.rows(), j = m.outputLimit === 0 ? h : m.outputLimit; h = 0; for (var p, q = d("<div/>"), w = N.length; w--;)if (typeof N[w] === "function") {
                                    p =
                                    N[w]; a = d("<div/>")
                                } else if (N[w] === P) { a.prependTo(q); try { p(a) } catch (U) { x(U, "USER:echo(finalize)") } } else { a.prepend("<div>" + N[w] + "</div>"); if (++h === j) { if (N[w - 1] !== P) try { p(a) } catch (V) { x(V, "USER:echo(finalize)") } break } } q.children().appendTo(f)
                            } else d.each(N, function (aa, W) { if (W === P) a = d("<div></div>"); else if (typeof W === "function") { a.appendTo(f); try { W(a) } catch (ca) { x(ca, "USER:echo(finalize)") } } else d("<div/>").html(W).appendTo(a).width("100%") }); B(); N = []
                        } catch (O) { alert("flush " + k(O) + "\n" + O.stack) }
                    } function F() {
                        if (m.greetings ===
                            R) b.echo(b.signature); else m.greetings && b.echo(m.greetings)
                    } function G(a) { a = d.terminal.escape_brackets(d.terminal.encode(a, true)); var h = u.prompt(); if (u.mask()) a = a.replace(/./g, "*"); typeof h === "function" ? h(function (j) { b.echo(j + a) }) : b.echo(h + a) } function H(a, h) {
                        try {
                            Z = a; var j = s.top(); if (a === "exit" && m.exit) if (s.size() === 1) if (m.login) n(); else { h || G(a); b.echo("You can't exit from main interpeter") } else b.pop("exit"); else {
                                h || G(a); var p = J.length - 1; if (a === "clear" && m.clear) b.clear(); else {
                                    var q = j.interpreter(a,
                                        b); if (q !== R) { if (p === J.length - 1) { J.pop(); q !== false && b.echo(q) } else J = q === false ? J.slice(0, p).concat(J.slice(p + 1)) : J.slice(0, p).concat([q]).concat(J.slice(p + 1)); b.resize() }
                                }
                            }
                        } catch (w) { x(w, "USER"); b.resume(); throw w; }
                    } function M() {
                        var a = null; u.prompt("login: "); m.history && u.history().disable(); u.commands(function (h) {
                            try {
                                G(h); if (a) {
                                    u.mask(false); b.pause(); if (typeof m.login !== "function") throw "Value of login property must be a function"; m.login(a, h, function (p) {
                                        if (p) {
                                            var q = m.name; q = (q ? q + "_" : "") + t + "_"; d.Storage.set(q +
                                                "token", p); d.Storage.set(q + "login", a); u.commands(H); T()
                                        } else { b.error("Wrong password try again"); u.prompt("login: "); a = null } b.resume()
                                    }, b)
                                } else { a = h; u.prompt("password: "); u.mask(true) }
                            } catch (j) { x(j, "LOGIN", b); throw j; }
                        })
                    } function n() {
                        if (typeof m.onBeforelogout === "function") try { if (m.onBeforelogout(b) === false) return } catch (a) { x(a, "onBeforelogout"); throw a; } var h = (m.name ? m.name + "_" : "") + t + "_"; d.Storage.remove(h + "token"); d.Storage.remove(h + "login"); m.history && u.history().disable(); M(); if (typeof m.onAfterlogout ===
                            "function") try { m.onAfterlogout(b) } catch (j) { x(j, "onAfterlogout"); throw j; }
                    } function r(a) { var h = (m.name ? m.name + "_" : "") + t + "_interpreters", j = d.Storage.get(h); j = j ? (new Function("return " + j + ";"))() : []; if (d.inArray(a, j) == -1) { j.push(a); d.Storage.set(h, d.json_stringify(j)) } } function K() { var a = s.top(), h = (m.name ? m.name + "_" : "") + t + (I.length ? "_" + I.join("_") : ""); r(h); u.name(h); typeof a.prompt == "function" ? u.prompt(function (j) { a.prompt(j, b) }) : u.prompt(a.prompt); u.set(""); if (typeof a.onStart === "function") a.onStart(b) }
                    function T() { K(); m.history && u.history().enable(); F(); if (typeof m.onInit === "function") try { m.onInit(b) } catch (a) { x(a, "OnInit"); throw a; } } function ea(a) {
                        var h, j; h = s.top(); if (d.type(h.keydown) === "function") { h = h.keydown(a, b); if (h !== R) return h } b.oneTime(10, function () { C() }); if (d.type(m.keydown) === "function") { h = m.keydown(a, b); if (h !== R) return h } if (b.paused()) {
                            if (a.which === 68 && a.ctrlKey) {
                                if (fa.length) {
                                    for (j = fa.length; j--;) { a = fa[j]; if (4 !== a.readyState) try { a.abort() } catch (p) { b.error("error in aborting ajax") } } fa =
                                        []; b.resume()
                                } return false
                            }
                        } else {
                            if (a.which !== 9) ba = 0; if (a.which === 68 && a.ctrlKey) { if (u.get() === "") if (s.size() > 1 || m.login !== R) b.pop(""); else { b.resume(); b.echo("") } else b.set_command(""); return false } else if (m.tabcompletion && a.which === 9) {
                                ++ba; var q = u.get().substring(0, u.position()); a = q.split(" "); var w; if (a.length == 1) w = a[0]; else { w = a[a.length - 1]; for (j = a.length - 1; j > 0; j--)if (a[j - 1][a[j - 1].length - 1] == "\\") w = a[j - 1] + " " + w; else break } a = w.replace(/([\^\$\[\]\(\)\+\*\.\|])/g, "\\$1"); var U = RegExp("^" + a); s.top().completion(b,
                                    w, function (V) { if (u.get().substring(0, u.position()) === q) { var O = []; for (j = V.length; j--;)U.test(V[j]) && O.push(V[j]); if (O.length === 1) b.insert(O[0].replace(U, "")); else if (O.length > 1) if (ba >= 2) { G(q); b.echo(O.join("\t")); ba = 0 } else { V = false; var aa = w.length; a: for (; aa < O[0].length; ++aa) { for (j = 1; j < O.length; ++j)if (O[0].charAt(aa) !== O[j].charAt(aa)) break a; V = true } V && b.insert(O[0].slice(0, aa).replace(U, "")) } } }); return false
                            } else if (a.which === 86 && a.ctrlKey) b.oneTime(1, function () { B() }); else if (a.which === 9 && a.ctrlKey) {
                                if ($.length() >
                                    1) { b.focus(false); return false }
                            } else if (a.which === 34) b.scroll(b.height()); else a.which === 33 ? b.scroll(-b.height()) : b.attr({ scrollTop: b.attr("scrollHeight") })
                        }
                    } var N = [], P = 1, b = this; if (this.length > 1) return this.each(function () { d.fn.terminal.call(d(this), c, d.extend({ name: b.selector }, e)) }); else {
                        if (b.data("terminal")) return b.data("terminal"); if (b.length === 0) throw 'Sorry, but terminal said that "' + b.selector + '" is not valid selector!'; var I = [], Q, Z, ba = 0, J = [], f, t = $.length(), L, S, Y, X = [], m = d.extend({}, d.terminal.defaults,
                            { name: b.selector }, e || {}), z = !m.enabled; d.extend(b, d.omap({
                                clear: function () { f.html(""); u.set(""); J = []; try { m.onClear(b) } catch (a) { x(a, "onClear"); throw a; } b.attr({ scrollTop: 0 }); return b }, export_view: function () { return { prompt: b.get_prompt(), command: b.get_command(), position: u.position(), lines: J.slice(0) } }, import_view: function (a) { b.set_prompt(a.prompt); b.set_command(a.command); u.position(a.position); J = a.lines; b.resize(); return b }, exec: function (a, h) { z ? X.push([a, h]) : H(a, h); return b }, commands: function () { return s.top().interpreter },
                                greetings: function () { F(); return b }, paused: function () { return z }, pause: function () { if (u) { z = true; b.disable(); u.hidden() } return b }, resume: function () { if (u) { b.enable(); var a = X; for (X = []; a.length;) { var h = a.shift(); b.exec.apply(b, h) } u.visible(); B() } return b }, cols: function () { return L }, rows: function () { var a = d('<div class="terminal"><span>&nbsp;</span></div>').appendTo("body"), h = Math.floor(b.height() / a.height()); a.remove(); return h }, history: function () { return u.history() }, next: function () {
                                    if ($.length() === 1) return b;
                                    else { var a = b.offset().top; b.height(); b.scrollTop(); var h = b, j = d(window).scrollTop(), p = j + d(window).height(), q = d(h).offset().top; if (q + d(h).height() >= j && q <= p) { $.front().disable(); a = $.rotate().enable(); h = a.offset().top - 50; d("html,body").animate({ scrollTop: h }, 500); try { m.onTerminalChange(a) } catch (w) { x(w, "onTerminalChange"); throw w; } return a } else { b.enable(); d("html,body").animate({ scrollTop: a - 50 }, 500); return b } }
                                }, focus: function (a, h) {
                                    b.oneTime(1, function () {
                                        if ($.length() === 1) if (a === false) try {
                                            !h && m.onBlur(b) !==
                                                false && b.disable()
                                        } catch (j) { x(j, "onBlur"); throw j; } else try { !h && m.onFocus(b) !== false && b.enable() } catch (p) { x(p, "onFocus"); throw p; } else if (a === false) b.next(); else { var q = $.front(); if (q != b) { q.disable(); if (!h) try { m.onTerminalChange(b) } catch (w) { x(w, "onTerminalChange"); throw w; } } $.set(b); b.enable() }
                                    }); return b
                                }, enable: function () { L === R && b.resize(); if (z) if (u) { u.enable(); z = false } return b }, disable: function () { if (u) { z = true; u.disable() } return b }, enabled: function () { return z }, signature: function () {
                                    var a = b.cols();
                                    a = a < 15 ? null : a < 35 ? 0 : a < 55 ? 1 : a < 64 ? 2 : a < 75 ? 3 : 4; return a !== null ? Ea[a].join("\n") + "\n" : ""
                                }, version: function () { return "0.7.6" }, get_command: function () { return u.get() }, insert: function (a) { if (typeof a === "string") { u.insert(a); return b } else throw "insert function argument is not a string"; }, set_prompt: function (a) { if (D("prompt", a)) { typeof a == "function" ? u.prompt(function (h) { a(h, b) }) : u.prompt(a); s.top().prompt = a } return b }, get_prompt: function () { return s.top().prompt }, set_command: function (a) { u.set(a); return b }, set_mask: function (a) {
                                    u.mask(a);
                                    return b
                                }, get_output: function (a) { return a ? J : d.map(J, function (h) { return typeof h[0] == "function" ? h[0]() : h[0] }).join("\n") }, resize: function (a, h) { if (a && h) { b.width(a); b.height(h) } a = b.width(); h = b.height(); L = la(b); u.resize(L); var j = f.empty().detach(); d.each(J, function (p, q) { v.apply(null, q) }); u.before(j); y(); if (typeof m.onResize === "function" && (Y !== h || S !== a)) m.onResize(b); if (Y !== h || S !== a) { Y = h; S = a } return b }, flush: function () { y() }, echo: function (a, h) {
                                    try {
                                        var j = d.extend({ flush: true, raw: false, finalize: d.noop }, h ||
                                            {}); N = []; v(a, j); j.flush && y(); J.push([a, j]); if (j.outputLimit >= 0) { var p = j.outputLimit === 0 ? b.rows() : j.outputLimit, q = f.find("div div"); q.length > p && q.slice(0, J.length - p + 1).remove() } C()
                                    } catch (w) { alert("terminal.echo " + k(w) + "\n" + w.stack) } return b
                                }, error: function (a, h) { return b.echo("[[;#f00;]" + d.terminal.escape_brackets(a).replace(/\\$/, "&#92;") + "]", h) }, scroll: function (a) {
                                    var h; a = Math.round(a); if (Q.prop) { a > Q.prop("scrollTop") && a > 0 && Q.prop("scrollTop", 0); h = Q.prop("scrollTop") } else {
                                        a > Q.attr("scrollTop") && a >
                                            0 && Q.attr("scrollTop", 0); h = Q.attr("scrollTop")
                                    } Q.scrollTop(h + a); return b
                                }, logout: m.login ? function () { for (; s.size() > 1;)s.pop(); n(); return b } : function () { throw "You don't have login function"; }, token: m.login ? function () { var a = m.name; return d.Storage.get((a ? a + "_" : "") + t + "_token") } : d.noop, login_name: m.login ? function () { var a = m.name; return d.Storage.get((a ? a + "_" : "") + t + "_login") } : d.noop, name: function () { return s.top().name }, push: function (a, h) {
                                    if (h && (!h.prompt || D("prompt", h.prompt)) || !h) {
                                        h = h || {}; h.name = h.name ||
                                            Z; h.prompt = h.prompt || h.name + " "; I.push(h.name); var j = s.top(); if (j) j.mask = u.mask(); A(a, function (p) { s.push(d.extend({}, p, h)); K() })
                                    } return b
                                }, pop: function (a) { a !== R && G(a); I.pop(); if (s.top().name === m.name) { if (m.login) { n(); if (d.type(m.onExit) === "function") try { m.onExit(b) } catch (h) { x(h, "onExit"); throw h; } } } else { a = s.pop(); K(); if (d.type(a.onExit) === "function") try { a.onExit(b) } catch (j) { x(j, "onExit"); throw j; } b.set_mask(s.top().mask) } return b }, level: function () { return s.size() }, reset: function () {
                                    for (b.clear(); s.size() >
                                        1;)s.pop(); T(); return b
                                }, purge: function () { var a = (m.name ? m.name + "_" : "") + t + "_", h = d.Storage.get(a + "interpreters"); d.each((new Function("return " + h + ";"))(), function (j, p) { d.Storage.remove(p + "_commands") }); d.Storage.remove(a + "interpreters"); d.Storage.remove(a + "token"); d.Storage.remove(a + "login"); return b }, destroy: function () {
                                    u.destroy().remove(); f.remove(); d(document).unbind(".terminal"); d(window).unbind(".terminal"); b.unbind("click, mousewheel"); b.removeData("terminal").removeClass("terminal"); m.width &&
                                        b.css("width", ""); m.height && b.css("height", ""); return b
                                }
                            }, function (a, h) { return function () { try { return h.apply(this, Array.prototype.slice.apply(arguments)) } catch (j) { a !== "exec" && x(j, "TERMINAL"); throw j; } } })); var C = function () { var a = ha(b); return function () { if (a !== ha(b)) { b.resize(); a = ha(b) } } }(); m.width && b.width(m.width); m.height && b.height(m.height); Q = !navigator.userAgent.toLowerCase().match(/(webkit)[ \/]([\w.]+)/) && b[0].tagName.toLowerCase() == "body" ? d("html") : b; d(document).bind("ajaxSend.terminal", function (a,
                                h) { fa.push(h) }); f = d("<div>").addClass("terminal-output").appendTo(b); b.addClass("terminal"); if ("ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch) { b.click(function () { b.find("textarea").focus() }); b.find("textarea").focus() } if (m.login && typeof m.onBeforeLogin === "function") try { m.onBeforeLogin(b) } catch (E) { x(E, "onBeforeLogin"); throw E; } if (typeof c === "string" && (typeof m.login === "string" || m.login)) m.login = function (a) {
                                    return function (h, j, p) {
                                        b.pause(); d.jrpc(c, a, [h, j], function (q) {
                                            b.resume();
                                            !q.error && q.result ? p(q.result) : p(null)
                                        }, function (q, w) { b.resume(); b.error("&#91;AJAX&#92; Response: " + w + "\n" + q.responseText) })
                                    }
                                }(d.type(m.login) === "boolean" ? "login" : m.login); if (D("prompt", m.prompt)) {
                                    var s, u; A(c, function (a) {
                                        s = new ya(d.extend({ name: m.name, prompt: m.prompt, greetings: m.greetings }, a)); u = d("<div/>").appendTo(b).cmd({
                                            prompt: m.prompt, history: m.history, historyFilter: m.historyFilter, historySize: m.historySize, width: "100%", keydown: ea, keypress: m.keypress ? function (h) { return m.keypress(h, b) } : null,
                                            onCommandChange: function (h) { if (d.type(m.onCommandChange) === "function") try { m.onCommandChange(h, b) } catch (j) { x(j, "onCommandChange"); throw j; } B() }, commands: H
                                        }); L = la(b); $.append(b); m.enabled === true ? b.focus(R, true) : b.disable(); d(document).bind("click.terminal", function (h) { !d(h.target).parents().hasClass("terminal") && m.onBlur(b) !== false && b.disable() }); b.click(function () { b.focus() }); m.login && b.token && !b.token() && b.login_name && !b.login_name() ? M() : T(); b.oneTime(100, function () {
                                            d(window).bind("resize.terminal",
                                                function () { if (b.is(":visible")) { var h = b.width(), j = b.height(); if (Y !== j || S !== h) b.resize() } })
                                        }); d.type(d.fn.init.prototype.mousewheel) === "function" && b.mousewheel(function (h, j) { j > 0 ? b.scroll(-40) : b.scroll(40); return false }, true)
                                    })
                                } b.data("terminal", b); return b
                    }
                }
})(jQuery);
