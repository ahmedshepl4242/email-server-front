<template>
    <li>
          <div>
            <img src="http://placekitten.com/g/28/28" />
          </div>
          <!-- /end sender view -->
          <div>
            <div>
              <div class="sender-name">{{ recieverName }}</div>
              <!-- /end mail sender name -->
                <div>{{ date }}</div>
              <!-- /end send date -->
            </div>
            <!-- /end sender heading -->
            <h3>{{ subject }}</h3>
            <!-- /end post title -->
          </div>
          <!-- /end post-preview -->
        </li>
</template>

<script>
    export default {
        props:{
            recieverName: null,
            date: null,
            subject: null
        }
    }
</script>

<style scoped>
li {
  width: 100%;
  border-top: 2px solid #150a0a;
  padding: 4px 0 0 0;
}
li:hover{
   /* width: 100%; */
   /* border all item? */
    border: 2px solid #200cd5;
  
   /* padding: 4px 0 0 0; */
}
/* wrapper for sender's avatar and checkbox */
li > div:first-child {
  width: 40px;
  height: 60px;
  display: inline-block;
  position: relative;
}
/* the message container */
li > div:last-child {
  display: inline-block;
  width: 190px;
  vertical-align: top;
}
/* the sender's avatar */
li img {
  width: 28px;
  display: block;
  position: absolute;
  padding-top: 4px;
  right: 0;
  top: 0;
}
li > div:last-child > div {
  display: block;
  color: #aaa;
  font-size: 0.75em;
}
/* the sender's name */
li .sender-name {
  display: inline-block;
}
/* the date sent */
li .sender-name + div {
  float: right;
}
h3 {
  font-size: 1em;
  font-weight: 300;
  letter-spacing: 1px;
  line-height: 1.25em;
  color: #333;
}
</style>