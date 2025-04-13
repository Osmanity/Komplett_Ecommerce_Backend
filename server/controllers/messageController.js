const validateMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({ 
        message: "All fields (name, email, message) are required" 
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        message: "Invalid email format" 
      });
    }

    // If validation passes
    res.status(200).json({ 
      message: "Message sent successfully" 
    });
    
  } catch (error) {
    console.error("Error processing message:", error);
    res.status(500).json({ 
      message: "Error processing message" 
    });
  }
};

module.exports = {
  validateMessage
}; 