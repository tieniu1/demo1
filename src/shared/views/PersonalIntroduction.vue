<template>
  <div class="personal-introduction">
    <PageHeader title="个人介绍" />
    <main>
      <section class="profile">
        <img :src="profileImage" alt="个人头像" class="profile-image">
        <h2>{{ name }}</h2>
        <p class="title">{{ title }}</p>
      </section>
      <section class="introduction">
        <h3>自我介绍</h3>
        <p>{{ introduction }}</p>
      </section>
      <section class="contact-info">
        <h3>联系方式</h3>
        <ul>
          <li><strong>邮箱：</strong>{{ email }}</li>
          <li><strong>电话：</strong>{{ phone }}</li>
          <li><strong>地址：</strong>{{ address }}</li>
        </ul>
      </section>
    </main>
  </div>
</template>

<script>
import PageHeader from '@/components/PageHeader.vue'
import { getItem } from '@/utils/storage'

export default {
  name: 'PersonalIntroduction',
  components: {
    PageHeader
  },
  data() {
    return {
      name: '张三',
      title: '软件工程师',
      profileImage: '/path/to/profile-image.jpg', // 请替换为实际的图片路径
      introduction: '我是一名热爱技术的软件工程师，有5年的开发经验。我擅长前端开发，特别是Vue.js框架。在工作中，我注重代码质量和用户体验，同时也乐于学习新技术。',
      email: 'zhangsan@example.com',
      phone: '123-456-7890',
      address: '中国北京市朝阳区'
    }
  },
  mounted() {
    // 尝试从本地存储加载个人信息
    const storedInfo = getItem('personalInfo')
    if (storedInfo) {
      Object.assign(this, storedInfo)
    }
  }
}
</script>

<style scoped>
.personal-introduction {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.profile {
  text-align: center;
  margin-bottom: 30px;
}

.profile-image {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 15px;
}

.title {
  color: #666;
  font-style: italic;
}

.introduction, .contact-info {
  margin-bottom: 30px;
}

h3 {
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
  margin-bottom: 15px;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin-bottom: 10px;
}
</style>
