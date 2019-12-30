
class CarouselLayer {
    constructor(classname) {

        this.oCarousel = document.querySelector(classname);
        
        
        this.layer1 = this.oCarousel.querySelector('.layers>li:nth-of-type(1)');
        this.layer2 = this.oCarousel.querySelector('.layers>li:nth-of-type(2)');
        this.layer3 = this.oCarousel.querySelector('.layers>li:nth-of-type(3)');
        this.aFronts = this.oCarousel.querySelectorAll('.fronts>li');
        this.oBtn_l = this.oCarousel.querySelector('.left_arrow');
        this.oBtn_r = this.oCarousel.querySelector('.right_arrow');
        this.aPoints = this.oCarousel.querySelectorAll('.point_box li');
        this.now_index = 0;
        this.last_index = 0;
        console.log(this.layer2);
        this.is_run = false;
        this.aPoints.forEach((li, index) => li.index = index);
        this.timer = setInterval(() => {
            ++this.now_index;
            this.change();
        }, 2000);

        this.oCarousel.addEventListener('mouseover', () => {
            // alert()
            clearInterval(this.timer);
        })
        this.oCarousel.addEventListener('mouseout', () => {
            this.timer = setInterval(() => {
                ++this.now_index;
                this.change();
            }, 2000);
        })
        this.layer1.addEventListener('transitionstart', () => this.is_run = true);
        this.layer3.addEventListener('transitionend', () => this.is_run = false);

        this.oCarousel.addEventListener('click', (ev)=>this.click(ev))
    }
    
    click(ev){
        if (!this.is_run) {
            let e = ev || window.event;
            let obj = e.srcElement || e.target;
            // console.log(obj.nodeName);

            if (obj.parentNode.parentNode.classList.contains('point_box') && obj.nodeName.toLowerCase() == 'li') {
                let _now_index = this.calc_index(this.now_index);
                let dif = Math.abs(_now_index - obj.index);
                console.log(dif);
                _now_index <= obj.index ? this.now_index += dif : this.now_index -= dif;
                this.change();
            } else if (obj.classList.contains('left_arrow') || obj.parentNode.classList.contains('left_arrow')) {
                --this.now_index;
                this.change();
            } else if (obj.classList.contains('right_arrow') || obj.parentNode.classList.contains('right_arrow')) {
                ++this.now_index;
                this.change();
            }
        }
    }

    change() {
        let _now_index = 0;
        this.aFronts.forEach(li => li.classList.remove('active'));
        this.layer1.style.transform = `rotateY(${this.now_index*90}deg)`;
        this.layer2.style.transform = `rotateY(${this.now_index*90}deg)`;
        this.layer3.style.transform = `rotateY(${this.now_index*90}deg)`;
        this.layer2.style.transitionDelay = `0.1s`;
        this.layer3.style.transitionDelay = `0.2s`;
        // this.aPoints.forEach((li, index) => {
        //     li.classList.remove('active');
           
    
        //     (index == _now_index) && (li.classList.add('active'));
            
    
        // })
        this.aPoints[this.last_index].classList.remove('active');
        _now_index = this.calc_index(this.now_index);
        this.aPoints[_now_index].classList.add('active');
        this.layer3.ontransitionend = () => {
            this.aFronts[_now_index].classList.add('active');
        }

        this.last_index=_now_index;
        console.log(this.last_index);
        
    
    }
    
    calc_index(index) {
        let current = 0;
        if (index < 0) {
            current = 3 + ((index + 1) % 4);
        } else {
            current = index % 4;
        }
        return current;
    }

}

let oCarousel=new CarouselLayer('.carousel');



// 1.自动轮播(鼠标放上去停)
// 2.小圆点要跟着轮播图变化而变化(acitive切换)
// 3.点击小圆点轮播图要切换到对应的图片
// 4.提高要求, 动画结束后才允许用户点击下一次 事件移出与绑定