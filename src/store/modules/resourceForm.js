import { database, firebaseAuth } from '~/firebase/constants'
import router from '~/router/router'

const resourceForm = {
  state: {
    submitted: false,
    key: '' 
  },
  mutations: {
    submitted (state) {
      state.submitted = true
    },
    saveKeyRef (state, resourceId) {
      state.key = resourceId.resourceId
    },
    clearKeyRef (state) {
      state.key = ''
    }
  },
  actions: {
    storeResource (context, resourceData) {
      const resource = {
        resourceId: resourceData.resourceId,
        title: resourceData.title,
        url: resourceData.url,
        mediaType: resourceData.mediaType,
        focus: resourceData.focus,
        description: resourceData.desc,
        timesPassed: resourceData.timesPassed,
        authorName: resourceData.authorName,
        authorImage: resourceData.authorImage,
        authorId: resourceData.authorId
      }
         
      const user = firebaseAuth.currentUser;   
      const updates = {};
            
      updates['/resources/' + resource.resourceId] = resource;
      updates['/users/' + user.uid + '/createdResources/' + resource.resourceId] = resource;
  
      context.commit('submitted');
            
      database.ref().update(updates);
            
      router.push({ path: '/create' });
    }
  },
  getters: {
    
  }
}

export default resourceForm