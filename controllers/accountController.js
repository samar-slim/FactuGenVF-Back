const Account = require("../models/accountModel");
const User = require("../models/userModel");


// handler for account or accounts deletion 
const deleteAccount = async (req, res) => {
    const { accountIds } = req.data;
    try {
        for (const accountId of accountIds) {
            const account = await Account.findById(accountId);
            if (!account) {
                return res.status(404).json({ success: false, message: "Account not found" });
            }
            const users = await User.find({ account: accountId });
            if (users.length > 0) {
                return res.status(400).json({ success: false, message: "Account has associated users" });
            }
        } 
        return res.status(200).json({ success: true, message: "Account deleted successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

// handler for account or accounts activation
const activateAccount = async (req, res) => {
    const { users = [] } = req.data || {};
    try {
        for (const accountId of users) {
            const account = await Account.findById(accountId);
            if (!account) {
                return res.status(404).json({ success: false, message: "Account not found" });
            }
            account.isActive = true;
            await account.save();
        }
        return res.status(200).json({ success: true, message: "Account activated successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

// handler for account or accounts deactivation
const deactivateAccount = async (req, res) => {
    const { accountIds } = req.data;
    try {
        for (const accountId of accountIds) {
            const account = await Account.findById(accountId);
            if (!account) {
                return res.status(404).json({ success: false, message: "Account not found" });
            }
            account.isActive = false;
            await account.save();
        }
        return res.status(200).json({ success: true, message: "Account deactivated successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};



module.exports = { deleteAccount, activateAccount, deactivateAccount }
