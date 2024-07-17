// firebase_ver.html

// Firebase SDK 라이브러리 가져오기
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
import { getDocs } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";


// Firebase 구성 정보 설정
// const firebaseConfig = {
//         // 본인 설정 내용 채우기 : firestore database 'sdk 설정 및 구성'에서 구성 코드 붙이기
// };
const firebaseConfig = {
  apiKey: 
  authDomain: 
  projectId: 
  storageBucket: 
  messagingSenderId: 
  appId: 
};


// Firebase 인스턴스 초기화
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 데이터 추가 기본 코드 : script type='module'로 설정하면 onclick이 잘 안됨.
// onclick 지우고 id가 없으면 부여해서 아래와 같이 click 설정해줌
// $("#id").click(async function () {
//   let doc = {};
//   await addDoc(collection(db, "컬렉션 이름"), doc);
// })
$("#postingbtn").click(async function () {
  let image = $('#image').val();
  let title = $('#title').val();
  let score = $('#score').val();
  let comment = $('#comment').val();

  let doc = {
    'image': image,
    'title': title,
    'score': score,
    'comment': comment,
  }

  await addDoc(collection(db, "movies"), doc);

  // 완료되면 알림창 띄우기
  alert('저장 완료');
  // 새로고침
  window.location.reload();
})

$("#savebtn").click(async function () {
  $('#postingbox').toggle();
})

// $(document).ready(function () { // fetch_ver.html : 페이지 로딩과 동시에 업데이트
let url = "http://spartacodingclub.shop/sparta_api/weather/seoul";
fetch(url).then(res => res.json()).then(data => {
  let mise = data['temp'];
  $('#temperature').text(mise)
})
// })


let docs = await getDocs(collection(db, "movies"));
docs.forEach((doc) => {
  let row = doc.data();
  // console.log(row);

  let image = row.image;
  let title = row.title;
  let score = row.score;
  let comment = row.comment;


  let tmp_html = `<div class="col">
        <div class="card h-100">
          <img src="${image}" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">${title}</h5>
            <p class="card-text">${score}</p>
            <p class="card-text">${comment}</p>
          </div>
        </div>
      </div>`;
  $('#card').append(tmp_html)
});


// ============================================================================
// $(document).ready(function () { // fetch_ver.html : 페이지 로딩과 동시에 업데이트
//   let url = "http://spartacodingclub.shop/sparta_api/weather/seoul";
//   fetch(url).then(res => res.json()).then(data => {
//     let mise = data['temp'];
//     $('#temperature').text(mise)
//   })
// })

// function openClose(){
//   // alert('안녕');
//   $('#postingbox').toggle(); // display:none이 됨
// }

// function makeCard(){
//   // alert('확인');
//   let image = $('#image').val();
//   let title = $('#title').val();
//   let score = $('#score').val();
//   let comment = $('#comment').val();


//   let tmp_html = `<div class="col">
//         <div class="card h-100">
//           <img src="${image}" class="card-img-top" alt="...">
//           <div class="card-body">
//             <h5 class="card-title">${title}</h5>
//             <p class="card-text">${score}</p>
//             <p class="card-text">${comment}</p>
//           </div>
//         </div>
//       </div>`;
//   $('#card').append(tmp_html)
// }
