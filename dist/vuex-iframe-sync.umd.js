!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports):"function"==typeof define&&define.amd?define(["exports"],e):e(t.IframeSync={})}(this,function(t){var e=Object.prototype.toString,i=function(){},n=function(t){return t};function r(t){return function(i){return e.call(i)==="[object "+t+"]"}}var o=r("Function"),s=r("Array");var a="VI_SYNC",d="CHILD_",c="PARENT_",p=function(t){var e=t.el,i=t.origin;this.id=t.id,this.el=e,this.origin=i||"*"};p.prototype.update=function(t,e){this.el&&this.el.contentWindow.postMessage({type:t,payload:e},this.origin)};var f=function(t){var e=t.parent,r=t.store,s=t.convert,a=t.created,d=t.destroyed;this.id=t.id,this.store=r,this.parent=e||window.parent,this.convert=o(s)?s:n,this.createdCallback=o(a)?a:i,this.destroyedCallback=o(d)?d:i,this.init()};f.prototype.init=function(){var t=this,e=this.id,i=this.store,n=i._mutations,r=f.parentPrefix,o=f.childPrefix;Object.entries(n).forEach(function(t){n[r+t[0]]=t[1]}),n[r+"INIT_STATE"]=[function(t){Object.assign(i.state,t)}],i.subscribe(function(i,n){var s=i.type,a=i.payload;s.indexOf(r)>=0||t.send(o+s,{id:e,payload:a})}),window.addEventListener("load",this.load.bind(this)),window.addEventListener("message",this.update.bind(this)),window.addEventListener("beforeunload",this.unLoad.bind(this))},f.prototype.update=function(t){var e=t.data,i=e.type,n=e.payload,r=this.store;(i&&Reflect.has(r._mutations,i)||"INIT_STATE"===i)&&r.commit(f.parentPrefix+i,n)},f.prototype.send=function(t,e){this.parent&&this.parent.postMessage({type:t,payload:this.convert(e)},this.parent.location&&this.parent.location.origin)},f.prototype.load=function(){this.send(f.moduleName+"/ADD_IN_BROADCAST_LIST",this.id),this.created()},f.prototype.unLoad=function(){this.send(f.moduleName+"/DEL_IN_BROADCAST_LIST",this.id),this.destroyed()},f.prototype.created=function(){this.createdCallback(this.id,this.store,this.send.bind(this))},f.prototype.destroyed=function(){this.destroyedCallback(this.id,this.store,this.send.bind(this))},f.moduleName="",f.parentPrefix="",f.childPrefix="";var u=function(t){var e=t.ids,i=t.store,r=t.convert;this.childs="string"==typeof e?e.split(",").map(function(t){return{id:t}}):s(e)?e:[],this.observerList=[],this.store=i,this.convert=o(r)?r:n,this.init()};u.prototype.addObserver=function(t){var e=this.childs.find(function(e){return e.id===t});if(e){var i=document.getElementById(t);if(i&&"IFRAME"===i.tagName){var n=new p({id:t,origin:e.origin,el:i});return this.observerList.push(n),this.notifyObserver(n,{type:"INIT_STATE",payload:function(t,e){void 0===e&&(e=[]);var i={};for(var n in t)e.indexOf(n)<0&&(i[n]=t[n]);return i}(this.store.state,[u.moduleName])}),n}}},u.prototype.deleteObserver=function(t){var e=this.observerList.map(function(t){return t.id}).indexOf(t);e>=0&&this.observerList.splice(e,1)},u.prototype.notifyObserver=function(t,e){t.update(e.type,this.convert(e.payload))},u.prototype.notifyObservers=function(t){for(var e=t.id,i=t.type,n=t.payload,r=0,o=this.observerList.filter(function(t){return t.id!==e});r<o.length;r+=1){this.notifyObserver(o[r],{type:i,payload:n})}},u.prototype.init=function(){var t,e=this,i=e.store._mutations,n=u.moduleName,r=u.childPrefix;e.store.registerModule(n,{namespaced:!0,mutations:(t={},t.ADD_IN_BROADCAST_LIST=function(t,i){e.addObserver(i)},t.DEL_IN_BROADCAST_LIST=function(t,i){e.deleteObserver(i)},t)}),Object.entries(i).forEach(function(t){var n=t[0];i[r+n]=t[1].map(function(t){return function(i){var r=i.id,o=i.payload;t(o),e.notifyObservers({id:r,type:n,payload:o})}})});var o=new RegExp("^("+r+"|"+n+")");e.store.subscribe(function(t,i){var n=t.type,r=t.payload;o.test(n)||e.notifyObservers({type:n,payload:r})}),window.addEventListener("message",this.update.bind(this))},u.prototype.update=function(t){var e=t.data,i=e.type,n=e.payload,r=this.store;i&&Reflect.has(r._mutations,i)&&r.commit(i,n)},u.moduleName="",u.parentPrefix="",u.childPrefix="";t.broadcast=function(t,e){return void 0===e&&(e={}),function(i){var n=e.parentPrefix,r=e.childPrefix,o=e.convert;return u.moduleName=e.moduleName||a,u.parentPrefix=n||c,u.childPrefix=r||d,new u({ids:t,store:i,convert:o})}},t.transfer=function(t){return void 0===t&&(t={}),function(e){var i=t.parentPrefix,n=t.childPrefix,r=t.convert,o=t.created,s=t.destroyed;return f.moduleName=t.moduleName||a,f.parentPrefix=i||c,f.childPrefix=n||d,new f({id:t.id||window.frameElement.id,store:e,convert:r,created:o,destroyed:s})}}});
//# sourceMappingURL=vuex-iframe-sync.umd.js.map