import Announcement from '../models/Announcement.js';
import User from '../models/User.js';

export const postGroupAnnouncement = async (req, res) => {
    try {
        const { title, description } = req.body;
        const { group } = req.rootUser;

        const announcement = new Announcement({
            title,
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
        const { title, description } = req.body;
        const { subgroup } = req.rootUser;

        const announcement = new Announcement({
            title,
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
  
      if (announcement.subgroup !== req.rootUser.subgroup) {
        return res.status(403).json({ error: 'You are not authorized to delete this announcement' });
      }
  
      await Announcement.findByIdAndRemove(id);

      await User.findByIdAndUpdate(req.rootUser._id, { $pull: { announcementsSubGrp: id } });
  
      res.status(200).json({ message: 'Subgroup announcement deleted successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'An error occurred while deleting the announcement' });
    }
  };
