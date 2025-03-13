const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const csv = require('csv-parser');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

let jobSkills = {};

// Load CSV data into memory
const loadCSVData = () => {
  fs.createReadStream('./data/skills.csv')
    .pipe(csv())
    .on('data', (row) => {
      const jobRole = row.job_role.toLowerCase();
      const skills = row.skills.split(',').map((skill) => skill.trim());
      jobSkills[jobRole] = skills;
    })
    .on('end', () => {
      console.log('CSV file loaded successfully:', jobSkills);
    });
};

loadCSVData(); // Load data on server startup

// API Route to get skills based on job role
app.post('/generate_skills', (req, res) => {
  const { job_role } = req.body;

  if (!job_role) {
    return res.status(400).json({ error: 'Job role is required' });
  }

  const skills = jobSkills[job_role.toLowerCase()] || [];

  if (skills.length === 0) {
    return res.status(404).json({ error: 'No skills found for this job role' });
  }

  res.json({ skills });
});

// Health Check Route
app.get('/', (req, res) => {
  res.send('Server is running...');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
