const animationOptions = {
    ease: 'expo.inOut'
}

const introAnimation = () => {
    const tl = gsap.timeline({
        defaults: {
            ease: animationOptions.ease,
            duration: 1,
        }
    });
    
    tl.to('.intro__title', {
        duration: 1.5,
        y: 0,
        autoAlpha: 1,
        delay: 0.5,
    })
    .to('.intro__background--left, .intro__background--right', {
        scaleX: 1,
    })
    .to('.intro__background--left, .intro__background--right', {
        scaleY: 0,
        transformOrigin: 'top center',
    })
    .to('.intro__title', {
        duration: 1.5,
        y: -60,
        autoAlpha: 0,
    }, '-=0.6')
    .to('.intro', {
        y: '-100%',
    }, '-=0.5')
    
    return tl;
}


const skewInElements = elements => {
    const tl = gsap.timeline();
    
    tl.from(elements, {
        duration: 1,
        ease: animationOptions.ease,
        skewY: -5,
        autoAlpha: 0,
        y: 40,
    })
    
    return tl;
}



const fadeInElements = elements => {
    const tl = gsap.timeline();
    
    tl.from(elements, {
        duration: 1,
        ease: animationOptions.ease,
        y: '20px',
        autoAlpha: 0,
        stagger: 0.1,
    })
    
    return tl;
}

const master = gsap.timeline({
    paused: false,
    delay: 0.2,
});

master
    .add(introAnimation())
    .add(fadeInElements('.header__logo, .header__nav a'))
    .add(skewInElements('h1, .hero__col--2 img'), '-=1')



// if (!localStorage.getItem('introAnimationPlayed')) {
//     master.play();  // 애니메이션 실행
//     localStorage.setItem('introAnimationPlayed', 'true');  // 애니메이션이 실행되었음을 표시
// } else {
//     // 인트로 애니메이션을 건너뛰고, 나머지 애니메이션을 실행하려면
//     master.seek(master.duration());  // 타임라인을 끝으로 이동하여 모든 애니메이션 건너뛰기
// }

//스크롤 시 네비 하단 라인 및 글자 색상
$(window).scroll(function(){
    const scr = $(document).scrollTop();
    let all_h = $(document).height();
    let abo_h = $("#about").offset().top;
    let pub_h = $("#project").offset().top;
    let con_h = $("#contact").offset().top;

    if (con_h > scr && scr >= abo_h) {
        $("#header").addClass("color");
        $("#header .header__nav a").css("color", "#555");
        $(".header__logo .logo").css("color", "#555");
        $(".header__logo .logo").css("border", "3px solid #555");
    } else {
        $("#header").removeClass("color");
        $("#header .header__nav a").css("color", "#fff");
        $(".header__logo .logo").css("color", "#fff");
        $(".header__logo .logo").css("border", "3px solid #fff");
    }

    if (scr < abo_h) {
        //home 라인
        $(".header__nav li").removeClass("on");
        $(".header__nav #h").addClass("on");
    } else if (scr >= abo_h && scr < pub_h) {
        //about 라인
        $(".header__nav li").removeClass("on");
        $(".header__nav #a").addClass("on");
        $(".header__nav #a").addClass("active");
    } else if (scr >= pub_h && scr < con_h){
        //publishing 라인
        $(".header__nav li").removeClass("on");
        $(".header__nav #p").addClass("on");
        $(".header__nav #p").addClass("active");
    } else if (scr >= con_h && scr < all_h){
        //publishing 라인
        $(".header__nav li").removeClass("on");
        $(".header__nav #c").addClass("on");
    }

    //가로 스크롤_PUBLISHING
    let offset = scr - pub_h

    if (scr > pub_h) {
        $("#project .container").css({ left: -offset });
    }

});

$(".header__nav li a").on("click", function () {
    let hr = $(this).attr("href");
    let target = $(hr).offset().top;

    $("html, body").animate({ scrollTop: target }, 800);
});