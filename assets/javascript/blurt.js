/*!
* @package: blurt,
* @author: brijeshb42
* @creationDate: 14-10-2014
* @license: MIT
*/
!function(a,b){
    function c(a){
        a.keyCode==m.key.ESC&&g()
    }
    function d(a){
        a?(b.addEventListener("keyup",c),
        q.addEventListener("click",g),
        o=!0):o&&(b.removeEventListener("keyup",c),
        q.removeEventListener("click",g))
    }
    function e(){
        b.body.appendChild(p)}
        function f(b){
            var c={
                title:"Title",
                text:null,
                type:"info",
                okButtonText:"OK",
                escapable:!1
            };
            switch(b.length){
                case 0:
                    return a.console.error("At least 1 argument expected."),null;
                case 1:
                    if("string"==typeof b[0])c.title=b[0],c.text=null,c.type=null;
                else if("object"==typeof b[0]){
                    var d=b[0];
                    c.title=d.title||c.title,
                    c.text=d.text||c.text,
                    c.type=d.type||c.type,
                    c.okButtonText=d.okButtonText||c.okButtonText,
                    c.escapable=d.escapable||c.escapable
                }
                break;
                case 2:
                    if("string"!=typeof b[0]||"string"!=typeof b[1])
                    return a.console.error("Invalid argument type."),null;
                    c.title=b[0],
                    c.text=b[1],
                    c.type="default";
                    break;
                    case 3:
                        if("string"!=typeof b[0]||"string"!=typeof b[1]||"string"!=typeof b[2])
                        return a.console.error("Invalid argument type."),null;
                        c.title=b[0],
                        c.text=b[1],
                        c.type=b[2]
                    }
                        return""===c.text&&(c.text=null),c
                    }
            function g(){
                m.util.removeClass(r,"dialog-anim-show"),
                m.util.addClass(r,"dialog-anim-hide"),
                setTimeout(function(){m.util.setClass(p,m.cls.box),
                    m.util.hide(p),
                    m.util.setClass(r,m.cls.dialog),
                    y.removeEventListener("click",g)
                }
                ,m.constant.hideInterval)
            }
        function h(b){
            var c={
                title:"Title",
                text:"Enter value",
                type:"info",
                okButtonText:"OK",
                cancelButtonText:"Cancel",
                escapable:!1,
                onConfirm:null,
                onCancel:null
            };
            switch(b.length){
                case 0:
                case 1:
                    if("object"!=typeof b[0])
                    return a.console.error("At least 2 arguments or 1 object expected"),null;
                    var d=b[0];
                    c.title=d.title||c.title,
                    c.text=d.text||c.text,
                    c.type=d.type||c.type,
                    c.okButtonText=d.okButtonText||c.okButtonText,
                    c.cancelButtonText=d.cancelButtonText||c.cancelButtonText,
                    c.escapable=d.escapable||c.escapable,d.onConfirm&&"function"==typeof d.onConfirm&&(c.onConfirm=d.onConfirm),
                    d.onCancel&&"function"==typeof d.onCancel&&(c.onCancel=d.onCancel);
                    break;
                    case 2:
                        return"string"==typeof b[0]&&"function"==typeof b[1]?(c.title=b[0],
                            c.onConfirm=b[1],c):(a.console.error("Required: 1st string, 2nd function."),null);
                            case 3:
                                if("string"!=typeof b[0]||"function"!=typeof b[1]||"function"!=typeof b[2])
                                    return a.console.error("Required: 1st string, 2nd function and 3rd function."),
                                    null;
                                    c.title=b[0],
                                    c.onConfirm=b[1],
                                    c.onCancel=b[2]
                                }
                                return c
                            }
                            function i(){
                                g(),
                                setTimeout(function(){
                                    null!==A.onConfirm&&A.onConfirm(v.value)},
                                    m.constant.hideInterval),
                                    y.removeEventListener("click",j),
                                    v.removeEventListener("keydown",j),
                                    z.removeEventListener("click",k)
                                }
                                function j(a){
                                    return a.target===v?void(a.keyCode==m.key.ENTER&&i()):void i()
                                }
                                function k(){g(),
                                    setTimeout(function(){
                                        null!==A.onCancel&&A.onCancel()
                                    },
                                    m.constant.hideInterval),
                                    z.removeEventListener("click",k)
                                }
                                function l(a){
                                    d(a.escapable),
                                    b.body.appendChild(p)
                                }
                                var m=m||{

                                };
                                m.cls={
                                    box:"box",
                                    overlay:"overlay",
                                    dialog:"dialog",
                                    header:"header",
                                    content:"content",
                                    footer:"footer",
                                    btn:"btn","default":"default",
                                    error:"error",
                                    success:"success",
                                    warning:"warning",
                                    info:"info",
                                    hidden:"hidden",
                                    prompt:"prompt"
                                },
                                m.constant={
                                    hideInterval:200
                                },
                                m.key={
                                    ESC:27,
                                    ENTER:13
                                },
                                m.nsp="bl-",
                                m.ns=function(a){
                                    return m.nsp+a
                                },
                                m.util={
                                    hasClass:function(a,b)
                                    {
                                        var c=a.getAttribute("class");
                                        if(null===c)
                                        return!1;
                                        c=c.split(" ");
                                        for(var d=0;d<c.length;d++)
                                        if(c[d]===m.nsp+b)
                                        return!0;
                                        return!1
                                    },
                                    setClass:function(a,b){
                                        a.className=m.nsp+b
                                    },
                                    addClass:function(a,b){
                                        if(!m.util.hasClass(a,b)){
                                            var c=a.getAttribute("class");
                                            c?a.setAttribute("class",c+" "+m.ns(b)):a.className=m.ns(b)
                                        }
                                    },
                                    removeClass:function(a,b){
                                        if(m.util.hasClass(a,b)){
                                            b=m.ns(b);
                                            var c=new RegExp("(\\s|^)"+b+"(\\s|$)");
                                            a.className=a.className.replace(c,"")
                                        }
                                    },
                                    hide:function(a){
                                        m.util.addClass(a,m.cls.hidden)
                                    },
                                    show:function(a){
                                        m.util.removeClass(a,m.cls.hidden)
                                    },
                                    setText:function(a,b){
                                        a.innerHTML="";
                                        var c=document.createTextNode(b);
                                        a.appendChild(c)}};
                                        var n=!1,
                                        o=!1,
                                        p=b.createElement("div"),
                                        q=b.createElement("div"),
                                        r=b.createElement("div"),
                                        s=b.createElement("div"),
                                        t=b.createElement("h2"),
                                        u=b.createElement("p"),
                                        v=b.createElement("input"),
                                        w=b.createElement("div"),
                                        x=b.createElement("div"),
                                        y=b.createElement("button"),
                                        z=b.createElement("button");
                                        m.util.addClass(p,m.cls.box),
                                        m.util.addClass(p,m.cls.info),
                                        m.util.addClass(p,m.cls.hidden),
                                        m.util.addClass(q,m.cls.overlay),
                                        m.util.addClass(r,m.cls.dialog),
                                        m.util.addClass(s,m.cls.header),
                                        m.util.addClass(w,m.cls.content),
                                        m.util.addClass(x,m.cls.footer),
                                        m.util.addClass(y,m.cls.btn),
                                        m.util.addClass(z,m.cls.btn),
                                        m.util.addClass(v,m.cls.prompt),
                                        s.appendChild(t),
                                        w.appendChild(u),
                                        w.appendChild(v),
                                        x.appendChild(y),
                                        x.appendChild(z),
                                        r.appendChild(s),
                                        r.appendChild(w),
                                        r.appendChild(x),
                                        p.appendChild(q),
                                        p.appendChild(r),
                                        a.blurt=function(){
                                            var h=f(arguments);
                                            return null===h?
                                            void a.console.error("Invalid arguments"):(n||(e(h.escapable),n=!n),
                                            d(h.escapable),
                                            m.util.setText(t,h.title),
                                            m.util.hide(v),
                                            m.util.hide(z),
                                            null===h.text||""===h.text?m.util.hide(w):"string"==typeof h.text&&(m.util.setText(u,h.text),
                                            m.util.show(w),
                                            m.util.show(u)),
                                            null===h.type||h.type!==m.cls.info&&h.type!==m.cls.success&&h.type!==m.cls.warning&&h.type!==m.cls.error||(m.util.setClass(r,m.cls.dialog),
                                            m.util.addClass(r,h.type)),
                                            !h.escapable&&o&&b.removeEventListener("keyup",c),
                                            m.util.show(p),m.util.addClass(r,"dialog-anim-show"),
                                            y.textContent?
                                            y.textContent=h.okButtonText:y.innerText=h.okButtonText,
                                            y.focus(),
                                            void y.addEventListener("click",g))
                                        };
                                        var A={
                                            onConfirm:null,onCancel:null
                                        };
                                        a.brompt=function(){
                                            A={
                                                onConfirm:null,onCancel:null
                                            };
                                            var b=h(arguments);
                                            return A.onConfirm=b.onConfirm,
                                            A.onCancel=b.onCancel,
                                            b?(n||(l(b),n=!n),m.util.show(v),
                                            m.util.setText(t,b.title),
                                            m.util.hide(u),
                                            m.util.setText(y,b.okButtonText),
                                            m.util.setText(z,b.cancelButtonText),
                                            m.util.show(z),
                                            null===b.type||b.type!==m.cls.info&&b.type!==m.cls.success&&b.type!==m.cls.warning&&b.type!==m.cls.error||(m.util.setClass(r,m.cls.dialog),
                                            m.util.addClass(r,b.type)),
                                            m.util.show(w),
                                            m.util.show(p),
                                            m.util.addClass(r,"dialog-anim-show"),
                                            v.value="",
                                            v.focus(),
                                            y.addEventListener("click",j),
                                            z.addEventListener("click",k),
                                            void v.addEventListener("keydown",j)):void a.console.error("Invalid arguments")}}(window,document);

