import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const adminSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const Admin = mongoose.model('Admin', adminSchema);

// Seed initial admin (run once)
const seedAdmin = async () => {
  try {
    const existingAdmin = await Admin.findOne({ username: 'admin@gmail.com' });
    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash('admin@123', 10);
      const admin = new Admin({ username: 'admin@gmail.com', password: hashedPassword });
      await admin.save();
      console.log('Admin login successfully');
    }
  } catch (error) {
    console.error('Error seeding admin:', error);
  }
};

seedAdmin();

export default Admin;