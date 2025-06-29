const Event = require("../models/event");
const User = require("../models/user");

exports.event = async (req, res) => {
    try {
        const { title, date, description, location } = req.body
        const { _id } = req.user

        const trimmedTitle = title.trim();
        const trimmedDescription = description.trim();
        const trimmedLocation = location.trim();

        // check if all fields are provided
        if (!trimmedTitle || !date || !trimmedDescription || !trimmedLocation) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }

        // check if event date is in the future
        if (new Date(date) < new Date()) {
            return res.status(400).json({
                success: false,
                message: "Event date must be in the future"
            });
        }

        // check if event already exists
        const eventDetails = await Event.findOne({ title: trimmedTitle, creator: _id });

        if (eventDetails) {
            return res.status(400).json({
                success: false,
                message: "Event already exists"
            })
        }

        const newEvent = await Event.create({
            title: trimmedTitle,
            date: new Date(date),
            description: trimmedDescription,
            location: trimmedLocation,
            creator: _id
        })
        // add event to user
        await User.findByIdAndUpdate(_id, {
            $push: { eventsCreated: newEvent._id }
        })

        if (newEvent) {
            return res.status(201).json({
                success: true,
                message: "Event created successfully",
                event: newEvent
            })
        }

    } catch (error) {
        console.log("Error creating event:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })

    }
}

exports.delete = async (req, res) => {
    try {
        const { eventId } = req.body
        const { _id } = req.user

        if (!eventId) {
            return res.status(401).json({
                success: false,
                message: "Event id required"
            })
        }

        const eventDetails = await findById(_id)

    } catch (error) {

    }
}


exports.events = async (req, res) => {
    try {
        const { _id } = req.user;

        // Start of today (00:00:00)
        const startOfToday = new Date();
        startOfToday.setHours(0, 0, 0, 0);

        // Fetch and sort events where date is today or later
        const events = await Event.find({
            date: { $gte: startOfToday }
        })
            .populate("creator", "name email")
            .sort({ date: 1 }); // Sort by date in ascending order

        return res.status(200).json({
            success: true,
            message: "Upcoming events fetched and sorted successfully",
            events
        });
    } catch (error) {
        console.error("Error fetching events:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};


exports.participateInEvent = async (req, res) => {
    try {
        const userId = req.user._id;
        const { eventId } = req.body;

        // Fetch event by ID
        const event = await Event.findById(eventId);

        if (!event) {
            return res.status(404).json({ success: false, message: 'Event not found' });
        }

        // Check if user already participating
        if (event.participants.includes(userId)) {
            return res.status(400).json({ success: false, message: 'User already participating in this event' });
        }

        // Add user to event participants
        event.participants.push(userId);
        await event.save();

        // Also add event to user's joined events if not already added
        const user = await User.findById(userId);
        if (!user.eventsJoined.includes(eventId)) {
            user.eventsJoined.push(eventId);
            await user.save();
        }

        const userUpdatedEvents = await User.findById(userId).populate("eventsJoined");
        const eventUpdatedParticipants = await Event.findById(eventId).populate("participants");

        return res.status(200).json({
            success: true,
            message: 'Successfully joined the event',
            event,
        });

    } catch (error) {
        console.error('Error joining event:', error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

exports.getUserJoinedEvents = async (req, res) => {
    try {
        const userId = req.user._id;

        const user = await User.findById(userId)
            .populate({
                path: "eventsJoined",
                populate: {
                    path: "creator",
                    select: "name",
                }
            });


        return res.status(200).json({
            success: true,
            message: "User joined events fetched successfully",
            events: user.eventsJoined
        });

    } catch (error) {
        console.error("Error fetching user joined events:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};