const Account = require('../models/accountModel'); 

const adminCheckMiddleware = async (req, res, next) => {
  const { accountId } = req.params;

  if (!accountId) {
    return res.status(400).json({ success: false, message: "Missing account ID" });
  }

  try {
    const account = await Account.findOne({ accountIdentifier: accountId });

    if (!account) {
      return res.status(404).json({ success: false, message: "Account not found" });
    }

    if (account.accountType !== 'admin') {
      return res.status(403).json({ success: false, message: "User is not admin" });
    }

    // If account is admin, proceed to the next middleware or route handler
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

module.exports = adminCheckMiddleware;