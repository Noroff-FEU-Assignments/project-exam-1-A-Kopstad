const cors = "https://noroffcors.onrender.com/";
const endpoint = "https://bookworms.websolutionscore.com/wp-json/wp/v2/posts?_embed";
const url = cors + endpoint;

const blogpost = document.querySelector(".blogpost-article");

blogpost.innerHTML = `<div class="loading"></div>`;

const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("id");

const consumerKey = 'ck_b0dc2e3eacf2d5211ea7516b6db2b05cbe3c3915';
const consumerSecret = 'cs_1bd5610f3ecd71752dcf930ab069b068fde4f902';
const credentials = btoa(consumerKey + ':' + consumerSecret);