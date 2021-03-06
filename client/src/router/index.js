import Vue from 'vue'
import Router from 'vue-router'
import Posts from '@/components/Posts'
import HelloWorld from '@/components/HelloWorld'
import SearchMovies from '@/components/SearchMovies'
import LexBot from '@/components/LexBot'
import MovieDetails from '@/components/MovieDetails'
import Profile from '@/components/Profile'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: HelloWorld
    },
    {
      path: '/posts',
      name: 'Posts',
      component: Posts
    },
    {
      path: '/search',
      name: 'Search',
      component: SearchMovies
    },
    {
      path: '/lex',
      name: 'lex',
      component: LexBot
    },
    {
      path: '/movie-details',
      name: 'movie-details',
      component: MovieDetails
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile
    }
  ]
})
