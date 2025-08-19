import Admin from '../models/AdminModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'; // Install with `npm install jsonwebtoken`

export const loginAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const admin = await Admin.findOne({ username: 'admin@gmail.com' });
    if (!admin || !(await bcrypt.compare(password, admin.password))) {
      return res.status(401).json({ message: 'Invalid admin credentials' });
    }
    const token = jwt.sign({ id: admin._id, role: 'admin' }, 'your_jwt_secret', { expiresIn: '1h' }); // Replace 'your_jwt_secret' with a secure key
    res.status(200).json({ message: 'Admin login successful!', token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};