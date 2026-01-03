var rc = {
    exports: {}
};
/*!
 * jQuery JavaScript Library v3.6.3
 * https://jquery.com/
 *
 * Includes Sizzle.js
 * https://sizzlejs.com/
 *
 * Copyright OpenJS Foundation and other contributors
 * Released under the MIT license
 * https://jquery.org/license
 *
 * Date: 2022-12-20T21:28Z
 */
(function(x) {
    (function(y, a) {
        x.exports = y.document ? a(y, !0) : function(_) {
            if (!_.document) throw new Error("jQuery requires a window with a document");
            return a(_)
        }
    })(typeof window < "u" ? window : Vr, function(y, a) {
        var _ = [],
            D = Object.getPrototypeOf,
            U = _.slice,
            Y = _.flat ? function(n) {
                return _.flat.call(n)
            } : function(n) {
                return _.concat.apply([], n)
            },
            ge = _.push,
            de = _.indexOf,
            Fe = {},
            pt = Fe.toString,
            Me = Fe.hasOwnProperty,
            ri = Me.toString,
            qn = ri.call(Object),
            be = {},
            ce = function(i) {
                return typeof i == "function" && typeof i.nodeType != "number" && typeof i.item != "function"
            },
            Ye = function(i) {
                return i != null && i === i.window
            },
            le = y.document,
            ji = {
                type: !0,
                src: !0,
                nonce: !0,
                noModule: !0
            };

        function Dt(n, i, u) {
            u = u || le;
            var f, c, l = u.createElement("script");
            if (l.text = n, i)
                for (f in ji) c = i[f] || i.getAttribute && i.getAttribute(f), c && l.setAttribute(f, c);
            u.head.appendChild(l).parentNode.removeChild(l)
        }

        function Nt(n) {
            return n == null ? n + "" : typeof n == "object" || typeof n == "function" ? Fe[pt.call(n)] || "object" : typeof n
        }
        var Rt = "3.6.3",
            s = function(n, i) {
                return new s.fn.init(n, i)
            };
        s.fn = s.prototype = {
            jquery: Rt,
            constructor: s,
            length: 0,
            toArray: function() {
                return U.call(this)
            },
            get: function(n) {
                return n == null ? U.call(this) : n < 0 ? this[n + this.length] : this[n]
            },
            pushStack: function(n) {
                var i = s.merge(this.constructor(), n);
                return i.prevObject = this, i
            },
            each: function(n) {
                return s.each(this, n)
            },
            map: function(n) {
                return this.pushStack(s.map(this, function(i, u) {
                    return n.call(i, u, i)
                }))
            },
            slice: function() {
                return this.pushStack(U.apply(this, arguments))
            },
            first: function() {
                return this.eq(0)
            },
            last: function() {
                return this.eq(-1)
            },
            even: function() {
                return this.pushStack(s.grep(this, function(n, i) {
                    return (i + 1) % 2
                }))
            },
            odd: function() {
                return this.pushStack(s.grep(this, function(n, i) {
                    return i % 2
                }))
            },
            eq: function(n) {
                var i = this.length,
                    u = +n + (n < 0 ? i : 0);
                return this.pushStack(u >= 0 && u < i ? [this[u]] : [])
            },
            end: function() {
                return this.prevObject || this.constructor()
            },
            push: ge,
            sort: _.sort,
            splice: _.splice
        }, s.extend = s.fn.extend = function() {
            var n, i, u, f, c, l, p = arguments[0] || {},
                T = 1,
                b = arguments.length,
                L = !1;
            for (typeof p == "boolean" && (L = p, p = arguments[T] || {}, T++), typeof p != "object" && !ce(p) && (p = {}), T === b && (p = this, T--); T < b; T++)
                if ((n = arguments[T]) != null)
                    for (i in n) f = n[i], !(i === "__proto__" || p === f) && (L && f && (s.isPlainObject(f) || (c = Array.isArray(f))) ? (u = p[i], c && !Array.isArray(u) ? l = [] : !c && !s.isPlainObject(u) ? l = {} : l = u, c = !1, p[i] = s.extend(L, l, f)) : f !== void 0 && (p[i] = f));
            return p
        }, s.extend({
            expando: "jQuery" + (Rt + Math.random()).replace(/\D/g, ""),
            isReady: !0,
            error: function(n) {
                throw new Error(n)
            },
            noop: function() {},
            isPlainObject: function(n) {
                var i, u;
                return !n || pt.call(n) !== "[object Object]" ? !1 : (i = D(n), i ? (u = Me.call(i, "constructor") && i.constructor, typeof u == "function" && ri.call(u) === qn) : !0)
            },
            isEmptyObject: function(n) {
                var i;
                for (i in n) return !1;
                return !0
            },
            globalEval: function(n, i, u) {
                Dt(n, {
                    nonce: i && i.nonce
                }, u)
            },
            each: function(n, i) {
                var u, f = 0;
                if (Pt(n))
                    for (u = n.length; f < u && i.call(n[f], f, n[f]) !== !1; f++);
                else
                    for (f in n)
                        if (i.call(n[f], f, n[f]) === !1) break;
                return n
            },
            makeArray: function(n, i) {
                var u = i || [];
                return n != null && (Pt(Object(n)) ? s.merge(u, typeof n == "string" ? [n] : n) : ge.call(u, n)), u
            },
            inArray: function(n, i, u) {
                return i == null ? -1 : de.call(i, n, u)
            },
            merge: function(n, i) {
                for (var u = +i.length, f = 0, c = n.length; f < u; f++) n[c++] = i[f];
                return n.length = c, n
            },
            grep: function(n, i, u) {
                for (var f, c = [], l = 0, p = n.length, T = !u; l < p; l++) f = !i(n[l], l), f !== T && c.push(n[l]);
                return c
            },
            map: function(n, i, u) {
                var f, c, l = 0,
                    p = [];
                if (Pt(n))
                    for (f = n.length; l < f; l++) c = i(n[l], l, u), c != null && p.push(c);
                else
                    for (l in n) c = i(n[l], l, u), c != null && p.push(c);
                return Y(p)
            },
            guid: 1,
            support: be
        }), typeof Symbol == "function" && (s.fn[Symbol.iterator] = _[Symbol.iterator]), s.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function(n, i) {
            Fe["[object " + i + "]"] = i.toLowerCase()
        });

        function Pt(n) {
            var i = !!n && "length" in n && n.length,
                u = Nt(n);
            return ce(n) || Ye(n) ? !1 : u === "array" || i === 0 || typeof i == "number" && i > 0 && i - 1 in n
        }
        var qt = function(n) {
            var i, u, f, c, l, p, T, b, L, P, W, O, q, J, se, X, We, He, ye, we = "sizzle" + 1 * new Date,
                oe = n.document,
                ft = 0,
                me = 0,
                qe = st(),
                sr = st(),
                Fr = st(),
                ot = st(),
                $t = function(g, m) {
                    return g === m && (W = !0), 0
                },
                Tt = {}.hasOwnProperty,
                at = [],
                en = at.pop,
                xt = at.push,
                Gt = at.push,
                Ur = at.slice,
                hn = function(g, m) {
                    for (var C = 0, k = g.length; C < k; C++)
                        if (g[C] === m) return C;
                    return -1
                },
                Ii = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
                Ee = "[\\x20\\t\\r\\n\\f]",
                tn = "(?:\\\\[\\da-fA-F]{1,6}" + Ee + "?|\\\\[^\\r\\n\\f]|[\\w-]|[^\0-\\x7f])+",
                mu = "\\[" + Ee + "*(" + tn + ")(?:" + Ee + "*([*^$|!~]?=)" + Ee + `*(?:'((?:\\\\.|[^\\\\'])*)'|"((?:\\\\.|[^\\\\"])*)"|(` + tn + "))|)" + Ee + "*\\]",
                $r = ":(" + tn + `)(?:\\((('((?:\\\\.|[^\\\\'])*)'|"((?:\\\\.|[^\\\\"])*)")|((?:\\\\.|[^\\\\()[\\]]|` + mu + ")*)|.*)\\)|)",
                gt = new RegExp(Ee + "+", "g"),
                jn = new RegExp("^" + Ee + "+|((?:^|[^\\\\])(?:\\\\.)*)" + Ee + "+$", "g"),
                cr = new RegExp("^" + Ee + "*," + Ee + "*"),
                Ci = new RegExp("^" + Ee + "*([>+~]|" + Ee + ")" + Ee + "*"),
                Tu = new RegExp(Ee + "|>"),
                uo = new RegExp($r),
                fo = new RegExp("^" + tn + "$"),
                Gr = {
                    ID: new RegExp("^#(" + tn + ")"),
                    CLASS: new RegExp("^\\.(" + tn + ")"),
                    TAG: new RegExp("^(" + tn + "|[*])"),
                    ATTR: new RegExp("^" + mu),
                    PSEUDO: new RegExp("^" + $r),
                    CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + Ee + "*(even|odd|(([+-]|)(\\d*)n|)" + Ee + "*(?:([+-]|)" + Ee + "*(\\d+)|))" + Ee + "*\\)|)", "i"),
                    bool: new RegExp("^(?:" + Ii + ")$", "i"),
                    needsContext: new RegExp("^" + Ee + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + Ee + "*((?:-\\d)?\\d*)" + Ee + "*\\)|)(?=[^-]|$)", "i")
                },
                oo = /HTML$/i,
                ao = /^(?:input|select|textarea|button)$/i,
                Kn = /^h\d$/i,
                lr = /^[^{]+\{\s*\[native \w/,
                so = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
                hr = /[+~]/,
                zt = new RegExp("\\\\[\\da-fA-F]{1,6}" + Ee + "?|\\\\([^\\r\\n\\f])", "g"),
                et = function(g, m) {
                    var C = "0x" + g.slice(1) - 65536;
                    return m || (C < 0 ? String.fromCharCode(C + 65536) : String.fromCharCode(C >> 10 | 55296, C & 1023 | 56320))
                },
                pr = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
                Iu = function(g, m) {
                    return m ? g === "\0" ? "�" : g.slice(0, -1) + "\\" + g.charCodeAt(g.length - 1).toString(16) + " " : "\\" + g
                },
                Cu = function() {
                    O()
                },
                co = ae(function(g) {
                    return g.disabled === !0 && g.nodeName.toLowerCase() === "fieldset"
                }, {
                    dir: "parentNode",
                    next: "legend"
                });
            try {
                Gt.apply(at = Ur.call(oe.childNodes), oe.childNodes), at[oe.childNodes.length].nodeType
            } catch {
                Gt = {
                    apply: at.length ? function(m, C) {
                        xt.apply(m, Ur.call(C))
                    } : function(m, C) {
                        for (var k = m.length, S = 0; m[k++] = C[S++];);
                        m.length = k - 1
                    }
                }
            }

            function Le(g, m, C, k) {
                var S, N, F, G, z, ne, V, re = m && m.ownerDocument,
                    he = m ? m.nodeType : 9;
                if (C = C || [], typeof g != "string" || !g || he !== 1 && he !== 9 && he !== 11) return C;
                if (!k && (O(m), m = m || q, se)) {
                    if (he !== 11 && (z = so.exec(g)))
                        if (S = z[1]) {
                            if (he === 9)
                                if (F = m.getElementById(S)) {
                                    if (F.id === S) return C.push(F), C
                                } else return C;
                            else if (re && (F = re.getElementById(S)) && ye(m, F) && F.id === S) return C.push(F), C
                        } else {
                            if (z[2]) return Gt.apply(C, m.getElementsByTagName(g)), C;
                            if ((S = z[3]) && u.getElementsByClassName && m.getElementsByClassName) return Gt.apply(C, m.getElementsByClassName(S)), C
                        } if (u.qsa && !ot[g + " "] && (!X || !X.test(g)) && (he !== 1 || m.nodeName.toLowerCase() !== "object")) {
                        if (V = g, re = m, he === 1 && (Tu.test(g) || Ci.test(g))) {
                            for (re = hr.test(g) && M(m.parentNode) || m, (re !== m || !u.scope) && ((G = m.getAttribute("id")) ? G = G.replace(pr, Iu) : m.setAttribute("id", G = we)), ne = p(g), N = ne.length; N--;) ne[N] = (G ? "#" + G : ":scope") + " " + K(ne[N]);
                            V = ne.join(",")
                        }
                        try {
                            if (u.cssSupportsSelector && !CSS.supports("selector(:is(" + V + "))")) throw new Error;
                            return Gt.apply(C, re.querySelectorAll(V)), C
                        } catch {
                            ot(g, !0)
                        } finally {
                            G === we && m.removeAttribute("id")
                        }
                    }
                }
                return b(g.replace(jn, "$1"), m, C, k)
            }

            function st() {
                var g = [];

                function m(C, k) {
                    return g.push(C + " ") > f.cacheLength && delete m[g.shift()], m[C + " "] = k
                }
                return m
            }

            function It(g) {
                return g[we] = !0, g
            }

            function Ct(g) {
                var m = q.createElement("fieldset");
                try {
                    return !!g(m)
                } catch {
                    return !1
                } finally {
                    m.parentNode && m.parentNode.removeChild(m), m = null
                }
            }

            function Ai(g, m) {
                for (var C = g.split("|"), k = C.length; k--;) f.attrHandle[C[k]] = m
            }

            function Au(g, m) {
                var C = m && g,
                    k = C && g.nodeType === 1 && m.nodeType === 1 && g.sourceIndex - m.sourceIndex;
                if (k) return k;
                if (C) {
                    for (; C = C.nextSibling;)
                        if (C === m) return -1
                }
                return g ? 1 : -1
            }

            function lo(g) {
                return function(m) {
                    var C = m.nodeName.toLowerCase();
                    return C === "input" && m.type === g
                }
            }

            function ho(g) {
                return function(m) {
                    var C = m.nodeName.toLowerCase();
                    return (C === "input" || C === "button") && m.type === g
                }
            }

            function In(g) {
                return function(m) {
                    return "form" in m ? m.parentNode && m.disabled === !1 ? "label" in m ? "label" in m.parentNode ? m.parentNode.disabled === g : m.disabled === g : m.isDisabled === g || m.isDisabled !== !g && co(m) === g : m.disabled === g : "label" in m ? m.disabled === g : !1
                }
            }

            function A(g) {
                return It(function(m) {
                    return m = +m, It(function(C, k) {
                        for (var S, N = g([], C.length, m), F = N.length; F--;) C[S = N[F]] && (C[S] = !(k[S] = C[S]))
                    })
                })
            }

            function M(g) {
                return g && typeof g.getElementsByTagName < "u" && g
            }
            u = Le.support = {}, l = Le.isXML = function(g) {
                var m = g && g.namespaceURI,
                    C = g && (g.ownerDocument || g).documentElement;
                return !oo.test(m || C && C.nodeName || "HTML")
            }, O = Le.setDocument = function(g) {
                var m, C, k = g ? g.ownerDocument || g : oe;
                return k == q || k.nodeType !== 9 || !k.documentElement || (q = k, J = q.documentElement, se = !l(q), oe != q && (C = q.defaultView) && C.top !== C && (C.addEventListener ? C.addEventListener("unload", Cu, !1) : C.attachEvent && C.attachEvent("onunload", Cu)), u.scope = Ct(function(S) {
                    return J.appendChild(S).appendChild(q.createElement("div")), typeof S.querySelectorAll < "u" && !S.querySelectorAll(":scope fieldset div").length
                }), u.cssSupportsSelector = Ct(function() {
                    return CSS.supports("selector(*)") && q.querySelectorAll(":is(:jqfake)") && !CSS.supports("selector(:is(*,:jqfake))")
                }), u.attributes = Ct(function(S) {
                    return S.className = "i", !S.getAttribute("className")
                }), u.getElementsByTagName = Ct(function(S) {
                    return S.appendChild(q.createComment("")), !S.getElementsByTagName("*").length
                }), u.getElementsByClassName = lr.test(q.getElementsByClassName), u.getById = Ct(function(S) {
                    return J.appendChild(S).id = we, !q.getElementsByName || !q.getElementsByName(we).length
                }), u.getById ? (f.filter.ID = function(S) {
                    var N = S.replace(zt, et);
                    return function(F) {
                        return F.getAttribute("id") === N
                    }
                }, f.find.ID = function(S, N) {
                    if (typeof N.getElementById < "u" && se) {
                        var F = N.getElementById(S);
                        return F ? [F] : []
                    }
                }) : (f.filter.ID = function(S) {
                    var N = S.replace(zt, et);
                    return function(F) {
                        var G = typeof F.getAttributeNode < "u" && F.getAttributeNode("id");
                        return G && G.value === N
                    }
                }, f.find.ID = function(S, N) {
                    if (typeof N.getElementById < "u" && se) {
                        var F, G, z, ne = N.getElementById(S);
                        if (ne) {
                            if (F = ne.getAttributeNode("id"), F && F.value === S) return [ne];
                            for (z = N.getElementsByName(S), G = 0; ne = z[G++];)
                                if (F = ne.getAttributeNode("id"), F && F.value === S) return [ne]
                        }
                        return []
                    }
                }), f.find.TAG = u.getElementsByTagName ? function(S, N) {
                    if (typeof N.getElementsByTagName < "u") return N.getElementsByTagName(S);
                    if (u.qsa) return N.querySelectorAll(S)
                } : function(S, N) {
                    var F, G = [],
                        z = 0,
                        ne = N.getElementsByTagName(S);
                    if (S === "*") {
                        for (; F = ne[z++];) F.nodeType === 1 && G.push(F);
                        return G
                    }
                    return ne
                }, f.find.CLASS = u.getElementsByClassName && function(S, N) {
                    if (typeof N.getElementsByClassName < "u" && se) return N.getElementsByClassName(S)
                }, We = [], X = [], (u.qsa = lr.test(q.querySelectorAll)) && (Ct(function(S) {
                    var N;
                    J.appendChild(S).innerHTML = "<a id='" + we + "'></a><select id='" + we + "-\r\\' msallowcapture=''><option selected=''></option></select>", S.querySelectorAll("[msallowcapture^='']").length && X.push("[*^$]=" + Ee + `*(?:''|"")`), S.querySelectorAll("[selected]").length || X.push("\\[" + Ee + "*(?:value|" + Ii + ")"), S.querySelectorAll("[id~=" + we + "-]").length || X.push("~="), N = q.createElement("input"), N.setAttribute("name", ""), S.appendChild(N), S.querySelectorAll("[name='']").length || X.push("\\[" + Ee + "*name" + Ee + "*=" + Ee + `*(?:''|"")`), S.querySelectorAll(":checked").length || X.push(":checked"), S.querySelectorAll("a#" + we + "+*").length || X.push(".#.+[+~]"), S.querySelectorAll("\\\f"), X.push("[\\r\\n\\f]")
                }), Ct(function(S) {
                    S.innerHTML = "<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";
                    var N = q.createElement("input");
                    N.setAttribute("type", "hidden"), S.appendChild(N).setAttribute("name", "D"), S.querySelectorAll("[name=d]").length && X.push("name" + Ee + "*[*^$|!~]?="), S.querySelectorAll(":enabled").length !== 2 && X.push(":enabled", ":disabled"), J.appendChild(S).disabled = !0, S.querySelectorAll(":disabled").length !== 2 && X.push(":enabled", ":disabled"), S.querySelectorAll("*,:x"), X.push(",.*:")
                })), (u.matchesSelector = lr.test(He = J.matches || J.webkitMatchesSelector || J.mozMatchesSelector || J.oMatchesSelector || J.msMatchesSelector)) && Ct(function(S) {
                    u.disconnectedMatch = He.call(S, "*"), He.call(S, "[s!='']:x"), We.push("!=", $r)
                }), u.cssSupportsSelector || X.push(":has"), X = X.length && new RegExp(X.join("|")), We = We.length && new RegExp(We.join("|")), m = lr.test(J.compareDocumentPosition), ye = m || lr.test(J.contains) ? function(S, N) {
                    var F = S.nodeType === 9 && S.documentElement || S,
                        G = N && N.parentNode;
                    return S === G || !!(G && G.nodeType === 1 && (F.contains ? F.contains(G) : S.compareDocumentPosition && S.compareDocumentPosition(G) & 16))
                } : function(S, N) {
                    if (N) {
                        for (; N = N.parentNode;)
                            if (N === S) return !0
                    }
                    return !1
                }, $t = m ? function(S, N) {
                    if (S === N) return W = !0, 0;
                    var F = !S.compareDocumentPosition - !N.compareDocumentPosition;
                    return F || (F = (S.ownerDocument || S) == (N.ownerDocument || N) ? S.compareDocumentPosition(N) : 1, F & 1 || !u.sortDetached && N.compareDocumentPosition(S) === F ? S == q || S.ownerDocument == oe && ye(oe, S) ? -1 : N == q || N.ownerDocument == oe && ye(oe, N) ? 1 : P ? hn(P, S) - hn(P, N) : 0 : F & 4 ? -1 : 1)
                } : function(S, N) {
                    if (S === N) return W = !0, 0;
                    var F, G = 0,
                        z = S.parentNode,
                        ne = N.parentNode,
                        V = [S],
                        re = [N];
                    if (!z || !ne) return S == q ? -1 : N == q ? 1 : z ? -1 : ne ? 1 : P ? hn(P, S) - hn(P, N) : 0;
                    if (z === ne) return Au(S, N);
                    for (F = S; F = F.parentNode;) V.unshift(F);
                    for (F = N; F = F.parentNode;) re.unshift(F);
                    for (; V[G] === re[G];) G++;
                    return G ? Au(V[G], re[G]) : V[G] == oe ? -1 : re[G] == oe ? 1 : 0
                }), q
            }, Le.matches = function(g, m) {
                return Le(g, null, null, m)
            }, Le.matchesSelector = function(g, m) {
                if (O(g), u.matchesSelector && se && !ot[m + " "] && (!We || !We.test(m)) && (!X || !X.test(m))) try {
                    var C = He.call(g, m);
                    if (C || u.disconnectedMatch || g.document && g.document.nodeType !== 11) return C
                } catch {
                    ot(m, !0)
                }
                return Le(m, q, null, [g]).length > 0
            }, Le.contains = function(g, m) {
                return (g.ownerDocument || g) != q && O(g), ye(g, m)
            }, Le.attr = function(g, m) {
                (g.ownerDocument || g) != q && O(g);
                var C = f.attrHandle[m.toLowerCase()],
                    k = C && Tt.call(f.attrHandle, m.toLowerCase()) ? C(g, m, !se) : void 0;
                return k !== void 0 ? k : u.attributes || !se ? g.getAttribute(m) : (k = g.getAttributeNode(m)) && k.specified ? k.value : null
            }, Le.escape = function(g) {
                return (g + "").replace(pr, Iu)
            }, Le.error = function(g) {
                throw new Error("Syntax error, unrecognized expression: " + g)
            }, Le.uniqueSort = function(g) {
                var m, C = [],
                    k = 0,
                    S = 0;
                if (W = !u.detectDuplicates, P = !u.sortStable && g.slice(0), g.sort($t), W) {
                    for (; m = g[S++];) m === g[S] && (k = C.push(S));
                    for (; k--;) g.splice(C[k], 1)
                }
                return P = null, g
            }, c = Le.getText = function(g) {
                var m, C = "",
                    k = 0,
                    S = g.nodeType;
                if (S) {
                    if (S === 1 || S === 9 || S === 11) {
                        if (typeof g.textContent == "string") return g.textContent;
                        for (g = g.firstChild; g; g = g.nextSibling) C += c(g)
                    } else if (S === 3 || S === 4) return g.nodeValue
                } else
                    for (; m = g[k++];) C += c(m);
                return C
            }, f = Le.selectors = {
                cacheLength: 50,
                createPseudo: It,
                match: Gr,
                attrHandle: {},
                find: {},
                relative: {
                    ">": {
                        dir: "parentNode",
                        first: !0
                    },
                    " ": {
                        dir: "parentNode"
                    },
                    "+": {
                        dir: "previousSibling",
                        first: !0
                    },
                    "~": {
                        dir: "previousSibling"
                    }
                },
                preFilter: {
                    ATTR: function(g) {
                        return g[1] = g[1].replace(zt, et), g[3] = (g[3] || g[4] || g[5] || "").replace(zt, et), g[2] === "~=" && (g[3] = " " + g[3] + " "), g.slice(0, 4)
                    },
                    CHILD: function(g) {
                        return g[1] = g[1].toLowerCase(), g[1].slice(0, 3) === "nth" ? (g[3] || Le.error(g[0]), g[4] = +(g[4] ? g[5] + (g[6] || 1) : 2 * (g[3] === "even" || g[3] === "odd")), g[5] = +(g[7] + g[8] || g[3] === "odd")) : g[3] && Le.error(g[0]), g
                    },
                    PSEUDO: function(g) {
                        var m, C = !g[6] && g[2];
                        return Gr.CHILD.test(g[0]) ? null : (g[3] ? g[2] = g[4] || g[5] || "" : C && uo.test(C) && (m = p(C, !0)) && (m = C.indexOf(")", C.length - m) - C.length) && (g[0] = g[0].slice(0, m), g[2] = C.slice(0, m)), g.slice(0, 3))
                    }
                },
                filter: {
                    TAG: function(g) {
                        var m = g.replace(zt, et).toLowerCase();
                        return g === "*" ? function() {
                            return !0
                        } : function(C) {
                            return C.nodeName && C.nodeName.toLowerCase() === m
                        }
                    },
                    CLASS: function(g) {
                        var m = qe[g + " "];
                        return m || (m = new RegExp("(^|" + Ee + ")" + g + "(" + Ee + "|$)")) && qe(g, function(C) {
                            return m.test(typeof C.className == "string" && C.className || typeof C.getAttribute < "u" && C.getAttribute("class") || "")
                        })
                    },
                    ATTR: function(g, m, C) {
                        return function(k) {
                            var S = Le.attr(k, g);
                            return S == null ? m === "!=" : m ? (S += "", m === "=" ? S === C : m === "!=" ? S !== C : m === "^=" ? C && S.indexOf(C) === 0 : m === "*=" ? C && S.indexOf(C) > -1 : m === "$=" ? C && S.slice(-C.length) === C : m === "~=" ? (" " + S.replace(gt, " ") + " ").indexOf(C) > -1 : m === "|=" ? S === C || S.slice(0, C.length + 1) === C + "-" : !1) : !0
                        }
                    },
                    CHILD: function(g, m, C, k, S) {
                        var N = g.slice(0, 3) !== "nth",
                            F = g.slice(-4) !== "last",
                            G = m === "of-type";
                        return k === 1 && S === 0 ? function(z) {
                            return !!z.parentNode
                        } : function(z, ne, V) {
                            var re, he, Ie, ee, Ue, je, ct = N !== F ? "nextSibling" : "previousSibling",
                                Pe = z.parentNode,
                                pn = G && z.nodeName.toLowerCase(),
                                Xn = !V && !G,
                                Ze = !1;
                            if (Pe) {
                                if (N) {
                                    for (; ct;) {
                                        for (ee = z; ee = ee[ct];)
                                            if (G ? ee.nodeName.toLowerCase() === pn : ee.nodeType === 1) return !1;
                                        je = ct = g === "only" && !je && "nextSibling"
                                    }
                                    return !0
                                }
                                if (je = [F ? Pe.firstChild : Pe.lastChild], F && Xn) {
                                    for (ee = Pe, Ie = ee[we] || (ee[we] = {}), he = Ie[ee.uniqueID] || (Ie[ee.uniqueID] = {}), re = he[g] || [], Ue = re[0] === ft && re[1], Ze = Ue && re[2], ee = Ue && Pe.childNodes[Ue]; ee = ++Ue && ee && ee[ct] || (Ze = Ue = 0) || je.pop();)
                                        if (ee.nodeType === 1 && ++Ze && ee === z) {
                                            he[g] = [ft, Ue, Ze];
                                            break
                                        }
                                } else if (Xn && (ee = z, Ie = ee[we] || (ee[we] = {}), he = Ie[ee.uniqueID] || (Ie[ee.uniqueID] = {}), re = he[g] || [], Ue = re[0] === ft && re[1], Ze = Ue), Ze === !1)
                                    for (;
                                        (ee = ++Ue && ee && ee[ct] || (Ze = Ue = 0) || je.pop()) && !((G ? ee.nodeName.toLowerCase() === pn : ee.nodeType === 1) && ++Ze && (Xn && (Ie = ee[we] || (ee[we] = {}), he = Ie[ee.uniqueID] || (Ie[ee.uniqueID] = {}), he[g] = [ft, Ze]), ee === z)););
                                return Ze -= S, Ze === k || Ze % k === 0 && Ze / k >= 0
                            }
                        }
                    },
                    PSEUDO: function(g, m) {
                        var C, k = f.pseudos[g] || f.setFilters[g.toLowerCase()] || Le.error("unsupported pseudo: " + g);
                        return k[we] ? k(m) : k.length > 1 ? (C = [g, g, "", m], f.setFilters.hasOwnProperty(g.toLowerCase()) ? It(function(S, N) {
                            for (var F, G = k(S, m), z = G.length; z--;) F = hn(S, G[z]), S[F] = !(N[F] = G[z])
                        }) : function(S) {
                            return k(S, 0, C)
                        }) : k
                    }
                },
                pseudos: {
                    not: It(function(g) {
                        var m = [],
                            C = [],
                            k = T(g.replace(jn, "$1"));
                        return k[we] ? It(function(S, N, F, G) {
                            for (var z, ne = k(S, null, G, []), V = S.length; V--;)(z = ne[V]) && (S[V] = !(N[V] = z))
                        }) : function(S, N, F) {
                            return m[0] = S, k(m, null, F, C), m[0] = null, !C.pop()
                        }
                    }),
                    has: It(function(g) {
                        return function(m) {
                            return Le(g, m).length > 0
                        }
                    }),
                    contains: It(function(g) {
                        return g = g.replace(zt, et),
                            function(m) {
                                return (m.textContent || c(m)).indexOf(g) > -1
                            }
                    }),
                    lang: It(function(g) {
                        return fo.test(g || "") || Le.error("unsupported lang: " + g), g = g.replace(zt, et).toLowerCase(),
                            function(m) {
                                var C;
                                do
                                    if (C = se ? m.lang : m.getAttribute("xml:lang") || m.getAttribute("lang")) return C = C.toLowerCase(), C === g || C.indexOf(g + "-") === 0; while ((m = m.parentNode) && m.nodeType === 1);
                                return !1
                            }
                    }),
                    target: function(g) {
                        var m = n.location && n.location.hash;
                        return m && m.slice(1) === g.id
                    },
                    root: function(g) {
                        return g === J
                    },
                    focus: function(g) {
                        return g === q.activeElement && (!q.hasFocus || q.hasFocus()) && !!(g.type || g.href || ~g.tabIndex)
                    },
                    enabled: In(!1),
                    disabled: In(!0),
                    checked: function(g) {
                        var m = g.nodeName.toLowerCase();
                        return m === "input" && !!g.checked || m === "option" && !!g.selected
                    },
                    selected: function(g) {
                        return g.parentNode && g.parentNode.selectedIndex, g.selected === !0
                    },
                    empty: function(g) {
                        for (g = g.firstChild; g; g = g.nextSibling)
                            if (g.nodeType < 6) return !1;
                        return !0
                    },
                    parent: function(g) {
                        return !f.pseudos.empty(g)
                    },
                    header: function(g) {
                        return Kn.test(g.nodeName)
                    },
                    input: function(g) {
                        return ao.test(g.nodeName)
                    },
                    button: function(g) {
                        var m = g.nodeName.toLowerCase();
                        return m === "input" && g.type === "button" || m === "button"
                    },
                    text: function(g) {
                        var m;
                        return g.nodeName.toLowerCase() === "input" && g.type === "text" && ((m = g.getAttribute("type")) == null || m.toLowerCase() === "text")
                    },
                    first: A(function() {
                        return [0]
                    }),
                    last: A(function(g, m) {
                        return [m - 1]
                    }),
                    eq: A(function(g, m, C) {
                        return [C < 0 ? C + m : C]
                    }),
                    even: A(function(g, m) {
                        for (var C = 0; C < m; C += 2) g.push(C);
                        return g
                    }),
                    odd: A(function(g, m) {
                        for (var C = 1; C < m; C += 2) g.push(C);
                        return g
                    }),
                    lt: A(function(g, m, C) {
                        for (var k = C < 0 ? C + m : C > m ? m : C; --k >= 0;) g.push(k);
                        return g
                    }),
                    gt: A(function(g, m, C) {
                        for (var k = C < 0 ? C + m : C; ++k < m;) g.push(k);
                        return g
                    })
                }
            }, f.pseudos.nth = f.pseudos.eq;
            for (i in {
                    radio: !0,
                    checkbox: !0,
                    file: !0,
                    password: !0,
                    image: !0
                }) f.pseudos[i] = lo(i);
            for (i in {
                    submit: !0,
                    reset: !0
                }) f.pseudos[i] = ho(i);

            function R() {}
            R.prototype = f.filters = f.pseudos, f.setFilters = new R, p = Le.tokenize = function(g, m) {
                var C, k, S, N, F, G, z, ne = sr[g + " "];
                if (ne) return m ? 0 : ne.slice(0);
                for (F = g, G = [], z = f.preFilter; F;) {
                    (!C || (k = cr.exec(F))) && (k && (F = F.slice(k[0].length) || F), G.push(S = [])), C = !1, (k = Ci.exec(F)) && (C = k.shift(), S.push({
                        value: C,
                        type: k[0].replace(jn, " ")
                    }), F = F.slice(C.length));
                    for (N in f.filter)(k = Gr[N].exec(F)) && (!z[N] || (k = z[N](k))) && (C = k.shift(), S.push({
                        value: C,
                        type: N,
                        matches: k
                    }), F = F.slice(C.length));
                    if (!C) break
                }
                return m ? F.length : F ? Le.error(g) : sr(g, G).slice(0)
            };

            function K(g) {
                for (var m = 0, C = g.length, k = ""; m < C; m++) k += g[m].value;
                return k
            }

            function ae(g, m, C) {
                var k = m.dir,
                    S = m.next,
                    N = S || k,
                    F = C && N === "parentNode",
                    G = me++;
                return m.first ? function(z, ne, V) {
                    for (; z = z[k];)
                        if (z.nodeType === 1 || F) return g(z, ne, V);
                    return !1
                } : function(z, ne, V) {
                    var re, he, Ie, ee = [ft, G];
                    if (V) {
                        for (; z = z[k];)
                            if ((z.nodeType === 1 || F) && g(z, ne, V)) return !0
                    } else
                        for (; z = z[k];)
                            if (z.nodeType === 1 || F)
                                if (Ie = z[we] || (z[we] = {}), he = Ie[z.uniqueID] || (Ie[z.uniqueID] = {}), S && S === z.nodeName.toLowerCase()) z = z[k] || z;
                                else {
                                    if ((re = he[N]) && re[0] === ft && re[1] === G) return ee[2] = re[2];
                                    if (he[N] = ee, ee[2] = g(z, ne, V)) return !0
                                } return !1
                }
            }

            function Ae(g) {
                return g.length > 1 ? function(m, C, k) {
                    for (var S = g.length; S--;)
                        if (!g[S](m, C, k)) return !1;
                    return !0
                } : g[0]
            }

            function ze(g, m, C) {
                for (var k = 0, S = m.length; k < S; k++) Le(g, m[k], C);
                return C
            }

            function Oe(g, m, C, k, S) {
                for (var N, F = [], G = 0, z = g.length, ne = m != null; G < z; G++)(N = g[G]) && (!C || C(N, k, S)) && (F.push(N), ne && m.push(G));
                return F
            }

            function dr(g, m, C, k, S, N) {
                return k && !k[we] && (k = dr(k)), S && !S[we] && (S = dr(S, N)), It(function(F, G, z, ne) {
                    var V, re, he, Ie = [],
                        ee = [],
                        Ue = G.length,
                        je = F || ze(m || "*", z.nodeType ? [z] : z, []),
                        ct = g && (F || !m) ? Oe(je, Ie, g, z, ne) : je,
                        Pe = C ? S || (F ? g : Ue || k) ? [] : G : ct;
                    if (C && C(ct, Pe, z, ne), k)
                        for (V = Oe(Pe, ee), k(V, [], z, ne), re = V.length; re--;)(he = V[re]) && (Pe[ee[re]] = !(ct[ee[re]] = he));
                    if (F) {
                        if (S || g) {
                            if (S) {
                                for (V = [], re = Pe.length; re--;)(he = Pe[re]) && V.push(ct[re] = he);
                                S(null, Pe = [], V, ne)
                            }
                            for (re = Pe.length; re--;)(he = Pe[re]) && (V = S ? hn(F, he) : Ie[re]) > -1 && (F[V] = !(G[V] = he))
                        }
                    } else Pe = Oe(Pe === G ? Pe.splice(Ue, Pe.length) : Pe), S ? S(null, G, Pe, ne) : Gt.apply(G, Pe)
                })
            }

            function Si(g) {
                for (var m, C, k, S = g.length, N = f.relative[g[0].type], F = N || f.relative[" "], G = N ? 1 : 0, z = ae(function(re) {
                        return re === m
                    }, F, !0), ne = ae(function(re) {
                        return hn(m, re) > -1
                    }, F, !0), V = [function(re, he, Ie) {
                        var ee = !N && (Ie || he !== L) || ((m = he).nodeType ? z(re, he, Ie) : ne(re, he, Ie));
                        return m = null, ee
                    }]; G < S; G++)
                    if (C = f.relative[g[G].type]) V = [ae(Ae(V), C)];
                    else {
                        if (C = f.filter[g[G].type].apply(null, g[G].matches), C[we]) {
                            for (k = ++G; k < S && !f.relative[g[k].type]; k++);
                            return dr(G > 1 && Ae(V), G > 1 && K(g.slice(0, G - 1).concat({
                                value: g[G - 2].type === " " ? "*" : ""
                            })).replace(jn, "$1"), C, G < k && Si(g.slice(G, k)), k < S && Si(g = g.slice(k)), k < S && K(g))
                        }
                        V.push(C)
                    } return Ae(V)
            }

            function At(g, m) {
                var C = m.length > 0,
                    k = g.length > 0,
                    S = function(N, F, G, z, ne) {
                        var V, re, he, Ie = 0,
                            ee = "0",
                            Ue = N && [],
                            je = [],
                            ct = L,
                            Pe = N || k && f.find.TAG("*", ne),
                            pn = ft += ct == null ? 1 : Math.random() || .1,
                            Xn = Pe.length;
                        for (ne && (L = F == q || F || ne); ee !== Xn && (V = Pe[ee]) != null; ee++) {
                            if (k && V) {
                                for (re = 0, !F && V.ownerDocument != q && (O(V), G = !se); he = g[re++];)
                                    if (he(V, F || q, G)) {
                                        z.push(V);
                                        break
                                    } ne && (ft = pn)
                            }
                            C && ((V = !he && V) && Ie--, N && Ue.push(V))
                        }
                        if (Ie += ee, C && ee !== Ie) {
                            for (re = 0; he = m[re++];) he(Ue, je, F, G);
                            if (N) {
                                if (Ie > 0)
                                    for (; ee--;) Ue[ee] || je[ee] || (je[ee] = en.call(z));
                                je = Oe(je)
                            }
                            Gt.apply(z, je), ne && !N && je.length > 0 && Ie + m.length > 1 && Le.uniqueSort(z)
                        }
                        return ne && (ft = pn, L = ct), Ue
                    };
                return C ? It(S) : S
            }
            return T = Le.compile = function(g, m) {
                var C, k = [],
                    S = [],
                    N = Fr[g + " "];
                if (!N) {
                    for (m || (m = p(g)), C = m.length; C--;) N = Si(m[C]), N[we] ? k.push(N) : S.push(N);
                    N = Fr(g, At(S, k)), N.selector = g
                }
                return N
            }, b = Le.select = function(g, m, C, k) {
                var S, N, F, G, z, ne = typeof g == "function" && g,
                    V = !k && p(g = ne.selector || g);
                if (C = C || [], V.length === 1) {
                    if (N = V[0] = V[0].slice(0), N.length > 2 && (F = N[0]).type === "ID" && m.nodeType === 9 && se && f.relative[N[1].type]) {
                        if (m = (f.find.ID(F.matches[0].replace(zt, et), m) || [])[0], m) ne && (m = m.parentNode);
                        else return C;
                        g = g.slice(N.shift().value.length)
                    }
                    for (S = Gr.needsContext.test(g) ? 0 : N.length; S-- && (F = N[S], !f.relative[G = F.type]);)
                        if ((z = f.find[G]) && (k = z(F.matches[0].replace(zt, et), hr.test(N[0].type) && M(m.parentNode) || m))) {
                            if (N.splice(S, 1), g = k.length && K(N), !g) return Gt.apply(C, k), C;
                            break
                        }
                }
                return (ne || T(g, V))(k, m, !se, C, !m || hr.test(g) && M(m.parentNode) || m), C
            }, u.sortStable = we.split("").sort($t).join("") === we, u.detectDuplicates = !!W, O(), u.sortDetached = Ct(function(g) {
                return g.compareDocumentPosition(q.createElement("fieldset")) & 1
            }), Ct(function(g) {
                return g.innerHTML = "<a href='#'></a>", g.firstChild.getAttribute("href") === "#"
            }) || Ai("type|href|height|width", function(g, m, C) {
                if (!C) return g.getAttribute(m, m.toLowerCase() === "type" ? 1 : 2)
            }), (!u.attributes || !Ct(function(g) {
                return g.innerHTML = "<input/>", g.firstChild.setAttribute("value", ""), g.firstChild.getAttribute("value") === ""
            })) && Ai("value", function(g, m, C) {
                if (!C && g.nodeName.toLowerCase() === "input") return g.defaultValue
            }), Ct(function(g) {
                return g.getAttribute("disabled") == null
            }) || Ai(Ii, function(g, m, C) {
                var k;
                if (!C) return g[m] === !0 ? m.toLowerCase() : (k = g.getAttributeNode(m)) && k.specified ? k.value : null
            }), Le
        }(y);
        s.find = qt, s.expr = qt.selectors, s.expr[":"] = s.expr.pseudos, s.uniqueSort = s.unique = qt.uniqueSort, s.text = qt.getText, s.isXMLDoc = qt.isXML, s.contains = qt.contains, s.escapeSelector = qt.escape;
        var fn = function(n, i, u) {
                for (var f = [], c = u !== void 0;
                    (n = n[i]) && n.nodeType !== 9;)
                    if (n.nodeType === 1) {
                        if (c && s(n).is(u)) break;
                        f.push(n)
                    } return f
            },
            Ki = function(n, i) {
                for (var u = []; n; n = n.nextSibling) n.nodeType === 1 && n !== i && u.push(n);
                return u
            },
            Xi = s.expr.match.needsContext;

        function bt(n, i) {
            return n.nodeName && n.nodeName.toLowerCase() === i.toLowerCase()
        }
        var Yi = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;

        function Cr(n, i, u) {
            return ce(i) ? s.grep(n, function(f, c) {
                return !!i.call(f, c, f) !== u
            }) : i.nodeType ? s.grep(n, function(f) {
                return f === i !== u
            }) : typeof i != "string" ? s.grep(n, function(f) {
                return de.call(i, f) > -1 !== u
            }) : s.filter(i, n, u)
        }
        s.filter = function(n, i, u) {
            var f = i[0];
            return u && (n = ":not(" + n + ")"), i.length === 1 && f.nodeType === 1 ? s.find.matchesSelector(f, n) ? [f] : [] : s.find.matches(n, s.grep(i, function(c) {
                return c.nodeType === 1
            }))
        }, s.fn.extend({
            find: function(n) {
                var i, u, f = this.length,
                    c = this;
                if (typeof n != "string") return this.pushStack(s(n).filter(function() {
                    for (i = 0; i < f; i++)
                        if (s.contains(c[i], this)) return !0
                }));
                for (u = this.pushStack([]), i = 0; i < f; i++) s.find(n, c[i], u);
                return f > 1 ? s.uniqueSort(u) : u
            },
            filter: function(n) {
                return this.pushStack(Cr(this, n || [], !1))
            },
            not: function(n) {
                return this.pushStack(Cr(this, n || [], !0))
            },
            is: function(n) {
                return !!Cr(this, typeof n == "string" && Xi.test(n) ? s(n) : n || [], !1).length
            }
        });
        var Qi, Df = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,
            _n = s.fn.init = function(n, i, u) {
                var f, c;
                if (!n) return this;
                if (u = u || Qi, typeof n == "string")
                    if (n[0] === "<" && n[n.length - 1] === ">" && n.length >= 3 ? f = [null, n, null] : f = Df.exec(n), f && (f[1] || !i))
                        if (f[1]) {
                            if (i = i instanceof s ? i[0] : i, s.merge(this, s.parseHTML(f[1], i && i.nodeType ? i.ownerDocument || i : le, !0)), Yi.test(f[1]) && s.isPlainObject(i))
                                for (f in i) ce(this[f]) ? this[f](i[f]) : this.attr(f, i[f]);
                            return this
                        } else return c = le.getElementById(f[2]), c && (this[0] = c, this.length = 1), this;
                else return !i || i.jquery ? (i || u).find(n) : this.constructor(i).find(n);
                else {
                    if (n.nodeType) return this[0] = n, this.length = 1, this;
                    if (ce(n)) return u.ready !== void 0 ? u.ready(n) : n(s)
                }
                return s.makeArray(n, this)
            };
        _n.prototype = s.fn, Qi = s(le);
        var on = /^(?:parents|prev(?:Until|All))/,
            Nf = {
                children: !0,
                contents: !0,
                next: !0,
                prev: !0
            };
        s.fn.extend({
            has: function(n) {
                var i = s(n, this),
                    u = i.length;
                return this.filter(function() {
                    for (var f = 0; f < u; f++)
                        if (s.contains(this, i[f])) return !0
                })
            },
            closest: function(n, i) {
                var u, f = 0,
                    c = this.length,
                    l = [],
                    p = typeof n != "string" && s(n);
                if (!Xi.test(n)) {
                    for (; f < c; f++)
                        for (u = this[f]; u && u !== i; u = u.parentNode)
                            if (u.nodeType < 11 && (p ? p.index(u) > -1 : u.nodeType === 1 && s.find.matchesSelector(u, n))) {
                                l.push(u);
                                break
                            }
                }
                return this.pushStack(l.length > 1 ? s.uniqueSort(l) : l)
            },
            index: function(n) {
                return n ? typeof n == "string" ? de.call(s(n), this[0]) : de.call(this, n.jquery ? n[0] : n) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
            },
            add: function(n, i) {
                return this.pushStack(s.uniqueSort(s.merge(this.get(), s(n, i))))
            },
            addBack: function(n) {
                return this.add(n == null ? this.prevObject : this.prevObject.filter(n))
            }
        });

        function tr(n, i) {
            for (;
                (n = n[i]) && n.nodeType !== 1;);
            return n
        }
        s.each({
            parent: function(n) {
                var i = n.parentNode;
                return i && i.nodeType !== 11 ? i : null
            },
            parents: function(n) {
                return fn(n, "parentNode")
            },
            parentsUntil: function(n, i, u) {
                return fn(n, "parentNode", u)
            },
            next: function(n) {
                return tr(n, "nextSibling")
            },
            prev: function(n) {
                return tr(n, "previousSibling")
            },
            nextAll: function(n) {
                return fn(n, "nextSibling")
            },
            prevAll: function(n) {
                return fn(n, "previousSibling")
            },
            nextUntil: function(n, i, u) {
                return fn(n, "nextSibling", u)
            },
            prevUntil: function(n, i, u) {
                return fn(n, "previousSibling", u)
            },
            siblings: function(n) {
                return Ki((n.parentNode || {}).firstChild, n)
            },
            children: function(n) {
                return Ki(n.firstChild)
            },
            contents: function(n) {
                return n.contentDocument != null && D(n.contentDocument) ? n.contentDocument : (bt(n, "template") && (n = n.content || n), s.merge([], n.childNodes))
            }
        }, function(n, i) {
            s.fn[n] = function(u, f) {
                var c = s.map(this, i, u);
                return n.slice(-5) !== "Until" && (f = u), f && typeof f == "string" && (c = s.filter(f, c)), this.length > 1 && (Nf[n] || s.uniqueSort(c), on.test(n) && c.reverse()), this.pushStack(c)
            }
        });
        var Ge = /[^\x20\t\r\n\f]+/g;

        function Rf(n) {
            var i = {};
            return s.each(n.match(Ge) || [], function(u, f) {
                i[f] = !0
            }), i
        }
        s.Callbacks = function(n) {
            n = typeof n == "string" ? Rf(n) : s.extend({}, n);
            var i, u, f, c, l = [],
                p = [],
                T = -1,
                b = function() {
                    for (c = c || n.once, f = i = !0; p.length; T = -1)
                        for (u = p.shift(); ++T < l.length;) l[T].apply(u[0], u[1]) === !1 && n.stopOnFalse && (T = l.length, u = !1);
                    n.memory || (u = !1), i = !1, c && (u ? l = [] : l = "")
                },
                L = {
                    add: function() {
                        return l && (u && !i && (T = l.length - 1, p.push(u)), function P(W) {
                            s.each(W, function(O, q) {
                                ce(q) ? (!n.unique || !L.has(q)) && l.push(q) : q && q.length && Nt(q) !== "string" && P(q)
                            })
                        }(arguments), u && !i && b()), this
                    },
                    remove: function() {
                        return s.each(arguments, function(P, W) {
                            for (var O;
                                (O = s.inArray(W, l, O)) > -1;) l.splice(O, 1), O <= T && T--
                        }), this
                    },
                    has: function(P) {
                        return P ? s.inArray(P, l) > -1 : l.length > 0
                    },
                    empty: function() {
                        return l && (l = []), this
                    },
                    disable: function() {
                        return c = p = [], l = u = "", this
                    },
                    disabled: function() {
                        return !l
                    },
                    lock: function() {
                        return c = p = [], !u && !i && (l = u = ""), this
                    },
                    locked: function() {
                        return !!c
                    },
                    fireWith: function(P, W) {
                        return c || (W = W || [], W = [P, W.slice ? W.slice() : W], p.push(W), i || b()), this
                    },
                    fire: function() {
                        return L.fireWith(this, arguments), this
                    },
                    fired: function() {
                        return !!f
                    }
                };
            return L
        };

        function Mn(n) {
            return n
        }

        function Ar(n) {
            throw n
        }

        function yn(n, i, u, f) {
            var c;
            try {
                n && ce(c = n.promise) ? c.call(n).done(i).fail(u) : n && ce(c = n.then) ? c.call(n, i, u) : i.apply(void 0, [n].slice(f))
            } catch (l) {
                u.apply(void 0, [l])
            }
        }
        s.extend({
            Deferred: function(n) {
                var i = [
                        ["notify", "progress", s.Callbacks("memory"), s.Callbacks("memory"), 2],
                        ["resolve", "done", s.Callbacks("once memory"), s.Callbacks("once memory"), 0, "resolved"],
                        ["reject", "fail", s.Callbacks("once memory"), s.Callbacks("once memory"), 1, "rejected"]
                    ],
                    u = "pending",
                    f = {
                        state: function() {
                            return u
                        },
                        always: function() {
                            return c.done(arguments).fail(arguments), this
                        },
                        catch: function(l) {
                            return f.then(null, l)
                        },
                        pipe: function() {
                            var l = arguments;
                            return s.Deferred(function(p) {
                                s.each(i, function(T, b) {
                                    var L = ce(l[b[4]]) && l[b[4]];
                                    c[b[1]](function() {
                                        var P = L && L.apply(this, arguments);
                                        P && ce(P.promise) ? P.promise().progress(p.notify).done(p.resolve).fail(p.reject) : p[b[0] + "With"](this, L ? [P] : arguments)
                                    })
                                }), l = null
                            }).promise()
                        },
                        then: function(l, p, T) {
                            var b = 0;

                            function L(P, W, O, q) {
                                return function() {
                                    var J = this,
                                        se = arguments,
                                        X = function() {
                                            var He, ye;
                                            if (!(P < b)) {
                                                if (He = O.apply(J, se), He === W.promise()) throw new TypeError("Thenable self-resolution");
                                                ye = He && (typeof He == "object" || typeof He == "function") && He.then, ce(ye) ? q ? ye.call(He, L(b, W, Mn, q), L(b, W, Ar, q)) : (b++, ye.call(He, L(b, W, Mn, q), L(b, W, Ar, q), L(b, W, Mn, W.notifyWith))) : (O !== Mn && (J = void 0, se = [He]), (q || W.resolveWith)(J, se))
                                            }
                                        },
                                        We = q ? X : function() {
                                            try {
                                                X()
                                            } catch (He) {
                                                s.Deferred.exceptionHook && s.Deferred.exceptionHook(He, We.stackTrace), P + 1 >= b && (O !== Ar && (J = void 0, se = [He]), W.rejectWith(J, se))
                                            }
                                        };
                                    P ? We() : (s.Deferred.getStackHook && (We.stackTrace = s.Deferred.getStackHook()), y.setTimeout(We))
                                }
                            }
                            return s.Deferred(function(P) {
                                i[0][3].add(L(0, P, ce(T) ? T : Mn, P.notifyWith)), i[1][3].add(L(0, P, ce(l) ? l : Mn)), i[2][3].add(L(0, P, ce(p) ? p : Ar))
                            }).promise()
                        },
                        promise: function(l) {
                            return l != null ? s.extend(l, f) : f
                        }
                    },
                    c = {};
                return s.each(i, function(l, p) {
                    var T = p[2],
                        b = p[5];
                    f[p[1]] = T.add, b && T.add(function() {
                        u = b
                    }, i[3 - l][2].disable, i[3 - l][3].disable, i[0][2].lock, i[0][3].lock), T.add(p[3].fire), c[p[0]] = function() {
                        return c[p[0] + "With"](this === c ? void 0 : this, arguments), this
                    }, c[p[0] + "With"] = T.fireWith
                }), f.promise(c), n && n.call(c, c), c
            },
            when: function(n) {
                var i = arguments.length,
                    u = i,
                    f = Array(u),
                    c = U.call(arguments),
                    l = s.Deferred(),
                    p = function(T) {
                        return function(b) {
                            f[T] = this, c[T] = arguments.length > 1 ? U.call(arguments) : b, --i || l.resolveWith(f, c)
                        }
                    };
                if (i <= 1 && (yn(n, l.done(p(u)).resolve, l.reject, !i), l.state() === "pending" || ce(c[u] && c[u].then))) return l.then();
                for (; u--;) yn(c[u], p(u), l.reject);
                return l.promise()
            }
        });
        var Sr = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;
        s.Deferred.exceptionHook = function(n, i) {
            y.console && y.console.warn && n && Sr.test(n.name) && y.console.warn("jQuery.Deferred exception: " + n.message, n.stack, i)
        }, s.readyException = function(n) {
            y.setTimeout(function() {
                throw n
            })
        };
        var ii = s.Deferred();
        s.fn.ready = function(n) {
            return ii.then(n).catch(function(i) {
                s.readyException(i)
            }), this
        }, s.extend({
            isReady: !1,
            readyWait: 1,
            ready: function(n) {
                (n === !0 ? --s.readyWait : s.isReady) || (s.isReady = !0, !(n !== !0 && --s.readyWait > 0) && ii.resolveWith(le, [s]))
            }
        }), s.ready.then = ii.then;

        function an() {
            le.removeEventListener("DOMContentLoaded", an), y.removeEventListener("load", an), s.ready()
        }
        le.readyState === "complete" || le.readyState !== "loading" && !le.documentElement.doScroll ? y.setTimeout(s.ready) : (le.addEventListener("DOMContentLoaded", an), y.addEventListener("load", an));
        var dt = function(n, i, u, f, c, l, p) {
                var T = 0,
                    b = n.length,
                    L = u == null;
                if (Nt(u) === "object") {
                    c = !0;
                    for (T in u) dt(n, i, T, u[T], !0, l, p)
                } else if (f !== void 0 && (c = !0, ce(f) || (p = !0), L && (p ? (i.call(n, f), i = null) : (L = i, i = function(P, W, O) {
                        return L.call(s(P), O)
                    })), i))
                    for (; T < b; T++) i(n[T], u, p ? f : f.call(n[T], T, i(n[T], u)));
                return c ? n : L ? i.call(n) : b ? i(n[0], u) : l
            },
            Pf = /^-ms-/,
            Er = /-([a-z])/g;

        function Lr(n, i) {
            return i.toUpperCase()
        }

        function Mt(n) {
            return n.replace(Pf, "ms-").replace(Er, Lr)
        }
        var nt = function(n) {
            return n.nodeType === 1 || n.nodeType === 9 || !+n.nodeType
        };

        function Zt() {
            this.expando = s.expando + Zt.uid++
        }
        Zt.uid = 1, Zt.prototype = {
            cache: function(n) {
                var i = n[this.expando];
                return i || (i = {}, nt(n) && (n.nodeType ? n[this.expando] = i : Object.defineProperty(n, this.expando, {
                    value: i,
                    configurable: !0
                }))), i
            },
            set: function(n, i, u) {
                var f, c = this.cache(n);
                if (typeof i == "string") c[Mt(i)] = u;
                else
                    for (f in i) c[Mt(f)] = i[f];
                return c
            },
            get: function(n, i) {
                return i === void 0 ? this.cache(n) : n[this.expando] && n[this.expando][Mt(i)]
            },
            access: function(n, i, u) {
                return i === void 0 || i && typeof i == "string" && u === void 0 ? this.get(n, i) : (this.set(n, i, u), u !== void 0 ? u : i)
            },
            remove: function(n, i) {
                var u, f = n[this.expando];
                if (f !== void 0) {
                    if (i !== void 0)
                        for (Array.isArray(i) ? i = i.map(Mt) : (i = Mt(i), i = i in f ? [i] : i.match(Ge) || []), u = i.length; u--;) delete f[i[u]];
                    (i === void 0 || s.isEmptyObject(f)) && (n.nodeType ? n[this.expando] = void 0 : delete n[this.expando])
                }
            },
            hasData: function(n) {
                var i = n[this.expando];
                return i !== void 0 && !s.isEmptyObject(i)
            }
        };
        var te = new Zt,
            ke = new Zt,
            Zi = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
            qf = /[A-Z]/g;

        function nr(n) {
            return n === "true" ? !0 : n === "false" ? !1 : n === "null" ? null : n === +n + "" ? +n : Zi.test(n) ? JSON.parse(n) : n
        }

        function wt(n, i, u) {
            var f;
            if (u === void 0 && n.nodeType === 1)
                if (f = "data-" + i.replace(qf, "-$&").toLowerCase(), u = n.getAttribute(f), typeof u == "string") {
                    try {
                        u = nr(u)
                    } catch {}
                    ke.set(n, i, u)
                } else u = void 0;
            return u
        }
        s.extend({
            hasData: function(n) {
                return ke.hasData(n) || te.hasData(n)
            },
            data: function(n, i, u) {
                return ke.access(n, i, u)
            },
            removeData: function(n, i) {
                ke.remove(n, i)
            },
            _data: function(n, i, u) {
                return te.access(n, i, u)
            },
            _removeData: function(n, i) {
                te.remove(n, i)
            }
        }), s.fn.extend({
            data: function(n, i) {
                var u, f, c, l = this[0],
                    p = l && l.attributes;
                if (n === void 0) {
                    if (this.length && (c = ke.get(l), l.nodeType === 1 && !te.get(l, "hasDataAttrs"))) {
                        for (u = p.length; u--;) p[u] && (f = p[u].name, f.indexOf("data-") === 0 && (f = Mt(f.slice(5)), wt(l, f, c[f])));
                        te.set(l, "hasDataAttrs", !0)
                    }
                    return c
                }
                return typeof n == "object" ? this.each(function() {
                    ke.set(this, n)
                }) : dt(this, function(T) {
                    var b;
                    if (l && T === void 0) return b = ke.get(l, n), b !== void 0 || (b = wt(l, n), b !== void 0) ? b : void 0;
                    this.each(function() {
                        ke.set(this, n, T)
                    })
                }, null, i, arguments.length > 1, null, !0)
            },
            removeData: function(n) {
                return this.each(function() {
                    ke.remove(this, n)
                })
            }
        }), s.extend({
            queue: function(n, i, u) {
                var f;
                if (n) return i = (i || "fx") + "queue", f = te.get(n, i), u && (!f || Array.isArray(u) ? f = te.access(n, i, s.makeArray(u)) : f.push(u)), f || []
            },
            dequeue: function(n, i) {
                i = i || "fx";
                var u = s.queue(n, i),
                    f = u.length,
                    c = u.shift(),
                    l = s._queueHooks(n, i),
                    p = function() {
                        s.dequeue(n, i)
                    };
                c === "inprogress" && (c = u.shift(), f--), c && (i === "fx" && u.unshift("inprogress"), delete l.stop, c.call(n, p, l)), !f && l && l.empty.fire()
            },
            _queueHooks: function(n, i) {
                var u = i + "queueHooks";
                return te.get(n, u) || te.access(n, u, {
                    empty: s.Callbacks("once memory").add(function() {
                        te.remove(n, [i + "queue", u])
                    })
                })
            }
        }), s.fn.extend({
            queue: function(n, i) {
                var u = 2;
                return typeof n != "string" && (i = n, n = "fx", u--), arguments.length < u ? s.queue(this[0], n) : i === void 0 ? this : this.each(function() {
                    var f = s.queue(this, n, i);
                    s._queueHooks(this, n), n === "fx" && f[0] !== "inprogress" && s.dequeue(this, n)
                })
            },
            dequeue: function(n) {
                return this.each(function() {
                    s.dequeue(this, n)
                })
            },
            clearQueue: function(n) {
                return this.queue(n || "fx", [])
            },
            promise: function(n, i) {
                var u, f = 1,
                    c = s.Deferred(),
                    l = this,
                    p = this.length,
                    T = function() {
                        --f || c.resolveWith(l, [l])
                    };
                for (typeof n != "string" && (i = n, n = void 0), n = n || "fx"; p--;) u = te.get(l[p], n + "queueHooks"), u && u.empty && (f++, u.empty.add(T));
                return T(), c.promise(i)
            }
        });
        var kn = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
            sn = new RegExp("^(?:([+-])=|)(" + kn + ")([a-z%]*)$", "i"),
            Jt = ["Top", "Right", "Bottom", "Left"],
            kt = le.documentElement,
            Wn = function(n) {
                return s.contains(n.ownerDocument, n)
            },
            rr = {
                composed: !0
            };
        kt.getRootNode && (Wn = function(n) {
            return s.contains(n.ownerDocument, n) || n.getRootNode(rr) === n.ownerDocument
        });
        var Vt = function(n, i) {
            return n = i || n, n.style.display === "none" || n.style.display === "" && Wn(n) && s.css(n, "display") === "none"
        };

        function Or(n, i, u, f) {
            var c, l, p = 20,
                T = f ? function() {
                    return f.cur()
                } : function() {
                    return s.css(n, i, "")
                },
                b = T(),
                L = u && u[3] || (s.cssNumber[i] ? "" : "px"),
                P = n.nodeType && (s.cssNumber[i] || L !== "px" && +b) && sn.exec(s.css(n, i));
            if (P && P[3] !== L) {
                for (b = b / 2, L = L || P[3], P = +b || 1; p--;) s.style(n, i, P + L), (1 - l) * (1 - (l = T() / b || .5)) <= 0 && (p = 0), P = P / l;
                P = P * 2, s.style(n, i, P + L), u = u || []
            }
            return u && (P = +P || +b || 0, c = u[1] ? P + (u[1] + 1) * u[2] : +u[2], f && (f.unit = L, f.start = P, f.end = c)), c
        }
        var Dr = {};

        function ui(n) {
            var i, u = n.ownerDocument,
                f = n.nodeName,
                c = Dr[f];
            return c || (i = u.body.appendChild(u.createElement(f)), c = s.css(i, "display"), i.parentNode.removeChild(i), c === "none" && (c = "block"), Dr[f] = c, c)
        }

        function cn(n, i) {
            for (var u, f, c = [], l = 0, p = n.length; l < p; l++) f = n[l], f.style && (u = f.style.display, i ? (u === "none" && (c[l] = te.get(f, "display") || null, c[l] || (f.style.display = "")), f.style.display === "" && Vt(f) && (c[l] = ui(f))) : u !== "none" && (c[l] = "none", te.set(f, "display", u)));
            for (l = 0; l < p; l++) c[l] != null && (n[l].style.display = c[l]);
            return n
        }
        s.fn.extend({
            show: function() {
                return cn(this, !0)
            },
            hide: function() {
                return cn(this)
            },
            toggle: function(n) {
                return typeof n == "boolean" ? n ? this.show() : this.hide() : this.each(function() {
                    Vt(this) ? s(this).show() : s(this).hide()
                })
            }
        });
        var bn = /^(?:checkbox|radio)$/i,
            Nr = /<([a-z][^\/\0>\x20\t\r\n\f]*)/i,
            Rr = /^$|^module$|\/(?:java|ecma)script/i;
        (function() {
            var n = le.createDocumentFragment(),
                i = n.appendChild(le.createElement("div")),
                u = le.createElement("input");
            u.setAttribute("type", "radio"), u.setAttribute("checked", "checked"), u.setAttribute("name", "t"), i.appendChild(u), be.checkClone = i.cloneNode(!0).cloneNode(!0).lastChild.checked, i.innerHTML = "<textarea>x</textarea>", be.noCloneChecked = !!i.cloneNode(!0).lastChild.defaultValue, i.innerHTML = "<option></option>", be.option = !!i.lastChild
        })();
        var it = {
            thead: [1, "<table>", "</table>"],
            col: [2, "<table><colgroup>", "</colgroup></table>"],
            tr: [2, "<table><tbody>", "</tbody></table>"],
            td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
            _default: [0, "", ""]
        };
        it.tbody = it.tfoot = it.colgroup = it.caption = it.thead, it.th = it.td, be.option || (it.optgroup = it.option = [1, "<select multiple='multiple'>", "</select>"]);

        function Ve(n, i) {
            var u;
            return typeof n.getElementsByTagName < "u" ? u = n.getElementsByTagName(i || "*") : typeof n.querySelectorAll < "u" ? u = n.querySelectorAll(i || "*") : u = [], i === void 0 || i && bt(n, i) ? s.merge([n], u) : u
        }

        function fi(n, i) {
            for (var u = 0, f = n.length; u < f; u++) te.set(n[u], "globalEval", !i || te.get(i[u], "globalEval"))
        }
        var Mf = /<|&#?\w+;/;

        function Ji(n, i, u, f, c) {
            for (var l, p, T, b, L, P, W = i.createDocumentFragment(), O = [], q = 0, J = n.length; q < J; q++)
                if (l = n[q], l || l === 0)
                    if (Nt(l) === "object") s.merge(O, l.nodeType ? [l] : l);
                    else if (!Mf.test(l)) O.push(i.createTextNode(l));
            else {
                for (p = p || W.appendChild(i.createElement("div")), T = (Nr.exec(l) || ["", ""])[1].toLowerCase(), b = it[T] || it._default, p.innerHTML = b[1] + s.htmlPrefilter(l) + b[2], P = b[0]; P--;) p = p.lastChild;
                s.merge(O, p.childNodes), p = W.firstChild, p.textContent = ""
            }
            for (W.textContent = "", q = 0; l = O[q++];) {
                if (f && s.inArray(l, f) > -1) {
                    c && c.push(l);
                    continue
                }
                if (L = Wn(l), p = Ve(W.appendChild(l), "script"), L && fi(p), u)
                    for (P = 0; l = p[P++];) Rr.test(l.type || "") && u.push(l)
            }
            return W
        }
        var oi = /^([^.]*)(?:\.(.+)|)/;

        function wn() {
            return !0
        }

        function Hn() {
            return !1
        }

        function kf(n, i) {
            return n === Wf() == (i === "focus")
        }

        function Wf() {
            try {
                return le.activeElement
            } catch {}
        }

        function ai(n, i, u, f, c, l) {
            var p, T;
            if (typeof i == "object") {
                typeof u != "string" && (f = f || u, u = void 0);
                for (T in i) ai(n, T, u, f, i[T], l);
                return n
            }
            if (f == null && c == null ? (c = u, f = u = void 0) : c == null && (typeof u == "string" ? (c = f, f = void 0) : (c = f, f = u, u = void 0)), c === !1) c = Hn;
            else if (!c) return n;
            return l === 1 && (p = c, c = function(b) {
                return s().off(b), p.apply(this, arguments)
            }, c.guid = p.guid || (p.guid = s.guid++)), n.each(function() {
                s.event.add(this, i, c, f, u)
            })
        }
        s.event = {
            global: {},
            add: function(n, i, u, f, c) {
                var l, p, T, b, L, P, W, O, q, J, se, X = te.get(n);
                if (nt(n))
                    for (u.handler && (l = u, u = l.handler, c = l.selector), c && s.find.matchesSelector(kt, c), u.guid || (u.guid = s.guid++), (b = X.events) || (b = X.events = Object.create(null)), (p = X.handle) || (p = X.handle = function(We) {
                            return typeof s < "u" && s.event.triggered !== We.type ? s.event.dispatch.apply(n, arguments) : void 0
                        }), i = (i || "").match(Ge) || [""], L = i.length; L--;) T = oi.exec(i[L]) || [], q = se = T[1], J = (T[2] || "").split(".").sort(), q && (W = s.event.special[q] || {}, q = (c ? W.delegateType : W.bindType) || q, W = s.event.special[q] || {}, P = s.extend({
                        type: q,
                        origType: se,
                        data: f,
                        handler: u,
                        guid: u.guid,
                        selector: c,
                        needsContext: c && s.expr.match.needsContext.test(c),
                        namespace: J.join(".")
                    }, l), (O = b[q]) || (O = b[q] = [], O.delegateCount = 0, (!W.setup || W.setup.call(n, f, J, p) === !1) && n.addEventListener && n.addEventListener(q, p)), W.add && (W.add.call(n, P), P.handler.guid || (P.handler.guid = u.guid)), c ? O.splice(O.delegateCount++, 0, P) : O.push(P), s.event.global[q] = !0)
            },
            remove: function(n, i, u, f, c) {
                var l, p, T, b, L, P, W, O, q, J, se, X = te.hasData(n) && te.get(n);
                if (!(!X || !(b = X.events))) {
                    for (i = (i || "").match(Ge) || [""], L = i.length; L--;) {
                        if (T = oi.exec(i[L]) || [], q = se = T[1], J = (T[2] || "").split(".").sort(), !q) {
                            for (q in b) s.event.remove(n, q + i[L], u, f, !0);
                            continue
                        }
                        for (W = s.event.special[q] || {}, q = (f ? W.delegateType : W.bindType) || q, O = b[q] || [], T = T[2] && new RegExp("(^|\\.)" + J.join("\\.(?:.*\\.|)") + "(\\.|$)"), p = l = O.length; l--;) P = O[l], (c || se === P.origType) && (!u || u.guid === P.guid) && (!T || T.test(P.namespace)) && (!f || f === P.selector || f === "**" && P.selector) && (O.splice(l, 1), P.selector && O.delegateCount--, W.remove && W.remove.call(n, P));
                        p && !O.length && ((!W.teardown || W.teardown.call(n, J, X.handle) === !1) && s.removeEvent(n, q, X.handle), delete b[q])
                    }
                    s.isEmptyObject(b) && te.remove(n, "handle events")
                }
            },
            dispatch: function(n) {
                var i, u, f, c, l, p, T = new Array(arguments.length),
                    b = s.event.fix(n),
                    L = (te.get(this, "events") || Object.create(null))[b.type] || [],
                    P = s.event.special[b.type] || {};
                for (T[0] = b, i = 1; i < arguments.length; i++) T[i] = arguments[i];
                if (b.delegateTarget = this, !(P.preDispatch && P.preDispatch.call(this, b) === !1)) {
                    for (p = s.event.handlers.call(this, b, L), i = 0;
                        (c = p[i++]) && !b.isPropagationStopped();)
                        for (b.currentTarget = c.elem, u = 0;
                            (l = c.handlers[u++]) && !b.isImmediatePropagationStopped();)(!b.rnamespace || l.namespace === !1 || b.rnamespace.test(l.namespace)) && (b.handleObj = l, b.data = l.data, f = ((s.event.special[l.origType] || {}).handle || l.handler).apply(c.elem, T), f !== void 0 && (b.result = f) === !1 && (b.preventDefault(), b.stopPropagation()));
                    return P.postDispatch && P.postDispatch.call(this, b), b.result
                }
            },
            handlers: function(n, i) {
                var u, f, c, l, p, T = [],
                    b = i.delegateCount,
                    L = n.target;
                if (b && L.nodeType && !(n.type === "click" && n.button >= 1)) {
                    for (; L !== this; L = L.parentNode || this)
                        if (L.nodeType === 1 && !(n.type === "click" && L.disabled === !0)) {
                            for (l = [], p = {}, u = 0; u < b; u++) f = i[u], c = f.selector + " ", p[c] === void 0 && (p[c] = f.needsContext ? s(c, this).index(L) > -1 : s.find(c, this, null, [L]).length), p[c] && l.push(f);
                            l.length && T.push({
                                elem: L,
                                handlers: l
                            })
                        }
                }
                return L = this, b < i.length && T.push({
                    elem: L,
                    handlers: i.slice(b)
                }), T
            },
            addProp: function(n, i) {
                Object.defineProperty(s.Event.prototype, n, {
                    enumerable: !0,
                    configurable: !0,
                    get: ce(i) ? function() {
                        if (this.originalEvent) return i(this.originalEvent)
                    } : function() {
                        if (this.originalEvent) return this.originalEvent[n]
                    },
                    set: function(u) {
                        Object.defineProperty(this, n, {
                            enumerable: !0,
                            configurable: !0,
                            writable: !0,
                            value: u
                        })
                    }
                })
            },
            fix: function(n) {
                return n[s.expando] ? n : new s.Event(n)
            },
            special: {
                load: {
                    noBubble: !0
                },
                click: {
                    setup: function(n) {
                        var i = this || n;
                        return bn.test(i.type) && i.click && bt(i, "input") && ir(i, "click", wn), !1
                    },
                    trigger: function(n) {
                        var i = this || n;
                        return bn.test(i.type) && i.click && bt(i, "input") && ir(i, "click"), !0
                    },
                    _default: function(n) {
                        var i = n.target;
                        return bn.test(i.type) && i.click && bt(i, "input") && te.get(i, "click") || bt(i, "a")
                    }
                },
                beforeunload: {
                    postDispatch: function(n) {
                        n.result !== void 0 && n.originalEvent && (n.originalEvent.returnValue = n.result)
                    }
                }
            }
        };

        function ir(n, i, u) {
            if (!u) {
                te.get(n, i) === void 0 && s.event.add(n, i, wn);
                return
            }
            te.set(n, i, !1), s.event.add(n, i, {
                namespace: !1,
                handler: function(f) {
                    var c, l, p = te.get(this, i);
                    if (f.isTrigger & 1 && this[i]) {
                        if (p.length)(s.event.special[i] || {}).delegateType && f.stopPropagation();
                        else if (p = U.call(arguments), te.set(this, i, p), c = u(this, i), this[i](), l = te.get(this, i), p !== l || c ? te.set(this, i, !1) : l = {}, p !== l) return f.stopImmediatePropagation(), f.preventDefault(), l && l.value
                    } else p.length && (te.set(this, i, {
                        value: s.event.trigger(s.extend(p[0], s.Event.prototype), p.slice(1), this)
                    }), f.stopImmediatePropagation())
                }
            })
        }
        s.removeEvent = function(n, i, u) {
            n.removeEventListener && n.removeEventListener(i, u)
        }, s.Event = function(n, i) {
            if (!(this instanceof s.Event)) return new s.Event(n, i);
            n && n.type ? (this.originalEvent = n, this.type = n.type, this.isDefaultPrevented = n.defaultPrevented || n.defaultPrevented === void 0 && n.returnValue === !1 ? wn : Hn, this.target = n.target && n.target.nodeType === 3 ? n.target.parentNode : n.target, this.currentTarget = n.currentTarget, this.relatedTarget = n.relatedTarget) : this.type = n, i && s.extend(this, i), this.timeStamp = n && n.timeStamp || Date.now(), this[s.expando] = !0
        }, s.Event.prototype = {
            constructor: s.Event,
            isDefaultPrevented: Hn,
            isPropagationStopped: Hn,
            isImmediatePropagationStopped: Hn,
            isSimulated: !1,
            preventDefault: function() {
                var n = this.originalEvent;
                this.isDefaultPrevented = wn, n && !this.isSimulated && n.preventDefault()
            },
            stopPropagation: function() {
                var n = this.originalEvent;
                this.isPropagationStopped = wn, n && !this.isSimulated && n.stopPropagation()
            },
            stopImmediatePropagation: function() {
                var n = this.originalEvent;
                this.isImmediatePropagationStopped = wn, n && !this.isSimulated && n.stopImmediatePropagation(), this.stopPropagation()
            }
        }, s.each({
            altKey: !0,
            bubbles: !0,
            cancelable: !0,
            changedTouches: !0,
            ctrlKey: !0,
            detail: !0,
            eventPhase: !0,
            metaKey: !0,
            pageX: !0,
            pageY: !0,
            shiftKey: !0,
            view: !0,
            char: !0,
            code: !0,
            charCode: !0,
            key: !0,
            keyCode: !0,
            button: !0,
            buttons: !0,
            clientX: !0,
            clientY: !0,
            offsetX: !0,
            offsetY: !0,
            pointerId: !0,
            pointerType: !0,
            screenX: !0,
            screenY: !0,
            targetTouches: !0,
            toElement: !0,
            touches: !0,
            which: !0
        }, s.event.addProp), s.each({
            focus: "focusin",
            blur: "focusout"
        }, function(n, i) {
            s.event.special[n] = {
                setup: function() {
                    return ir(this, n, kf), !1
                },
                trigger: function() {
                    return ir(this, n), !0
                },
                _default: function(u) {
                    return te.get(u.target, n)
                },
                delegateType: i
            }
        }), s.each({
            mouseenter: "mouseover",
            mouseleave: "mouseout",
            pointerenter: "pointerover",
            pointerleave: "pointerout"
        }, function(n, i) {
            s.event.special[n] = {
                delegateType: i,
                bindType: i,
                handle: function(u) {
                    var f, c = this,
                        l = u.relatedTarget,
                        p = u.handleObj;
                    return (!l || l !== c && !s.contains(c, l)) && (u.type = p.origType, f = p.handler.apply(this, arguments), u.type = i), f
                }
            }
        }), s.fn.extend({
            on: function(n, i, u, f) {
                return ai(this, n, i, u, f)
            },
            one: function(n, i, u, f) {
                return ai(this, n, i, u, f, 1)
            },
            off: function(n, i, u) {
                var f, c;
                if (n && n.preventDefault && n.handleObj) return f = n.handleObj, s(n.delegateTarget).off(f.namespace ? f.origType + "." + f.namespace : f.origType, f.selector, f.handler), this;
                if (typeof n == "object") {
                    for (c in n) this.off(c, i, n[c]);
                    return this
                }
                return (i === !1 || typeof i == "function") && (u = i, i = void 0), u === !1 && (u = Hn), this.each(function() {
                    s.event.remove(this, n, u, i)
                })
            }
        });
        var Hf = /<script|<style|<link/i,
            Bf = /checked\s*(?:[^=]|=\s*.checked.)/i,
            Ff = /^\s*<!\[CDATA\[|\]\]>\s*$/g;

        function Pr(n, i) {
            return bt(n, "table") && bt(i.nodeType !== 11 ? i : i.firstChild, "tr") && s(n).children("tbody")[0] || n
        }

        function Uf(n) {
            return n.type = (n.getAttribute("type") !== null) + "/" + n.type, n
        }

        function si(n) {
            return (n.type || "").slice(0, 5) === "true/" ? n.type = n.type.slice(5) : n.removeAttribute("type"), n
        }

        function Vi(n, i) {
            var u, f, c, l, p, T, b;
            if (i.nodeType === 1) {
                if (te.hasData(n) && (l = te.get(n), b = l.events, b)) {
                    te.remove(i, "handle events");
                    for (c in b)
                        for (u = 0, f = b[c].length; u < f; u++) s.event.add(i, c, b[c][u])
                }
                ke.hasData(n) && (p = ke.access(n), T = s.extend({}, p), ke.set(i, T))
            }
        }

        function $f(n, i) {
            var u = i.nodeName.toLowerCase();
            u === "input" && bn.test(n.type) ? i.checked = n.checked : (u === "input" || u === "textarea") && (i.defaultValue = n.defaultValue)
        }

        function Bn(n, i, u, f) {
            i = Y(i);
            var c, l, p, T, b, L, P = 0,
                W = n.length,
                O = W - 1,
                q = i[0],
                J = ce(q);
            if (J || W > 1 && typeof q == "string" && !be.checkClone && Bf.test(q)) return n.each(function(se) {
                var X = n.eq(se);
                J && (i[0] = q.call(this, se, X.html())), Bn(X, i, u, f)
            });
            if (W && (c = Ji(i, n[0].ownerDocument, !1, n, f), l = c.firstChild, c.childNodes.length === 1 && (c = l), l || f)) {
                for (p = s.map(Ve(c, "script"), Uf), T = p.length; P < W; P++) b = c, P !== O && (b = s.clone(b, !0, !0), T && s.merge(p, Ve(b, "script"))), u.call(n[P], b, P);
                if (T)
                    for (L = p[p.length - 1].ownerDocument, s.map(p, si), P = 0; P < T; P++) b = p[P], Rr.test(b.type || "") && !te.access(b, "globalEval") && s.contains(L, b) && (b.src && (b.type || "").toLowerCase() !== "module" ? s._evalUrl && !b.noModule && s._evalUrl(b.src, {
                        nonce: b.nonce || b.getAttribute("nonce")
                    }, L) : Dt(b.textContent.replace(Ff, ""), b, L))
            }
            return n
        }

        function eu(n, i, u) {
            for (var f, c = i ? s.filter(i, n) : n, l = 0;
                (f = c[l]) != null; l++) !u && f.nodeType === 1 && s.cleanData(Ve(f)), f.parentNode && (u && Wn(f) && fi(Ve(f, "script")), f.parentNode.removeChild(f));
            return n
        }
        s.extend({
            htmlPrefilter: function(n) {
                return n
            },
            clone: function(n, i, u) {
                var f, c, l, p, T = n.cloneNode(!0),
                    b = Wn(n);
                if (!be.noCloneChecked && (n.nodeType === 1 || n.nodeType === 11) && !s.isXMLDoc(n))
                    for (p = Ve(T), l = Ve(n), f = 0, c = l.length; f < c; f++) $f(l[f], p[f]);
                if (i)
                    if (u)
                        for (l = l || Ve(n), p = p || Ve(T), f = 0, c = l.length; f < c; f++) Vi(l[f], p[f]);
                    else Vi(n, T);
                return p = Ve(T, "script"), p.length > 0 && fi(p, !b && Ve(n, "script")), T
            },
            cleanData: function(n) {
                for (var i, u, f, c = s.event.special, l = 0;
                    (u = n[l]) !== void 0; l++)
                    if (nt(u)) {
                        if (i = u[te.expando]) {
                            if (i.events)
                                for (f in i.events) c[f] ? s.event.remove(u, f) : s.removeEvent(u, f, i.handle);
                            u[te.expando] = void 0
                        }
                        u[ke.expando] && (u[ke.expando] = void 0)
                    }
            }
        }), s.fn.extend({
            detach: function(n) {
                return eu(this, n, !0)
            },
            remove: function(n) {
                return eu(this, n)
            },
            text: function(n) {
                return dt(this, function(i) {
                    return i === void 0 ? s.text(this) : this.empty().each(function() {
                        (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) && (this.textContent = i)
                    })
                }, null, n, arguments.length)
            },
            append: function() {
                return Bn(this, arguments, function(n) {
                    if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
                        var i = Pr(this, n);
                        i.appendChild(n)
                    }
                })
            },
            prepend: function() {
                return Bn(this, arguments, function(n) {
                    if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
                        var i = Pr(this, n);
                        i.insertBefore(n, i.firstChild)
                    }
                })
            },
            before: function() {
                return Bn(this, arguments, function(n) {
                    this.parentNode && this.parentNode.insertBefore(n, this)
                })
            },
            after: function() {
                return Bn(this, arguments, function(n) {
                    this.parentNode && this.parentNode.insertBefore(n, this.nextSibling)
                })
            },
            empty: function() {
                for (var n, i = 0;
                    (n = this[i]) != null; i++) n.nodeType === 1 && (s.cleanData(Ve(n, !1)), n.textContent = "");
                return this
            },
            clone: function(n, i) {
                return n = n ?? !1, i = i ?? n, this.map(function() {
                    return s.clone(this, n, i)
                })
            },
            html: function(n) {
                return dt(this, function(i) {
                    var u = this[0] || {},
                        f = 0,
                        c = this.length;
                    if (i === void 0 && u.nodeType === 1) return u.innerHTML;
                    if (typeof i == "string" && !Hf.test(i) && !it[(Nr.exec(i) || ["", ""])[1].toLowerCase()]) {
                        i = s.htmlPrefilter(i);
                        try {
                            for (; f < c; f++) u = this[f] || {}, u.nodeType === 1 && (s.cleanData(Ve(u, !1)), u.innerHTML = i);
                            u = 0
                        } catch {}
                    }
                    u && this.empty().append(i)
                }, null, n, arguments.length)
            },
            replaceWith: function() {
                var n = [];
                return Bn(this, arguments, function(i) {
                    var u = this.parentNode;
                    s.inArray(this, n) < 0 && (s.cleanData(Ve(this)), u && u.replaceChild(i, this))
                }, n)
            }
        }), s.each({
            appendTo: "append",
            prependTo: "prepend",
            insertBefore: "before",
            insertAfter: "after",
            replaceAll: "replaceWith"
        }, function(n, i) {
            s.fn[n] = function(u) {
                for (var f, c = [], l = s(u), p = l.length - 1, T = 0; T <= p; T++) f = T === p ? this : this.clone(!0), s(l[T])[i](f), ge.apply(c, f.get());
                return this.pushStack(c)
            }
        });
        var ci = new RegExp("^(" + kn + ")(?!px)[a-z%]+$", "i"),
            li = /^--/,
            qr = function(n) {
                var i = n.ownerDocument.defaultView;
                return (!i || !i.opener) && (i = y), i.getComputedStyle(n)
            },
            tu = function(n, i, u) {
                var f, c, l = {};
                for (c in i) l[c] = n.style[c], n.style[c] = i[c];
                f = u.call(n);
                for (c in i) n.style[c] = l[c];
                return f
            },
            nu = new RegExp(Jt.join("|"), "i"),
            ru = "[\\x20\\t\\r\\n\\f]",
            Gf = new RegExp("^" + ru + "+|((?:^|[^\\\\])(?:\\\\.)*)" + ru + "+$", "g");
        (function() {
            function n() {
                if (L) {
                    b.style.cssText = "position:absolute;left:-11111px;width:60px;margin-top:1px;padding:0;border:0", L.style.cssText = "position:relative;display:block;box-sizing:border-box;overflow:scroll;margin:auto;border:1px;padding:1px;width:60%;top:1%", kt.appendChild(b).appendChild(L);
                    var P = y.getComputedStyle(L);
                    u = P.top !== "1%", T = i(P.marginLeft) === 12, L.style.right = "60%", l = i(P.right) === 36, f = i(P.width) === 36, L.style.position = "absolute", c = i(L.offsetWidth / 3) === 12, kt.removeChild(b), L = null
                }
            }

            function i(P) {
                return Math.round(parseFloat(P))
            }
            var u, f, c, l, p, T, b = le.createElement("div"),
                L = le.createElement("div");
            L.style && (L.style.backgroundClip = "content-box", L.cloneNode(!0).style.backgroundClip = "", be.clearCloneStyle = L.style.backgroundClip === "content-box", s.extend(be, {
                boxSizingReliable: function() {
                    return n(), f
                },
                pixelBoxStyles: function() {
                    return n(), l
                },
                pixelPosition: function() {
                    return n(), u
                },
                reliableMarginLeft: function() {
                    return n(), T
                },
                scrollboxSize: function() {
                    return n(), c
                },
                reliableTrDimensions: function() {
                    var P, W, O, q;
                    return p == null && (P = le.createElement("table"), W = le.createElement("tr"), O = le.createElement("div"), P.style.cssText = "position:absolute;left:-11111px;border-collapse:separate", W.style.cssText = "border:1px solid", W.style.height = "1px", O.style.height = "9px", O.style.display = "block", kt.appendChild(P).appendChild(W).appendChild(O), q = y.getComputedStyle(W), p = parseInt(q.height, 10) + parseInt(q.borderTopWidth, 10) + parseInt(q.borderBottomWidth, 10) === W.offsetHeight, kt.removeChild(P)), p
                }
            }))
        })();

        function ur(n, i, u) {
            var f, c, l, p, T = li.test(i),
                b = n.style;
            return u = u || qr(n), u && (p = u.getPropertyValue(i) || u[i], T && p && (p = p.replace(Gf, "$1") || void 0), p === "" && !Wn(n) && (p = s.style(n, i)), !be.pixelBoxStyles() && ci.test(p) && nu.test(i) && (f = b.width, c = b.minWidth, l = b.maxWidth, b.minWidth = b.maxWidth = b.width = p, p = u.width, b.width = f, b.minWidth = c, b.maxWidth = l)), p !== void 0 ? p + "" : p
        }

        function iu(n, i) {
            return {
                get: function() {
                    if (n()) {
                        delete this.get;
                        return
                    }
                    return (this.get = i).apply(this, arguments)
                }
            }
        }
        var uu = ["Webkit", "Moz", "ms"],
            fu = le.createElement("div").style,
            fr = {};

        function zf(n) {
            for (var i = n[0].toUpperCase() + n.slice(1), u = uu.length; u--;)
                if (n = uu[u] + i, n in fu) return n
        }

        function Fn(n) {
            var i = s.cssProps[n] || fr[n];
            return i || (n in fu ? n : fr[n] = zf(n) || n)
        }
        var jf = /^(none|table(?!-c[ea]).+)/,
            Kf = {
                position: "absolute",
                visibility: "hidden",
                display: "block"
            },
            ou = {
                letterSpacing: "0",
                fontWeight: "400"
            };

        function hi(n, i, u) {
            var f = sn.exec(i);
            return f ? Math.max(0, f[2] - (u || 0)) + (f[3] || "px") : i
        }

        function Mr(n, i, u, f, c, l) {
            var p = i === "width" ? 1 : 0,
                T = 0,
                b = 0;
            if (u === (f ? "border" : "content")) return 0;
            for (; p < 4; p += 2) u === "margin" && (b += s.css(n, u + Jt[p], !0, c)), f ? (u === "content" && (b -= s.css(n, "padding" + Jt[p], !0, c)), u !== "margin" && (b -= s.css(n, "border" + Jt[p] + "Width", !0, c))) : (b += s.css(n, "padding" + Jt[p], !0, c), u !== "padding" ? b += s.css(n, "border" + Jt[p] + "Width", !0, c) : T += s.css(n, "border" + Jt[p] + "Width", !0, c));
            return !f && l >= 0 && (b += Math.max(0, Math.ceil(n["offset" + i[0].toUpperCase() + i.slice(1)] - l - b - T - .5)) || 0), b
        }

        function pi(n, i, u) {
            var f = qr(n),
                c = !be.boxSizingReliable() || u,
                l = c && s.css(n, "boxSizing", !1, f) === "border-box",
                p = l,
                T = ur(n, i, f),
                b = "offset" + i[0].toUpperCase() + i.slice(1);
            if (ci.test(T)) {
                if (!u) return T;
                T = "auto"
            }
            return (!be.boxSizingReliable() && l || !be.reliableTrDimensions() && bt(n, "tr") || T === "auto" || !parseFloat(T) && s.css(n, "display", !1, f) === "inline") && n.getClientRects().length && (l = s.css(n, "boxSizing", !1, f) === "border-box", p = b in n, p && (T = n[b])), T = parseFloat(T) || 0, T + Mr(n, i, u || (l ? "border" : "content"), p, f, T) + "px"
        }
        s.extend({
            cssHooks: {
                opacity: {
                    get: function(n, i) {
                        if (i) {
                            var u = ur(n, "opacity");
                            return u === "" ? "1" : u
                        }
                    }
                }
            },
            cssNumber: {
                animationIterationCount: !0,
                columnCount: !0,
                fillOpacity: !0,
                flexGrow: !0,
                flexShrink: !0,
                fontWeight: !0,
                gridArea: !0,
                gridColumn: !0,
                gridColumnEnd: !0,
                gridColumnStart: !0,
                gridRow: !0,
                gridRowEnd: !0,
                gridRowStart: !0,
                lineHeight: !0,
                opacity: !0,
                order: !0,
                orphans: !0,
                widows: !0,
                zIndex: !0,
                zoom: !0
            },
            cssProps: {},
            style: function(n, i, u, f) {
                if (!(!n || n.nodeType === 3 || n.nodeType === 8 || !n.style)) {
                    var c, l, p, T = Mt(i),
                        b = li.test(i),
                        L = n.style;
                    if (b || (i = Fn(T)), p = s.cssHooks[i] || s.cssHooks[T], u !== void 0) {
                        if (l = typeof u, l === "string" && (c = sn.exec(u)) && c[1] && (u = Or(n, i, c), l = "number"), u == null || u !== u) return;
                        l === "number" && !b && (u += c && c[3] || (s.cssNumber[T] ? "" : "px")), !be.clearCloneStyle && u === "" && i.indexOf("background") === 0 && (L[i] = "inherit"), (!p || !("set" in p) || (u = p.set(n, u, f)) !== void 0) && (b ? L.setProperty(i, u) : L[i] = u)
                    } else return p && "get" in p && (c = p.get(n, !1, f)) !== void 0 ? c : L[i]
                }
            },
            css: function(n, i, u, f) {
                var c, l, p, T = Mt(i),
                    b = li.test(i);
                return b || (i = Fn(T)), p = s.cssHooks[i] || s.cssHooks[T], p && "get" in p && (c = p.get(n, !0, u)), c === void 0 && (c = ur(n, i, f)), c === "normal" && i in ou && (c = ou[i]), u === "" || u ? (l = parseFloat(c), u === !0 || isFinite(l) ? l || 0 : c) : c
            }
        }), s.each(["height", "width"], function(n, i) {
            s.cssHooks[i] = {
                get: function(u, f, c) {
                    if (f) return jf.test(s.css(u, "display")) && (!u.getClientRects().length || !u.getBoundingClientRect().width) ? tu(u, Kf, function() {
                        return pi(u, i, c)
                    }) : pi(u, i, c)
                },
                set: function(u, f, c) {
                    var l, p = qr(u),
                        T = !be.scrollboxSize() && p.position === "absolute",
                        b = T || c,
                        L = b && s.css(u, "boxSizing", !1, p) === "border-box",
                        P = c ? Mr(u, i, c, L, p) : 0;
                    return L && T && (P -= Math.ceil(u["offset" + i[0].toUpperCase() + i.slice(1)] - parseFloat(p[i]) - Mr(u, i, "border", !1, p) - .5)), P && (l = sn.exec(f)) && (l[3] || "px") !== "px" && (u.style[i] = f, f = s.css(u, i)), hi(u, f, P)
                }
            }
        }), s.cssHooks.marginLeft = iu(be.reliableMarginLeft, function(n, i) {
            if (i) return (parseFloat(ur(n, "marginLeft")) || n.getBoundingClientRect().left - tu(n, {
                marginLeft: 0
            }, function() {
                return n.getBoundingClientRect().left
            })) + "px"
        }), s.each({
            margin: "",
            padding: "",
            border: "Width"
        }, function(n, i) {
            s.cssHooks[n + i] = {
                expand: function(u) {
                    for (var f = 0, c = {}, l = typeof u == "string" ? u.split(" ") : [u]; f < 4; f++) c[n + Jt[f] + i] = l[f] || l[f - 2] || l[0];
                    return c
                }
            }, n !== "margin" && (s.cssHooks[n + i].set = hi)
        }), s.fn.extend({
            css: function(n, i) {
                return dt(this, function(u, f, c) {
                    var l, p, T = {},
                        b = 0;
                    if (Array.isArray(f)) {
                        for (l = qr(u), p = f.length; b < p; b++) T[f[b]] = s.css(u, f[b], !1, l);
                        return T
                    }
                    return c !== void 0 ? s.style(u, f, c) : s.css(u, f)
                }, n, i, arguments.length > 1)
            }
        });

        function ut(n, i, u, f, c) {
            return new ut.prototype.init(n, i, u, f, c)
        }
        s.Tween = ut, ut.prototype = {
            constructor: ut,
            init: function(n, i, u, f, c, l) {
                this.elem = n, this.prop = u, this.easing = c || s.easing._default, this.options = i, this.start = this.now = this.cur(), this.end = f, this.unit = l || (s.cssNumber[u] ? "" : "px")
            },
            cur: function() {
                var n = ut.propHooks[this.prop];
                return n && n.get ? n.get(this) : ut.propHooks._default.get(this)
            },
            run: function(n) {
                var i, u = ut.propHooks[this.prop];
                return this.options.duration ? this.pos = i = s.easing[this.easing](n, this.options.duration * n, 0, 1, this.options.duration) : this.pos = i = n, this.now = (this.end - this.start) * i + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), u && u.set ? u.set(this) : ut.propHooks._default.set(this), this
            }
        }, ut.prototype.init.prototype = ut.prototype, ut.propHooks = {
            _default: {
                get: function(n) {
                    var i;
                    return n.elem.nodeType !== 1 || n.elem[n.prop] != null && n.elem.style[n.prop] == null ? n.elem[n.prop] : (i = s.css(n.elem, n.prop, ""), !i || i === "auto" ? 0 : i)
                },
                set: function(n) {
                    s.fx.step[n.prop] ? s.fx.step[n.prop](n) : n.elem.nodeType === 1 && (s.cssHooks[n.prop] || n.elem.style[Fn(n.prop)] != null) ? s.style(n.elem, n.prop, n.now + n.unit) : n.elem[n.prop] = n.now
                }
            }
        }, ut.propHooks.scrollTop = ut.propHooks.scrollLeft = {
            set: function(n) {
                n.elem.nodeType && n.elem.parentNode && (n.elem[n.prop] = n.now)
            }
        }, s.easing = {
            linear: function(n) {
                return n
            },
            swing: function(n) {
                return .5 - Math.cos(n * Math.PI) / 2
            },
            _default: "swing"
        }, s.fx = ut.prototype.init, s.fx.step = {};
        var Un, kr, Xf = /^(?:toggle|show|hide)$/,
            au = /queueHooks$/;

        function Wr() {
            kr && (le.hidden === !1 && y.requestAnimationFrame ? y.requestAnimationFrame(Wr) : y.setTimeout(Wr, s.fx.interval), s.fx.tick())
        }

        function di() {
            return y.setTimeout(function() {
                Un = void 0
            }), Un = Date.now()
        }

        function $n(n, i) {
            var u, f = 0,
                c = {
                    height: n
                };
            for (i = i ? 1 : 0; f < 4; f += 2 - i) u = Jt[f], c["margin" + u] = c["padding" + u] = n;
            return i && (c.opacity = c.width = n), c
        }

        function su(n, i, u) {
            for (var f, c = (mt.tweeners[i] || []).concat(mt.tweeners["*"]), l = 0, p = c.length; l < p; l++)
                if (f = c[l].call(u, i, n)) return f
        }

        function cu(n, i, u) {
            var f, c, l, p, T, b, L, P, W = "width" in i || "height" in i,
                O = this,
                q = {},
                J = n.style,
                se = n.nodeType && Vt(n),
                X = te.get(n, "fxshow");
            u.queue || (p = s._queueHooks(n, "fx"), p.unqueued == null && (p.unqueued = 0, T = p.empty.fire, p.empty.fire = function() {
                p.unqueued || T()
            }), p.unqueued++, O.always(function() {
                O.always(function() {
                    p.unqueued--, s.queue(n, "fx").length || p.empty.fire()
                })
            }));
            for (f in i)
                if (c = i[f], Xf.test(c)) {
                    if (delete i[f], l = l || c === "toggle", c === (se ? "hide" : "show"))
                        if (c === "show" && X && X[f] !== void 0) se = !0;
                        else continue;
                    q[f] = X && X[f] || s.style(n, f)
                } if (b = !s.isEmptyObject(i), !(!b && s.isEmptyObject(q))) {
                W && n.nodeType === 1 && (u.overflow = [J.overflow, J.overflowX, J.overflowY], L = X && X.display, L == null && (L = te.get(n, "display")), P = s.css(n, "display"), P === "none" && (L ? P = L : (cn([n], !0), L = n.style.display || L, P = s.css(n, "display"), cn([n]))), (P === "inline" || P === "inline-block" && L != null) && s.css(n, "float") === "none" && (b || (O.done(function() {
                    J.display = L
                }), L == null && (P = J.display, L = P === "none" ? "" : P)), J.display = "inline-block")), u.overflow && (J.overflow = "hidden", O.always(function() {
                    J.overflow = u.overflow[0], J.overflowX = u.overflow[1], J.overflowY = u.overflow[2]
                })), b = !1;
                for (f in q) b || (X ? "hidden" in X && (se = X.hidden) : X = te.access(n, "fxshow", {
                    display: L
                }), l && (X.hidden = !se), se && cn([n], !0), O.done(function() {
                    se || cn([n]), te.remove(n, "fxshow");
                    for (f in q) s.style(n, f, q[f])
                })), b = su(se ? X[f] : 0, f, O), f in X || (X[f] = b.start, se && (b.end = b.start, b.start = 0))
            }
        }

        function Hr(n, i) {
            var u, f, c, l, p;
            for (u in n)
                if (f = Mt(u), c = i[f], l = n[u], Array.isArray(l) && (c = l[1], l = n[u] = l[0]), u !== f && (n[f] = l, delete n[u]), p = s.cssHooks[f], p && "expand" in p) {
                    l = p.expand(l), delete n[f];
                    for (u in l) u in n || (n[u] = l[u], i[u] = c)
                } else i[f] = c
        }

        function mt(n, i, u) {
            var f, c, l = 0,
                p = mt.prefilters.length,
                T = s.Deferred().always(function() {
                    delete b.elem
                }),
                b = function() {
                    if (c) return !1;
                    for (var W = Un || di(), O = Math.max(0, L.startTime + L.duration - W), q = O / L.duration || 0, J = 1 - q, se = 0, X = L.tweens.length; se < X; se++) L.tweens[se].run(J);
                    return T.notifyWith(n, [L, J, O]), J < 1 && X ? O : (X || T.notifyWith(n, [L, 1, 0]), T.resolveWith(n, [L]), !1)
                },
                L = T.promise({
                    elem: n,
                    props: s.extend({}, i),
                    opts: s.extend(!0, {
                        specialEasing: {},
                        easing: s.easing._default
                    }, u),
                    originalProperties: i,
                    originalOptions: u,
                    startTime: Un || di(),
                    duration: u.duration,
                    tweens: [],
                    createTween: function(W, O) {
                        var q = s.Tween(n, L.opts, W, O, L.opts.specialEasing[W] || L.opts.easing);
                        return L.tweens.push(q), q
                    },
                    stop: function(W) {
                        var O = 0,
                            q = W ? L.tweens.length : 0;
                        if (c) return this;
                        for (c = !0; O < q; O++) L.tweens[O].run(1);
                        return W ? (T.notifyWith(n, [L, 1, 0]), T.resolveWith(n, [L, W])) : T.rejectWith(n, [L, W]), this
                    }
                }),
                P = L.props;
            for (Hr(P, L.opts.specialEasing); l < p; l++)
                if (f = mt.prefilters[l].call(L, n, P, L.opts), f) return ce(f.stop) && (s._queueHooks(L.elem, L.opts.queue).stop = f.stop.bind(f)), f;
            return s.map(P, su, L), ce(L.opts.start) && L.opts.start.call(n, L), L.progress(L.opts.progress).done(L.opts.done, L.opts.complete).fail(L.opts.fail).always(L.opts.always), s.fx.timer(s.extend(b, {
                elem: n,
                anim: L,
                queue: L.opts.queue
            })), L
        }
        s.Animation = s.extend(mt, {
                tweeners: {
                    "*": [function(n, i) {
                        var u = this.createTween(n, i);
                        return Or(u.elem, n, sn.exec(i), u), u
                    }]
                },
                tweener: function(n, i) {
                    ce(n) ? (i = n, n = ["*"]) : n = n.match(Ge);
                    for (var u, f = 0, c = n.length; f < c; f++) u = n[f], mt.tweeners[u] = mt.tweeners[u] || [], mt.tweeners[u].unshift(i)
                },
                prefilters: [cu],
                prefilter: function(n, i) {
                    i ? mt.prefilters.unshift(n) : mt.prefilters.push(n)
                }
            }), s.speed = function(n, i, u) {
                var f = n && typeof n == "object" ? s.extend({}, n) : {
                    complete: u || !u && i || ce(n) && n,
                    duration: n,
                    easing: u && i || i && !ce(i) && i
                };
                return s.fx.off ? f.duration = 0 : typeof f.duration != "number" && (f.duration in s.fx.speeds ? f.duration = s.fx.speeds[f.duration] : f.duration = s.fx.speeds._default), (f.queue == null || f.queue === !0) && (f.queue = "fx"), f.old = f.complete, f.complete = function() {
                    ce(f.old) && f.old.call(this), f.queue && s.dequeue(this, f.queue)
                }, f
            }, s.fn.extend({
                fadeTo: function(n, i, u, f) {
                    return this.filter(Vt).css("opacity", 0).show().end().animate({
                        opacity: i
                    }, n, u, f)
                },
                animate: function(n, i, u, f) {
                    var c = s.isEmptyObject(n),
                        l = s.speed(i, u, f),
                        p = function() {
                            var T = mt(this, s.extend({}, n), l);
                            (c || te.get(this, "finish")) && T.stop(!0)
                        };
                    return p.finish = p, c || l.queue === !1 ? this.each(p) : this.queue(l.queue, p)
                },
                stop: function(n, i, u) {
                    var f = function(c) {
                        var l = c.stop;
                        delete c.stop, l(u)
                    };
                    return typeof n != "string" && (u = i, i = n, n = void 0), i && this.queue(n || "fx", []), this.each(function() {
                        var c = !0,
                            l = n != null && n + "queueHooks",
                            p = s.timers,
                            T = te.get(this);
                        if (l) T[l] && T[l].stop && f(T[l]);
                        else
                            for (l in T) T[l] && T[l].stop && au.test(l) && f(T[l]);
                        for (l = p.length; l--;) p[l].elem === this && (n == null || p[l].queue === n) && (p[l].anim.stop(u), c = !1, p.splice(l, 1));
                        (c || !u) && s.dequeue(this, n)
                    })
                },
                finish: function(n) {
                    return n !== !1 && (n = n || "fx"), this.each(function() {
                        var i, u = te.get(this),
                            f = u[n + "queue"],
                            c = u[n + "queueHooks"],
                            l = s.timers,
                            p = f ? f.length : 0;
                        for (u.finish = !0, s.queue(this, n, []), c && c.stop && c.stop.call(this, !0), i = l.length; i--;) l[i].elem === this && l[i].queue === n && (l[i].anim.stop(!0), l.splice(i, 1));
                        for (i = 0; i < p; i++) f[i] && f[i].finish && f[i].finish.call(this);
                        delete u.finish
                    })
                }
            }), s.each(["toggle", "show", "hide"], function(n, i) {
                var u = s.fn[i];
                s.fn[i] = function(f, c, l) {
                    return f == null || typeof f == "boolean" ? u.apply(this, arguments) : this.animate($n(i, !0), f, c, l)
                }
            }), s.each({
                slideDown: $n("show"),
                slideUp: $n("hide"),
                slideToggle: $n("toggle"),
                fadeIn: {
                    opacity: "show"
                },
                fadeOut: {
                    opacity: "hide"
                },
                fadeToggle: {
                    opacity: "toggle"
                }
            }, function(n, i) {
                s.fn[n] = function(u, f, c) {
                    return this.animate(i, u, f, c)
                }
            }), s.timers = [], s.fx.tick = function() {
                var n, i = 0,
                    u = s.timers;
                for (Un = Date.now(); i < u.length; i++) n = u[i], !n() && u[i] === n && u.splice(i--, 1);
                u.length || s.fx.stop(), Un = void 0
            }, s.fx.timer = function(n) {
                s.timers.push(n), s.fx.start()
            }, s.fx.interval = 13, s.fx.start = function() {
                kr || (kr = !0, Wr())
            }, s.fx.stop = function() {
                kr = null
            }, s.fx.speeds = {
                slow: 600,
                fast: 200,
                _default: 400
            }, s.fn.delay = function(n, i) {
                return n = s.fx && s.fx.speeds[n] || n, i = i || "fx", this.queue(i, function(u, f) {
                    var c = y.setTimeout(u, n);
                    f.stop = function() {
                        y.clearTimeout(c)
                    }
                })
            },
            function() {
                var n = le.createElement("input"),
                    i = le.createElement("select"),
                    u = i.appendChild(le.createElement("option"));
                n.type = "checkbox", be.checkOn = n.value !== "", be.optSelected = u.selected, n = le.createElement("input"), n.value = "t", n.type = "radio", be.radioValue = n.value === "t"
            }();
        var lu, Gn = s.expr.attrHandle;
        s.fn.extend({
            attr: function(n, i) {
                return dt(this, s.attr, n, i, arguments.length > 1)
            },
            removeAttr: function(n) {
                return this.each(function() {
                    s.removeAttr(this, n)
                })
            }
        }), s.extend({
            attr: function(n, i, u) {
                var f, c, l = n.nodeType;
                if (!(l === 3 || l === 8 || l === 2)) {
                    if (typeof n.getAttribute > "u") return s.prop(n, i, u);
                    if ((l !== 1 || !s.isXMLDoc(n)) && (c = s.attrHooks[i.toLowerCase()] || (s.expr.match.bool.test(i) ? lu : void 0)), u !== void 0) {
                        if (u === null) {
                            s.removeAttr(n, i);
                            return
                        }
                        return c && "set" in c && (f = c.set(n, u, i)) !== void 0 ? f : (n.setAttribute(i, u + ""), u)
                    }
                    return c && "get" in c && (f = c.get(n, i)) !== null ? f : (f = s.find.attr(n, i), f ?? void 0)
                }
            },
            attrHooks: {
                type: {
                    set: function(n, i) {
                        if (!be.radioValue && i === "radio" && bt(n, "input")) {
                            var u = n.value;
                            return n.setAttribute("type", i), u && (n.value = u), i
                        }
                    }
                }
            },
            removeAttr: function(n, i) {
                var u, f = 0,
                    c = i && i.match(Ge);
                if (c && n.nodeType === 1)
                    for (; u = c[f++];) n.removeAttribute(u)
            }
        }), lu = {
            set: function(n, i, u) {
                return i === !1 ? s.removeAttr(n, u) : n.setAttribute(u, u), u
            }
        }, s.each(s.expr.match.bool.source.match(/\w+/g), function(n, i) {
            var u = Gn[i] || s.find.attr;
            Gn[i] = function(f, c, l) {
                var p, T, b = c.toLowerCase();
                return l || (T = Gn[b], Gn[b] = p, p = u(f, c, l) != null ? b : null, Gn[b] = T), p
            }
        });
        var hu = /^(?:input|select|textarea|button)$/i,
            xi = /^(?:a|area)$/i;
        s.fn.extend({
            prop: function(n, i) {
                return dt(this, s.prop, n, i, arguments.length > 1)
            },
            removeProp: function(n) {
                return this.each(function() {
                    delete this[s.propFix[n] || n]
                })
            }
        }), s.extend({
            prop: function(n, i, u) {
                var f, c, l = n.nodeType;
                if (!(l === 3 || l === 8 || l === 2)) return (l !== 1 || !s.isXMLDoc(n)) && (i = s.propFix[i] || i, c = s.propHooks[i]), u !== void 0 ? c && "set" in c && (f = c.set(n, u, i)) !== void 0 ? f : n[i] = u : c && "get" in c && (f = c.get(n, i)) !== null ? f : n[i]
            },
            propHooks: {
                tabIndex: {
                    get: function(n) {
                        var i = s.find.attr(n, "tabindex");
                        return i ? parseInt(i, 10) : hu.test(n.nodeName) || xi.test(n.nodeName) && n.href ? 0 : -1
                    }
                }
            },
            propFix: {
                for: "htmlFor",
                class: "className"
            }
        }), be.optSelected || (s.propHooks.selected = {
            get: function(n) {
                var i = n.parentNode;
                return i && i.parentNode && i.parentNode.selectedIndex, null
            },
            set: function(n) {
                var i = n.parentNode;
                i && (i.selectedIndex, i.parentNode && i.parentNode.selectedIndex)
            }
        }), s.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
            s.propFix[this.toLowerCase()] = this
        });

        function mn(n) {
            var i = n.match(Ge) || [];
            return i.join(" ")
        }

        function ln(n) {
            return n.getAttribute && n.getAttribute("class") || ""
        }

        function or(n) {
            return Array.isArray(n) ? n : typeof n == "string" ? n.match(Ge) || [] : []
        }
        s.fn.extend({
            addClass: function(n) {
                var i, u, f, c, l, p;
                return ce(n) ? this.each(function(T) {
                    s(this).addClass(n.call(this, T, ln(this)))
                }) : (i = or(n), i.length ? this.each(function() {
                    if (f = ln(this), u = this.nodeType === 1 && " " + mn(f) + " ", u) {
                        for (l = 0; l < i.length; l++) c = i[l], u.indexOf(" " + c + " ") < 0 && (u += c + " ");
                        p = mn(u), f !== p && this.setAttribute("class", p)
                    }
                }) : this)
            },
            removeClass: function(n) {
                var i, u, f, c, l, p;
                return ce(n) ? this.each(function(T) {
                    s(this).removeClass(n.call(this, T, ln(this)))
                }) : arguments.length ? (i = or(n), i.length ? this.each(function() {
                    if (f = ln(this), u = this.nodeType === 1 && " " + mn(f) + " ", u) {
                        for (l = 0; l < i.length; l++)
                            for (c = i[l]; u.indexOf(" " + c + " ") > -1;) u = u.replace(" " + c + " ", " ");
                        p = mn(u), f !== p && this.setAttribute("class", p)
                    }
                }) : this) : this.attr("class", "")
            },
            toggleClass: function(n, i) {
                var u, f, c, l, p = typeof n,
                    T = p === "string" || Array.isArray(n);
                return ce(n) ? this.each(function(b) {
                    s(this).toggleClass(n.call(this, b, ln(this), i), i)
                }) : typeof i == "boolean" && T ? i ? this.addClass(n) : this.removeClass(n) : (u = or(n), this.each(function() {
                    if (T)
                        for (l = s(this), c = 0; c < u.length; c++) f = u[c], l.hasClass(f) ? l.removeClass(f) : l.addClass(f);
                    else(n === void 0 || p === "boolean") && (f = ln(this), f && te.set(this, "__className__", f), this.setAttribute && this.setAttribute("class", f || n === !1 ? "" : te.get(this, "__className__") || ""))
                }))
            },
            hasClass: function(n) {
                var i, u, f = 0;
                for (i = " " + n + " "; u = this[f++];)
                    if (u.nodeType === 1 && (" " + mn(ln(u)) + " ").indexOf(i) > -1) return !0;
                return !1
            }
        });
        var gi = /\r/g;
        s.fn.extend({
            val: function(n) {
                var i, u, f, c = this[0];
                return arguments.length ? (f = ce(n), this.each(function(l) {
                    var p;
                    this.nodeType === 1 && (f ? p = n.call(this, l, s(this).val()) : p = n, p == null ? p = "" : typeof p == "number" ? p += "" : Array.isArray(p) && (p = s.map(p, function(T) {
                        return T == null ? "" : T + ""
                    })), i = s.valHooks[this.type] || s.valHooks[this.nodeName.toLowerCase()], (!i || !("set" in i) || i.set(this, p, "value") === void 0) && (this.value = p))
                })) : c ? (i = s.valHooks[c.type] || s.valHooks[c.nodeName.toLowerCase()], i && "get" in i && (u = i.get(c, "value")) !== void 0 ? u : (u = c.value, typeof u == "string" ? u.replace(gi, "") : u ?? "")) : void 0
            }
        }), s.extend({
            valHooks: {
                option: {
                    get: function(n) {
                        var i = s.find.attr(n, "value");
                        return i ?? mn(s.text(n))
                    }
                },
                select: {
                    get: function(n) {
                        var i, u, f, c = n.options,
                            l = n.selectedIndex,
                            p = n.type === "select-one",
                            T = p ? null : [],
                            b = p ? l + 1 : c.length;
                        for (l < 0 ? f = b : f = p ? l : 0; f < b; f++)
                            if (u = c[f], (u.selected || f === l) && !u.disabled && (!u.parentNode.disabled || !bt(u.parentNode, "optgroup"))) {
                                if (i = s(u).val(), p) return i;
                                T.push(i)
                            } return T
                    },
                    set: function(n, i) {
                        for (var u, f, c = n.options, l = s.makeArray(i), p = c.length; p--;) f = c[p], (f.selected = s.inArray(s.valHooks.option.get(f), l) > -1) && (u = !0);
                        return u || (n.selectedIndex = -1), l
                    }
                }
            }
        }), s.each(["radio", "checkbox"], function() {
            s.valHooks[this] = {
                set: function(n, i) {
                    if (Array.isArray(i)) return n.checked = s.inArray(s(n).val(), i) > -1
                }
            }, be.checkOn || (s.valHooks[this].get = function(n) {
                return n.getAttribute("value") === null ? "on" : n.value
            })
        }), be.focusin = "onfocusin" in y;
        var Tn = /^(?:focusinfocus|focusoutblur)$/,
            vi = function(n) {
                n.stopPropagation()
            };
        s.extend(s.event, {
            trigger: function(n, i, u, f) {
                var c, l, p, T, b, L, P, W, O = [u || le],
                    q = Me.call(n, "type") ? n.type : n,
                    J = Me.call(n, "namespace") ? n.namespace.split(".") : [];
                if (l = W = p = u = u || le, !(u.nodeType === 3 || u.nodeType === 8) && !Tn.test(q + s.event.triggered) && (q.indexOf(".") > -1 && (J = q.split("."), q = J.shift(), J.sort()), b = q.indexOf(":") < 0 && "on" + q, n = n[s.expando] ? n : new s.Event(q, typeof n == "object" && n), n.isTrigger = f ? 2 : 3, n.namespace = J.join("."), n.rnamespace = n.namespace ? new RegExp("(^|\\.)" + J.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, n.result = void 0, n.target || (n.target = u), i = i == null ? [n] : s.makeArray(i, [n]), P = s.event.special[q] || {}, !(!f && P.trigger && P.trigger.apply(u, i) === !1))) {
                    if (!f && !P.noBubble && !Ye(u)) {
                        for (T = P.delegateType || q, Tn.test(T + q) || (l = l.parentNode); l; l = l.parentNode) O.push(l), p = l;
                        p === (u.ownerDocument || le) && O.push(p.defaultView || p.parentWindow || y)
                    }
                    for (c = 0;
                        (l = O[c++]) && !n.isPropagationStopped();) W = l, n.type = c > 1 ? T : P.bindType || q, L = (te.get(l, "events") || Object.create(null))[n.type] && te.get(l, "handle"), L && L.apply(l, i), L = b && l[b], L && L.apply && nt(l) && (n.result = L.apply(l, i), n.result === !1 && n.preventDefault());
                    return n.type = q, !f && !n.isDefaultPrevented() && (!P._default || P._default.apply(O.pop(), i) === !1) && nt(u) && b && ce(u[q]) && !Ye(u) && (p = u[b], p && (u[b] = null), s.event.triggered = q, n.isPropagationStopped() && W.addEventListener(q, vi), u[q](), n.isPropagationStopped() && W.removeEventListener(q, vi), s.event.triggered = void 0, p && (u[b] = p)), n.result
                }
            },
            simulate: function(n, i, u) {
                var f = s.extend(new s.Event, u, {
                    type: n,
                    isSimulated: !0
                });
                s.event.trigger(f, null, i)
            }
        }), s.fn.extend({
            trigger: function(n, i) {
                return this.each(function() {
                    s.event.trigger(n, i, this)
                })
            },
            triggerHandler: function(n, i) {
                var u = this[0];
                if (u) return s.event.trigger(n, i, u, !0)
            }
        }), be.focusin || s.each({
            focus: "focusin",
            blur: "focusout"
        }, function(n, i) {
            var u = function(f) {
                s.event.simulate(i, f.target, s.event.fix(f))
            };
            s.event.special[i] = {
                setup: function() {
                    var f = this.ownerDocument || this.document || this,
                        c = te.access(f, i);
                    c || f.addEventListener(n, u, !0), te.access(f, i, (c || 0) + 1)
                },
                teardown: function() {
                    var f = this.ownerDocument || this.document || this,
                        c = te.access(f, i) - 1;
                    c ? te.access(f, i, c) : (f.removeEventListener(n, u, !0), te.remove(f, i))
                }
            }
        });
        var zn = y.location,
            pu = {
                guid: Date.now()
            },
            Br = /\?/;
        s.parseXML = function(n) {
            var i, u;
            if (!n || typeof n != "string") return null;
            try {
                i = new y.DOMParser().parseFromString(n, "text/xml")
            } catch {}
            return u = i && i.getElementsByTagName("parsererror")[0], (!i || u) && s.error("Invalid XML: " + (u ? s.map(u.childNodes, function(f) {
                return f.textContent
            }).join(`
`) : n)), i
        };
        var du = /\[\]$/,
            _i = /\r?\n/g,
            xu = /^(?:submit|button|image|reset|file)$/i,
            Yf = /^(?:input|select|textarea|keygen)/i;

        function yi(n, i, u, f) {
            var c;
            if (Array.isArray(i)) s.each(i, function(l, p) {
                u || du.test(n) ? f(n, p) : yi(n + "[" + (typeof p == "object" && p != null ? l : "") + "]", p, u, f)
            });
            else if (!u && Nt(i) === "object")
                for (c in i) yi(n + "[" + c + "]", i[c], u, f);
            else f(n, i)
        }
        s.param = function(n, i) {
            var u, f = [],
                c = function(l, p) {
                    var T = ce(p) ? p() : p;
                    f[f.length] = encodeURIComponent(l) + "=" + encodeURIComponent(T ?? "")
                };
            if (n == null) return "";
            if (Array.isArray(n) || n.jquery && !s.isPlainObject(n)) s.each(n, function() {
                c(this.name, this.value)
            });
            else
                for (u in n) yi(u, n[u], i, c);
            return f.join("&")
        }, s.fn.extend({
            serialize: function() {
                return s.param(this.serializeArray())
            },
            serializeArray: function() {
                return this.map(function() {
                    var n = s.prop(this, "elements");
                    return n ? s.makeArray(n) : this
                }).filter(function() {
                    var n = this.type;
                    return this.name && !s(this).is(":disabled") && Yf.test(this.nodeName) && !xu.test(n) && (this.checked || !bn.test(n))
                }).map(function(n, i) {
                    var u = s(this).val();
                    return u == null ? null : Array.isArray(u) ? s.map(u, function(f) {
                        return {
                            name: i.name,
                            value: f.replace(_i, `\r
`)
                        }
                    }) : {
                        name: i.name,
                        value: u.replace(_i, `\r
`)
                    }
                }).get()
            }
        });
        var Qf = /%20/g,
            gu = /#.*$/,
            Zf = /([?&])_=[^&]*/,
            Jf = /^(.*?):[ \t]*([^\r\n]*)$/mg,
            Vf = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
            eo = /^(?:GET|HEAD)$/,
            bi = /^\/\//,
            vu = {},
            wi = {},
            _u = "*/".concat("*"),
            mi = le.createElement("a");
        mi.href = zn.href;

        function yu(n) {
            return function(i, u) {
                typeof i != "string" && (u = i, i = "*");
                var f, c = 0,
                    l = i.toLowerCase().match(Ge) || [];
                if (ce(u))
                    for (; f = l[c++];) f[0] === "+" ? (f = f.slice(1) || "*", (n[f] = n[f] || []).unshift(u)) : (n[f] = n[f] || []).push(u)
            }
        }

        function Re(n, i, u, f) {
            var c = {},
                l = n === wi;

            function p(T) {
                var b;
                return c[T] = !0, s.each(n[T] || [], function(L, P) {
                    var W = P(i, u, f);
                    if (typeof W == "string" && !l && !c[W]) return i.dataTypes.unshift(W), p(W), !1;
                    if (l) return !(b = W)
                }), b
            }
            return p(i.dataTypes[0]) || !c["*"] && p("*")
        }

        function De(n, i) {
            var u, f, c = s.ajaxSettings.flatOptions || {};
            for (u in i) i[u] !== void 0 && ((c[u] ? n : f || (f = {}))[u] = i[u]);
            return f && s.extend(!0, n, f), n
        }

        function to(n, i, u) {
            for (var f, c, l, p, T = n.contents, b = n.dataTypes; b[0] === "*";) b.shift(), f === void 0 && (f = n.mimeType || i.getResponseHeader("Content-Type"));
            if (f) {
                for (c in T)
                    if (T[c] && T[c].test(f)) {
                        b.unshift(c);
                        break
                    }
            }
            if (b[0] in u) l = b[0];
            else {
                for (c in u) {
                    if (!b[0] || n.converters[c + " " + b[0]]) {
                        l = c;
                        break
                    }
                    p || (p = c)
                }
                l = l || p
            }
            if (l) return l !== b[0] && b.unshift(l), u[l]
        }

        function no(n, i, u, f) {
            var c, l, p, T, b, L = {},
                P = n.dataTypes.slice();
            if (P[1])
                for (p in n.converters) L[p.toLowerCase()] = n.converters[p];
            for (l = P.shift(); l;)
                if (n.responseFields[l] && (u[n.responseFields[l]] = i), !b && f && n.dataFilter && (i = n.dataFilter(i, n.dataType)), b = l, l = P.shift(), l) {
                    if (l === "*") l = b;
                    else if (b !== "*" && b !== l) {
                        if (p = L[b + " " + l] || L["* " + l], !p) {
                            for (c in L)
                                if (T = c.split(" "), T[1] === l && (p = L[b + " " + T[0]] || L["* " + T[0]], p)) {
                                    p === !0 ? p = L[c] : L[c] !== !0 && (l = T[0], P.unshift(T[1]));
                                    break
                                }
                        }
                        if (p !== !0)
                            if (p && n.throws) i = p(i);
                            else try {
                                i = p(i)
                            } catch (W) {
                                return {
                                    state: "parsererror",
                                    error: p ? W : "No conversion from " + b + " to " + l
                                }
                            }
                    }
                } return {
                state: "success",
                data: i
            }
        }
        s.extend({
            active: 0,
            lastModified: {},
            etag: {},
            ajaxSettings: {
                url: zn.href,
                type: "GET",
                isLocal: Vf.test(zn.protocol),
                global: !0,
                processData: !0,
                async: !0,
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                accepts: {
                    "*": _u,
                    text: "text/plain",
                    html: "text/html",
                    xml: "application/xml, text/xml",
                    json: "application/json, text/javascript"
                },
                contents: {
                    xml: /\bxml\b/,
                    html: /\bhtml/,
                    json: /\bjson\b/
                },
                responseFields: {
                    xml: "responseXML",
                    text: "responseText",
                    json: "responseJSON"
                },
                converters: {
                    "* text": String,
                    "text html": !0,
                    "text json": JSON.parse,
                    "text xml": s.parseXML
                },
                flatOptions: {
                    url: !0,
                    context: !0
                }
            },
            ajaxSetup: function(n, i) {
                return i ? De(De(n, s.ajaxSettings), i) : De(s.ajaxSettings, n)
            },
            ajaxPrefilter: yu(vu),
            ajaxTransport: yu(wi),
            ajax: function(n, i) {
                typeof n == "object" && (i = n, n = void 0), i = i || {};
                var u, f, c, l, p, T, b, L, P, W, O = s.ajaxSetup({}, i),
                    q = O.context || O,
                    J = O.context && (q.nodeType || q.jquery) ? s(q) : s.event,
                    se = s.Deferred(),
                    X = s.Callbacks("once memory"),
                    We = O.statusCode || {},
                    He = {},
                    ye = {},
                    we = "canceled",
                    oe = {
                        readyState: 0,
                        getResponseHeader: function(me) {
                            var qe;
                            if (b) {
                                if (!l)
                                    for (l = {}; qe = Jf.exec(c);) l[qe[1].toLowerCase() + " "] = (l[qe[1].toLowerCase() + " "] || []).concat(qe[2]);
                                qe = l[me.toLowerCase() + " "]
                            }
                            return qe == null ? null : qe.join(", ")
                        },
                        getAllResponseHeaders: function() {
                            return b ? c : null
                        },
                        setRequestHeader: function(me, qe) {
                            return b == null && (me = ye[me.toLowerCase()] = ye[me.toLowerCase()] || me, He[me] = qe), this
                        },
                        overrideMimeType: function(me) {
                            return b == null && (O.mimeType = me), this
                        },
                        statusCode: function(me) {
                            var qe;
                            if (me)
                                if (b) oe.always(me[oe.status]);
                                else
                                    for (qe in me) We[qe] = [We[qe], me[qe]];
                            return this
                        },
                        abort: function(me) {
                            var qe = me || we;
                            return u && u.abort(qe), ft(0, qe), this
                        }
                    };
                if (se.promise(oe), O.url = ((n || O.url || zn.href) + "").replace(bi, zn.protocol + "//"), O.type = i.method || i.type || O.method || O.type, O.dataTypes = (O.dataType || "*").toLowerCase().match(Ge) || [""], O.crossDomain == null) {
                    T = le.createElement("a");
                    try {
                        T.href = O.url, T.href = T.href, O.crossDomain = mi.protocol + "//" + mi.host != T.protocol + "//" + T.host
                    } catch {
                        O.crossDomain = !0
                    }
                }
                if (O.data && O.processData && typeof O.data != "string" && (O.data = s.param(O.data, O.traditional)), Re(vu, O, i, oe), b) return oe;
                L = s.event && O.global, L && s.active++ === 0 && s.event.trigger("ajaxStart"), O.type = O.type.toUpperCase(), O.hasContent = !eo.test(O.type), f = O.url.replace(gu, ""), O.hasContent ? O.data && O.processData && (O.contentType || "").indexOf("application/x-www-form-urlencoded") === 0 && (O.data = O.data.replace(Qf, "+")) : (W = O.url.slice(f.length), O.data && (O.processData || typeof O.data == "string") && (f += (Br.test(f) ? "&" : "?") + O.data, delete O.data), O.cache === !1 && (f = f.replace(Zf, "$1"), W = (Br.test(f) ? "&" : "?") + "_=" + pu.guid++ + W), O.url = f + W), O.ifModified && (s.lastModified[f] && oe.setRequestHeader("If-Modified-Since", s.lastModified[f]), s.etag[f] && oe.setRequestHeader("If-None-Match", s.etag[f])), (O.data && O.hasContent && O.contentType !== !1 || i.contentType) && oe.setRequestHeader("Content-Type", O.contentType), oe.setRequestHeader("Accept", O.dataTypes[0] && O.accepts[O.dataTypes[0]] ? O.accepts[O.dataTypes[0]] + (O.dataTypes[0] !== "*" ? ", " + _u + "; q=0.01" : "") : O.accepts["*"]);
                for (P in O.headers) oe.setRequestHeader(P, O.headers[P]);
                if (O.beforeSend && (O.beforeSend.call(q, oe, O) === !1 || b)) return oe.abort();
                if (we = "abort", X.add(O.complete), oe.done(O.success), oe.fail(O.error), u = Re(wi, O, i, oe), !u) ft(-1, "No Transport");
                else {
                    if (oe.readyState = 1, L && J.trigger("ajaxSend", [oe, O]), b) return oe;
                    O.async && O.timeout > 0 && (p = y.setTimeout(function() {
                        oe.abort("timeout")
                    }, O.timeout));
                    try {
                        b = !1, u.send(He, ft)
                    } catch (me) {
                        if (b) throw me;
                        ft(-1, me)
                    }
                }

                function ft(me, qe, sr, Fr) {
                    var ot, $t, Tt, at, en, xt = qe;
                    b || (b = !0, p && y.clearTimeout(p), u = void 0, c = Fr || "", oe.readyState = me > 0 ? 4 : 0, ot = me >= 200 && me < 300 || me === 304, sr && (at = to(O, oe, sr)), !ot && s.inArray("script", O.dataTypes) > -1 && s.inArray("json", O.dataTypes) < 0 && (O.converters["text script"] = function() {}), at = no(O, at, oe, ot), ot ? (O.ifModified && (en = oe.getResponseHeader("Last-Modified"), en && (s.lastModified[f] = en), en = oe.getResponseHeader("etag"), en && (s.etag[f] = en)), me === 204 || O.type === "HEAD" ? xt = "nocontent" : me === 304 ? xt = "notmodified" : (xt = at.state, $t = at.data, Tt = at.error, ot = !Tt)) : (Tt = xt, (me || !xt) && (xt = "error", me < 0 && (me = 0))), oe.status = me, oe.statusText = (qe || xt) + "", ot ? se.resolveWith(q, [$t, xt, oe]) : se.rejectWith(q, [oe, xt, Tt]), oe.statusCode(We), We = void 0, L && J.trigger(ot ? "ajaxSuccess" : "ajaxError", [oe, O, ot ? $t : Tt]), X.fireWith(q, [oe, xt]), L && (J.trigger("ajaxComplete", [oe, O]), --s.active || s.event.trigger("ajaxStop")))
                }
                return oe
            },
            getJSON: function(n, i, u) {
                return s.get(n, i, u, "json")
            },
            getScript: function(n, i) {
                return s.get(n, void 0, i, "script")
            }
        }), s.each(["get", "post"], function(n, i) {
            s[i] = function(u, f, c, l) {
                return ce(f) && (l = l || c, c = f, f = void 0), s.ajax(s.extend({
                    url: u,
                    type: i,
                    dataType: l,
                    data: f,
                    success: c
                }, s.isPlainObject(u) && u))
            }
        }), s.ajaxPrefilter(function(n) {
            var i;
            for (i in n.headers) i.toLowerCase() === "content-type" && (n.contentType = n.headers[i] || "")
        }), s._evalUrl = function(n, i, u) {
            return s.ajax({
                url: n,
                type: "GET",
                dataType: "script",
                cache: !0,
                async: !1,
                global: !1,
                converters: {
                    "text script": function() {}
                },
                dataFilter: function(f) {
                    s.globalEval(f, i, u)
                }
            })
        }, s.fn.extend({
            wrapAll: function(n) {
                var i;
                return this[0] && (ce(n) && (n = n.call(this[0])), i = s(n, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && i.insertBefore(this[0]), i.map(function() {
                    for (var u = this; u.firstElementChild;) u = u.firstElementChild;
                    return u
                }).append(this)), this
            },
            wrapInner: function(n) {
                return ce(n) ? this.each(function(i) {
                    s(this).wrapInner(n.call(this, i))
                }) : this.each(function() {
                    var i = s(this),
                        u = i.contents();
                    u.length ? u.wrapAll(n) : i.append(n)
                })
            },
            wrap: function(n) {
                var i = ce(n);
                return this.each(function(u) {
                    s(this).wrapAll(i ? n.call(this, u) : n)
                })
            },
            unwrap: function(n) {
                return this.parent(n).not("body").each(function() {
                    s(this).replaceWith(this.childNodes)
                }), this
            }
        }), s.expr.pseudos.hidden = function(n) {
            return !s.expr.pseudos.visible(n)
        }, s.expr.pseudos.visible = function(n) {
            return !!(n.offsetWidth || n.offsetHeight || n.getClientRects().length)
        }, s.ajaxSettings.xhr = function() {
            try {
                return new y.XMLHttpRequest
            } catch {}
        };
        var ro = {
                0: 200,
                1223: 204
            },
            ar = s.ajaxSettings.xhr();
        be.cors = !!ar && "withCredentials" in ar, be.ajax = ar = !!ar, s.ajaxTransport(function(n) {
            var i, u;
            if (be.cors || ar && !n.crossDomain) return {
                send: function(f, c) {
                    var l, p = n.xhr();
                    if (p.open(n.type, n.url, n.async, n.username, n.password), n.xhrFields)
                        for (l in n.xhrFields) p[l] = n.xhrFields[l];
                    n.mimeType && p.overrideMimeType && p.overrideMimeType(n.mimeType), !n.crossDomain && !f["X-Requested-With"] && (f["X-Requested-With"] = "XMLHttpRequest");
                    for (l in f) p.setRequestHeader(l, f[l]);
                    i = function(T) {
                        return function() {
                            i && (i = u = p.onload = p.onerror = p.onabort = p.ontimeout = p.onreadystatechange = null, T === "abort" ? p.abort() : T === "error" ? typeof p.status != "number" ? c(0, "error") : c(p.status, p.statusText) : c(ro[p.status] || p.status, p.statusText, (p.responseType || "text") !== "text" || typeof p.responseText != "string" ? {
                                binary: p.response
                            } : {
                                text: p.responseText
                            }, p.getAllResponseHeaders()))
                        }
                    }, p.onload = i(), u = p.onerror = p.ontimeout = i("error"), p.onabort !== void 0 ? p.onabort = u : p.onreadystatechange = function() {
                        p.readyState === 4 && y.setTimeout(function() {
                            i && u()
                        })
                    }, i = i("abort");
                    try {
                        p.send(n.hasContent && n.data || null)
                    } catch (T) {
                        if (i) throw T
                    }
                },
                abort: function() {
                    i && i()
                }
            }
        }), s.ajaxPrefilter(function(n) {
            n.crossDomain && (n.contents.script = !1)
        }), s.ajaxSetup({
            accepts: {
                script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
            },
            contents: {
                script: /\b(?:java|ecma)script\b/
            },
            converters: {
                "text script": function(n) {
                    return s.globalEval(n), n
                }
            }
        }), s.ajaxPrefilter("script", function(n) {
            n.cache === void 0 && (n.cache = !1), n.crossDomain && (n.type = "GET")
        }), s.ajaxTransport("script", function(n) {
            if (n.crossDomain || n.scriptAttrs) {
                var i, u;
                return {
                    send: function(f, c) {
                        i = s("<script>").attr(n.scriptAttrs || {}).prop({
                            charset: n.scriptCharset,
                            src: n.url
                        }).on("load error", u = function(l) {
                            i.remove(), u = null, l && c(l.type === "error" ? 404 : 200, l.type)
                        }), le.head.appendChild(i[0])
                    },
                    abort: function() {
                        u && u()
                    }
                }
            }
        });
        var bu = [],
            Ti = /(=)\?(?=&|$)|\?\?/;
        s.ajaxSetup({
            jsonp: "callback",
            jsonpCallback: function() {
                var n = bu.pop() || s.expando + "_" + pu.guid++;
                return this[n] = !0, n
            }
        }), s.ajaxPrefilter("json jsonp", function(n, i, u) {
            var f, c, l, p = n.jsonp !== !1 && (Ti.test(n.url) ? "url" : typeof n.data == "string" && (n.contentType || "").indexOf("application/x-www-form-urlencoded") === 0 && Ti.test(n.data) && "data");
            if (p || n.dataTypes[0] === "jsonp") return f = n.jsonpCallback = ce(n.jsonpCallback) ? n.jsonpCallback() : n.jsonpCallback, p ? n[p] = n[p].replace(Ti, "$1" + f) : n.jsonp !== !1 && (n.url += (Br.test(n.url) ? "&" : "?") + n.jsonp + "=" + f), n.converters["script json"] = function() {
                return l || s.error(f + " was not called"), l[0]
            }, n.dataTypes[0] = "json", c = y[f], y[f] = function() {
                l = arguments
            }, u.always(function() {
                c === void 0 ? s(y).removeProp(f) : y[f] = c, n[f] && (n.jsonpCallback = i.jsonpCallback, bu.push(f)), l && ce(c) && c(l[0]), l = c = void 0
            }), "script"
        }), be.createHTMLDocument = function() {
            var n = le.implementation.createHTMLDocument("").body;
            return n.innerHTML = "<form></form><form></form>", n.childNodes.length === 2
        }(), s.parseHTML = function(n, i, u) {
            if (typeof n != "string") return [];
            typeof i == "boolean" && (u = i, i = !1);
            var f, c, l;
            return i || (be.createHTMLDocument ? (i = le.implementation.createHTMLDocument(""), f = i.createElement("base"), f.href = le.location.href, i.head.appendChild(f)) : i = le), c = Yi.exec(n), l = !u && [], c ? [i.createElement(c[1])] : (c = Ji([n], i, l), l && l.length && s(l).remove(), s.merge([], c.childNodes))
        }, s.fn.load = function(n, i, u) {
            var f, c, l, p = this,
                T = n.indexOf(" ");
            return T > -1 && (f = mn(n.slice(T)), n = n.slice(0, T)), ce(i) ? (u = i, i = void 0) : i && typeof i == "object" && (c = "POST"), p.length > 0 && s.ajax({
                url: n,
                type: c || "GET",
                dataType: "html",
                data: i
            }).done(function(b) {
                l = arguments, p.html(f ? s("<div>").append(s.parseHTML(b)).find(f) : b)
            }).always(u && function(b, L) {
                p.each(function() {
                    u.apply(this, l || [b.responseText, L, b])
                })
            }), this
        }, s.expr.pseudos.animated = function(n) {
            return s.grep(s.timers, function(i) {
                return n === i.elem
            }).length
        }, s.offset = {
            setOffset: function(n, i, u) {
                var f, c, l, p, T, b, L, P = s.css(n, "position"),
                    W = s(n),
                    O = {};
                P === "static" && (n.style.position = "relative"), T = W.offset(), l = s.css(n, "top"), b = s.css(n, "left"), L = (P === "absolute" || P === "fixed") && (l + b).indexOf("auto") > -1, L ? (f = W.position(), p = f.top, c = f.left) : (p = parseFloat(l) || 0, c = parseFloat(b) || 0), ce(i) && (i = i.call(n, u, s.extend({}, T))), i.top != null && (O.top = i.top - T.top + p), i.left != null && (O.left = i.left - T.left + c), "using" in i ? i.using.call(n, O) : W.css(O)
            }
        }, s.fn.extend({
            offset: function(n) {
                if (arguments.length) return n === void 0 ? this : this.each(function(c) {
                    s.offset.setOffset(this, n, c)
                });
                var i, u, f = this[0];
                if (f) return f.getClientRects().length ? (i = f.getBoundingClientRect(), u = f.ownerDocument.defaultView, {
                    top: i.top + u.pageYOffset,
                    left: i.left + u.pageXOffset
                }) : {
                    top: 0,
                    left: 0
                }
            },
            position: function() {
                if (this[0]) {
                    var n, i, u, f = this[0],
                        c = {
                            top: 0,
                            left: 0
                        };
                    if (s.css(f, "position") === "fixed") i = f.getBoundingClientRect();
                    else {
                        for (i = this.offset(), u = f.ownerDocument, n = f.offsetParent || u.documentElement; n && (n === u.body || n === u.documentElement) && s.css(n, "position") === "static";) n = n.parentNode;
                        n && n !== f && n.nodeType === 1 && (c = s(n).offset(), c.top += s.css(n, "borderTopWidth", !0), c.left += s.css(n, "borderLeftWidth", !0))
                    }
                    return {
                        top: i.top - c.top - s.css(f, "marginTop", !0),
                        left: i.left - c.left - s.css(f, "marginLeft", !0)
                    }
                }
            },
            offsetParent: function() {
                return this.map(function() {
                    for (var n = this.offsetParent; n && s.css(n, "position") === "static";) n = n.offsetParent;
                    return n || kt
                })
            }
        }), s.each({
            scrollLeft: "pageXOffset",
            scrollTop: "pageYOffset"
        }, function(n, i) {
            var u = i === "pageYOffset";
            s.fn[n] = function(f) {
                return dt(this, function(c, l, p) {
                    var T;
                    if (Ye(c) ? T = c : c.nodeType === 9 && (T = c.defaultView), p === void 0) return T ? T[i] : c[l];
                    T ? T.scrollTo(u ? T.pageXOffset : p, u ? p : T.pageYOffset) : c[l] = p
                }, n, f, arguments.length)
            }
        }), s.each(["top", "left"], function(n, i) {
            s.cssHooks[i] = iu(be.pixelPosition, function(u, f) {
                if (f) return f = ur(u, i), ci.test(f) ? s(u).position()[i] + "px" : f
            })
        }), s.each({
            Height: "height",
            Width: "width"
        }, function(n, i) {
            s.each({
                padding: "inner" + n,
                content: i,
                "": "outer" + n
            }, function(u, f) {
                s.fn[f] = function(c, l) {
                    var p = arguments.length && (u || typeof c != "boolean"),
                        T = u || (c === !0 || l === !0 ? "margin" : "border");
                    return dt(this, function(b, L, P) {
                        var W;
                        return Ye(b) ? f.indexOf("outer") === 0 ? b["inner" + n] : b.document.documentElement["client" + n] : b.nodeType === 9 ? (W = b.documentElement, Math.max(b.body["scroll" + n], W["scroll" + n], b.body["offset" + n], W["offset" + n], W["client" + n])) : P === void 0 ? s.css(b, L, T) : s.style(b, L, P, T)
                    }, i, p ? c : void 0, p)
                }
            })
        }), s.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(n, i) {
            s.fn[i] = function(u) {
                return this.on(i, u)
            }
        }), s.fn.extend({
            bind: function(n, i, u) {
                return this.on(n, null, i, u)
            },
            unbind: function(n, i) {
                return this.off(n, null, i)
            },
            delegate: function(n, i, u, f) {
                return this.on(i, n, u, f)
            },
            undelegate: function(n, i, u) {
                return arguments.length === 1 ? this.off(n, "**") : this.off(i, n || "**", u)
            },
            hover: function(n, i) {
                return this.mouseenter(n).mouseleave(i || n)
            }
        }), s.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "), function(n, i) {
            s.fn[i] = function(u, f) {
                return arguments.length > 0 ? this.on(i, null, u, f) : this.trigger(i)
            }
        });
        var wu = /^[\s\uFEFF\xA0]+|([^\s\uFEFF\xA0])[\s\uFEFF\xA0]+$/g;
        s.proxy = function(n, i) {
            var u, f, c;
            if (typeof i == "string" && (u = n[i], i = n, n = u), !!ce(n)) return f = U.call(arguments, 2), c = function() {
                return n.apply(i || this, f.concat(U.call(arguments)))
            }, c.guid = n.guid = n.guid || s.guid++, c
        }, s.holdReady = function(n) {
            n ? s.readyWait++ : s.ready(!0)
        }, s.isArray = Array.isArray, s.parseJSON = JSON.parse, s.nodeName = bt, s.isFunction = ce, s.isWindow = Ye, s.camelCase = Mt, s.type = Nt, s.now = Date.now, s.isNumeric = function(n) {
            var i = s.type(n);
            return (i === "number" || i === "string") && !isNaN(n - parseFloat(n))
        }, s.trim = function(n) {
            return n == null ? "" : (n + "").replace(wu, "$1")
        };
        var io = y.jQuery,
            Qe = y.$;
        return s.noConflict = function(n) {
            return y.$ === s && (y.$ = Qe), n && y.jQuery === s && (y.jQuery = io), s
        }, typeof a > "u" && (y.jQuery = y.$ = s), s
    })
})(rc);

window.jQuery = window.$ = rc.exports;
