require('../models/Phone');
require('../models/Review');
const puppeteer = require('puppeteer');

const mongoose = require('mongoose');
const Phone = mongoose.model('phones');
const Review = mongoose.model('reviews')

// data crawl for thegioididong.com

module.exports = async() => {
  const browser = await puppeteer.launch({ headless: false });
  console.log('Browser openned');
  const page = await browser.newPage();
  const url = 'https://www.thegioididong.com/dtdd#i:5';
  await page.goto(url);
  console.log('Page loaded');

  const phoneListName = await page.evaluate(() => {
           
    function selector(phone) {
      let img;
      if (phone.querySelector('img').getAttribute('src') == null) {
        if (phone.querySelector('img').src !== "") {
          img = phone.querySelector('img').src;
        } else if (phone.querySelector('img').getAttribute('data-original') != null) {
          img = phone.querySelector('img').getAttribute('data-original');
        }
      } else {
        img =phone.querySelector('img').getAttribute('src');
      }
      return img;
    }

    let phoneList = document.querySelectorAll('li >a[href^="/dtdd/"]')
    phoneList = [...phoneList];

    let result = phoneList.map(phone => {
      return {
        image : selector(phone),
        name : phone.querySelector('h3').innerText,
        price : phone.querySelector('div.price').querySelector('strong').innerText,
        url: "https://thegioididong.com" + phone.getAttribute('href'),
      }
    }
      
    );

    return result;
  });

  console.log(phoneListName);
  
  for (let i = 0; i < phoneListName.length; i++) {
    const { image, name, price, url } = phoneListName[i];
    await page.goto(url);
    const reviews = await page.evaluate(() => {
      
      let reviews = [];
      let commentList = document.querySelectorAll('li.comment_ask');
      commentList.forEach(comment => {
        let review = {};
        review.content = comment.children[1].innerText; 
        if (comment.children[3].firstChild) {
          if (comment.children[3].firstChild.children[1]) {
            review.answer = comment.children[3].firstChild.children[1].innerText;
          }
          else {
            review.answer = "";
          }
        } else {
          review.answer = "";
        }
        reviews.push(review);
      })
      console.log(reviews);
      // let reviews = document.querySelectorAll('div.question');
      // reviews = [...reviews];
      // reviews = reviews.map(review => review.innerText);
      return reviews;
    })

    const phone = new Phone({
      image, name, price: String(price).slice(0, -1), url, reviews
    });

    phone.save();
  }

  await browser.close();

}