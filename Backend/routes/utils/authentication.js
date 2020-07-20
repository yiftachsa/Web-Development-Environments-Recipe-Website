const bcrypt = require("bcrypt");
const users_details_module = require("./users_details");


async function encryptPassword(password) {
    return await bcrypt.hashSync(
        password,
        parseInt(process.env.bcrypt_saltRounds)
    );
}

async function authenticatePassword(username, password) {
    const user_record = await users_details_module.getUserRecord(username);


    if (!bcrypt.compareSync(password, user_record.password)) {
        throw { status: 401, message: "Authentication failed" };
    }
}




exports.encryptPassword = encryptPassword;
exports.authenticatePassword = authenticatePassword;

