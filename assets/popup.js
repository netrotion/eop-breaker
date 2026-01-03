import {
    s as wn
} from "./chrome-utils.js";
import "./constant.js";
import { remain_puid, initPremiumState } from "./constant.js";

(function () {
    const t = document.createElement("link").relList;
    if (t && t.supports && t.supports("modulepreload")) return;
    for (const r of document.querySelectorAll('link[rel="modulepreload"]')) s(r);
    new MutationObserver(r => {
        for (const i of r)
            if (i.type === "childList")
                for (const o of i.addedNodes) o.tagName === "LINK" && o.rel === "modulepreload" && s(o)
    }).observe(document, {
        childList: !0,
        subtree: !0
    });

    function n(r) {
        const i = {};
        return r.integrity && (i.integrity = r.integrity), r.referrerPolicy && (i.referrerPolicy = r.referrerPolicy), r.crossOrigin === "use-credentials" ? i.credentials = "include" : r.crossOrigin === "anonymous" ? i.credentials = "omit" : i.credentials = "same-origin", i
    }

    function s(r) {
        if (r.ep) return;
        r.ep = !0;
        const i = n(r);
        fetch(r.href, i)
    }
})();
/**
 * @vue/shared v3.5.7
 * (c) 2018-present Yuxi (Evan) You and Vue contributors
 * @license MIT
 **/
/*! #__NO_SIDE_EFFECTS__ */
function zn(e) {
    const t = Object.create(null);
    for (const n of e.split(",")) t[n] = 1;
    return n => n in t
}
const V = {},
    et = [],
    pe = () => { },
    li = () => !1,
    sn = e => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && (e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97),
    Gn = e => e.startsWith("onUpdate:"),
    G = Object.assign,
    Jn = (e, t) => {
        const n = e.indexOf(t);
        n > -1 && e.splice(n, 1)
    },
    ci = Object.prototype.hasOwnProperty,
    D = (e, t) => ci.call(e, t),
    O = Array.isArray,
    tt = e => Tt(e) === "[object Map]",
    rn = e => Tt(e) === "[object Set]",
    bs = e => Tt(e) === "[object Date]",
    P = e => typeof e == "function",
    k = e => typeof e == "string",
    Se = e => typeof e == "symbol",
    K = e => e !== null && typeof e == "object",
    tr = e => (K(e) || P(e)) && P(e.then) && P(e.catch),
    nr = Object.prototype.toString,
    Tt = e => nr.call(e),
    fi = e => Tt(e).slice(8, -1),
    sr = e => Tt(e) === "[object Object]",
    Yn = e => k(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e,
    pt = zn(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),
    on = e => {
        const t = Object.create(null);
        return n => t[n] || (t[n] = e(n))
    },
    ui = /-(\w)/g,
    Ge = on(e => e.replace(ui, (t, n) => n ? n.toUpperCase() : "")),
    ai = /\B([A-Z])/g,
    Ye = on(e => e.replace(ai, "-$1").toLowerCase()),
    rr = on(e => e.charAt(0).toUpperCase() + e.slice(1)),
    Sn = on(e => e ? `on${rr(e)}` : ""),
    je = (e, t) => !Object.is(e, t),
    $t = (e, ...t) => {
        for (let n = 0; n < e.length; n++) e[n](...t)
    },
    ir = (e, t, n, s = !1) => {
        Object.defineProperty(e, t, {
            configurable: !0,
            enumerable: !1,
            writable: s,
            value: n
        })
    },
    Dn = e => {
        const t = parseFloat(e);
        return isNaN(t) ? e : t
    };
let ys;
const or = () => ys || (ys = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});

function Qn(e) {
    if (O(e)) {
        const t = {};
        for (let n = 0; n < e.length; n++) {
            const s = e[n],
                r = k(s) ? xi(s) : Qn(s);
            if (r)
                for (const i in r) t[i] = r[i]
        }
        return t
    } else if (k(e) || K(e)) return e
}
const di = /;(?![^(]*\))/g,
    hi = /:([^]+)/,
    pi = /\/\*[^]*?\*\//g;

function xi(e) {
    const t = {};
    return e.replace(pi, "").split(di).forEach(n => {
        if (n) {
            const s = n.split(hi);
            s.length > 1 && (t[s[0].trim()] = s[1].trim())
        }
    }), t
}

function ln(e) {
    let t = "";
    if (k(e)) t = e;
    else if (O(e))
        for (let n = 0; n < e.length; n++) {
            const s = ln(e[n]);
            s && (t += s + " ")
        } else if (K(e))
        for (const n in e) e[n] && (t += n + " ");
    return t.trim()
}
const gi = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",
    _i = zn(gi);

function lr(e) {
    return !!e || e === ""
}

function mi(e, t) {
    if (e.length !== t.length) return !1;
    let n = !0;
    for (let s = 0; n && s < e.length; s++) n = cn(e[s], t[s]);
    return n
}

function cn(e, t) {
    if (e === t) return !0;
    let n = bs(e),
        s = bs(t);
    if (n || s) return n && s ? e.getTime() === t.getTime() : !1;
    if (n = Se(e), s = Se(t), n || s) return e === t;
    if (n = O(e), s = O(t), n || s) return n && s ? mi(e, t) : !1;
    if (n = K(e), s = K(t), n || s) {
        if (!n || !s) return !1;
        const r = Object.keys(e).length,
            i = Object.keys(t).length;
        if (r !== i) return !1;
        for (const o in e) {
            const l = e.hasOwnProperty(o),
                u = t.hasOwnProperty(o);
            if (l && !u || !l && u || !cn(e[o], t[o])) return !1
        }
    }
    return String(e) === String(t)
}

function cr(e, t) {
    return e.findIndex(n => cn(n, t))
}
const fr = e => !!(e && e.__v_isRef === !0),
    Hn = e => k(e) ? e : e == null ? "" : O(e) || K(e) && (e.toString === nr || !P(e.toString)) ? fr(e) ? Hn(e.value) : JSON.stringify(e, ur, 2) : String(e),
    ur = (e, t) => fr(t) ? ur(e, t.value) : tt(t) ? {
        [`Map(${t.size})`]: [...t.entries()].reduce((n, [s, r], i) => (n[Cn(s, i) + " =>"] = r, n), {})
    } : rn(t) ? {
        [`Set(${t.size})`]: [...t.values()].map(n => Cn(n))
    } : Se(t) ? Cn(t) : K(t) && !O(t) && !sr(t) ? String(t) : t,
    Cn = (e, t = "") => {
        var n;
        return Se(e) ? `Symbol(${(n = e.description) != null ? n : t})` : e
    };
/**
 * @vue/reactivity v3.5.7
 * (c) 2018-present Yuxi (Evan) You and Vue contributors
 * @license MIT
 **/
let fe;
class bi {
    constructor(t = !1) {
        this.detached = t, this._active = !0, this.effects = [], this.cleanups = [], this._isPaused = !1, this.parent = fe, !t && fe && (this.index = (fe.scopes || (fe.scopes = [])).push(this) - 1)
    }
    get active() {
        return this._active
    }
    pause() {
        if (this._active) {
            this._isPaused = !0;
            let t, n;
            if (this.scopes)
                for (t = 0, n = this.scopes.length; t < n; t++) this.scopes[t].pause();
            for (t = 0, n = this.effects.length; t < n; t++) this.effects[t].pause()
        }
    }
    resume() {
        if (this._active && this._isPaused) {
            this._isPaused = !1;
            let t, n;
            if (this.scopes)
                for (t = 0, n = this.scopes.length; t < n; t++) this.scopes[t].resume();
            for (t = 0, n = this.effects.length; t < n; t++) this.effects[t].resume()
        }
    }
    run(t) {
        if (this._active) {
            const n = fe;
            try {
                return fe = this, t()
            } finally {
                fe = n
            }
        }
    }
    on() {
        fe = this
    }
    off() {
        fe = this.parent
    }
    stop(t) {
        if (this._active) {
            let n, s;
            for (n = 0, s = this.effects.length; n < s; n++) this.effects[n].stop();
            for (n = 0, s = this.cleanups.length; n < s; n++) this.cleanups[n]();
            if (this.scopes)
                for (n = 0, s = this.scopes.length; n < s; n++) this.scopes[n].stop(!0);
            if (!this.detached && this.parent && !t) {
                const r = this.parent.scopes.pop();
                r && r !== this && (this.parent.scopes[this.index] = r, r.index = this.index)
            }
            this.parent = void 0, this._active = !1
        }
    }
}

function yi() {
    return fe
}
let L;
const Tn = new WeakSet;
class ar {
    constructor(t) {
        this.fn = t, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, fe && fe.active && fe.effects.push(this)
    }
    pause() {
        this.flags |= 64
    }
    resume() {
        this.flags & 64 && (this.flags &= -65, Tn.has(this) && (Tn.delete(this), this.trigger()))
    }
    notify() {
        this.flags & 2 && !(this.flags & 32) || this.flags & 8 || hr(this)
    }
    run() {
        if (!(this.flags & 1)) return this.fn();
        this.flags |= 2, vs(this), pr(this);
        const t = L,
            n = xe;
        L = this, xe = !0;
        try {
            return this.fn()
        } finally {
            xr(this), L = t, xe = n, this.flags &= -3
        }
    }
    stop() {
        if (this.flags & 1) {
            for (let t = this.deps; t; t = t.nextDep) es(t);
            this.deps = this.depsTail = void 0, vs(this), this.onStop && this.onStop(), this.flags &= -2
        }
    }
    trigger() {
        this.flags & 64 ? Tn.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty()
    }
    runIfDirty() {
        jn(this) && this.run()
    }
    get dirty() {
        return jn(this)
    }
}
let dr = 0,
    xt;

function hr(e) {
    e.flags |= 8, e.next = xt, xt = e
}

function Xn() {
    dr++
}

function Zn() {
    if (--dr > 0) return;
    let e;
    for (; xt;) {
        let t = xt;
        for (xt = void 0; t;) {
            const n = t.next;
            if (t.next = void 0, t.flags &= -9, t.flags & 1) try {
                t.trigger()
            } catch (s) {
                e || (e = s)
            }
            t = n
        }
    }
    if (e) throw e
}

function pr(e) {
    for (let t = e.deps; t; t = t.nextDep) t.version = -1, t.prevActiveLink = t.dep.activeLink, t.dep.activeLink = t
}

function xr(e) {
    let t, n = e.depsTail,
        s = n;
    for (; s;) {
        const r = s.prevDep;
        s.version === -1 ? (s === n && (n = r), es(s), vi(s)) : t = s, s.dep.activeLink = s.prevActiveLink, s.prevActiveLink = void 0, s = r
    }
    e.deps = t, e.depsTail = n
}

function jn(e) {
    for (let t = e.deps; t; t = t.nextDep)
        if (t.dep.version !== t.version || t.dep.computed && (gr(t.dep.computed) || t.dep.version !== t.version)) return !0;
    return !!e._dirty
}

function gr(e) {
    if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === bt)) return;
    e.globalVersion = bt;
    const t = e.dep;
    if (e.flags |= 2, t.version > 0 && !e.isSSR && e.deps && !jn(e)) {
        e.flags &= -3;
        return
    }
    const n = L,
        s = xe;
    L = e, xe = !0;
    try {
        pr(e);
        const r = e.fn(e._value);
        (t.version === 0 || je(r, e._value)) && (e._value = r, t.version++)
    } catch (r) {
        throw t.version++, r
    } finally {
        L = n, xe = s, xr(e), e.flags &= -3
    }
}

function es(e, t = !1) {
    const {
        dep: n,
        prevSub: s,
        nextSub: r
    } = e;
    if (s && (s.nextSub = r, e.prevSub = void 0), r && (r.prevSub = s, e.nextSub = void 0), n.subs === e && (n.subs = s), !n.subs)
        if (n.computed) {
            n.computed.flags &= -5;
            for (let i = n.computed.deps; i; i = i.nextDep) es(i, !0)
        } else n.map && !t && (n.map.delete(n.key), n.map.size || qt.delete(n.target))
}

function vi(e) {
    const {
        prevDep: t,
        nextDep: n
    } = e;
    t && (t.nextDep = n, e.prevDep = void 0), n && (n.prevDep = t, e.nextDep = void 0)
}
let xe = !0;
const _r = [];

function Le() {
    _r.push(xe), xe = !1
}

function Ve() {
    const e = _r.pop();
    xe = e === void 0 ? !0 : e
}

function vs(e) {
    const {
        cleanup: t
    } = e;
    if (e.cleanup = void 0, t) {
        const n = L;
        L = void 0;
        try {
            t()
        } finally {
            L = n
        }
    }
}
let bt = 0;
class wi {
    constructor(t, n) {
        this.sub = t, this.dep = n, this.version = n.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0
    }
}
class ts {
    constructor(t) {
        this.computed = t, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.target = void 0, this.map = void 0, this.key = void 0
    }
    track(t) {
        if (!L || !xe || L === this.computed) return;
        let n = this.activeLink;
        if (n === void 0 || n.sub !== L) n = this.activeLink = new wi(L, this), L.deps ? (n.prevDep = L.depsTail, L.depsTail.nextDep = n, L.depsTail = n) : L.deps = L.depsTail = n, L.flags & 4 && mr(n);
        else if (n.version === -1 && (n.version = this.version, n.nextDep)) {
            const s = n.nextDep;
            s.prevDep = n.prevDep, n.prevDep && (n.prevDep.nextDep = s), n.prevDep = L.depsTail, n.nextDep = void 0, L.depsTail.nextDep = n, L.depsTail = n, L.deps === n && (L.deps = s)
        }
        return n
    }
    trigger(t) {
        this.version++, bt++, this.notify(t)
    }
    notify(t) {
        Xn();
        try {
            for (let n = this.subs; n; n = n.prevSub) n.sub.notify() && n.sub.dep.notify()
        } finally {
            Zn()
        }
    }
}

function mr(e) {
    const t = e.dep.computed;
    if (t && !e.dep.subs) {
        t.flags |= 20;
        for (let s = t.deps; s; s = s.nextDep) mr(s)
    }
    const n = e.dep.subs;
    n !== e && (e.prevSub = n, n && (n.nextSub = e)), e.dep.subs = e
}
const qt = new WeakMap,
    ze = Symbol(""),
    Nn = Symbol(""),
    yt = Symbol("");

function X(e, t, n) {
    if (xe && L) {
        let s = qt.get(e);
        s || qt.set(e, s = new Map);
        let r = s.get(n);
        r || (s.set(n, r = new ts), r.target = e, r.map = s, r.key = n), r.track()
    }
}

function Ie(e, t, n, s, r, i) {
    const o = qt.get(e);
    if (!o) {
        bt++;
        return
    }
    const l = u => {
        u && u.trigger()
    };
    if (Xn(), t === "clear") o.forEach(l);
    else {
        const u = O(e),
            p = u && Yn(n);
        if (u && n === "length") {
            const a = Number(s);
            o.forEach((d, x) => {
                (x === "length" || x === yt || !Se(x) && x >= a) && l(d)
            })
        } else switch (n !== void 0 && l(o.get(n)), p && l(o.get(yt)), t) {
            case "add":
                u ? p && l(o.get("length")) : (l(o.get(ze)), tt(e) && l(o.get(Nn)));
                break;
            case "delete":
                u || (l(o.get(ze)), tt(e) && l(o.get(Nn)));
                break;
            case "set":
                tt(e) && l(o.get(ze));
                break
        }
    }
    Zn()
}

function Xe(e) {
    const t = H(e);
    return t === e ? t : (X(t, "iterate", yt), de(e) ? t : t.map(Y))
}

function fn(e) {
    return X(e = H(e), "iterate", yt), e
}
const Si = {
    __proto__: null,
    [Symbol.iterator]() {
        return En(this, Symbol.iterator, Y)
    },
    concat(...e) {
        return Xe(this).concat(...e.map(t => O(t) ? Xe(t) : t))
    },
    entries() {
        return En(this, "entries", e => (e[1] = Y(e[1]), e))
    },
    every(e, t) {
        return Te(this, "every", e, t, void 0, arguments)
    },
    filter(e, t) {
        return Te(this, "filter", e, t, n => n.map(Y), arguments)
    },
    find(e, t) {
        return Te(this, "find", e, t, Y, arguments)
    },
    findIndex(e, t) {
        return Te(this, "findIndex", e, t, void 0, arguments)
    },
    findLast(e, t) {
        return Te(this, "findLast", e, t, Y, arguments)
    },
    findLastIndex(e, t) {
        return Te(this, "findLastIndex", e, t, void 0, arguments)
    },
    forEach(e, t) {
        return Te(this, "forEach", e, t, void 0, arguments)
    },
    includes(...e) {
        return On(this, "includes", e)
    },
    indexOf(...e) {
        return On(this, "indexOf", e)
    },
    join(e) {
        return Xe(this).join(e)
    },
    lastIndexOf(...e) {
        return On(this, "lastIndexOf", e)
    },
    map(e, t) {
        return Te(this, "map", e, t, void 0, arguments)
    },
    pop() {
        return ut(this, "pop")
    },
    push(...e) {
        return ut(this, "push", e)
    },
    reduce(e, ...t) {
        return ws(this, "reduce", e, t)
    },
    reduceRight(e, ...t) {
        return ws(this, "reduceRight", e, t)
    },
    shift() {
        return ut(this, "shift")
    },
    some(e, t) {
        return Te(this, "some", e, t, void 0, arguments)
    },
    splice(...e) {
        return ut(this, "splice", e)
    },
    toReversed() {
        return Xe(this).toReversed()
    },
    toSorted(e) {
        return Xe(this).toSorted(e)
    },
    toSpliced(...e) {
        return Xe(this).toSpliced(...e)
    },
    unshift(...e) {
        return ut(this, "unshift", e)
    },
    values() {
        return En(this, "values", Y)
    }
};

function En(e, t, n) {
    const s = fn(e),
        r = s[t]();
    return s !== e && !de(e) && (r._next = r.next, r.next = () => {
        const i = r._next();
        return i.value && (i.value = n(i.value)), i
    }), r
}
const Ci = Array.prototype;

function Te(e, t, n, s, r, i) {
    const o = fn(e),
        l = o !== e && !de(e),
        u = o[t];
    if (u !== Ci[t]) {
        const d = u.apply(e, i);
        return l ? Y(d) : d
    }
    let p = n;
    o !== e && (l ? p = function (d, x) {
        return n.call(this, Y(d), x, e)
    } : n.length > 2 && (p = function (d, x) {
        return n.call(this, d, x, e)
    }));
    const a = u.call(o, p, s);
    return l && r ? r(a) : a
}

function ws(e, t, n, s) {
    const r = fn(e);
    let i = n;
    return r !== e && (de(e) ? n.length > 3 && (i = function (o, l, u) {
        return n.call(this, o, l, u, e)
    }) : i = function (o, l, u) {
        return n.call(this, o, Y(l), u, e)
    }), r[t](i, ...s)
}

function On(e, t, n) {
    const s = H(e);
    X(s, "iterate", yt);
    const r = s[t](...n);
    return (r === -1 || r === !1) && is(n[0]) ? (n[0] = H(n[0]), s[t](...n)) : r
}

function ut(e, t, n = []) {
    Le(), Xn();
    const s = H(e)[t].apply(e, n);
    return Zn(), Ve(), s
}
const Ti = zn("__proto__,__v_isRef,__isVue"),
    br = new Set(Object.getOwnPropertyNames(Symbol).filter(e => e !== "arguments" && e !== "caller").map(e => Symbol[e]).filter(Se));

function Ei(e) {
    Se(e) || (e = String(e));
    const t = H(this);
    return X(t, "has", e), t.hasOwnProperty(e)
}
class yr {
    constructor(t = !1, n = !1) {
        this._isReadonly = t, this._isShallow = n
    }
    get(t, n, s) {
        const r = this._isReadonly,
            i = this._isShallow;
        if (n === "__v_isReactive") return !r;
        if (n === "__v_isReadonly") return r;
        if (n === "__v_isShallow") return i;
        if (n === "__v_raw") return s === (r ? i ? Vi : Cr : i ? Sr : wr).get(t) || Object.getPrototypeOf(t) === Object.getPrototypeOf(s) ? t : void 0;
        const o = O(t);
        if (!r) {
            let u;
            if (o && (u = Si[n])) return u;
            if (n === "hasOwnProperty") return Ei
        }
        const l = Reflect.get(t, n, Q(t) ? t : s);
        return (Se(n) ? br.has(n) : Ti(n)) || (r || X(t, "get", n), i) ? l : Q(l) ? o && Yn(n) ? l : l.value : K(l) ? r ? Tr(l) : an(l) : l
    }
}
class vr extends yr {
    constructor(t = !1) {
        super(!1, t)
    }
    set(t, n, s, r) {
        let i = t[n];
        if (!this._isShallow) {
            const u = Je(i);
            if (!de(s) && !Je(s) && (i = H(i), s = H(s)), !O(t) && Q(i) && !Q(s)) return u ? !1 : (i.value = s, !0)
        }
        const o = O(t) && Yn(n) ? Number(n) < t.length : D(t, n),
            l = Reflect.set(t, n, s, Q(t) ? t : r);
        return t === H(r) && (o ? je(s, i) && Ie(t, "set", n, s) : Ie(t, "add", n, s)), l
    }
    deleteProperty(t, n) {
        const s = D(t, n);
        t[n];
        const r = Reflect.deleteProperty(t, n);
        return r && s && Ie(t, "delete", n, void 0), r
    }
    has(t, n) {
        const s = Reflect.has(t, n);
        return (!Se(n) || !br.has(n)) && X(t, "has", n), s
    }
    ownKeys(t) {
        return X(t, "iterate", O(t) ? "length" : ze), Reflect.ownKeys(t)
    }
}
class Oi extends yr {
    constructor(t = !1) {
        super(!0, t)
    }
    set(t, n) {
        return !0
    }
    deleteProperty(t, n) {
        return !0
    }
}
const Ii = new vr,
    Ai = new Oi,
    Pi = new vr(!0);
const ns = e => e,
    un = e => Reflect.getPrototypeOf(e);

function Ft(e, t, n = !1, s = !1) {
    e = e.__v_raw;
    const r = H(e),
        i = H(t);
    n || (je(t, i) && X(r, "get", t), X(r, "get", i));
    const {
        has: o
    } = un(r), l = s ? ns : n ? os : Y;
    if (o.call(r, t)) return l(e.get(t));
    if (o.call(r, i)) return l(e.get(i));
    e !== r && e.get(t)
}

function Dt(e, t = !1) {
    const n = this.__v_raw,
        s = H(n),
        r = H(e);
    return t || (je(e, r) && X(s, "has", e), X(s, "has", r)), e === r ? n.has(e) : n.has(e) || n.has(r)
}

function Ht(e, t = !1) {
    return e = e.__v_raw, !t && X(H(e), "iterate", ze), Reflect.get(e, "size", e)
}

function Ss(e, t = !1) {
    !t && !de(e) && !Je(e) && (e = H(e));
    const n = H(this);
    return un(n).has.call(n, e) || (n.add(e), Ie(n, "add", e, e)), this
}

function Cs(e, t, n = !1) {
    !n && !de(t) && !Je(t) && (t = H(t));
    const s = H(this),
        {
            has: r,
            get: i
        } = un(s);
    let o = r.call(s, e);
    o || (e = H(e), o = r.call(s, e));
    const l = i.call(s, e);
    return s.set(e, t), o ? je(t, l) && Ie(s, "set", e, t) : Ie(s, "add", e, t), this
}

function Ts(e) {
    const t = H(this),
        {
            has: n,
            get: s
        } = un(t);
    let r = n.call(t, e);
    r || (e = H(e), r = n.call(t, e)), s && s.call(t, e);
    const i = t.delete(e);
    return r && Ie(t, "delete", e, void 0), i
}

function Es() {
    const e = H(this),
        t = e.size !== 0,
        n = e.clear();
    return t && Ie(e, "clear", void 0, void 0), n
}

function jt(e, t) {
    return function (s, r) {
        const i = this,
            o = i.__v_raw,
            l = H(o),
            u = t ? ns : e ? os : Y;
        return !e && X(l, "iterate", ze), o.forEach((p, a) => s.call(r, u(p), u(a), i))
    }
}

function Nt(e, t, n) {
    return function (...s) {
        const r = this.__v_raw,
            i = H(r),
            o = tt(i),
            l = e === "entries" || e === Symbol.iterator && o,
            u = e === "keys" && o,
            p = r[e](...s),
            a = n ? ns : t ? os : Y;
        return !t && X(i, "iterate", u ? Nn : ze), {
            next() {
                const {
                    value: d,
                    done: x
                } = p.next();
                return x ? {
                    value: d,
                    done: x
                } : {
                    value: l ? [a(d[0]), a(d[1])] : a(d),
                    done: x
                }
            },
            [Symbol.iterator]() {
                return this
            }
        }
    }
}

function Fe(e) {
    return function (...t) {
        return e === "delete" ? !1 : e === "clear" ? void 0 : this
    }
}

function Mi() {
    const e = {
        get(i) {
            return Ft(this, i)
        },
        get size() {
            return Ht(this)
        },
        has: Dt,
        add: Ss,
        set: Cs,
        delete: Ts,
        clear: Es,
        forEach: jt(!1, !1)
    },
        t = {
            get(i) {
                return Ft(this, i, !1, !0)
            },
            get size() {
                return Ht(this)
            },
            has: Dt,
            add(i) {
                return Ss.call(this, i, !0)
            },
            set(i, o) {
                return Cs.call(this, i, o, !0)
            },
            delete: Ts,
            clear: Es,
            forEach: jt(!1, !0)
        },
        n = {
            get(i) {
                return Ft(this, i, !0)
            },
            get size() {
                return Ht(this, !0)
            },
            has(i) {
                return Dt.call(this, i, !0)
            },
            add: Fe("add"),
            set: Fe("set"),
            delete: Fe("delete"),
            clear: Fe("clear"),
            forEach: jt(!0, !1)
        },
        s = {
            get(i) {
                return Ft(this, i, !0, !0)
            },
            get size() {
                return Ht(this, !0)
            },
            has(i) {
                return Dt.call(this, i, !0)
            },
            add: Fe("add"),
            set: Fe("set"),
            delete: Fe("delete"),
            clear: Fe("clear"),
            forEach: jt(!0, !0)
        };
    return ["keys", "values", "entries", Symbol.iterator].forEach(i => {
        e[i] = Nt(i, !1, !1), n[i] = Nt(i, !0, !1), t[i] = Nt(i, !1, !0), s[i] = Nt(i, !0, !0)
    }), [e, n, t, s]
}
const [Ri, Fi, Di, Hi] = Mi();

function ss(e, t) {
    const n = t ? e ? Hi : Di : e ? Fi : Ri;
    return (s, r, i) => r === "__v_isReactive" ? !e : r === "__v_isReadonly" ? e : r === "__v_raw" ? s : Reflect.get(D(n, r) && r in s ? n : s, r, i)
}
const ji = {
    get: ss(!1, !1)
},
    Ni = {
        get: ss(!1, !0)
    },
    Li = {
        get: ss(!0, !1)
    };
const wr = new WeakMap,
    Sr = new WeakMap,
    Cr = new WeakMap,
    Vi = new WeakMap;

function $i(e) {
    switch (e) {
        case "Object":
        case "Array":
            return 1;
        case "Map":
        case "Set":
        case "WeakMap":
        case "WeakSet":
            return 2;
        default:
            return 0
    }
}

function Ui(e) {
    return e.__v_skip || !Object.isExtensible(e) ? 0 : $i(fi(e))
}

function an(e) {
    return Je(e) ? e : rs(e, !1, Ii, ji, wr)
}

function Ki(e) {
    return rs(e, !1, Pi, Ni, Sr)
}

function Tr(e) {
    return rs(e, !0, Ai, Li, Cr)
}

function rs(e, t, n, s, r) {
    if (!K(e) || e.__v_raw && !(t && e.__v_isReactive)) return e;
    const i = r.get(e);
    if (i) return i;
    const o = Ui(e);
    if (o === 0) return e;
    const l = new Proxy(e, o === 2 ? s : n);
    return r.set(e, l), l
}

function nt(e) {
    return Je(e) ? nt(e.__v_raw) : !!(e && e.__v_isReactive)
}

function Je(e) {
    return !!(e && e.__v_isReadonly)
}

function de(e) {
    return !!(e && e.__v_isShallow)
}

function is(e) {
    return e ? !!e.__v_raw : !1
}

function H(e) {
    const t = e && e.__v_raw;
    return t ? H(t) : e
}

function Bi(e) {
    return !D(e, "__v_skip") && Object.isExtensible(e) && ir(e, "__v_skip", !0), e
}
const Y = e => K(e) ? an(e) : e,
    os = e => K(e) ? Tr(e) : e;

function Q(e) {
    return e ? e.__v_isRef === !0 : !1
}

function Wi(e) {
    return qi(e, !1)
}

function qi(e, t) {
    return Q(e) ? e : new ki(e, t)
}
class ki {
    constructor(t, n) {
        this.dep = new ts, this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = n ? t : H(t), this._value = n ? t : Y(t), this.__v_isShallow = n
    }
    get value() {
        return this.dep.track(), this._value
    }
    set value(t) {
        const n = this._rawValue,
            s = this.__v_isShallow || de(t) || Je(t);
        t = s ? t : H(t), je(t, n) && (this._rawValue = t, this._value = s ? t : Y(t), this.dep.trigger())
    }
}

function zi(e) {
    return Q(e) ? e.value : e
}
const Gi = {
    get: (e, t, n) => t === "__v_raw" ? e : zi(Reflect.get(e, t, n)),
    set: (e, t, n, s) => {
        const r = e[t];
        return Q(r) && !Q(n) ? (r.value = n, !0) : Reflect.set(e, t, n, s)
    }
};

function Er(e) {
    return nt(e) ? e : new Proxy(e, Gi)
}
class Ji {
    constructor(t, n, s) {
        this.fn = t, this.setter = n, this._value = void 0, this.dep = new ts(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = bt - 1, this.effect = this, this.__v_isReadonly = !n, this.isSSR = s
    }
    notify() {
        if (this.flags |= 16, !(this.flags & 8) && L !== this) return hr(this), !0
    }
    get value() {
        const t = this.dep.track();
        return gr(this), t && (t.version = this.dep.version), this._value
    }
    set value(t) {
        this.setter && this.setter(t)
    }
}

function Yi(e, t, n = !1) {
    let s, r;
    return P(e) ? s = e : (s = e.get, r = e.set), new Ji(s, r, n)
}
const Lt = {},
    kt = new WeakMap;
let qe;

function Qi(e, t = !1, n = qe) {
    if (n) {
        let s = kt.get(n);
        s || kt.set(n, s = []), s.push(e)
    }
}

function Xi(e, t, n = V) {
    const {
        immediate: s,
        deep: r,
        once: i,
        scheduler: o,
        augmentJob: l,
        call: u
    } = n, p = I => r ? I : de(I) || r === !1 || r === 0 ? Oe(I, 1) : Oe(I);
    let a, d, x, T, M = !1,
        F = !1;
    if (Q(e) ? (d = () => e.value, M = de(e)) : nt(e) ? (d = () => p(e), M = !0) : O(e) ? (F = !0, M = e.some(I => nt(I) || de(I)), d = () => e.map(I => {
        if (Q(I)) return I.value;
        if (nt(I)) return p(I);
        if (P(I)) return u ? u(I, 2) : I()
    })) : P(e) ? t ? d = u ? () => u(e, 2) : e : d = () => {
        if (x) {
            Le();
            try {
                x()
            } finally {
                Ve()
            }
        }
        const I = qe;
        qe = a;
        try {
            return u ? u(e, 3, [T]) : e(T)
        } finally {
            qe = I
        }
    } : d = pe, t && r) {
        const I = d,
            z = r === !0 ? 1 / 0 : r;
        d = () => Oe(I(), z)
    }
    const Z = yi(),
        N = () => {
            a.stop(), Z && Jn(Z.effects, a)
        };
    if (i && t) {
        const I = t;
        t = (...z) => {
            I(...z), N()
        }
    }
    let W = F ? new Array(e.length).fill(Lt) : Lt;
    const q = I => {
        if (!(!(a.flags & 1) || !a.dirty && !I))
            if (t) {
                const z = a.run();
                if (r || M || (F ? z.some((Me, ge) => je(Me, W[ge])) : je(z, W))) {
                    x && x();
                    const Me = qe;
                    qe = a;
                    try {
                        const ge = [z, W === Lt ? void 0 : F && W[0] === Lt ? [] : W, T];
                        u ? u(t, 3, ge) : t(...ge), W = z
                    } finally {
                        qe = Me
                    }
                }
            } else a.run()
    };
    return l && l(q), a = new ar(d), a.scheduler = o ? () => o(q, !1) : q, T = I => Qi(I, !1, a), x = a.onStop = () => {
        const I = kt.get(a);
        if (I) {
            if (u) u(I, 4);
            else
                for (const z of I) z();
            kt.delete(a)
        }
    }, t ? s ? q(!0) : W = a.run() : o ? o(q.bind(null, !0), !0) : a.run(), N.pause = a.pause.bind(a), N.resume = a.resume.bind(a), N.stop = N, N
}

function Oe(e, t = 1 / 0, n) {
    if (t <= 0 || !K(e) || e.__v_skip || (n = n || new Set, n.has(e))) return e;
    if (n.add(e), t--, Q(e)) Oe(e.value, t, n);
    else if (O(e))
        for (let s = 0; s < e.length; s++) Oe(e[s], t, n);
    else if (rn(e) || tt(e)) e.forEach(s => {
        Oe(s, t, n)
    });
    else if (sr(e)) {
        for (const s in e) Oe(e[s], t, n);
        for (const s of Object.getOwnPropertySymbols(e)) Object.prototype.propertyIsEnumerable.call(e, s) && Oe(e[s], t, n)
    }
    return e
}
/**
 * @vue/runtime-core v3.5.7
 * (c) 2018-present Yuxi (Evan) You and Vue contributors
 * @license MIT
 **/
function Et(e, t, n, s) {
    try {
        return s ? e(...s) : e()
    } catch (r) {
        dn(r, t, n)
    }
}

function Ce(e, t, n, s) {
    if (P(e)) {
        const r = Et(e, t, n, s);
        return r && tr(r) && r.catch(i => {
            dn(i, t, n)
        }), r
    }
    if (O(e)) {
        const r = [];
        for (let i = 0; i < e.length; i++) r.push(Ce(e[i], t, n, s));
        return r
    }
}

function dn(e, t, n, s = !0) {
    const r = t ? t.vnode : null,
        {
            errorHandler: i,
            throwUnhandledErrorInProduction: o
        } = t && t.appContext.config || V;
    if (t) {
        let l = t.parent;
        const u = t.proxy,
            p = `https://vuejs.org/error-reference/#runtime-${n}`;
        for (; l;) {
            const a = l.ec;
            if (a) {
                for (let d = 0; d < a.length; d++)
                    if (a[d](e, u, p) === !1) return
            }
            l = l.parent
        }
        if (i) {
            Le(), Et(i, null, 10, [e, u, p]), Ve();
            return
        }
    }
    Zi(e, n, r, s, o)
}

function Zi(e, t, n, s = !0, r = !1) {
    if (r) throw e;
    console.error(e)
}
let vt = !1,
    Ln = !1;
const se = [];
let ye = 0;
const st = [];
let De = null,
    Ze = 0;
const Or = Promise.resolve();
let ls = null;

function eo(e) {
    const t = ls || Or;
    return e ? t.then(this ? e.bind(this) : e) : t
}

function to(e) {
    let t = vt ? ye + 1 : 0,
        n = se.length;
    for (; t < n;) {
        const s = t + n >>> 1,
            r = se[s],
            i = wt(r);
        i < e || i === e && r.flags & 2 ? t = s + 1 : n = s
    }
    return t
}

function cs(e) {
    if (!(e.flags & 1)) {
        const t = wt(e),
            n = se[se.length - 1];
        !n || !(e.flags & 2) && t >= wt(n) ? se.push(e) : se.splice(to(t), 0, e), e.flags |= 1, Ir()
    }
}

function Ir() {
    !vt && !Ln && (Ln = !0, ls = Or.then(Pr))
}

function no(e) {
    O(e) ? st.push(...e) : De && e.id === -1 ? De.splice(Ze + 1, 0, e) : e.flags & 1 || (st.push(e), e.flags |= 1), Ir()
}

function Os(e, t, n = vt ? ye + 1 : 0) {
    for (; n < se.length; n++) {
        const s = se[n];
        if (s && s.flags & 2) {
            if (e && s.id !== e.uid) continue;
            se.splice(n, 1), n--, s.flags & 4 && (s.flags &= -2), s(), s.flags & 4 || (s.flags &= -2)
        }
    }
}

function Ar(e) {
    if (st.length) {
        const t = [...new Set(st)].sort((n, s) => wt(n) - wt(s));
        if (st.length = 0, De) {
            De.push(...t);
            return
        }
        for (De = t, Ze = 0; Ze < De.length; Ze++) {
            const n = De[Ze];
            n.flags & 4 && (n.flags &= -2), n.flags & 8 || n(), n.flags &= -2
        }
        De = null, Ze = 0
    }
}
const wt = e => e.id == null ? e.flags & 2 ? -1 : 1 / 0 : e.id;

function Pr(e) {
    Ln = !1, vt = !0;
    const t = pe;
    try {
        for (ye = 0; ye < se.length; ye++) {
            const n = se[ye];
            n && !(n.flags & 8) && (n.flags & 4 && (n.flags &= -2), Et(n, n.i, n.i ? 15 : 14), n.flags & 4 || (n.flags &= -2))
        }
    } finally {
        for (; ye < se.length; ye++) {
            const n = se[ye];
            n && (n.flags &= -2)
        }
        ye = 0, se.length = 0, Ar(), vt = !1, ls = null, (se.length || st.length) && Pr()
    }
}
let ae = null,
    Mr = null;

function zt(e) {
    const t = ae;
    return ae = e, Mr = e && e.type.__scopeId || null, t
}

function so(e, t = ae, n) {
    if (!t || e._n) return e;
    const s = (...r) => {
        s._d && js(-1);
        const i = zt(t);
        let o;
        try {
            o = e(...r)
        } finally {
            zt(i), s._d && js(1)
        }
        return o
    };
    return s._n = !0, s._c = !0, s._d = !0, s
}

function Is(e, t) {
    if (ae === null) return e;
    const n = _n(ae),
        s = e.dirs || (e.dirs = []);
    for (let r = 0; r < t.length; r++) {
        let [i, o, l, u = V] = t[r];
        i && (P(i) && (i = {
            mounted: i,
            updated: i
        }), i.deep && Oe(o), s.push({
            dir: i,
            instance: n,
            value: o,
            oldValue: void 0,
            arg: l,
            modifiers: u
        }))
    }
    return e
}

function Be(e, t, n, s) {
    const r = e.dirs,
        i = t && t.dirs;
    for (let o = 0; o < r.length; o++) {
        const l = r[o];
        i && (l.oldValue = i[o].value);
        let u = l.dir[s];
        u && (Le(), Ce(u, n, 8, [e.el, l, e, t]), Ve())
    }
}
const ro = Symbol("_vte"),
    io = e => e.__isTeleport;

function fs(e, t) {
    e.shapeFlag & 6 && e.component ? (e.transition = t, fs(e.component.subTree, t)) : e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t
} /*! #__NO_SIDE_EFFECTS__ */
function Vn(e, t) {
    return P(e) ? (() => G({
        name: e.name
    }, t, {
        setup: e
    }))() : e
}

function Rr(e) {
    e.ids = [e.ids[0] + e.ids[2]++ + "-", 0, 0]
}

function $n(e, t, n, s, r = !1) {
    if (O(e)) {
        e.forEach((M, F) => $n(M, t && (O(t) ? t[F] : t), n, s, r));
        return
    }
    if (gt(s) && !r) return;
    const i = s.shapeFlag & 4 ? _n(s.component) : s.el,
        o = r ? null : i,
        {
            i: l,
            r: u
        } = e,
        p = t && t.r,
        a = l.refs === V ? l.refs = {} : l.refs,
        d = l.setupState,
        x = H(d),
        T = d === V ? () => !1 : M => D(x, M);
    if (p != null && p !== u && (k(p) ? (a[p] = null, T(p) && (d[p] = null)) : Q(p) && (p.value = null)), P(u)) Et(u, l, 12, [o, a]);
    else {
        const M = k(u),
            F = Q(u);
        if (M || F) {
            const Z = () => {
                if (e.f) {
                    const N = M ? T(u) ? d[u] : a[u] : u.value;
                    r ? O(N) && Jn(N, i) : O(N) ? N.includes(i) || N.push(i) : M ? (a[u] = [i], T(u) && (d[u] = a[u])) : (u.value = [i], e.k && (a[e.k] = u.value))
                } else M ? (a[u] = o, T(u) && (d[u] = o)) : F && (u.value = o, e.k && (a[e.k] = o))
            };
            o ? (Z.id = -1, ce(Z, n)) : Z()
        }
    }
}
const gt = e => !!e.type.__asyncLoader,
    Fr = e => e.type.__isKeepAlive;

function oo(e, t) {
    Dr(e, "a", t)
}

function lo(e, t) {
    Dr(e, "da", t)
}

function Dr(e, t, n = re) {
    const s = e.__wdc || (e.__wdc = () => {
        let r = n;
        for (; r;) {
            if (r.isDeactivated) return;
            r = r.parent
        }
        return e()
    });
    if (hn(t, s, n), n) {
        let r = n.parent;
        for (; r && r.parent;) Fr(r.parent.vnode) && co(s, t, n, r), r = r.parent
    }
}

function co(e, t, n, s) {
    const r = hn(t, e, s, !0);
    us(() => {
        Jn(s[t], r)
    }, n)
}

function hn(e, t, n = re, s = !1) {
    if (n) {
        const r = n[e] || (n[e] = []),
            i = t.__weh || (t.__weh = (...o) => {
                Le();
                const l = Ot(n),
                    u = Ce(t, n, e, o);
                return l(), Ve(), u
            });
        return s ? r.unshift(i) : r.push(i), i
    }
}
const Pe = e => (t, n = re) => {
    (!gn || e === "sp") && hn(e, (...s) => t(...s), n)
},
    fo = Pe("bm"),
    Hr = Pe("m"),
    uo = Pe("bu"),
    ao = Pe("u"),
    ho = Pe("bum"),
    us = Pe("um"),
    po = Pe("sp"),
    xo = Pe("rtg"),
    go = Pe("rtc");

function _o(e, t = re) {
    hn("ec", e, t)
}
const mo = Symbol.for("v-ndc");

function bo(e, t, n, s) {
    let r;
    const i = n && n[s],
        o = O(e);
    if (o || k(e)) {
        const l = o && nt(e);
        let u = !1;
        l && (u = !de(e), e = fn(e)), r = new Array(e.length);
        for (let p = 0, a = e.length; p < a; p++) r[p] = t(u ? Y(e[p]) : e[p], p, void 0, i && i[p])
    } else if (typeof e == "number") {
        r = new Array(e);
        for (let l = 0; l < e; l++) r[l] = t(l + 1, l, void 0, i && i[l])
    } else if (K(e))
        if (e[Symbol.iterator]) r = Array.from(e, (l, u) => t(l, u, void 0, i && i[u]));
        else {
            const l = Object.keys(e);
            r = new Array(l.length);
            for (let u = 0, p = l.length; u < p; u++) {
                const a = l[u];
                r[u] = t(e[a], a, u, i && i[u])
            }
        }
    else r = [];
    return n && (n[s] = r), r
}
const Un = e => e ? ti(e) ? _n(e) : Un(e.parent) : null,
    _t = G(Object.create(null), {
        $: e => e,
        $el: e => e.vnode.el,
        $data: e => e.data,
        $props: e => e.props,
        $attrs: e => e.attrs,
        $slots: e => e.slots,
        $refs: e => e.refs,
        $parent: e => Un(e.parent),
        $root: e => Un(e.root),
        $host: e => e.ce,
        $emit: e => e.emit,
        $options: e => as(e),
        $forceUpdate: e => e.f || (e.f = () => {
            cs(e.update)
        }),
        $nextTick: e => e.n || (e.n = eo.bind(e.proxy)),
        $watch: e => Uo.bind(e)
    }),
    In = (e, t) => e !== V && !e.__isScriptSetup && D(e, t),
    yo = {
        get({
            _: e
        }, t) {
            if (t === "__v_skip") return !0;
            const {
                ctx: n,
                setupState: s,
                data: r,
                props: i,
                accessCache: o,
                type: l,
                appContext: u
            } = e;
            let p;
            if (t[0] !== "$") {
                const T = o[t];
                if (T !== void 0) switch (T) {
                    case 1:
                        return s[t];
                    case 2:
                        return r[t];
                    case 4:
                        return n[t];
                    case 3:
                        return i[t]
                } else {
                    if (In(s, t)) return o[t] = 1, s[t];
                    if (r !== V && D(r, t)) return o[t] = 2, r[t];
                    if ((p = e.propsOptions[0]) && D(p, t)) return o[t] = 3, i[t];
                    if (n !== V && D(n, t)) return o[t] = 4, n[t];
                    Kn && (o[t] = 0)
                }
            }
            const a = _t[t];
            let d, x;
            if (a) return t === "$attrs" && X(e.attrs, "get", ""), a(e);
            if ((d = l.__cssModules) && (d = d[t])) return d;
            if (n !== V && D(n, t)) return o[t] = 4, n[t];
            if (x = u.config.globalProperties, D(x, t)) return x[t]
        },
        set({
            _: e
        }, t, n) {
            const {
                data: s,
                setupState: r,
                ctx: i
            } = e;
            return In(r, t) ? (r[t] = n, !0) : s !== V && D(s, t) ? (s[t] = n, !0) : D(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (i[t] = n, !0)
        },
        has({
            _: {
                data: e,
                setupState: t,
                accessCache: n,
                ctx: s,
                appContext: r,
                propsOptions: i
            }
        }, o) {
            let l;
            return !!n[o] || e !== V && D(e, o) || In(t, o) || (l = i[0]) && D(l, o) || D(s, o) || D(_t, o) || D(r.config.globalProperties, o)
        },
        defineProperty(e, t, n) {
            return n.get != null ? e._.accessCache[t] = 0 : D(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n)
        }
    };

function As(e) {
    return O(e) ? e.reduce((t, n) => (t[n] = null, t), {}) : e
}
let Kn = !0;

function vo(e) {
    const t = as(e),
        n = e.proxy,
        s = e.ctx;
    Kn = !1, t.beforeCreate && Ps(t.beforeCreate, e, "bc");
    const {
        data: r,
        computed: i,
        methods: o,
        watch: l,
        provide: u,
        inject: p,
        created: a,
        beforeMount: d,
        mounted: x,
        beforeUpdate: T,
        updated: M,
        activated: F,
        deactivated: Z,
        beforeDestroy: N,
        beforeUnmount: W,
        destroyed: q,
        unmounted: I,
        render: z,
        renderTracked: Me,
        renderTriggered: ge,
        errorCaptured: Re,
        serverPrefetch: It,
        expose: $e,
        inheritAttrs: lt,
        components: At,
        directives: Pt,
        filters: mn
    } = t;
    if (p && wo(p, s, null), o)
        for (const B in o) {
            const $ = o[B];
            P($) && (s[B] = $.bind(n))
        }
    if (r) {
        const B = r.call(n, n);
        K(B) && (e.data = an(B))
    }
    if (Kn = !0, i)
        for (const B in i) {
            const $ = i[B],
                Ue = P($) ? $.bind(n, n) : P($.get) ? $.get.bind(n, n) : pe,
                Mt = !P($) && P($.set) ? $.set.bind(n) : pe,
                Ke = al({
                    get: Ue,
                    set: Mt
                });
            Object.defineProperty(s, B, {
                enumerable: !0,
                configurable: !0,
                get: () => Ke.value,
                set: _e => Ke.value = _e
            })
        }
    if (l)
        for (const B in l) jr(l[B], s, n, B);
    if (u) {
        const B = P(u) ? u.call(n) : u;
        Reflect.ownKeys(B).forEach($ => {
            Io($, B[$])
        })
    }
    a && Ps(a, e, "c");

    function ee(B, $) {
        O($) ? $.forEach(Ue => B(Ue.bind(n))) : $ && B($.bind(n))
    }
    if (ee(fo, d), ee(Hr, x), ee(uo, T), ee(ao, M), ee(oo, F), ee(lo, Z), ee(_o, Re), ee(go, Me), ee(xo, ge), ee(ho, W), ee(us, I), ee(po, It), O($e))
        if ($e.length) {
            const B = e.exposed || (e.exposed = {});
            $e.forEach($ => {
                Object.defineProperty(B, $, {
                    get: () => n[$],
                    set: Ue => n[$] = Ue
                })
            })
        } else e.exposed || (e.exposed = {});
    z && e.render === pe && (e.render = z), lt != null && (e.inheritAttrs = lt), At && (e.components = At), Pt && (e.directives = Pt), It && Rr(e)
}

function wo(e, t, n = pe) {
    O(e) && (e = Bn(e));
    for (const s in e) {
        const r = e[s];
        let i;
        K(r) ? "default" in r ? i = Ut(r.from || s, r.default, !0) : i = Ut(r.from || s) : i = Ut(r), Q(i) ? Object.defineProperty(t, s, {
            enumerable: !0,
            configurable: !0,
            get: () => i.value,
            set: o => i.value = o
        }) : t[s] = i
    }
}

function Ps(e, t, n) {
    Ce(O(e) ? e.map(s => s.bind(t.proxy)) : e.bind(t.proxy), t, n)
}

function jr(e, t, n, s) {
    let r = s.includes(".") ? Yr(n, s) : () => n[s];
    if (k(e)) {
        const i = t[e];
        P(i) && Pn(r, i)
    } else if (P(e)) Pn(r, e.bind(n));
    else if (K(e))
        if (O(e)) e.forEach(i => jr(i, t, n, s));
        else {
            const i = P(e.handler) ? e.handler.bind(n) : t[e.handler];
            P(i) && Pn(r, i, e)
        }
}

function as(e) {
    const t = e.type,
        {
            mixins: n,
            extends: s
        } = t,
        {
            mixins: r,
            optionsCache: i,
            config: {
                optionMergeStrategies: o
            }
        } = e.appContext,
        l = i.get(t);
    let u;
    return l ? u = l : !r.length && !n && !s ? u = t : (u = {}, r.length && r.forEach(p => Gt(u, p, o, !0)), Gt(u, t, o)), K(t) && i.set(t, u), u
}

function Gt(e, t, n, s = !1) {
    const {
        mixins: r,
        extends: i
    } = t;
    i && Gt(e, i, n, !0), r && r.forEach(o => Gt(e, o, n, !0));
    for (const o in t)
        if (!(s && o === "expose")) {
            const l = So[o] || n && n[o];
            e[o] = l ? l(e[o], t[o]) : t[o]
        } return e
}
const So = {
    data: Ms,
    props: Rs,
    emits: Rs,
    methods: dt,
    computed: dt,
    beforeCreate: te,
    created: te,
    beforeMount: te,
    mounted: te,
    beforeUpdate: te,
    updated: te,
    beforeDestroy: te,
    beforeUnmount: te,
    destroyed: te,
    unmounted: te,
    activated: te,
    deactivated: te,
    errorCaptured: te,
    serverPrefetch: te,
    components: dt,
    directives: dt,
    watch: To,
    provide: Ms,
    inject: Co
};

function Ms(e, t) {
    return t ? e ? function () {
        return G(P(e) ? e.call(this, this) : e, P(t) ? t.call(this, this) : t)
    } : t : e
}

function Co(e, t) {
    return dt(Bn(e), Bn(t))
}

function Bn(e) {
    if (O(e)) {
        const t = {};
        for (let n = 0; n < e.length; n++) t[e[n]] = e[n];
        return t
    }
    return e
}

function te(e, t) {
    return e ? [...new Set([].concat(e, t))] : t
}

function dt(e, t) {
    return e ? G(Object.create(null), e, t) : t
}

function Rs(e, t) {
    return e ? O(e) && O(t) ? [...new Set([...e, ...t])] : G(Object.create(null), As(e), As(t ?? {})) : t
}

function To(e, t) {
    if (!e) return t;
    if (!t) return e;
    const n = G(Object.create(null), e);
    for (const s in t) n[s] = te(e[s], t[s]);
    return n
}

function Nr() {
    return {
        app: null,
        config: {
            isNativeTag: li,
            performance: !1,
            globalProperties: {},
            optionMergeStrategies: {},
            errorHandler: void 0,
            warnHandler: void 0,
            compilerOptions: {}
        },
        mixins: [],
        components: {},
        directives: {},
        provides: Object.create(null),
        optionsCache: new WeakMap,
        propsCache: new WeakMap,
        emitsCache: new WeakMap
    }
}
let Eo = 0;

function Oo(e, t) {
    return function (s, r = null) {
        P(s) || (s = G({}, s)), r != null && !K(r) && (r = null);
        const i = Nr(),
            o = new WeakSet,
            l = [];
        let u = !1;
        const p = i.app = {
            _uid: Eo++,
            _component: s,
            _props: r,
            _container: null,
            _context: i,
            _instance: null,
            version: dl,
            get config() {
                return i.config
            },
            set config(a) { },
            use(a, ...d) {
                return o.has(a) || (a && P(a.install) ? (o.add(a), a.install(p, ...d)) : P(a) && (o.add(a), a(p, ...d))), p
            },
            mixin(a) {
                return i.mixins.includes(a) || i.mixins.push(a), p
            },
            component(a, d) {
                return d ? (i.components[a] = d, p) : i.components[a]
            },
            directive(a, d) {
                return d ? (i.directives[a] = d, p) : i.directives[a]
            },
            mount(a, d, x) {
                if (!u) {
                    const T = p._ceVNode || Ae(s, r);
                    return T.appContext = i, x === !0 ? x = "svg" : x === !1 && (x = void 0), d && t ? t(T, a) : e(T, a, x), u = !0, p._container = a, a.__vue_app__ = p, _n(T.component)
                }
            },
            onUnmount(a) {
                l.push(a)
            },
            unmount() {
                u && (Ce(l, p._instance, 16), e(null, p._container), delete p._container.__vue_app__)
            },
            provide(a, d) {
                return i.provides[a] = d, p
            },
            runWithContext(a) {
                const d = rt;
                rt = p;
                try {
                    return a()
                } finally {
                    rt = d
                }
            }
        };
        return p
    }
}
let rt = null;

function Io(e, t) {
    if (re) {
        let n = re.provides;
        const s = re.parent && re.parent.provides;
        s === n && (n = re.provides = Object.create(s)), n[e] = t
    }
}

function Ut(e, t, n = !1) {
    const s = re || ae;
    if (s || rt) {
        const r = rt ? rt._context.provides : s ? s.parent == null ? s.vnode.appContext && s.vnode.appContext.provides : s.parent.provides : void 0;
        if (r && e in r) return r[e];
        if (arguments.length > 1) return n && P(t) ? t.call(s && s.proxy) : t
    }
}
const Lr = {},
    Vr = () => Object.create(Lr),
    $r = e => Object.getPrototypeOf(e) === Lr;

function Ao(e, t, n, s = !1) {
    const r = {},
        i = Vr();
    e.propsDefaults = Object.create(null), Ur(e, t, r, i);
    for (const o in e.propsOptions[0]) o in r || (r[o] = void 0);
    n ? e.props = s ? r : Ki(r) : e.type.props ? e.props = r : e.props = i, e.attrs = i
}

function Po(e, t, n, s) {
    const {
        props: r,
        attrs: i,
        vnode: {
            patchFlag: o
        }
    } = e, l = H(r), [u] = e.propsOptions;
    let p = !1;
    if ((s || o > 0) && !(o & 16)) {
        if (o & 8) {
            const a = e.vnode.dynamicProps;
            for (let d = 0; d < a.length; d++) {
                let x = a[d];
                if (pn(e.emitsOptions, x)) continue;
                const T = t[x];
                if (u)
                    if (D(i, x)) T !== i[x] && (i[x] = T, p = !0);
                    else {
                        const M = Ge(x);
                        r[M] = Wn(u, l, M, T, e, !1)
                    }
                else T !== i[x] && (i[x] = T, p = !0)
            }
        }
    } else {
        Ur(e, t, r, i) && (p = !0);
        let a;
        for (const d in l) (!t || !D(t, d) && ((a = Ye(d)) === d || !D(t, a))) && (u ? n && (n[d] !== void 0 || n[a] !== void 0) && (r[d] = Wn(u, l, d, void 0, e, !0)) : delete r[d]);
        if (i !== l)
            for (const d in i) (!t || !D(t, d)) && (delete i[d], p = !0)
    }
    p && Ie(e.attrs, "set", "")
}

function Ur(e, t, n, s) {
    const [r, i] = e.propsOptions;
    let o = !1,
        l;
    if (t)
        for (let u in t) {
            if (pt(u)) continue;
            const p = t[u];
            let a;
            r && D(r, a = Ge(u)) ? !i || !i.includes(a) ? n[a] = p : (l || (l = {}))[a] = p : pn(e.emitsOptions, u) || (!(u in s) || p !== s[u]) && (s[u] = p, o = !0)
        }
    if (i) {
        const u = H(n),
            p = l || V;
        for (let a = 0; a < i.length; a++) {
            const d = i[a];
            n[d] = Wn(r, u, d, p[d], e, !D(p, d))
        }
    }
    return o
}

function Wn(e, t, n, s, r, i) {
    const o = e[n];
    if (o != null) {
        const l = D(o, "default");
        if (l && s === void 0) {
            const u = o.default;
            if (o.type !== Function && !o.skipFactory && P(u)) {
                const {
                    propsDefaults: p
                } = r;
                if (n in p) s = p[n];
                else {
                    const a = Ot(r);
                    s = p[n] = u.call(null, t), a()
                }
            } else s = u;
            r.ce && r.ce._setProp(n, s)
        }
        o[0] && (i && !l ? s = !1 : o[1] && (s === "" || s === Ye(n)) && (s = !0))
    }
    return s
}
const Mo = new WeakMap;

function Kr(e, t, n = !1) {
    const s = n ? Mo : t.propsCache,
        r = s.get(e);
    if (r) return r;
    const i = e.props,
        o = {},
        l = [];
    let u = !1;
    if (!P(e)) {
        const a = d => {
            u = !0;
            const [x, T] = Kr(d, t, !0);
            G(o, x), T && l.push(...T)
        };
        !n && t.mixins.length && t.mixins.forEach(a), e.extends && a(e.extends), e.mixins && e.mixins.forEach(a)
    }
    if (!i && !u) return K(e) && s.set(e, et), et;
    if (O(i))
        for (let a = 0; a < i.length; a++) {
            const d = Ge(i[a]);
            Fs(d) && (o[d] = V)
        } else if (i)
        for (const a in i) {
            const d = Ge(a);
            if (Fs(d)) {
                const x = i[a],
                    T = o[d] = O(x) || P(x) ? {
                        type: x
                    } : G({}, x),
                    M = T.type;
                let F = !1,
                    Z = !0;
                if (O(M))
                    for (let N = 0; N < M.length; ++N) {
                        const W = M[N],
                            q = P(W) && W.name;
                        if (q === "Boolean") {
                            F = !0;
                            break
                        } else q === "String" && (Z = !1)
                    } else F = P(M) && M.name === "Boolean";
                T[0] = F, T[1] = Z, (F || D(T, "default")) && l.push(d)
            }
        }
    const p = [o, l];
    return K(e) && s.set(e, p), p
}

function Fs(e) {
    return e[0] !== "$" && !pt(e)
}
const Br = e => e[0] === "_" || e === "$stable",
    ds = e => O(e) ? e.map(we) : [we(e)],
    Ro = (e, t, n) => {
        if (t._n) return t;
        const s = so((...r) => ds(t(...r)), n);
        return s._c = !1, s
    },
    Wr = (e, t, n) => {
        const s = e._ctx;
        for (const r in e) {
            if (Br(r)) continue;
            const i = e[r];
            if (P(i)) t[r] = Ro(r, i, s);
            else if (i != null) {
                const o = ds(i);
                t[r] = () => o
            }
        }
    },
    qr = (e, t) => {
        const n = ds(t);
        e.slots.default = () => n
    },
    kr = (e, t, n) => {
        for (const s in t) (n || s !== "_") && (e[s] = t[s])
    },
    Fo = (e, t, n) => {
        const s = e.slots = Vr();
        if (e.vnode.shapeFlag & 32) {
            const r = t._;
            r ? (kr(s, t, n), n && ir(s, "_", r, !0)) : Wr(t, s)
        } else t && qr(e, t)
    },
    Do = (e, t, n) => {
        const {
            vnode: s,
            slots: r
        } = e;
        let i = !0,
            o = V;
        if (s.shapeFlag & 32) {
            const l = t._;
            l ? n && l === 1 ? i = !1 : kr(r, t, n) : (i = !t.$stable, Wr(t, r)), o = t
        } else t && (qr(e, t), o = {
            default: 1
        });
        if (i)
            for (const l in r) !Br(l) && o[l] == null && delete r[l]
    },
    ce = Go;

function Ho(e) {
    return jo(e)
}

function jo(e, t) {
    const n = or();
    n.__VUE__ = !0;
    const {
        insert: s,
        remove: r,
        patchProp: i,
        createElement: o,
        createText: l,
        createComment: u,
        setText: p,
        setElementText: a,
        parentNode: d,
        nextSibling: x,
        setScopeId: T = pe,
        insertStaticContent: M
    } = e, F = (c, f, h, m = null, g = null, _ = null, w = void 0, v = null, y = !!f.dynamicChildren) => {
        if (c === f) return;
        c && !at(c, f) && (m = Rt(c), _e(c, g, _, !0), c = null), f.patchFlag === -2 && (y = !1, f.dynamicChildren = null);
        const {
            type: b,
            ref: E,
            shapeFlag: S
        } = f;
        switch (b) {
            case xn:
                Z(c, f, h, m);
                break;
            case St:
                N(c, f, h, m);
                break;
            case Kt:
                c == null && W(f, h, m, w);
                break;
            case ve:
                At(c, f, h, m, g, _, w, v, y);
                break;
            default:
                S & 1 ? z(c, f, h, m, g, _, w, v, y) : S & 6 ? Pt(c, f, h, m, g, _, w, v, y) : (S & 64 || S & 128) && b.process(c, f, h, m, g, _, w, v, y, Qe)
        }
        E != null && g && $n(E, c && c.ref, _, f || c, !f)
    }, Z = (c, f, h, m) => {
        if (c == null) s(f.el = l(f.children), h, m);
        else {
            const g = f.el = c.el;
            f.children !== c.children && p(g, f.children)
        }
    }, N = (c, f, h, m) => {
        c == null ? s(f.el = u(f.children || ""), h, m) : f.el = c.el
    }, W = (c, f, h, m) => {
        [c.el, c.anchor] = M(c.children, f, h, m, c.el, c.anchor)
    }, q = ({
        el: c,
        anchor: f
    }, h, m) => {
        let g;
        for (; c && c !== f;) g = x(c), s(c, h, m), c = g;
        s(f, h, m)
    }, I = ({
        el: c,
        anchor: f
    }) => {
        let h;
        for (; c && c !== f;) h = x(c), r(c), c = h;
        r(f)
    }, z = (c, f, h, m, g, _, w, v, y) => {
        f.type === "svg" ? w = "svg" : f.type === "math" && (w = "mathml"), c == null ? Me(f, h, m, g, _, w, v, y) : It(c, f, g, _, w, v, y)
    }, Me = (c, f, h, m, g, _, w, v) => {
        let y, b;
        const {
            props: E,
            shapeFlag: S,
            transition: C,
            dirs: A
        } = c;
        if (y = c.el = o(c.type, _, E && E.is, E), S & 8 ? a(y, c.children) : S & 16 && Re(c.children, y, null, m, g, An(c, _), w, v), A && Be(c, null, m, "created"), ge(y, c, c.scopeId, w, m), E) {
            for (const U in E) U !== "value" && !pt(U) && i(y, U, null, E[U], _, m);
            "value" in E && i(y, "value", null, E.value, _), (b = E.onVnodeBeforeMount) && be(b, m, c)
        }
        A && Be(c, null, m, "beforeMount");
        const R = No(g, C);
        R && C.beforeEnter(y), s(y, f, h), ((b = E && E.onVnodeMounted) || R || A) && ce(() => {
            b && be(b, m, c), R && C.enter(y), A && Be(c, null, m, "mounted")
        }, g)
    }, ge = (c, f, h, m, g) => {
        if (h && T(c, h), m)
            for (let _ = 0; _ < m.length; _++) T(c, m[_]);
        if (g) {
            let _ = g.subTree;
            if (f === _ || Xr(_.type) && (_.ssContent === f || _.ssFallback === f)) {
                const w = g.vnode;
                ge(c, w, w.scopeId, w.slotScopeIds, g.parent)
            }
        }
    }, Re = (c, f, h, m, g, _, w, v, y = 0) => {
        for (let b = y; b < c.length; b++) {
            const E = c[b] = v ? He(c[b]) : we(c[b]);
            F(null, E, f, h, m, g, _, w, v)
        }
    }, It = (c, f, h, m, g, _, w) => {
        const v = f.el = c.el;
        let {
            patchFlag: y,
            dynamicChildren: b,
            dirs: E
        } = f;
        y |= c.patchFlag & 16;
        const S = c.props || V,
            C = f.props || V;
        let A;
        if (h && We(h, !1), (A = C.onVnodeBeforeUpdate) && be(A, h, f, c), E && Be(f, c, h, "beforeUpdate"), h && We(h, !0), (S.innerHTML && C.innerHTML == null || S.textContent && C.textContent == null) && a(v, ""), b ? $e(c.dynamicChildren, b, v, h, m, An(f, g), _) : w || $(c, f, v, null, h, m, An(f, g), _, !1), y > 0) {
            if (y & 16) lt(v, S, C, h, g);
            else if (y & 2 && S.class !== C.class && i(v, "class", null, C.class, g), y & 4 && i(v, "style", S.style, C.style, g), y & 8) {
                const R = f.dynamicProps;
                for (let U = 0; U < R.length; U++) {
                    const j = R[U],
                        ie = S[j],
                        J = C[j];
                    (J !== ie || j === "value") && i(v, j, ie, J, g, h)
                }
            }
            y & 1 && c.children !== f.children && a(v, f.children)
        } else !w && b == null && lt(v, S, C, h, g);
        ((A = C.onVnodeUpdated) || E) && ce(() => {
            A && be(A, h, f, c), E && Be(f, c, h, "updated")
        }, m)
    }, $e = (c, f, h, m, g, _, w) => {
        for (let v = 0; v < f.length; v++) {
            const y = c[v],
                b = f[v],
                E = y.el && (y.type === ve || !at(y, b) || y.shapeFlag & 70) ? d(y.el) : h;
            F(y, b, E, null, m, g, _, w, !0)
        }
    }, lt = (c, f, h, m, g) => {
        if (f !== h) {
            if (f !== V)
                for (const _ in f) !pt(_) && !(_ in h) && i(c, _, f[_], null, g, m);
            for (const _ in h) {
                if (pt(_)) continue;
                const w = h[_],
                    v = f[_];
                w !== v && _ !== "value" && i(c, _, v, w, g, m)
            }
            "value" in h && i(c, "value", f.value, h.value, g)
        }
    }, At = (c, f, h, m, g, _, w, v, y) => {
        const b = f.el = c ? c.el : l(""),
            E = f.anchor = c ? c.anchor : l("");
        let {
            patchFlag: S,
            dynamicChildren: C,
            slotScopeIds: A
        } = f;
        A && (v = v ? v.concat(A) : A), c == null ? (s(b, h, m), s(E, h, m), Re(f.children || [], h, E, g, _, w, v, y)) : S > 0 && S & 64 && C && c.dynamicChildren ? ($e(c.dynamicChildren, C, h, g, _, w, v), (f.key != null || g && f === g.subTree) && zr(c, f, !0)) : $(c, f, h, E, g, _, w, v, y)
    }, Pt = (c, f, h, m, g, _, w, v, y) => {
        f.slotScopeIds = v, c == null ? f.shapeFlag & 512 ? g.ctx.activate(f, h, m, w, y) : mn(f, h, m, g, _, w, y) : ps(c, f, y)
    }, mn = (c, f, h, m, g, _, w) => {
        const v = c.component = il(c, m, g);
        if (Fr(c) && (v.ctx.renderer = Qe), ol(v, !1, w), v.asyncDep) {
            if (g && g.registerDep(v, ee, w), !c.el) {
                const y = v.subTree = Ae(St);
                N(null, y, f, h)
            }
        } else ee(v, c, f, h, g, _, w)
    }, ps = (c, f, h) => {
        const m = f.component = c.component;
        if (ko(c, f, h))
            if (m.asyncDep && !m.asyncResolved) {
                B(m, f, h);
                return
            } else m.next = f, m.update();
        else f.el = c.el, m.vnode = f
    }, ee = (c, f, h, m, g, _, w) => {
        const v = () => {
            if (c.isMounted) {
                let {
                    next: S,
                    bu: C,
                    u: A,
                    parent: R,
                    vnode: U
                } = c;
                {
                    const oe = Gr(c);
                    if (oe) {
                        S && (S.el = U.el, B(c, S, w)), oe.asyncDep.then(() => {
                            c.isUnmounted || v()
                        });
                        return
                    }
                }
                let j = S,
                    ie;
                We(c, !1), S ? (S.el = U.el, B(c, S, w)) : S = U, C && $t(C), (ie = S.props && S.props.onVnodeBeforeUpdate) && be(ie, R, S, U), We(c, !0);
                const J = Mn(c),
                    he = c.subTree;
                c.subTree = J, F(he, J, d(he.el), Rt(he), c, g, _), S.el = J.el, j === null && zo(c, J.el), A && ce(A, g), (ie = S.props && S.props.onVnodeUpdated) && ce(() => be(ie, R, S, U), g)
            } else {
                let S;
                const {
                    el: C,
                    props: A
                } = f, {
                    bm: R,
                    m: U,
                    parent: j,
                    root: ie,
                    type: J
                } = c, he = gt(f);
                if (We(c, !1), R && $t(R), !he && (S = A && A.onVnodeBeforeMount) && be(S, j, f), We(c, !0), C && vn) {
                    const oe = () => {
                        c.subTree = Mn(c), vn(C, c.subTree, c, g, null)
                    };
                    he && J.__asyncHydrate ? J.__asyncHydrate(C, c, oe) : oe()
                } else {
                    ie.ce && ie.ce._injectChildStyle(J);
                    const oe = c.subTree = Mn(c);
                    F(null, oe, h, m, c, g, _), f.el = oe.el
                }
                if (U && ce(U, g), !he && (S = A && A.onVnodeMounted)) {
                    const oe = f;
                    ce(() => be(S, j, oe), g)
                } (f.shapeFlag & 256 || j && gt(j.vnode) && j.vnode.shapeFlag & 256) && c.a && ce(c.a, g), c.isMounted = !0, f = h = m = null
            }
        };
        c.scope.on();
        const y = c.effect = new ar(v);
        c.scope.off();
        const b = c.update = y.run.bind(y),
            E = c.job = y.runIfDirty.bind(y);
        E.i = c, E.id = c.uid, y.scheduler = () => cs(E), We(c, !0), b()
    }, B = (c, f, h) => {
        f.component = c;
        const m = c.vnode.props;
        c.vnode = f, c.next = null, Po(c, f.props, m, h), Do(c, f.children, h), Le(), Os(c), Ve()
    }, $ = (c, f, h, m, g, _, w, v, y = !1) => {
        const b = c && c.children,
            E = c ? c.shapeFlag : 0,
            S = f.children,
            {
                patchFlag: C,
                shapeFlag: A
            } = f;
        if (C > 0) {
            if (C & 128) {
                Mt(b, S, h, m, g, _, w, v, y);
                return
            } else if (C & 256) {
                Ue(b, S, h, m, g, _, w, v, y);
                return
            }
        }
        A & 8 ? (E & 16 && ct(b, g, _), S !== b && a(h, S)) : E & 16 ? A & 16 ? Mt(b, S, h, m, g, _, w, v, y) : ct(b, g, _, !0) : (E & 8 && a(h, ""), A & 16 && Re(S, h, m, g, _, w, v, y))
    }, Ue = (c, f, h, m, g, _, w, v, y) => {
        c = c || et, f = f || et;
        const b = c.length,
            E = f.length,
            S = Math.min(b, E);
        let C;
        for (C = 0; C < S; C++) {
            const A = f[C] = y ? He(f[C]) : we(f[C]);
            F(c[C], A, h, null, g, _, w, v, y)
        }
        b > E ? ct(c, g, _, !0, !1, S) : Re(f, h, m, g, _, w, v, y, S)
    }, Mt = (c, f, h, m, g, _, w, v, y) => {
        let b = 0;
        const E = f.length;
        let S = c.length - 1,
            C = E - 1;
        for (; b <= S && b <= C;) {
            const A = c[b],
                R = f[b] = y ? He(f[b]) : we(f[b]);
            if (at(A, R)) F(A, R, h, null, g, _, w, v, y);
            else break;
            b++
        }
        for (; b <= S && b <= C;) {
            const A = c[S],
                R = f[C] = y ? He(f[C]) : we(f[C]);
            if (at(A, R)) F(A, R, h, null, g, _, w, v, y);
            else break;
            S--, C--
        }
        if (b > S) {
            if (b <= C) {
                const A = C + 1,
                    R = A < E ? f[A].el : m;
                for (; b <= C;) F(null, f[b] = y ? He(f[b]) : we(f[b]), h, R, g, _, w, v, y), b++
            }
        } else if (b > C)
            for (; b <= S;) _e(c[b], g, _, !0), b++;
        else {
            const A = b,
                R = b,
                U = new Map;
            for (b = R; b <= C; b++) {
                const le = f[b] = y ? He(f[b]) : we(f[b]);
                le.key != null && U.set(le.key, b)
            }
            let j, ie = 0;
            const J = C - R + 1;
            let he = !1,
                oe = 0;
            const ft = new Array(J);
            for (b = 0; b < J; b++) ft[b] = 0;
            for (b = A; b <= S; b++) {
                const le = c[b];
                if (ie >= J) {
                    _e(le, g, _, !0);
                    continue
                }
                let me;
                if (le.key != null) me = U.get(le.key);
                else
                    for (j = R; j <= C; j++)
                        if (ft[j - R] === 0 && at(le, f[j])) {
                            me = j;
                            break
                        } me === void 0 ? _e(le, g, _, !0) : (ft[me - R] = b + 1, me >= oe ? oe = me : he = !0, F(le, f[me], h, null, g, _, w, v, y), ie++)
            }
            const _s = he ? Lo(ft) : et;
            for (j = _s.length - 1, b = J - 1; b >= 0; b--) {
                const le = R + b,
                    me = f[le],
                    ms = le + 1 < E ? f[le + 1].el : m;
                ft[b] === 0 ? F(null, me, h, ms, g, _, w, v, y) : he && (j < 0 || b !== _s[j] ? Ke(me, h, ms, 2) : j--)
            }
        }
    }, Ke = (c, f, h, m, g = null) => {
        const {
            el: _,
            type: w,
            transition: v,
            children: y,
            shapeFlag: b
        } = c;
        if (b & 6) {
            Ke(c.component.subTree, f, h, m);
            return
        }
        if (b & 128) {
            c.suspense.move(f, h, m);
            return
        }
        if (b & 64) {
            w.move(c, f, h, Qe);
            return
        }
        if (w === ve) {
            s(_, f, h);
            for (let S = 0; S < y.length; S++) Ke(y[S], f, h, m);
            s(c.anchor, f, h);
            return
        }
        if (w === Kt) {
            q(c, f, h);
            return
        }
        if (m !== 2 && b & 1 && v)
            if (m === 0) v.beforeEnter(_), s(_, f, h), ce(() => v.enter(_), g);
            else {
                const {
                    leave: S,
                    delayLeave: C,
                    afterLeave: A
                } = v, R = () => s(_, f, h), U = () => {
                    S(_, () => {
                        R(), A && A()
                    })
                };
                C ? C(_, R, U) : U()
            }
        else s(_, f, h)
    }, _e = (c, f, h, m = !1, g = !1) => {
        const {
            type: _,
            props: w,
            ref: v,
            children: y,
            dynamicChildren: b,
            shapeFlag: E,
            patchFlag: S,
            dirs: C,
            cacheIndex: A
        } = c;
        if (S === -2 && (g = !1), v != null && $n(v, null, h, c, !0), A != null && (f.renderCache[A] = void 0), E & 256) {
            f.ctx.deactivate(c);
            return
        }
        const R = E & 1 && C,
            U = !gt(c);
        let j;
        if (U && (j = w && w.onVnodeBeforeUnmount) && be(j, f, c), E & 6) oi(c.component, h, m);
        else {
            if (E & 128) {
                c.suspense.unmount(h, m);
                return
            }
            R && Be(c, null, f, "beforeUnmount"), E & 64 ? c.type.remove(c, f, h, Qe, m) : b && !b.hasOnce && (_ !== ve || S > 0 && S & 64) ? ct(b, f, h, !1, !0) : (_ === ve && S & 384 || !g && E & 16) && ct(y, f, h), m && xs(c)
        } (U && (j = w && w.onVnodeUnmounted) || R) && ce(() => {
            j && be(j, f, c), R && Be(c, null, f, "unmounted")
        }, h)
    }, xs = c => {
        const {
            type: f,
            el: h,
            anchor: m,
            transition: g
        } = c;
        if (f === ve) {
            ii(h, m);
            return
        }
        if (f === Kt) {
            I(c);
            return
        }
        const _ = () => {
            r(h), g && !g.persisted && g.afterLeave && g.afterLeave()
        };
        if (c.shapeFlag & 1 && g && !g.persisted) {
            const {
                leave: w,
                delayLeave: v
            } = g, y = () => w(h, _);
            v ? v(c.el, _, y) : y()
        } else _()
    }, ii = (c, f) => {
        let h;
        for (; c !== f;) h = x(c), r(c), c = h;
        r(f)
    }, oi = (c, f, h) => {
        const {
            bum: m,
            scope: g,
            job: _,
            subTree: w,
            um: v,
            m: y,
            a: b
        } = c;
        Ds(y), Ds(b), m && $t(m), g.stop(), _ && (_.flags |= 8, _e(w, c, f, h)), v && ce(v, f), ce(() => {
            c.isUnmounted = !0
        }, f), f && f.pendingBranch && !f.isUnmounted && c.asyncDep && !c.asyncResolved && c.suspenseId === f.pendingId && (f.deps--, f.deps === 0 && f.resolve())
    }, ct = (c, f, h, m = !1, g = !1, _ = 0) => {
        for (let w = _; w < c.length; w++) _e(c[w], f, h, m, g)
    }, Rt = c => {
        if (c.shapeFlag & 6) return Rt(c.component.subTree);
        if (c.shapeFlag & 128) return c.suspense.next();
        const f = x(c.anchor || c.el),
            h = f && f[ro];
        return h ? x(h) : f
    };
    let bn = !1;
    const gs = (c, f, h) => {
        c == null ? f._vnode && _e(f._vnode, null, null, !0) : F(f._vnode || null, c, f, null, null, null, h), f._vnode = c, bn || (bn = !0, Os(), Ar(), bn = !1)
    },
        Qe = {
            p: F,
            um: _e,
            m: Ke,
            r: xs,
            mt: mn,
            mc: Re,
            pc: $,
            pbc: $e,
            n: Rt,
            o: e
        };
    let yn, vn;
    return t && ([yn, vn] = t(Qe)), {
        render: gs,
        hydrate: yn,
        createApp: Oo(gs, yn)
    }
}

function An({
    type: e,
    props: t
}, n) {
    return n === "svg" && e === "foreignObject" || n === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : n
}

function We({
    effect: e,
    job: t
}, n) {
    n ? (e.flags |= 32, t.flags |= 4) : (e.flags &= -33, t.flags &= -5)
}

function No(e, t) {
    return (!e || e && !e.pendingBranch) && t && !t.persisted
}

function zr(e, t, n = !1) {
    const s = e.children,
        r = t.children;
    if (O(s) && O(r))
        for (let i = 0; i < s.length; i++) {
            const o = s[i];
            let l = r[i];
            l.shapeFlag & 1 && !l.dynamicChildren && ((l.patchFlag <= 0 || l.patchFlag === 32) && (l = r[i] = He(r[i]), l.el = o.el), !n && l.patchFlag !== -2 && zr(o, l)), l.type === xn && (l.el = o.el)
        }
}

function Lo(e) {
    const t = e.slice(),
        n = [0];
    let s, r, i, o, l;
    const u = e.length;
    for (s = 0; s < u; s++) {
        const p = e[s];
        if (p !== 0) {
            if (r = n[n.length - 1], e[r] < p) {
                t[s] = r, n.push(s);
                continue
            }
            for (i = 0, o = n.length - 1; i < o;) l = i + o >> 1, e[n[l]] < p ? i = l + 1 : o = l;
            p < e[n[i]] && (i > 0 && (t[s] = n[i - 1]), n[i] = s)
        }
    }
    for (i = n.length, o = n[i - 1]; i-- > 0;) n[i] = o, o = t[o];
    return n
}

function Gr(e) {
    const t = e.subTree.component;
    if (t) return t.asyncDep && !t.asyncResolved ? t : Gr(t)
}

function Ds(e) {
    if (e)
        for (let t = 0; t < e.length; t++) e[t].flags |= 8
}
const Vo = Symbol.for("v-scx"),
    $o = () => Ut(Vo);

function Pn(e, t, n) {
    return Jr(e, t, n)
}

function Jr(e, t, n = V) {
    const {
        immediate: s,
        deep: r,
        flush: i,
        once: o
    } = n, l = G({}, n);
    let u;
    if (gn)
        if (i === "sync") {
            const x = $o();
            u = x.__watcherHandles || (x.__watcherHandles = [])
        } else if (!t || s) l.once = !0;
        else {
            const x = () => { };
            return x.stop = pe, x.resume = pe, x.pause = pe, x
        }
    const p = re;
    l.call = (x, T, M) => Ce(x, p, T, M);
    let a = !1;
    i === "post" ? l.scheduler = x => {
        ce(x, p && p.suspense)
    } : i !== "sync" && (a = !0, l.scheduler = (x, T) => {
        T ? x() : cs(x)
    }), l.augmentJob = x => {
        t && (x.flags |= 4), a && (x.flags |= 2, p && (x.id = p.uid, x.i = p))
    };
    const d = Xi(e, t, l);
    return u && u.push(d), d
}

function Uo(e, t, n) {
    const s = this.proxy,
        r = k(e) ? e.includes(".") ? Yr(s, e) : () => s[e] : e.bind(s, s);
    let i;
    P(t) ? i = t : (i = t.handler, n = t);
    const o = Ot(this),
        l = Jr(r, i.bind(s), n);
    return o(), l
}

function Yr(e, t) {
    const n = t.split(".");
    return () => {
        let s = e;
        for (let r = 0; r < n.length && s; r++) s = s[n[r]];
        return s
    }
}
const Ko = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${Ge(t)}Modifiers`] || e[`${Ye(t)}Modifiers`];

function Bo(e, t, ...n) {
    if (e.isUnmounted) return;
    const s = e.vnode.props || V;
    let r = n;
    const i = t.startsWith("update:"),
        o = i && Ko(s, t.slice(7));
    o && (o.trim && (r = n.map(a => k(a) ? a.trim() : a)), o.number && (r = n.map(Dn)));
    let l, u = s[l = Sn(t)] || s[l = Sn(Ge(t))];
    !u && i && (u = s[l = Sn(Ye(t))]), u && Ce(u, e, 6, r);
    const p = s[l + "Once"];
    if (p) {
        if (!e.emitted) e.emitted = {};
        else if (e.emitted[l]) return;
        e.emitted[l] = !0, Ce(p, e, 6, r)
    }
}

function Qr(e, t, n = !1) {
    const s = t.emitsCache,
        r = s.get(e);
    if (r !== void 0) return r;
    const i = e.emits;
    let o = {},
        l = !1;
    if (!P(e)) {
        const u = p => {
            const a = Qr(p, t, !0);
            a && (l = !0, G(o, a))
        };
        !n && t.mixins.length && t.mixins.forEach(u), e.extends && u(e.extends), e.mixins && e.mixins.forEach(u)
    }
    return !i && !l ? (K(e) && s.set(e, null), null) : (O(i) ? i.forEach(u => o[u] = null) : G(o, i), K(e) && s.set(e, o), o)
}

function pn(e, t) {
    return !e || !sn(t) ? !1 : (t = t.slice(2).replace(/Once$/, ""), D(e, t[0].toLowerCase() + t.slice(1)) || D(e, Ye(t)) || D(e, t))
}

function Mn(e) {
    const {
        type: t,
        vnode: n,
        proxy: s,
        withProxy: r,
        propsOptions: [i],
        slots: o,
        attrs: l,
        emit: u,
        render: p,
        renderCache: a,
        props: d,
        data: x,
        setupState: T,
        ctx: M,
        inheritAttrs: F
    } = e, Z = zt(e);
    let N, W;
    try {
        if (n.shapeFlag & 4) {
            const I = r || s,
                z = I;
            N = we(p.call(z, I, a, d, T, x, M)), W = l
        } else {
            const I = t;
            N = we(I.length > 1 ? I(d, {
                attrs: l,
                slots: o,
                emit: u
            }) : I(d, null)), W = t.props ? l : Wo(l)
        }
    } catch (I) {
        mt.length = 0, dn(I, e, 1), N = Ae(St)
    }
    let q = N;
    if (W && F !== !1) {
        const I = Object.keys(W),
            {
                shapeFlag: z
            } = q;
        I.length && z & 7 && (i && I.some(Gn) && (W = qo(W, i)), q = ot(q, W, !1, !0))
    }
    return n.dirs && (q = ot(q, null, !1, !0), q.dirs = q.dirs ? q.dirs.concat(n.dirs) : n.dirs), n.transition && fs(q, n.transition), N = q, zt(Z), N
}
const Wo = e => {
    let t;
    for (const n in e) (n === "class" || n === "style" || sn(n)) && ((t || (t = {}))[n] = e[n]);
    return t
},
    qo = (e, t) => {
        const n = {};
        for (const s in e) (!Gn(s) || !(s.slice(9) in t)) && (n[s] = e[s]);
        return n
    };

function ko(e, t, n) {
    const {
        props: s,
        children: r,
        component: i
    } = e, {
        props: o,
        children: l,
        patchFlag: u
    } = t, p = i.emitsOptions;
    if (t.dirs || t.transition) return !0;
    if (n && u >= 0) {
        if (u & 1024) return !0;
        if (u & 16) return s ? Hs(s, o, p) : !!o;
        if (u & 8) {
            const a = t.dynamicProps;
            for (let d = 0; d < a.length; d++) {
                const x = a[d];
                if (o[x] !== s[x] && !pn(p, x)) return !0
            }
        }
    } else return (r || l) && (!l || !l.$stable) ? !0 : s === o ? !1 : s ? o ? Hs(s, o, p) : !0 : !!o;
    return !1
}

function Hs(e, t, n) {
    const s = Object.keys(t);
    if (s.length !== Object.keys(e).length) return !0;
    for (let r = 0; r < s.length; r++) {
        const i = s[r];
        if (t[i] !== e[i] && !pn(n, i)) return !0
    }
    return !1
}

function zo({
    vnode: e,
    parent: t
}, n) {
    for (; t;) {
        const s = t.subTree;
        if (s.suspense && s.suspense.activeBranch === e && (s.el = e.el), s === e) (e = t.vnode).el = n, t = t.parent;
        else break
    }
}
const Xr = e => e.__isSuspense;

function Go(e, t) {
    t && t.pendingBranch ? O(e) ? t.effects.push(...e) : t.effects.push(e) : no(e)
}
const ve = Symbol.for("v-fgt"),
    xn = Symbol.for("v-txt"),
    St = Symbol.for("v-cmt"),
    Kt = Symbol.for("v-stc"),
    mt = [];
let ue = null;

function ht(e = !1) {
    mt.push(ue = e ? null : [])
}

function Jo() {
    mt.pop(), ue = mt[mt.length - 1] || null
}
let Ct = 1;

function js(e) {
    Ct += e, e < 0 && ue && (ue.hasOnce = !0)
}

function Zr(e) {
    return e.dynamicChildren = Ct > 0 ? ue || et : null, Jo(), Ct > 0 && ue && ue.push(e), e
}

function Vt(e, t, n, s, r, i) {
    return Zr(ne(e, t, n, s, r, i, !0))
}

function Yo(e, t, n, s, r) {
    return Zr(Ae(e, t, n, s, r, !0))
}

function Qo(e) {
    return e ? e.__v_isVNode === !0 : !1
}

function at(e, t) {
    return e.type === t.type && e.key === t.key
}
const ei = ({
    key: e
}) => e ?? null,
    Bt = ({
        ref: e,
        ref_key: t,
        ref_for: n
    }) => (typeof e == "number" && (e = "" + e), e != null ? k(e) || Q(e) || P(e) ? {
        i: ae,
        r: e,
        k: t,
        f: !!n
    } : e : null);

function ne(e, t = null, n = null, s = 0, r = null, i = e === ve ? 0 : 1, o = !1, l = !1) {
    const u = {
        __v_isVNode: !0,
        __v_skip: !0,
        type: e,
        props: t,
        key: t && ei(t),
        ref: t && Bt(t),
        scopeId: Mr,
        slotScopeIds: null,
        children: n,
        component: null,
        suspense: null,
        ssContent: null,
        ssFallback: null,
        dirs: null,
        transition: null,
        el: null,
        anchor: null,
        target: null,
        targetStart: null,
        targetAnchor: null,
        staticCount: 0,
        shapeFlag: i,
        patchFlag: s,
        dynamicProps: r,
        dynamicChildren: null,
        appContext: null,
        ctx: ae
    };
    return l ? (hs(u, n), i & 128 && e.normalize(u)) : n && (u.shapeFlag |= k(n) ? 8 : 16), Ct > 0 && !o && ue && (u.patchFlag > 0 || i & 6) && u.patchFlag !== 32 && ue.push(u), u
}
const Ae = Xo;

function Xo(e, t = null, n = null, s = 0, r = null, i = !1) {
    if ((!e || e === mo) && (e = St), Qo(e)) {
        const l = ot(e, t, !0);
        return n && hs(l, n), Ct > 0 && !i && ue && (l.shapeFlag & 6 ? ue[ue.indexOf(e)] = l : ue.push(l)), l.patchFlag = -2, l
    }
    if (ul(e) && (e = e.__vccOpts), t) {
        t = Zo(t);
        let {
            class: l,
            style: u
        } = t;
        l && !k(l) && (t.class = ln(l)), K(u) && (is(u) && !O(u) && (u = G({}, u)), t.style = Qn(u))
    }
    const o = k(e) ? 1 : Xr(e) ? 128 : io(e) ? 64 : K(e) ? 4 : P(e) ? 2 : 0;
    return ne(e, t, n, s, r, o, i, !0)
}

function Zo(e) {
    return e ? is(e) || $r(e) ? G({}, e) : e : null
}

function ot(e, t, n = !1, s = !1) {
    const {
        props: r,
        ref: i,
        patchFlag: o,
        children: l,
        transition: u
    } = e, p = t ? nl(r || {}, t) : r, a = {
        __v_isVNode: !0,
        __v_skip: !0,
        type: e.type,
        props: p,
        key: p && ei(p),
        ref: t && t.ref ? n && i ? O(i) ? i.concat(Bt(t)) : [i, Bt(t)] : Bt(t) : i,
        scopeId: e.scopeId,
        slotScopeIds: e.slotScopeIds,
        children: l,
        target: e.target,
        targetStart: e.targetStart,
        targetAnchor: e.targetAnchor,
        staticCount: e.staticCount,
        shapeFlag: e.shapeFlag,
        patchFlag: t && e.type !== ve ? o === -1 ? 16 : o | 16 : o,
        dynamicProps: e.dynamicProps,
        dynamicChildren: e.dynamicChildren,
        appContext: e.appContext,
        dirs: e.dirs,
        transition: u,
        component: e.component,
        suspense: e.suspense,
        ssContent: e.ssContent && ot(e.ssContent),
        ssFallback: e.ssFallback && ot(e.ssFallback),
        el: e.el,
        anchor: e.anchor,
        ctx: e.ctx,
        ce: e.ce
    };
    return u && s && fs(a, u.clone(a)), a
}

function el(e = " ", t = 0) {
    return Ae(xn, null, e, t)
}

function tl(e, t) {
    const n = Ae(Kt, null, e);
    return n.staticCount = t, n
}

function we(e) {
    return e == null || typeof e == "boolean" ? Ae(St) : O(e) ? Ae(ve, null, e.slice()) : typeof e == "object" ? He(e) : Ae(xn, null, String(e))
}

function He(e) {
    return e.el === null && e.patchFlag !== -1 || e.memo ? e : ot(e)
}

function hs(e, t) {
    let n = 0;
    const {
        shapeFlag: s
    } = e;
    if (t == null) t = null;
    else if (O(t)) n = 16;
    else if (typeof t == "object")
        if (s & 65) {
            const r = t.default;
            r && (r._c && (r._d = !1), hs(e, r()), r._c && (r._d = !0));
            return
        } else {
            n = 32;
            const r = t._;
            !r && !$r(t) ? t._ctx = ae : r === 3 && ae && (ae.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024))
        }
    else P(t) ? (t = {
        default: t,
        _ctx: ae
    }, n = 32) : (t = String(t), s & 64 ? (n = 16, t = [el(t)]) : n = 8);
    e.children = t, e.shapeFlag |= n
}

function nl(...e) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
        const s = e[n];
        for (const r in s)
            if (r === "class") t.class !== s.class && (t.class = ln([t.class, s.class]));
            else if (r === "style") t.style = Qn([t.style, s.style]);
            else if (sn(r)) {
                const i = t[r],
                    o = s[r];
                o && i !== o && !(O(i) && i.includes(o)) && (t[r] = i ? [].concat(i, o) : o)
            } else r !== "" && (t[r] = s[r])
    }
    return t
}

function be(e, t, n, s = null) {
    Ce(e, t, 7, [n, s])
}
const sl = Nr();
let rl = 0;

function il(e, t, n) {
    const s = e.type,
        r = (t ? t.appContext : e.appContext) || sl,
        i = {
            uid: rl++,
            vnode: e,
            type: s,
            parent: t,
            appContext: r,
            root: null,
            next: null,
            subTree: null,
            effect: null,
            update: null,
            job: null,
            scope: new bi(!0),
            render: null,
            proxy: null,
            exposed: null,
            exposeProxy: null,
            withProxy: null,
            provides: t ? t.provides : Object.create(r.provides),
            ids: t ? t.ids : ["", 0, 0],
            accessCache: null,
            renderCache: [],
            components: null,
            directives: null,
            propsOptions: Kr(s, r),
            emitsOptions: Qr(s, r),
            emit: null,
            emitted: null,
            propsDefaults: V,
            inheritAttrs: s.inheritAttrs,
            ctx: V,
            data: V,
            props: V,
            attrs: V,
            slots: V,
            refs: V,
            setupState: V,
            setupContext: null,
            suspense: n,
            suspenseId: n ? n.pendingId : 0,
            asyncDep: null,
            asyncResolved: !1,
            isMounted: !1,
            isUnmounted: !1,
            isDeactivated: !1,
            bc: null,
            c: null,
            bm: null,
            m: null,
            bu: null,
            u: null,
            um: null,
            bum: null,
            da: null,
            a: null,
            rtg: null,
            rtc: null,
            ec: null,
            sp: null
        };
    return i.ctx = {
        _: i
    }, i.root = t ? t.root : i, i.emit = Bo.bind(null, i), e.ce && e.ce(i), i
}
let re = null,
    Jt, qn;
{
    const e = or(),
        t = (n, s) => {
            let r;
            return (r = e[n]) || (r = e[n] = []), r.push(s), i => {
                r.length > 1 ? r.forEach(o => o(i)) : r[0](i)
            }
        };
    Jt = t("__VUE_INSTANCE_SETTERS__", n => re = n), qn = t("__VUE_SSR_SETTERS__", n => gn = n)
}
const Ot = e => {
    const t = re;
    return Jt(e), e.scope.on(), () => {
        e.scope.off(), Jt(t)
    }
},
    Ns = () => {
        re && re.scope.off(), Jt(null)
    };

function ti(e) {
    return e.vnode.shapeFlag & 4
}
let gn = !1;

function ol(e, t = !1, n = !1) {
    t && qn(t);
    const {
        props: s,
        children: r
    } = e.vnode, i = ti(e);
    Ao(e, s, i, t), Fo(e, r, n);
    const o = i ? ll(e, t) : void 0;
    return t && qn(!1), o
}

function ll(e, t) {
    const n = e.type;
    e.accessCache = Object.create(null), e.proxy = new Proxy(e.ctx, yo);
    const {
        setup: s
    } = n;
    if (s) {
        const r = e.setupContext = s.length > 1 ? fl(e) : null,
            i = Ot(e);
        Le();
        const o = Et(s, e, 0, [e.props, r]);
        if (Ve(), i(), tr(o)) {
            if (gt(e) || Rr(e), o.then(Ns, Ns), t) return o.then(l => {
                Ls(e, l, t)
            }).catch(l => {
                dn(l, e, 0)
            });
            e.asyncDep = o
        } else Ls(e, o, t)
    } else ni(e, t)
}

function Ls(e, t, n) {
    P(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : K(t) && (e.setupState = Er(t)), ni(e, n)
}
let Vs;

function ni(e, t, n) {
    const s = e.type;
    if (!e.render) {
        if (!t && Vs && !s.render) {
            const r = s.template || as(e).template;
            if (r) {
                const {
                    isCustomElement: i,
                    compilerOptions: o
                } = e.appContext.config, {
                    delimiters: l,
                    compilerOptions: u
                } = s, p = G(G({
                    isCustomElement: i,
                    delimiters: l
                }, o), u);
                s.render = Vs(r, p)
            }
        }
        e.render = s.render || pe
    } {
        const r = Ot(e);
        Le();
        try {
            vo(e)
        } finally {
            Ve(), r()
        }
    }
}
const cl = {
    get(e, t) {
        return X(e, "get", ""), e[t]
    }
};

function fl(e) {
    const t = n => {
        e.exposed = n || {}
    };
    return {
        attrs: new Proxy(e.attrs, cl),
        slots: e.slots,
        emit: e.emit,
        expose: t
    }
}

function _n(e) {
    return e.exposed ? e.exposeProxy || (e.exposeProxy = new Proxy(Er(Bi(e.exposed)), {
        get(t, n) {
            if (n in t) return t[n];
            if (n in _t) return _t[n](e)
        },
        has(t, n) {
            return n in t || n in _t
        }
    })) : e.proxy
}

function ul(e) {
    return P(e) && "__vccOpts" in e
}
const al = (e, t) => Yi(e, t, gn),
    dl = "3.5.7";
/**
 * @vue/runtime-dom v3.5.7
 * (c) 2018-present Yuxi (Evan) You and Vue contributors
 * @license MIT
 **/
let kn;
const $s = typeof window < "u" && window.trustedTypes;
if ($s) try {
    kn = $s.createPolicy("vue", {
        createHTML: e => e
    })
} catch { }
const si = kn ? e => kn.createHTML(e) : e => e,
    hl = "http://www.w3.org/2000/svg",
    pl = "http://www.w3.org/1998/Math/MathML",
    Ee = typeof document < "u" ? document : null,
    Us = Ee && Ee.createElement("template"),
    xl = {
        insert: (e, t, n) => {
            t.insertBefore(e, n || null)
        },
        remove: e => {
            const t = e.parentNode;
            t && t.removeChild(e)
        },
        createElement: (e, t, n, s) => {
            const r = t === "svg" ? Ee.createElementNS(hl, e) : t === "mathml" ? Ee.createElementNS(pl, e) : n ? Ee.createElement(e, {
                is: n
            }) : Ee.createElement(e);
            return e === "select" && s && s.multiple != null && r.setAttribute("multiple", s.multiple), r
        },
        createText: e => Ee.createTextNode(e),
        createComment: e => Ee.createComment(e),
        setText: (e, t) => {
            e.nodeValue = t
        },
        setElementText: (e, t) => {
            e.textContent = t
        },
        parentNode: e => e.parentNode,
        nextSibling: e => e.nextSibling,
        querySelector: e => Ee.querySelector(e),
        setScopeId(e, t) {
            e.setAttribute(t, "")
        },
        insertStaticContent(e, t, n, s, r, i) {
            const o = n ? n.previousSibling : t.lastChild;
            if (r && (r === i || r.nextSibling))
                for (; t.insertBefore(r.cloneNode(!0), n), !(r === i || !(r = r.nextSibling)););
            else {
                Us.innerHTML = si(s === "svg" ? `<svg>${e}</svg>` : s === "mathml" ? `<math>${e}</math>` : e);
                const l = Us.content;
                if (s === "svg" || s === "mathml") {
                    const u = l.firstChild;
                    for (; u.firstChild;) l.appendChild(u.firstChild);
                    l.removeChild(u)
                }
                t.insertBefore(l, n)
            }
            return [o ? o.nextSibling : t.firstChild, n ? n.previousSibling : t.lastChild]
        }
    },
    gl = Symbol("_vtc");

function _l(e, t, n) {
    const s = e[gl];
    s && (t = (t ? [t, ...s] : [...s]).join(" ")), t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t
}
const Ks = Symbol("_vod"),
    ml = Symbol("_vsh"),
    bl = Symbol(""),
    yl = /(^|;)\s*display\s*:/;

function vl(e, t, n) {
    const s = e.style,
        r = k(n);
    let i = !1;
    if (n && !r) {
        if (t)
            if (k(t))
                for (const o of t.split(";")) {
                    const l = o.slice(0, o.indexOf(":")).trim();
                    n[l] == null && Wt(s, l, "")
                } else
                for (const o in t) n[o] == null && Wt(s, o, "");
        for (const o in n) o === "display" && (i = !0), Wt(s, o, n[o])
    } else if (r) {
        if (t !== n) {
            const o = s[bl];
            o && (n += ";" + o), s.cssText = n, i = yl.test(n)
        }
    } else t && e.removeAttribute("style");
    Ks in e && (e[Ks] = i ? s.display : "", e[ml] && (s.display = "none"))
}
const Bs = /\s*!important$/;

function Wt(e, t, n) {
    if (O(n)) n.forEach(s => Wt(e, t, s));
    else if (n == null && (n = ""), t.startsWith("--")) e.setProperty(t, n);
    else {
        const s = wl(e, t);
        Bs.test(n) ? e.setProperty(Ye(s), n.replace(Bs, ""), "important") : e[s] = n
    }
}
const Ws = ["Webkit", "Moz", "ms"],
    Rn = {};

function wl(e, t) {
    const n = Rn[t];
    if (n) return n;
    let s = Ge(t);
    if (s !== "filter" && s in e) return Rn[t] = s;
    s = rr(s);
    for (let r = 0; r < Ws.length; r++) {
        const i = Ws[r] + s;
        if (i in e) return Rn[t] = i
    }
    return t
}
const qs = "http://www.w3.org/1999/xlink";

function ks(e, t, n, s, r, i = _i(t)) {
    s && t.startsWith("xlink:") ? n == null ? e.removeAttributeNS(qs, t.slice(6, t.length)) : e.setAttributeNS(qs, t, n) : n == null || i && !lr(n) ? e.removeAttribute(t) : e.setAttribute(t, i ? "" : Se(n) ? String(n) : n)
}

function Sl(e, t, n, s) {
    if (t === "innerHTML" || t === "textContent") {
        n != null && (e[t] = t === "innerHTML" ? si(n) : n);
        return
    }
    const r = e.tagName;
    if (t === "value" && r !== "PROGRESS" && !r.includes("-")) {
        const o = r === "OPTION" ? e.getAttribute("value") || "" : e.value,
            l = n == null ? e.type === "checkbox" ? "on" : "" : String(n);
        (o !== l || !("_value" in e)) && (e.value = l), n == null && e.removeAttribute(t), e._value = n;
        return
    }
    let i = !1;
    if (n === "" || n == null) {
        const o = typeof e[t];
        o === "boolean" ? n = lr(n) : n == null && o === "string" ? (n = "", i = !0) : o === "number" && (n = 0, i = !0)
    }
    try {
        e[t] = n
    } catch { }
    i && e.removeAttribute(t)
}

function ke(e, t, n, s) {
    e.addEventListener(t, n, s)
}

function Cl(e, t, n, s) {
    e.removeEventListener(t, n, s)
}
const zs = Symbol("_vei");

function Tl(e, t, n, s, r = null) {
    const i = e[zs] || (e[zs] = {}),
        o = i[t];
    if (s && o) o.value = s;
    else {
        const [l, u] = El(t);
        if (s) {
            const p = i[t] = Al(s, r);
            ke(e, l, p, u)
        } else o && (Cl(e, l, o, u), i[t] = void 0)
    }
}
const Gs = /(?:Once|Passive|Capture)$/;

function El(e) {
    let t;
    if (Gs.test(e)) {
        t = {};
        let s;
        for (; s = e.match(Gs);) e = e.slice(0, e.length - s[0].length), t[s[0].toLowerCase()] = !0
    }
    return [e[2] === ":" ? e.slice(3) : Ye(e.slice(2)), t]
}
let Fn = 0;
const Ol = Promise.resolve(),
    Il = () => Fn || (Ol.then(() => Fn = 0), Fn = Date.now());

function Al(e, t) {
    const n = s => {
        if (!s._vts) s._vts = Date.now();
        else if (s._vts <= n.attached) return;
        Ce(Pl(s, n.value), t, 5, [s])
    };
    return n.value = e, n.attached = Il(), n
}

function Pl(e, t) {
    if (O(t)) {
        const n = e.stopImmediatePropagation;
        return e.stopImmediatePropagation = () => {
            n.call(e), e._stopped = !0
        }, t.map(s => r => !r._stopped && s && s(r))
    } else return t
}
const Js = e => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123,
    Ml = (e, t, n, s, r, i) => {
        const o = r === "svg";
        t === "class" ? _l(e, s, o) : t === "style" ? vl(e, n, s) : sn(t) ? Gn(t) || Tl(e, t, n, s, i) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : Rl(e, t, s, o)) ? (Sl(e, t, s), !e.tagName.includes("-") && (t === "value" || t === "checked" || t === "selected") && ks(e, t, s, o, i, t !== "value")) : (t === "true-value" ? e._trueValue = s : t === "false-value" && (e._falseValue = s), ks(e, t, s, o))
    };

function Rl(e, t, n, s) {
    if (s) return !!(t === "innerHTML" || t === "textContent" || t in e && Js(t) && P(n));
    if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA") return !1;
    if (t === "width" || t === "height") {
        const r = e.tagName;
        if (r === "IMG" || r === "VIDEO" || r === "CANVAS" || r === "SOURCE") return !1
    }
    return Js(t) && k(n) ? !1 : !!(t in e || e._isVueCE && (/[A-Z]/.test(t) || !k(n)))
}
const Yt = e => {
    const t = e.props["onUpdate:modelValue"] || !1;
    return O(t) ? n => $t(t, n) : t
};

function Fl(e) {
    e.target.composing = !0
}

function Ys(e) {
    const t = e.target;
    t.composing && (t.composing = !1, t.dispatchEvent(new Event("input")))
}
const it = Symbol("_assign"),
    Dl = {
        created(e, {
            modifiers: {
                lazy: t,
                trim: n,
                number: s
            }
        }, r) {
            e[it] = Yt(r);
            const i = s || r.props && r.props.type === "number";
            ke(e, t ? "change" : "input", o => {
                if (o.target.composing) return;
                let l = e.value;
                n && (l = l.trim()), i && (l = Dn(l)), e[it](l)
            }), n && ke(e, "change", () => {
                e.value = e.value.trim()
            }), t || (ke(e, "compositionstart", Fl), ke(e, "compositionend", Ys), ke(e, "change", Ys))
        },
        mounted(e, {
            value: t
        }) {
            e.value = t ?? ""
        },
        beforeUpdate(e, {
            value: t,
            oldValue: n,
            modifiers: {
                lazy: s,
                trim: r,
                number: i
            }
        }, o) {
            if (e[it] = Yt(o), e.composing) return;
            const l = (i || e.type === "number") && !/^0\d/.test(e.value) ? Dn(e.value) : e.value,
                u = t ?? "";
            l !== u && (document.activeElement === e && e.type !== "range" && (s && t === n || r && e.value.trim() === u) || (e.value = u))
        }
    },
    Hl = {
        deep: !0,
        created(e, t, n) {
            e[it] = Yt(n), ke(e, "change", () => {
                const s = e._modelValue,
                    r = jl(e),
                    i = e.checked,
                    o = e[it];
                if (O(s)) {
                    const l = cr(s, r),
                        u = l !== -1;
                    if (i && !u) o(s.concat(r));
                    else if (!i && u) {
                        const p = [...s];
                        p.splice(l, 1), o(p)
                    }
                } else if (rn(s)) {
                    const l = new Set(s);
                    i ? l.add(r) : l.delete(r), o(l)
                } else o(ri(e, i))
            })
        },
        mounted: Qs,
        beforeUpdate(e, t, n) {
            e[it] = Yt(n), Qs(e, t, n)
        }
    };

function Qs(e, {
    value: t,
    oldValue: n
}, s) {
    e._modelValue = t;
    let r;
    O(t) ? r = cr(t, s.props.value) > -1 : rn(t) ? r = t.has(s.props.value) : r = cn(t, ri(e, !0)), e.checked !== r && (e.checked = r)
}

function jl(e) {
    return "_value" in e ? e._value : e.value
}

function ri(e, t) {
    const n = t ? "_trueValue" : "_falseValue";
    return n in e ? e[n] : t
}
const Nl = G({
    patchProp: Ml
}, xl);
let Xs;

function Ll() {
    return Xs || (Xs = Ho(Nl))
}
const Vl = (...e) => {
    const t = Ll().createApp(...e),
        {
            mount: n
        } = t;
    return t.mount = s => {
        const r = Ul(s);
        if (!r) return;
        const i = t._component;
        !P(i) && !i.render && !i.template && (i.template = r.innerHTML), r.nodeType === 1 && (r.textContent = "");
        const o = n(r, !1, $l(r));
        return r instanceof Element && (r.removeAttribute("v-cloak"), r.setAttribute("data-v-app", "")), o
    }, t
};

function $l(e) {
    if (e instanceof SVGElement) return "svg";
    if (typeof MathMLElement == "function" && e instanceof MathMLElement) return "mathml"
}

function Ul(e) {
    return k(e) ? document.querySelector(e) : e
}

const { UID, ROLE } = await initPremiumState();

const Xl = Vn({
    __name: "HomePage",
    setup(e) {
        const scanning = Wi(false);
        let consoleLog = Wi("$ UID : " + UID + "\n$ Starting bruteforce\n");
        const bruteForceScan = async () => {
            consoleLog = Wi("$ Starting bruteforce\n");
            let index = 0;
            const loop = async () => {
                if (!scanning.value) return;
                if (index == remain_puid.length - 1) {
                    consoleLog.value += `$ Finished scanning, no premium UID found.\n`;
                    scanning.value = false;
                    return;
                }
                try {
                    const res = await fetch(`https://tool-eop-v3-backend-wszmtm2dda-uc.a.run.app/task-answer/answers`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            major: "1",
                            unit: "0",
                            task: "1",
                            userId: remain_puid[index]
                        })
                    });

                    consoleLog.value += `[${remain_puid[index]}] ${res.status === 200 ? "Role : *Premium*" : "Role : Normal"}\n`;
                    if (res.status === 200) {
                        consoleLog.value += `$ Found 1 premium UID, exiting...\n$ UID changed, please reopen extension to take effect.\n`;
                        chrome.storage.local.set({ "eop-puid": remain_puid[index] });
                        return;
                    }
                    const el = document.getElementById("crack-console");
                    if (el) el.scrollTop = el.scrollHeight;

                    index++;
                    setTimeout(loop, 0);
                } catch (err) {
                    consoleLog.value += `[${uid}] Connection error!, \n` + err.message + "\n";
                    scanning.value = false;
                }
            };

            loop();
        };

        const n = Wi("auto"),
            s = an({
                status: true,
                currentSecond: 30,
                secondEOP: 30
            }),
            r = async () => {
                try {
                    await wn({
                        type: "theory-auto-filling",
                        case: "one-hit"
                    })
                } catch (d) {
                    console["error"]("Error in oneHit:", d)
                }
            }, i = a => {
                n["value"] !== a && (n["value"] = a, o())
            }, o = () => {
                try {
                    localStorage["setItem"]("activeTab", n.value)
                } catch (d) {
                    console["error"]("Error saving active tab:", d)
                }
            }, l = () => {
                try {
                    const d = localStorage["getItem"]("activeTab");
                    d && (n.value = d)
                } catch (d) {
                    console["error"]("Error loading active tab:", d)
                }
            }, u = async () => {
                try {
                    await wn({
                        type: "theory-auto-filling",
                        case: "set-all",
                        value: s
                    })
                } catch (d) {
                    console.error("Error updating theory object:", d)
                }
            }, p = async () => {
                try {
                    const d = await wn({
                        type: "theory-auto-filling",
                        case: "get-all"
                    });
                    Object["assign"](s, d)
                } catch (d) {
                    console["error"]("Error getting theory object:", d)
                }
            };
        return Hr(async () => {
            l(), await p(), chrome["runtime"]["onMessage"]["addListener"](x => {
                x["type"] === "update-theory-object" && Object.assign(s, x["value"])
            });
            const d = setInterval(p, 1e3);
            us(() => clearInterval(d))
        }), (a, d) => {
            return ht(), Vt("div", { class: "bg-neutral-50 min-h-screen p-3" }, [

                // Tiêu đề
                d[4] || (d[4] = ne("h1", {
                    class: "text-xl font-bold text-primary-600 mb-3"
                }, "Tool EOP [Cracked by lvh - hngl]", -1)),

                // Tabs
                ne("div", { class: "tabs w-full" }, [
                    (ht(), Vt(ve, null, bo(["auto", "manual", "cracked"], T => {
                        return ne("a", {
                            key: T,
                            class: ln(["tab tab-lifted flex-1 text-sm", n.value === T ? "tab-active" : "bg-gray-200 bg-opacity-50"]),
                            onClick: F => i(T)
                        }, Hn(
                            T === "auto" ? "Automatic" :
                                T === "manual" ? "Normal" :
                                    "Cracked"), 11, ["onClick"]);
                    }), 64))
                ]),

                // Nội dung chính theo tab
                ne("div", { class: "bg-white rounded-b-lg shadow-sm p-4" }, [

                    // --- AUTO TAB ---
                    n.value === "auto" ? (
                        ht(),
                        Vt("div", { key: 0 }, [
                            ne("div", { class: "text-center mb-4" }, [
                                ne("span", { class: "text-3xl font-bold text-accent-blue-500" }, Hn(s.currentSecond) + " giây ", 1)
                            ]),
                            ne("div", { class: "flex items-center justify-between mb-3" }, [
                                d[2] || (d[2] = ne("span", { class: "text-sm font-medium text-neutral-700" }, "Trạng thái tự động:", -1)),
                                Is(ne("input", {
                                    "onUpdate:modelValue": d[0] || (d[0] = T => s.status = T),
                                    type: "checkbox",
                                    class: "toggle toggle-primary toggle-sm",
                                    onChange: u
                                }, null, 544), [
                                    [Hl, s.status]
                                ])
                            ]),
                            ne("div", { class: "flex items-center justify-between" }, [
                                d[3] || (d[3] = ne("label", {
                                    for: "inputSecond",
                                    class: "text-sm text-neutral-600"
                                }, "Độ trễ (giây):", -1)),
                                Is(ne("input", {
                                    "onUpdate:modelValue": d[1] || (d[1] = T => s.secondEOP = T),
                                    type: "number",
                                    min: "5",
                                    class: "input input-bordered input-sm w-24 bg-neutral-100 focus:border-primary-400",
                                    id: "inputSecond",
                                    onInput: u
                                }, null, 544), [
                                    [Dl, s.secondEOP, void 0, { number: false }]
                                ])
                            ])
                        ])
                    ) :

                        // --- MANUAL TAB ---
                        n.value === "manual" ? (
                            ht(),
                            Vt("div", { class: "text-3xl font-bold text-accent-blue-500", key: 1 }, [
                                ne("button", {
                                    onClick: r,
                                    class: "btn btn-primary btn-sm w-full text-white"
                                }, " One Hit ")
                            ])
                        ) :

                            // --- CRACKED TAB ---
                            n.value === "cracked" ? (
                                ht(),
                                Vt("div", { class: "font-bold bg-black text-white", key: 2 }, [
                                    ne("div", {
                                        id: "crack-console",
                                        class: "console",
                                        textContent: consoleLog.value
                                    }, null, 8, ["textContent"]),

                                    ne("button", {
                                        onClick: () => {
                                            scanning.value = !scanning.value;
                                            if (scanning.value) {
                                                consoleLog.value += "$ Start\n";
                                                bruteForceScan();
                                            } else {
                                                consoleLog.value += "$ Stop\n";
                                            }
                                        },
                                        class: "btn btn-warning btn-sm text-black w-full"
                                    }, Hn(scanning.value ? "Tạm dưng" : "Bắt đầu"))
                                ])
                            ) : null

                ]),

                // Footer
                d[5] || (d[5] = tl(`
    <div class="mt-4 bg-white rounded-lg shadow-sm p-4">
        <h2 class="text-base font-bold text-secondary-500 mb-2">Chú ý</h2>
        <ul class="list-disc list-inside space-y-2">
            <li class="text-neutral-700 text-sm"> Vai trò: <span class="font-bold text-accent-blue-500">${ROLE}</span></li>
            <li class="text-neutral-700 text-sm"><strong>Donate:</strong> 034537028 MB - LE VIET HUNG</li>
            <li class="text-neutral-700 text-sm"><strong>Miễn phí sử dụng</strong></li>
            <li class="text-neutral-700 text-sm"><strong>Liên hệ</strong>
                <a class="btn btn-circle btn-outline btn-xs bg-primary hover:bg-primary-600 text-white ml-1" 
                    href="https://www.facebook.com/hngl2808/" 
                    target="_blank">
                <i class="fab fa-facebook"></i></a>
                <a class="btn btn-circle btn-outline btn-xs bg-primary hover:bg-primary-600 text-white ml-1" 
                    href="https://github.com/netrotion" 
                    target="_blank">
                <i class="fa-brands fa-github"></i></a>
            </li>
            <li class="text-neutral-700 text-sm"><strong>Sắp Xếp chữ (Mới):</strong> Chạy tool qua bài lý thuyết từ vựng trước, sau đó làm bài sắp xếp. </li>
        </ul>
    </div>`, 1))

            ]);

        }
    }
});

const Zl = Vn({
    __name: "App",
    setup(e) {
        return "App", (n, s) => (ht(), Yo(Xl))
    }
});

const ec = (e, t) => {
    const n = e.__vccOpts || e;
    for (const [s, r] of t) n[s] = r;
    return n
},
    tc = ec(Zl, [
        ["__scopeId", "data-v-2f7552ef"]
    ]);

Vl(tc)["mount"]("#app");