"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removePreference = exports.listPreferenceInfos = exports.listPreferences = exports.editPreference = exports.addPreference = void 0;
const tslib_1 = require("tslib");
const db_1 = require("../../../db");
const firebase_1 = require("../../services/firebase");
const add_1 = (0, tslib_1.__importDefault)(require("./add"));
const edit_1 = (0, tslib_1.__importDefault)(require("./edit"));
const list_item_infos_1 = (0, tslib_1.__importDefault)(require("./list-item-infos"));
const list_items_1 = (0, tslib_1.__importDefault)(require("./list-items"));
const remove_1 = (0, tslib_1.__importDefault)(require("./remove"));
const preferenceDb = new db_1.PreferenceDb();
const addPreference = (0, add_1.default)({ preferenceDb, saveProfile: firebase_1.saveProfile });
exports.addPreference = addPreference;
const editPreference = (0, edit_1.default)({ preferenceDb });
exports.editPreference = editPreference;
const listPreferences = (0, list_items_1.default)({ preferenceDb });
exports.listPreferences = listPreferences;
const listPreferenceInfos = (0, list_item_infos_1.default)({ preferenceDb });
exports.listPreferenceInfos = listPreferenceInfos;
const removePreference = (0, remove_1.default)({ preferenceDb });
exports.removePreference = removePreference;
//# sourceMappingURL=index.js.map