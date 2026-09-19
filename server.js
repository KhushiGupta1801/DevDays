require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '.')));

// Advanced corporate translation function
function translateToCorporateSpeak(casualDescription) {
  const actionVerbs = [
    'Architected',
    'Orchestrated',
    'Spearheaded',
    'Leveraged',
    'Synergized',
    'Engineered',
    'Championed',
    'Catalyzed',
    'Optimized',
    'Implemented',
    'Revolutionized',
    'Streamlined',
    'Transformed',
    'Innovated'
  ];

  const techBuzzwords = [
    'cutting-edge technologies',
    'cloud-native architecture',
    'microservices paradigm',
    'scalable infrastructure',
    'distributed systems',
    'RESTful APIs',
    'DevOps practices',
    'CI/CD pipelines',
    'containerized solutions',
    'enterprise-grade systems',
    'industry best practices',
    'next-generation stack'
  ];

  const impactBuzzwords = [
    'resulting in improved performance and user experience',
    'driving significant business value and market differentiation',
    'enabling seamless cross-functional collaboration',
    'achieving 99.9% uptime and reliability',
    'reducing technical debt and operational overhead',
    'enhancing system resilience and fault tolerance',
    'maximizing ROI and operational efficiency',
    'accelerating time-to-market and deployment velocity'
  ];

  const technicalBuzzwords = [
    'employing SOLID principles and design patterns',
    'implementing comprehensive error handling and logging',
    'ensuring thread-safe and concurrent execution',
    'maintaining code quality through rigorous testing frameworks',
    'following TDD and agile methodologies',
    'optimizing database queries and algorithmic complexity',
    'establishing robust monitoring and observability solutions',
    'adhering to security best practices and compliance standards'
  ];

  // Parse input to extract key technologies and activities
  const lowerInput = casualDescription.toLowerCase();
  const keywords = casualDescription.match(/\b[a-z]+(?:\s+[a-z]+)?\b/gi) || [];

  // Generate 1-2 bullet points
  const bulletCount = Math.random() > 0.5 ? 2 : 1;
  const bullets = [];

  for (let i = 0; i < bulletCount; i++) {
    const randomAction = actionVerbs[Math.floor(Math.random() * actionVerbs.length)];
    const randomTech = techBuzzwords[Math.floor(Math.random() * techBuzzwords.length)];
    const randomImpact = impactBuzzwords[Math.floor(Math.random() * impactBuzzwords.length)];
    const randomTechnical = technicalBuzzwords[Math.floor(Math.random() * technicalBuzzwords.length)];

    // Extract some keywords from the input
    const relevantKeywords = keywords
      .filter(k => k.length > 3)
      .slice(i * 2, (i + 1) * 2)
      .join(', ');

    const bullet = `${randomAction} ${relevantKeywords || 'full-stack solutions'} utilizing ${randomTech}, ${randomTechnical.toLowerCase()}, ${randomImpact.toLowerCase()}.`;

    bullets.push('• ' + bullet.charAt(0).toUpperCase() + bullet.slice(1));
  }

  return bullets.join('\n');
}

// API Routes
app.post('/translate', (req, res) => {
  try {
    const { casualText } = req.body;

    if (!casualText || casualText.trim() === '') {
      return res.status(400).json({ error: 'Please provide text to translate' });
    }

    const corporateText = translateToCorporateSpeak(casualText);
    res.json({ corporateText });
  } catch (error) {
    res.status(500).json({ error: 'Translation failed. Please try again.' });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'The Resume Dev-Translator is running!' });
});

app.listen(PORT, () => {
  console.log(`🚀 Resume Dev-Translator server running on http://localhost:${PORT}`);
  console.log(`📝 Try POST to http://localhost:${PORT}/translate with your text!`);
});
