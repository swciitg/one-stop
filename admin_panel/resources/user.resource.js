const user = require("../../models/userModel");
const verifyRoles = require("../utils");
const roles = require("../roles");

let allowedRoles = [roles.SUPERADMIN,roles.ONESTOPUSER];

module.exports = {
    resource: user,
    options: {
        listProperties: ["name", "outlookEmail","altEmail","rollNo","dob","gender","hostel","roomNo","blocked","notifPref","homeAddress","phoneNumber","emergencyPhoneNumber","linkedin","subscribedMess"],
        filterProperties: ["name", "outlookEmail","altEmail","rollNo","dob","gender","hostel","roomNo","blocked","notifPref","homeAddress","phoneNumber","emergencyPhoneNumber","linkedin","subscribedMess"],
        editProperties: ["name", "outlookEmail","altEmail","rollNo","dob","gender","hostel","roomNo","blocked","notifPref","homeAddress","phoneNumber","emergencyPhoneNumber","linkedin","subscribedMess"],
        showProperties: ["name", "outlookEmail","altEmail","rollNo","dob","gender","hostel","roomNo","blocked","notifPref","homeAddress","phoneNumber","emergencyPhoneNumber","linkedin","subscribedMess"],
        actions: {
            list: { isAccessible: ({ currentAdmin }) => verifyRoles(currentAdmin, allowedRoles) },
            new: { isAccessible: ({ currentAdmin }) => verifyRoles(currentAdmin, allowedRoles) },
            filter: { isAccessible: ({ currentAdmin }) => verifyRoles(currentAdmin, allowedRoles) },
            edit: { isAccessible: ({ currentAdmin }) => verifyRoles(currentAdmin, allowedRoles) },
            delete: { isAccessible: ({ currentAdmin }) => verifyRoles(currentAdmin, allowedRoles) },
        },
    },
};