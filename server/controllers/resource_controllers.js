import Resource from '../models/Resource.js';
import User from '../models/User.js';

export const addResource = async (req, res) => {
  try {
    const { subject } = req.params;
    const {link} = req.body;
    const { group } = req.rootUser;

    // Create a new resource
    const resource = new Resource({
      subject,
      link,
      group, // Set the group value to the user's group
    });

    // Save the resource to the database
    await resource.save();

    // Update the user's resourcesGrp array
    await User.findByIdAndUpdate(req.rootUser._id, { $push: { resourcesGrp: resource._id } });

    res.status(201).json({ message: 'Resource added successfully!', resource });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred while adding the resource' });
  }
};


export const viewResourcesBySubject = async (req, res) => {
  try {
    const { subject } = req.params;
    const { group } = req.rootUser;

    const resources = await Resource.find({ subject, group });

    res.status(200).json({ resources });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred while fetching resources' });
  }
};


export const deleteResource = async (req, res) => {
  try {
    const { id } = req.params;

    const resource = await Resource.findById(id);

    if (!resource) {
      return res.status(404).json({ error: 'Resource not found' });
    }

    if (resource.group !== req.rootUser.group) {
      return res.status(403).json({ error: 'You are not authorized to delete this resource' });
    }

    await Resource.findByIdAndRemove(id);

    await User.findByIdAndUpdate(req.rootUser._id, { $pull: { resourcesGrp: id } });

    res.status(200).json({ message: 'Resource deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred while deleting the resource' });
  }
};

