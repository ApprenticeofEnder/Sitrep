const Activity = require('./schema/activity');

const setActivity = function(guild, authorName, authorID, messageArr) {
    return new Promise((resolve, reject) => {
        const time = messageArr[1];
        const title = messageArr.slice(2).join(' ');
        const query = {
            ownerID: authorID,
            guild: guild,
        };
        Activity.findOne(query, function(err, result) {
            if (err) {
                reject(err);
                console.log(err);
                return;
            }
            if (!result) {
                console.log('Found no results');
                const newActivity = new Activity({
                    name: title,
                    ownerID: authorID,
                    ownerName: authorName,
                    guild: guild,
                });
                console.log(newActivity);
                newActivity.setDates(time).then(()=>{
                    resolve('Activity successfully created');
                }).catch((err)=>{
                    reject(err);
                });
            }
            else {
                const update = {
                    name: title,
                    ownerName: authorName,
                };
                Activity.findByIdAndUpdate(result._id, update, { new: true }, function(err, activity) {
                    if (err) {
                        reject(err);
                        console.log(err);
                        return;
                    }
                    activity.setDates(time).then(()=>{
                        resolve('Activity successfully updated');
                    }).catch((err)=>{
                        reject(err);
                    });
                });
            }
        });
    });
};

const listActivities = function(guild, authorName = '') {
    return new Promise((resolve, reject) => {
        const query = {
            guild: guild,
            end: {
                $gte: new Date(Date.now()),
            },
        };
        // If the end time hasn't passed, the activity hasn't expired
        // We want to only list non-expired activities
        if (authorName) {
            query.ownerName = { $regex: authorName, $options: 'i' };
        }
        Activity.find(query, function(err, results) {
            if (err) {
                reject(err);
                console.log(err);
                return;
            }
            resolve(results);
        });
    });
};

module.exports = {
    'setup': setActivity,
    'sitrep': listActivities,
};