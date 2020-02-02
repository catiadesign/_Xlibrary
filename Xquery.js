//jshint maxerr: 2000

(function(window){
    //'use strict';
    function xquery() {
        var info = {
            name:       'Xquery JavaScript Library',
            version:    '1.0.0',
            author:     'Adrian & Open Source',
            created:    '17-10-2019',
            updated:    '02-02-2020',
        };
        
        var xs = 0;
        var effectStyles;
        
        var _X = function(id) {
            var that;
            var elem;
            var k = 0;
            var temp = [];
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
                            for (; k < elem.length; k++) {
                                that[k] = elem[k];
                            }
                        }
                        //Tag
                        else if (id.indexOf('.') < 0 && id.indexOf('#') < 0 && id.indexOf('<') < 0) {
                            elem = document.getElementsByTagName(id);
                            for (; k < elem.length; k++) {
                                that[k] = elem[k];
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
                        _X.Xeach(elem, function(k1, v1) {
                            var q = _X(v1);
                            _X.Xeach(q, function(k2, v2) {
                                temp.push(v2);
                            });
                        });
                        _X.Xeach(temp, function(k, v) {
                            that[k] = v;
                        });
                    }
                    that.length = _X.GetObjectLength(that);
                }
            } else {
                that = new _X({});
                that.length = _X.GetObjectLength(that);
            }
            return that;
        };

        _X.ClassVirtual = function() {return '.' + 'VirtualClass' + 9 + xs++};    
    
        _X.Xsearch = function(options) {
            var defaults = {
                a: ELEMENTS,    //array     => array where to search
                s: '999',       //search    => string || array by ","
                l: 'search',    //location  => search || loc || title || key || ico || keyname
                d: 'min',       //deep      => min || med || max
                e: '999',       //exclude   => based on search keyword
            };
            var settings = _X.XJoinObj(defaults, options);
            var a = settings.a;
            var s = settings.s;
            var l = settings.l;
            var d = settings.d;
            var e = settings.e;
            var temp = [];
            function SearchTemp(options) {
                var defaults = {
                    a: '',
                    s: '',
                    l: '',
                    d: '',
                    e: '',
                };
                var settings = _X.XJoinObj(defaults, options);
                var a = settings.a;
                var s = settings.s;
                var l = settings.l;
                var d = settings.d;
                var e = settings.e;
                function ReturnSearch(glob) {
                    function Exclude() {
                        if (glob.search !== undefined) {
                            if (glob.search.indexOf(e) > -1) {return false}
                            else {return true}
                        }
                    }
                    //Search
                    if (l == 'search' && glob.search !== undefined && Exclude() === true)
                        {return glob.search.toLowerCase().indexOf(s.toLowerCase()) > -1;}
                    
                    //Location
                    else if (l == 'loc' && glob.loc !== undefined && Exclude() === true)
                        {return glob.loc.toLowerCase().indexOf(s.toLowerCase()) > -1;}
                    
                    //Title
                    else if (l == 'title' && glob.title !== undefined && Exclude() === true)
                        {return glob.title.toLowerCase().indexOf(s.toLowerCase()) > -1;}
                    
                    //Keyboard Key
                    else if (l == 'key' && glob.key !== undefined && Exclude() === true)
                        {return glob.key;}
                    
                    //Icon
                    else if (l == 'ico' && glob.ico !== undefined && Exclude() === true)
                        {return glob.ico.toLowerCase().indexOf(s.toLowerCase()) > -1;}
                    
                    //Search by the Name of the Key not Value    
                    else if (l == 'keyname' && Exclude() === true)
                        {return key.toLowerCase().indexOf(s.toLowerCase()) > -1;}
                }
                if (a !== undefined) {
                    _X.Xeach(a, function(key, glob) {
                        if (ReturnSearch(glob)) {
                            temp.push(glob);
                            if (glob.hasOwnProperty('items') && d == 'max') {
                                SearchTemp({a: glob.items, s: s, l: l, d: d, e: e});
                            }
                        } else {
                            if (d == 'max' || d == 'med') {
                                SearchTemp({a: glob.items, s: s, l: l, d: d, e: e});
                            }
                        }
                    });
                }
            }
            if (s.indexOf(',') > -1) {
                var search = s.replace(/\s/g, '').split(',');
                _X.Xeach(search, function(key, glob) {
                    SearchTemp({a: a, s: glob, l: l, d: d, e: e});
                });
            } else {
                SearchTemp({a: a, s: s, l: l, d: d, e: e});
            }
            return temp;
        };
        
        _X.Xeach = function(obj, callback) {
            var i = 0;
            if (obj.length > 0) {
                for (; i < obj.length; i++) {
                    if (callback.call( obj[ i ], i, obj[ i ] ) === false) {
                        break;
                    }
                }
            }
            else if (typeof obj == 'number') {
                for (; i < obj; i++) {
                    if (callback.call( obj[ i ], i, obj[ i ] ) === false) {
                        break;
                    }
                }
            }
            else {
                for (i in obj) {
                    if (obj.hasOwnProperty(i) && obj.hasOwnProperty('length') === false) {
                        if (callback.call( obj[ i ], i, obj[ i ] ) === false) {
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
            for (var i = 0; i < obj.length; i++) {
                invertValue = !callback(obj[i]);
                //console.log(invertValue, callback());
                if (invertValue !== callback()) {
                    temp.push(obj[i]);
                }
            }
            return temp;
        };
        
        _X.XJoinObj = function(defaults, options){
            var s = {};
            for (var k in defaults) {
                s[k] = defaults[k];
            }
            for (var m in options) {
                s[m] = options[m];
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
                url: '',
                callback: '',
                dataType: '',
                /*
                    ""(default)     => get as string
                    "text"          => get as string
                    "arraybuffer"   => get as ArrayBuffer (for binary data, see chapter ArrayBuffer, binary arrays)
                    "blob"          => get as Blob (for binary data, see chapter Blob)
                    "document"      => get as XML document (can use XPath and other XML methods)
                    "json"          => get as JSON (parsed automatically)
                */
            };
            var s = _X.XJoinObj(defaults, options);
            //var args = Array.prototype.slice.call(arguments, 2);
            var xhr = new XMLHttpRequest();
            xhr.open('GET', s.url, true);
            xhr.responseType = s.dataType;
            xhr.send();
            xhr.onload = function() {
                if (this.readyState == 4 && this.status == 200) {
                    s.callback.apply(xhr, []);
                }
            };
            xhr.onerror = function() {
                console.log("** An error occurred during the transaction");
            };
        };
        
        _X.Xradians = function(degrees) {
            return degrees * Math.PI / 180;
        };
        
        _X.Xdegrees = function(radians) {
            return radians * 180 / Math.PI;
        };

        _X.XDraggable = function(options) {
            var defaults = {
                item: '',
                dragArea: '',
                mouse: '',
            };
            var settings = _X.XJoinObj(defaults, options);
            var that = _X(settings.item);
            var e = settings.mouse;
            if (e.which === 1) {
                var xd = e.pageX;
                var yd = e.pageY;
                var left = that.Xleft('offset');
                var top = that.Xtop('offset');
                var A = _X(settings.dragArea);
                var L = A.Xleft('box');
                var T = A.Xtop('box');
                var W = A.Xwidth('offset');
                var H = A.Xheight('offset');
                //console.log(left, top, L, T, W, H);
                var mousemove = function(e) {
                    var x = e.pageX;
                    var y = e.pageY;
                    that.XaddClass('xui_disabled')
                        .Xcss({position: 'absolute'});
                    // Center without borders
                    if ( (x > L) && (y > T) && (x < L + W) && (y < T + H) ) {
                        that.Xcss({
                            left: left + (x - xd),
                            top: top + (y - yd),
                        });
                    }
                    // Borders on Y Axis
                    else if ( /*left side*/ (x <= L) && (y > T) && (y < T + H) || /*right side*/ (x >= L + W) && (y > T) && (y < T + H) ) {
                        that.Xcss({
                            top: top + (y - yd),
                        });
                    }
                    // Borders on X Axis
                    else if ( /*top side*/ (y <= T) && (x > L) && (x < L + W) || /*bottom side*/ (y >= T + H) && (x > L) && (x < L + W) ) {
                        that.Xcss({
                            left: left + (x - xd),
                        });
                    }
                };
                var mouseup = function() {
                    _X(window).Xoff({mouseup: mouseup, mousemove: mousemove});
                    that.XremoveClass('xui_disabled');
                };
                _X(window).Xon({
                    mousemove: mousemove,
                    mouseup: mouseup
                });
            }
        };
        
        _X.prototype = {
            name:           info.name,
            author:         info.author,
            created:        info.created,
            version:        info.version,
            constructor:    _X,
            length:         0,

            //_X(?).Xval()      => GET element value
            //_X(?).Xval('?')   => SET element value
            Xval: function(e) {
                var that = this;
                if (e === undefined) {
                    return that[0].value;
                } else {
                    that[0].value = e;
                    return that;
                }
            },
            
            //_X(?).Xlast() => GET last element (+ length)
            Xlast: function() {
                var that = this;
                var self = new _X();
                _X.Xeach(that, function(k, v) {
                    if (k == that.length - 1) {
                        self[0] = v;
                    }
                });
                self.length = _X.GetObjectLength(self);
                return self;
            },
            
            //_X(?).XaddClass('?, ?') => SET element class
            XaddClass: function(e) {
                var that = this;
                _X.Xeach(that, function(k, v) {
                    if (e !== undefined) {
                        var elemA = _X.XGetClasa(v);
                        var selA = e.replace(/\s/g, '').split(',');
                        v.className = _X.XDifferenceArray({type: 'join', arr1: elemA, arr2: selA});
                    }
                });
                return that;
            },
            
            //_X(?).XremoveClass('?, ?') => SET element class
            XremoveClass: function(e) {
                var that = this;
                _X.Xeach(that, function(k, v) {
                    var elemA = _X.XGetClasa(v);
                    var selA = e.replace(/\s/g, '').split(',');
                    v.className = _X.XDifferenceArray({type: 'diff', arr1: elemA, arr2: selA});
                });
                return that;
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
            
            //_X(?).Xis([? css element: ? css value])   => return TRUE / FALSE on a css element check
            //_X(?).Xis('checked')                      => return TRUE / FALSE
            Xis: function(e) {
                var that = this;
                if (that[0] !== undefined) {
                    if (typeof e == 'object') {
                        var getA = that[0].style[e[0]] || '';
                        if (getA === e[1]) {
                            return true;
                        } else {
                            return false;
                        }
                    } else if (e.indexOf('checked') > -1) {
                        if (that[0].checked === true) {
                            return true;
                        } else if (that[0].checked === false) {
                            return false;
                        }
                    }
                }
            },

            //_X(?).Xcontains('?') => GET a selection of elements based on internal text search (+ length)
            Xcontains: function(e) {
                var that = this;
                var self = new _X();
                var temp = [];
                _X.Xeach(that, function(k, v) {
                    if (v.innerText === e) {
                        temp.push(v);
                    }
                });
                _X.Xeach(temp, function(k, v) {
                    self[k] = v;
                });
                self.length = _X.GetObjectLength(self);
                return self;
            },
        
            //_X(?).Xhave([? css element: ? css value]) => Check elements CSS based on a CSS element (+ length) 
            Xhave: function(e) {
                var that = this;
                var self = new _X();
                var temp = [];
                var getS;
                _X.Xeach(that, function(k, v) {
                    if (v !== undefined) {
                        getS = v.style[e[0]];
                        if (getS === e[1]) {
                            temp.push(v);
                        }
                    }
                });
                _X.Xeach(temp, function(k, v) {
                    self[k] = v;
                });
                self.length = _X.GetObjectLength(self);
                return self;
            },
            
            //_X(?).Xappend('?') => append OBJECT or HTML other object
            Xappend: function(e) {
                var that = this;
                if (e !== undefined && typeof e == 'object') {
                    _X.Xeach(that, function(k, v) {
                        v.appendChild(e[0]);
                    });
                } else {
                    _X.Xeach(that, function(k, v) {
                        v.innerHTML += e;
                    });
                }
                return that;
            },

            //_X(?).Xprepend('?') => prepend OBJECT or HTML other object
            Xprepend: function(e) {
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
            Xshow: function(e) {
                var that = this;
                _X.Xeach(that, function(k, v) {
                    if (e !== undefined) {
                        _X.EFFECT[e](v, 'show');
                    } else {
                        v.style.display = '';
                        v.style.visibility = 'visible';
                    }
                });
                return that;
            },

            //_X(?).Xhide()     => hide the current element
            //_X(?).Xhide('?')  => hide the current element with buildin EFFECTS
            Xhide: function(e) {
                var that = this;
                _X.Xeach(that, function(k, v) {
                    if (e !== undefined) {
                        _X.EFFECT[e](v, 'hide');
                    } else {
                        v.style.display = 'none';
                        v.style.visibility = 'hidden';
                    }
                });
                return that;
            },

            //_X(?).Xtext()     => GET current element TEXT
            //_X(?).Xtext('?')  => SET the TEXT to element
            Xtext: function(e) {
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
            
            //_X(?).Xattr('? element')              => GET element attribute
            //_X(?).Xattr({'? element': ? value})   => SET element attribute
            Xattr: function(e) {
                var that = this;
                if (typeof e == 'object') {
                    _X.Xeach(e, function(k, v) {
                        that[0].setAttribute(k, v);
                    });
                    return that;
                } else {
                    return that[0].getAttribute(e);
                }
            },

            //_X(?).Xcss('? element key')               => GET element css value
            //_X(?).Xcss({'? element key': ? value})    => SET element css
            Xcss: function(e) {
                var that = this;
                var cssElements = ['left', 'right', 'top', 'bottom', 'width', 'height', 'margin', 'padding', 'perspective', 'font-size', 'margin-left', 'margin-right', 'margin-top', 'margin-bottom', 'padding-left', 'padding-right', 'padding-top', 'padding-bottom', 'border-radius'];
                if (typeof e == 'object') {
                    _X.Xeach(that, function(k1, v1) {
                        _X.Xeach(e, function(k2, v2) {
                            if (v1.style !== undefined) {
                                if (cssElements.indexOf(k2) > -1 && typeof v2 == 'number' && v2 !== 0) {
                                    v1.style[k2] = v2 + 'px';
                                } else {
                                    v1.style[k2] = v2;
                                }
                            }
                        });
                    });
                    return that;
                } else if (typeof e == 'string') {
                    if (that[0] !== undefined && that[0].style[e] !== undefined) {
                        var elem = that[0].style[e];
                        if ( elem.indexOf('px') > -1 ) {
                            return parseInt(elem);
                        } else {
                            return elem;
                        }
                    }
                }
            },

            //_X(?).Xremove() => DELETE current element
            Xremove: function() {
                var that = this;
                _X.Xeach(that, function(k, v) {
                    if (v !== undefined) {
                        v.parentNode.removeChild(v);
                    }
                });
            },
            
            //_X(?).Xon( ['? ? ?', function(){}] )      => SET event like an array syntax
            //_X(?).Xon( {'?': function(){}} )          => SET event like an object syntax
            Xon: function(e) {
                var that = this;
                if (e.length > 0 && e[0] !== null) {
                    var sel = e[0].split(/[ ]+/);
                    _X.Xeach(sel, function(k, v) {
                        that[0].addEventListener(v, e[1]);
                    });
                } else {
                    _X.Xeach(that, function(k1, v1) {
                        _X.Xeach(e, function(k2, v2) {
                            v1.addEventListener(k2, v2);
                        });
                    });
                }
                return that;
            },

            //_X(?).Xoff( {'? function name': ? function name} ) => REMOVE event from element
            Xoff: function(e) {
                var that = this;
                _X.Xeach(e, function(k, v) {
                    that[0].removeEventListener(k, v);
                });
                return that;
            },
            
            //_X(?).Xempty() => DELETE element contains
            Xempty: function() {
                var that = this;
                if (that[0] !== undefined) {
                    _X.Xeach(that, function(k, v) {
                        v.innerHTML = '';
                    });
                    return that;
                }
            },
            
            //_X(?).XhasClass('?, ?') => return TRUE / FALSE on class check
            XhasClass: function(e) {
                var elem;
                var i = 0;
                var s = e.replace(/\s/g, '').split(',');
                while ( ( elem = this[ i++ ] ) ) {
                    if ( elem.nodeType === 1 && ( " " + elem.getAttribute("class") + " " ).indexOf( " " + s.join(' ') + " " ) > -1 ) {
                        return true;
                    }
                }
                return false;
            },

            //_X(?).Xfind('children')   => return all children on first level from element
            //_X(?).Xfind('.?')         => search for class elements
            //_X(?).Xfind('#?')         => search for id elements
            //_X(?).Xfind('?')          => search for tag elements
            Xfind: function(e) {
                var that = this;
                var self = new _X();
                var temp = [];
                var allC;
                var elem;
                if (that[0] !== undefined) {
                    //children
                    allC = that[0].children;
                    if (e == 'children') {
                        _X.Xeach(that, function(k1, v1) {
                            _X.Xeach(v1.children, function(k2, v2) {
                                temp.push(v2);
                            });
                        });
                    } else {
                        elem = e.replace(/\s/g, '').split(',');
                        _X.Xeach(elem, function(k, v) {
                            _X.Xeach(_X.XSearchChildren({a: that, s: v}), function(k2, v2) {
                                temp.push(v2);
                            });
                        });
                    }
                    _X.Xeach(temp, function(k, v) {
                        self[k] = v;
                    });
                }
                self.length = _X.GetObjectLength(self);
                return self;
            },

            //_X(?).Xparent()       => return first parent from element
            //_X(?).Xparent('.?')   => search for class parent element
            //_X(?).Xparent('#?')   => search for id parent element
            Xparent: function(e) {
                var that = this;
                var self = new _X();
                var parent;
                var getAttr;
                var replaceString;
                if (that[0] !== undefined) {
                    parent = that[0].parentNode;
                    if (e === undefined) {
                        self[0] = parent;
                    } else {
                        getAttr = parent.getAttribute(_X.XReturnClassOrId(e));
                        replaceString = e.replace(/[.#]/g, '');
                        while ((' ' + getAttr + ' ').indexOf(' ' + replaceString + ' ') < 0 && parent !== _X('html')[0]) {
                            parent = parent.parentNode;
                            getAttr = parent.getAttribute(_X.XReturnClassOrId(e));
                            self[0] = parent;
                        }
                    }
                }
                self.length = _X.GetObjectLength(self);
                return self;
            },
            
            //_X(?).Xwidth('? offset || client || inner || outer || box || scroll || screen') 
            Xwidth: function(e) {
                var that = this;
                if (that[0] !== undefined) {
                    if (e == 'offset') {
                        return that[0].offsetWidth;
                    } else if (e == 'client') {
                        return that[0].clientWidth;
                    } else if (e == 'inner') {
                        return that[0].innerWidth;
                    } else if (e == 'outer') {
                        return that[0].outerWidth;
                    } else if (e == 'box') {
                        return that[0].getBoundingClientRect().width;
                    } else if (e == 'scroll') {
                        return that[0].scrollWidth;
                    } else if (e == 'screen') {
                        return that[0].screen.width;
                    }
                }
            },
            
            //_X(?).Xheight('? offset || client || inner || outer || box || scroll || screen') 
            Xheight: function(e) {
                var that = this;
                if (that[0] !== undefined) {
                    if (e == 'offset') {
                        return that[0].offsetHeight;
                    } else if (e == 'client') {
                        return that[0].clientHeight;
                    } else if (e == 'inner') {
                        return that[0].innerHeight;
                    } else if (e == 'outer') {
                        return that[0].outerHeight;
                    } else if (e == 'box') {
                        return that[0].getBoundingClientRect().height;
                    } else if (e == 'scroll') {
                        return that[0].scrollHeight;
                    } else if (e == 'screen') {
                        return that[0].screen.height;
                    }
                }
            },
            
            //_X(?).Xleft('? offset || client || box || scroll || screen') 
            Xleft: function(e) {
                var that = this;
                if (that[0] !== undefined) {
                    if (e == 'offset') {
                        return that[0].offsetLeft;
                    } else if (e == 'client') {
                        return that[0].clientLeft;
                    } else if (e == 'box') {
                        return that[0].getBoundingClientRect().left;
                    } else if (e == 'scroll') {
                        return that[0].scrollLeft;
                    } else if (e == 'screen') {
                        return that[0].screen.left;
                    }
                }
            },
            
            //_X(?).Xtop('? offset || client || box || scroll || screen')
            Xtop: function(e) {
                var that = this;
                if (that[0] !== undefined) {
                    if (e == 'offset') {
                        return that[0].offsetTop;
                    } else if (e == 'client') {
                        return that[0].clientTop;
                    } else if (e == 'box') {
                        return that[0].getBoundingClientRect().top;
                    } else if (e == 'scroll') {
                        return that[0].scrollTop;
                    } else if (e == 'screen') {
                        return that[0].screen.top;
                    }
                }
            },
        
            //_X(?).Xload('? url, ? function')
            Xload: function(url, callback) {
                var that = this;
                var newUrl = url.split(' ');
                function ReturnUrl(url) {
                    if (url.indexOf('#') < 0) {
                        return url;
                    } else {
                        return newUrl[0];
                    }
                }
                function ReturnData(to, url) {
                    if (url.indexOf('#') > -1) {
                        var temp = _X(to).Xappend(xhr.responseText).Xfind(newUrl[1]);
                        _X(to).Xempty();
                        return temp;
                    } else {
                        return xhr.responseText;
                    }
                }
                var xhr = new XMLHttpRequest();
                xhr.open('GET', ReturnUrl(url), true);
                xhr.responseType = '';
                xhr.send();
                //xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
                //xhr.getAllResponseHeaders();
                xhr.onload = function() {
                    if (xhr.readyState == 4 && xhr.status == 200) {
                        _X.Xeach(that, function(k, v) {
                            _X(v).Xappend(ReturnData(v, url));
                            if (callback !== undefined) {
                                callback.apply(xhr, []);
                            }
                            //console.log(xhr.getResponseHeader("Content-Type"));
                        });
                    }
                };
                xhr.onerror = function() {
                    console.log("** An error occurred during the transaction");
                };    
            },
        
        };

        //Effects for Hide / Show prototype function
        _X.EFFECT = {
            timeout: function(elem) {
                setTimeout(function() {
                    _X(elem).Xhide();
                }, 200);                
            },
            elemCss: function(effectname) {
                return {
                    'animation-name': effectname,
                    'animation-duration': '.5s',
                    'animation-timing-function': 'ease',
                    'animation-direction': 'normal',
                    'animation-fill-mode': 'none',
                };
            },
            AddAnimation: function(name, matrix) {
                if (!effectStyles) {
                    effectStyles = document.createElement('style');
                    effectStyles.type = 'text/css';
                    document.head.appendChild(effectStyles);
                }
                function CreateEffectShow(matrix) {
                    return `from {transform: matrix3d( ${ matrix } ); opacity: 0;} to {transform: matrix3d(1,0,0,0,  0,1,0,0,  0,0,1,0,  0,0,0,1); opacity: 1;}`;
                }
        
                function CreateEffectHide(matrix) {
                    return `from {transform: matrix3d(1,0,0,0,  0,1,0,0,  0,0,1,0,  0,0,0,1); opacity: 1;} to {transform: matrix3d( ${ matrix }); opacity: 0;}`;
                }            
                effectStyles.sheet.insertRule(`@keyframes ${ name + '_motion_show' } { ${ CreateEffectShow(matrix) } }`);
                effectStyles.sheet.insertRule(`@keyframes ${ name + '_motion_hide' } { ${ CreateEffectHide(matrix) } }`);
            },       
            drop_left: function (elem, hideshow) {
                if (hideshow == 'show') {
                    _X(elem).Xshow().Xcss(this.elemCss('drop_left_motion_show'));
                } else if (hideshow == 'hide') {
                    _X(elem).Xcss(this.elemCss('drop_left_motion_hide'));
                    this.timeout(elem);
                }                  
            },
            drop_top: function(elem, hideshow) {
                if (hideshow == 'show') {
                    _X(elem).Xshow().Xcss(this.elemCss('drop_top_motion_show'));
                } else if (hideshow == 'hide') {
                    _X(elem).Xcss(this.elemCss('drop_top_motion_hide'));
                    this.timeout(elem);
                }                  
            },
            drop_left_top: function(elem, hideshow) {
                if (hideshow == 'show') {
                    _X(elem).Xshow().Xcss(this.elemCss('drop_left_top_motion_show'));
                } else if (hideshow == 'hide') {
                    _X(elem).Xcss(this.elemCss('drop_left_top_motion_hide'));
                    this.timeout(elem);
                }                   
            },
            unfold_small: function(elem, hideshow) {
                if (hideshow == 'show') {
                    _X(elem).Xshow().Xcss(this.elemCss('unfold_small_motion_show'));
                } else if (hideshow == 'hide') {
                    _X(elem).Xcss(this.elemCss('unfold_small_motion_hide'));
                    this.timeout(elem);
                }                
            },
            unfold_big: function(elem, hideshow) {
                if (hideshow == 'show') {
                    _X(elem).Xshow().Xcss(this.elemCss('unfold_big_motion_show'));
                } else if (hideshow == 'hide') {
                    _X(elem).Xcss(this.elemCss('unfold_big_motion_hide'));
                    this.timeout(elem);
                }
            },
            reverse: function(elem, hideshow) {
                if (hideshow == 'show') {
                    _X(elem).Xshow().Xcss(this.elemCss('reverse_motion_show'));                    
                } else if (hideshow == 'hide') {
                    _X(elem).Xcss(this.elemCss('reverse_motion_hide'));
                    this.timeout(elem);
                }
            },
            swipe: function(elem, hideshow) {
                if (hideshow == 'show') {
                    _X(elem).Xshow().Xcss(this.elemCss('swipe_motion_show'));                    
                } else if (hideshow == 'hide') {
                    _X(elem).Xcss(this.elemCss('swipe_motion_hide'));
                    this.timeout(elem);
                }
            },                   
        };

        _X.EFFECT.AddAnimation('swipe', '2,0,0,0,  0,1,0,0,  0,0,1,0,  0,0,0,1');
        _X.EFFECT.AddAnimation('reverse', '1,2,0,0,  0,1,0,0,  0,0,1,0,  0,0,0,.5');
        _X.EFFECT.AddAnimation('unfold_big', '1,0,0,0,  0,1,0,0,  0,0,1,0,  0,0,0,.5');
        _X.EFFECT.AddAnimation('unfold_small', '1,0,0,0,  0,1,0,0,  0,0,1,0,  0,0,0,1.5');
        _X.EFFECT.AddAnimation('drop_left', '1,0,0,0,  0,1,0,0,  0,0,1,0,  -50,0,0,1');
        _X.EFFECT.AddAnimation('drop_top', '1,0,0,0,  0,1,0,0,  0,0,1,0,  0,-50,0,1');
        _X.EFFECT.AddAnimation('drop_left_top', '1,0,0,0,  0,1,0,0,  0,0,1,0,  -50,-50,0,1');
        
        _X.MATRIX = {
            s: function(a) {
                return Math.sin(a);
            },
            c: function(a) {
                return Math.cos(a);
            },
            t: function(a) {
                return Math.tan(a);
            },                            
            RotateXAxis: function(a) {
                var s = this.s(a);
                var c = this.c(a);
                return [
                    1, 0, 0, 0,
                    0, c, -s, 0,
                    0, s, c, 0,
                    0, 0, 0, 1
                ];
            },
        
            RotateYAxis: function(a) {
                var s = this.s(a);
                var c = this.c(a);             
                return [
                    c, 0, s, 0,
                    0, 1, 0, 0,
                    -s, 0, c, 0,
                    0, 0, 0, 1
                ];
            },
        
            RotateZAxis: function(a) {
                var s = this.s(a);
                var c = this.c(a);             
                return [
                    c, -s, 0, 0,
                    s, c, 0, 0,
                    0, 0, 1, 0,
                    0, 0, 0, 1
                ];
            },
        
            translate: function(x, y, z) {
                return [
                    1, 0, 0, 0,
                    0, 1, 0, 0,
                    0, 0, 1, 0,
                    x, y, z, 1
                ];
            },
        
            scale: function(w, h, d) {
                return [
                    w, 0, 0, 0,
                    0, h, 0, 0,
                    0, 0, d, 0,
                    0, 0, 0, 1
                ];
            },

            skew: function(x, y) {
                var tx = this.t(x);
                var ty = this.t(y);
                return [
                    1, tx, 0, 0,
                    ty, 1, 0, 0,
                    0, 0, 1, 0,
                    0, 0, 0, 1
                ];
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
                //Multiply the point against each part of the 1st column, then add together
                var resultX = (x * c0r0) + (y * c0r1) + (z * c0r2) + (w * c0r3);
                //Multiply the point against each part of the 2nd column, then add together
                var resultY = (x * c1r0) + (y * c1r1) + (z * c1r2) + (w * c1r3);
                //Multiply the point against each part of the 3rd column, then add together
                var resultZ = (x * c2r0) + (y * c2r1) + (z * c2r2) + (w * c2r3);
                //Multiply the point against each part of the 4th column, then add together
                var resultW = (x * c3r0) + (y * c3r1) + (z * c3r2) + (w * c3r3);
                return [resultX, resultY, resultZ, resultW];
            },
        
            multiplyMatrices: function(matrixA, matrixB) {
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
                    result0[0], result1[0], result2[0], result3[0],
                    result0[1], result1[1], result2[1], result3[1],
                    result0[2], result1[2], result2[2], result3[2],
                    result0[3], result1[3], result2[3], result3[3]
                ];
            },
        
            multiplyArrayOfMatrices: function(matrices) {
                var inputMatrix = matrices[0];
                for(var i = 1; i < matrices.length; i++) {
                    inputMatrix = this.multiplyMatrices(inputMatrix, matrices[i]);
                }
                return inputMatrix;
            },
        };
        
        _X.XGetClasa = function(elem) {
            var clasa = elem.getAttribute('class') || '';
            if (clasa.length > 0) {
                return clasa.split(' ');
            } else {return []}
        };
        
        _X.XDifferenceArray = function(options){
            var defaults = {
                type: '', //diff => arr1 - arr2 || join => arr1 + arr2
                arr1: [], //first array
                arr2: [], //second array
            };
            var s = _X.XJoinObj(defaults, options);
            var result = [];
            if (s.type == 'diff') {
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
        };
        
        _X.XSearchChildren = function(options) {
            var defaults = {
                a: '', 
                s: '',
            };
            var settings = _X.XJoinObj(defaults, options);
            var a = settings.a;
            var s = settings.s;
            var temp = [];
            function XSearchChildrenTemp(options) {
                var defaults = {
                    a: '', 
                    s: '',
                };
                var settings = _X.XJoinObj(defaults, options);
                var a = settings.a;
                var s = settings.s;
                var repstr = s.replace(/[.#]/g, '');
                _X.Xeach(a, function(k, v) {
                    var getA = v.getAttribute(_X.XReturnClassOrId(s)) || '';
                    if ((' ' + getA + ' ').indexOf(' ' + repstr + ' ') > -1) {
                        temp.push(v);
                    } else if (v.tagName === s.toUpperCase()) {
                        temp.push(v);
                    } else if (v.children.length > 0 && (' ' + getA + ' ').indexOf(' ' + repstr + ' ') < 0) {
                        XSearchChildrenTemp({a: v.children, s: s});
                    }
                });
            }
            XSearchChildrenTemp({a: a, s: s});
            return temp;
        };
        
        _X.XReturnClassOrId = function(el) {
            if (el.indexOf('.') > -1) {
                return 'class';
            } else if (el.indexOf('#') > -1) {
                return 'id';
            }
        };
        
        _X.GetObjectLength = function(obj) {
            var pushkey = [];
            for (var k in obj) {
                if (obj.hasOwnProperty(k) && k != 'length' && obj[k] !== undefined) {
                    pushkey.push(k);
                }
            }
            return pushkey.length;
        };
        
        return _X;
    }
    
    if (typeof window._X === 'undefined') {
        window._X = xquery();
    }
})(window);
