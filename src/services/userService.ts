import { User, NewUser } from "../schemas/userSchemas";
import { loadCollection, findById, getNextId } from "../routes/utils";

export class UserService {
  async getUsers(): Promise<User[]> {
    return loadCollection<User>("users");
  }

  async getUserById(id: number): Promise<User | null> {
    const users = loadCollection<User>("users");
    return findById(users, id) || null;
  }

  async createUser(userData: NewUser): Promise<User> {
    const users = loadCollection<User>("users");
    const newUser: User = {
      id: getNextId(users),
      ...userData
    };
    
    users.push(newUser);
    return newUser;
  }

  async updateUser(id: number, userData: NewUser): Promise<User | null> {
    const users = loadCollection<User>("users");
    const userIndex = users.findIndex(u => u.id === id);
    
    if (userIndex === -1) {
      return null;
    }

    const updatedUser: User = {
      id,
      ...userData
    };
    
    users[userIndex] = updatedUser;
    return updatedUser;
  }

  async deleteUser(id: number): Promise<boolean> {
    const users = loadCollection<User>("users");
    const userIndex = users.findIndex(u => u.id === id);
    
    if (userIndex === -1) {
      return false;
    }

    users.splice(userIndex, 1);
    return true;
  }
}
