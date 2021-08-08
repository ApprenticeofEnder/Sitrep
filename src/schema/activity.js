const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const activitySchema = Schema({
    name: {
        type: String,
        required: [true, 'Activity name not supplied'],
    },
    ownerID: {
        type: String,
        required: [true, 'Activity owner ID not supplied'],
    },
    ownerName: {
        type: String,
        required: [true, 'Activity owner name not supplied'],
    },
    guild: {
        type: String,
        required: [true, 'Activity guild not supplied'],
    },
    start: {
        type: Date,
    },
    end: {
        type: Date,
    },
});

const parseTime = function(time) {
    const timeRegex = /(\d+):([0-5]\d)/;
    const timeMatch = timeRegex[Symbol.match](time);
    if (!timeMatch) {
        return null;
    }
    return timeMatch.slice(1, 3);
};

/**
 * Sets the dates for a Sitrep object
 * @param {array} time A time string, formatted HH:MM
 * @returns {array} Start and end times, or null on fail
 */
activitySchema.methods.setDates = function(time) {
    return new Promise((resolve, reject) => {
        const timeArr = parseTime(time);
        if(!timeArr) {
            reject('Invalid time specified');
            return;
        }
        const start = new Date(Date.now());
        const end = new Date();
        const hours = parseInt(timeArr[0]);
        const minutes = parseInt(timeArr[1]);
        end.setHours(start.getHours() + hours);
        end.setMinutes(start.getMinutes() + minutes);
        this.start = start;
        this.end = end;
        this.save().catch((err)=>{
            reject(err);
            return;
        });
        resolve([this.start, this.end]);
    });
};

const Activity = mongoose.model('Activity', activitySchema);

module.exports = Activity;