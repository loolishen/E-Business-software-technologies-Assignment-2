class Events {
    /**
     * Create a new event.
     * @constructor
     * @param {string} name - The name of the event.
     * @param {string} description - The description of the event.
     * @param {string} startDateTime - The start date and time of the event.
     * @param {number} durationInMinutes - The duration of the event in minutes.
     * @param {boolean} [isActive=true] - Whether the event is active (default is true).
     * @param {string} [image="defaultImage.jpg"] - The event image URL (default is "defaultImage.jpg" if not provided).
     * @param {number} [capacity=1000] - The event's capacity (default is 1000).
     * @param {number} [ticketsAvailable=capacity] - The number of tickets available (default is equal to capacity).
     * @param {string} categoryId - The ID of the event category.
     */
    constructor(name, description, startDateTime, durationInMinutes, isActive, image, capacity, ticketsAvailable, categoryId) {
        this.id =id; // Generate an actual ID using the IDGenerator function
        this.name = name;
        this.description = description;
        this.startDateTime = startDateTime;
        this.durationInMinutes = durationInMinutes;
        this.isActive = isActive !== undefined ? isActive : true; // Default TRUE
        this.image = image || "defaultImage.jpg"; // Default image if not provided
        this.capacity = capacity !== undefined ? capacity : 1000; // Default capacity
        this.ticketsAvailable = ticketsAvailable !== undefined ? ticketsAvailable : this.capacity; // Default to capacity
        this.categoryId = categoryId;
    }
}

function IDGenerator(){
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = 'E';

    for (let i = 0; i < 2; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters[randomIndex];
    }

    result += '-';

    for (let i = 0; i < 4; i++) {
        const randomDigit = Math.floor(Math.random() * 10);
        result += randomDigit;
    }

    return result;
}

module.exports = Events;
module.exports = {IDGenerator}