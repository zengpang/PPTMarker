const $ = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);
const in$ = (f, s) => f.querySelector(s);
const in$$ = (f, s) => f.querySelectorAll(s);
const isMain = str => (/^#{1,2}(?!#)/).test(str);
const isSub = str => (/^#{3}(?!#)/).test(str);

function convert(raw) {
    let arr = raw.split(/\n(?=\s*#)/).filter(s => s != "").map(s => s.trim());//根据#号分割用户输入内容
    let html = ``;
    //遍历用户输入
    for (let i = 0; i < arr.length; i++) {
        //判断下一行是否为空
        if (arr[i + 1] !== undefined) {
            switch (true) {
                case (isMain(arr[i]) && isMain(arr[i + 1])):
                    {
                        html += `
                    <section data-markdown>
                    <textarea data-template>
                    ${arr[i]}
                    </textarea>
                    </section>
                    `
                    }; break;
                case (isMain(arr[i]) && isSub(arr[i + 1])):
                    {
                        html += `
                    <section>
                    <section data-markdown>
                    <textarea data-template>
                    ${arr[i]}
                    </textarea>
                    </section>
                    `
                    }; break;
                case (isSub(arr[i]) && isSub(arr[i + 1])):
                    {
                        html += `
                    <section data-markdown>
                    <textarea data-template>
                    ${arr[i]}
                    </textarea>
                    </section>
                    `
                    }; break;
                case (isSub(arr[i]) && isMain(arr[i + 1])):
                    {
                        html += `
                    <section data-markdown>
                    <textarea data-template>
                    ${arr[i]}
                    </textarea>
                    </section>
                    </section>
                    `
                    }; break;
            }
        }
        else //如果为空判断遍历到最后一行
        {
            switch (true) {
                case (isMain(arr[i])):
                    {
                        html += `
                    <section data-markdown>
                    <textarea data-template>
                    ${arr[i]}
                    </textarea>
                    </section>
                    `
                    }; break;
                case (isSub(arr[i])):
                    {
                        html += `
                    <section data-markdown>
                    <textarea data-template>
                    ${arr[i]}
                    </textarea>
                    </section>
                    </section>
                    `
                    }; break;
            }
        }
    }
    return html;
}
function loadMarkdown(raw) {
    localStorage.markdown = raw;
    location.reload();
}
//侧边菜单栏
const Sliderbar = {
    init() {
        console.log(`菜单初始化`);
        this.$sliderbar = $(`.sliderbar`);
        this.$sliderbarOpenBtn = $(`.sliderbar .content header .icon-arrows`);
        this.$sliderHeader = $(`.sliderbar .content header`);
        this.$sliderbarLogoName = $(`.sliderbar .content header p:nth-child(2)`);
        this.$sliderbarMain = $(`.sliderbar .content main`);
        this.$$sliderbarItem = $$(`.sliderbar .content main p:nth-child(n+2)`);
        this.$sliderbarItemBottom=$(`.sliderbar .content main p:nth-child(1)`);
        this.sliderbarItemTexts = new Array(this.$$sliderbarItem.length).fill(``);
        this.$sliderbarFooter = $(`.sliderbar .content footer`);
        this.$sliderbarInfo = $(`.sliderbar .content footer p `);
        this.sliderbarInfoText = this.$sliderbarInfo.innerHTML;
        this.isShrink = true;
        this.isShowBottom=false;
        this.bind();

    },
    //事件绑定
    bind() {
        self = this;
        // let arraySliderbarItem = [...this.$$sliderbarItem];
        // for (let indexNum = 0; indexNum < this.sliderbarItemTexts.length; indexNum++) {
        //     let str = arraySliderbarItem[indexNum].innerHTML;
        //     this.sliderbarItemTexts[indexNum] = str;
        // };
        this.$$sliderbarItem.forEach(index=>{
            index.onclick=()=>{
                if(!this.isShowBottom)
                {
                  return;
                }
                console.log(`Item触发`);
                this.$sliderbarItemBottom.style.transform = `translateY(${index.offsetTop - index.offsetHeight  * 2.3}px)`;
            }}
            );
          
          this.$sliderbarMain.onclick=()=>{
            if(!this.isShowBottom)
            {
                this.$sliderbarItemBottom.classList.add(`showBottom`);
            }
            else
            {
                return;
            }
            this.isShowBottom=true  
        };
        //设置侧边栏点击事件
        this.$sliderbarOpenBtn.onclick = () => {
            if (this.isShrink) {
               
                this.$sliderbar.classList.remove(`shrink`);
                $$(`.sliderbar .content main p:nth-child(n+2) span:nth-child(2)`).forEach(index => {
                    this.animSet(index, `sliderbarShow`);
                    this.animPlay(index, `播放`);
                })

                this.animSet($(`.sliderbar .content footer p span:nth-child(2)`), `sliderbarShow`);
                this.animPlay($(`.sliderbar .content footer p span:nth-child(2)`), `播放`);

                // for(let indexNum=0;indexNum<this.sliderbarItemTexts.length;indexNum++)
                // {
                //     arraySliderbarItem[indexNum].innerHTML=this.sliderbarItemTexts[indexNum];
                // }
                // this.$sliderbarInfo.innerHTML=this.sliderbarInfoText;
                in$$(this.$sliderbar, `.sliderbar .content .shrink`).forEach(index => {

                    index.classList.remove(`shrink`);
                })
               
                console.log(`开始`);
            }
            else {
                
                $$(`.sliderbar .content main p:nth-child(n+2) span:nth-child(2)`).forEach(index => {
                    this.animSet(index, `sliderbarHide`);
                    this.animPlay(index, `播放`);
                })
                this.animSet($(`.sliderbar .content footer p span:nth-child(2)`), `sliderbarHide`);
                this.animPlay($(`.sliderbar .content footer p span:nth-child(2)`), `播放`);
                this.$sliderbar.classList.add(`shrink`);
                this.$$sliderbarItem.forEach(index => {
                    // let str=index.innerHTML;
                    // index.innerHTML= str.replace(index.innerText,"");
                    index.classList.add(`shrink`);
                });
                //let infoStr=this.$sliderbarInfo.innerHTML;
                //this.$sliderbarInfo.innerHTML=infoStr.replace(this.$sliderbarInfo.innerText,"");
                this.$sliderbarLogoName.classList.add(`shrink`);
                this.$sliderbarInfo.classList.add(`shrink`);
            }
            this.isShrink = !self.isShrink;
        };
        this.$sliderbar.addEventListener("transitionend", (event) => {
            // let isPlayed=event.path.find(index=>index.classList&&index.classList.contains(`sliderbar`));
            let isPlayed = (event.target.className == `sliderbar shadow`);
            //div.sliderbar.shadow
            // console.log(event);
            if (!this.isShrink && isPlayed) {
                console.log("触发");
                // for(let indexNum=0;indexNum<this.sliderbarItemTexts.length;indexNum++)
                // {
                //     arraySliderbarItem[indexNum].innerHTML=this.sliderbarItemTexts[indexNum];
                // }
                // this.$sliderbarInfo.innerHTML=this.sliderbarInfoText;
            }
        })
        //关闭按钮点击事件

        //


    },
    // sizeShrink(){
    //     in$(this.$sliderHeader,`.sliderbar .content header p:nth-child(2)`).width=0;
    //     in$$(this.$sliderbarMain,`p:nth-child(n+1)`);
    // },
    // sizeRestore(){

    // }
    animSet($node, animName) {
        $node.style[`animation-name`] = animName;
    },
    animPlay($node, animStatue) {
        switch (animStatue) {
            case `播放`: {
                $node.style[`animation-play-state`] = `running`;
            }; break;
            default: {
                $node.style[`animation-play-state`] = `paused`;
            };
        }
    }
}

//初始化
const App = {
    init() {
        [...arguments].forEach(Modlue => Modlue.init());
    }
}
//App.init(Menu, Editor,Theme,Print);

function start() {
    let TPL = `## 欢迎使用PPTMarker
               ## 页面1`;//初始PPT语句
    let markdown = localStorage.markdown || TPL;//检测是否存在localStorage.markdown，如果有则传入localStorage.markdown内容，否则传入初始语句
    let $slideContainer = $(`.slides`);
    $slideContainer.innerHTML = convert(markdown);
    Reveal.initialize({
        hash: true,

        // Learn about plugins: https://revealjs.com/plugins/
        plugins: [RevealMarkdown, RevealHighlight, RevealNotes]
    });
}
start();//每次页面刷新调用
App.init(Sliderbar);