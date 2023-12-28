<template>
  <div class="container">
    <Header></Header>
    <Sidebar></Sidebar>
    <Content></Content>
  </div>
</template>

<script>
import Header from './components/Header.vue';
import Content from './components/Content.vue';
import Sidebar from './components/Sidebar.vue';

export default {
  name: 'App',
  components: { Header, Content, Sidebar },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');
/* @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,1,0'); */

@import url('./css/button.css');
@import url('./css/dropdown.css');
@import url('./css/radio.css');
@import url('./css/textfield.css');
:root {
  --sidebar: #021434;
  --sidebar-hover: #4d6695;
  --gray-1: #edeff1;
  --gray-2: #f4f4f4;
  --gray-3: #888888;
  --btn-gray: #f0f0f0;
  --btn-green: #00833a;
  --tbl-hover: #f0fdee;
  --tbl-check: #0d8c4b;
}

.material-symbols-outlined.fill {
  font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'OPSZ' 24;
}

* {
  margin: 0;
  padding: 0;
  border: 0;
  box-sizing: border-box;
  font-family: 'Montserrat', sans-serif;
  font-size: 14px;
}

.container {
  display: grid;
  grid-template-rows: 56px calc(100vh - 56px);
  grid-template-columns: auto 1fr;
  /* min-height: 100vh; */
}

.header {
  grid-column: 1 / 3;
  grid-row: 1 / 2;
}

.sidebar {
  background-color: var(--sidebar);
  grid-column: 1 / 2;
  grid-row: 2 / 3;
}

.content {
  padding: 24px 24px 24px 24px;
  grid-column: 2 / 3;
  grid-row: 2 / 3;
  border-radius: 3px;
  display: flex;
  flex-direction: column;
}

.txt-left {
  text-align: left;
}

.txt-right {
  text-align: right;
}

.txt-center {
  text-align: center;
}
</style>
