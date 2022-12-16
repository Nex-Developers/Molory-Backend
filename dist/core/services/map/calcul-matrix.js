"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
function makeCalculMatrix({ gmapCalculDistance, latLng } = {}) {
    return ({ departure, arrival }) => tslib_1.__awaiter(this, void 0, void 0, function* () {
        const departureLatLng = { lat: departure.latitude, lng: departure.longitude }, arrivalLatLng = { lat: arrival.latitude, lng: arrival.longitude };
        const res = yield gmapCalculDistance(departureLatLng, arrivalLatLng);
        console.log(res);
        return { distance: Math.round(res.distance.value / 1000), duration: Math.round(res.duration.value / (60 * 60)) };
    });
}
exports.default = makeCalculMatrix;
//# sourceMappingURL=calcul-matrix.js.map