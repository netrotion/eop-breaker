import {
    s as p,
    c as l,
    a as b
} from "./constant.js";
(function(t, a) {
    for (var e = x, r = t();
        [];) try {
        var n = parseInt(e(507)) / 1 * (parseInt(e(511)) / 2) + -parseInt(e(509)) / 3 * (-parseInt(e(502)) / 4) + -parseInt(e(492)) / 5 * (parseInt(e(488)) / 6) + -parseInt(e(506)) / 7 * (parseInt(e(493)) / 8) + parseInt(e(499)) / 9 * (-parseInt(e(500)) / 10) + -parseInt(e(510)) / 11 * (-parseInt(e(503)) / 12) + parseInt(e(498)) / 13;
        if (n === a) break;
        r.push(r.shift())
    } catch {
        r.push(r.shift())
    }
})(c, 988981);
async function v(t) {
    try {
        return await new Promise(a => {
            var e = x;
            chrome[e(505)][e(494)][e(496)]([t], r => {
                if (r[t] !== void 0) a(r[t]);
                else switch (t) {
                    case b:
                        a(![]);
                        break;
                    case l:
                        a(30);
                        break;
                    case p:
                        a(30);
                        break;
                    default:
                        a(0)
                }
            })
        })
    } catch {
        return null
    }
}

function x(t, a) {
    var e = c();
    return x = function(r, n) {
        r = r - 488;
        var s = e[r];
        return s
    }, x(t, a)
}
async function I(t, a) {
    var e = x;
    try {
        await chrome[e(505)][e(494)].set({
            [t]: a
        })
    } catch {}
}

function c() {
    var t = ["error", "114595PNQnZX", "11789816JcQIRZ", "sync", "log", "get", "length", "23861240KvnmbP", "9774819vxqRER", "10cFLJSk", "tabs", "668WzkCWi", "300Ebaskh", "*://eop.edu.vn/*", "storage", "7CDxAYP", "632009yjqjUQ", "runtime", "531KqObbG", "88121tznUta", "6NhJRJK", "108lzrloL", "lastError", "map"];
    return c = function() {
        return t
    }, c()
}

function g(t) {
    return new Promise((a, e) => {
        var r = x;
        try {
            chrome[r(501)].query({
                url: r(504)
            }, n => {
                var s = r;
                if (n[s(497)] === 0) {
                    e();
                    return
                }
                n[s(490)](o => new Promise(f => {
                    var u = x;
                    o.id ? chrome[u(501)].sendMessage(o.id, t, h => {
                        var i = u;
                        chrome[i(508)][i(489)] ? f(null) : a(h)
                    }) : f(null)
                }))
            })
        } catch (n) {
            console[r(495)](r(491), n), e(n)
        }
    })
}
export {
    I as a, v as g, g as s
};