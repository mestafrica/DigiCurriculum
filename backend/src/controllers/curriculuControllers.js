import curriculumModel from'../models/curriculumModel.js';

export const validateCurriculumData = (data) => {
  const errors = [];
  if (!data.code) errors.push('Code is required');
  if (!data.grade) errors.push('Grade Level is required');
  if (!data.strands) errors.push('Strand is required');
  return errors;
}


export const createCurriculum = async (req, res, next) => {
  try {
    const { code, grade, strands, subStrands } = req.body;

    // Validate required fields
    const validateErrors = validateCurriculumData(req.body);
    if (validateErrors.length > 0) {
      return res.status(400).json({ errors: validateErrors });
    }

    // Check if curriculum exists
    const existingCurriculum = await curriculumModel.findOne({ code });
    if (existingCurriculum) {
      return res.status(400).json({ error: 'Curriculum with this code already exists' });
    }

    // Create new curriculum
    const newCurriculum = new curriculumModel({ 
      code,   
      grade,
      strands,
      subStrands,
      admin: req.auth.id
    });

    await newCurriculum.save();

    res.status(201).json({ message: 'Curriculum created successfully', curriculum: newCurriculum });
  } catch (error) {
    next(error);
  }
}


export const getCurriculumByGrade = async (req, res) => {
  try {
    const { grade } = req.params;

    // Validate grade parameter
    if (!grade) {
      return res.status(400).json({ error: 'Grade is required' });
    }

    // Convert grade to number if it's a string
    const gradeNumber = Number(grade);

    // Validate grade is a valid number
    if (isNaN(gradeNumber)) {
      return res.status(400).json({ error: 'Invalid grade format' });
    }


    // Find curriculums matching the grade level
    const curriculumList = await curriculumModel.find({ 
      grade: gradeNumber  // Changed from gradeNumber to grade
    }).select('-__v');

    // Check if any curriculums found BEFORE sending response
    if (!curriculumList || curriculumList.length === 0) {
      return res.status(404).json({ error: 'No curriculums found for this grade Number' });
    }

    // Only send successful response if curriculums exist
    return res.status(200).json({ 
      message: `Curriculums for grade ${gradeNumber} retrieved successfully`,
      curriculums: curriculumList 
    });

  } catch (error) {
    console.error('Error retrieving curriculum by grade:', error);
    return res.status(500).json({ 
      error: 'An error occurred while retrieving the curriculum',
      details: error.message 
    });
  }
};


export const getAllCurriculums = async (req, res, next) => {
  try {
    const { limit = 10, skip = 0 } = req.query;
    // Retrieve all curriculums, exluding the version key
    const curriculums = await curriculumModel.find({}).select('-__v')
    .limit(parseInt(limit))
    .skip(parseInt(skip));

    const total = await curriculumModel.countDocuments({});


    res.status(200).json({ 
      message: 'Curriculums retrieved successfully',
      curriculums,
      pagination: {
        currentPage: Math.floor(parseInt(skip) / parseInt(limit)) + 1,
        totalPages: Math.ceil(total / parseInt(limit)),
        totalItems: total,
        itemsPerPage: parseInt(limit)
      }
     });
  } catch (error) {
    console.error('Error retrieving curriculums:', error);
    res.status(500).json({ error: 'An error occurred while retrieving curriculums', details: error.message });
  }
}


export const updateCurriculum = async (req, res) => {
  try {
    const { code } = req.params;
    const updates = req.body;

    
    if (!code) {
      return res.status(400).json({ error: 'Curriculum code is required' });
    }

    
    const updatedCurriculum = await curriculumModel.findOneAndUpdate({ code }, updates, { new: true });
    if (!updatedCurriculum) {
      return res.status(404).json({ error: 'Curriculum not found' });
    }

    res.status(200).json({ message: 'Curriculum updated successfully', curriculum: updatedCurriculum });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while updating the curriculum' });
  }
};


export const deleteCurriculum = async (req, res) => {
  try {
    const { code } = req.params;

    
    if (!code) {
      return res.status(400).json({ error: 'Curriculum code is required' });
    }

    
    const deletedCurriculum = await curriculumModel.findOneAndDelete({ code });
    if (!deletedCurriculum) {
      return res.status(404).json({ error: 'Curriculum not found' });
    }

    res.status(200).json({ message: 'Curriculum deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while deleting the curriculum' });
  }
};

export const bulkGetCurriculums = async (req, res) => {
  try {
    const { codes } = req.body;

    if (!Array.isArray(codes)) {
      return res.status(400).json({ error: 'Codes must be an array'})
    }

    const curriculums = await curriculumModel.find({ code: { $in: codes }});

    res.status(200).json({ message: 'Curriculums retrieved successfully', curriculums });

  } catch (error) {
    console.error('Error in bulk get:', error);
    return res.status(500).json({
      error: 'An error occurred while retrieving curriculums',
    })    
  }
}