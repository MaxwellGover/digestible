<template>

<div class="card">

  <header class="card-header">
    <img id="authorImage" :src="resource.authorImage" alt="author image">
    <p class="card-header-title" @click="goToProfile">
      {{resource.authorName}}
    </p>
    <a id="completedContainer" :href="resource.linkToCompleted" target="_blank">
      <p id="completedText">VIEW PROJECT</p>
      <i id="link" class="fa fa-link" aria-hidden="true"></i>
    </a>
  </header>
  <div class="card-content">
    <p id="title">{{resource.title}}</p>
    <p id="description">{{resource.description}}</p>
    <div id="topics">
      <div id="tags">
        <p style="color: black">What you'll learn: </p><a id="tag" v-for="(tag, index) in resource.tags">{{tag}}</a>
      </div>
    </div>
    <router-link :to="/resource/ + this.resource.resourceId" class="button" id="learnBtn">Start learning</router-link>
  </div>
  <footer class="card-footer">
    <div id="timesPassedContainer">
      <i class="fa fa-check" aria-hidden="true"></i>
      <p id="timesPassed">{{resource.timesPassed}}</p>
    </div>
    <div>
      <a id="focus">{{resource.focus}}</a>
      <a id="mediaType">{{resource.mediaType}}</a>
      <i id="bookmarkFilled" class="fa fa-bookmark" aria-hidden="true" v-if="bookmarked"></i>
      <i id="bookmarkOutline" class="fa fa-bookmark-o" aria-hidden="true" @click="bookmarkResource" v-else></i>
    </div>
  </footer>

</div>

</template>

<script>
import { firebaseAuth, database } from '~/firebase/constants'
import router from '~/router/router'

export default {
  name: 'ResourceCard',
  props: ['resource'],
  data () {
    return {
      bookmarked: false
    }
  },
  methods: {
    bookmarkResource () {
      const user = firebaseAuth.currentUser;
      this.bookmarked = true;
      database.ref('/users/' + user.uid + '/savedResources/' + this.resource.resourceId).set({
          resourceId: this.resource.resourceId,
          authorId: this.resource.authorId,
          authorImage: this.resource.authorImage,
          authorName: this.resource.authorName,
          description: this.resource.description,
          focus: this.resource.focus,
          mediaType: this.resource.mediaType,
          tags: this.resource.tags,
          timesPassed: this.resource.timesPassed,
          title: this.resource.title,
          url: this.resource.url
      })
    },
    goToProfile () {
      router.push({ path: '/profile/' + this.resource.authorId })
    }
  }
}

</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Noto+Sans:700');
@import url('https://fonts.googleapis.com/css?family=Roboto:500');

.card {
  width: 100%;
  margin-bottom: 20px
}

#authorImage {
  height: 40px;
  width: 40px;
  border-radius: 50%
}

#completedText {
  font-family: 'Roboto', sans-serif;
  color: #000;
  margin-right: 10px 
}

#title {
  font-size: 28px;
  font-family: 'Noto Sans', sans-serif;
}

#topics {
  margin-top: 20px;
}

#timesPassed {
  margin-left: 10px
}

#learnBtn {
  margin-top: 20px;
  padding: 10px;
  font-family: 'Roboto', sans-serif;
  background-color: #ff3860;
  color: #fff;
  box-shadow: none;
  border-radius: 2px;
  border-color: #ff3860;
}

#timesPassedContainer {
  display: flex
}

#tags {
  display: flex;
  color: #ff3860;
}

#mediaType {
  margin-left: 5px;
  color: #ff3860;
}

#focus {
  color: #ff3860;
}

#bookmarkOutline {
  margin-left: 30px;
  margin-right: 10px;
  color: #ff3860;
  cursor: pointer;
}

#bookmarkFilled {
  margin-left: 30px;
  margin-right: 10px;
  color: #ff3860;
  cursor: pointer;
}

#description {
  font-size: 16px;
  color: #8f8f8f;
}

#tag {
  margin-right: 2px;
  margin-left: 5px;
  color: #ff3860;
}

#resourceBtn {
  margin-top: 20px;
  padding: 10px;
  font-family: 'Roboto', sans-serif;
  background-color: #23d160;
  color: #fff;
  box-shadow: none;
  border-radius: 2px;
  border-color: #23d160;
}

.card-header {
  display: flex;
  align-items: center;
  padding: 10px;
  background-color: #75fab4
}

.card-header-title {
  cursor: pointer;
  color: #000;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
}

.card-content {

}

.fa {
  color: #23d160;
}

#external {
  color: #000
}

#authorName {
  cursor: pointer;
}

#link {
  color: #000;
  margin-right: 5px
}

#completedContainer {
  display: flex;
}


</style>