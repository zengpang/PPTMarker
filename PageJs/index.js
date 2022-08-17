const isMain=str=>(/^#{1,2}(?!#)/).test(str);
const isSub=str=>(/^#{3}(?!#)/).test(str);
function convert(raw){
    let arr=raw.split(/\n(?=\s*#)/).filter(s=>s!="").map(s=>s.trim());//根据#号分割用户输入内容
    let html=``;
    //遍历用户输入
    for(let i=0;i<arr.length;i++)
    {
        //判断下一行是否为空
        if(arr[i+1]!==undefined){
            switch(true)
            {
                case(isMain(arr[i])&&isMain(arr[i+1])):
                {
                    html+=`
                    <section data-markdown>
                    <textarea data-template>
                    ${arr[i]}
                    </textarea>
                    </section>
                    `
                };break;
                case(isMain(arr[i])&&isSub(arr[i+1])):
                {
                    html+=`
                    <section>
                    <section data-markdown>
                    <textarea data-template>
                    ${arr[i]}
                    </textarea>
                    </section>
                    `
                };break;
                case(isSub(arr[i])&&isSub(arr[i+1])):
                {
                    html+=`
                    <section data-markdown>
                    <textarea data-template>
                    ${arr[i]}
                    </textarea>
                    </section>
                    `
                };break;
                case(isSub(arr[i])&&isMain(arr[i+1])):
                {
                    html+=`
                    <section data-markdown>
                    <textarea data-template>
                    ${arr[i]}
                    </textarea>
                    </section>
                    </section>
                    `
                };break;
            }
        }
        else //如果为空判断遍历到最后一行
        {
             switch(true)
             {
                case(isMain(arr[i])):
                {
                    html+=`
                    <section data-markdown>
                    <textarea data-template>
                    ${arr[i]}
                    </textarea>
                    </section>
                    `
                };break;
                case(isSub(arr[i])):
                {
                    html+=`
                    <section data-markdown>
                    <textarea data-template>
                    ${arr[i]}
                    </textarea>
                    </section>
                    </section>
                    `
                };break;
             }
        }
    }
    return html;
}
function loadMarkdown(raw)
{
    localStorage.markdown=raw;
    location.reload();
}
//PPT初始化
function start(){
    let TPL=`## 欢迎使用PPTMarker`//初始PPT语句
    let html=convert(localStorage.markdown||TPL);//检测是否存在localStorage.markdown，如果有则传入localStorage.markdown内容，否则传入初始语句
    document.querySelector(`.slides`).innerHTML=html;
    Reveal.initialize({
        hash: true,

        // Learn about plugins: https://revealjs.com/plugins/
        plugins: [RevealMarkdown, RevealHighlight, RevealNotes]
    });
}
start();//每次页面刷新调用