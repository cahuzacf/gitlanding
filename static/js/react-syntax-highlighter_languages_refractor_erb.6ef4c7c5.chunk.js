(this["webpackJsonpgl-landing-page"]=this["webpackJsonpgl-landing-page"]||[]).push([[38,81,120],{525:function(e,n,t){"use strict";function r(e){!function(e){function n(e,n){return"___"+e.toUpperCase()+n+"___"}Object.defineProperties(e.languages["markup-templating"]={},{buildPlaceholders:{value:function(t,r,i,a){if(t.language===r){var s=t.tokenStack=[];t.code=t.code.replace(i,(function(e){if("function"===typeof a&&!a(e))return e;for(var i,o=s.length;-1!==t.code.indexOf(i=n(r,o));)++o;return s[o]=e,i})),t.grammar=e.languages.markup}}},tokenizePlaceholders:{value:function(t,r){if(t.language===r&&t.tokenStack){t.grammar=e.languages[r];var i=0,a=Object.keys(t.tokenStack);!function s(o){for(var l=0;l<o.length&&!(i>=a.length);l++){var g=o[l];if("string"===typeof g||g.content&&"string"===typeof g.content){var u=a[i],d=t.tokenStack[u],p="string"===typeof g?g:g.content,c=n(r,u),b=p.indexOf(c);if(b>-1){++i;var f=p.substring(0,b),m=new e.Token(r,e.tokenize(d,t.grammar),"language-"+r,d),y=p.substring(b+c.length),k=[];f&&k.push.apply(k,s([f])),k.push(m),y&&k.push.apply(k,s([y])),"string"===typeof g?o.splice.apply(o,[l,1].concat(k)):g.content=k}}else g.content&&s(g.content)}return o}(t.tokens)}}}})}(e)}e.exports=r,r.displayName="markupTemplating",r.aliases=[]},529:function(e,n,t){"use strict";function r(e){!function(e){e.languages.ruby=e.languages.extend("clike",{comment:[/#.*/,{pattern:/^=begin\s[\s\S]*?^=end/m,greedy:!0}],keyword:/\b(?:alias|and|BEGIN|begin|break|case|class|def|define_method|defined|do|each|else|elsif|END|end|ensure|false|for|if|in|module|new|next|nil|not|or|protected|private|public|raise|redo|require|rescue|retry|return|self|super|then|throw|true|undef|unless|until|when|while|yield)\b/});var n={pattern:/#\{[^}]+\}/,inside:{delimiter:{pattern:/^#\{|\}$/,alias:"tag"},rest:e.languages.ruby}};delete e.languages.ruby.function,e.languages.insertBefore("ruby","keyword",{regex:[{pattern:/%r([^a-zA-Z0-9\s{(\[<])(?:(?!\1)[^\\]|\\[\s\S])*\1[gim]{0,3}/,greedy:!0,inside:{interpolation:n}},{pattern:/%r\((?:[^()\\]|\\[\s\S])*\)[gim]{0,3}/,greedy:!0,inside:{interpolation:n}},{pattern:/%r\{(?:[^#{}\\]|#(?:\{[^}]+\})?|\\[\s\S])*\}[gim]{0,3}/,greedy:!0,inside:{interpolation:n}},{pattern:/%r\[(?:[^\[\]\\]|\\[\s\S])*\][gim]{0,3}/,greedy:!0,inside:{interpolation:n}},{pattern:/%r<(?:[^<>\\]|\\[\s\S])*>[gim]{0,3}/,greedy:!0,inside:{interpolation:n}},{pattern:/(^|[^/])\/(?!\/)(\[.+?]|\\.|[^/\\\r\n])+\/[gim]{0,3}(?=\s*($|[\r\n,.;})]))/,lookbehind:!0,greedy:!0}],variable:/[@$]+[a-zA-Z_]\w*(?:[?!]|\b)/,symbol:{pattern:/(^|[^:]):[a-zA-Z_]\w*(?:[?!]|\b)/,lookbehind:!0},"method-definition":{pattern:/(\bdef\s+)[\w.]+/,lookbehind:!0,inside:{function:/\w+$/,rest:e.languages.ruby}}}),e.languages.insertBefore("ruby","number",{builtin:/\b(?:Array|Bignum|Binding|Class|Continuation|Dir|Exception|FalseClass|File|Stat|Fixnum|Float|Hash|Integer|IO|MatchData|Method|Module|NilClass|Numeric|Object|Proc|Range|Regexp|String|Struct|TMS|Symbol|ThreadGroup|Thread|Time|TrueClass)\b/,constant:/\b[A-Z]\w*(?:[?!]|\b)/}),e.languages.ruby.string=[{pattern:/%[qQiIwWxs]?([^a-zA-Z0-9\s{(\[<])(?:(?!\1)[^\\]|\\[\s\S])*\1/,greedy:!0,inside:{interpolation:n}},{pattern:/%[qQiIwWxs]?\((?:[^()\\]|\\[\s\S])*\)/,greedy:!0,inside:{interpolation:n}},{pattern:/%[qQiIwWxs]?\{(?:[^#{}\\]|#(?:\{[^}]+\})?|\\[\s\S])*\}/,greedy:!0,inside:{interpolation:n}},{pattern:/%[qQiIwWxs]?\[(?:[^\[\]\\]|\\[\s\S])*\]/,greedy:!0,inside:{interpolation:n}},{pattern:/%[qQiIwWxs]?<(?:[^<>\\]|\\[\s\S])*>/,greedy:!0,inside:{interpolation:n}},{pattern:/("|')(?:#\{[^}]+\}|\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,greedy:!0,inside:{interpolation:n}}],e.languages.rb=e.languages.ruby}(e)}e.exports=r,r.displayName="ruby",r.aliases=["rb"]},603:function(e,n,t){"use strict";var r=t(525),i=t(529);function a(e){e.register(r),e.register(i),function(e){e.languages.erb=e.languages.extend("ruby",{}),e.languages.insertBefore("erb","comment",{delimiter:{pattern:/^<%=?|%>$/,alias:"punctuation"}}),e.hooks.add("before-tokenize",(function(n){e.languages["markup-templating"].buildPlaceholders(n,"erb",/<%=?(?:[^\r\n]|[\r\n](?!=begin)|[\r\n]=begin\s[\s\S]*?^=end)+?%>/gm)})),e.hooks.add("after-tokenize",(function(n){e.languages["markup-templating"].tokenizePlaceholders(n,"erb")}))}(e)}e.exports=a,a.displayName="erb",a.aliases=[]}}]);
//# sourceMappingURL=react-syntax-highlighter_languages_refractor_erb.6ef4c7c5.chunk.js.map