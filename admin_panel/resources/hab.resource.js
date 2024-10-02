const verifyRoles = require("../utils");
const roles = require("../roles");
const { HabAdmin } = require("../../models/habModels/habAdminModel");

let allowedRoles = [roles.SUPERADMIN, roles.MESS];

module.exports = {
    resource: HabAdmin,
    options: {
        listProperties: [
            "opiResponseRecipients", 
            "opiStartDate", 
            "opiEndDate", 
            "messChangeStartDate", 
            "messChangeEndDate", 
            "messChangeLimits"
        ],
        filterProperties: [
            "opiResponseRecipients", 
            "opiStartDate", 
            "opiEndDate", 
            "messChangeStartDate", 
            "messChangeEndDate", 
            "messChangeLimits"
        ],
        editProperties: [
            "opiResponseRecipients", 
            "opiStartDate", 
            "opiEndDate", 
            "messChangeStartDate", 
            "messChangeEndDate", 
            "messChangeLimits"
        ],
        showProperties: [
            "opiResponseRecipients", 
            "opiStartDate", 
            "opiEndDate", 
            "messChangeStartDate", 
            "messChangeEndDate", 
            "messChangeLimits"
        ],
        actions: {
            list: { 
                isAccessible: ({ currentAdmin }) => verifyRoles(currentAdmin, allowedRoles) 
            },
            new: { 
                isAccessible: ({ currentAdmin }) => verifyRoles(currentAdmin, allowedRoles) 
            },
            filter: { 
                isAccessible: ({ currentAdmin }) => verifyRoles(currentAdmin, allowedRoles) 
            },
            edit: { 
                isAccessible: ({ currentAdmin }) => verifyRoles(currentAdmin, allowedRoles) 
            },
            delete: { 
                isAccessible: ({ currentAdmin }) => verifyRoles(currentAdmin, allowedRoles) 
            }
        }
    }
};
