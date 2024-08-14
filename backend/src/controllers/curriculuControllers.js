import Curriculum from'../models/curriculumModel';


exports.createCurriculum = async (req, res) => {
  try {
    const { code, name, description, timeframes, courses } = req.body;

    
    if (!code || !name || !timeframes) {
      return res.status(400).json({ error: 'Code, name, and timeframes are required' });
    }

    
    const existingCurriculum = await Curriculum.findOne({ code });
    if (existingCurriculum) {
      return res.status(400).json({ error: 'Curriculum with this code already exists' });
    }

    
    const newCurriculum = new Curriculum({ code, name, description, timeframes, courses });
    await newCurriculum.save();

    res.status(201).json({ message: 'Curriculum created successfully', curriculum: newCurriculum });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while creating the curriculum' });
  }
};


exports.getCurriculumByGrade = async (req, res) => {
  try {
    const { grade } = req.params;

    
    if (!grade) {
      return res.status(400).json({ error: 'Grade is required' });
    }

    
    const curriculum = await Curriculum.findOne({ code: new RegExp(`^${grade}`, 'i') });
    if (!curriculum) {
      return res.status(404).json({ error: 'Curriculum not found for this grade' });
    }

    res.status(200).json({ curriculum });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while retrieving the curriculum' });
  }
};


exports.updateCurriculum = async (req, res) => {
  try {
    const { code } = req.params;
    const updates = req.body;

    
    if (!code) {
      return res.status(400).json({ error: 'Curriculum code is required' });
    }

    
    const updatedCurriculum = await Curriculum.findOneAndUpdate({ code }, updates, { new: true });
    if (!updatedCurriculum) {
      return res.status(404).json({ error: 'Curriculum not found' });
    }

    res.status(200).json({ message: 'Curriculum updated successfully', curriculum: updatedCurriculum });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while updating the curriculum' });
  }
};


exports.deleteCurriculum = async (req, res) => {
  try {
    const { code } = req.params;

    
    if (!code) {
      return res.status(400).json({ error: 'Curriculum code is required' });
    }

    
    const deletedCurriculum = await Curriculum.findOneAndDelete({ code });
    if (!deletedCurriculum) {
      return res.status(404).json({ error: 'Curriculum not found' });
    }

    res.status(200).json({ message: 'Curriculum deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while deleting the curriculum' });
  }
};