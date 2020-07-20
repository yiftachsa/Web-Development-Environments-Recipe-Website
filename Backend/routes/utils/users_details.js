const DButils = require("../../modules/DButils");



async function doesUsernameExists(username) {
    const users = await DButils.execQuery("SELECT username FROM dbo.users");

    if (users.find((x) => x.username === username)) {
        return true;
    }
    return false;
}

async function doesUserExists(user_id) {
    const users = await DButils.execQuery("SELECT user_id FROM dbo.users");
    if (users.find((x) => x.user_id === user_id)) {
        return true;
    }
    return false;
}

async function getUserId(username, password) {
    const user_record = await getUserRecord(username);

    return user_record.user_id;
}

async function getPhotoLink(user_id) {
    return (await DButils.execQuery(`SELECT photoLink FROM dbo.users WHERE user_id = '${user_id}'`))[0];
}

async function getUserRecord(username) {
    return (await DButils.execQuery(`SELECT * FROM dbo.users WHERE username = '${username}'`))[0];
}
async function getUserRecordById(user_id) {
    return (await DButils.execQuery(`SELECT * FROM dbo.users WHERE user_id = '${user_id}'`))[0];
}

async function addUserRecord(params) {
    await DButils.execQuery(`INSERT INTO dbo.users (username,password,firstName,lastName,country,email,photoLink)
     VALUES ('${params.username}', '${params.hash_password}','${params.firstName}','${params.lastName}','${params.country}','${params.email}','${params.photoLink}')`);
}

exports.getUserId = getUserId;
exports.getUserRecord = getUserRecord;
exports.doesUsernameExists = doesUsernameExists;
exports.doesUserExists = doesUserExists;
exports.addUserRecord = addUserRecord;
exports.getUserRecordById = getUserRecordById;
exports.getPhotoLink = getPhotoLink;