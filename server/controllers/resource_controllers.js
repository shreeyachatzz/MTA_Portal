import Resource from '../models/Resource.js';
import User from '../models/User.js';

export const addSubGrpResource = async (req, res) => {
  try {
    const {subject, link} = req.body;
    const { subgroup } = req.rootUser;

    if (!subject || !link) {
      return res.status(400).json({ error: 'Subject and link cannot be empty' });
    }

    const resource = new Resource({
      subject,
      link,
      subgroup,
    });

    // Save the resource to the database
    await resource.save();

    // Update the user's resourcesGrp array
    await User.findByIdAndUpdate(req.rootUser._id, { $push: { resourcesSubGrp: resource._id } });

    res.status(201).json({ message: 'Resource added successfully to subGrp!', resource });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred while adding the resource' });
  }
};

export const addGrpResource = async (req, res) => {
  try {
    const {subject, link} = req.body;
    const { group } = req.rootUser;

    if (!subject || !link) {
      return res.status(400).json({ error: 'Subject and link cannot be empty' });
    }

    const resource = new Resource({
      subject,
      link,
      group,
    });

    // Save the resource to the database
    await resource.save();

    // Update the user's resourcesGrp array
    await User.findByIdAndUpdate(req.rootUser._id, { $push: { resourcesGrp: resource._id } });

    res.status(201).json({ message: 'Resource added successfully to grp!', resource });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred while adding the resource' });
  }
};


export const viewAllResources = async (req, res) => {
  try {
    const { subgroup, group } = req.rootUser;
    const subgroupString = subgroup.toString();

    // Fetch resources only for the user's subgroup
    const SubGrpResources = await Resource.find({ subgroup : subgroupString });
    const GrpResources = await Resource.find({group});

    const allResources = SubGrpResources.concat(GrpResources);

    res.status(200).json({resources : allResources});
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred while fetching resources' });
  }
};


export const deleteSubGrpResource = async (req, res) => {
  try {
    const { id } = req.params;

    const resource = await Resource.findById(id);

    if (!resource) {
      return res.status(404).json({ error: 'Resource not found' });
    }

    await Resource.findByIdAndRemove(id);

    await User.findByIdAndUpdate(req.rootUser._id, { $pull: { resourcesSubGrp: id } });

    res.status(200).json({ message: 'Resource deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred while deleting the resource' });
  }
};

export const deleteGrpResource = async (req, res) => {
  try {
    const { id } = req.params;

    const resource = await Resource.findById(id);

    if (!resource) {
      return res.status(404).json({ error: 'Resource not found' });
    }

    await Resource.findByIdAndRemove(id);

    await User.findByIdAndUpdate(req.rootUser._id, { $pull: { resourcesGrp: id } });

    res.status(200).json({ message: 'Resource deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred while deleting the resource' });
  }
};


