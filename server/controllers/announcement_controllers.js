import Announcement from '../models/Announcement.js';
import User from '../models/User.js';
import moment from 'moment-timezone';

export const postGroupAnnouncement = async (req, res) => {
  try {
    const { description } = req.body;
    const { group } = req.rootUser;

    const date = moment.tz('Asia/Kolkata').format('DD/MM/YYYY hh:mm A');
    if (!description) {
      res.status(422).json({ error: "empty fields" });
    }
    const announcement = new Announcement({
      date,
      description,
      group,
    });

    await announcement.save();

    await User.findByIdAndUpdate(req.rootUser._id, { $push: { announcementsGrp: announcement._id } });

    res.status(201).json({ message: 'Announcement posted in the group successfully!', announcement });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred while posting the announcement.' });
  }
};

export const postSubgroupAnnouncement = async (req, res) => {
  try {
    const { description } = req.body;
    const { subgroup } = req.rootUser;

    const date = moment.tz('Asia/Kolkata').format('DD/MM/YYYY hh:mm A');
    if (!description) {
      res.status(422).json({ error: "empty fields" });
    }


    const announcement = new Announcement({
      date,
      description,
      subgroup,
    });

    await announcement.save();

    await User.findByIdAndUpdate(req.rootUser._id, { $push: { announcementsSubGrp: announcement._id } });

    res.status(201).json({ message: 'Announcement posted in the subgroup successfully!', announcement });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred while posting the announcement.' });
  }
};


export const viewGroupAnnouncements = async (req, res) => {
  try {
    const groupAnnouncements = await Announcement.find({ group: req.rootUser.group });

    res.status(200).json({ announcements: groupAnnouncements });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred while fetching group announcements' });
  }
};


export const viewSubgroupAnnouncements = async (req, res) => {
  try {
    const subgroupAnnouncements = await Announcement.find({ subgroup: req.rootUser.subgroup });

    res.status(200).json({ announcements: subgroupAnnouncements });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred while fetching subgroup announcements' });
  }
};


export const deleteGroupAnnouncement = async (req, res) => {
  try {
    const { id } = req.params;

    const announcement = await Announcement.findById(id);
    if (!announcement) {
      return res.status(404).json({ error: 'Announcement not found' });
    }

    if (announcement.group !== req.rootUser.group) {
      return res.status(403).json({ error: 'You are not authorized to delete this announcement' });
    }

    await Announcement.findByIdAndRemove(id);

    await User.findByIdAndUpdate(req.rootUser._id, { $pull: { announcementsGrp: id } });

    res.status(200).json({ message: 'Group announcement deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred while deleting the announcement' });
  }
};



export const deleteSubgroupAnnouncement = async (req, res) => {
  try {
    const { id } = req.params;

    const announcement = await Announcement.findById(id);
    if (!announcement) {
      return res.status(404).json({ error: 'Announcement not found' });
    }

    await Announcement.findByIdAndRemove(id);

    await User.findByIdAndUpdate(req.rootUser._id, { $pull: { announcementsSubGrp: id } });

    res.status(200).json({ message: 'Subgroup announcement deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred while deleting the announcement' });
  }
};

export const viewAllAnnouncements = async (req, res) => {
  try {
    const { subgroup, group } = req.rootUser;
    const subgroupString = subgroup.toString();

    // Find announcements for the subgroup and group of the user
    const subgroupAnnouncements = await Announcement.find({ subgroup : subgroupString });
    const groupAnnouncements = await Announcement.find({ group });

    const allAnnouncements = subgroupAnnouncements.concat(groupAnnouncements);

    res.status(200).json({announcements : allAnnouncements});
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred while fetching announcements' });
  }
};
