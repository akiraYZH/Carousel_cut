let oCarousel = document.querySelector('.carousel'),
    layer1 = document.querySelector('.carousel>.layers>li:nth-of-type(1)'),
    layer2 = document.querySelector('.carousel>.layers>li:nth-of-type(2)'),
    layer3 = document.querySelector('.carousel>.layers>li:nth-of-type(3)'),
    aFronts = document.querySelectorAll('.carousel>.fronts>li'),
    oBtn_l = document.querySelector('.left_arrow'),
    oBtn_r = document.querySelector('.right_arrow'),
    aPoints = document.querySelectorAll('.point_box li'),
    now_index = 0,
    timer = null;
    is_run = false;


aPoints.forEach((li, index) => li.index = index);



timer = setInterval(() => {
    ++now_index;
    change();
}, 2000);

oCarousel.addEventListener('mouseover', () => {
    // alert()
    clearInterval(timer);
})
oCarousel.addEventListener('mouseout', () => {
    timer = setInterval(() => {
        ++now_index;
        change();
    }, 2000);
})
layer1.addEventListener('transitionstart',()=>is_run=true);
layer3.addEventListener('transitionend',()=>is_run=false);


oCarousel.addEventListener('click', (ev) => {

    if (!is_run) {
        let e = ev || window.event;
        let obj = e.srcElement || e.target;
        console.log(obj.nodeName);

        if (obj.parentNode.parentNode.classList.contains('point_box') && obj.nodeName.toLowerCase() == 'li') {
            let _now_index = calc_index(now_index);
            let dif = Math.abs(_now_index - obj.index);
            console.log(dif);
            _now_index <= obj.index ? now_index += dif : now_index -= dif;
            change();
        } else if (obj.classList.contains('left_arrow') || obj.parentNode.classList.contains('left_arrow')) {
            --now_index;
            change();
        } else if (obj.classList.contains('right_arrow') || obj.parentNode.classList.contains('right_arrow')) {
            ++now_index;
            change();
        }
    }


})

// left arrow click event
// oBtn_l.addEventListener('click', () => {
//     // (--now_index < 0) && (now_index = aPoints.length - 1);
//     --now_index
//     change();
// })

// oBtn_r.addEventListener('click', () => {
//     // console.log(now_index);
//     // (++now_index == aPoints.length) && (now_index = 0);
//     ++now_index;

//     change();
// })

//when switch the img
function change() {
    let _now_index = 0;
    aFronts.forEach(li => li.classList.remove('active'));
    layer1.style.transform = `rotateY(${now_index*90}deg)`;
    layer2.style.transform = `rotateY(${now_index*90}deg)`;
    layer3.style.transform = `rotateY(${now_index*90}deg)`;
    layer2.style.transitionDelay = `0.1s`;
    layer3.style.transitionDelay = `0.2s`;
    aPoints.forEach((li, index) => {
        li.classList.remove('active');
        _now_index = calc_index(now_index);

        (index == _now_index) && (li.classList.add('active'));
        layer3.ontransitionend = () => {
            aFronts[_now_index].classList.add('active');
        }

    })


}

function calc_index(index) {
    let current = 0;
    if (index < 0) {
        current = 3 + ((index + 1) % 4);
    } else {
        current = index % 4;
    }
    return current;
}
// function getStyle(obj, name){
// 	if(obj.currentStyle){
// 		return obj.currentStyle[name];
// 	}else{
// 		return getComputedStyle(obj, false)[name];
// 	}
// }


// 1.自动轮播(鼠标放上去停)
// 2.小圆点要跟着轮播图变化而变化(acitive切换)
// 3.点击小圆点轮播图要切换到对应的图片
// 4.提高要求, 动画结束后才允许用户点击下一次 事件移出与绑定