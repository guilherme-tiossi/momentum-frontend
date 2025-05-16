<template>
  <div class="card">
    <div class="comment-info-container d-flex px-4">
      <div class="profile-avatar me-3 mt-2"></div>
      <div class="d-flex flex-column justify-content-center mt-2">
        <div class="identity-row mb-1">
          <span class="name">{{ name }}</span>
          <span class="username">@{{ username }}</span>
          <span class="created_at">- {{ created_at }}</span>
        </div>
        <div class="comment-text">
          {{ text }}
        </div>
        <div class="engagement-row mt-3">
          <span class="engagement-item">
            <i
              :class="[
                liked_by_user_internal
                  ? 'bi bi-heart-fill liked'
                  : 'bi bi-heart',
              ]"
              @click="like"
            ></i>
            {{ likes_counter_internal }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "../api/http";
export default {
  name: "CommentCard",
  props: {
    id: {
      type: String,
      default: "0",
    },
    pfp: {
      type: String,
      default: "",
    },
    name: {
      type: String,
      default: "name - name surname",
    },
    username: {
      type: String,
      default: "username",
    },
    text: {
      type: String,
      default: "comment text",
    },
    created_at: {
      type: String,
      default: "00/00/0000",
    },
    likes_counter: {
      type: Number,
      default: 0,
    },
    liked_by_user: {
      type: Number,
      default: 0,
    },
    comments: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      liked_by_user_internal: this.liked_by_user,
      likes_counter_internal: this.likes_counter,
    };
  },
  methods: {
    async like() {
      if (!this.liked_by_user_internal) {
        const data = {
          data: {
            type: "likes",
            relationships: {
              comment: {
                data: {
                  type: "comments",
                  id: this.id,
                },
              },
            },
          },
        };
        try {
          await api.post("/api/comment_likes", data);
          this.liked_by_user_internal = true;
          this.likes_counter_internal += 1;
          this.$emit("liked");
        } catch (error) {
          console.error("Like failed:", error);
        }
      } else {
        try {
          await api.patch("/api/unlike_comment", { comment: this.id });
          this.liked_by_user_internal = false;
          this.likes_counter_internal -= 1;
          this.$emit("unliked");
        } catch (error) {
          console.error("Unliked failed:", error);
        }
      }
    },
  },
};
</script>

<style scoped>
.card {
  margin-top: 25px;
  padding-top: 15px;
  padding-bottom: 10px;
  max-width: 640px;
  border-radius: 12px 12px 12px 12px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background: linear-gradient(to top, #e5e5e5, #eeeeee);
}

.card-content {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  text-align: center;
}

.comment-info-container {
  display: flex;
  align-items: flex-start;
}

.profile-avatar {
  width: 50px;
  height: 50px;
  background: #c7c7c7;
  border-radius: 8px;
  flex-shrink: 0;
}

.identity-row {
  display: flex;
  gap: 12px;
  align-items: baseline;
}

.name {
  color: #181818;
  font-weight: bold;
  font-size: 1em;
}

.username {
  color: #858585;
  font-weight: bold;
  font-size: 1em;
  padding-left: 1px;
}

.created_at {
  color: #898989;
  font-weight: normal;
  font-size: 0.98em;
}

.comment-text {
  margin-top: 4px;
  font-size: 1rem;
  color: #444;
}

.engagement-row {
  display: flex;
  gap: 40px;
  align-items: center;
  font-size: 1em;
  color: #606060;
}

.engagement-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-weight: 400;
  margin-right: 10px;
}

.engagement-item i {
  font-size: 1.2em;
  cursor: pointer;
}

.engagement-item i.bi-arrow-repeat {
  font-size: 1.3em;
}

.liked {
  color: rgb(29, 145, 166);
}
</style>
