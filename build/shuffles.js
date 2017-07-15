var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Shuffles;
(function (Shuffles) {
    var Shuffle = (function () {
        function Shuffle() {
        }
        Shuffle.prototype.shuffle = function (array) {
            array.sortNumbers();
            if (this.k === null) {
                array.shuffle();
            }
            else if (this.k) {
                array.kShuffle(this.k);
            }
            if (this.reversed) {
                array.reverse();
            }
            return array;
        };
        return Shuffle;
    }());
    Shuffles.Shuffle = Shuffle;
    var OrderedShuffle = (function (_super) {
        __extends(OrderedShuffle, _super);
        function OrderedShuffle() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.k = 0;
            _this.reversed = false;
            return _this;
        }
        return OrderedShuffle;
    }(Shuffle));
    Shuffles.OrderedShuffle = OrderedShuffle;
    var RandomShuffle = (function (_super) {
        __extends(RandomShuffle, _super);
        function RandomShuffle() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.k = null;
            _this.reversed = false;
            return _this;
        }
        return RandomShuffle;
    }(Shuffle));
    Shuffles.RandomShuffle = RandomShuffle;
    var K1Shuffle = (function (_super) {
        __extends(K1Shuffle, _super);
        function K1Shuffle() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.k = 1;
            _this.reversed = false;
            return _this;
        }
        return K1Shuffle;
    }(Shuffle));
    Shuffles.K1Shuffle = K1Shuffle;
    var K3Shuffle = (function (_super) {
        __extends(K3Shuffle, _super);
        function K3Shuffle() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.k = 3;
            _this.reversed = false;
            return _this;
        }
        return K3Shuffle;
    }(Shuffle));
    Shuffles.K3Shuffle = K3Shuffle;
    var K5Shuffle = (function (_super) {
        __extends(K5Shuffle, _super);
        function K5Shuffle() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.k = 5;
            _this.reversed = false;
            return _this;
        }
        return K5Shuffle;
    }(Shuffle));
    Shuffles.K5Shuffle = K5Shuffle;
    var K5ReversedShuffle = (function (_super) {
        __extends(K5ReversedShuffle, _super);
        function K5ReversedShuffle() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.k = 5;
            _this.reversed = true;
            return _this;
        }
        return K5ReversedShuffle;
    }(Shuffle));
    Shuffles.K5ReversedShuffle = K5ReversedShuffle;
    var K3ReversedShuffle = (function (_super) {
        __extends(K3ReversedShuffle, _super);
        function K3ReversedShuffle() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.k = 3;
            _this.reversed = true;
            return _this;
        }
        return K3ReversedShuffle;
    }(Shuffle));
    Shuffles.K3ReversedShuffle = K3ReversedShuffle;
    var K1ReversedShuffle = (function (_super) {
        __extends(K1ReversedShuffle, _super);
        function K1ReversedShuffle() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.k = 1;
            _this.reversed = true;
            return _this;
        }
        return K1ReversedShuffle;
    }(Shuffle));
    Shuffles.K1ReversedShuffle = K1ReversedShuffle;
    var ReversedShuffle = (function (_super) {
        __extends(ReversedShuffle, _super);
        function ReversedShuffle() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.k = 0;
            _this.reversed = true;
            return _this;
        }
        return ReversedShuffle;
    }(Shuffle));
    Shuffles.ReversedShuffle = ReversedShuffle;
    Shuffles.ShuffleList = [
        OrderedShuffle,
        K1Shuffle,
        K3Shuffle,
        K5Shuffle,
        RandomShuffle,
        K5ReversedShuffle,
        K3ReversedShuffle,
        K1ReversedShuffle,
        ReversedShuffle
    ];
})(Shuffles || (Shuffles = {}));
