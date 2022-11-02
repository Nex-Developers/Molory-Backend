"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPreferenceController = exports.getPreferencesController = exports.deletePreferenceController = exports.patchPreferenceController = exports.postPreferenceController = void 0;
const tslib_1 = require("tslib");
const preference_1 = require("../../core/use-cases/preference");
const delete_1 = (0, tslib_1.__importDefault)(require("./delete"));
const get_item_1 = (0, tslib_1.__importDefault)(require("./get-item"));
const get_items_1 = (0, tslib_1.__importDefault)(require("./get-items"));
const patch_1 = (0, tslib_1.__importDefault)(require("./patch"));
const post_1 = (0, tslib_1.__importDefault)(require("./post"));
const postPreferenceController = (0, post_1.default)({ addPreference: preference_1.addPreference });
exports.postPreferenceController = postPreferenceController;
const patchPreferenceController = (0, patch_1.default)({ editPreference: preference_1.editPreference });
exports.patchPreferenceController = patchPreferenceController;
const deletePreferenceController = (0, delete_1.default)({ removePreference: preference_1.removePreference });
exports.deletePreferenceController = deletePreferenceController;
const getPreferencesController = (0, get_items_1.default)({ listPreferences: preference_1.listPreferences });
exports.getPreferencesController = getPreferencesController;
const getPreferenceController = (0, get_item_1.default)({ listPreferenceInfos: preference_1.listPreferenceInfos });
exports.getPreferenceController = getPreferenceController;
//# sourceMappingURL=index.js.map