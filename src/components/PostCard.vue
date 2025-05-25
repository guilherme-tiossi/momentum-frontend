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
            {{ likes_counter_internal }}
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
            {{ reposts_counter_internal }}
          </span>
          <span class="engagement-item">
            <i class="bi bi-chat" @click="toggle_comments"></i>
            {{ comments_counter_internal }}
          </span>
        </div>
      </div>
    </div>
    <div v-if="open_comments">
      <div class="custom-hr mb-3"></div>
      <div>
        <div class="d-flex justify-content-center mt-1">
          <div class="comment-card">
            <textarea
              class="custom-textarea align-self-center"
              placeholder="Join the conversation!"
              v-model="comment_text"
            ></textarea>
            <button class="btn w-100 mb-2 custom-button" @click="comment">
              Post
            </button>
          </div>
        </div>

        <template v-if="serializedComments">
          <div v-for="(comment, key) in serializedComments" :key="key">
            <div class="d-flex justify-content-center mt-2">
              <CommentCard
                :key="comment.id"
                :id="comment.id"
                :text="comment.text"
                :likes_counter="comment.likes_counter"
                :created_at="formatDate(comment.created_at)"
                :name="comment.user.name"
                :username="comment.user.username"
                :pfp="comment.user.pfp"
                :reposted="comment.reposted"
                :liked_by_user="comment.liked_by_user"
              />
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import api from "../api/http";
import CommentCard from "./CommentCard.vue";
import JSONAPISerializer from "json-api-serializer";

const Serializer = new JSONAPISerializer();

Serializer.register("posts", {
  relationships: {
    comments: {
      type: "comments",
    },
    user: {
      type: "users",
    },
  },
});

Serializer.register("comments", {
  relationships: {
    user: {
      type: "users",
    },
  },
});

Serializer.register("post");
Serializer.register("attachments");
Serializer.register("attachment");
Serializer.register("users");

export default {
  name: "PostCard",
  components: {
    CommentCard,
  },
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
    likes_counter: {
      type: Number,
      default: 0,
    },
    reposts_counter: {
      type: Number,
      default: 0,
    },
    comments_counter: {
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
    comments: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      reposted_internal: this.reposted,
      reposted_by_user_internal: this.reposted_by_user,
      reposts_counter_internal: this.reposts_counter,
      liked_by_user_internal: this.liked_by_user,
      likes_counter_internal: this.likes_counter,
      comments_counter_internal: this.comments_counter,
      comment_text: this.comment_text,
      serializedComments: this.comments,
      open_comments: false,
    };
  },
  methods: {
    formatDate(dateStr) {
      return new Date(dateStr).toLocaleDateString();
    },
    async toggle_comments() {
      if (this.open_comments) {
        this.open_comments = false;
      } else {
        try {
          const response = await api.get("api/comments", {
            params: {
              post: this.id,
            },
          });
          const deserializedData = Serializer.deserialize(
            "comments",
            response.data
          );
          this.serializedComments = deserializedData;
        } catch (error) {
          console.error("Comment loading failed:", error);
        }
        this.open_comments = true;
      }
    },
    async repost() {
      if (!this.reposted_by_user_internal) {
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
          this.reposts_counter_internal += 1;
          this.$emit("reposted");
        } catch (error) {
          console.error("Repost failed:", error);
        }
      } else {
        try {
          await api.patch("/api/depost", { post: this.id });
          this.reposted_internal = false;
          this.reposted_by_user_internal = false;
          this.reposts_counter_internal -= 1;
          this.$emit("deposted");
        } catch (error) {
          console.error("Depost failed:", error);
        }
      }
    },
    async like() {
      if (!this.liked_by_user_internal) {
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
          this.liked_by_user_internal = true;
          this.likes_counter_internal += 1;
          this.$emit("liked");
        } catch (error) {
          console.error("Like failed:", error);
        }
      } else {
        try {
          await api.patch("/api/unlike", { post: this.id });
          this.liked_by_user_internal = false;
          this.likes_counter_internal -= 1;
          this.$emit("unliked");
        } catch (error) {
          console.error("Unliked failed:", error);
        }
      }
    },
    async comment() {
      const data = {
        data: {
          type: "comments",
          attributes: {
            text: this.comment_text,
          },
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
        await api.post("api/comments", data);
        this.comment_text = "";

        const response = await api.get(`/api/posts/${this.id}`);
        const deserializedData = Serializer.deserialize("post", response.data);

        this.comments_counter_internal += 1;
        this.serializedComments = deserializedData.comments;

        this.$emit("commented");
      } catch (error) {
        console.error("Comment failed:", error);
      }
    },
  },
};
</script>

<style scoped>
.custom-hr {
  margin-top: 30px;
  height: 1px;
  background: #d5d5d5;
  width: 200%;
  opacity: 1;
  box-shadow: 0 2px 9px rgba(157, 157, 157, 0.2),
    0 -2px 9px rgba(157, 157, 157, 0.2);
}

.card {
  margin-top: 25px;
  background: #eeeeee;
  width: 840px;
  border-radius: 12px 12px 15px 25px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background: linear-gradient(to top, #e5e5e5, #eeeeee);
  padding-bottom: 30px;
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

.comment-card {
  margin-top: 15px;
  max-width: 75%;
  left: 35px;
  background: #eeeeee;
  width: 540px;
  border-radius: 12px 12px 15px 15px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background: linear-gradient(to top, #dadada, #eeeeee);
  padding-bottom: 10px;
  padding-top: 10px;
}

.custom-button {
  margin-top: 10px;
  background: linear-gradient(to top, #b2b2b2, #bdbdbd);
  border: none;
  border-radius: 10px;
  height: 40px;
  max-width: 110px;
  font-family: "Inter", sans-serif;
  font-weight: bold;
  color: black;
  margin-left: 410px;
}

.custom-button:hover {
  background: linear-gradient(to top, #a7a7a7, #b3b3b3);
}

.custom-textarea {
  background-color: #ececec !important;
  border: 2px solid !important;
  border-color: #bdbdbd !important;
  border-radius: 10px !important;
  height: 50px;
  width: 500px;
  font-family: "Inter", sans-serif;
  resize: none;
  padding-top: 10px;
}

.custom-textarea::placeholder {
  color: #676767;
}
</style>
