const $ = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);
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
// //菜单栏
// const Menu = {
//     init() {
//         console.log(`菜单初始化`);
//         this.$settingIcon = $(`.control .icon-shezhi`);
//         this.$menu = $(`.menu`);
//         this.$closeIcon = $(`.menu .icon-guanbi`);
//         this.$$tabs = $$(`.menu .tab`);
//         this.$$contents = $$(`.menu .content`);
//         this.bind();
//     },
//     //事件绑定
//     bind() {
//         //设置按钮点击事件
//         this.$settingIcon.onclick = () => {
//             this.$menu.classList.add(`open`);
//         }
//         //关闭按钮点击事件
//         this.$closeIcon.onclick = () => {
//             this.$menu.classList.remove(`open`);
//         }
//         //
//         this.$$tabs.forEach($tab => $tab.onclick = () => {
//             this.$$tabs.forEach($node => $node.classList.remove(`active`));
//             $tab.classList.add(`active`);
//             let index = [...this.$$tabs].indexOf($tab);
//             this.$$contents.forEach($node => $node.classList.remove(`active`));
//             this.$$contents[index].classList.add(`active`);
//         })

//     }
// }
// //编辑器
// const Editor = {
//     init() {
//         console.log(`编译器初始化`);
//         this.$editInput = $(`.editor textarea`);
//         this.$saveBtn = $(`.editor .button-save`);
//         this.$slideContainer = $(`.slides`);
//         let TPL = `## 欢迎使用PPTMarker`;//初始PPT语句
//         this.markdown = localStorage.markdown || TPL;//检测是否存在localStorage.markdown，如果有则传入localStorage.markdown内容，否则传入初始语句
//         this.bind();
//         this.start();
//     },
//     bind() {
//         //保存按钮点击事件
//         this.$saveBtn.onclick = () => {
//             localStorage.markdown = this.$editInput.value;
//             location.reload();
//         }
//     },
//     //PPT初始化
//     start() {
//         this.$editInput.value = this.markdown;
//         this.$slideContainer.innerHTML = convert(this.markdown);
//         Reveal.initialize({
//             hash: true,

//             // Learn about plugins: https://revealjs.com/plugins/
//             plugins: [RevealMarkdown, RevealHighlight, RevealNotes]
//         });
//     }
// }
// //主题切换
// const Theme = {
//     init() {
//         this.$$figures = $$(`.theme figure`);
//         this.$transition = $(`.theme .transition`);
//         this.$align = $(`.theme .align`);
//         this.$reveal = $(`.reveal`);
//         console.log(this.$transition);
//         this.bind();
//         this.loadTheme();
//     },
//     bind() {
//         //主题界面选择
//         this.$$figures.forEach($figure => $figure.onclick = () => {
//             this.$$figures.forEach($item => $item.classList.remove(`select`));
//             $figure.classList.add(`select`);
//             this.setTheme($figure.dataset.theme);
//         })
//         this.$transition.onchange = function () {
//             localStorage.transition = this.value;
//             location.reload();
//         }
//         this.$align.onchange = function () {
//             localStorage.align = this.value;
//             location.reload();
//         }
//     },
//     setTheme(theme) {
//         localStorage.theme = theme;
//         location.reload();
//     },
//     //读取主题
//     loadTheme() {
//         let theme=localStorage.theme||`beige`;
//         //创建link元素，引用主题CSS
//         let $link=document.createElement(`link`);
//         $link.rel=`stylesheet`;
//         $link.href=`dist/theme/${theme}.css`;
//         document.head.appendChild($link);
//         [...this.$$figures].find($figure=>$figure.dataset.theme===theme).classList.add(`select`);
//         this.$transition.value=localStorage.transition||`slide`;
//         this.$align.value=localStorage.align||`center`;
//         this.$reveal.classList.add(this.$align.value);
//     }
// }
// //Pdf下载
// const Print={
//     init(){
//         this.$download=$(`.download`);
//         this.bind();
//         this.start();
//     },
//     bind(){
//         this.$download.addEventListener(`click`,()=>{
//             let $link=document.createElement(`a`);
//             $link.setAttribute(`target`,`_blank`);
//             $link.setAttribute(`href`,location.href.replace(/#\/.+/,`?print-pdf`));
//             $link.click();
//         })
//         window.onafterprint=()=>window.close();
//     },
//     start(){
//         let link=document.createElement(`link`);
//         link.rel=`stylesheet`;
//         link.type=`text/css`;
//         if(window.location.search.match(/print-pdf/gi))
//         {
//             link.href = 'dist/print/pdf.css';
//             window.print();
//         }else{
//             link.href='dist/print/paper.css';
//         }
//         document.head.appendChild(link);
//     }
//}
//初始化
const App = {
    init() {
        [...arguments].forEach(Modlue => Modlue.init());
    }
}
//App.init(Menu, Editor,Theme,Print);
function loadMarkdown(raw) {
    localStorage.markdown = raw;
    location.reload();
}
function start(){
    let TPL = `## 欢迎使用PPTMarker`;//初始PPT语句
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