export default {
  namespaced: true,
  state: {
    commentsForProjects: [],
  },
  getters: {
    commentsForProjects: (state) => state.commentsForProjects,
  },
  mutations: {
    init(state) {
      const comments = localStorage.getItem("comments");
      if (comments) {
        state.commentsForProjects = JSON.parse(comments);
      }
    },
    saveComment(state, commentData) {
      const comments = state.commentsForProjects;
      let currentId;

      comments.forEach((comment) => {
        if (comment.projectId === commentData.projectId) {
          currentId = comment.projectId;
          comment.commentText = commentData.commentText;
          return;
        }
      });

      if (currentId !== commentData.projectId) {
        comments.push(commentData);
      }

      const commentsJson = JSON.stringify(comments);
      localStorage.setItem("comments", commentsJson);
    },
  },
  actions: {
    init(store) {
      store.commit("init");
      // localStorage.removeItem("comments");
    },
    saveComment(store, commentData) {
      store.commit("saveComment", commentData);
    },
  },
};
