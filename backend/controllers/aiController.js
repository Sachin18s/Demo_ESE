const axios = require('axios');

exports.shortlistCandidates = async (req, res) => {
  try {
    const { candidates, jobRequirements } = req.body;

    const prompt = `
      Job Requirements:
      Skills: ${jobRequirements.requiredSkills.join(', ')}
      Minimum Experience: ${jobRequirements.minExperience} years

      Candidates:
      ${candidates.map(c => `Name: ${c.name}, Skills: ${c.skills.join(', ')}, Experience: ${c.experience} years, Bio: ${c.bio || 'N/A'}`).join('\n')}

      Analyze the candidates against the job requirements and rank them. 
      For each candidate, explain why they are suitable or not suitable. 
      Suggest the best-fit candidates and provide an improved ranking accuracy.
      Return the output as a structured JSON object with an array of "shortlistedCandidates" containing "name", "explanation", "aiRanking", "aiMatchScore".
    `;

    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: process.env.OPENROUTER_MODEL || 'openai/gpt-4o-mini',
        messages: [{ role: 'user', content: prompt }]
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    let aiData;
    try {
      let content = response.data.choices[0].message.content;
      // Strip out markdown formatting if the model wrapped it in ```json
      content = content.replace(/```json/g, '').replace(/```/g, '').trim();
      aiData = JSON.parse(content);
    } catch (parseError) {
      aiData = { error: "Failed to parse AI response", raw: response.data?.choices?.[0]?.message?.content || "No content" };
    }

    res.json(aiData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'AI processing failed' });
  }
};
