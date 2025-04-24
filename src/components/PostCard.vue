<template>
  <div class="card">
    <div class="profile-info-container d-flex px-4 pb-4">
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
            <i class="bi bi-heart"></i> {{ likes }}
          </span>
          <span class="engagement-item">
            <i class="bi bi-arrow-repeat"></i> {{ reposts }}
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
export default {
  name: "PostCard",
  props: {
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
      default: "12h",
    },
    likes: {
      type: String,
      default: "12",
    },
    reposts: {
      type: String,
      default: "5",
    },
    comments: {
      type: String,
      default: "7",
    },
  },
};
</script>

<style scoped>
.card {
  padding-top: 15px;
  background: #eeeeee;
  width: 900px;
  height: 160px;
  border-radius: 12px 12px 15px 25px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
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

.profile-info-container {
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
  text-shadow: 0 0 1px #000;
  font-size: 1.1em;
}
</style>
