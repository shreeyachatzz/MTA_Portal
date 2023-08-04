import Resource from '../models/Resource.js';
import User from '../models/User.js';

export const addResource = async (req, res) => {
  try {
    const {subject, link} = req.body;
    const { subgroup } = req.rootUser;

    // Create a new resource
    const resource = new Resource({
      subject,
      link,
      subgroup,
    });

    // Save the resource to the database
    await resource.save();

    // Update the user's resourcesGrp array
    await User.findByIdAndUpdate(req.rootUser._id, { $push: { resourcesSubGrp: resource._id } });

    res.status(201).json({ message: 'Resource added successfully!', resource });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred while adding the resource' });
  }
};


export const viewAllResources = async (req, res) => {
  try {
    const { subgroup } = req.rootUser;

    // Fetch resources only for the user's subgroup
    const resources = await Resource.find({ subgroup });

    res.status(200).json(resources);
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

    if (resource.subgroup !== req.rootUser.subgroup) {
      return res.status(403).json({ error: 'You are not authorized to delete this resource' });
    }

    await Resource.findByIdAndRemove(id);

    await User.findByIdAndUpdate(req.rootUser._id, { $pull: { resourcesSubGrp: id } });

    res.status(200).json({ message: 'Resource deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred while deleting the resource' });
  }
};


