import Deadline from "../models/Deadline.js";
import User from "../models/User.js";


export const postGroupDeadline = async (req, res) => {
    try {
        const { title, date } = req.body;
        const { group } = req.rootUser;

        if (!title || !date) {
            res.status(422).json({ error: "empty fields" });
        }

        const deadline = new Deadline({
            title,
            date,
            group
        });

        await deadline.save();

        await User.findByIdAndUpdate(req.rootUser._id, { $push: { deadlinesGrp: deadline._id } });

        res.status(201).json({ message: 'Deadline posted in the group successfully!', deadline });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while posting the deadline.' });
    }
};

export const postSubGroupDeadline = async (req, res) => {
    try {
        const { title, date } = req.body;
        const { subgroup } = req.rootUser;

        if (!title || !date) {
            res.status(422).json({ error: "empty fields" });
        }

        const deadline = new Deadline({
            title,
            date,
            subgroup
        });

        await deadline.save();

        await User.findByIdAndUpdate(req.rootUser._id, { $push: { deadlinesSubGrp: deadline._id } });

        res.status(201).json({ message: 'Deadline posted in the Sub-group successfully!', deadline });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while posting the deadline.' });
    }
};

export const viewGroupDeadlines = async (req, res) => {
    try {
        const groupDeadlines = await Deadline.find({ group: req.rootUser.group });

        res.status(200).json({ deadlines: groupDeadlines });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while fetching group deadlines' });
    }
};

export const viewSubGroupDeadlines = async (req, res) => {
    try {
        const SubgroupDeadlines = await Deadline.find({ subgroup: req.rootUser.subgroup });

        res.status(200).json({ deadlines: SubgroupDeadlines });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while fetching Subgroup deadlines' });
    }
};

export const deleteGroupDeadlines = async (req, res) => {
    try {
        const { id } = req.params;

        const deadline = await Deadline.findById(id);
        if (!deadline) {
            return res.status(404).json({ error: 'Deadline not found' });
        }

        if (deadline.group !== req.rootUser.group) {
            return res.status(403).json({ error: 'You are not authorized to delete this deadline' });
        }

        await Deadline.findByIdAndRemove(id);

        await User.findByIdAndUpdate(req.rootUser._id, { $pull: { deadlinesGrp: id } });

        res.status(200).json({ message: 'Group deadline deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while deleting the deadline' });
    }
};

export const deleteSubGroupDeadlines = async (req, res) => {
    try {
        const { id } = req.params;

        const deadline = await Deadline.findById(id);
        if (!deadline) {
            return res.status(404).json({ error: 'Deadline not found' });
        }

        if (deadline.subgroup !== req.rootUser.subgroup) {
            return res.status(403).json({ error: 'You are not authorized to delete this deadline' });
        }

        await Deadline.findByIdAndRemove(id);

        await User.findByIdAndUpdate(req.rootUser._id, { $pull: { deadlinesSubGrp: id } });

        res.status(200).json({ message: 'SubGroup deadline deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while deleting the deadline' });
    }
};