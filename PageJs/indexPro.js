
const $ = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);
const create$ = (type, classNames, id) => {
    let element = document.createElement(type);
    
    if (id != `` && id != null) {
        element.setAttribute(`id`, id);
    }
    switch (true) {
        case (classNames != null && typeof (classNames) == `string`):
            {
                element.classList.add(classNames);
            }; break;
        case (classNames != null && typeof (classNames) == `object` && classNames.length > 0): {
            classNames.forEach(index => {
                element.classList.add(index);
            })
        }; break;
    }
    return element;
};
const set$=(element,attributeName,attributeValue,text)=>{
   if(element==null)
   { 
      return;
   }
   switch(true)
   {
      case(attributeName!=null&&attributeName!=``
      &&attributeValue!=null&&attributeValue!=``):{
        element.setAttribute(attributeName,attributeValue);
      };
      case(text!=null&&text!=``):
      {
        element.innerHTML=text;
      };break;
   }
}
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
function animSet($node, animName) {
    $node.style[`animation-name`] = animName;
}
function animControl($node, animStatue) {
    switch (animStatue) {
        case `播放`: {
            $node.style[`animation-play-state`] = `running`;
        }; break;
        default: {
            $node.style[`animation-play-state`] = `paused`;
        };
    }
}
function animPlay($node, animName) {
    animSet($node, animName);
    animControl($node, "播放");
}
//侧边菜单栏
const Sliderbar = {
    init() {
        console.log(`菜单初始化`);
        this.$sliderbar = $(`.sliderbar`);
        this.$sliderbarOpenBtn = $(`.sliderbar .content header .icon-arrows`);
        this.$sliderHeader = $(`.sliderbar .content header`);
        this.$sliderbarLogoName = $(`.sliderbar .content header p:nth-child(2)`);
        this.$$sliderbarItem = $$(`.sliderbar .content main p:nth-child(n+2)`);
        this.$sliderbarItemBottom = $(`.sliderbar .content main p:nth-child(1)`);
        this.$$sliderbarInfo = $$(`.sliderbar .content footer p `);
        this.$sliderbarExitBtn = [...this.$$sliderbarInfo][0];
        this.$$sliderbarInfoContent = $$(`.sliderbar .content footer p span:nth-child(2)`);
        this.$sliderbarTouch = $(`.sliderbarTouch`);
        this.$sliderbarThemeContent = $(`.sliderbarContent.theme`);
        this.$sliderbarRedactContent = $(`.sliderbarContent.redact`);
        this.$sliderbarNodeContent = $(`.sliderbarContent.node`);
        this.$sliderbardownloadContent = $(`.sliderbarContent.download`);
        this.isShrink = true;
        this.isShowBottom = false;
        this.bind();
    },
    //事件绑定
    bind() {
        self = this;
        this.$sliderbarTouch.onmouseover = () => {
            this.$sliderbar.classList.remove(`hide`);
        }
        this.$sliderbarTouch.onmouseout = () => {
            this.$sliderbar.classList.add(`hide`);
        }
        //设置侧边栏选项点击事件
        this.$$sliderbarItem.forEach(index => {
            index.onclick = () => {
                if (!this.isShowBottom) {

                    this.$sliderbarItemBottom.style.transform = `translateY(${index.offsetTop - index.offsetHeight * 2.3}px)`;
                    this.$sliderbarItemBottom.classList.add(`showBottom`);
                    // this.$sliderbarItemBottom.style.transition=`opacity .3s`;
                    this.$sliderbarExitBtn.classList.add(`showExit`);
                    this.isShowBottom = true
                }
                else {
                    this.$sliderbarItemBottom.style.transition = `all .3s`;
                }
                switch (index.dataset.itemname) {
                    case `theme`: {
                        this.$sliderbarRedactContent.classList.remove(`show`);
                        this.$sliderbardownloadContent.classList.remove(`show`);
                        this.$sliderbarNodeContent.classList.remove(`show`);
                        this.$sliderbarThemeContent.classList.add(`show`);
                    }; break;
                    case `redact`: {
                        this.$sliderbardownloadContent.classList.remove(`show`);
                        this.$sliderbarThemeContent.classList.remove(`show`);
                        this.$sliderbarNodeContent.classList.remove(`show`);
                        this.$sliderbarRedactContent.classList.add(`show`);
                    }; break;
                    case `node`: {
                        this.$sliderbardownloadContent.classList.remove(`show`);
                        this.$sliderbarThemeContent.classList.remove(`show`);
                        this.$sliderbarRedactContent.classList.remove(`show`);
                        this.$sliderbarNodeContent.classList.add(`show`);

                    }; break;
                    case `download`: {
                        this.$sliderbarThemeContent.classList.remove(`show`);
                        this.$sliderbarRedactContent.classList.remove(`show`);
                        this.$sliderbarNodeContent.classList.remove(`show`);
                        this.$sliderbardownloadContent.classList.add(`show`);
                    }; break;
                }
                this.$$sliderbarItem.forEach(index => { index.classList.remove(`seleced`) });
                index.classList.add(`seleced`);
                this.$sliderbarItemBottom.style.transform = `translateY(${index.offsetTop - index.offsetHeight * 2.3}px)`;
            }
        }
        );
        //设置侧边栏点击事件
        this.$sliderbarOpenBtn.onclick = () => {
            if (this.isShrink) {
                this.$sliderbarOpenBtn.classList.add(`unfold`);
                this.$sliderbar.classList.remove(`shrink`);

                $$(`.sliderbar .content main p:nth-child(n+2) span:nth-child(2)`).forEach(index => {
                    animPlay(index, `sliderbarShow`)
                })
                this.$$sliderbarInfoContent.forEach(index => {
                    animPlay(index, `sliderbarShow`);
                });

                animPlay(this.$sliderbarLogoName, `sliderbarShow`);
                in$$(this.$sliderbar, `.sliderbar .content .shrink`).forEach(index => {
                    index.classList.remove(`shrink`);
                })
                console.log(`开始`);
            }
            else {
                this.$sliderbarOpenBtn.classList.remove(`unfold`);
                $$(`.sliderbar .content main p:nth-child(n+2) span:nth-child(2)`).forEach(index => {
                    animPlay(index, `sliderbarHide`)
                })
                this.$$sliderbarInfoContent.forEach(index => {
                    animPlay(index, `sliderbarHide`);
                });
                animPlay(this.$sliderbarLogoName, `sliderbarHide`);
                this.$sliderbar.classList.add(`shrink`);
                this.$$sliderbarItem.forEach(index => {
                    index.classList.add(`shrink`);
                });
                this.$sliderbarLogoName.classList.add(`shrink`);
                this.$$sliderbarInfo.forEach(index => {
                    index.classList.add(`shrink`);
                });

            }
            this.isShrink = !self.isShrink;
        };
        this.$sliderbarExitBtn.onclick = () => {
            if (this.isShowBottom) {
                this.$sliderbarItemBottom.classList.remove(`showBottom`);
                this.$sliderbarExitBtn.classList.remove(`showExit`);
                this.isShowBottom = false
            }
            this.$sliderbardownloadContent.classList.remove(`show`);
            this.$sliderbarThemeContent.classList.remove(`show`);
            this.$sliderbarNodeContent.classList.remove(`show`);
            this.$sliderbarRedactContent.classList.remove(`show`);
        };

    },

}
//主题切换
const Theme = {
    init() {
        this.$$figures = $$(`.theme figure`);
        this.$transition = $(`.theme .transition`);
        this.$align = $(`.theme .align`);
        this.$reveal = $(`.reveal`);
        console.log(this.$transition);
        this.bind();
        this.loadTheme();
    },
    bind() {

        //主题界面选择
        this.$$figures.forEach($figure => $figure.onclick = () => {
            this.$$figures.forEach($item => $item.classList.remove(`select`));
            $figure.classList.add(`select`);
            this.setTheme($figure.dataset.theme);
        })
        this.$transition.onchange = function () {
            localStorage.transition = this.value;

            location.reload();
        }
        this.$align.onchange = function () {
            localStorage.align = this.value;
            location.reload();
        }
    },
    setTheme(theme) {
        localStorage.theme = theme;
        location.reload();
    },
    //读取主题
    loadTheme() {
        let theme = localStorage.theme || `beige`;
        //创建link元素，引用主题CSS
        let $link = document.createElement(`link`);
        $link.rel = `stylesheet`;
        $link.href = `dist/theme/${theme}.css`;
        document.head.appendChild($link);
        [...this.$$figures].find($figure => $figure.dataset.theme === theme).classList.add(`select`);
        this.$transition.value = localStorage.transition || `slide`;
        this.$align.value = localStorage.align || `center`;
        this.$reveal.classList.add(this.$align.value);
    }
}
//编辑器
const Editor = {
    init() {
        console.log(`编译器初始化`);
        this.$editInput = $(`.editor textarea`);
        this.$saveBtn = $(`.editor .button-save`);
        this.$slideContainer = $(`.slides`);
        let TPL = `## 欢迎使用PPTMarker
                   ## 页面1`;//初始PPT语句
        this.markdown = localStorage.markdown || TPL;//检测是否存在localStorage.markdown，如果有则传入localStorage.markdown内容，否则传入初始语句
        this.bind();
        this.start();
    },
    bind() {
        //保存按钮点击事件
        this.$saveBtn.onclick = () => {
            localStorage.markdown = this.$editInput.value;
            location.reload();
        }
    },
    //PPT初始化
    start() {
        this.$editInput.value = this.markdown;
        this.$slideContainer.innerHTML = convert(this.markdown);
        Reveal.initialize({
            controls: true,
            progress: true,
            center: localStorage.align === 'left-top' ? false : true,
            hash: true,
            transition: localStorage.transition || 'slide',
            // Learn about plugins: https://revealjs.com/plugins/
            plugins: [RevealMarkdown, RevealHighlight, RevealNotes]
        });
    }
}
// <div class="node show" id="node1">
// <header><p contenteditable="true">节点头</p></header>
// <main>
//  <div class="item">
//     <select class="nodeContent">
//         <option value="bolid">加粗</option>
//         <option value="italic">斜体</option>
//         <option value="italicbolid">斜体加粗</option>
//         <option value="deleteline">删除线</option>
//     </select>
//     <input type="text"></input>
//  </div>

// </main>
// <footer>
//     <button>新增节点内容</button>
// </footer>
// </div>

//节点
class MarkdownNode {
    constructor(nodeName, nodeID, $nodeDrawing,nodeType) {
        this.nodeName = nodeName;
        this.nodeID = nodeID;
        this.$nodeDrawing = $nodeDrawing;
        this.nodeType=nodeType;
        this.render();
    }
    render() {
        let $node = create$(`div`, [`node`, `show`], this.$nodeID);
        let $nodeHeader = create$(`header`);
        let $nodeHeaderp = create$(`p`);       
        set$($nodeHeaderp,`contenteditable`,`true`,this.nodeName);
        let $nodemain = create$(`main`);
        let $nodemainitem = create$(`div`, `item`);
        //下拉框
        let $nodeContent = create$(`select`, `nodeContent`);
        let $nodeContentOption1 = create$(`option`);
        set$($nodeContentOption1,`value`,`bolid`,`加粗`); 
        let $nodeContentOption2 = create$(`option`);
        $nodeContentOption2.setAttribute(`value`,`italic`);
        set$($nodeContentOption2,`value`,`italic`,`斜体`); 
        let $nodeContentOption3 = create$(`option`);
        set$($nodeContentOption3,`value`,`italicbolid`,`斜体加粗`); 
        let $nodeContentOption4 = create$(`option`);
        set$($nodeContentOption4,`value`,`deleteline`,`删除线`); 
        //节点输入框
        let $nodeInput=create$(`input`);
        set$($nodeInput,`type`,`text`,''); 
        //节点尾部
        let $nodefooter=create$(`footer`);
        let $nodebtn=create$(`button`);
        set$($nodebtn,``,``,'新增节点内容');

        $nodefooter.appendChild($nodebtn);
        $nodeContent.appendChild($nodeContentOption1);
        $nodeContent.appendChild($nodeContentOption2);
        $nodeContent.appendChild($nodeContentOption3);
        $nodeContent.appendChild($nodeContentOption4);
        $nodemainitem.appendChild($nodeContent);
        $nodemainitem.appendChild($nodeInput);
        $nodemain.appendChild($nodemainitem);
        $nodeHeader.appendChild($nodeHeaderp);
        $node.appendChild($nodeHeader);
        $node.appendChild($nodemain);
        $node.appendChild($nodefooter);
        
        if(this.nodeType==`son`)
        {
            $node.classList.add(`sonNode`);

        }
        else
        {

        }
        
    }
    bind() {

    }
}

//节点绘制板块
const NodeDrawing = {
    init() {
        this.$nodeDrawing = $(`.sliderbarContent.node .nodeDrawing`);
        this.$addFPpointBtn = $(`.sliderbarContent.node .buttons button.addFPpoint`);
        this.$addSppointBtn = $(`.sliderbarContent.node .buttons button.addSPpoint`);
        new MarkdownNode(`节点3`, `node3`, this.$nodeDrawing,`father`);
        jsPlumb.ready(function () {
            jsPlumb.setContainer('diagramContainer')

            var common = {
                isSource: true,
                isTarget: true,
                connector: ['Bezier'],
                connectorStyle: {
                    //#00a8ff父节点连接颜色
                    outlineStroke: '#00a8ff',
                    
                    strokeWidth: 1
                  },
                  connectorHoverStyle: {
                    strokeWidth: 3
                  }
            };

            jsPlumb.addEndpoint('node1', {
                anchors: ['Right']
            }, common);

            jsPlumb.addEndpoint('node2', {
                anchor: 'Bottom'
            }, common);

            jsPlumb.addEndpoint('node2', {
                anchor: 'Left'
            }, common);
          
            //  jsPlumb.connect({
            //     source:`node1`,
            //     target:`node2`,
            //     endpoint:`Rectangle`
            //  })
            jsPlumb.draggable(`node1`,{containment:`Drawing`});
            jsPlumb.draggable(`node2`,{containment:`Drawing`});
        })
        this.bind();
    },
    bind() {
        this.$addFPpointBtn.onclick = () => {

        }
        this.$addSppointBtn.onclick = () => {

        }

    }
}
//Pdf下载
const Print = {
    init() {
        this.$download = $(`.sliderbarContent.download .body.download button`);
        console.log(this.$download);
        this.bind();
        this.start();
    },
    bind() {
        this.$download.addEventListener(`click`, () => {
            console.log("下载按钮触发");
            let $link = document.createElement(`a`);
            $link.setAttribute(`target`, `_blank`);
            //  $link.setAttribute(`href`, location.href.replace(/#\/.+/, `?print-pdf`));
            // $link.setAttribute(`href`, location.href + `?print-pdf`);
            $link.setAttribute(`href`, location.href.replace(/#\/.+/, ``) + `?print-pdf`);
            console.log(location.href);
            $link.click();
        })
        window.onafterprint = () => window.close();
    },
    start() {
        let link = document.createElement(`link`);
        link.rel = `stylesheet`;
        link.type = `text/css`;
        if (window.location.search.match(/print-pdf/gi)) {
            link.href = 'dist/print/pdf.css';
            window.print();

        } else {

            link.href = 'dist/print/paper.css';
        }
        document.head.appendChild(link);
    }
}
//初始化
const App = {
    init() {
        [...arguments].forEach(Modlue => Modlue.init());
    }
}
App.init(Sliderbar, Print, Theme, Editor, NodeDrawing);