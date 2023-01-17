//默认节点X坐标
let nodeDPosX = 10;
//默认节点Y坐标
let nodeDposY = 10;
let nodesJSONStr = ``
let nodeindex = 0;
let defalutNodeId = `node`;
let nodesInfos = ``;
let TPL = `## 欢迎使用PPTMarker
## 页面1`;//初始PPT语句
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
const set$ = (element, attributeName, attributeValue, text) => {
    if (element == null) {
        return;
    }
    switch (true) {
        case (attributeName != null && attributeName != ``
            && attributeValue != null && attributeValue != ``): {
                element.setAttribute(attributeName, attributeValue);
            };
        case (text != null && text != ``):
            {
                element.innerHTML = text;
            }; break;
    }
};



// // //配置子节点连接子节点信息
// const setNodeSBConnect=node=>{
//     node.setRightCid(defalutNodeId + (nodeindex + 1));
//     node.setconnectSPoint(`Bottom`);
//     node.setconnectEPoint(`Top`);
// }

const in$ = (f, s) => f.querySelector(s);
const in$$ = (f, s) => f.querySelectorAll(s);
const isMain = str => (/^#{1,2}(?!#)/).test(str);
const isSub = str => (/^#{3}(?!#)/).test(str);
const isEmpty = str => (str == null || str == `` || str === `undefined`);
//node show jtk-endpoint-anchor jtk-draggable jtk-connected 元素连接之后的class
//node show jtk-endpoint-anchor jtk-draggable 元素未连接的class

const isChange = (node1, node2) => {
    let b = 0;
    b = node1;
    node1 = node2;
    node2 = b;
}
const markdownWrite = (node) => {
    let markdownLine = ``;
    if (node.getNodeType() != `father`) {
        markdownLine += `\n### ${node.getNodeName().trim()} \n${node.getNodeContent().trim()}`;
    }
    else {
        markdownLine += `\n## ${node.getNodeName().trim()} \n${node.getNodeContent().trim()}`;
    }
    return markdownLine;
}
function connectDeleteEvent(conn) {
    if (!isEmpty(nodesInfos)) {

        let souceItem = nodesInfos.find(index => index.getNodeId() == conn.source.id);
        let souceid = conn.source.id;
        let targetid = conn.target.id;
        let targetItem = nodesInfos.find(index => index.getNodeId() == conn.target.id);
        // let souceItemIndex=nodesInfos.indexOf(souceItem);
        // let targetItemIndex=nodesInfos.indexOf(targetItem);
        let tEndpoint = conn.targetEndpoint.anchor.type;
        let sEndpoint = conn.sourceEndpoint.anchor.type;
        
        switch (true) {
            case (souceItem.getLeftCid() == targetid): {
                souceItem.setcLEPoint(``);
                souceItem.setLeftCid(``);
            }; break;
            case (souceItem.getRightCid() == targetid): {
                souceItem.setcREPoint(``);
                souceItem.setRightCid(``);
            }; break;
            case (souceItem.getfatherid() == targetid): {
                souceItem.setcTEPoint(``);
                souceItem.setfatherid(``);
            }; break;
            case (souceItem.getsonid() == targetid): {
                souceItem.setcBEPoint(``);
                souceItem.setsonid(``);
            }; break;
        }

        switch (true) {
            case (targetItem.getLeftCid() == souceid): {
                targetItem.setcLEPoint(``);
                targetItem.setLeftCid(``);
            }; break;
            case (targetItem.getRightCid() == souceid): {
                targetItem.setcREPoint(``);
                targetItem.setRightCid(``);
            }; break;
            case (targetItem.getfatherid() == souceid): {
                targetItem.setcTEPoint(``);
                targetItem.setfatherid(``);
            }; break;
            case (targetItem.getsonid() == souceid): {
                targetItem.setcBEPoint(``);
                targetItem.setsonid(``);
            }; break;
        }
        //  if(souceItem.getLeftCid()==targetid)
        //  {
        //     souceItem.setLeftCid()==``;
        //  }
        // switch (sEndpoint) {
        //     case (`Bottom`): {
        //         souceItem.setcBEPoint(``);
        //         souceItem.setsonid(``);


        //     }; break;
        //     case (`Top`): {
        //         souceItem.setcBEPoint(``);
        //         souceItem.setsonid(``);

        //     }; break;
        //     case (`Left`): {
        //         souceItem.setcBEPoint(``);
        //         souceItem.setsonid(``);


        //     }; break;
        //     case (`Right`): {
        //         souceItem.setcBEPoint(``);
        //         souceItem.setsonid(``);


        //     }; break;
        // }
        // switch (tEndpoint) {
        //     case (`Bottom`): {
        //         targetItem.setcBEPoint(``);
        //         targetItem.setsonid(``);


        //     }; break;
        //     case (`Top`): {
        //         targetItem.setcBEPoint(``);
        //         targetItem.setsonid(``);

        //     }; break;
        //     case (`Left`): {
        //         targetItem.setcBEPoint(``);
        //         targetItem.setsonid(``);


        //     }; break;
        //     case (`Right`): {
        //         targetItem.setcBEPoint(``);
        //         targetItem.setsonid(``);


        //     }; break;
        // };
        // console.log(nodesInfos[souceItemIndex]);
        // if(Math.abs(targetItemIndex-souceItemIndex)>1)
        // {
        //      isChange(nodesInfos[targetItemIndex],nodesInfos[(souceItemIndex+1>=nodesInfos.length?souceItemIndex-1:souceItemIndex)]);
        //      console.log(`替换中`);
        // }

    }
}
function connectEvent(conn) {

    if (!isEmpty(nodesInfos)) {

        let souceItem = nodesInfos.find(index => index.getNodeId() == conn.source.id);
        let souceid = conn.source.id;
        let targetid = conn.target.id;
        let targetItem = nodesInfos.find(index => index.getNodeId() == conn.target.id);
        // let souceItemIndex=nodesInfos.indexOf(souceItem);
        // let targetItemIndex=nodesInfos.indexOf(targetItem);
        let tEndpoint = conn.targetEndpoint.anchor.type;
        let sEndpoint = conn.sourceEndpoint.anchor.type;
        // console.log(nodesInfos[souceItemIndex]);
       

        switch (sEndpoint) {
            case (`Bottom`): {
                souceItem.setcBEPoint(tEndpoint);
                souceItem.setsonid(targetid);


            }; break;
            case (`Top`): {
                souceItem.setcTEPoint(tEndpoint);
                souceItem.setfatherid(targetid);
  
            }; break;
            case (`Left`): {
                souceItem.setcLEPoint(tEndpoint);
                souceItem.setLeftCid(targetid);
                console.log(souceItem.getLeftCid());
 
            }; break;
            case (`Right`): {
                souceItem.setcREPoint(tEndpoint);
                souceItem.setRightCid(targetid);
                console.log(souceItem.getRightCid());

            }; break;
        }
        switch (tEndpoint) {
            case (`Bottom`): {
                targetItem.setcBEPoint(sEndpoint);
                targetItem.setsonid(souceid);


            }; break;
            case (`Top`): {
                targetItem.setcTEPoint(sEndpoint);
                targetItem.setfatherid(souceid);

            }; break;
            case (`Left`): {
                targetItem.setcLEPoint(sEndpoint);
                targetItem.setLeftCid(souceid);
                console.log(targetItem.getLeftCid());

            }; break;
            case (`Right`): {
                targetItem.setcREPoint(sEndpoint);
                targetItem.setRightCid(souceid);
                console.log(targetItem.getRightCid());

            }; break;
        };
        // console.log(nodesInfos[souceItemIndex]);
        // if(Math.abs(targetItemIndex-souceItemIndex)>1)
        // {
        //      isChange(nodesInfos[targetItemIndex],nodesInfos[(souceItemIndex+1>=nodesInfos.length?souceItemIndex-1:souceItemIndex)]);
        //      console.log(`替换中`);
        // }

    }

}
//节点连接
function nodeConnect(nodeinfo, connectStartPoint, connectEndPoint, connectID) {
    if (!isEmpty(connectID) && !isEmpty(connectStartPoint) && !isEmpty(connectEndPoint)) {
        jsPlumb.ready(function () {
            console.log(`开始链结` + connectStartPoint + connectEndPoint);
            jsPlumb.connect({
                source: nodeinfo.nodeID,
                target: connectID,

                connector: ['Bezier'],
                paintStyle: {     //#00a8ff父节点连接颜色
                    stroke: '#00a8ff',
                    //#4cd137子节点连接颜色
                    strokeWidth: 3
                },

                anchor: [connectStartPoint, connectEndPoint]
            })
            console.log(`链结结束`);
        });

    }

}
//写入JSON格式的节点位置数据
function writeNodeInfoJSON(nodeinfo) {

    this.nodeId = nodeinfo.getNodeId();

    if (isEmpty(nodeinfo.getNodeX())) {
        nodeinfo.setNodeX(nodeDPosX);
    }
    if (isEmpty(nodeinfo.getNodeY())) {
        nodeinfo.setNodeY(nodeDposY);
    }
    this.nodePosX = nodeinfo.getNodeX();
    this.nodePosY = nodeinfo.getNodeY();
    this.nodeRightid = nodeinfo.getRightCid();
    this.nodeLeftid = nodeinfo.getLeftCid();
    this.nodeFid = nodeinfo.getfatherid();
    this.nodeSid = nodeinfo.getsonid();
    this.nodeCLEPoint = nodeinfo.getcLEPoint();
    this.nodeCREPoint = nodeinfo.getcREPoint();
    this.nodeCTEPoint = nodeinfo.getcTEPoint();
    this.nodeCBEPoint = nodeinfo.getcBEPoint();
    let nodesJSONItem = `{
        "nodeId":"${this.nodeId}",
        "nodePosX":"${this.nodePosX}",
        "nodePosY":"${this.nodePosY}",
        "nodeRightid":"${this.nodeRightid}",
        "nodeLeftid":"${this.nodeLeftid}",
        "nodeFid":"${this.nodeFid}",
        "nodeSid":"${this.nodeSid}",
        "nodeCLEPoint":"${this.nodeCLEPoint}",
        "nodeCREPoint":"${this.nodeCREPoint}",
        "nodeCTEPoint":"${this.nodeCTEPoint}",
        "nodeCBEPoint":"${this.nodeCBEPoint}"
    }`;
    if (nodesJSONStr == ``) {

        nodesJSONItem = nodesJSONItem;

    }
    else {
        nodesJSONItem = `,` + nodesJSONItem;

    }
    nodesJSONStr += nodesJSONItem;
    localStorage.nodesInfo = `[${nodesJSONStr}]`;

}
function clearNodeInfoJSON() {
    localStorage.nodesInfo = ``;
}

function readNodePosInfoJSON() {
    if (isEmpty(localStorage.nodesInfo)) {
        return;
    }

    let nodesPosInfo = JSON.parse(localStorage.nodesInfo);
    // console.log(nodesPosInfo);
    nodesPosInfo.forEach(index => {
        let nodeid = index.nodeId;
        let nodeInfo = nodesInfos.find(index => index.getNodeId() == nodeid);

        if (!isEmpty(nodeInfo)) {



            let nodeElement = document.getElementById(index.nodeId);
            if (nodeElement != null) {
                nodeElement.style.left = index.nodePosX;
                nodeElement.style.top = index.nodePosY;
            }
        }
    })
}
function convert(raw) {
    let arr = raw.split(/\n(?=\s*#)/).filter(s => s != "").map(s => s.trim());//根据#号分割用户输入内容

    let html = ``;
    //遍历用户输入
    for (let i = 0; i < arr.length; i++) {
        // console.log(arr[i].split(/\n+|\sgit +/));
        // console.log((arr[i].split(/#+|\n/)));
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
};



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
        this.$sliderbarspeakerContent=$(`.sliderbarContent.speaker`);
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
                        this.$sliderbarspeakerContent.classList.remove(`show`);
                        this.$sliderbarThemeContent.classList.add(`show`);
                    }; break;
                    //编辑器
                    case `redact`: {
                        console.log(this.$sliderbarRedactContent.classList);
                        this.$sliderbardownloadContent.classList.remove(`show`);
                        this.$sliderbarThemeContent.classList.remove(`show`);
                        this.$sliderbarspeakerContent.classList.remove(`show`);
                        this.$sliderbarRedactContent.classList.add(`show`);
                    }; break;
                   
                    case `download`: {
                        this.$sliderbarThemeContent.classList.remove(`show`);
                        this.$sliderbarRedactContent.classList.remove(`show`);
                        this.$sliderbarspeakerContent.classList.remove(`show`);
                        this.$sliderbardownloadContent.classList.add(`show`);
                    }; break;
                    case `talker`:{
                        this.$sliderbarThemeContent.classList.remove(`show`);
                        this.$sliderbarRedactContent.classList.remove(`show`);
                        this.$sliderbarspeakerContent.classList.add(`show`);
                        this.$sliderbardownloadContent.classList.remove(`show`);
                    };break;
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
                // this.isShrink = true;
            }
            this.isShrink = !this.isShrink;

        };
        this.$sliderbarExitBtn.onclick = () => {
            if (this.isShowBottom) {
                this.$sliderbarItemBottom.classList.remove(`showBottom`);
                this.$sliderbarExitBtn.classList.remove(`showExit`);
                this.isShowBottom = false
            }
            this.$sliderbardownloadContent.classList.remove(`show`);
            this.$sliderbarThemeContent.classList.remove(`show`);
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
    },
    update() {
        this.$editInput.value = this.markdown;
    }
}
//图片上传
const ImgUploader={
    init(){
        //图片上传组件
        this.$fileInput=$(`#img-uploader`);
       
        //代码编辑组件
        this.$textarea=$(`.editor textarea`);
        //初始化
        AV.init({
            appId:"txADom1VtiCCJkIKjhX7kOtQ-gzGzoHsz",
            appKey:"hjUu1qmtdcCDiuXVjpTls9Qs",
            serverURLs:"https://txadom1v.lc-cn-n1-shared.com"
        });
        this.bind();
    },
    bind(){
        let self=this;
        //图片上传监听事件
        this.$fileInput.onchange=function(){
            //判断文件是否上传
            if(this.files.length>0)
            {
                //获取上传文件
                let localFile=this.files[0];
                console.log(localFile);
                if(localFile.size/1048576>2)
                {
                    alert(`文件不能超过2M`);
                    return;
                }
                self.insertText(`![上传中,进度0%]()`);
                //读取文件
                let avFile=new AV.File(encodeURI(localFile.name),localFile);
                //文件上传
                avFile.save({
                    keepFileName:true,
                    //进度条变化监听函数
                    onprogress(progress){
                      self.insertText(`![上传中,进度${progress.percent}%]`);
                    }
                }).then(file=>{
                    console.log(`文件保存完成`);
                    console.log(file);
                    //上传之后，将生成的url图片拼接成markdown
                    let text=`![${file.attributes.name}](${file.attributes.url}?imageView2/0/w/800/h/400)`;
                    //插入markdown语句
                    self.insertText(text);
                }).catch(err=>console.log(err))
            }
        }
    },
    insertText(text=``){
        let $textarea=this.$textarea;
        //光标所选部分得开端位置
        let start=$textarea.selectionStart;
        //光标所选部分得结尾位置
        let end=$textarea.selectionEnd;
        //更改之前得文本内容
        let oldText=$textarea.value;
        //修改组件文本内容为插入之后得文本
        $textarea.value=`${oldText.substring(0,start)}${text} ${oldText.substring(end)}`;
        //聚焦
        $textarea.focus();
        //选中组件中插入得文本
        $textarea.setSelectionRange(start,start+text.length);


    }
}
//Pdf下载
const Print = {
    init() {
        this.$download = $(`.sliderbarContent.download .body.download button`);

        this.bind();
        this.start();
    },
    bind() {
        this.$download.addEventListener(`click`, () => {

            let $link = document.createElement(`a`);
            $link.setAttribute(`target`, `_blank`);
            $link.setAttribute(`href`, location.href.replace(/#\/.+/, ``) + `?print-pdf`);
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
App.init(Sliderbar,ImgUploader, Print, Theme, Editor);