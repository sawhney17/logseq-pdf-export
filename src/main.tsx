import "@logseq/libs";
import React from "react";
import ReactDOM, { render } from "react-dom";
import App from "./App";
import App2 from "./App2";
import "./index.css";
import { handleClosePopup } from "./handleClosePopup";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import markdownMark from "markdown-it-mark";

const propertyOptions = [
  "Hide Page Properties",
  "Hide Brackets",
  "Hide Bullets",
];
let settings: SettingSchemaDesc[] = [
  {
    key: "template1CSS",
    type: "string",
    default: "",
    title: "Template 1 Css",
    description: "Enter the css for the template 1",
  },
  {
    key: "template1Options",
    type: "enum",
    default: "",
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
    key: "template2Options",
    type: "enum",
    default: "",
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
    key: "template3Options",
    type: "enum",
    default: "",
    title: "Template 3 Options",
    enumChoices: propertyOptions,
    enumPicker: "checkbox",
    description: "Pick Options for Template 3",
  },
];
logseq.useSettingsSchema(settings);
export function downloadPDF() {
  const pdf = new jsPDF({
    orientation: "p",
    unit: "pt",
    format: "a4",
    compress: false,
  });
  // var getContent = "<div style='font-size:11px; border:1px solid; background-color: rgb(239 240 240); padding: 05px 15px; width:300px;'>"+document.body+"</div>";

  pdf.html(document.getElementById("you are cool"), {
    callback: (doc) => doc.save("download.pdf"),
    margin: 0,
    width: 595,
    windowWidth: 595,
    autoPaging: "text",
  });
}

function renderApp(env: string) {
  ReactDOM.render(
    <React.StrictMode>
      <App htmlText={env} />
    </React.StrictMode>,
    document.getElementById("root")
  );
  logseq.showMainUI();
}
var final3String = "<html><body><h1>Hello YOu are mmean</h1></body><html>";
import markdownIt from "markdown-it";
import { SettingSchemaDesc } from "@logseq/libs/dist/LSPlugin.user";

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

var md = new markdownIt().use(markdownMark);
// md.inline.ruler.enable([
//   'mark'
// ]);
export async function createPDF(templateName) {
  const currentBlock = await logseq.Editor.getCurrentPageBlocksTree();
  for (const x in currentBlock) {
    parseBlocksTree(currentBlock[x]);
  }

  var finalString = `# ${(await logseq.Editor.getCurrentPage()).originalName}`;
  var finalString = ``;

  for (const x in blocks2) {
    var formattedText = await formatText(blocks2[x][0], templateName);
    //if templateName has borders enabled
    if (!logseq.settings[`${templateName}Options`].includes("Hide Bullets")) {
      formattedText = "- " + formattedText;
      for (let step = 0; step < blocks2[x][1]; step++) {
        formattedText = "  " + formattedText;
      }
    }
    //Filter to remove bullets when they are hastags as well
    finalString = `${finalString}\n\n ${formattedText}`;
  }

  finalString = finalString.replaceAll("#+BEGIN_QUOTE", "");
  finalString = finalString.replaceAll("#+END_QUOTE", "");

  const baseCSS =
    "h1 {     display: block;     font-size: 2em;     margin-block-start: 0.67__qem;     margin-block-end: 0.67em;     margin-inline-start: 0;     margin-inline-end: 0;     font-weight: bold; } :is(article, aside, nav, section) h1 {     font-size: 1.5em;     margin-block-start: 0.83__qem;     margin-block-end: 0.83em; } :is(article, aside, nav, section) :is(article, aside, nav, section) h1 {     font-size: 1.17em;     margin-block-start: 1__qem;     margin-block-end: 1em; } :is(article, aside, nav, section) :is(article, aside, nav, section) :is(article, aside, nav, section) h1 {     font-size: 1.00em;     margin-block-start: 1.33__qem;     margin-block-end: 1.33em; } :is(article, aside, nav, section) :is(article, aside, nav, section) :is(article, aside, nav, section) :is(article, aside, nav, section) h1 {     font-size: .83em;     margin-block-start: 1.67__qem;     margin-block-end: 1.67em; } :is(article, aside, nav, section) :is(article, aside, nav, section) :is(article, aside, nav, section) :is(article, aside, nav, section) :is(article, aside, nav, section) h1 {     font-size: .67em;     margin-block-start: 2.33__qem;     margin-block-end: 2.33em; } h2 {     display: block;     font-size: 1.5em;     margin-block-start: 0.83__qem;     margin-block-end: 0.83em;     margin-inline-start: 0;     margin-inline-end: 0;     font-weight: bold; } h3 {     display: block;     font-size: 1.17em;     margin-block-start: 1__qem;     margin-block-end: 1em;     margin-inline-start: 0;     margin-inline-end: 0;     font-weight: bold; } h4 {     display: block;     margin-block-start: 1.33__qem;     margin-block-end: 1.33em;     margin-inline-start: 0;     margin-inline-end: 0;     font-weight: bold; } h5 {     display: block;     font-size: .83em;     margin-block-start: 1.67__qem;     margin-block-end: 1.67em;     margin-inline-start: 0;     margin-inline-end: 0;     font-weight: bold; } h6 {     display: block;     font-size: .67em;     margin-block-start: 2.33__qem;     margin-block-end: 2.33em;     margin-inline-start: 0;     margin-inline-end: 0;     font-weight: bold; } /* lists */ ul, menu, dir {     display: block;           margin-block-start: 1__qem;     margin-block-end: 1em;     margin-inline-start: 0;     margin-inline-end: 0;     padding-inline-start: 40px; } ol {     display: block;     list-style-type: decimal;     margin-block-start: 1__qem;     margin-block-end: 1em;     margin-inline-start: 0;     margin-inline-end: 0;     padding-inline-start: 40px; } li {     display: list-item;     text-align: match-parent; } /* FIXME: this should also match ::before::marker and ::after::marker but we don't support    this yet. When we do, we can remove the code specific to ::before and ::after in    RenderListItem::computeMarkerStyle(), see bugs.webkit.org/b/218897. */ ::marker {     unicode-bidi: isolate;     font-variant-numeric: tabular-nums;     white-space: pre;     text-transform: none; transform-origin: 0px 5px 5px;} ul ul, ol ul {       } ol ol ul, ol ul ul, ul ol ul, ul ul ul {       } dd {     display: block;     margin-inline-start: 40px; } dl {     display: block;     margin-block-start: 1__qem;     margin-block-end: 1em;     margin-inline-start: 0;     margin-inline-end: 0; } dt {     display: block; } ol ul, ul ol, ul ul, ol ol {     margin-block-start: 0;     margin-block-end: 0; } .italic{font-style: italic;} .bold{font-weight: bold;} .codeme{font-family: Menlo, Consolas, Monaco, Liberation Mono, Lucida Console, monospace;}";
  const settings = logseq.settings;
  const css3 = settings[templateName + "CSS"];

  var final2String = md.render(finalString);
  final2String = final2String.replace();
  final3String = `<html><head><style>${baseCSS}</style></head><body><style>${css3}</style><div id = "you are cool" style='padding: 1rem'">${final2String}</div></body></html>`;

  logseq.App.getCurrentGraph().then(async (graph) => {
    var final4String = final3String
      .replaceAll("../assets", `${graph.path}/assets`)
      .replaceAll("<strong>", "</span><strong>")
      .replaceAll("<em>", "</span><em>")
      .replaceAll("<code>", "</span><code>")
      .replaceAll("</p>", "</span></p>")
      .replaceAll("<li>", "<li><span>")
      .replaceAll("</li>", "</span></li>")
      .replaceAll("<img>", "\n<img>");

    if (logseq.settings[templateName + "Options"].includes("Hide Bullets")) {
      final4String = final4String.replaceAll("<p>", "<p><span>");
    } else final4String = final4String.replaceAll("<p>", "<p><span>•");
    handleClosePopup();
    renderApp(final4String);
  });

  blocks2 = [];
}

var blocks2 = [];
function parseBlocksTree(obj) {
  conductParsing(obj);
  function conductParsing(obj) {
    if (obj.content) {
      let content2 = obj.content;
      let level = obj.level;
      blocks2.push([content2, level]);
    }

    obj.children.map(conductParsing);
  }
}
const main = async () => {
  logseq.App.registerUIItem("toolbar", {
    key: "logseq-plugin-react-boilerplate",
    template:
      '<a data-on-click="show" class="button"><i class="ti ti-file-export"></i></a>',
  });
  logseq.provideModel({
    show() {
      initializeApp();
    },
  });

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

  logseq.App.registerPageMenuItem("Download Page as PDF", initializeApp);
};

logseq.ready(main).catch(console.error);
