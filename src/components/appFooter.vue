<template>
  <div class="footer">
    <div class="break-line"></div>
    <div class="box-flex">
      <div class="inside-box">
        <div class="header">Hello</div>
        <div class="">
          <img src="../assets/footer/asset20.png" />
        </div>
      </div>
      <div class="inside-box">
        <div class="header">Service</div>
        <div class="main">
          <ul>
            <li>link1</li>
            <li>link1</li>
            <li>link1</li>
            <li>link1</li>
            <li>link1</li>
            <li>link1</li>
          </ul>
        </div>
      </div>
      <div class="inside-box">
        <div class="header">Service</div>
        <div class="main">
          <ul>
            <li>link1</li>
            <li>link1</li>
            <li>link1</li>
            <li>link1</li>
            <li>link1</li>
            <li>link1</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  <div class="copyright"><p>WebSite created By Rajesh Parmar</p></div>
</template>

<style scoped>
.header {
  margin: 5px;
  font-size: 1.3rem;
  font-weight: 600;
}
.main {
  margin: 5px;
}
.footer {
  margin-top: 80px;
  background-color: grey;
}
.break-line {
  background-color: rgb(58, 189, 58);
  height: 70px;
}
.box-flex {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
}
.inside-box {
  padding: 20px;
  margin: 10px;
}
img {
  width: 300px;
}
li {
  cursor: pointer;
  list-style: none;
  font-size: 1.2rem;
}
li:hover {
  color: rgb(58, 189, 58);
}
.copyright {
  padding: 10px;
  background-color: rgb(66, 65, 65);
}
.copyright p {
  text-align: center;
  color: white;
  font-size: 1.2rem;
}
</style>
