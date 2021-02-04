//jshint maxerr: 2000
//last version
//https://github.com/catiadesign/_Xlibrary/blob/master/_Xlibrary.js

var SETTINGS = {
    theme: {
        def: 'blue',
        sel: 'blue',
        array: ['orange', 'blue', 'grey'],
        title: 'Theme:',
        tooltip: 'Change website theme',
    }, effect: {
        def: 'swipe',
        sel: 'swipe',
        array: ['drop_left', 'drop_top', 'drop_left_top', 'unfold_small', 'unfold_big', 'reverse', 'swipe'],
        title: 'Effect:',
        tooltip: 'Change the way windows appear',
    }, modal: {
        def: 'false',
        sel: 'false',
        array: ['true', 'false'],
        title: 'Modal:',
        tooltip: 'Add a modal effect to windows, you cannot select whats under',
    }, drag: {
        def: 'true',
        sel: 'true',
        array: ['true', 'false'],
        title: 'Draggable:',
        tooltip: 'Drag the Windows',
    }, resize: {
        def: 'true',
        sel: 'true',
        array: ['true', 'false'],
        title: 'Resize:',
        tooltip: 'Resize the windows',
    }, header: {
        def: 'true',
        sel: 'true',
        array: ['true', 'false'],
        title: 'Header:',
        tooltip: 'With or without theme header',
    }, autorefresh: {
        def: 'false',
        sel: 'false',
        array: ['true', 'false'],
        title: 'Windows Auto Refresh:',
        tooltip: 'If you dont want the windows to refresh on bring to front, change this to false',
    }, autosearch: {
        def: 'false',
        sel: 'false',
        array: ['true', 'false'],
        title: 'Auto Search:',
        tooltip: 'Search on typing without Enter',
    }, icotitlepos: {
        def: 5,
        sel: 5,
        array: [0, 5, 10, 15, 20, 25, 30, 35],
        title: 'Ico Title Position:',
        tooltip: 'Position Ico Title',
    }, searchlimit: {
        def: 200,
        sel: 200,
        array: [10, 50, 200, 600, 1000, 2000],
        title: 'Limit Search:',
        tooltip: 'Choose a limit from search elements in Explorer',
    }, backimage: {
        def: 'bodyback001.jpg',
        sel: 'bodyback001.jpg',
        array: ['bodyback001.jpg', 'bodyback002.jpg', 'bodyback003.jpg', 'bodyback004.jpg', 'bodyback005.jpg', 'bodyback006.jpg', ''],
        title: 'Background:',
        tooltip: '',
    },
};

var MOUSE = {X: 0, Y: 0, XD: 0, YD: 0};

var SELECTED = {item: 0, obj: 0, obj2: 0};

var DefaultSearchLocation = [];

var DesktopIconsSel = [];

var NULLWIN = function() {
    return {
        winElem:    undefined,
        winBar:     undefined,
        winOverlay: undefined,
        winData:    {tophide: 0, left: 0, top: 0, width: 0, height: 0},
    };
};
var WIN = {
    key: 0,
    full: [NULLWIN()],
    globalDIV: '',
    taskbar: '',
    body: '',
    icons: '',
    adsense: '',
};

(function(window){
    //'use strict';
    function xquery() {
        var info = {
            name:       'Xquery JavaScript Library',
            version:    '1.0.0',
            author:     'Adrian & Open Source',
            created:    '17.10.2019',
            updated:     '21.01.2021',
        };
        
        var xs = 0;
       
        function _X(id) {
            var that;
            var elem;
            var i, j;
            var arr = [];
            if (id !== undefined) {
                if (window === this) {
                    that = new _X();
                    if (typeof id == 'string' && id.indexOf(',') < 0) {
                        var repstr = id.replace(/[<.#]/g, '');
                        //ID
                        if (id.indexOf('#') > -1) {
                            elem = document.getElementById(repstr);
                            if (elem !== null) {
                                that[0] = elem;
                            }
                        }
                        //Clasa
                        else if (id.indexOf('.') > -1) {
                            elem = document.getElementsByClassName(repstr);
                            for (i = 0; i < elem.length; i++) {
                                that[i] = elem[i];
                            }
                        }
                        //Tag
                        else if (id.indexOf('.') < 0 && id.indexOf('#') < 0 && id.indexOf('<') < 0) {
                            elem = document.getElementsByTagName(id);
                            for (i = 0; i < elem.length; i++) {
                                that[i] = elem[i];
                            }
                        }
                        //Create Element
                        else if (id.indexOf('<') > -1) {
                            elem = document.createElement(repstr);
                            that[0] = elem;
                        }
                    }
                    else if (typeof id == 'object') {
                        if (id[0] === undefined || id === window || id === document) {
                            that[0] = id;
                        } else {
                            that[0] = id[0];
                        }
                    }
                    else if (id.indexOf(',') > -1) {
                        elem = id.replace(/\s/g, '').split(',');
                        for (i = 0; i < elem.length; i++) {
                            for (j = 0; j < _X(elem[i]).length; j++) {
                                arr.push(_X(elem[i])[j]);
                            }
                        }
                        ArrayToObject(arr, that);
                    }
                    that.length = GetObjectLength(that);
                }
            } else {
                that = new _X({});
                that.length = GetObjectLength(that);
            }
            return that;
        }

        //Generate Random Class
        _X.ClassVirtual = function() {return '.' + 'VirtualClass' + 9 + xs++};

        //3D Website Rotate
        //rotation in deg
        _X.Web3D = function(elem, rotateForce) {
            _X(document).on({
                mousemove: function(e) {
                    var rotateY = (e.pageX / window.innerWidth * rotateForce * 2) - rotateForce;
                    var rotateX = -((e.pageY / window.innerHeight * rotateForce * 2) - rotateForce);
                    _X(elem).css({
                        transform: 'rotateX('+ rotateX +'deg) rotateY('+ rotateY +'deg)'
                    });
                }
            });
        };
        
        //movement in pixels
        _X.Relief3D = function(elem, moveForce) {
            _X(document).on({
                mousemove: function(e) {
                    var moveX = (e.pageX - window.innerWidth / 2) / (window.innerWidth / 2) * moveForce;
                    var moveY = (e.pageY - window.innerHeight / 2) / (window.innerHeight / 2) * moveForce;
                    _X(elem).css({
                        position: 'relative',
                        left: moveX,
                        top: moveY
                    });
                }
            });
        };

        //Add Free Space
        _X.AddSpace = function(noOfSpaces) {
            var space = " ";
            var returnValue = "";
            var i;
            for (i = 0; i < noOfSpaces; i++) {
                returnValue += space;
            }
            return returnValue;
        };

        _X.CreateSpace = function(noOfSpaces) {
            var space = "&nbsp;";
            var returnValue = "";
            var i;
            for (i = 0; i < noOfSpaces; i++) {
                returnValue += space;
            }
            return returnValue;
        };
    
        _X.Xsearch = function(options) {
            var defaults = {
                a: DefaultSearchLocation,    //array     => array where to search
                s: '999',       //search    => string || array by ','
                l: 'search',    //location  => search || loc || title || key || ico || keyname
                d: 'min',       //deep      => min || med || max
                e: '999',       //exclude   => based on search keyword
            };
            var settings = _X.JoinObj(defaults, options);
            var a = settings.a;
            var s = settings.s;
            var l = settings.l;
            var d = settings.d;
            var e = settings.e;
            var temp = [];
            var search;
            var i, j;
            function SearchTemp(options) {
                var defaults = {
                    a: '',
                    s: '',
                    l: '',
                    d: '',
                    e: '',
                };
                var settings = _X.JoinObj(defaults, options);
                var a = settings.a;
                var s = settings.s;
                var l = settings.l;
                var d = settings.d;
                var e = settings.e;
                function ReturnSearch(glob) {
                    var Exclude = function() {
                        if (glob.search !== undefined) {
                            return glob.search.indexOf(e) > -1 ? false : true;
                        }
                    };
                    //Search
                    if (l == 'search' && glob.search !== undefined && Exclude() === true) {
                        return glob.search.toString().toLowerCase().indexOf(s.toString().toLowerCase()) > -1;
                    }
                    //Location
                    else if (l == 'loc' && glob.loc !== undefined && Exclude() === true) {
                        return glob.loc.toString().toLowerCase().indexOf(s.toString().toLowerCase()) > -1;
                    }
                    //Title
                    else if (l == 'title' && glob.title !== undefined && Exclude() === true) {
                        return glob.title.toString().toLowerCase().indexOf(s.toString().toLowerCase()) > -1;
                    }
                    //Keyboard Key
                    else if (l == 'key' && glob.key !== undefined && Exclude() === true) {
                        return glob.key;
                    }
                    //Icon
                    else if (l == 'ico' && glob.ico !== undefined && Exclude() === true) {
                        return glob.ico.toString().toLowerCase().indexOf(s.toString().toLowerCase()) > -1;
                    }
                    //Search by the Name of the Key not Value   
                    else if (l == 'keyname' && Exclude() === true) {
                        return key.toString().toLowerCase().indexOf(s.toString().toLowerCase()) > -1;
                    }
                }
                if (a !== undefined) {
                    _X.Xeach(a, function(k, _v) {
                        if (ReturnSearch(_v)) {
                            temp.push(_v);
                            if (_v.hasOwnProperty('items') && d == 'max') {
                                SearchTemp({a: _v.items, s: s, l: l, d: d, e: e});
                            }
                        } else {
                            if (d == 'max' || d == 'med') {
                                SearchTemp({a: _v.items, s: s, l: l, d: d, e: e});
                            }
                        }
                    });
                }
            }
            if (typeof s == 'string' && s.indexOf(',') > -1) {
                search = s.replace(/\s/g, '').split(',');
                for (i = 0; i < search.length; i++) {
                    if (search[i].length > 0) {
                        SearchTemp({a: a, s: search[i], l: l, d: d, e: e});
                    }
                }
            } else {
                search = s || '';
                SearchTemp({a: a, s: search, l: l, d: d, e: e});
            }
            return temp;
        };
        
        _X.Xeach = function(obj, callback) {
            var i;
            if (obj.length > 0) {
                for (i = 0; i < obj.length; i++) {
                    if (callback.call( obj[i], i, obj[i] ) === false) {
                        break;
                    }
                }
            }
            else if (typeof obj == 'number') {
                for (i = 0; i < obj; i++) {
                    if (callback.call( obj[i], i, obj[i] ) === false) {
                        break;
                    }
                }
            }
            else {
                for (i in obj) {
                    if (obj.hasOwnProperty(i) && obj.hasOwnProperty('length') === false) {
                        if (callback.call( obj[i], i, obj[i] ) === false) {
                            break;
                        }
                    }
                }
            }
            return obj;
        };
        
        _X.Xgrep = function(obj, callback) {
            var temp = [];
            var invertValue;
            var i;
            for (i = 0; i < obj.length; i++) {
                invertValue = !callback(obj[i]);
                //console.log(invertValue, callback());
                if (invertValue !== callback()) {
                    temp.push(obj[i]);
                }
            }
            return temp;
        };
        
        _X.JoinObj = function(defaults, options){
            var s = {};
            var i, j;
            for (i in defaults) {
                s[i] = defaults[i];
            }
            for (j in options) {
                s[j] = options[j];
            }
            return s;
        };
            
        _X.XAddNull = function(val) {
            if (val.length === 1) { val = '0' + val; }
            return val;
        };

        _X.XAddColor = function() {
            function IntHex() { return _X.XAddNull(Math.floor((Math.random() * 255) + 1).toString(16)) }
            return '#' + IntHex() + IntHex() + IntHex();
        };
        
        _X.XReadAjax = function(options) {
            var defaults = {
                method: 'GET',
                url: '',
                callback: '',
                dataType: '',
                syncron: true,
                send: null,
                /*
                    ''(default)     => get as string
                    'text'          => get as string
                    'arraybuffer'   => get as ArrayBuffer (for binary data, see chapter ArrayBuffer, binary arrays)
                    'blob'          => get as Blob (for binary data, see chapter Blob)
                    'document'      => get as XML document (can use XPath and other XML methods)
                    'json'          => get as JSON (parsed automatically)
                */
            };
            var s = _X.JoinObj(defaults, options);
            var xhr = new XMLHttpRequest();
            xhr.open(s.method, s.url, s.syncron);
            xhr.responseType = s.dataType;
            xhr.send(s.send);
            xhr.onload = function() {
                if (this.readyState == 4 && this.status == 200) {
                    s.callback.apply(xhr, []);
                } else {
                    console.log('*** Error ***');
                }
            };
        };

        _X.XDraggable = function(options) {
            var defaults = {
                item: '',
                dragArea: '',
                mouse: '',
                clasa: 'xui_disabled',
            };
            var settings = _X.JoinObj(defaults, options);
            var that = _X(settings.item);
            var e = settings.mouse;
            if (e.which === 1) {
                var xd = e.pageX;
                var yd = e.pageY;
                var left = that.position('left', 'offset');
                var top = that.position('top', 'offset');
                var A = _X(settings.dragArea);
                var L = A.position('left','box');
                var T = A.position('top', 'box');
                var W = A.position('width', 'offset');
                var H = A.position('height', 'offset');
                //console.log(left, top, A, L, T, W, H);
                var mousemove = function(e) {
                    var x = e.pageX;
                    var y = e.pageY;
                    that.classAdd(settings.clasa)
                        .css({position: 'absolute'});
                    // Center without borders
                    if ( (x > L) && (y > T) && (x < L + W) && (y < T + H) ) {
                        that.css({
                            left: left + (x - xd),
                            top: top + (y - yd),
                        });
                    }
                    // Borders on Y Axis
                    else if ( /*left side*/ (x <= L) && (y > T) && (y < T + H) || /*right side*/ (x >= L + W) && (y > T) && (y < T + H) ) {
                        that.css({
                            top: top + (y - yd),
                        });
                    }
                    // Borders on X Axis
                    else if ( /*top side*/ (y <= T) && (x > L) && (x < L + W) || /*bottom side*/ (y >= T + H) && (x > L) && (x < L + W) ) {
                        that.css({
                            left: left + (x - xd),
                        });
                    }
                };
                var mouseup = function() {
                    _X(window).off({mouseup: mouseup, mousemove: mousemove});
                    that.classRemove(settings.clasa);
                };
                _X(window).on({mousemove: mousemove, mouseup: mouseup});
            }
        };

        _X.OpenHtml = function() {
            var obj = SELECTED.obj;
            var x = new _X.Window();
            x.init({
                leftSize: x.AutoLeftResize(),
            });
            _X('<iframe')
                .XappendTo(x.left)
                .attr({src: AdSenseVertical(), scrolling: 'no', marginwidth: 0, marginheight: 0})
                .css({width: '100%', height: '100%'});
            x.right.Xload({url: obj.loc});
        };
        
        _X.OpenIframe = function() {
            var obj = SELECTED.obj;
            var x = new _X.Window();
            x.init({
                leftSize: x.AutoLeftResize(),
                scroll: 'hidden',
            });
            _X('<iframe')
                .XappendTo(x.left)
                .attr({src: AdSenseVertical(), scrolling: 'no', marginwidth: 0, marginheight: 0})
                .css({width: '100%', height: '100%'});
            _X('<iframe')
                .XappendTo(x.right)
                .attr({src: obj.loc})
                .css({width: '100%', height: '100%'});
        };
    
        _X.OpenPhoto = function() {
            var obj = SELECTED.obj;
            var x = new _X.Window();
            x.init({
                leftSize: x.AutoLeftResize(),
            });
            _X('<iframe')
                .XappendTo(x.left)
                .attr({src: AdSenseVertical(), scrolling: 'no', marginwidth: 0, marginheight: 0})
                .css({width: '100%', height: '100%'});
            _X('<img')
                .XappendTo(x.right)
                .attr({src: obj.loc})
                .css({width: '100%'});
        };
        
        _X.OpenVideo = function() {
            var obj = SELECTED.obj;
            var x = new _X.Window();
            x.init({
                leftSize: x.AutoLeftResize(),
            });
            _X('<iframe')
                .XappendTo(x.left)
                .attr({src: AdSenseVertical(), scrolling: 'no', marginwidth: 0, marginheight: 0})
                .css({width: '100%', height: '100%'});
            _X('<video')
                .XappendTo(x.right)
                .attr({width: '100%', height: 'auto', controls:''})
                //.append(_X('<source').attr({src: obj.loc.replace('%20', ' '), type: 'video/mp4; codecs="avc1.4D401E, mp4a.40.2"'}) )
                //.append(_X('<source').attr({src: obj.loc.replace('%20', ' '), type: 'video/ogg; codecs="theora, vorbis"'}) )
                //.append(_X('<source').attr({src: obj.loc.replace('%20', ' '), type: 'video/webm; codecs="vp8.0, vorbis"'}) );
                .append(_X('<source').attr({src: obj.loc.replace('%20', ' ')}));
        };

        _X.IconsMoveSelect = function() {
            var that = this;
            this.MoveSelection = function() {
                _X.Xeach(DesktopIconsSel, function(k, v) {
                    //console.log(DesktopIconsSel);
                    var left = _X(v).position('left', 'offset');
                    var top = _X(v).position('top', 'offset');
                    //console.log(left, top);
                    var mousemove = function(e) {
                        _X(v).css({
                            position: 'absolute',
                            left: left + (e.pageX - MOUSE.XD),
                            top: top + (e.pageY - MOUSE.YD)
                        });
                    };
                    var mouseup = function() {
                        _X(window).off({mouseup: mouseup, mousemove: mousemove});
                    };
                    _X(window).on({mousemove: mousemove, mouseup: mouseup});
                });
            };

            this.CreateSelectionRectangle = function() {
                var c = _X('.container_mouse_move');
                var x = MOUSE.X;
                var y = MOUSE.Y;
                //Right Bottom
                if (x > MOUSE.XD && y > MOUSE.YD) {
                    c.css({
                        left:   MOUSE.XD,
                        top:    MOUSE.YD, 
                        width:  x - MOUSE.XD,
                        height: y - MOUSE.YD,
                    });
                }
                //Right Top
                else if (x > MOUSE.XD && y < MOUSE.YD) {
                    c.css({
                        left:   MOUSE.XD,
                        top:    y, 
                        width:  x - MOUSE.XD,
                        height: MOUSE.YD - y,
                    });
                }
                //Left Top
                else if (x < MOUSE.XD && y < MOUSE.YD) {
                    c.css({
                        left:   x,
                        top:    y, 
                        width:  MOUSE.XD - x,
                        height: MOUSE.YD - y,
                    });
                }
                //Left Bottom
                else if (x < MOUSE.XD && y > MOUSE.YD) {
                    c.css({
                        left:   x,
                        top:    MOUSE.YD, 
                        width:  MOUSE.XD - x,
                        height: y - MOUSE.YD,
                    });
                }
            };

            this.SelectIcons = function() {
                _X('<div')
                    .XappendTo(_X(WIN.globalDIV).Xfind(WIN.body))
                    .classAdd('container_mouse_move')
                    .css({
                        position: 'absolute',
                        border: '1px solid #ffffff',
                        opacity: 0.2,
                        'background-color': '#ff0000',
                        'z-index': 30,
                    });
                _X.Xeach(_X(WIN.globalDIV).Xfind(WIN.icons).Xfind('.xcube'), function(k, v) {
                    var l1 = _X(v).position('left', 'box');
                    var t1 = _X(v).position('top', 'box');
                    var w1 = _X(v).position('width', 'box');
                    var h1 = _X(v).position('height', 'box');
                    //console.log('F1', l1, t1, w1, h1);
                    var mousemove = function() {
                        that.CreateSelectionRectangle();
                        var l2 = _X('.container_mouse_move').position('left', 'offset');
                        var t2 = _X('.container_mouse_move').position('top', 'offset');
                        var w2 = _X('.container_mouse_move').position('width', 'offset');
                        var h2 = _X('.container_mouse_move').position('height', 'offset');
                        //console.log('F2', l2, t2, w2, h2);
                        if ( (l2 <= l1) && (t2 <= t1) && (l2 + w2 >= l1 + w1) && (t2 + h2 >= t1 + h1) ) {
                            //if elements dont have this class then they get inside array
                            if (_X(v).Xfind('children').classBool('xui_highlight') === false) {
                                _X(v).Xfind('children').classAdd('xui_highlight');
                                DesktopIconsSel.push(v);
                            }
                            //console.log(DesktopIconsSel);
                        } else {
                            if (_X(v).Xfind('children').classBool('xui_highlight') === true) {
                                _X(v).Xfind('children').classRemove('xui_highlight');
                                DesktopIconsSel = _X.Xgrep(DesktopIconsSel, function(elem) { return elem != v; });
                                //console.log(DesktopIconsSel);
                            }
                        }
                    };
                    var mouseup = function() {
                        _X(window).off({mouseup: mouseup, mousemove: mousemove});
                        _X('.container_mouse_move').Xremove();
                    }; 
                    _X(window).on({mousemove: mousemove, mouseup: mouseup});
                });
            };

            this.RemoveSelectedElements = function() {
                _X('.xcube').Xfind('children').classRemove('xui_highlight');
                DesktopIconsSel.length = 0;
            };

            this.init = function() {
                if (_X('body').classBool('mousedown_true') === false) {
                    var sel = _X('.xcube').Xfind('children').classBool('xui_highlight');
                    var hover = _X('.xcube').Xfind('children').classBool('xui_hover');
                    var sel_hover = _X('.xcube').Xfind('children').classBool('xui_highlight, xui_hover');
                    if (sel_hover) {
                        that.MoveSelection();
                    } else if ((sel === false) && (hover === false)) {
                        that.SelectIcons();
                    } else if (sel && (hover === false)) {
                        that.RemoveSelectedElements();
                        return that.SelectIcons();
                    } else if ((sel === false) && hover) {
                        that.RemoveSelectedElements();
                        return;
                    } else if (sel && hover) {
                        that.RemoveSelectedElements();
                        return;
                    } else {
                        that.RemoveSelectedElements();
                    }
                }
            };
        };

        _X.AddTooltip = function(options) {
            var defaults = {
                tooltip: true,
                title: '',
            };
            var settings = _X.JoinObj(defaults, options);
            if (settings.tooltip === true && _X('body').classBool('mousedown_true') === false) {
                _X('<div')
                    .XappendTo('body')
                    .classAdd('tooltip_class, xui_content, xui_corner_all, shadow_border')
                    .Xhide()
                    .css({
                        position: 'absolute',
                        'white-space': 'nowrap',
                        padding: 3,
                        'z-index': 2000,
                    })
                    .append(settings.title);
            } else {}
        };

        _X.ReturnElements = function(options) {
            var defaults = {
                item: '',
                obj: '',
                pushItem: true,
                pushObj: true,
                pushObj2: true,
            };
            var s = _X.JoinObj(defaults, options);
            if (s.pushItem === true) {SELECTED.item = s.item;}
            if (s.pushObj === true) {SELECTED.obj = s.obj;}
            if (s.pushObj2 === true) {SELECTED.obj2 = s.obj;}
        };  

        _X.CubeIconsControl = function(options) {
            var defaults = {
                elem: '',
            };
            var settings = _X.JoinObj(defaults, options);
            var item = SELECTED.item;
            var ICONcontrols = [
                {clasa: 'ico_rotate_X', ico: 'panorama_vertical'},
                {clasa: 'ico_rotate_Y', ico: 'panorama_horizontal'},
                {clasa: 'ico_rotate_Z', ico: 'panorama_fish_eye'},
                {clasa: 'ico_perspective', ico: 'landscape'},
                {clasa: 'ico_resize', ico: 'zoom_out_map'},
                {clasa: 'ico_opacity', ico: 'beach_access'}
            ];
            function Transform3D(x) {
                return _X(SELECTED.item).Xfind(x).css('transform').slice(9, -1).split(',');
            }
            var left = _X(settings.elem).position('left','box');
            var top = _X(settings.elem).position('top', 'box');
            _X('<div')
                .XappendTo('body')
                .classAdd('ico_controls')
                .css({
                    'z-index': 100,
                    'border-left': '1px dotted',
                    position: 'absolute',
                    left: left - 20,
                    top: top,
                    width: 'auto',
                    height: 'auto',
                    'background-image': 'linear-gradient(-90deg, rgba(217, 217, 217, 0) 0%, rgba(217, 217, 217, 1) 100%)',
                    'border-radius': 5,
                });
            _X.Xeach(ICONcontrols, function(k, v) {
                _X('<div')
                    .XappendTo('.ico_controls')
                    .classAdd(v.clasa)
                    .css({cursor: 'pointer'})
                    .iconAdd({ico: v.ico, size: 20})
                    .on({
                        mouseenter: function() {
                            _X(this).Xfind('i').css({color: 'red'});
                        },
                        mouseleave: function() {
                            _X(this).Xfind('i').css({color: ''});
                        },
                        mousedown: function(e) {
                            if (e.which === 1) {
                                var xd = e.pageX;
                                var perspective = _X(item).css('perspective');
                                var cube_size = _X(item).css('width');
                                var cube_opacity = _X(item).Xfind('.back').css('opacity');
                                var cube = {
                                    front: Transform3D('.front'),
                                    back: Transform3D('.back'),
                                    left: Transform3D('.left'),
                                    right: Transform3D('.right'),
                                    bottom: Transform3D('.bottom'),
                                    top: Transform3D('.top'),
                                };
                                var cube2;
                                var mousemove = function(e) {
                                    var move = (e.pageX - xd);
                                    var matVal = move * 1/50;
                                    if (v.clasa == 'ico_rotate_X') {
                                        cube2 = {
                                            front:  _X.MATRIX.Multiply([_X.MATRIX.RotateXAxis(-matVal), cube.front]),
                                            back:   _X.MATRIX.Multiply([_X.MATRIX.RotateXAxis(matVal), cube.back]),
                                            left:   _X.MATRIX.Multiply([_X.MATRIX.RotateZAxis(matVal), cube.left]),
                                            right:  _X.MATRIX.Multiply([_X.MATRIX.RotateZAxis(-matVal), cube.right]),
                                            top:    _X.MATRIX.Multiply([_X.MATRIX.RotateXAxis(-matVal), cube.top]),
                                            bottom: _X.MATRIX.Multiply([_X.MATRIX.RotateXAxis(-matVal), cube.bottom]),
                                        };
                                        _X.Xeach(cube2, function(k, v) {
                                            _X(item).Xfind('.' + k).css({transform: 'matrix3d(' + v + ')'});
                                        });
                                    } else if (v.clasa == 'ico_rotate_Y') {
                                        cube2 = {
                                            front:  _X.MATRIX.Multiply([_X.MATRIX.RotateYAxis(matVal), cube.front]),
                                            back:   _X.MATRIX.Multiply([_X.MATRIX.RotateYAxis(matVal), cube.back]),
                                            left:   _X.MATRIX.Multiply([_X.MATRIX.RotateYAxis(matVal), cube.left]),
                                            right:  _X.MATRIX.Multiply([_X.MATRIX.RotateYAxis(matVal), cube.right]),
                                            top:    _X.MATRIX.Multiply([_X.MATRIX.RotateZAxis(-matVal), cube.top]),
                                            bottom: _X.MATRIX.Multiply([_X.MATRIX.RotateZAxis(matVal), cube.bottom]),
                                        };
                                        _X.Xeach(cube2, function(k, v) {
                                            _X(item).Xfind('.' + k).css({transform: 'matrix3d(' + v + ')'});
                                        });
                                    } else if (v.clasa == 'ico_rotate_Z') {
                                        cube2 = {
                                            front:  _X.MATRIX.Multiply([_X.MATRIX.RotateZAxis(matVal), cube.front]),
                                            back:   _X.MATRIX.Multiply([_X.MATRIX.RotateZAxis(-matVal), cube.back]),
                                            left:   _X.MATRIX.Multiply([_X.MATRIX.RotateXAxis(matVal), cube.left]),
                                            right:  _X.MATRIX.Multiply([_X.MATRIX.RotateXAxis(-matVal), cube.right]),
                                            top:    _X.MATRIX.Multiply([_X.MATRIX.RotateYAxis(matVal), cube.top]),
                                            bottom: _X.MATRIX.Multiply([_X.MATRIX.RotateYAxis(-matVal), cube.bottom]),
                                        };
                                        _X.Xeach(cube2, function(k, v) {
                                            _X(item).Xfind('.' + k).css({transform: 'matrix3d(' + v + ')'});
                                        });
                                    } else if (v.clasa == 'ico_perspective') {
                                        _X(item).css({perspective: perspective + move});
                                    } else if (v.clasa == 'ico_resize') {
                                        var valcube = Math.abs(cube_size + move);
                                        _X(item).css({width: valcube, height: valcube});
                                        _X(item).Xfind('i').css({'font-size': valcube});
                                        _X(item).Xfind('img').css({width: valcube, height: valcube});
                                        //
                                        _X.Xeach(['.front, .back, .left, .right, .top, .bottom'], function(k, v) {
                                            _X(item).Xfind(v).css({'transform-origin': 'center center' + _X.AddSpace(1) + - valcube / 2 + 'px'});
                                        });
                                    } else if (v.clasa == 'ico_opacity') {
                                        var cubeopacity = Math.abs(move / 300).toFixed(1);
                                        //
                                        _X.Xeach(['.back, .left, .right, .top, .bottom'], function(k, v) {
                                            _X(item).Xfind(v).css({opacity: cubeopacity});
                                        });
                                    } else {}
                                };
                                var mouseup = function() {
                                    _X(window).off({mouseup: mouseup, mousemove: mousemove});
                                };
                                _X(window).on({mousemove: mousemove, mouseup: mouseup});
                            }
                        }
                    });
            });
        };

        _X.CubeIcon = function(options) {
            var defaults = {
                to: _X('.active_screen').Xfind('.desktop_icons'),
                array: [],
                cube: false,
                perspective: '',
                transform: '',
                size: 60, // Number or Array [from, to]
                clasa: '',
                rotationAngle: 0, // Number or Array [from, to]
                opacity: 0.9,
                margin: 3,
                css: {},
                icoControls: false,
                click: 'dblclick',
                tooltip: true,
                menuRC: _X.Xsearch({s: 'rc2'}),
                title: true,
                pushObj: true,
                pushItem: true,
                clasaIco: '',
                drag: true,
                check: false,
                dragArea: '.screen_faces',
                on: {},
            };
            var s = _X.JoinObj(defaults, options);
            var opacity = s.opacity;
            var RandomAngle = function() {
                if (typeof s.rotationAngle == 'object') {
                    return Math.floor( (Math.random() * (s.rotationAngle[1] - s.rotationAngle[0] + 1) ) + s.rotationAngle[0]);
                } else {
                    return s.rotationAngle;
                }
            };
            var RandomSize = function() {
                if (typeof s.size == 'object') {
                    return Math.floor( (Math.random() * (s.size[1] - s.size[0] + 1) ) + s.size[0]);
                } else {
                    return s.size;
                }
            };
            _X.prototype.FrontSide = function(obj, size) {
                var that = this;
                if (that.classBool('front')) {
                    that.css({'z-index': 1})
                        .iconAdd({
                            ico: obj.ico,
                            color: obj.color,
                            size: size,
                            clasa: s.clasaIco,
                            css: {'margin-left': -1},
                        });
                    if (s.title === true) {
                        _X('<div')
                            .XappendTo(that)
                            .classAdd('format_text, edit_title')
                            .css({
                                position: 'absolute',
                                left: 0,
                                right: 0,
                                bottom: SETTINGS.icotitlepos.sel,
                                'text-align': 'center',
                                'background-color': '#f7f7f7',
                                'font-size': 12,
                            })
                            .append(obj.title);
                    } else {}
                } else {} 
                return that;
            };
            _X.prototype.Cubefaces = function(obj, size) { 
                var that = this;
                var angle = RandomAngle();
                var cubeFaces = {
                    front:  {clasa: 'front, ico_full_body', color: '#FFFFFF', opacity: 1, matrix: _X.MATRIX.xyz(angle, angle, 0)},
                    back:   {clasa: 'back', color: obj.color, opacity: opacity, matrix: _X.MATRIX.xyz(angle, angle + 180, 0)},
                    left:   {clasa: 'left', color: obj.color, opacity: opacity, matrix: _X.MATRIX.xyz(angle, angle - 90, 0)},
                    right:  {clasa: 'right', color: obj.color, opacity: opacity, matrix: _X.MATRIX.xyz(angle, angle + 90, 0)},
                    top:    {clasa: 'top', color: obj.color, opacity: opacity, matrix: _X.MATRIX.xyz(angle - 90, 0, angle)},
                    bottom: {clasa: 'bottom', color: obj.color, opacity: opacity, matrix: _X.MATRIX.xyz(angle + 90, 0, -angle)},
                };
                if (s.cube === true || s.cube === 'true') {
                    // All Faces
                    _X.Xeach(cubeFaces, function(k, v) {
                        _X('<div')
                            .XappendTo(that)
                            .classAdd(v.clasa)
                            .css({
                                position: 'absolute',
                                left: 0,
                                right: 0,
                                top: 0,
                                bottom: 0,
                                overflow: 'hidden',
                                'text-align': 'center',
                                border: '1px solid',
                                opacity: v.opacity,
                                'background-color': v.color,
                                'border-radius': 10,
                                //'backface-visibility': 'hidden',
                                //transform: 'rotateX(' + v.x + 'deg) rotateY(' + v.y + 'deg) rotateZ(' + v.z + 'deg)',
                                'transform-origin': size / 2 + 'px' + _X.AddSpace(1) + size / 2 + 'px' + _X.AddSpace(1) + -size / 2 + 'px',
                                transform: 'matrix3d(' + v.matrix + ')',
                            })
                            .FrontSide(obj, size);
                    });
                } else {
                    // One Face
                    _X('<div')
                        .XappendTo(that)
                        .classAdd(cubeFaces.front.clasa)
                        .classAdd('xui_corner_all')
                        .css({
                            position: 'absolute',
                            left: 0,
                            right: 0,
                            top: 0,
                            bottom: 0,
                            overflow: 'hidden',
                            'text-align': 'center',
                            cursor: 'pointer',
                            border: '1px solid transparent',
                        })
                        .on({
                            mouseenter: function() {
                                _X(this).classAdd('shadow_border');
                            },
                            mouseleave: function() {
                                _X(this).classRemove('shadow_border');
                            },
                        })
                        .FrontSide(obj, size);
                }
                return that;
            };
            _X.Xeach(s.array, function(_k, _v) {
                var size = RandomSize();
                _X('<div')
                    .XappendTo(s.to)
                    .classAdd(s.clasa)
                    .classAdd('xcube')
                    .css(s.css)
                    .css({
                        position: 'relative',
                        margin: s.margin,
                        width: size,
                        height: size,
                        perspective: s.perspective,
                        'transform-style': s.transform,
                        cursor: 'pointer',
                    })
                    .on([s.click, function(e) {
                        _X('.ico_controls').Xremove();
                        e.preventDefault();
                        e.stopImmediatePropagation();
                        _v.init();
                    }])
                    .on(s.on)
                    .on({
                        mouseenter: function() {
                            _X(this).Xfind('children').classAdd('xui_hover');
                            _X.AddTooltip({tooltip: s.tooltip, title: _v.title});
                            _X(this).Xfind('children').CheckBox({check: s.check});
                        },
                        mouseleave: function() {
                            _X(this).Xfind('children').classRemove('xui_hover');
                            _X('.tooltip_class').Xremove();
                            _X('.input_checkbox').Xremove();
                        },
                        mousedown: function(e) {
                            _X('.ico_controls').Xremove();
                            _X('.xcube').Xfind('children').classRemove('xui_focus');
                            _X('.xcube').css({'z-index': 1});
                            _X(this).css({'z-index': 2});
                            //
                            if (s.drag === true) {
                                _X.XDraggable({item: this, mouse: e, dragArea: s.dragArea});
                            } else {}
                            _X.ReturnElements({item: this, obj: _v, pushItem: s.pushItem, pushObj: s.pushObj});
                        },
                        click: function(e) {
                            var that = this;
                            _X(that).Xfind('children').classAdd('xui_focus');
                            if (s.icoControls === true) {
                                _X.CubeIconsControl({elem: that});
                            } else {}
                        },
                        contextmenu: function(e) {
                            e.preventDefault();
                            e.stopImmediatePropagation();
                            if (s.menuRC !== false) {
                                var x = new _X.Window();
                                x.init({
                                    windowType: x.type[3],
                                    fontSize: 13,
                                    width: 115,
                                    height: 'auto',
                                    open: false,
                                    clasa: 'remove_on_mousedown',
                                });
                                x.right.MenuElements({
                                    array: s.menuRC,
                                    pushObj: false,
                                    pushItem: false,
                                    icoSize: 25,
                                    click: 'mousedown',
                                    color: false,
                                });
                                x.win.OpenWindow();
                                WIN.full.splice(WIN.key, 1);
                            }
                        },
                    })
                    .Cubefaces(_v, size);
            });
        };

        _X.Window = function() {
            var self = this;
            this.buttons = {
                WindowClose: {
                    search: 'rc1 rc2',
                    title: 'Close',
                    ico: 'cancel',
                    init: function() {
                        _X(WIN.full[WIN.key].winElem).Xremove();
                        _X(WIN.full[WIN.key].winBar).Xremove();
                        _X(WIN.full[WIN.key].winOverlay).Xremove();
                        WIN.full.splice(WIN.key, 1);
                        _X('.thiswindow').getElem('last').css({'z-index': 1501});
                        _X('.xui_overlay').getElem('last').css({'z-index': 1500});
                        _X('.thiswindow_statusbar').getElem('last').classAdd('xui_highlight');
                        self.ResizeStatusBar();
                    },
                },
                WindowMinMax: {
                    search: 'rc1',
                    title: 'MinMax',
                    ico: 'aspect_ratio',
                    init: function() {
                        var that = _X(WIN.full[WIN.key].winElem);
                        var store = WIN.full[WIN.key].winData;
                        var elL = that.position('left', 'offset');
                        var elT = that.position('top', 'offset');
                        var elW = that.position('width', 'offset');
                        var elH = that.position('height', 'offset');
                        var winW = _X(WIN.globalDIV).Xfind(WIN.body).position('width', 'offset');
                        var winH = _X(WIN.globalDIV).Xfind(WIN.body).position('height', 'offset');
                        if (elW < winW && elH > 39) {
                            store.left = elL;
                            store.top = elT;
                            store.width = elW;
                            store.height = elH;
                            //console.log(store);
                            that.css({
                                left: 0,
                                top: 0,
                                width: winW,
                                height: winH
                            });
                        } else {
                            if (store.width !== 0 && store.hight !== 0 && elH > 39) {
                                that.css({
                                    left: store.left,
                                    top: store.top,
                                    width: store.width,
                                    height: store.height
                                });
                            }
                        }
                    },
                },
                WindowHideShow: {
                    search: 'rc1 rc2',
                    title: 'HideShow',
                    ico: 'toll',
                    init: function() {
                        var that = _X(WIN.full[WIN.key].winElem);
                        var overlay = _X(WIN.full[WIN.key].winOverlay);
                        if ( that.cssBool(['display', 'none']) ) {
                            that.Xshow(SETTINGS.effect.sel);
                            overlay.Xshow(SETTINGS.effect.sel);
                        } else {
                            that.Xhide(SETTINGS.effect.sel);
                            overlay.Xhide(SETTINGS.effect.sel);
                        }
                    },
                },
                WindowTopHide: {
                    search: 'rc1',
                    title: 'TopHide',
                    ico: 'get_app',
                    init: function() {
                        var that = _X(WIN.full[WIN.key].winElem);
                        var store = WIN.full[WIN.key].winData;
                        var elH = that.position('height', 'offset');
                        //console.log(elH);
                        if (elH > 39) {
                            store.tophide = elH;
                            that.Xfind('.thiswindow_body, .thiswindow_footer').Xhide();
                            that.css({height: 39});
                        } else {
                            that.Xfind('.thiswindow_body, .thiswindow_footer').Xshow();
                            that.css({height: store.tophide});
                        }
                    },
                },
            };
           
            this.type = {
                1: {
                    maxSize: true,
                    drag: true,
                    resize: true,
                    modal: true,
                    statusbar: true,
                    overflow: 'hidden',
                    menuRC: _X.Xsearch({a: this.buttons, s: 'rc1'}),
                    bodyHeightCalc: 52,
                },
                2: {
                    maxSize: false,
                    drag: true,
                    resize: false,
                    modal: true,
                    statusbar: true,
                    overflow: 'visible',
                    menuRC: _X.Xsearch({a: this.buttons, s: 'rc2'}),
                    bodyHeightCalc: 35,
                },
                3: {
                    maxSize: false,
                    drag: false,
                    resize: false,
                    modal: false,
                    statusbar: false,
                    overflow: 'hidden',
                    menuRC: [],
                    bodyHeightCalc: '',
                },
            };
            this.GetElements = function(val) {
                var x = function() {
                    if (val === undefined) {return _X(WIN.full[WIN.key].winElem)}
                    else {return _X(val)}
                };
                this.win =            x(),
                this.header =         x().Xfind('.thiswindow_header');
                this.top =            x().Xfind('.body_top1');
                this.top2 =           x().Xfind('.body_top2');
                this.left =           x().Xfind('.body_left');
                this.middle =         x().Xfind('.body_middle');
                this.right =          x().Xfind('.body_right');
                this.rightTop =       x().Xfind('.body_right_top');
                this.rightBottom =    x().Xfind('.body_right_bottom');
                this.footer =         x().Xfind('.footer_text');
            };
            this.AutoLeftResize = function() {
                if (window.innerWidth < 700) {return 0}
                else {return 130}
            };
            this.ResizableFn = function(options) {
                var defaults = {
                    item: '',
                    mouse: '',
                };
                var s = _X.JoinObj(defaults, options);
                var that = _X(s.item);
                var e = s.mouse;
                if (e.which === 1) {
                    var xd = e.pageX;
                    var yd = e.pageY;
                    var left = that.position('left', 'offset');
                    var width = that.css('width');
                    var height = that.css('height');
                    var mousemove = function(e) {
                        if (_X('.ico_submenu_resize_se').classBool('window_resize_se')) {
                            that.css({
                                width: width + (e.pageX - xd),
                                height: height + (e.pageY - yd)
                            });
                        } else if (_X('.ico_submenu_resize_sw').classBool('window_resize_sw')) {
                            that.css({
                                width: width + (xd - e.pageX),
                                height: height + (e.pageY - yd),
                                left: left + (e.pageX - xd)
                            });
                        } else {}
                    };
                    var mouseup = function() {
                        _X(window).off({mouseup: mouseup, mousemove: mousemove});
                    };
                    _X(window).on({mousemove: mousemove, mouseup: mouseup});
                } else {}
            };
            this.WindowSelect = function(options) {
                var defaults = {
                    zIndex: 1501,
                };
                var settings = _X.JoinObj(defaults, options);
                if (_X(WIN.full[WIN.key].winElem).classBool('remove_on_mousedown') === false) {
                    _X('.thiswindow').css({'z-index': settings.zIndex - 2});
                    _X('.xui_overlay').css({'z-index': settings.zIndex - 3});
                    _X('.thiswindow_statusbar').classRemove('xui_highlight, xui_hover');
                } else {}
                if (SETTINGS.autorefresh.sel == 'true') {
                    _X(WIN.full[WIN.key].winElem).XappendTo(_X(WIN.globalDIV).Xfind(WIN.body)).css({'z-index': settings.zIndex});
                    _X(WIN.full[WIN.key].winOverlay).XappendTo(_X(WIN.globalDIV).Xfind(WIN.body)).css({'z-index': settings.zIndex - 1});
                } else {
                    _X(WIN.full[WIN.key].winElem).css({'z-index': settings.zIndex});
                    _X(WIN.full[WIN.key].winOverlay).css({'z-index': settings.zIndex - 1});
                }
                _X(WIN.full[WIN.key].winBar).classAdd('xui_highlight');
            };
            this.WindowMoveToSide = function() {
                var amount_move = 5;
                var pos = {
                    lefT:   {left: 0, right: '', top: 50, bottom: '', width: amount_move, height: FHeight(3)},
                    lefB:   {left: 0, right: '', top: '', bottom: 50, width: amount_move, height: FHeight(3)},
                    rightT: {left: '', right: 0, top: 50, bottom: '', width: amount_move, height: FHeight(3)},
                    rightB: {left: '', right: 0, top: '', bottom: 50, width: amount_move, height: FHeight(3)},
                    topL:   {left: 20, right: '', top: 0, bottom: '', width: FWidth(5), height: amount_move},
                    topR:   {left: '', right: 20, top: 0, bottom: '', width: FWidth(5), height: amount_move},
                    topC:   {left: FWidth(3), right: '', top: 0, bottom: '', width: FWidth(3), height: amount_move},
                    center: {left: FWidth(9) * 4, right: '', top: FHeight(7) * 3, bottom: '', width: FWidth(9), height: FHeight(7)},
                };
                var that = _X(WIN.full[WIN.key].winElem);
                var store = WIN.full[WIN.key].winData;
                var elL = that.position('left', 'offset');
                var elT = that.position('top', 'offset');
                var elW = that.position('width', 'offset');
                var elH = that.position('height', 'offset');
                var winW = _X(WIN.globalDIV).position('width', 'offset');
                function ResizeMoveToSide(width, height, left, top) {
                    _X(WIN.full[WIN.key].winElem).css({left: left, top: top, width: width, height: height});
                    _X(window).off({mouseup: mouseup});
                }
                if (elH > 39) {
                    if (elW < winW) {
                        store.left = elL;
                        store.top = elT;
                        store.width = elW;
                        store.height = elH;
                        //console.log(store);
                    } else {}
                    _X.Xeach(pos, function(k, v) {
                        _X('<div')
                            .XappendTo('body')
                            .classAdd('remove_on_mouseup, xui_disabled, xui_corner_all')
                            .css({
                                position: 'absolute',
                                margin: 3,
                                'background-color': 'red',
                                'z-index': 2000,
                                left: v.left,
                                right: v.right,
                                top: v.top,
                                bottom: v.bottom,
                                width: v.width,
                                height: v.height,
                            });
                    });
                    var mouseup = function(e) {
                        //left top
                        if (e.pageX < amount_move && e.pageY < FHeight(2)) {
                            ResizeMoveToSide(FWidth(2), FHeight(2), 0, 0);
                        }
                        //right top
                        else if (e.pageX > (FWidth() - amount_move) && e.pageY < FHeight(2)) {
                            ResizeMoveToSide(FWidth(2), FHeight(2), FWidth(2), 0);
                        }
                        //left bottom
                        else if (e.pageX < amount_move && e.pageY > FHeight(2)) {
                            ResizeMoveToSide(FWidth(2), FHeight(2), 0, FHeight(2));
                        }
                        //right bottom
                        else if (e.pageX > (FWidth() - amount_move) && e.pageY > FHeight(2) ) {
                            ResizeMoveToSide(FWidth(2), FHeight(2), FWidth(2), FHeight(2));
                        }
                        //Left
                        else if (e.pageX < FWidth(3) && e.pageY < amount_move) {
                            ResizeMoveToSide(FWidth(2), FHeight(), 0, 0);
                        }
                        //Right
                        else if (e.pageX > (FWidth() - FWidth(3)) && e.pageY < amount_move) {
                            ResizeMoveToSide(FWidth(2), FHeight(), FWidth(2), 0);
                        }
                        //Full
                        else if (e.pageX > FWidth(3) && e.pageX < (FWidth() - FWidth(3)) && e.pageY < amount_move) {
                            ResizeMoveToSide(FWidth(), FHeight(), 0, 0);
                        }
                        //Center
                        else if (e.pageX > (FWidth(7) * 3) && e.pageX < (FWidth() - FWidth(7) * 3) && e.pageY > (FHeight(7) * 3) && e.pageY < (FHeight() - FHeight(7) * 3)) {
                            ResizeMoveToSide(FWidth(3), FHeight(2), FWidth(3), FHeight(5));
                        }
                        else {
                           _X(window).off({mouseup: mouseup});
                        }
                    };
                    _X(window).on({mouseup: mouseup});
                } else {}
            };

            this.ResizeStatusBar = function() {
                var status_width = _X(WIN.globalDIV).Xfind(WIN.taskbar).position('width', 'offset') - 7;
                var selecteditems = _X(WIN.globalDIV).Xfind('.thiswindow_statusbar').length;
                var resultat = (status_width / selecteditems) - 8;
                _X(WIN.globalDIV).Xfind('.thiswindow_statusbar').css({width: resultat});
                //console.log(status_width, selecteditems, resultat);
            };

            this.FindWindowKey = function(that) {
                _X.Xeach(WIN.full, function(k, v) {
                    if (_X(v.winElem)[0] == _X(that)[0] || _X(v.winBar)[0] == _X(that)[0]) {
                        WIN.key = k;
                    } else {}
                });
            };

            this.WindowLogo = function(options) {
                var defaults = {
                    item: '',
                    show: true,
                };
                var settings = _X.JoinObj(defaults, options);
                var item = _X(settings.item);
                if (settings.show === true) {
                    setTimeout(function() {
                        var width = item.parent().position('width', 'offset');
                        var height = item.parent().position('height', 'offset');
                        if (width < height) {
                            _X('<img')
                                .XappendTo(item)
                                .classAdd('xui_disabled')
                                .css({
                                    position: 'absolute',
                                    opacity: '0.15'
                                })
                                .attr({
                                    src: '/images/catiadesign_logo_004.png',
                                    width: '100%',
                                    align: 'middle',
                                });
                        }
                    }, 30);
                }
            };

            this.init = function(options) {
                var obj = SELECTED.obj;
                var defaults = {
                    to: _X(WIN.globalDIV).Xfind(WIN.body),
                    statusBarTo: _X(WIN.globalDIV).Xfind(WIN.taskbar),
                    windowType: self.type[1], // 1 => default window, 2 => small fixed, 3 => right click menu
                    zIndex: 1501,
                    width: 300,
                    height: 300,
                    fontSize: 15,
                    topBar: 0, // 0 => no searchbar, 1 => one searchbars, 2 => two searchbars
                    scroll: 'auto',
                    open: true,
                    clasa: '',
                    name: '',
                    leftSize: 0,
                    middlebodywidth: 0,
                    imageshow: true,
                    menuTitle: true,
                    dragArea: _X(WIN.globalDIV).Xfind(WIN.body),
                };
                var settings = _X.JoinObj(defaults, options);
                //Modal Overlay
                if ( (SETTINGS.modal.sel == 'true') && (settings.windowType.modal === true) ) {
                    _X.CreateTagElements({
                        t: settings.to, 
                        a: [
                            {
                                classAdd: 'xui_overlay, ' + settings.name + '_overlay',
                                css: {
                                    'z-index': settings.zIndex - 1
                                },
                                init: function(that) {
                                    _X.Xeach(WIN.full, function(k, v) {
                                        if (v.winOverlay === undefined) {
                                            v.winOverlay = that;
                                        }
                                    });
                                },
                            },
                        ],
                    }); 
                }
                //Full Window
                var LeftSizePosition = function() {
                    if (settings.height == 'auto') {return 'relative'}
                    else {return 'absolute'}
                };
                var TopBar = function() {
                    if (settings.windowType == self.type[1] || settings.windowType == self.type[2]) {
                        if (settings.topBar === 0) {return 0}
                        else if (settings.topBar === 1) {return 40}
                        else if (settings.topBar === 2) {return 75}
                    } else {return 0}
                };
                _X.CreateTagElements({
                    t: settings.to,
                    a: [
                        {
                            classAdd: 'thiswindow, shadow_border, xui_corner_all, xui_content, ' + settings.name + '_window, ' + settings.clasa,
                            css: {
                                position: 'absolute',
                                visibility: 'hidden',
                                width: settings.width,
                                height: settings.height,
                                //'box-sizing': 'border-box',
                                border: 0,
                                'font-size': settings.fontSize,
                                'z-index': settings.zIndex,
                                overflow: settings.windowType.overflow,
                            },
                            on: {
                                mouseenter: function() {
                                    if (_X('body').classBool('mousedown_true') === false) {
                                        self.FindWindowKey(this);
                                    } else {}
                                },
                                mousedown: function(e) {
                                    _X('body').classAdd('mousedown_true');
                                    if (_X(this).css('z-Index') !== 1501) {
                                        self.WindowSelect({zIndex: settings.zIndex});
                                    } else {}
                                    //console.log(WIN.full);
                                    if (settings.windowType !== self.type[1]) {
                                        if ( (SETTINGS.drag.sel == 'true') && (settings.windowType.drag === true) ) {
                                            _X.XDraggable({item: this, mouse: e, dragArea: settings.dragArea});
                                        } else {}
                                    } else {}
                                },
                                contextmenu: function(e) {
                                    e.preventDefault();
                                    e.stopImmediatePropagation();
                                },
                                dblclick: function(e) {
                                    e.preventDefault();
                                    e.stopImmediatePropagation();
                                },
                            },
                            init: function(that) {
                                _X.Xeach(WIN.full, function(k, v) {
                                    if (v.winElem === undefined) {
                                        v.winElem = that;
                                    } else {}
                                });
                                _X(that).OpenWindow({
                                    maxSize: settings.windowType.maxSize,
                                    open: settings.open,
                                });
                                self.FindWindowKey(that);
                            },
                            items: [
                                {
                                    classAdd: 'thiswindow_header',
                                    init: function(that) {
                                        if (settings.windowType == self.type[1]) {
                                            var DisableHeader = function() {
                                                if (SETTINGS.header.sel == 'true') {return 'xui_header';}
                                                else {return  '';}
                                            };
                                            _X(that)
                                                .classAdd('xui_corner_all')
                                                .classAdd(DisableHeader())
                                                .css({
                                                    position: 'relative',
                                                    height: 33,
                                                    cursor: 'pointer',
                                                    overflow: 'hidden',
                                                    margin: 2
                                                })
                                                .on({
                                                    mousedown: function(e) {
                                                        if (settings.windowType == self.type[1]) {
                                                            self.WindowMoveToSide();
                                                        }
                                                        if ( (SETTINGS.drag.sel == 'true') && (settings.windowType.drag === true) ) {
                                                            _X.XDraggable({item: _X(this).parent(), mouse: e, dragArea: settings.dragArea});
                                                        } else {}
                                                    },
                                                    dblclick: function(e) {
                                                        e.preventDefault();
                                                        e.stopImmediatePropagation();
                                                        self.buttons.WindowMinMax.init();
                                                    },
                                                });
                                            //Title -- Left Side Header
                                            _X('<div')
                                                .XappendTo(that)
                                                .classAdd('format_text')
                                                .css({
                                                    display: 'block',
                                                    float: 'left',
                                                    padding: 3,
                                                    width: '47%',
                                                })
                                                .iconAdd({ico: obj.ico, color: obj.color, size: 27})
                                                .append(' ' + obj.title);
                                            //Buttons -- Right Side Header
                                            _X('<div')
                                                .XappendTo(that)
                                                .css({
                                                    display: 'block',
                                                    float: 'right',
                                                    width: '47%',
                                                })
                                                .MenuElements({
                                                    array: _X.Xsearch({a: self.buttons, s: 'rc1'}),
                                                    pushObj: false,
                                                    pushItem: false,
                                                    css: {float: 'right'},
                                                    title: false,
                                                    color: false,
                                                    menuRC: false,
                                                });
                                        } else if (settings.windowType == self.type[2]) {
                                            _X(that).css({height: 24});
                                            self.WindowLogo({item: that, show: settings.imageshow});
                                            if (settings.menuTitle === true) {
                                                _X('<div')
                                                    .XappendTo(that)
                                                    .classAdd('xui_disabled, format_text')
                                                    .css({'text-align': 'center'})
                                                    .append(obj.title);
                                            }
                                            _X('<div')
                                                .XappendTo(that)
                                                .css({
                                                    position: 'absolute',
                                                    cursor: 'pointer',
                                                    top: -13,
                                                    left: -13,
                                                })
                                                .iconAdd({ico: obj.ico, color: obj.color, size: 35});
                                            var temp = [
                                                {ico: 'toll', right: 20, init: self.buttons.WindowHideShow.init},
                                                {ico: 'cancel', right: -10, init: self.buttons.WindowClose.init},
                                            ];
                                            _X.Xeach(temp, function(k, v) {
                                                _X('<div')
                                                    .XappendTo(that)
                                                    .iconAdd({ico: v.ico, size: 30})
                                                    .css({
                                                        position: 'absolute',
                                                        cursor: 'pointer',
                                                        top: -10,
                                                        right: v.right,
                                                    })
                                                    .on({
                                                        mouseenter: function() {
                                                            _X(this).Xfind('i').css({color: 'red'});
                                                        },
                                                        mouseleave: function() {
                                                            _X(this).Xfind('i').css({color: ''});
                                                        },
                                                        click: function() {
                                                            v.init();
                                                        },
                                                    });
                                            });
                                        } else if (settings.windowType == self.type[3]) {
                                            self.WindowLogo({item: that, show: settings.imageshow});
                                            if (settings.menuTitle === true) {
                                                _X('<div')
                                                    .XappendTo(that)
                                                    .classAdd('format_text')
                                                    .css({
                                                        padding: 2,
                                                        'margin-left': 10,
                                                        'margin-right': 10,
                                                        'text-align': 'center',
                                                        'font-size': 10,
                                                        color: '#636363',
                                                    })
                                                    .iconAdd({ico: obj.ico, color: obj.color, size: 20})
                                                    .append(_X.AddSpace(1) + obj.title);
                                            }
                                        } else {}
                                    },
                                }, {
                                    classAdd: 'thiswindow_body',
                                    css: {
                                        position: 'relative',
                                        height: 'calc(100% - ' + settings.windowType.bodyHeightCalc + 'px)',
                                        overflow: 'hidden',
                                    },
                                    items: [
                                        {
                                            classAdd: 'body_top1',
                                            init: function(that) {
                                                if (settings.topBar === 1 || settings.topBar === 2) {
                                                    _X(that)
                                                        .css({
                                                            position: 'relative',
                                                            padding: 2,
                                                            height: 35,
                                                        });
                                                } else {}
                                            },
                                        }, {
                                            classAdd: 'body_top2',
                                            init: function(that) {
                                                if (settings.topBar === 2) {
                                                    _X(that)
                                                        .css({
                                                            position: 'relative',
                                                            padding: 2,
                                                            height: 35,
                                                        });
                                                } else {}
                                            }
                                        }, {
                                            classAdd: 'body_left',
                                            css: {
                                                position: 'absolute',
                                                width: parseInt(settings.leftSize),
                                                top: TopBar(),
                                                left: 0,
                                                bottom: 0,
                                                padding: 2,
                                                'user-select': 'text',
                                            },
                                        }, {
                                            classAdd: 'body_middle',
                                            css: {
                                                position: 'absolute',
                                                left: settings.leftSize,
                                                width: settings.middlebodywidth ,
                                                top: TopBar(),
                                                bottom: 0,
                                                padding: 2,
                                            },
                                        }, {
                                            classAdd: 'body_right',
                                            css: {
                                                position: LeftSizePosition(),
                                                left: settings.middlebodywidth + parseInt(settings.leftSize),
                                                top: TopBar(),
                                                right: 0,
                                                bottom: 0,
                                                padding: 2,
                                                'overflow-x': 'hidden',
                                                'overflow-y': settings.scroll,
                                            },
                                            items: [
                                                {
                                                    classAdd: 'body_right_top',
                                                }, {
                                                    classAdd: 'body_right_bottom',
                                                },
                                            ],
                                        },
                                    ],
                                }, {
                                    classAdd: 'thiswindow_footer',
                                    init: function(that) {
                                        if (settings.windowType == self.type[1]) {
                                            _X(that)
                                                .css({
                                                    position: 'relative',
                                                    height: 15,
                                                });
                                            //div for text
                                            _X('<div')
                                                .XappendTo(that)
                                                .classAdd('footer_text')
                                                .css({
                                                    'padding-left': 35,
                                                    'padding-top': 1,
                                                    'font-size': 10,
                                                });
                                            //divs for actual resize
                                            var temp = [
                                                {clasa: 'ico_submenu_resize_sw', left: 1, right: '', moveClass: 'window_resize_sw'},
                                                {clasa: 'ico_submenu_resize_se', left: '', right: 1, moveClass: 'window_resize_se'},
                                            ];
                                            _X.Xeach(temp, function(k, v) {
                                                _X('<div')
                                                    .XappendTo(that)
                                                    .classAdd(v.clasa)
                                                    .css({
                                                        position: 'absolute',
                                                        cursor: 'pointer',
                                                        bottom: 1,
                                                        left: v.left,
                                                        right: v.right,
                                                    })
                                                    .iconAdd({ico: 'adjust', size: 12})
                                                    .on({
                                                        mousedown: function(e) {
                                                            _X(this).classRemove(v.moveClass);
                                                            if (SETTINGS.resize.sel == 'true') {
                                                                _X(this).Xfind('i').css({color: 'red'});
                                                                _X(this).classAdd(v.moveClass);
                                                                self.ResizableFn({item: _X(this).parent('.thiswindow'), mouse: e});
                                                            } else {}
                                                        },
                                                        mouseup: function() {
                                                            _X(this).Xfind('i').css({color: ''});
                                                            _X(this).classRemove(v.moveClass);
                                                        },
                                                    });
                                            });
                                        } else {}
                                    },
                                },
                            ],
                        },
                    ],
                });
                //Add to Status Bar
                if (settings.windowType.statusbar === true) {
                    _X.CreateTagElements({
                        t: settings.statusBarTo, 
                        a: [
                            {
                                classAdd: 'thiswindow_statusbar, xui_corner_all, xui_header, shadow_border, format_text, ' + settings.name + '_bara_stare',
                                css: {
                                    float: 'left',
                                    padding: 2,
                                    margin: 1,
                                    'max-width': 200,
                                    cursor: 'pointer',
                                    'z-index': settings.zIndex,
                                },
                                iconAdd: {ico: obj.ico, color: obj.color, size: 25},
                                append: ' ' + obj.title,
                                on: {
                                    mouseenter: function() {
                                        _X.ReturnElements({item: this, obj: obj});
                                        self.FindWindowKey(this);
                                        _X(this).classAdd('xui_hover');
                                        //var tip = _X(this)[0].innerHTML;
                                        _X.AddTooltip({title: obj.title});
                                        _X(WIN.full[WIN.key].winElem).classAdd('xui_hover');
                                    },
                                    mouseleave: function() {
                                        _X(this).classRemove('xui_hover');
                                        _X('.tooltip_class').Xremove();
                                        _X(WIN.full[WIN.key].winElem).classRemove('xui_hover');
                                    },
                                    mousedown: function() {
                                        _X('body').classAdd('mousedown_true');
                                        if (_X(WIN.full[WIN.key].winElem).css('z-Index') !== 1501) {
                                            self.WindowSelect({zIndex: settings.zIndex});
                                        } else {}
                                    },
                                    dblclick: function(e) {
                                        self.buttons.WindowHideShow.init();
                                    },
                                    contextmenu: function(e) {
                                        e.preventDefault();
                                        e.stopImmediatePropagation();
                                        var x = new _X.Window();
                                        x.init({
                                            windowType: x.type[3],
                                            fontSize: 13,
                                            width: 115,
                                            height: 'auto',
                                            open: false,
                                            clasa: 'remove_on_mousedown',
                                        });
                                        x.right.MenuElements({
                                            array: settings.windowType.menuRC,
                                            pushObj: false,
                                            pushItem: false,
                                            icoSize: 25,
                                            click: 'mousedown',
                                            color: false,
                                        });
                                        x.win.OpenWindow();
                                        WIN.full.splice(WIN.key, 1);
                                        self.FindWindowKey(this);
                                    },
                                },
                                init: function(that) {
                                    _X.Xeach(WIN.full, function(k, v) {
                                        if (v.winBar === undefined) {
                                            v.winBar = that;
                                        } else {}
                                    });
                                },
                            },
                        ],
                    });
                }
                self.ResizeStatusBar();
                self.WindowSelect({zIndex: settings.zIndex});
                self.GetElements();
                WIN.full.push(NULLWIN());
            };
        };

        /*Structure Example:
        _X.CreateTagElements({
            t: '', //element where to append
            a: [
                {
                    //create the element '<div' || '<img' || html tag
                    elem: '',

                    classAdd: {},
                    
                    css: {},
                    
                    append: '',
                    
                    on: {},
                    
                    iconAdd: {},
                    
                    //function
                    init: {},
                    
                    //subelements
                    items: [
                        {
                            elem: '',
                            classAdd: {},
                            css: {},
                            on: {},
                            iconAdd: {},
                            init: {},
                            items: [
                                //...
                            ],
                        },{
                            //...
                        }
                    ],
                },{
                    //...
                },
            ],
        });
*/

        //Create elements from object
        _X.CreateTagElements = function(options) {
            var defaults = {
                a: '', //a => array
                t: '', //t => element where to append
            };
            var s = _X.JoinObj(defaults, options);
            _X.prototype._init = function(elem) {
                var that = this;
                if (elem !== undefined) {
                    elem(that);
                }
                return that;
            };
            //research in Items and apply again all Properties
            _X.prototype._items = function(elem) {
                var that = this;
                if (elem.hasOwnProperty('items')) {
                    Start(elem.items, that);
                }
                return that;
            };
            function Start(array, appendto) {
                _X.Xeach(array, function(k, v) {
                    if (v.elem === undefined) {
                        v.elem = '<div';
                    } else {
                        v.elem = v.elem;
                    }
                    _X(v.elem)
                        .XappendTo(appendto)
                        .classAdd(v.classAdd)
                        .attr(v.attr)
                        .css(v.css)
                        .iconAdd(v.iconAdd)
                        .append(v.append)
                        .on(v.on)
                        ._init(v.init)
                        ._items(v);
                });
            }
            Start(s.a, s.t);
        };

        //_X Object Prototype
        _X.prototype = {
            name:           info.name,
            author:         info.author,
            created:        info.created,
            version:        info.version,
            constructor:    _X,
            length:         0,

            x_new: function(e) {
                var that = this;
                var x = _X(e);
                var i;
                for (i = 0; i < that.length; i++) {
                    that[i].appendChild(x[0]);
                }
                return x;                
            },

            //Add Icon || Image
            iconAdd: function(options) {
                var defaults = {
                    ico: '',
                    color: '',
                    size: '',
                    clasa: '',
                    css: {},
                    on: {},
                };
                var settings = _X.JoinObj(defaults, options);
                var that = this;
                if (options !== undefined && settings.ico !== '') {
                    if (settings.ico.indexOf('/') > -1) {
                        _X('<img')
                            .XappendTo(that)
                            .attr({
                                width: settings.size,
                                height: settings.size,
                                src: settings.ico,
                            })
                            .classAdd('xui_corner_all')
                            .css(settings.css)
                            .css({
                                color: settings.color,
                                'pointer-events': 'none',
                                'vertical-align': 'middle',
                            })
                            .on(settings.on);
                    } else if (settings.ico.indexOf('_.') > -1) {
                        _X('<img')
                            .XappendTo(that)
                            .attr({
                                width: settings.size,
                                height: settings.size,
                                src: settings.ico,
                            })
                            .classAdd('xui_corner_all')
                            .css(settings.css)
                            .css({
                                color: settings.color,
                                'pointer-events': 'none',
                                'vertical-align': 'middle',
                            })
                            .on(settings.on);
                    } else {
                        _X('<i')
                            .XappendTo(that)
                            .classAdd('material-icons')
                            .classAdd(settings.clasa)
                            .append(settings.ico)
                            .css(settings.css)
                            .css({
                                'text-shadow': '1px 1px 1px #636363',
                                //'text-shadow': '1px 1px 1px black, -1px -1px 1px white', //other way of display
                                color: settings.color,
                                'font-size': settings.size,
                            })
                            .on(settings.on);
                    }
                }
                return that;
            },

            //_X(?).Xval()      => GET element value
            //_X(?).Xval('?')   => SET element value
            Xval: function(e) {
                var that = this;
                if (e === undefined) {
                    return isNaN(that[0].value) ? that[0].value : parseInt(that[0].value);
                } else {
                    that[0].value = e;
                    return that;
                }
            },

            //_X(?).getElem('?') => GET first || last element (+ length)
            getElem: function(e) {
                var that = this;
                var x = new _X();
                var i;
                if (e.toLowerCase().indexOf('help') > -1) {
                    new Help({
                        name: '.getElem("Param 1")',
                        param1: "'first', 'last'",
                        usage: "_X(?).getElem('first');",
                    });
                } else if (e.toLowerCase().indexOf('first') > -1) {
                    for (i = 0; i < that.length; i++) {
                        if (i === 0) {
                            x[0] = that[i];
                        }
                    }
                } else if (e.toLowerCase().indexOf('last') > -1) {
                    for (i = 0; i < that.length; i++) {
                        if (i == that.length - 1) {
                            x[0] = that[i];
                        }
                    }
                }
                x.length = GetObjectLength(x);
                return x;
            },

            //_X(?).classAdd('?, ?') => SET element class
            classAdd: function(e) {
                var that = this;
                var oldClass;
                var addClass;
                var i;
                for (i = 0; i < that.length; i++) {
                    if (e !== undefined) {
                        oldClass = GetClasa(that[i]);
                        addClass = e.replace(/\s/g, '').split(',');
                        that[i].className = ClassAddRemove({type: 'join', arr1: oldClass, arr2: addClass});
                    }
                }
                return that;
            },

            //_X(?).classRemove('?, ?') => SET element class
            classRemove: function(e) {
                var that = this;
                var oldClass;
                var removeClass;
                var i;
                for (i = 0; i < that.length; i++) {
                    oldClass = GetClasa(that[i]);
                    removeClass = e.replace(/\s/g, '').split(',');
                    that[i].className = ClassAddRemove({type: 'remove', arr1: oldClass, arr2: removeClass});
                }
                return that;
            },

            //_X(?).classHave('?') => GET a selection of elements based on class (+ length)
            classHave: function(e) {
                var that = this;
                var x = new _X();
                var a = [];
                var i;
                var classRead;
                for (i = 0; i < that.length; i++) {
                    classRead = GetClasa(that[i]);
                    if (classRead.indexOf(e) > -1) {
                        a.push(that[i]);
                    }
                }
                ArrayToObject(a, x);
                x.length = GetObjectLength(x);
                return x;
            },

            //_X(?).classBool('?, ?') => return TRUE / FALSE on class check, bis 3 elementen check
            classBool: function(e) {
                var that;
                var i = 0;
                var arr = e.replace(/\s/g, '').split(',');
                while ( (that = this[i++]) ) {
                    if (that.nodeType === 1) {
                        if (arr.length === 1 && GetClasa(that).indexOf(arr[0]) > -1) {
                            return true;
                        } else if (arr.length === 2 && GetClasa(that).indexOf(arr[0]) > -1 && GetClasa(that).indexOf(arr[1]) > -1) {
                            return true;
                        } else if (arr.length === 3 && GetClasa(that).indexOf(arr[0]) > -1 && GetClasa(that).indexOf(arr[1]) && GetClasa(that).indexOf(arr[2]) > -1) {
                            return true;
                        }
                    }
                }
                return false;
            },

            //_X(?).txt()     => GET current element TEXT
            //_X(?).txt('?')  => SET the TEXT to element
            txt: function(e) {
                var that = this;
                if (e !== undefined) {
                    that[0].innerText += e;
                        return that;
                } else {
                    if (that[0].innerText.length > 0) {
                        return that[0].innerText;
                    }
                }
            },

            //_X(?).txtHave('?') => GET a selection of elements based on internal text search (+ length)
            txtHave: function(e) {
                var that = this;
                var x = new _X();
                var a = [];
                var i;
                for (i = 0; i < that.length; i++) {
                    if (that[i].innerText === e) {
                        a.push(that[i]);
                    }
                }
                ArrayToObject(a, x);
                x.length = GetObjectLength(x);
                return x;
            },

            //_X(?).XappendTo('?') => SET element to parent
            XappendTo: function(e) {
                var that = this;
                var getEl = _X(e);
                if (getEl.length > 0 && that.length > 0) {
                    getEl[0].appendChild(that[0]);
                }
                return that;
            },

            //_X(?).append('?') => append OBJECT or HTML other object
            append: function(e) {
                var that = this;
                var i;
                if (e !== undefined) {
                    if (typeof e == 'object') {
                        for (i = 0; i < that.length; i++) {
                            that[i].appendChild(e[0]);
                        }
                    } else {
                        for (i = 0; i < that.length; i++) {
                            that[i].innerHTML += e;
                        }
                    }
                }
                return that;
            },

            //_X(?).prepend('?') => prepend OBJECT or HTML other object
            prepend: function(e) {
                var that = this;
                if (e !== undefined && typeof e == 'object') {
                    that[0].insertBefore(e[0], that[0].childNodes[0]);
                } else {
                    that[0].innerHTML += e;
                }
                return that;
            },

            //_X(?).Xshow()     => show the current element
            //_X(?).Xshow('?')  => show the current element with buildin EFFECTS
            Xshow: function(effect) {
                var that = this;
                var i;
                for (i = 0; i < that.length; i++) {
                    if (effect !== undefined) {
                        loadEffect(effect, that[i], 'show');
                    }                    
                    that[i].style.display = '';
                    that[i].style.visibility = 'visible';                    
                }
                return that;
            },

            //_X(?).Xhide()     => hide the current element
            //_X(?).Xhide('?')  => hide the current element with buildin EFFECTS
            Xhide: function(effect) {
                var that = this;
                var i;
                for (i = 0; i < that.length; i++) {
                    if (effect !== undefined) {
                        loadEffect(effect, that[i], 'hide');
                    } else {
                        that[i].style.display = 'none';
                        that[i].style.visibility = 'hidden';
                    }
                }
                return that;
            },

            //_X(?).attr('? element')              => GET element attribute
            //_X(?).attr({'? element': ? value})   => SET element attribute
            attr: function(e) {
                var that = this;
                var i, j;
                if (e !== undefined) {
                    if (typeof e == 'object') {
                        for (i = 0; i < that.length; i++) {
                            for (j in e) {
                                that[i].setAttribute(j, e[j]);
                            }
                        }
                        return that;
                    } else {
                        return that[0].getAttribute(e);
                    }
                } else {
                    return that;
                }
            },

            //_X(?).checkBool() => return TRUE / FALSE
            checkBool: function() {
                var that = this;
                if (that[0] !== undefined) {
                    return (that[0].checked === true) ? true : false;
                }
            },

            //_X(?).css('? element key')            => GET element css value
            //_X(?).css({'? element key': ? value}) => SET element css
            css: function(e) {
                var that = this;
                var i, j;
                var cssElements = ['left', 'right', 'top', 'bottom', 'width', 'max-width', 'min-width', 'height', 'margin', 'padding', 'perspective', 'font-size', 'margin-left', 'margin-right', 'margin-top', 'margin-bottom', 'padding-left', 'padding-right', 'padding-top', 'padding-bottom', 'border-radius'];
                if (e !== undefined) {    
                    if (typeof e == 'object') {
                        for (i = 0; i < that.length; i++) {
                            for (j in e) {
                                if (that[i].style !== undefined) {
                                    if (cssElements.indexOf(j) > -1 && typeof e[j] == 'number' && e[j] !== 0) {
                                        that[i].style[j] = e[j] + 'px';
                                    } else {    
                                        that[i].style[j] = e[j];
                                    }
                                }
                            }
                        }
                        return that;
                    } else if (typeof e == 'string') {
                        if (that[0] !== undefined && that[0].style[e] !== undefined) {
                            var elem = that[0].style[e];
                            return (elem.indexOf('px') > -1) ? parseInt(elem) : elem;
                        }
                    }
                } else {
                    return that;
                }
            },

            //_X(?).cssHave([? 'css element', ? 'css value']) => Check elements CSS based on a CSS element (+length) 
            cssHave: function(e) {
                var that = this;
                var x = new _X();
                var a = [];
                var i;
                for (i = 0; i < that.length; i++) {
                    if (that[i] !== undefined && that[i].style[e[0]] === e[1]) {
                        a.push(that[i]);
                    }
                }
                ArrayToObject(a, x);
                x.length = GetObjectLength(x);
                return x;
            },

            //_X(?).cssBool([? css element, ? css value]) => return TRUE / FALSE on a css element check
            cssBool: function(e) {
                var that;
                var i = 0;
                while ( (that = this[i++]) ) {
                    if (that.nodeType === 1 && that.style[e[0]] === e[1]) {
                        return true;
                    }
                }
                return false;
            },
            
            //_X(?).on( ['? ? ?', function(){}] )      => SET event like an ARRAY syntax
            //_X(?).on( {'?': function(){}} )          => SET event like an OBJECT syntax
            on: function(e) {
                var that = this;
                var i, j;
                var event;
                if (e !== undefined) {
                    if (e.length > 0 && e[0] !== null) {
                        event = e[0].split(/[ ]+/);
                        for (i = 0; i < that.length; i++) {
                            for (j = 0; j < event.length; j++) {
                                that[i].addEventListener(event[j], e[1]);
                            }
                        }
                    } else {
                        for (i = 0; i < that.length; i++) {
                            for (j in e) {
                                that[i].addEventListener(j, e[j]);
                            }
                        }
                    }
                }
                return that;
            },

            //_X(?).off( {'? function name': ? function name} ) => REMOVE event from element
            off: function(e) {
                var that = this;
                var i, j;
                for (i = 0; i < that.length; i++) {
                    for (j in e) {
                        that[i].removeEventListener(j, e[j]);
                    }
                }
                return that;
            },

            //_X(?).Xempty() => DELETE element contains
            Xempty: function() {
                var that = this;
                var i;
                if (that[0] !== undefined) {
                    for (i = 0; i < that.length; i++) {
                        that[i].innerHTML = '';
                    }
                    return that;
                }
                return that;
            },

            //_X(?).Xremove() => DELETE current element
            Xremove: function() {
                var that = this;
                var i;
                for (i = 0; i < that.length; i++) {
                    if (that[i] !== undefined) {
                        that[i].parentNode.removeChild(that[i]);
                    }
                }
            },

            //_X(?).Xfind('children')   => return all children on first level from element
            //_X(?).Xfind('.?')         => search for class elements
            //_X(?).Xfind('#?')         => search for id elements
            //_X(?).Xfind('?')          => search for tag elements
            Xfind: function(e) {
                var that = this;
                var x = new _X();
                var a = [];
                var elem;
                var i, j;
                if (that[0] !== undefined || that[0] !== null) {
                    //children
                    if (e == 'children') {
                        for (i = 0; i < that.length; i++) {
                            for (j = 0; j < that[i].children.length; j++) {
                                a.push(that[i].children[j]);
                            }
                        }
                    }
                    else {
                        elem = e.replace(/\s/g, '').split(',');
                        _X.Xeach(elem, function(k, v) {
                            _X.Xeach(SearchChildren({a: that, s: v}), function(k2, v2) {
                                a.push(v2);
                            });
                        });
                    }
                    ArrayToObject(a, x);
                }
                x.length = GetObjectLength(x);
                return x;
            },

            //_X(?).parent()       => return first parent from element
            //_X(?).parent('.?')   => search for class parent element
            //_X(?).parent('#?')   => search for id parent element
            parent: function(e) {
                var that = this;
                var x = new _X();
                var parent;
                var getAttr;
                var replaceString;
                var i = 1;
                if (that[0] !== undefined || that[0] !== null) {
                    //first parent
                    parent = that[0].parentNode;
                    if (e === undefined) {
                        x[0] = parent;
                    } else if (!isNaN(e)) {
                        //start from secont parent
                        while (e > i++) {
                            parent = parent.parentNode;
                            x[0] = parent;
                        }                        
                    } else {
                        getAttr = parent.getAttribute(ReturnClassOrId(e));
                        replaceString = e.replace(/[.#]/g, '');
                        while ((' ' + getAttr + ' ').indexOf(' ' + replaceString + ' ') < 0 && parent !== _X('html')[0]) {
                            parent = parent.parentNode;
                            getAttr = parent.getAttribute(ReturnClassOrId(e));
                            x[0] = parent;
                        }
                    }
                }
                x.length = GetObjectLength(x);
                return x;
            },

            //_X(?).position('width || height || left || top',  'offset || client || inner || outer || box || scroll || screen || natural');
            position: function(type, e) {
                var that = this[0];
                var elem = ['offset' ,'client', 'inner', 'outer', 'scroll', 'natural'];
                if (type.toLowerCase().indexOf('help') > -1) {
                    new Help({
                        name: '.position("Param 1", "Param 2")',
                        param1: "First parameter from '.position' function have to be: 'width || height || left || top'",
                        param2: "Second parameter from Position function have to be: 'offset || client || inner || outer || box || scroll || screen || natural'",
                        usage: "_X(?).position('width', 'offset');",
                    });
                    return this;
                } else if (that !== undefined && type !== undefined && e !== undefined) {
                    var str = type.charAt(0).toUpperCase() + type.slice(1); 
                    return (elem.indexOf(e) > -1) ? that[e + str]
                        : (e == 'box') ? that.getBoundingClientRect()[type]
                        : (e == 'screen') ? window.screen[type]
                        : (e == 'window') ? window['inner' + str]
                        : null;
                }
            },

            //_X(?).Xload({url: '', callback: '', dataType: ''})
            Xload: function(options) {
                var that = this;
                var defaults = {
                    url: '',
                    callback: undefined,
                    dataType: '',
                    syncron: true,
                    /*
                        ''(default)     => get as string
                        'text'          => get as string
                        'arraybuffer'   => get as ArrayBuffer (for binary data, see chapter ArrayBuffer, binary arrays)
                        'blob'          => get as Blob (for binary data, see chapter Blob)
                        'document'      => get as XML document (can use XPath and other XML methods)
                        'json'          => get as JSON (parsed automatically)
                    */
                };
                var s = _X.JoinObj(defaults, options);
                var newUrl;
                var xhr = new XMLHttpRequest();
                function ReturnUrl(url) {
                    if (url.indexOf('#') < 0) {
                        return url;
                    } else {
                        newUrl = url.split(' ');
                        return newUrl[0];
                    }
                }
                function ReturnData(to, url, responseType) {
                    if (url.indexOf('#') < 0) {
                        return responseType;
                    } else {
                        newUrl = url.split(' ');
                        var temp = _X(to).append(responseType).Xfind(newUrl[1]);
                        _X(to).Xempty();
                        return temp;
                    }
                }
                xhr.open('GET', ReturnUrl(s.url), s.syncron);
                xhr.responseType = s.dataType;
                xhr.send(null);
                xhr.onload = function() {
                    if (this.readyState == 4 && this.status == 200) {
                        _X(that).append(ReturnData(that, s.url, xhr.response));
                        if (s.callback !== undefined) {
                            s.callback.apply(xhr, []);
                        } else {}
                    } else {
                        console.log('*** Error ***');
                    }
                };
                //xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
                //xhr.getAllResponseHeaders();
                //xhr.getResponseHeader('Content-Type')
                return that;
            },

            XInput: function(options) {
                var defaults = {
                    id: '',
                    name: 'Search',
                    width: '100%',
                    height: 'auto',
                    type: 'text',
                    tooltip: false,
                    tooltipData: '',
                    value: '',
                    css: {},
                };
                var s = _X.JoinObj(defaults, options);
                var that = this;
                function InsertClass() {
                    if (s.id.indexOf('.') > -1) {
                        return s.id.replace('.', '');
                    } else {
                        return s.id;
                    }
                }
                _X('<input')
                    .XappendTo(that)
                    .classAdd(InsertClass())
                    .attr({
                        placeholder: s.name,
                        type: s.type,
                        value: s.value,
                        maxlength: '50'
                    })
                    .css({
                        'box-sizing': 'border-box',
                        width: s.width,
                        height: s.height,
                    })
                    .css(s.css)
                    .on({
                        mouseenter: function() {
                            if (s.tooltip === true) {
                                _X(this).classAdd('xui_hover');
                                _X.AddTooltip({title: s.tooltipData});
                            }
                        },
                        mouseleave: function() {
                            if (s.tooltip === true) {
                                _X(this).classRemove('xui_hover');
                                _X('.tooltip_class').Xremove();
                            }
                        },
                    });
                return that;
            },

            CheckBox: function(options) {
                var defaults = {
                    check: true,
                };
                var settings = _X.JoinObj(defaults, options);
                var that = this;
                if (settings.check === true) {
                    _X('<div')
                        .XappendTo(that)
                        .classAdd('input_checkbox')
                        .XInput({id: 'checkbox_input', type: 'checkbox', width: 'auto'})
                        .on({click: function(e) {
                            e.stopImmediatePropagation();
                        }});
                } else {}
                return that;
            },

            XButton: function(options) {
                var defaults = {
                    text: 'Button:',
                    width: 'auto',
                };
                var settings = _X.JoinObj(defaults, options);
                var that = this;
                this
                    .classAdd('xui_content, xui_corner_all')
                    .css({
                        cursor: 'pointer',
                        margin: 1,
                        width: settings.width,
                        'text-align': 'center',
                        'box-sizing': 'border-box',
                    })
                    .append(settings.text)
                    .on({
                        mouseenter: function() {
                            that.classAdd('xui_hover')
                                .css({color: 'red'});
                        },
                        mouseleave: function() {
                            that.classRemove('xui_hover')
                                .css({color: ''});
                        },
                    });
                return that;
            },

            MenuElements: function(options) {
                var defaults = {
                    array: [],
                    pushObj: true,
                    pushItem: true,
                    menuRC: _X.Xsearch({s: 'rc2'}),
                    icoSize: 25,
                    click: 'click',
                    title: true,
                    color: true,
                    clasa: '',
                    css: {},
                    on: {},
                };
                var s = _X.JoinObj(defaults, options);
                var that = this;
                var TitleLoad = function(elem) { 
                    if (s.title === true) {return _X.AddSpace(1) + elem.title;} else {return ''}
                };
                var ColorLoad = function(elem) { 
                    if (s.color === true) {return elem.color;} else {return ''}
                };
                _X.Xeach(s.array, function(k, v) {
                    _X('<div')
                        .XappendTo(that)
                        .classAdd('ico_full_body, xui_corner_all, format_text')
                        .classAdd(s.clasa)
                        .css({
                            padding: 3,
                            border: '1px solid transparent',
                        })
                        .css(s.css)
                        .iconAdd({ico: v.ico, color: ColorLoad(v), size: s.icoSize})
                        .append(_X('<div')
                            .append(TitleLoad(v))
                            .css({display: 'inline'})
                            .classAdd('edit_title')
                        )
                        .on(s.on)
                        .on({
                            mouseenter: function() {
                                _X(this).classAdd('xui_hover');
                            },
                            mouseleave: function() {
                                _X(this).classRemove('xui_hover');
                            },
                            mousedown: function() {
                                _X.ReturnElements({item: this, obj: v, pushItem: s.pushItem, pushObj: s.pushObj});
                                _X('.ico_full_body').classRemove('xui_active');
                                _X(this).classAdd('xui_active');
                            },
                            contextmenu: function(e) {
                                e.preventDefault();
                                e.stopImmediatePropagation();
                                if (s.menuRC !== false) {
                                    var x = new _X.Window();
                                    x.init({
                                        windowType: x.type[3],
                                        fontSize: 13,
                                        width: 115,
                                        height: 'auto',
                                        open: false,
                                        clasa: 'remove_on_mousedown',
                                    });
                                    x.right.MenuElements({
                                        array: s.menuRC,
                                        pushObj: false,
                                        pushItem: false,
                                        icoSize: 25,
                                        click: 'mousedown',
                                        color: false,
                                    });
                                    x.win.OpenWindow();
                                    WIN.full.splice(WIN.key, 1);
                                } else {}
                            }
                        })
                        .on([s.click, function() {
                            v.init();
                        }]);
                });
                return that;
            },

            OpenWindow: function(options) {
                var defaults = {
                    maxSize: false,
                    open: true,
                    effect: '',
                };
                var settings = _X.JoinObj(defaults, options);
                var that = this;
                var width = that.position('width', 'offset');
                var height = that.position('height', 'offset');
                //console.log(width, height);
                function Effect() {
                    if (settings.effect !== null) {return SETTINGS.effect.sel;}
                    else {return null;}
                }
                function Left() {
                    if (MOUSE.X > FWidth() - width) {
                        return MOUSE.X - width;
                    } else {
                        return MOUSE.X;
                    }
                }
                function Top() {
                    if (MOUSE.Y > FHeight() - height && MOUSE.Y < FHeight()) {
                        //console.log('1');
                        return MOUSE.Y - height;
                    } else if (MOUSE.Y > FHeight()) {
                        //console.log('2');
                        var value = window.innerHeight - MOUSE.Y;
                        //Valoare 36 corectare inaltime statusbar
                        return MOUSE.Y - height - (36 - value);
                    } else {
                        //console.log('3');
                        return MOUSE.Y;
                    }
                }
                if (settings.open === true) {
                    that.css({position: 'absolute'});
                    if (FWidth() < 700 && settings.maxSize === true) { 
                        that.css({
                                left: 0,
                                top: 0,
                                width: FWidth(),
                                height: FHeight(),
                            });
                    } else {
                        that.css({
                                left: Left(),
                                top: Top(),
                            });
                    }
                    that.Xshow(Effect());
                } else {}
                return that;
            },           
        };

        //Effects for Hide / Show prototype function
        (function CreateEffects() {
            var type = [
                {name: 'swipe',         matrix: '2,0,0,0,  0,1,0,0,  0,0,1,0,  0,0,0,1'},
                {name: 'reverse',       matrix: '-1,2,0,0,  0,1,0,0,  0,0,1,0,  0,0,0,.5'},
                {name: 'unfold_big',    matrix: '1,0,0,0,  0,1,0,0,  0,0,1,0,  0,0,0,.5'},
                {name: 'unfold_small',  matrix: '1,0,0,0,  0,1,0,0,  0,0,1,0,  0,0,0,1.5'},
                {name: 'drop_left',     matrix: '1,0,0,0,  0,1,0,0,  0,0,1,0,  -50,0,0,1'},
                {name: 'drop_top',      matrix: '1,0,0,0,  0,1,0,0,  0,0,1,0,  0,-50,0,1'},
                {name: 'drop_left_top', matrix: '1,0,0,0,  0,1,0,0,  0,0,1,0,  -50,-50,0,1'},
            ];
            var matNull = '1,0,0,0,  0,1,0,0,  0,0,1,0,  0,0,0,1';
            var effectStyles = document.createElement('style');
            effectStyles.type = 'text/css';
            document.head.appendChild(effectStyles);
            _X.Xeach(type, function(k, v) {
                //show
                effectStyles.sheet.insertRule('@keyframes ' + v.name + '_motion_show {from {transform: matrix3d(' + v.matrix + '); opacity: 0;} to {transform: matrix3d(' + matNull + '); opacity: 1;}}', 0);
                //hide
                effectStyles.sheet.insertRule('@keyframes ' + v.name + '_motion_hide {from {transform: matrix3d(' + matNull + '); opacity: 1;} to {transform: matrix3d(' + v.matrix + '); opacity: 0;}}', 0);
            });
            //console.log(effectStyles.sheet.cssRules);
        })();
        function loadEffect(effect, elem, hideshow) {
            var loadAnimation = function(name) {
                return {
                    'animation-name': name,
                    'animation-duration': '.5s',
                    'animation-timing-function': 'ease',
                    'animation-direction': 'normal',
                    'animation-fill-mode': 'none',
                };
            };                
            if (hideshow == 'show') {
                _X(elem).css(loadAnimation(effect + '_motion_show'));
            } else if (hideshow == 'hide') {
                _X(elem).css(loadAnimation(effect + '_motion_hide'));
                setTimeout(function() {
                    _X(elem).Xhide();
                }, 150); 
            }
        }           

        _X.GetRadians = function(degrees) {
            return degrees * (Math.PI / 180);
        };
        
        _X.GetDegrees = function(radians) {
            return radians * (180 / Math.PI);
        };
        
        _X.MATRIX = {
            round: function(val) {
                var min = 0.000005;
                var max = 0.999995;
                var rnd = 1000000;
                return val < -max ? -1
                    : val < min && val > -min ? 0
                    : val > max ? 1
                    : Math.round(val * rnd) / rnd;
            },
            RotateXAxis: function(val) {
                var s = this.round(Math.sin(val));
                var c = this.round(Math.cos(val));
                return [1, 0, 0, 0, 0, c, -s, 0, 0, s, c, 0, 0, 0, 0, 1];
            },
            RotateYAxis: function(val) {
                var s = this.round(Math.sin(val));
                var c = this.round(Math.cos(val));
                return [c, 0, s, 0, 0, 1, 0, 0, -s, 0, c, 0, 0, 0, 0, 1];
            },
            RotateZAxis: function(val) {
                var s = this.round(Math.sin(val));
                var c = this.round(Math.cos(val));
                return [c, -s, 0, 0, s, c, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
            },
            translate: function(x, y, z) {
                return [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, x, y, z, 1];
            },
            scale: function(w, h, d) {
                return [w, 0, 0, 0, 0, h, 0, 0, 0, 0, d, 0, 0, 0, 0, 1];
            },
            skew: function(x, y) {
                return [1, Math.tan(x), 0, 0, Math.tan(y), 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
            },
            multiplyMatrixAndPoint: function(matrix, point) {
                //Give a simple variable name to each part of the matrix, a column and row number
                var c0r0 = matrix[ 0], c1r0 = matrix[ 1], c2r0 = matrix[ 2], c3r0 = matrix[ 3];
                var c0r1 = matrix[ 4], c1r1 = matrix[ 5], c2r1 = matrix[ 6], c3r1 = matrix[ 7];
                var c0r2 = matrix[ 8], c1r2 = matrix[ 9], c2r2 = matrix[10], c3r2 = matrix[11];
                var c0r3 = matrix[12], c1r3 = matrix[13], c2r3 = matrix[14], c3r3 = matrix[15];
                //Now set some simple names for the point
                var x = point[0];
                var y = point[1];
                var z = point[2];
                var w = point[3];
                //Multiply the point against each part of the 1st column, then join together
                var resultX = (x * c0r0) + (y * c0r1) + (z * c0r2) + (w * c0r3);
                //Multiply the point against each part of the 2nd column, then join together
                var resultY = (x * c1r0) + (y * c1r1) + (z * c1r2) + (w * c1r3);
                //Multiply the point against each part of the 3rd column, then join together
                var resultZ = (x * c2r0) + (y * c2r1) + (z * c2r2) + (w * c2r3);
                //Multiply the point against each part of the 4th column, then join together
                var resultW = (x * c3r0) + (y * c3r1) + (z * c3r2) + (w * c3r3);
                return [resultX, resultY, resultZ, resultW];
            },
            multiplyMatrices: function(matrixA, matrixB) {
                var R = function(v) {
                    return Math.round(v * 1000000) / 1000000;
                };
                // Slice the second matrix up into columns
                var column0 = [matrixB[0], matrixB[4], matrixB[8], matrixB[12]];
                var column1 = [matrixB[1], matrixB[5], matrixB[9], matrixB[13]];
                var column2 = [matrixB[2], matrixB[6], matrixB[10], matrixB[14]];
                var column3 = [matrixB[3], matrixB[7], matrixB[11], matrixB[15]];
                // Multiply each column by the matrix
                var result0 = this.multiplyMatrixAndPoint(matrixA, column0);
                var result1 = this.multiplyMatrixAndPoint(matrixA, column1);
                var result2 = this.multiplyMatrixAndPoint(matrixA, column2);
                var result3 = this.multiplyMatrixAndPoint(matrixA, column3);
                // Turn the result columns back into a single matrix
                return [
                    R(result0[0]), R(result1[0]), R(result2[0]), R(result3[0]),
                    R(result0[1]), R(result1[1]), R(result2[1]), R(result3[1]),
                    R(result0[2]), R(result1[2]), R(result2[2]), R(result3[2]),
                    R(result0[3]), R(result1[3]), R(result2[3]), R(result3[3]),
                ];
            },
            Multiply: function(matrices) {
                var inputMatrix = matrices[0];
                var i;
                for (i = 1; i < matrices.length; i++) {
                    inputMatrix = this.multiplyMatrices(inputMatrix, matrices[i]);
                }
                return inputMatrix;
            },
            xyz: function(x, y, z) {
                return _X.MATRIX.Multiply([
                    this.RotateZAxis(_X.GetRadians(z)),
                    this.RotateYAxis(_X.GetRadians(y)),
                    this.RotateXAxis(_X.GetRadians(x)),
                ]).join(', ');
            },
        };

        function GetClasa(elem) {
            var clasa = elem.getAttribute('class') || '';
            if (clasa.length > 0) {
                return clasa.split(' ');
            } else {return []}
        }

        function ClassAddRemove(options) {
            var defaults = {
                type: '', //remove => arr1 - arr2 || join => arr1 + arr2
                arr1: [], //first array
                arr2: [], //second array
            };
            var s = _X.JoinObj(defaults, options);
            var result = [];
            if (s.type == 'remove') {
                _X.Xeach(s.arr1, function(k, v) {
                    if (s.arr2.join(' ').indexOf(v) < 0) {
                        result.push(v);
                    }
                });
                return result.join(' ');
            } else if (s.type =='join') {
                var temp = [];
                _X.Xeach(s.arr2, function(k, v) {
                    if (s.arr1.join(' ').indexOf(v) < 0) {
                        temp.push(v);
                    }
                });
                return result.concat(s.arr1, temp).join(' ');
            }
        }

        function SearchChildren(options) {
            var defaults = {
                a: '', 
                s: '',
            };
            var settings = _X.JoinObj(defaults, options);
            var a = settings.a;
            var s = settings.s;
            var temp = [];
            function Local(options) {
                var defaults = {
                    a: '', 
                    s: '',
                };
                var settings = _X.JoinObj(defaults, options);
                var a = settings.a;
                var s = settings.s;
                var repstr = s.replace(/[.#]/g, '');
                _X.Xeach(a, function(k, v) {
                    var getA = v.getAttribute(ReturnClassOrId(s)) || '';
                    if ((' ' + getA + ' ').indexOf(' ' + repstr + ' ') > -1) {
                        temp.push(v);
                    } else if (v.tagName === s.toUpperCase()) {
                        temp.push(v);
                    }
                    if (v.children.length > 0) {
                        Local({a: v.children, s: s});
                    }
                });
            }
            Local({a: a, s: s});
            return temp;
        }

        function ReturnClassOrId(el) {
            if (el.indexOf('.') > -1) {
                return 'class';
            } else if (el.indexOf('#') > -1) {
                return 'id';
            }
        }

        function ArrayToObject(arr, obj) {
            var i;
            for (i = 0; i < arr.length; i++) {
                obj[i] = arr[i];
            }
            return obj;
        }

        function GetObjectLength(obj) {
            var pushkey = [];
            var i;
            for (i in obj) {
                if (obj.hasOwnProperty(i) && i != 'length' && obj[i] !== undefined) {
                    pushkey.push(i);
                }
            }
            return pushkey.length;
        }

        function Help(options) {
            var defaults = {
                name: undefined,
                param1: undefined,
                param2: undefined,
                usage: undefined,
                tip: "'?' - parameter like ID, CLASS, TAG",
                constructor: '_X()',
            };
            var s = _X.JoinObj(defaults, options);
            var i;
            var init = function() {
                var x = {
                    'Function Name:': s.name,
                    'Parameter 1:': s.param1,
                    'Parameter 2:': s.param2,
                    'Usage Example:': s.usage,
                    'Tip:': s.tip,
                    'Constructor:': s.constructor,
                };
                for(i in x) {
                    if (x[i] === undefined) {
                        delete x[i];
                    }
                }
                console.log('*** Help Info for Function ' + s.name +' ***');
                return x;
            };
            console.table(init());
        }
        return _X;

        function FWidth(width = 1) {
            return _X(WIN.globalDIV).Xfind(WIN.body).position('width', 'offset') / width;
        }

        function FHeight(height = 1) {
            return _X(WIN.globalDIV).Xfind(WIN.body).position('height', 'offset') / height;
        }

        function AdSenseVertical() {
            if (window.innerWidth > 700) {
                return WIN.adsense;
            } else {
                return '/pages/null.html';
            }
        }       
    }

    if (typeof window._X === 'undefined') {
        window._X = xquery();
    }
})(window);

_X(window).on({
    load: function() {
        _X('.body_load').Xremove();
    },
    resize: function(e) {
        var x = new _X.Window();
        x.ResizeStatusBar();
    },
});

_X(document).on({
    mousemove: function(e) {
        //Mouse Move
        MOUSE.X = e.pageX;
        MOUSE.Y = e.pageY;
        //Toolltip
        (function() {
            if (_X('.tooltip_class').length > 0) {
                var width = _X('.tooltip_class').position('width', 'offset');
                var height = _X('.tooltip_class').position('height', 'offset');
                var Left = function() {
                    if (e.pageX > window.innerWidth - width) {
                        return e.pageX - width;
                    } else {
                        return e.pageX;
                    }
                };
                var Top = function() {
                    if (e.pageY < height) {
                        return e.pageY + height;
                    } else {
                        return e.pageY - 30;
                    }
                };
                _X('.tooltip_class').Xshow().css({display: 'block', left: Left(), top: Top()});
            }
        })();
    },
    mousedown: function(e) {
        if (e.which === 1) {
            MOUSE.XD = e.pageX;
            MOUSE.YD = e.pageY;
        }
        _X('.tooltip_class').Xremove();
        _X('.remove_on_mousedown').Xremove();
        _X('body').classAdd('mousedown_true');
        _X('iframe').css({'pointer-events': 'none'});
    },
    mouseup: function(e) {
        _X('.remove_on_mouseup').Xremove();
        _X('body').classRemove('mousedown_true');
        _X('iframe').css({'pointer-events': 'auto'});
    },    
});
