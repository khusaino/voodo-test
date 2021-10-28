<template>
  <div>
    <header class="header">
      <div class="search header__search">
        <div class="search__icon" >
          <img src="./assets/search.svg"  alt="">
        </div>
        <input class="search__field" v-model="search" type="text" placeholder="Filter by author">
      </div>
    </header>
    <section class="publics">
      <div class="container publics__container">
        <ul class="publics__list">
          <li class="publics__item public" v-for="post of filteredPosts" :key="post.id">
            <a href="#" class="public__link">
              <h2 class="public__title">
                {{post.title}}
              </h2>
              <p class="public__text">
                {{post.body}}
              </p>
              <span class="public__author">
                {{post.autor}}
              </span>
            </a>
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>



<script>

import { request } from './api' 

export default {
  name: "App",
  components: {
  },
  data(){
    return {
      posts: [], 
      autors: [],
      search: '',
    }
  },
  watch: {
    autors(value){
      console.log(value)
    }
  },
  created(){
    request('posts').then(data => {
      this.posts = data;
    });
    request('users').then(data => {
      this.autors = data
    });
  },
  computed: {
    createdPostsWithAutors(){
      return  this.posts.map(elem => {
        this.autors.forEach(autor => {
          if(elem.userId === autor.id){
            elem.autor = autor.name
          }
        })
        return elem;
      })
    },
    filteredPosts(){
      return this.createdPostsWithAutors.filter(elem=>elem.autor.toUpperCase().includes(this.search.toUpperCase()));
    },
  },
  methods: {
  }

};
</script>

<style src="./app.less" lang="less">
</style>
