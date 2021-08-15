function getLink() {
    return `https://discord.com/oauth2/authorize?client_id=${process.env.APP_ID}&scope=bot+applications.commands`;
}

module.exports = {
    getLink: getLink,
};