import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"


class PostsService {
  async getPosts() {
    const res = await api.get('api/posts')
    logger.log(res.data)
    AppState.posts = res.data.posts
    AppState.nextPage = res.data.older
    AppState.previousPage = res.data.newer
  }

  async getProfilePosts(profileId) {
    const res = await api.get(`api/posts?creatorId=${profileId}`)
    logger.log('-getProfilePosts', res.data)
    AppState.posts = res.data.posts
  }

  async searchPosts(query = '') {
    AppState.query = query
    logger.log('searching', query)
    const res = await api.get(`api/posts?${query}`)
    logger.log('-searchPosts', res.data)
    AppState.posts = res.data.posts
  }

  async createPost(postsData) {
    const res = await api.post('api/posts', postsData)
    logger.log('-createPost-', res.data)
    AppState.posts.push(res.data.posts)
  }

  async deletePost(id) {
    const res = await api.delete('api/posts/' + id)
    logger.log('-deletePost-', res.data)
    AppState.posts = AppState.posts.filter(p => p.id != id)
  }

  async changePage(url) {
    const res = await api.get(url)
    logger.log(res.data)
    AppState.posts = res.data.posts
    AppState.nextPage = res.data.older
    AppState.previousPage = res.data.newer
  }

}

export const postsService = new PostsService()