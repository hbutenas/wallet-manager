const CustomError = require('../errors');
const { createWallet, getWallet, updateWallet, deleteWallet } = require('../dao/Wallet');

/**
 * creates new wallet if user doesn't have one already
 * checks for already existing wallet by user_id */
const createWalletService = async Request => {
    const { wallet_name } = Request.body;
    const { user_id } = Request.user;

    const existingWallet = await getWallet('user_id', user_id);

    if (existingWallet.length > 0) throw new CustomError.BadRequest('Only one wallet per account is allowed');

    const loweredWalletName = wallet_name.toLowerCase();

    const walletPayload = {
        user_id,
        wallet_name: loweredWalletName
    };

    const wallet = await createWallet(walletPayload);

    if (wallet.length <= 0) throw new CustomError.InternalServer('Something went wrong... Please try again later');

    return wallet;
};

/**
 * returns wallet if one exists
 * finds the wallet by user_id and returns it
 * */
const getWalletService = async reqUser => {
    const { user_id } = reqUser;

    const wallet = await getWallet('user_id', user_id);

    if (wallet.length <= 0) throw new CustomError.BadRequest('Wallet does not exists. Create new one first');

    return wallet;
};

/**
 * returns updated wallet
 * finds existing wallet by wallet_id, checks is the actual owner made the request and updates it  */
const updateWalletService = async Request => {
    const { wallet_name } = Request.body;
    const { user_id } = Request.user;

    // update wallet name
    const updatedWallet = await updateWallet('user_id', user_id, { wallet_name });

    if (updatedWallet.length <= 0) return CustomError.InternalServer('Something went wrong... Please try again later');

    return updatedWallet;
};

/**
 * returns true or false after deleting the wallet
 * finds existing wallet by wallet_id checks is the actual owner made the request and deletes it */
const deleteWalletService = async Request => {
    const { user_id } = Request.user;

    // delete existing wallet
    const deletedWallet = await deleteWallet('user_id', user_id);

    if (!deletedWallet) return CustomError.InternalServer('Something went wrong... Please try again later');

    return { message: 'Wallet successfully deleted' };
};

module.exports = { createWalletService, getWalletService, updateWalletService, deleteWalletService };