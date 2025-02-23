/* eslint-disable no-undef */
import express, { json } from 'express';
import { join } from 'path';
import cors from 'cors';
const app = express();

// Middleware
app.use(cors());
app.use(json());
app.use(express.static(join(process.cwd(), 'dist')));

// API Routes example
app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend is connected!' });
});

// Login route
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Add your validation
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Add your authentication logic here
    // Example:
    // const user = await User.findOne({ email });
    // if (!user || !await bcrypt.compare(password, user.password)) {
    //   return res.status(401).json({ error: 'Invalid credentials' });
    // }

    // For testing purposes
    if (email === "test@example.com" && password === "password123") {
      return res.json({ 
        success: true, 
        user: { id: 1, email, name: 'Test User' },
        token: 'dummy-token'  // In real app, use JWT
      });
    }

    return res.status(401).json({ error: 'Invalid credentials' });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Handle all other routes by serving the index.html
app.get('*', (req, res) => {
  res.sendFile(join(process.cwd(), 'dist', 'index.html'));
});

// Try different ports if 3000 is in use
const startServer = (port) => {
  try {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    }).on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        console.log(`Port ${port} is busy, trying ${port + 1}`);
        startServer(port + 1);
      } else {
        console.error('Server error:', err);
      }
    });
  } catch (err) {
    console.error('Server error:', err);
  }
};

const PORT = process.env.PORT || 3000;
startServer(PORT);
