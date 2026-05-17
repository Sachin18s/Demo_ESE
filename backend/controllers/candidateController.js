const Candidate = require('../models/Candidate');

exports.addCandidate = async (req, res) => {
  try {
    const { name, email, skills, experience, bio } = req.body;
    const newCandidate = new Candidate({ name, email, skills, experience, bio });
    await newCandidate.save();
    res.status(201).json(newCandidate);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.getAllCandidates = async (req, res) => {
  try {
    const candidates = await Candidate.find();
    res.json(candidates);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.matchCandidates = async (req, res) => {
  try {
    const { requiredSkills, minExperience } = req.body;
    const candidates = await Candidate.find();

    const matchedCandidates = candidates.map(candidate => {
      // Calculate Skill Match Percentage
      const candidateSkills = candidate.skills.map(s => s.toLowerCase());
      const reqSkills = requiredSkills.map(s => s.toLowerCase());
      
      const matchedSkills = candidateSkills.filter(skill => reqSkills.includes(skill));
      const skillScore = reqSkills.length > 0 ? (matchedSkills.length / reqSkills.length) * 100 : 100;
      
      // Calculate Experience Score
      let expScore = 100;
      if (candidate.experience < minExperience) {
        expScore = (candidate.experience / minExperience) * 100;
      }

      // Total Score
      const matchScore = (skillScore * 0.7) + (expScore * 0.3);

      let rankingLabel = 'Low Match';
      if (matchScore >= 80) rankingLabel = 'High Match';
      else if (matchScore >= 50) rankingLabel = 'Medium Match';

      return {
        ...candidate._doc,
        matchScore: matchScore.toFixed(2),
        matchedSkills,
        rankingLabel
      };
    }).sort((a, b) => b.matchScore - a.matchScore);

    res.json(matchedCandidates);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
