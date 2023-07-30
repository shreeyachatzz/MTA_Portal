import Exam from "../models/Exam.js";
import User from "../models/User.js";


export const postGroupExam = async (req, res) => {
    try {
        const { title, date } = req.body;
        const { group } = req.rootUser;

        if (!title || !date) {
            res.status(422).json({ error: "empty fields" });
        }
        const examDate = new Exam({
            title,
            date,
            group,
        });

        await examDate.save();

        await User.findByIdAndUpdate(req.rootUser._id, { $push: { examsGrp: examDate._id } });

        res.status(201).json({ message: 'Exam date posted in the group successfully!', examDate });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while posting the exam date.' });
    }
};

export const postSubGroupExam = async (req, res) => {
    try {
        const { title, date } = req.body;
        const { subgroup } = req.rootUser;

        if (!title || !date) {
            res.status(422).json({ error: "empty fields" });
        }
        const examDate = new Exam({
            title,
            date,
            subgroup,
        });

        await examDate.save();

        await User.findByIdAndUpdate(req.rootUser._id, { $push: { examsSubGrp: examDate._id } });

        res.status(201).json({ message: 'Exam date posted in the subgroup successfully!', examDate });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while posting the exam date.' });
    }
};

export const viewGroupExamDates = async (req, res) => {
    try {
        const groupExams = await Exam.find({ group: req.rootUser.group });

        res.status(200).json({ exams: groupExams });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while fetching group exam dates' });
    }
};


export const viewSubGroupExamDates = async (req, res) => {
    try {
        const subgroupExams = await Exam.find({ subgroup: req.rootUser.subgroup });

        res.status(200).json({ exams: subgroupExams });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while fetching group exam dates' });
    }
};

export const deleteGroupExam = async (req, res) => {
    try {
      const { id } = req.params;
  
      const exam = await Exam.findById(id);
      if (!exam) {
        return res.status(404).json({ error: 'Exam not found' });
      }

      if (exam.group !== req.rootUser.group) {
        return res.status(403).json({ error: 'You are not authorized to delete this exam date' });
      }
  
      await Exam.findByIdAndRemove(id);
  
      await User.findByIdAndUpdate(req.rootUser._id, { $pull: {examsGrp : id } });
  
      res.status(200).json({ message: 'Group exam deleted successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'An error occurred while deleting the exam' });
    }
  };

  export const deleteSubGroupExam = async (req, res) => {
    try {
      const { id } = req.params;
  
      const exam = await Exam.findById(id);
      if (!exam) {
        return res.status(404).json({ error: 'Exam not found' });
      }

      if (exam.subgroup !== req.rootUser.subgroup) {
        return res.status(403).json({ error: 'You are not authorized to delete this exam date' });
      }
  
      await Exam.findByIdAndRemove(id);
  
      await User.findByIdAndUpdate(req.rootUser._id, { $pull: {examsSubGrp : id } });
  
      res.status(200).json({ message: 'SubGroup exam deleted successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'An error occurred while deleting the exam' });
    }
  };