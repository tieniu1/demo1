<template>
  <header class="page-header">
    <h1>{{ title }}</h1>
    <nav>
      <ul>
        <li><a href="/">首页</a></li>
        <li><a href="/about">关于我们</a></li>
        <li><a href="/contact">联系我们</a></li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'PageHeader',
  props: {
    title: {
      type: String,
      default: '我的网站'
    }
  }
}
</script>

<style scoped>
.page-header {
  background-color: #f8f8f8;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

h1 {
  margin: 0;
  font-size: 1.5rem;
}

nav ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: flex;
}

nav li {
  margin-left: 1rem;
}

nav a {
  text-decoration: none;
  color: #333;
}

nav a:hover {
  color: #007bff;
}
</style>

