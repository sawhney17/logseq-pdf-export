import "@logseq/libs";
import React from "react";
import ReactDOM from "react-dom";
import App2 from "./App2";
import "./index.css";
import { handleClosePopup } from "./handleClosePopup";
import markdownMark from "markdown-it-mark";
import markdownIt from "markdown-it";
import markdownTable from "markdown-it-multimd-table";
import {
  BlockCommandCallback,
  SettingSchemaDesc,
  StyleOptions,
} from "@logseq/libs/dist/LSPlugin.user";
import App3 from "./App3";
const baseStyleOptions: StyleOptions = {
  key: "printStyle",
  style: `
@media print {    
  * {
    overflow:visible !important;
  }
  
  div[class^="CodeMirror"] {
    overflow:hidden !important;
  }
  
  .cm-s-light > div > textarea {
    display: none;
  }
  .cm-s-solarized.cm-s-light {
    background-color: #fdf6e3 !important;
  }
  
  .CodeMirror-gutters {
    display:none;
  }
  .CodeMirror-linenumber {
    display:none;
  }
  .CodeMirror-sizer {
    margin-left: 1px !important;
    margin-bottom: 1px !important;
    min-height: 10px !important;
  }
  
  .page {
    page-break-after:always;
  }
  #head {
    display:none;
  }
  #left-sidebar {
    display:none;
  }
  #right-sidebar {
    display:none;
  }
  .cp__sidebar-help-btn {
    display:none;
  }
}
`,
};

const handleStyle = () => {
  if (logseq.settings.retainedOptions.includes("Hide Page Properties")) {
    console.log("Hidden");
    logseq.provideStyle({
      key: "printStyle2",
      style: `
      @media print {
        .pre-block {
          display: none;
      }
    }
    `,
    });
  } else {
    logseq.provideStyle({
      key: "printStyle2",
      style: `@media print { .pre-block { } }`,
    });
  }
  if (logseq.settings.retainedOptions.includes("Hide Brackets")) {
    logseq.provideStyle({
      key: "printStyle3",
      style: `
      @media print {
        .bracket {
          display: none;
      }
    }
    `,
    });
  } else {
    logseq.provideStyle({
      key: "printStyle3",
      style: `@media print { .bracket { } }`,
    });
  }
  if (logseq.settings.retainedOptions.includes("Make Bullets Black")) {
    logseq.provideStyle({
      key: "printStyle4",
      style: `
      @media print {
        .bullet-container .bullet {
          -webkit-print-color-adjust: exact;
          background-color: black;
        }
    }
    `,
    });
  } else {
    logseq.provideStyle({
      key: "printStyle4",
      style: `@media print { .bullet-container .bullet { -webkit-print-color-adjust: exact;} }`,
    });
  }
  if (logseq.settings.retainedOptions.includes("Hide Linked References")) {
    console.log("Hide  linked referenced")
    logseq.provideStyle({
      key: "printStyle5",
      style: `
      @media print {
        .references {
          display:none;
        }
        .page-hierarchy {
          display:none;
        }
    }
    `,
    });
  }
  else {
    logseq.provideStyle({
      key: "printStyle5",
      style: `@media print { .references { } .page-hierarchy { } }`,
    });
  }
};
const printPdf = () => {
  //Credits to https://github.com/supery-chen/

  var script = document.createElement("script");
  script.type = "text/javascript";
  script.text = "window.print()";
  parent.document.body.appendChild(script);
  parent.document.body.removeChild(script);
};

const propertyOptions = [
  "Hide Page Properties",
  "Hide Brackets",
  "Inherit logseq CSS",
];
const regularExportPropertyOptions = [
  "Hide Page Properties",
  "Hide Brackets",
  "Make Bullets Black",
  "Hide Linked References",
];
const mainOptions = [
  "Flatten document(No bullets)",
  "Bullets for non top level elements",
  "Bullets througout the document",
];
const blockExportOptions = [
  "Keep title as name of page",
  "Keep title as heading of block",
  "Keep no title",
];

let settings: SettingSchemaDesc[] = [
  {
    key: "retainedOptions",
    type: "enum",
    default: "",
    title: "Retained Formatting Choices",
    enumChoices: regularExportPropertyOptions,
    enumPicker: "checkbox",
    description: "Pick Option for Retained Formatting",
  },
  {
    key: "template1CSS",
    type: "string",
    default: "",
    title: "Template 1 Css",
    description: "Enter the css for the template 1",
  },
  {
    key: "template1Choice",
    type: "enum",
    default: "Bullets for non top level elements",
    title: "Template 1 Choice",
    enumChoices: mainOptions,
    enumPicker: "radio",
    description: "Pick Option for Template 1",
  },
  {
    key: "template1Options",
    type: "enum",
    default: ["Inherit logseq CSS"],
    title: "Template 1 Options",
    enumChoices: propertyOptions,
    enumPicker: "checkbox",
    description: "Pick Options for Template 1",
  },
  {
    key: "template2CSS",
    type: "string",
    default: "",
    title: "Template 2 Css",
    description: "Enter the css for the template 2",
  },
  {
    key: "template2Choice",
    type: "enum",
    default: "Bullets througout the document",
    title: "Template 2 Choice",
    enumChoices: mainOptions,
    enumPicker: "radio",
    description: "Pick Option for Template 2",
  },
  {
    key: "template2Options",
    type: "enum",
    default: ["Inherit logseq CSS"],
    title: "Template 2 Options",
    enumChoices: propertyOptions,
    enumPicker: "checkbox",
    description: "Pick Options for Template 2",
  },
  {
    key: "template3CSS",
    type: "string",
    default: "",
    title: "Template 3 Css",
    description: "Enter the css for the template 3",
  },
  {
    key: "template3Choice",
    type: "enum",
    default: "",
    title: "Template 3 Choice",
    enumChoices: mainOptions,
    enumPicker: "radio",
    description: "Pick Option for Template 3",
  },
  {
    key: "template3Options",
    type: "enum",
    default: ["Inherit logseq CSS"],
    title: "Template 3 Options",
    enumChoices: propertyOptions,
    enumPicker: "checkbox",
    description: "Pick Options for Template 3",
  },
  {
    key: "blockExportHandling",
    type: "enum",
    default: "Keep title as heading of block",
    title: "How should single block exports be handled?",
    enumChoices: blockExportOptions,
    enumPicker: "radio",
    description: "Pick Options for Template 3",
  },
];

logseq.useSettingsSchema(settings);

export function downloadPDF() {
  window.print();
}

function renderApp(env: string) {
  //If bullet points have been requested
  ReactDOM.render(
    <React.StrictMode>
      <App3 htmlText={env} />
    </React.StrictMode>,
    document.getElementById("root")
  );
  logseq.showMainUI();
}
var final3String = "<html><body><h1>Hello YOu are mmean</h1></body><html>";

async function formatText(text2, template) {
  var text: string = text2.replace(/:LOGBOOK:|collapsed:: true/gi, "");
  if (text.includes("CLOCK: [")) {
    text = text.substring(0, text.indexOf("CLOCK: ["));
  }

  if (logseq.settings[`${template}Options`].includes("Hide Page Properties")) {
    text = text.replaceAll(/((?<=::).*|.*::)/g, "");
  }
  if (logseq.settings[`${template}Options`].includes("Hide Brackets")) {
    text = text.replaceAll("[[", "");
    text = text.replaceAll("]]", "");
  }

  const rxGetId = /\(\(([^)]*)\)\)/;
  const blockId = rxGetId.exec(text);
  if (blockId != null) {
    const block = await logseq.Editor.getBlock(blockId[1], {
      includeChildren: true,
    });
    //optional based on setting enabled

    if (block != null) {
      text = text.replace(
        `((${blockId[1]}))`,
        block.content.substring(0, block.content.indexOf("id::"))
      );
    }
  }

  if (text.indexOf(`\nid:: `) === -1) {
    return text;
  } else {
    return text.substring(0, text.indexOf(`\nid:: `));
  }
}

var md = new markdownIt().use(markdownMark).use(markdownTable);
md.inline.ruler.enable(["mark"]);
export async function createPDF(
  templateName,
  block = undefined,
  fullText = undefined
) {
  var finalString;

  if (fullText != undefined) {
    handleStyle();
    logseq.hideMainUI();

    setTimeout(printPdf, 100);
    // printPdf();
    throw "No text to print";
  }

  const currentBlock = await logseq.Editor.getCurrentPageBlocksTree();
  if (block != undefined) {
    parseBlocksTree(
      await logseq.Editor.getBlock(block, { includeChildren: true })
    );
    if (logseq.settings.blockExportHandling == "Keep title as name of page") {
      finalString = `# ${(await logseq.Editor.getCurrentPage()).originalName}`;
    } else if (
      logseq.settings.blockExportHandling == "Keep title as heading of block"
    ) {
      finalString = `# ${(await logseq.Editor.getBlock(block)).content}`;
    } else {
      finalString = ``;
    }
  } else {
    for (const x in currentBlock) {
      parseBlocksTree(currentBlock[x]);
    }
    finalString = `# ${(await logseq.Editor.getCurrentPage()).originalName}`;
  }

  // var finalString = ``;

  if (
    logseq.settings[`${templateName}Choice`] ==
    "Bullets for non top level elements"
  ) {
    for (const x in blocks2) {
      console.log("Hi");
      if (
        !(
          blocks2[x].uuid == block &&
          logseq.settings.blockExportHandling ==
            "Keep title as heading of block" &&
          block != undefined
        )
      ) {
        var formattedText = await formatText(blocks2[x][0], templateName);
        //if templateName has bullets enabled
        if (blocks2[x][1] > 1) {
          formattedText = "- " + formattedText;
          for (let step = 1; step < blocks2[x][1]; step++) {
            //For each value of step add a space in front of the dash
            formattedText = "  " + formattedText;
          }
        }
        //Filter to remove bullets when they are hastags as well
        console.log(formattedText);
        finalString = `${finalString}\n\n ${formattedText}`;
      }
    }
  } else if (
    logseq.settings[`${templateName}Choice`] == "Bullets througout the document"
  ) {
    for (const x in blocks2) {
      if (
        !(
          Number(x) == 0 &&
          logseq.settings.blockExportHandling ==
            "Keep title as heading of block"
        )
      ) {
        var formattedText = await formatText(blocks2[x][0], templateName);
        console.log(blocks2[x][1]);
        if (blocks2[x][1] > 0) {
          formattedText = "- " + formattedText;
          for (let step = 1; step < blocks2[x][1]; step++) {
            //For each value of step add a space in front of the dash
            formattedText = "  " + formattedText;
          }
        }
        finalString = `${finalString}\n\n ${formattedText}`;
      }
    }
  } else if (
    logseq.settings[`${templateName}Choice`] == "Flatten document(No bullets)"
  ) {
    for (const x in blocks2) {
      if (
        !(
          blocks2[x].uuid == block &&
          logseq.settings.blockExportHandling ==
            "Keep title as heading of block"
        )
      ) {
        var formattedText = await formatText(blocks2[x][0], templateName);

        finalString = `${finalString}\n\n ${formattedText}`;
      }
    }
  }
  finalString = finalString.replaceAll("#+BEGIN_QUOTE", "");
  finalString = finalString.replaceAll("#+END_QUOTE", "");
  // Make logseqs highlights into MD standard
  finalString = finalString.replaceAll("^^", "==");

  const baseCSS =
    "h1 {  display: block;  font-size: 2em;  margin-block-start: 0.67__qem;  margin-block-end: 0.67em;  margin-inline-start: 0;  margin-inline-end: 0;  font-weight: bold;}:is(article, aside, nav, section) h1 {  font-size: 1.5em;  margin-block-start: 0.83__qem;  margin-block-end: 0.83em;}:is(article, aside, nav, section) :is(article, aside, nav, section) h1 {  font-size: 1.17em;  margin-block-start: 1__qem;  margin-block-end: 1em;}:is(article, aside, nav, section)  :is(article, aside, nav, section)  :is(article, aside, nav, section)  h1 {  font-size: 1em;  margin-block-start: 1.33__qem;  margin-block-end: 1.33em;}:is(article, aside, nav, section)  :is(article, aside, nav, section)  :is(article, aside, nav, section)  :is(article, aside, nav, section)  h1 {  font-size: 0.83em;  margin-block-start: 1.67__qem;  margin-block-end: 1.67em;}:is(article, aside, nav, section)  :is(article, aside, nav, section)  :is(article, aside, nav, section)  :is(article, aside, nav, section)  :is(article, aside, nav, section)  h1 {  font-size: 0.67em;  margin-block-start: 2.33__qem;  margin-block-end: 2.33em;}h2 {  display: block;  font-size: 1.5em;  margin-block-start: 0.83__qem;  /* margin-block-end: 0.83em; */  margin-inline-start: 0;  margin-inline-end: 0;  font-weight: bold;}h3 {  display: block;  font-size: 1.17em;  margin-block-start: 1__qem;  /* margin-block-end: 1em; */  margin-inline-start: 0;  margin-inline-end: 0;  font-weight: bold;}h4 {  display: block;  margin-block-start: 1.33__qem;  /* margin-block-end: 1.33em; */  margin-inline-start: 0;  margin-inline-end: 0;  font-weight: bold;}h5 {  display: block;  font-size: 0.83em;  margin-block-start: 1.67__qem;  /* margin-block-end: 1.67em; */  margin-inline-start: 0;  margin-inline-end: 0;  font-weight: bold;}h6 {  display: block;  font-size: 0.67em;  margin-block-start: 2.33__qem;  margin-block-end: 0.2em;  margin-inline-start: 0;  margin-inline-end: 0;  font-weight: bold;} /* lists */ul,menu,dir {  display: block;  list-style-type: disc;  margin-block-start: 1__qem;  margin-block-end: 1em;  margin-inline-start: 0;  margin-inline-end: 0;  padding-inline-start: 40px;}ol {  display: block;  list-style-type: decimal;  margin-block-start: 1__qem;  margin-block-end: 1em;  margin-inline-start: 0;  margin-inline-end: 0;  padding-inline-start: 40px;}li {  display: list-item;  text-align: match-parent;} /* FIXME: this should also match ::before::marker and ::after::marker but we don't support    this yet. When we do, we can remove the code specific to ::before and ::after in    RenderListItem::computeMarkerStyle(), see bugs.webkit.org/b/218897. */::marker {  unicode-bidi: isolate;  font-variant-numeric: tabular-nums;  white-space: pre;  text-transform: none;}ul ul,ol ul {  list-style-type: disc;}ol ol ul,ol ul ul,ul ol ul,ul ul ul {  list-style-type: disc;}dd {  display: block;  margin-inline-start: 40px;}dl {  display: block;  margin-block-start: 1__qem;  margin-block-end: 1em;  margin-inline-start: 0;  margin-inline-end: 0;}dt {  display: block;}ol ul,ul ol,ul ul,ol ol {  margin-block-start: 0;  margin-block-end: 0;}.italic {  font-style: italic;}.bold {  font-weight: bold;}.codeme {  font-family: Menlo, Consolas, Monaco, Liberation Mono, Lucida Console,    monospace;}.br {  display: block;  margin-bottom: 0em;}.brmedium {  display: block;  margin-bottom: 1em;}.brlarge {  display: block;  margin-bottom: 2em;}";
  const settings = logseq.settings;
  const css3 = settings[templateName + "CSS"];

  // console.log(result);
  var final2String = md.render(finalString);
  console.log(finalString);
  console.log(final2String);
  // final2String = result.replace();
  final3String = `<html><head><style>@import url('https://fonts.googleapis.com/css2?family=ZCOOL+XiaoWei&display=swap');</style><style>${baseCSS}</style></head><body><style>${css3}</style><div id = "you are cool" style='padding: 1rem'">${final2String}</div></body></html>`;

  logseq.App.getCurrentGraph().then(async (graph) => {
    var final4String = final3String
      .replaceAll("../assets", `${graph.path}/assets`)
      .replaceAll("<p>BahBahBlackSheepYouAreAMeanSheep</p>", "<br>");
    var final5String = final4String;
    //Add paragraph spacing if all bullets are selected
    console.log(logseq.settings[templateName + "Options"]);
    if (
      logseq.settings[templateName + "Options"].includes("Inherit logseq CSS")
    ) {
      console.log("inheritcss");
      let finalResult =
        "<html>" + top.document.head.innerHTML + final5String + "</html>";
      renderApp(finalResult);
    } else {
      renderApp(final5String);
    }
    handleClosePopup();
  });

  blocks2 = [];
}

var blocks2 = [];
function parseBlocksTree(obj) {
  conductParsing(obj);
  function conductParsing(obj) {
    if (obj.content != "" || obj.content != undefined) {
      let content2 = obj.content;
      let level = obj.level;
      blocks2.push([content2, level]);
    } else if (obj.content == "") {
      let content2 = "BahBahBlackSheepYouAreAMeanSheep";
      let level = 0;
      blocks2.push([content2, level]);
    } else {
      console.log(obj);
    }

    obj.children.map(conductParsing);
  }
}
const main = async () => {
  logseq.App.registerUIItem("toolbar", {
    key: "logseq-pdf-export-plugin",
    template:
      '<a data-on-click="show" class="button"><i class="ti ti-file-export"></i></a>',
  });
  logseq.provideModel({
    show() {
      initializeApp();
    },
  });
  const exportSinglePDF: BlockCommandCallback = async (block) => {
    createPDF("template1", block.uuid);
  };

  logseq.Editor.registerBlockContextMenuItem(
    "Export Block as PDF",
    exportSinglePDF
  );

  function initializeApp() {
    renderSecondApp();
    logseq.showMainUI();
    handleClosePopup();
  }
  function renderSecondApp() {
    ReactDOM.render(
      <React.StrictMode>
        <App2 />
      </React.StrictMode>,
      document.getElementById("root")
    );
  }

  //Credits to https://github.com/supery-chen/ for the below code

  logseq.provideStyle(baseStyleOptions);

  logseq.App.registerPageMenuItem("Download Page as PDF", initializeApp);
};

logseq.ready(main).catch(console.error);
