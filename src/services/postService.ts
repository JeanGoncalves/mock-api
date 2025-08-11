import { PostItem, NewPostItem } from "../schemas/postSchemas";
import { loadCollection, findById, getNextId } from "../routes/utils";

export class PostService {
  async getPosts(): Promise<PostItem[]> {
    return loadCollection<PostItem>("posts");
  }

  async getPostById(id: number): Promise<PostItem | null> {
    const posts = loadCollection<PostItem>("posts");
    return findById(posts, id) || null;
  }

  async createPost(postData: NewPostItem): Promise<PostItem> {
    const posts = loadCollection<PostItem>("posts");
    const newPost: PostItem = {
      id: getNextId(posts),
      ...postData
    };
    
    posts.push(newPost);
    return newPost;
  }

  async updatePost(id: number, postData: NewPostItem): Promise<PostItem | null> {
    const posts = loadCollection<PostItem>("posts");
    const postIndex = posts.findIndex(p => p.id === id);
    
    if (postIndex === -1) {
      return null;
    }

    const updatedPost: PostItem = {
      id,
      ...postData
    };
    
    posts[postIndex] = updatedPost;
    return updatedPost;
  }

  async deletePost(id: number): Promise<boolean> {
    const posts = loadCollection<PostItem>("posts");
    const postIndex = posts.findIndex(p => p.id === id);
    
    if (postIndex === -1) {
      return false;
    }

    posts.splice(postIndex, 1);
    return true;
  }
}
