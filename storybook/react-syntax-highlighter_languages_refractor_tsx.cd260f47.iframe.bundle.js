(window.webpackJsonp=window.webpackJsonp||[]).push([[140,71,143],{"./node_modules/refractor/lang/jsx.js":function(module,exports,__webpack_require__){"use strict";function jsx(Prism){!function(Prism){var javascript=Prism.util.clone(Prism.languages.javascript);Prism.languages.jsx=Prism.languages.extend("markup",javascript),Prism.languages.jsx.tag.pattern=/<\/?(?:[\w.:-]+\s*(?:\s+(?:[\w.:-]+(?:=(?:("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|[^\s{'">=]+|\{(?:\{(?:\{[^}]*\}|[^{}])*\}|[^{}])+\}))?|\{\.{3}[a-z_$][\w$]*(?:\.[a-z_$][\w$]*)*\}))*\s*\/?)?>/i,Prism.languages.jsx.tag.inside.tag.pattern=/^<\/?[^\s>\/]*/i,Prism.languages.jsx.tag.inside["attr-value"].pattern=/=(?!\{)(?:("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|[^\s'">]+)/i,Prism.languages.jsx.tag.inside.tag.inside["class-name"]=/^[A-Z]\w*(?:\.[A-Z]\w*)*$/,Prism.languages.insertBefore("inside","attr-name",{spread:{pattern:/\{\.{3}[a-z_$][\w$]*(?:\.[a-z_$][\w$]*)*\}/,inside:{punctuation:/\.{3}|[{}.]/,"attr-value":/\w+/}}},Prism.languages.jsx.tag),Prism.languages.insertBefore("inside","attr-value",{script:{pattern:/=(\{(?:\{(?:\{[^}]*\}|[^}])*\}|[^}])+\})/i,inside:{"script-punctuation":{pattern:/^=(?={)/,alias:"punctuation"},rest:Prism.languages.jsx},alias:"language-javascript"}},Prism.languages.jsx.tag);var stringifyToken=function(token){return token?"string"==typeof token?token:"string"==typeof token.content?token.content:token.content.map(stringifyToken).join(""):""},walkTokens=function(tokens){for(var openedTags=[],i=0;i<tokens.length;i++){var token=tokens[i],notTagNorBrace=!1;if("string"!=typeof token&&("tag"===token.type&&token.content[0]&&"tag"===token.content[0].type?"</"===token.content[0].content[0].content?openedTags.length>0&&openedTags[openedTags.length-1].tagName===stringifyToken(token.content[0].content[1])&&openedTags.pop():"/>"===token.content[token.content.length-1].content||openedTags.push({tagName:stringifyToken(token.content[0].content[1]),openedBraces:0}):openedTags.length>0&&"punctuation"===token.type&&"{"===token.content?openedTags[openedTags.length-1].openedBraces++:openedTags.length>0&&openedTags[openedTags.length-1].openedBraces>0&&"punctuation"===token.type&&"}"===token.content?openedTags[openedTags.length-1].openedBraces--:notTagNorBrace=!0),(notTagNorBrace||"string"==typeof token)&&openedTags.length>0&&0===openedTags[openedTags.length-1].openedBraces){var plainText=stringifyToken(token);i<tokens.length-1&&("string"==typeof tokens[i+1]||"plain-text"===tokens[i+1].type)&&(plainText+=stringifyToken(tokens[i+1]),tokens.splice(i+1,1)),i>0&&("string"==typeof tokens[i-1]||"plain-text"===tokens[i-1].type)&&(plainText=stringifyToken(tokens[i-1])+plainText,tokens.splice(i-1,1),i--),tokens[i]=new Prism.Token("plain-text",plainText,null,plainText)}token.content&&"string"!=typeof token.content&&walkTokens(token.content)}};Prism.hooks.add("after-tokenize",(function(env){"jsx"!==env.language&&"tsx"!==env.language||walkTokens(env.tokens)}))}(Prism)}module.exports=jsx,jsx.displayName="jsx",jsx.aliases=[]},"./node_modules/refractor/lang/tsx.js":function(module,exports,__webpack_require__){"use strict";var refractorJsx=__webpack_require__("./node_modules/refractor/lang/jsx.js"),refractorTypescript=__webpack_require__("./node_modules/refractor/lang/typescript.js");function tsx(Prism){Prism.register(refractorJsx),Prism.register(refractorTypescript);var typescript=Prism.util.clone(Prism.languages.typescript);Prism.languages.tsx=Prism.languages.extend("jsx",typescript)}module.exports=tsx,tsx.displayName="tsx",tsx.aliases=[]},"./node_modules/refractor/lang/typescript.js":function(module,exports,__webpack_require__){"use strict";function typescript(Prism){Prism.languages.typescript=Prism.languages.extend("javascript",{keyword:/\b(?:abstract|as|async|await|break|case|catch|class|const|constructor|continue|debugger|declare|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|is|keyof|let|module|namespace|new|null|of|package|private|protected|public|readonly|return|require|set|static|super|switch|this|throw|try|type|typeof|var|void|while|with|yield)\b/,builtin:/\b(?:string|Function|any|number|boolean|Array|symbol|console|Promise|unknown|never)\b/}),Prism.languages.ts=Prism.languages.typescript}module.exports=typescript,typescript.displayName="typescript",typescript.aliases=["ts"]}}]);