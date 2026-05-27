// ==========================================================
// 選單
// ==========================================================
// const navbarheader = document.querySelector('.nav-header');
// const navbartoggler = document.querySelector('.navbar-toggler');

// navbartoggler.addEventListener('click',function(e){
//     e.preventDefault();
//     if (navbarheader.classList.contains('open')) {
//         navbarheader.classList.remove('open');
//     } else {
//         navbarheader.classList.add('open');
//     }
// }, false);

// const navitems = document.querySelectorAll('.nav-item');
// const navHeight = document.querySelector('nav').offsetHeight;


// navitems.forEach(item => item.addEventListener('click', function(e){
//     let sectiontarget = e.target.dataset.target;
//     console.log(sectiontarget)
//     console.log(navHeight)
//     if (typeof(sectiontarget) !== 'undefined'){
//         // navbartoggler.click();
//         let hash = '.' + sectiontarget;
//         console.log(hash)
//         let hashTop = document.querySelector(hash).offsetTop;
//         console.log(hashTop)
//         window.scrollTo({
//             top: hashTop - navHeight,
//             behavior: 'smooth'
//         });
//     }
// }, false));



const promoWrap = document.querySelectorAll('.promo-wrap');

promoWrap.forEach(item => item.addEventListener('click', function(e){
    let sectiontarget = e.target.dataset.target;

    let sectiontargetSub = sectiontarget.substring(0,8);

    
    let articleTop = 0;

    if(sectiontargetSub){
        articleTop =  document.querySelector('.article .container.' + sectiontargetSub).offsetTop;
    }


    let hash = '.' + sectiontarget;    
    let hashTop = document.querySelector(hash).offsetTop;

    window.scrollTo({
            top: articleTop + hashTop,
            behavior: 'smooth'
    });
}, false));



const contentsItem = document.querySelectorAll('.contents-item');
const articleOffsetTop = document.querySelector('.article').offsetTop;

contentsItem.forEach(item => item.addEventListener('click', function(e){
    console.log(articleOffsetTop)
    let sectiontarget = e.target.dataset.target

    let sectiontargetSub = sectiontarget.substring(0,8);

    
    let articleTop = 0;

    if(sectiontargetSub){
        articleTop =  document.querySelector('.article .container.' + sectiontargetSub).offsetTop;
    }


    let hash = '.' + sectiontarget ;
    let hashTop = document.querySelector(hash).offsetTop;

    window.scrollTo({
            top: articleTop + hashTop,
            behavior: 'smooth'
    });
}, false));





// ==========================================================
// 跳窗
// ==========================================================
const lightboxdimissItems = document.querySelectorAll('.lightbox-dismiss');
const lightboxmask = document.querySelector('.lightbox-mask');
lightboxdimissItems.forEach(item => item.addEventListener('click', function(){
    lightboxDismissAction();
}, false));

function lightboxDismissAction(){
    const body = document.body;
    const scrollY = body.style.top;
    document.getElementsByTagName('body')[0].style = '';
    window.scrollTo(0, parseInt(scrollY || '0') * -1);
    lightboxmask.classList.remove('open');
    if (lightboxmask.classList.contains('attractions')){
        lightboxmask.classList.remove('attractions');
    }
    const showLightbox = document.querySelector('.lightbox.open');
    showLightbox.classList.remove('open');
}

const couponlists = document.querySelectorAll('.coupon-link');
couponlists.forEach(item => item.addEventListener('click', function(e){
    e.preventDefault();
    lightboxOpenAction(this);
}, false));

function lightboxOpenAction(targetDom){
    const lightboxIndex = targetDom.dataset.target;
    
    if (lightboxIndex.length > 0){
        const currentScrollY = document.getElementById('bodyscrollY').value;
        document.getElementsByTagName('body')[0].style = `position: fixed; top: -${currentScrollY}px`;
        if (lightboxIndex.includes('attractions')) {
            lightboxmask.classList.add('open', 'attractions');
        } else {
            lightboxmask.classList.add('open');
        }
        const lightboxTarget = document.getElementById(lightboxIndex);
        lightboxTarget.classList.add('open');
    }
}

// ==========================================================
// 回頂端列按鈕
// ==========================================================

const gotopbtn = document.querySelector('.gotopbtn');
gotopbtn.addEventListener('click',function(e){
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}, false);

window.addEventListener("scroll", (event) => {
    let scrollY = this.scrollY;
    document.getElementById('bodyscrollY').value = scrollY;
    if (scrollY > 100) {
        gotopbtn.classList.add('show');
    }
    else{
        gotopbtn.classList.remove('show');
    }
});

