import '@logseq/libs'
import React from 'react'
import ReactDOM, { render } from 'react-dom'
import App from './App'
import './index.css'
import { handleClosePopup } from './handleClosePopup';
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas"
import markdownMark from 'markdown-it-mark'
// import mdToPdf from 'md-to-pdf';
// import { mdToPdf } from "md-to-pdf"
// window.html2canvas = html2canvas;

function encodeImage(){
}

let settings:SettingSchemaDesc = 
  {
    key: "css",
    type: 'string',
    default: "",
    title: "Template 1 Css",
    description: "Enter the css for the template 1",
  }
logseq.useSettingsSchema([settings])
export function downloadPDF(){
  const pdf = new jsPDF({
    orientation: 'p',
    unit: 'pt',
    format: 'a4',
    compress: false,
  });
  // var getContent = "<div style='font-size:11px; border:1px solid; background-color: rgb(239 240 240); padding: 05px 15px; width:300px;'>"+document.body+"</div>";

  pdf.html(document.getElementById("you are cool"), {
        callback: (doc) => doc.save('filename342.pdf'),
        margin: 0,
        width: 595,
        windowWidth: 595,
        autoPaging: 'text' 
  });
}



function renderApp(env: string) {
  ReactDOM.render(
    <React.StrictMode>
      <App htmlText={env}/>
    </React.StrictMode>,
    document.getElementById('root')
  )
  logseq.showMainUI()
}
var final3String = "<html><body><h1>Hello YOu are mmean</h1></body><html>"
import markdownIt from 'markdown-it'
import { SettingSchemaDesc } from '@logseq/libs/dist/LSPlugin.user'

async function formatText(text2){
  var text = text2.replace(/:LOGBOOK:|collapsed:: true/gi, '');
      if (text.includes('CLOCK: [')) {
        text = text.substring(0, text.indexOf('CLOCK: ['));
      }

      const rxGetId = /\(\(([^)]*)\)\)/;
            const blockId = rxGetId.exec(text);
            if (blockId != null){
            const block = await logseq.Editor.getBlock(blockId[1], {
              includeChildren: true,
            });
console.log(blockId)
console.log(block)
if (block!= null ){
            text = text.replace(
              `((${blockId[1]}))`,
              block.content.substring(0, block.content.indexOf('id::'))
            )};}

      if (text.indexOf(`\nid:: `) === -1) {
        console.log(text)
        return text;
      } else {
        console.log(text)
        return text.substring(0, text.indexOf(`\nid:: `));
}
}


var md = new markdownIt().use(markdownMark)
// md.inline.ruler.enable([
//   'mark'
// ]);
async function createPDF () {
    const currentBlock = await logseq.Editor.getCurrentPageBlocksTree()
    console.log(currentBlock)
    for (const x in currentBlock){
    parseBlocksTree(currentBlock[x])}
    
    var finalString = `# ${(await logseq.Editor.getCurrentPage()).originalName}`
    
    for (const x in blocks2){
      const formattedText = await formatText(blocks2[x][0])

      finalString = `${finalString}\n\n ${formattedText}`
    }

    const baseCSS = "h1 {     display: block;     font-size: 2em;     margin-block-start: 0.67__qem;     margin-block-end: 0.67em;     margin-inline-start: 0;     margin-inline-end: 0;     font-weight: bold; } :is(article, aside, nav, section) h1 {     font-size: 1.5em;     margin-block-start: 0.83__qem;     margin-block-end: 0.83em; } :is(article, aside, nav, section) :is(article, aside, nav, section) h1 {     font-size: 1.17em;     margin-block-start: 1__qem;     margin-block-end: 1em; } :is(article, aside, nav, section) :is(article, aside, nav, section) :is(article, aside, nav, section) h1 {     font-size: 1.00em;     margin-block-start: 1.33__qem;     margin-block-end: 1.33em; } :is(article, aside, nav, section) :is(article, aside, nav, section) :is(article, aside, nav, section) :is(article, aside, nav, section) h1 {     font-size: .83em;     margin-block-start: 1.67__qem;     margin-block-end: 1.67em; } :is(article, aside, nav, section) :is(article, aside, nav, section) :is(article, aside, nav, section) :is(article, aside, nav, section) :is(article, aside, nav, section) h1 {     font-size: .67em;     margin-block-start: 2.33__qem;     margin-block-end: 2.33em; } h2 {     display: block;     font-size: 1.5em;     margin-block-start: 0.83__qem;     margin-block-end: 0.83em;     margin-inline-start: 0;     margin-inline-end: 0;     font-weight: bold; } h3 {     display: block;     font-size: 1.17em;     margin-block-start: 1__qem;     margin-block-end: 1em;     margin-inline-start: 0;     margin-inline-end: 0;     font-weight: bold; } h4 {     display: block;     margin-block-start: 1.33__qem;     margin-block-end: 1.33em;     margin-inline-start: 0;     margin-inline-end: 0;     font-weight: bold; } h5 {     display: block;     font-size: .83em;     margin-block-start: 1.67__qem;     margin-block-end: 1.67em;     margin-inline-start: 0;     margin-inline-end: 0;     font-weight: bold; } h6 {     display: block;     font-size: .67em;     margin-block-start: 2.33__qem;     margin-block-end: 2.33em;     margin-inline-start: 0;     margin-inline-end: 0;     font-weight: bold; }"
    const settings = logseq.settings
    const css3 = settings.css
    // const css3 = `<style>
    // h2 {
    //     font-size: 10px;
    // }
    // </style>`
    const final2String = md.render(finalString)
    console.log(final2String)
    final3String = (`<html><head><style>${baseCSS}</style></head><body><style>${css3}</style><div id = "you are cool" style='padding: 1rem'">${final2String}</div></body></html>`)
    // let final2String = "<h1>Hello World</h1>\n\n<p>This is a paragraph</p>"
    logseq.App.getCurrentGraph().then(async (graph) => {
      const final4String = final3String.replaceAll("../assets", `${graph.path}/assets`).replaceAll("<strong>", "<span id ='bold'>").replaceAll("</strong>", "</span>").replace("<mark>", "<span id ='italic'>").replace("</mark>", "</span id ='italic'>").replaceAll("<mark>", "</span id ='highlightme'>").replaceAll("</mark>", "</span id ='highlightme'>")
      handleClosePopup()
    renderApp(final4String)
    console.log(final4String)
    })
    
    
    
  blocks2 = []
  
}

var blocks2 = []
function parseBlocksTree(obj){
  conductParsing(obj)
  function conductParsing(obj){
    if (obj.content) {
      let content2 = obj.content
      let level = obj.level
    blocks2.push([content2, level])
      }

      obj.children.map(conductParsing)
  }
console.log(blocks2)
}
const main = async () => {
  console.log(await logseq.App.getCurrentGraph())


  logseq.App.registerUIItem('toolbar', {
    key: 'logseq-plugin-react-boilerplate',
    template: '<a data-on-click="show" class="button"><i class="ti ti-window"></i></a>',
  })
  logseq.provideModel({
    show() {
      // renderApp('logseq')
      // logseq.showMainUI()
      createPDF()
    },
  })

  console.log('Plugin Loaded');

  logseq.App.registerPageMenuItem('Download Page as PDF', createPDF);
  logseq.Editor.registerSlashCommand('Parse Children', async (e) => {
    // insertSomeBlocks(e)
    // createPDF()
logseq.showMainUI()
  }
    
)

};


logseq.ready(main).catch(console.error);
