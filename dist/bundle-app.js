!function(e) {
    var t = {};
    function a(i) {
        if (t[i])
            return t[i].exports;
        var s = t[i] = {
            i: i,
            l: !1,
            exports: {}
        };
        return e[i].call(s.exports, s, s.exports, a),
        s.l = !0,
        s.exports
    }
    a.m = e,
    a.c = t,
    a.d = function(e, t, i) {
        a.o(e, t) || Object.defineProperty(e, t, {
            enumerable: !0,
            get: i
        })
    }
    ,
    a.r = function(e) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }),
        Object.defineProperty(e, "__esModule", {
            value: !0
        })
    }
    ,
    a.t = function(e, t) {
        if (1 & t && (e = a(e)),
        8 & t)
            return e;
        if (4 & t && "object" == typeof e && e && e.__esModule)
            return e;
        var i = Object.create(null);
        if (a.r(i),
        Object.defineProperty(i, "default", {
            enumerable: !0,
            value: e
        }),
        2 & t && "string" != typeof e)
            for (var s in e)
                a.d(i, s, function(t) {
                    return e[t]
                }
                .bind(null, s));
        return i
    }
    ,
    a.n = function(e) {
        var t = e && e.__esModule ? function() {
            return e.default
        }
        : function() {
            return e
        }
        ;
        return a.d(t, "a", t),
        t
    }
    ,
    a.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }
    ,
    a.p = "",
    a(a.s = 1)
}([function(e, t, a) {
    "use strict";
    a.r(t);
    const i = 0
      , s = 3
      , r = 1e3
      , n = 8;
    var o = class {
        constructor() {
            this.deck = null,
            this.gameDeck = [],
            this.gameUI = null,
            this.playerRating = s,
            this.moveCount = 0,
            this.flipCount = 0,
            this.matchCount = 0,
            this.firstCard = void 0,
            this.deckFragment = null,
            this.wait = (e=>new Promise((t,a)=>setTimeout(t, e))),
            this.isTurnInprogress = !1
        }
        setDeck(e) {
            this.deck = e
        }
        setGameUI(e) {
            this.gameUI = e
        }
        getGameDeck() {
            return this.gameDeck
        }
        startNewGame() {
            this.playerRating = s,
            this.gameUI.updatePlayerRating(this.playerRating, s),
            this.moveCount = 0,
            this.gameUI.updateMoveCount(this.moveCount),
            this.flipCount = 0,
            this.matchCount = 0,
            this.firstCard = void 0,
            this.gameDeck = this.deck.shuffle(),
            this.gameUI.buildDeck(this.gameDeck),
            this.gameDeck.forEach((e,t)=>{
                this.gameUI.turnCardFaceDown(t)
            }
            ),
            this.gameUI.startTimer()
        }
        turn(e) {
            return null !== e && this.firstCard !== e && !this.gameUI.isCardMatched(e) && !(this.flipCount > 1) && (this.gameUI.turnCardFaceUp(e),
            this.flipCount += 1,
            1 === this.flipCount ? this.firstCard = e : (this.moveCount += 1,
            this.gameUI.updateMoveCount(this.moveCount),
            this.deck.isSymbolMatch(this.gameDeck, this.firstCard, e) ? this.pairMatched(this.firstCard, e) : this.pairNotMatched(this.firstCard, e)),
            this.matchCount >= n && (this.gameUI.stopTimer(),
            this.gameUI.showWinDialog(this, this.playerRating, this.moveCount),
            !0))
        }
        pairMatched(e, t) {
            this.matchCount += 1,
            this.gameUI.markMatchedPair(e, t),
            this.firstCard = void 0,
            this.flipCount = 0,
            this.playerRating = this.playerRating < s ? this.playerRating += 1 : this.playerRating,
            this.gameUI.updatePlayerRating(this.playerRating, s)
        }
        async pairNotMatched(e, t) {
            await this.wait(r),
            this.gameUI.turnCardFaceDown(e),
            this.gameUI.turnCardFaceDown(t),
            this.firstCard = void 0,
            this.flipCount = 0,
            this.playerRating = this.playerRating > i ? this.playerRating -= 1 : this.playerRating,
            this.gameUI.updatePlayerRating(this.playerRating, s)
        }
    }
    ;
    var c = class {
        constructor() {
            this.gameTimer = null,
            this.gameTimerMinutes = 0,
            this.gameTimerSeconds = 0,
            this.secondsDOMElement = document.querySelector(".timer-seconds"),
            this.minutesDOMElement = document.querySelector(".timer-minutes")
        }
        buildDeck(e) {
            const t = document.querySelector(".deck");
            if (t.childElementCount > 0)
                for (; t.firstChild; )
                    t.removeChild(t.firstChild);
            const a = document.createDocumentFragment();
            e.forEach((e,t)=>{
                const i = document.createElement("li");
                i.setAttribute("id", `${t}`),
                i.setAttribute("class", "card");
                const s = document.createElement("i");
                s.setAttribute("class", `fa ${e.symbol}`),
                i.appendChild(s),
                a.appendChild(i)
            }
            ),
            t.appendChild(a)
        }
        turnCardFaceDown(e) {
            document.getElementById(`${e}`).setAttribute("class", "card")
        }
        turnCardFaceUp(e) {
            const t = document.getElementById(`${e}`)
              , a = t.getAttribute("class") + " open faceup ";
            t.setAttribute("class", a)
        }
        markMatchedPair(e, t) {
            const a = document.getElementById(`${e}`);
            let i = a.getAttribute("class") + " match ";
            a.setAttribute("class", i);
            const s = document.getElementById(`${t}`);
            i = s.getAttribute("class") + " match",
            s.setAttribute("class", i),
            this.animateMatchedPair(a, s)
        }
        isCardMatched(e) {
            return document.getElementById(`${e}`).getAttribute("class").includes("match")
        }
        animateMatchedPair(e, t) {
            const a = "animation-duration: 1s; animation-name: card-match;";
            e.setAttribute("style", a),
            t.setAttribute("style", a)
        }
        updateMoveCount(e) {
            document.querySelector(".moves").innerText = e
        }
        updatePlayerRating(e, t) {
            const a = document.querySelectorAll(".rating");
            for (let i = 0; i < t; i += 1)
                e - i <= 0 ? a[i].setAttribute("class", "rating fa fa-star-o") : a[i].setAttribute("class", "rating fa fa-star")
        }
        startTimer() {
            this.stopTimer(),
            this.gameTimerMinutes = 0,
            this.minutesDOMElement.innerText = "00",
            this.gameTimerSeconds = 0,
            this.secondsDOMElement.innerText = "00",
            this.gameTimer = setInterval(this.showNewTime, 1e3, this)
        }
        showNewTime(e) {
            e.gameTimerSeconds += 1,
            e.gameTimerSeconds >= 60 && (e.gameTimerSeconds = 0,
            e.gameTimerMinutes += 1,
            e.minutesDOMElement.innerText = ("0" + e.gameTimerMinutes).slice(-2)),
            e.secondsDOMElement.innerText = ("0" + e.gameTimerSeconds).slice(-2)
        }
        stopTimer() {
            null !== this.gameTimer && (clearInterval(this.gameTimer),
            this.gameTimer = null)
        }
        showWinDialog(e, t, a) {
            document.querySelector(".game-board").setAttribute("style", "display: none"),
            document.querySelector(".win-minutes").innerText = this.gameTimerMinutes,
            document.querySelector(".win-seconds").innerText = this.gameTimerSeconds,
            document.querySelector(".win-moves").innerText = a,
            document.querySelector(".win-stars").innerText = t;
            const i = document.querySelector(".win-button");
            i.gamePlayRef = e,
            i.addEventListener("click", this.setupForNewGame),
            document.querySelector(".win-dialog").setAttribute("style", "display: flex")
        }
        setupForNewGame(e) {
            document.querySelector(".win-dialog").setAttribute("style", "display: none"),
            document.querySelector(".game-board").setAttribute("style", "display: flex"),
            e.target.gamePlayRef.startNewGame()
        }
    }
    ;
    const m = new class {
        constructor() {
            this.templateCardDeck = [{
                symbol: "fa-diamond",
                faceup: !1,
                matched: !1
            }, {
                symbol: "fa-diamond",
                faceup: !1,
                matched: !1
            }, {
                symbol: "fa-paper-plane-o",
                faceup: !1,
                matched: !1
            }, {
                symbol: "fa-paper-plane-o",
                faceup: !1,
                matched: !1
            }, {
                symbol: "fa-anchor",
                faceup: !1,
                matched: !1
            }, {
                symbol: "fa-anchor",
                faceup: !1,
                matched: !1
            }, {
                symbol: "fa-bolt",
                faceup: !1,
                matched: !1
            }, {
                symbol: "fa-bolt",
                faceup: !1,
                matched: !1
            }, {
                symbol: "fa-cube",
                faceup: !1,
                matched: !1
            }, {
                symbol: "fa-cube",
                faceup: !1,
                matched: !1
            }, {
                symbol: "fa-leaf",
                faceup: !1,
                matched: !1
            }, {
                symbol: "fa-leaf",
                faceup: !1,
                matched: !1
            }, {
                symbol: "fa-bicycle",
                faceup: !1,
                matched: !1
            }, {
                symbol: "fa-bicycle",
                faceup: !1,
                matched: !1
            }, {
                symbol: "fa-bomb",
                faceup: !1,
                matched: !1
            }, {
                symbol: "fa-bomb",
                faceup: !1,
                matched: !1
            }]
        }
        isSymbolMatch(e, t, a) {
            return e[t].symbol === e[a].symbol
        }
        shuffle() {
            let e, t, a = this.templateCardDeck, i = a.length;
            for (; 0 !== i; )
                t = Math.floor(Math.random() * i),
                e = a[i -= 1],
                a[i] = a[t],
                a[t] = e;
            return a
        }
    }
      , u = new o
      , l = new c;
    u.setDeck(m),
    u.setGameUI(l),
    u.startNewGame();
    document.querySelector(".deck");
    document.querySelector(".deck").addEventListener("click", e=>{
        u.turn(e.target.getAttribute("id"))
    }
    ),
    document.querySelector(".restart").addEventListener("click", e=>{
        u.startNewGame()
    }
    )
}
, function(e, t, a) {
    e.exports = a(0)
}
]);
