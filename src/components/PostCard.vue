<template>
  <div class="card" :class="{ 'unreposted-padding': !reposted_internal }">
    <div v-if="reposted_internal" class="card-tab">
      <span class="card-tab-text"> Reposted</span>
    </div>
    <div
      class="post-info-container d-flex px-4"
      :class="{ 'reposted-padding': reposted }"
    >
      <div class="profile-avatar me-3 mt-2"></div>
      <div class="d-flex flex-column justify-content-center mt-2">
        <div class="identity-row mb-1">
          <span class="name">{{ name }}</span>
          <span class="username">@{{ username }}</span>
          <span class="created_at">- {{ created_at }}</span>
        </div>
        <div class="post-text">
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
            {{ likes_internal }}
          </span>
          <span class="engagement-item">
            <i
              :class="
                reposted_by_user_internal
                  ? 'bi bi-arrow-repeat reposted'
                  : 'bi bi-arrow-repeat'
              "
              @click="repost"
            ></i>
            {{ reposts_internal }}
          </span>
          <span class="engagement-item">
            <i class="bi bi-chat"></i> {{ comments }}
          </span>
        </div>
      </div>
    </div>
    <div class="card-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import api from "../api/http";
export default {
  name: "PostCard",
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
      default:
        "post text post text post post text post text post text post text post text post text post text post text post text post post text post text post text post text post post text post text post text",
    },
    created_at: {
      type: String,
      default: "00/00/0000",
    },
    likes: {
      type: Number,
      default: 0,
    },
    reposts: {
      type: Number,
      default: 0,
    },
    comments: {
      type: Number,
      default: 0,
    },
    reposted: {
      type: Boolean,
      default: false,
    },
    reposted_by_user: {
      type: Number,
      default: 0,
    },
    liked_by_user: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      reposted_internal: this.reposted,
      reposted_by_user_internal: this.reposted_by_user,
      reposts_internal: this.reposts,
      liked_internal: this.liked,
      liked_by_user_internal: this.liked_by_user,
      likes_internal: this.likes,
    };
  },
  methods: {
    async repost() {
      if (!this.reposted_by_user) {
        const data = {
          data: {
            type: "reposts",
            relationships: {
              post: {
                data: {
                  type: "posts",
                  id: this.id,
                },
              },
            },
          },
        };
        try {
          await api.post("/api/reposts", data);
          this.reposted_internal = true;
          this.reposted_by_user_internal = true;
          this.reposts_internal += 1;
          this.$emit("reposted");
        } catch (error) {
          console.error("Repost failed:", error);
        }
      }
    },
    async like() {
      if (!this.liked_by_user) {
        const data = {
          data: {
            type: "likes",
            relationships: {
              post: {
                data: {
                  type: "posts",
                  id: this.id,
                },
              },
            },
          },
        };
        try {
          await api.post("/api/likes", data);
          this.liked_internal = true;
          this.liked_by_user_internal = true;
          this.likes_internal += 1;
          this.$emit("liked");
        } catch (error) {
          console.error("Like failed:", error);
        }
      }
    },
  },
};
</script>

<style scoped>
.card {
  margin-top: 25px;
  left: 35px;
  background: #eeeeee;
  width: 840px;
  border-radius: 12px 12px 15px 25px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background: linear-gradient(to top, #e5e5e5, #eeeeee);
}

.reposted-padding {
  padding-top: 10px;
}

.unreposted-padding {
  padding-top: 15px;
}

.card-tab {
  height: 2rem;
  display: flex;
  align-items: center;
  padding-left: 20px;
  border-bottom: 1px solid #c9c9c9;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  background: linear-gradient(to top, #d8d8d8, #e6e6e6);
}

.card-tab-text {
  font-family: "Inter", sans-serif;
  color: #6b6b6b;
  font-weight: 450;
  font-size: 16.5px;
}

.card-content {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  text-align: center;
}

.post-info-container {
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

.post-text {
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

.engagement-item i.reposted {
  text-shadow: 0 0 1px #000;
  font-size: 1.3e;
}

.liked {
  color: rgb(29, 145, 166);
}

.reposted {
  color: rgb(29, 145, 166);
  text-shadow: 0 0 100px #000;
}
</style>
