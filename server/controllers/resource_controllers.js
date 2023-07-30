import Resource from '../models/Resource.js';
import User from '../models/User.js';

export const addResource = async (req, res) => {
  try {
    const { subject, link } = req.body;
    const { group } = req.rootUser;

    // Create a new resource
    const resource = new Resource({
      subject,
      link,
      group, // Set the group value to the user's group
      subgroup, // Set the subgroup value to the user's subgroup
      user: req.rootUser._id, // Associate the resource with the user
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
