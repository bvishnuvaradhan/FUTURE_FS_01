const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const auth = require('../middleware/auth');

const prisma = new PrismaClient();

// @route   GET api/profile
// @desc    Get portfolio owner profile
// @access  Public
router.get('/', async (req, res) => {
  try {
    let profile = await prisma.profile.findFirst();
    
    // If no profile exists, return a default placeholder
    if (!profile) {
      profile = {
        name: 'Your Name',
        email: 'contact@example.com',
        bio: 'A passionate developer.',
        githubPrimary: 'github_username_1',
        githubSecondary: '',
        linkedin: 'linkedin_username',
        codeforces: 'codeforces_username',
        codechef: 'codechef_username',
        leetcode: 'leetcode_username',
        resumeUrl: 'Resume.pdf',
        cgpa: '9.48',
        projectsCount: '10+',
        leetcodeSolved: '450+',
        codechefRating: '1610',
        codechefStars: '3 ★',
        codechefDiv: 'Div 2'
      };
    }
    
    res.json(profile);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT api/profile
// @desc    Update portfolio owner profile
// @access  Private
router.put('/', auth, async (req, res) => {
  try {
    const { 
      name, 
      email, 
      bio, 
      githubPrimary, 
      githubSecondary, 
      linkedin, 
      codeforces, 
      codechef, 
      leetcode, 
      resumeUrl,
      cgpa,
      projectsCount,
      leetcodeSolved,
      codechefRating,
      codechefStars,
      codechefDiv
    } = req.body;

    let profile = await prisma.profile.findFirst();

    if (profile) {
      // Update existing profile
      profile = await prisma.profile.update({
        where: { id: profile.id },
        data: {
          name: name || '',
          email: email || '',
          bio: bio || '',
          githubPrimary: githubPrimary || '',
          githubSecondary: githubSecondary || '',
          linkedin: linkedin || '',
          codeforces: codeforces || '',
          codechef: codechef || '',
          leetcode: leetcode || '',
          resumeUrl: resumeUrl || '',
          cgpa: cgpa || '',
          projectsCount: projectsCount || '',
          leetcodeSolved: leetcodeSolved || '',
          codechefRating: codechefRating || '',
          codechefStars: codechefStars || '',
          codechefDiv: codechefDiv || ''
        }
      });
    } else {
      // Create new profile
      profile = await prisma.profile.create({
        data: {
          name: name || '',
          email: email || '',
          bio: bio || '',
          githubPrimary: githubPrimary || '',
          githubSecondary: githubSecondary || '',
          linkedin: linkedin || '',
          codeforces: codeforces || '',
          codechef: codechef || '',
          leetcode: leetcode || '',
          resumeUrl: resumeUrl || '',
          cgpa: cgpa || '',
          projectsCount: projectsCount || '',
          leetcodeSolved: leetcodeSolved || '',
          codechefRating: codechefRating || '',
          codechefStars: codechefStars || '',
          codechefDiv: codechefDiv || ''
        }
      });
    }

    res.json(profile);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
