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

//配置连接父节点信息
const setNodeFConnect = (node, nodeid) => {
    node.setRightCid(nodeid);
    // node.setRightCid(defalutNodeId + (nodeindex + 1));

    // node.setconnectSPoint(`Right`);
    node.setcREPoint(`Left`);


};
//配置子节点连接父节点
const setNodeSFConnect = (node, nodeid) => {
    node.setfatherid(nodeid);
    // node.setconnectSPoint(`Top`);
    node.setcTEPoint(`Bottom`);
}
//配置连接子节点信息
const setNodeSConnect = (node, nodeid) => {
    node.setsonid(nodeid);
    // node.setconnectSPoint(`Bottom`);
    node.setcBEPoint(`Top`);

}



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
//读取JSON格式的节点位置数据
function readNodeInfoJSON() {
    if (isEmpty(localStorage.nodesInfo)) {
        return;
    }

    let nodesPosInfo = JSON.parse(localStorage.nodesInfo);

    nodesPosInfo.forEach(index => {
        let nodeid = index.nodeId;
        let nodeInfo = nodesInfos.find(index => index.getNodeId() == nodeid);

        // if (!isEmpty(nodeInfo)) {


        //     switch (true) {
        //         case (isEmpty(nodeInfo.getLeftCid()) && !isEmpty(index.nodeLeftid)): {
        //             nodeInfo.setLeftCid(index.nodeLeftid);

        //         };
        //         case (isEmpty(nodeInfo.getRightCid()) && !isEmpty(index.nodeRightid)): {
        //             nodeInfo.setRightCid(index.nodeRightid);
        //         };
        //         case (isEmpty(nodeInfo.getfatherid()) && !isEmpty(index.nodeFid)): {
        //             nodeInfo.setfatherid(index.nodeFid);
        //         };
        //         case (isEmpty(nodeInfo.getsonid()) && !isEmpty(index.nodeSid)): {
        //             nodeInfo.setsonid(index.nodeSid);
        //         }
        //         case (isEmpty(nodeInfo.getcLEPoint()) && !isEmpty(index.nodeCLEPoint)): {
        //             nodeInfo.setcLEPoint(index.nodeCLEPoint);
        //         };
        //         case (isEmpty(nodeInfo.getcREPoint()) && !isEmpty(index.nodeCREPoint)): {
        //             nodeInfo.setcREPoint(index.nodeCREPoint);

        //         };
        //         case (isEmpty(nodeInfo.getcTEPoint()) && !isEmpty(index.nodeCTEPoint)): {
        //             nodeInfo.setcTEPoint(index.nodeCTEPoint);
        //         };
        //         case (isEmpty(nodeInfo.getcBEPoint()) && !isEmpty(index.nodeCBEPoint)): {
        //             nodeInfo.setcBEPoint(index.nodeCBEPoint);
        //         };
        //     }

        //     // let nodeElement = document.getElementById(index.nodeId);
        //     // if (nodeElement != null) {
        //     //     nodeElement.style.left = index.nodePosX;
        //     //     nodeElement.style.top = index.nodePosY;
        //     // }
        // }

    })
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
//节点信息实体类
class NodeInfo {
    constructor() {

    }
    //节点基础信息
    setNodeName(nodeName) {
        this.nodeName = nodeName;
    }
    getNodeName() {
        return this.nodeName;
    }
    setNodeId(nodeId) {
        this.nodeId = nodeId;
    }
    getNodeId() {
        return this.nodeId;
    }
    setNodeType(nodeType) {
        this.nodeType = nodeType;
    }
    getNodeType() {
        return this.nodeType;
    }
    setNodeX(nodePosX) {
        this.nodePosX = nodePosX;
    }
    getNodeX() {
        return this.nodePosX;
    }
    setNodeY(nodePosY) {
        this.nodePosY = nodePosY;
    }
    getNodeY() {
        return this.nodePosY;
    }
    setNodeContent(nodeContent) {
        this.nodeContent = nodeContent;
    }
    getNodeContent() {
        return this.nodeContent;
    }

    //节点连接对象目标点

    //左连接对象目标点
    setcLEPoint(cLEPoint) {
        this.cLEPoint = cLEPoint;
    }
    getcLEPoint() {
        return this.cLEPoint;
    }
    setcREPoint(cREPoint) {
        this.cREPoint = cREPoint;
    }
    getcREPoint() {
        return this.cREPoint;
    }
    setcTEPoint(cTEPoint) {
        this.cTEPoint = cTEPoint;
    }
    getcTEPoint() {
        return this.cTEPoint;
    }
    setcBEPoint(cBEPoint) {
        this.cBEPoint = cBEPoint;
    }
    getcBEPoint() {
        return this.cBEPoint;
    }

    //连接对象id
    setsonid(sonid) {
        this.sonid = sonid;
    }
    getsonid() {
        return this.sonid;
    }
    setRightCid(rightid) {
        this.rightid = rightid;
    }
    getRightCid() {
        return this.rightid;
    }

    setfatherid(fatherid) {
        this.fatherid = fatherid;
    }
    getfatherid() {
        return this.fatherid;
    }
    setLeftCid(leftid) {
        this.leftid = leftid;
    }
    getLeftCid() {
        return this.leftid;
    }

}
class NodeItem {
    constructor(nodeid) {
        this.nodeid = nodeid;
        this.sonNode = null;
        this.bortherNode = null;
    }

}
class NodeItemList {
    constructor(NodeItem) {
        this.head = NodeItem;
    }
    find(nodeitemID) {
        // let currentNode = this.head;
        // while (currentNode != null && currentNode.nodeinfo.getNodeId() != nodeitemID) {
        //     currentNode = currentNode.nextnode;
        // }
        // return currentNode;
        let cbortherNode = this.head.bortherNode;
        while (cbortherNode != null && cbortherNode.nodeid != nodeitemID) {
            cbortherNode = cbortherNode.bortherNode;
        }
        if (cbortherNode != null) {
            return cbortherNode;
        }
        let csonNode = this.head.sonNode;
        while (csonNode != null && csonNode.nodeid != nodeitemID) {
            csonNode = csonNode.sonNode;
        }
        if (csonNode != null) {
            return csonNode;
        }
    }
    retLast() {
        let currentNode = this.head;
        while (currentNode.nextnode != null) {
            currentNode = currentNode.nextnode;
        }
        return currentNode;
    }
    insert(nodeinfo, nodeitemID) {
        const newNode = new NodeItem(nodeinfo);
        const findnode = this.find(nodeitemID);
        newNode.nextnode = findnode.nextnode;
        findnode.nextnode = newNode;
    }
    AddItem(nodeinfo) {
        const newNode = new NodeItem(nodeinfo);
        this.retLast().nextnode = newNode;
    }
    remove(nodeitemID) {
        const findnode = this.find(nodeitemID);
        if (findnode.nextnode != null) {
            findnode.nextnode = findnode.nextnode.nextnode;
        }
    }

}
//markdown转节点
function convertToNode(raw) {
    let arr = raw.split(/\n(?=\s*#)/).filter(s => s != "").map(s => s.trim());
    // let nodeList=``;
    let nodes = new Array().fill(``);
    // let mainnodes=new Array().fill(``);
    // let nodeInfo = new NodeInfo();
    // nodeInfo.setNodeName(`节点五`);
    // nodeInfo.setNodeId(`node5`);
    // nodeInfo.setNodeType(`father`);
    // nodeInfo.setNodeX(nodeDPosX);
    // nodeInfo.setNodeY(nodeDposY);
    let nowMain = ``;
    // arr.forEach(index=>{
    //     if(isMain(index))
    //     {
    //         mainnodes.push(index);
    //     }
    // })

    for (let i = 0; i < arr.length; i++) {
        let nodeinfoStrs = arr[i].split(/#+|\n/);
        nodeinfoStrs.forEach(index => {
            index.trim();
        });
        let nodeInfoItem = new NodeInfo();
        nodeInfoItem.setNodeName(nodeinfoStrs[1].replace(`-->`, ``).split(/<!--/)[0]);

        let nodeContentStr = ``;
        for (let i = 2; i < nodeinfoStrs.length; i++) {
            nodeContentStr += nodeinfoStrs[i];
        }
        nodeInfoItem.setNodeContent(nodeContentStr);
        let nodeloadid = (nodeinfoStrs[1].replace(`-->`, ``).split(/<!--/)[1]).trim();
        if (!isEmpty(nodeloadid) && !window.isNaN(parseInt(nodeloadid.replace(defalutNodeId, ``)))) {
            nodeInfoItem.setNodeId(nodeloadid);
            nodeindex = parseInt(nodeloadid.replace(defalutNodeId, ``));
        }
        else if (!isEmpty(nodeloadid) && window.isNaN(parseInt(nodeloadid.replace(defalutNodeId, ``)))) {
            nodeInfoItem.setNodeId(nodeloadid);
        }
        else {
            nodeInfoItem.setNodeId(defalutNodeId + nodeindex);
        }
        // console.log(nodeinfoStrs[1].replace(`-->`, ``).split(/<!--/)[1].replace(defalutNodeId,``));
        // nodeInfoItem.setNodeId((nodeinfoStrs[1].replace(`-->`, ``).split(/<!--/)[1] || defalutNodeId + nodeindex).trim());
        //  console.log((nodeinfoStrs[1].replace(`-->`,``).split(/<!--/)[1]||defalutNodeId + nodeindex).trim());
        if (isMain(arr[i])) {
            nodeInfoItem.setNodeType(`father`);
            // if(nowMain==``)
            // {


            // mainnodes.push(nodeInfoItem);
            // }

        }
        else {
            nodeInfoItem.setNodeType(`son`);

        }
        nodes[i] = nodeInfoItem;

        nodeindex++;
    }
    for (let i = 0; i < arr.length; i++) {
        if (isMain(arr[i])) {

            // if(nowMain==``)
            // {
            nowMain = nodes[i];

            // mainnodes.push(nodeInfoItem);
            // }

        }
        //判断下一行是否为空
        if (arr[i + 1] !== undefined) {


            switch (true) {

                case (isMain(arr[i]) && isMain(arr[i + 1])):
                    {

                        setNodeFConnect(nodes[i], nodes[i + 1].getNodeId());

                    }; break;
                case (isMain(arr[i]) && isSub(arr[i + 1])):
                    {

                        setNodeSConnect(nodes[i], nodes[i + 1].getNodeId());

                    }; break;
                case (isSub(arr[i]) && isSub(arr[i + 1])):
                    {

                        setNodeSConnect(nodes[i], nodes[i + 1].getNodeId());

                    }; break;
                case (isSub(arr[i]) && isMain(arr[i + 1])):
                    {
                        if (i == 0) {

                            setNodeFConnect(nodes[i], nodes[i + 1].getNodeId());
                        }
                        else if (nowMain != ``) {
                            //    //最近的主节点
                            //   nowMain.setfatherid(``);
                            //    nowMain.setsonid(``);
                            //    //目前遍历到的节点(副节点)
                            //    nodeInfoItem.setRightCid(``);
                            //连接的样式是统一的
                            //设置一个节点的连接样式是从左到右的话，该节点所有连接样式都会变成从左到右
                            //所以先将最近的主节点与第一个子节点进行分离，然后进行再连接，由第一个子节点发出
                            setNodeFConnect(nowMain, nodes[i + 1].getNodeId());
                            //    setNodeSFConnect(nodeInfoItem,nowMain.getNodeId());
                        }
                        else {
                            nodes[i].setsonid(``);
                            nodes[i].setRightCid(``);
                            nowMain.setfatherid(``);
                        }



                    }; break;
            }
        }
        else //如果为空判断遍历到最后一行
        {
            switch (true) {
                case (isMain(arr[i])):
                    {
                        nodes[i].setsonid(``);
                        nodes[i].setRightCid(``);
                        nowMain.setfatherid(``);
                    }; break;
                case (isSub(arr[i])):
                    {
                        nodes[i].setsonid(``);
                        nodes[i].setRightCid(``);
                        nowMain.setfatherid(``);
                    }; break;
            }
        }
    }

    // if(i==0)
    // {
    //   nodeList=new NodeList(nodeInfoItem);
    // }
    // else
    // {
    //     nodeList.AddItem(nodeInfoItem);
    // }


    return nodes;
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
        this.$sliderbarspeakerContent=$(`.sliderbarContent.speaker`);
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
                    //编辑器
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


//节点模板
// <div class="node show" id="node1">
//                 <header><input type="text" placeholder="节点名称"></input><p class="iconfont icon-close closeBtn"></p></header>
//                 <main>
//                  <div class="item">
//                     <select class="nodeContent">
//                         <option value="bolid">加粗</option>
//                         <option value="italic">斜体</option>
//                         <option value="italicbolid">斜体加粗</option>
//                         <option value="deleteline">删除线</option>
//                     </select>
//                     <input type="text"></input>
//                  </div>

//                 </main>
//                 <footer>
//                     <button>新增节点内容</button>
//                 </footer>
//                </div> 
//          </div>
// <!--<div class="node show sonNode" id="node2">
//  <header><p contenteditable="true">节点头</p></header>
//  <main>
//   <div class="item">
//      <select class="nodeContent">
//          <option value="bolid">加粗</option>
//          <option value="italic">斜体</option>
//          <option value="italicbolid">斜体加粗</option>
//          <option value="deleteline">删除线</option>
//      </select>
//      <input type="text"></input>
//   </div>

//  </main>
//  <footer>
//      <button>新增节点内容</button>
//  </footer>
// </div>

//节点
class MarkdownNode {
    //nodeName, nodeID, $nodeDrawing, nodeType, nodePosX, nodePosY
    constructor(nodeInfo, $nodeDrawing) {
        this.nodeName = nodeInfo.getNodeName();
        this.nodeID = nodeInfo.getNodeId();
        this.$nodeDrawing = $nodeDrawing;
        this.nodeType = nodeInfo.getNodeType();
        this.isConnect = true;
        this.nodeInfo = nodeInfo;

        if (isEmpty(nodeInfo.getNodeX())) {
            nodeInfo.setNodeX(nodeDPosX);
        }
        if (isEmpty(nodeInfo.getNodeY())) {
            nodeInfo.setNodeY(nodeDposY);
        }
        if (isEmpty(nodeInfo.getNodeContent())) {
            nodeInfo.setNodeContent(``);
        }
  
        this.connectLeftid = nodeInfo.getLeftCid();
        this.connectRightid = nodeInfo.getRightCid();
        this.connectTopid = nodeInfo.getfatherid();
        this.connectBottomid = nodeInfo.getsonid();

        this.cLEndPoint = nodeInfo.getcLEPoint();
        this.cREndPoint = nodeInfo.getcREPoint();
        this.cTEndPoint = nodeInfo.getcTEPoint();
        this.cBEndPoint = nodeInfo.getcBEPoint();
        this.isConnect = true;
  

        this.nodePosX = nodeInfo.nodePosX;
        this.nodePosY = nodeInfo.nodePosY;
        this.nodeContent = nodeInfo.getNodeContent();
        this.render();
        this.bind();

    }
    render() {

        let $node = create$(`div`, [`node`, `show`], this.nodeID);
        let $nodeHeader = create$(`header`);
        let $nodeHeaderp = create$(`input`);
        set$($nodeHeaderp, `placeholder`, this.nodeName, '');
        $nodeHeaderp.oninput = () => {
            this.nodeHeaderEvent();
        }
        let $nodeHCloseBtn = create$(`p`, [`iconfont`, `icon-close`, `closeBtn`]);

        let $nodemain = create$(`main`);
        let $nodemainitem = create$(`div`, `item`);
        //节点尾部
        let $nodefooter = create$(`footer`);
        let $nodebtn = create$(`button`);
        set$($nodebtn, ``, ``, '新增节点内容');
        this.$node = $node;
        this.$nodebtn = $nodebtn;
        this.$nodeHeaderp = $nodeHeaderp;
        this.$nodeCloseBtn = $nodeHCloseBtn;
        $nodefooter.appendChild($nodebtn);
        $nodemain.appendChild($nodemainitem);
        $nodeHeader.appendChild($nodeHeaderp);
        $nodeHeader.appendChild($nodeHCloseBtn);
        $node.appendChild($nodeHeader);
        $node.appendChild($nodemain);
        $node.appendChild($nodefooter);

        this.$nodemainitem = $nodemainitem;


        if (this.nodeContent != ``) {

            this.nodeContent.split(/<br>/).forEach(index => {
                if (index != ``) {
                    switch (true) {
                        case ((/~~/.test(index))): {
                            this.nodeAddInput(index.replace(/\*+|~+|<br>/g, ``), `deleteline`);
                        }; break;
                        case ((/^\*{3}}/.test(index))): {

                            this.nodeAddInput(index.replace(/\*+|~+|<br>/g, ``), `italicbolid`);
                        }; break;
                        case ((/^\*{2}/.test(index))): {

                            this.nodeAddInput(index.replace(/\*+|~+|<br>/g, ``), `bolid`);
                        }; break;
                        case ((/^\*{1}/).test(index)): {

                            this.nodeAddInput(index.replace(/\*+|~+|<br>/g, ``), `italic`);
                        }; break;

                    }
                }
            });
            // this.nodeContent.split(/\*+|~+|<br>/).forEach(index => {
            //     if (index != ``) {
            //         this.nodeAddInput(index);
            //     }
            // })
        }
        else {
            this.nodeAddInput(``);
        }
        this.$nodeDrawing.appendChild($node);
        $node.style.left = this.nodePosX;
        $node.style.top = this.nodePosY;
        self = this;
        if (this.nodeType == `son`) {
            $node.classList.add(`sonNode`);
            jsPlumb.ready(function () {
                var common = {
                    isSource: true,
                    isTarget: true,
                    connector: ['Bezier'],

                    connectorStyle: {
                        //#00a8ff父节点连接颜色
                        outlineStroke: '#00a8ff',
                        //#4cd137子节点连接颜色
                        strokeWidth: 1
                    },
                    connectorHoverStyle: {
                        strokeWidth: 3
                    }

                };

                // jsPlumb.addEndpoint($node.id, {
                //     anchor: 'Left'
                // }, common);
                // jsPlumb.addEndpoint($node.id, {
                //     anchor: 'Right'
                // }, common);
                jsPlumb.addEndpoint($node.id, {
                    anchor: 'Bottom'
                }, common);
                jsPlumb.addEndpoint($node.id, {
                    anchor: 'Top'
                }, common);
                jsPlumb.bind('connection', function (conn, originalEvent) {

                    connectEvent(conn);
                });
                jsPlumb.bind(`connectionDetached`, function (conn, originalEvent) {
                    connectDeleteEvent(conn);
                });
                jsPlumb.draggable($node.id, { containment: self.$nodeDrawing.id });
            });
        }
        else {

            jsPlumb.ready(function () {
                var common = {
                    isSource: true,
                    isTarget: true,
                    connector: ['Bezier'],

                    connectorStyle: {
                        //#00a8ff父节点连接颜色
                        outlineStroke: '#00a8ff',
                        //#4cd137子节点连接颜色
                        strokeWidth: 1
                    },
                    connectorHoverStyle: {
                        strokeWidth: 3
                    }
                };

                jsPlumb.addEndpoint($node.id, {
                    anchor: 'Left'
                }, common);
                jsPlumb.addEndpoint($node.id, {
                    anchor: 'Right'
                }, common);
                jsPlumb.addEndpoint($node.id, {
                    anchor: 'Bottom'
                }, common);
                jsPlumb.bind('connection', function (conn, originalEvent) {
                    connectEvent(conn);
                });
                jsPlumb.bind(`connectionDetached`, function (conn, originalEvent) {
                    connectDeleteEvent(conn);
                });
                jsPlumb.draggable($node.id, { containment: self.$nodeDrawing.id });
            });
        }

    };
    bind() {
        self = this;
        //节点添加内容
        this.$nodebtn.onclick = () => {

            this.nodeAddInput();
        }
        //删除节点
        this.$nodeCloseBtn.onclick = () => {

            delete nodesInfos[nodesInfos.map(index => { return index.getNodeId() }).indexOf(this.nodeID)];
            jsPlumb.remove(this.nodeID);

        }
    };
    //节点头部输入框事件
    nodeHeaderEvent() {
        if (this.$nodeHeaderp.value != null) {
            this.nodeName = this.$nodeHeaderp.value;
            this.nodeInfo.setNodeName(this.nodeName);
        }
    };
    //添加输入框
    nodeAddInput(contentStr, contentType) {
        if (isEmpty(contentStr)) {
            contentStr = ``;
        }
        if (isEmpty(contentType)) {
            contentType = `bolid`;
        }
        //下拉框
        let $nodeContent = create$(`select`, `nodeContent`);
        let $nodeContentOption1 = create$(`option`);
        set$($nodeContentOption1, `value`, `bolid`, `加粗`);
        let $nodeContentOption2 = create$(`option`);
        $nodeContentOption2.setAttribute(`value`, `italic`);
        set$($nodeContentOption2, `value`, `italic`, `斜体`);
        let $nodeContentOption3 = create$(`option`);
        set$($nodeContentOption3, `value`, `italicbolid`, `斜体加粗`);
        let $nodeContentOption4 = create$(`option`);
        set$($nodeContentOption4, `value`, `deleteline`, `删除线`);
        //节点输入框
        let $nodeInput = create$(`input`);
        set$($nodeInput, `type`, `text`, '');

        $nodeContent.appendChild($nodeContentOption1);
        $nodeContent.appendChild($nodeContentOption2);
        $nodeContent.appendChild($nodeContentOption3);
        $nodeContent.appendChild($nodeContentOption4);
        $nodeInput.value = contentStr;
        $nodeContent.value = contentType;
        this.$nodemainitem.appendChild($nodeContent);
        this.$nodemainitem.appendChild($nodeInput);
    };


}

//节点绘制板块
const NodeDrawing = {
    init() {
        this.$nodeDrawing = $(`.sliderbarContent.node .nodeDrawing`);
        this.$savepointBtn = $(`.sliderbarContent.node .buttons button.save`);
        this.$addFPpointBtn = $(`.sliderbarContent.node .buttons button.addFPpoint`);
        this.$addSppointBtn = $(`.sliderbarContent.node .buttons button.addSPpoint`);
        this.markdown = localStorage.markdown || TPL;//检测是否存在localStorage.markdown，如果有则传入localStorage.markdown内容，否则传入初始语句
        nodesInfos = convertToNode(this.markdown);

        // this.nodes=nodesInfos;
        let markdownNodes = new Array().fill(``);
        //读取JSON字符串
        readNodeInfoJSON();
        for (let index = 0; index < nodesInfos.length; index++) {
            markdownNodes[index] = new MarkdownNode(nodesInfos[index], this.$nodeDrawing);
        };
        readNodePosInfoJSON();
        markdownNodes.forEach(index => {
            nodeConnect(index, `Left`, index.cLEndPoint, index.connectLeftid);
            nodeConnect(index, `Right`, index.cREndPoint, index.connectRightid);
            nodeConnect(index, `Top`, index.cTEndPoint, index.connectTopid);
            nodeConnect(index, `Bottom`, index.cBEndPoint, index.connectBottomid);
        });

        //默认节点名
        this.defalutNodeName = `节点`;
        this.bind();
    },
    bind() {
        self = this;
        //添加父按钮
        this.$addFPpointBtn.onclick = () => {
            let nodeinfo = new NodeInfo();
            nodeinfo.setNodeName(this.defalutNodeName + nodeindex);
            nodeinfo.setNodeId(defalutNodeId + nodeindex);
            nodeinfo.setNodeType(`father`);
            nodesInfos.push(nodeinfo);
            new MarkdownNode(nodeinfo, this.$nodeDrawing)
            //this.markdown+=`\n### ${nodeinfo.getNodeName().trim()}`;

            nodeindex++;
        }
        //添加子按钮
        this.$addSppointBtn.onclick = () => {
            let nodeinfo = new NodeInfo();
            nodeinfo.setNodeName(this.defalutNodeName + nodeindex);
            nodeinfo.setNodeId(defalutNodeId + nodeindex);
            nodeinfo.setNodeType(`son`);
            nodesInfos.push(nodeinfo);
            new MarkdownNode(nodeinfo, this.$nodeDrawing);
            //this.markdown+=`\n## ${nodeinfo.getNodeName().trim()}`;

            nodeindex++;
        }
        //保存按钮
        this.$savepointBtn.onclick = () => {
            nodesJSONStr = "";
            this.markdown = "";

            let fnodeinfos = new Array();
            let cnodeinfos = new Array();
            // let $$nodeContents=in$$(this.$node,`.nodeContent`);
            clearNodeInfoJSON();
            nodesInfos.forEach(index => {
                let node = document.getElementById(index.getNodeId());
                let nodecontent = ``;
                let nodecontenttypes = in$$(node, `.nodeContent`);
                let nodecontentItems = in$$(node, `.item input`);
                for (let index = 0; index < nodecontentItems.length; index++) {
                    switch (nodecontenttypes[index].value) {
                        case `bolid`: {
                            if (!isEmpty(nodecontentItems[index].value)) {
                                nodecontent += `\n**${nodecontentItems[index].value}**<br>`;
                            }
                        }; break;
                        case `italic`: {
                            if (!isEmpty(nodecontentItems[index].value)) {
                                nodecontent += `\n*${nodecontentItems[index].value}*<br>`;
                            }
                        }; break;
                        case `italicbolid`: {
                            if (!isEmpty(nodecontentItems[index].value)) {
                                nodecontent += `\n***${nodecontentItems[index].value}***<br>`;
                            }

                        }; break;
                        case `deleteline`: {
                            if (!isEmpty(nodecontentItems[index].value)) {
                                nodecontent += `\n~~${nodecontentItems[index].value}~~<br>`;
                            }
                        }; break;
                    }
                }
                //in$(node,`.item input`).value
                index.setNodeX(node.style.left);
                index.setNodeY(node.style.top);

                index.setNodeContent(nodecontent);

                writeNodeInfoJSON(index);
                if (index.getNodeType() != `father`) {
                    cnodeinfos.push(index)
                    // this.markdown += `\n### ${index.getNodeName().trim()} \n${index.getNodeContent().trim()}`;
                }
                else {
                    //  this.markdown += `\n## ${index.getNodeName().trim()} \n${index.getNodeContent().trim()}`;
                    fnodeinfos.push(index);

                }
            }
            )
            let leftNode = fnodeinfos[0];
            let rightNode=fnodeinfos[0];
            this.markdown += `\n## ${leftNode.getNodeName().trim()} <!-- ${leftNode.getNodeId()} -->\n${leftNode.getNodeContent().trim()}`;
            this.sonNodefind(leftNode, cnodeinfos);
            while (!isEmpty(leftNode)) {
                if (!isEmpty(leftNode.getLeftCid())) {
                    leftNode = fnodeinfos.find(i=>i.getNodeId()==leftNode.getLeftCid());
                    this.markdown += `\n## ${leftNode.getNodeName().trim()} <!-- ${leftNode.getNodeId()} -->\n${leftNode.getNodeContent().trim()}`;
                    this.sonNodefind(leftNode, cnodeinfos);
                }
                else {
                    leftNode = null;
                }
            }
            while(!isEmpty(rightNode))
            {
                if(!isEmpty(rightNode.getRightCid()))
                {
                    rightNode = fnodeinfos.find(i=>i.getNodeId()==rightNode.getRightCid());
                    this.markdown += `\n## ${rightNode.getNodeName().trim()} <!-- ${rightNode.getNodeId()} -->\n${rightNode.getNodeContent().trim()}`;
                    this.sonNodefind(rightNode, cnodeinfos);
                }
                else
                {
                    rightNode=null;
                }
            }
            localStorage.markdown = this.markdown;
            console.log(this.markdown);
            location.reload();
        }
    },
    //节点遍历
    sonNodefind(index, cnodeinfos) {
        let sonNode = ``;
        if (!isEmpty(index.getsonid())) {
            sonNode = cnodeinfos.find(i => i.getNodeId() == index.getsonid());

            this.markdown += `\n### ${sonNode.getNodeName().trim()} <!-- ${sonNode.getNodeId()} --> \n${sonNode.getNodeContent().trim()}`;
        }
        while (!isEmpty(sonNode)) {
            if (!isEmpty(sonNode.getsonid())) {
                sonNode = cnodeinfos.find(i => i.getNodeId() == sonNode.getsonid());
                this.markdown += `\n### ${sonNode.getNodeName().trim()} <!-- ${sonNode.getNodeId()} -->  \n${sonNode.getNodeContent().trim()}`;
            }
            else {
                sonNode = null;
            }
        }
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
App.init(Sliderbar, Print, Theme, Editor, NodeDrawing);