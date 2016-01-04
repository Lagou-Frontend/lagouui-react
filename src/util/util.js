let ieStyleMap = {
    'border-bottom-width': 'borderBottom',
    'border-top-width': 'borderTop',
}

let _ = {
    bind(element, type, listener) {
        if (element.addEventListener) {
            element.addEventListener(type, listener);
        } else {
            let lgType = 'lg' + type;
            if (Array.isArray(element[lgType])) {
                if (!element[lgType].includes(listener)) {
                    element[lgType].push(listener);
                }
            } else {
                element[lgType] = [ listener ];
                element.attachEvent('on' + type, function() {
                    element[lgType].forEach((listener) => {
                        listener && element::listener(shimEvent(window.event));
                    });
                });
            }
        }
    },

    unbind(element, type, listener) {
        if (element.removeEventListener) {
            element.removeEventListener(type, listener);
        } else {
            let lgType = 'lg' + type;
            if (Array.isArray(element[lgType])) {
                let index = element[lgType].indexOf(listener);
                if (index > -1) {
                    element[lgType].splice(index, 1);
                }
            }
        }
    },

    shimEvent(e) {
        if (!e.target) {
            e.target = e.srcElement;
            e.relatedTarge = e.type === "mouseover" ? e.fromElement : e.toElement;
            e.stopPropagation = function() {
                e.cancelBubble = true;
            }
            e.preventDefault = function() {
                e.returnValue = false;
            }
        }

        return e;
    },

    contains(root, element) {
        if (root === element) {
            return false;
        }

        if (root.compareDocumentPosition) {
            return !!(root.compareDocumentPosition(element) & 16);
        }

        if (root.contains && element.nodeType === 1){
            return root.contains(element) ;
        }

        while ((element = element.parentNode)) {
            if (element === root) {
                return true;
            }
        }
        return false;
    },

    getTextContent(element) {
        return element.textContent ? element.textContent : element.innerText;
    },

    getStyle(element) {
        if (window.getComputedStyle) {
            return window.getComputedStyle(element)
        } else {
            let style = {
                getPropertyValue: function(declaration) {
                    if (ieStyleMap[declaration]) {
                        declaration = ieStyleMap[declaration];
                    } else {
                        let words = declaration.split('-');
                        for (let i = 1; i < words.length; i++) {
                            words[i] = words[i].charAt(0).toUpperCase() + words[i].substr(1);
                        }
                        declaration = words.join('');
                    }

                    return this[declaration];
                }
            }

            let declarations = element.currentStyle;
            for (var declaration in declarations) {
                style[declaration] = declarations[declaration];
            }

            return style;
        }
    },

    hasClass(element, name) {
        return element.className.split(' ').includes(name);
    }
}

export default _;
