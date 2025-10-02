const { getDB } = require('../../utils/db');
const bcrypt = require('bcrypt');

class User {
  static getCollection() {
    return getDB().collection('users');
  }

  static async findByEmail(email) {
    return await this.getCollection().findOne({ email });
  }

  static async findByUsername(username) {
    return await this.getCollection().findOne({ username });
  }

  static async findById(id) {
    return await this.getCollection().findOne({ _id: id });
  }

  static async create(userData) {
    const { username, email, password, role = 'user' } = userData;
    
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    const user = {
      username,
      email,
      password: hashedPassword,
      role,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    const result = await this.getCollection().insertOne(user);
    return { ...user, _id: result.insertedId };
  }

  static async comparePassword(candidatePassword, hashedPassword) {
    return await bcrypt.compare(candidatePassword, hashedPassword);
  }

  static async updateUser(id, updateData) {
    if (updateData.updatedAt === undefined) {
      updateData.updatedAt = new Date();
    }
    
    if (updateData.password) {
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(updateData.password, salt);
    }
    
    const result = await this.getCollection().findOneAndUpdate(
      { _id: id },
      { $set: updateData },
      { returnDocument: 'after' }
    );
    
    return result.value;
  }

  static async deleteUser(id) {
    return await this.getCollection().deleteOne({ _id: id });
  }
}

module.exports = User;
