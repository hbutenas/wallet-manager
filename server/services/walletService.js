const CustomError = require('../errors');
const { createWallet } = require('../dao/Wallet');
const { getSingleUser } = require('../dao/Users');

/// creates new wallet if user doesn't have one already
const createWalletService = async Request => {
    const { wallet_name } = Request.body;

    const user = await getSingleUser('user_id', Request.user.user_id);

    if (user.length > 0) throw new CustomError.BadRequest('Only one wallet per account is allowed');

    const loweredWalletName = wallet_name.toLowerCase();

    const walletPayload = {
        user_id: Request.user.user_id,
        wallet_name: loweredWalletName
    };

    const wallet = await createWallet(walletPayload);

    if (wallet.length <= 0) throw new CustomError.InternalServer('Something went wrong... Please try again later');
    else return wallet;
};

module.exports = { createWalletService };
