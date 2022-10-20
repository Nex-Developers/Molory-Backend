"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const environment_1 = require("../../configs/environment");
const google_maps_services_js_1 = require("@googlemaps/google-maps-services-js");
class GoogleMap {
    static calculMatrix(origin, destination) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const request = {
                params: {
                    origins: [origin],
                    destinations: [destination],
                    mode: google_maps_services_js_1.TravelMode.driving,
                    language: 'fr-FR',
                    units: google_maps_services_js_1.UnitSystem.metric,
                    key: environment_1.env.google.apiKey
                }
            };
            const res = yield GoogleMap.client.distancematrix(request);
            return res.data.rows[0].elements[0];
        });
    }
}
exports.default = GoogleMap;
GoogleMap.client = new google_maps_services_js_1.Client({});
//# sourceMappingURL=google-map.js.map